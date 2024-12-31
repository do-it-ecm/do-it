# coding: utf-8
"""
Create a simple HTTP server that serves a filesystem from a given path
The HTTP server will listen on the user id port in IPv6 mode
The server will receive any GET request and will serve the file if it exists
The server can receive a POST request corresponding to a git webhook signaling a need to run the update script
"""

from argparse import ArgumentParser, Namespace
from http.server import HTTPServer, SimpleHTTPRequestHandler
from subprocess import Popen, PIPE
from os import path, chdir
from json import loads, JSONDecodeError
from socket import AF_INET6

# Global variable custom update script
UPDATE_SCRIPT = None


def startHttpServer(directory: str, host: str, port: int):
    """
    Start the HTTP server

    :param directory: The directory to serve
    :param host: The host to bind to
    :param port: The port to listen on
    """
    print(f"Starting HTTP server on {host} port {port} to serve directory {directory}")
    print(f"Access at http://[{host}]:{port}")

    # Change the working directory to the one to serve
    chdir(directory)

    # Create the server
    server = IPv6HTTPServer((host, port), CustomHandler)

    # Start the server
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
        server.server_close()
        print("Server stopped")


class IPv6HTTPServer(HTTPServer):
    address_family = AF_INET6


class CustomHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        """
        Handle POST requests and parse JSON payload
        """
        try:
            # Read and parse JSON payload
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length).decode('utf-8')
            print(f"Raw POST data: {post_data}")

            # Attempt to parse the JSON data
            json_data = loads(post_data)
            print(f"Received JSON data: {json_data}")

            if UPDATE_SCRIPT is not None:
                # Run the custom update script
                runCustomScript(UPDATE_SCRIPT)

            # Respond to the request
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"JSON data received successfully.")
        except JSONDecodeError as e:
            # Handle JSON parsing errors
            self.send_response(400)
            self.end_headers()
            self.wfile.write(f"Invalid JSON: {e}".encode('utf-8'))
        except Exception as e:
            # Handle other exceptions
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Error: {e}".encode('utf-8'))


def runCustomScript(script_path: str):
    print(f"Running custom update script: {script_path}")
    process = Popen([script_path], stdout=PIPE, stderr=PIPE)
    _, error = process.communicate()
    if error:
        raise Exception(f"Update script error: {error.decode('utf-8')}")
    else:
        print('Update script ran successfully')


def defineParser() -> ArgumentParser:
    parser = ArgumentParser(description="Simple HTTP server that serves a filesystem from a given path")

    # Directory argument (mandatory), defines the directory to serve
    parser.add_argument("directory", help="The directory to serve")

    # Update script argument (optional), defines a script to run when a POST request is received
    parser.add_argument("--update-script", help="The path to the script to run when a POST request is received")

    # Port argument (optional, default to the user id), defines the port to listen on
    parser.add_argument("--port", type=int, default=retrieveUserId(), help="The port to listen on")

    # Host (bind) argument (optional, default to the IPv6 any address), defines the host to bind to
    parser.add_argument("--host", default="::", help="The host to bind to")

    return parser


def processArguments(parser: ArgumentParser) -> Namespace:
    """
    Process the arguments given to the script

    :param parser: The parser to use to parse the arguments

    :return: The parsed arguments
    """
    args = parser.parse_args()

    if not path.isdir(args.directory):
        raise ValueError(f"Invalid directory: {args.directory}, must be an existing directory")

    if args.update_script is not None and not path.isfile(args.update_script):
        raise ValueError(f"Invalid update script: {args.update_script}, must be an existing file")
    else:
        global UPDATE_SCRIPT
        UPDATE_SCRIPT = args.update_script

    return args


def retrieveUserId() -> int:
    """
    Retrieve the user id of the current user

    :return: The user id of the current user
    """
    RETRIEVE_ID_COMMAND = ["id", "-u"]
    process = Popen(RETRIEVE_ID_COMMAND, stdout=PIPE)
    output, _ = process.communicate()
    return int(output.decode().strip())


if __name__ == "__main__":
    parser = defineParser()
    processArguments(parser)
    args = parser.parse_args()
    startHttpServer(args.directory, args.host, args.port)