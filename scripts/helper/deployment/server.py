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
import hashlib
import hmac

# Global variable custom update script
UPDATE_SCRIPT = None
# GitHub repo owner (can be changed through CLI)
GITHUB_REPO_OWNER = 'do-it-ecm'
# GitHub repo (can be changed through CLI)
GITHUB_REPO = 'do-it'
# GitHub branch (can be changed through CLI)
GITHUB_BRANCH = 'gh-pages'
# Secret token (Can be changed through CLI, not setting it causes the server to accept all requests)
SECRET_TOKEN = None



class HTTPError(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(self.detail)


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

    def verifySignature(self):
        """
        Verify that the payload was sent from GitHub by validating SHA256.

        :param request: The request object to extract the payload and headers from

        :return: The parsed body of the request
        :throws HTTPError: If the signature header is missing or the signatures don't match
        :throws JSONDecodeError: If the payload is not a valid JSON
        """
        # Retrieve the signature header and the payload
        signature_header = self.headers.get('X-Hub-Signature-256')
        payload_body = self.rfile.read(int(self.headers.get('Content-Length', 0))).decode('utf-8')

        # Raise an error if the secret token is set and the signature header is not
        if SECRET_TOKEN is not None:
            if not signature_header:
                raise HTTPError(status_code=401, detail="Could not verify the request signature")

            # Compute and compare the expected signature to the received one
            hash_object = hmac.new(SECRET_TOKEN.encode('utf-8'), msg=payload_body.encode('utf-8'), digestmod=hashlib.sha256)
            expected_signature = "sha256=" + hash_object.hexdigest()
            if not hmac.compare_digest(expected_signature, signature_header):
                raise HTTPError(status_code=403, detail="Request signatures didn't match!")

        try:
            parsed_body = loads(payload_body)
        except JSONDecodeError:
            raise HTTPError(status_code=400, detail="Invalid JSON payload")

        return parsed_body


    def do_POST(self):
        """
        Handle POST requests and parse JSON payload
        """
        try:
            # Verify the signature of the request and retrieve the JSON data
            request_body = self.verifySignature()

            # Check if the JSON data contains the expected keys
            if not all(key in request_body for key in ('repository', 'ref')):
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Invalid JSON data, expected keys: 'repository', 'ref'")
                return

            # Check if the push corresponds to the expected git repo owner / git repo and branch
            if request_body['repository'].get('full_name') != f"{GITHUB_REPO_OWNER}/{GITHUB_REPO}":
                raise HTTPError(status_code=400, detail=f"GitHub repository does not match, expected {GITHUB_REPO_OWNER}/{GITHUB_REPO}, got {request_body['repository'].get('full_name')}")
            elif request_body['ref'] != f"refs/heads/{GITHUB_BRANCH}":
                raise HTTPError(status_code=400, detail=f"GitHub branch does not match, expected {GITHUB_BRANCH}, got {request_body['ref']}")

            if UPDATE_SCRIPT is not None:
                # Run the custom update script
                runCustomScript(UPDATE_SCRIPT)

            # Respond to the request
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"JSON data received successfully.")
        except HTTPError as e:
            print(f"HTTP error: {e.detail}")
            # Handle HTTP errors
            self.send_response(e.status_code)
            self.end_headers()
            self.wfile.write(e.detail.encode('utf-8'))
        except Exception as e:
            print(f"Unexpected error: {e}")
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

    # GitHub repo owner argument (optional, default to 'do-it-ecm'), defines the GitHub repo owner
    parser.add_argument("--github-repo-owner", default=GITHUB_REPO_OWNER, help="The GitHub repo owner")

    # GitHub repo argument (optional, default to 'do-it'), defines the GitHub repo
    parser.add_argument("--github-repo", default=GITHUB_REPO, help="The GitHub repo")

    # GitHub branch argument (optional, default to 'gh-pages'), defines the GitHub branch
    parser.add_argument("--github-branch", default=GITHUB_BRANCH, help="The GitHub branch where the push are expected to come from")

    # Secret token argument (optional, default to None), defines the secret token to check
    parser.add_argument("--secret-token", default=SECRET_TOKEN, help="The secret token to check in the request headers")

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

    global GITHUB_REPO_OWNER
    GITHUB_REPO_OWNER = args.github_repo_owner

    global GITHUB_REPO
    GITHUB_REPO = args.github_repo

    global GITHUB_BRANCH
    GITHUB_BRANCH = args.github_branch

    global SECRET_TOKEN
    SECRET_TOKEN = args.secret_token

    print(f"GitHub repository: {GITHUB_REPO_OWNER}/{GITHUB_REPO} on branch {GITHUB_BRANCH}")

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
