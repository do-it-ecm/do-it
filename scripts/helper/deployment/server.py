# coding: utf-8
"""
Create a simple HTTP server that listens on a specified port.
The server receives POST requests, validates the token, and triggers a script.
Logs are written to a specified log file.
"""

import argparse
import logging
from http.server import HTTPServer, BaseHTTPRequestHandler
from subprocess import Popen, PIPE
from json import loads, JSONDecodeError
import hashlib
import hmac

class HTTPError(Exception):
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(self.detail)

class WebhookHandler(BaseHTTPRequestHandler):
    def verify_signature(self, secret_token):
        """
        Verify the request payload's signature using the secret token.
        """
        signature_header = self.headers.get('X-Hub-Signature-256')
        payload_length = int(self.headers.get('Content-Length', 0))
        payload_body = self.rfile.read(payload_length).decode('utf-8')

        if secret_token:
            if not signature_header:
                raise HTTPError(401, "Missing signature header")

            hash_object = hmac.new(secret_token.encode('utf-8'), msg=payload_body.encode('utf-8'), digestmod=hashlib.sha256)
            expected_signature = "sha256=" + hash_object.hexdigest()
            if not hmac.compare_digest(expected_signature, signature_header):
                raise HTTPError(403, "Invalid request signature")

        try:
            parsed_body = loads(payload_body)
        except JSONDecodeError:
            raise HTTPError(400, "Invalid JSON payload")

        return parsed_body

    def do_POST(self):
        """
        Handle POST requests, validate payload, and trigger script execution.
        """
        try:
            # Verify the request signature and extract JSON payload
            request_body = self.verify_signature(self.server.secret_token)

            # Validate repository and branch
            repo_full_name = request_body['repository'].get('full_name')
            ref = request_body['ref']
            if repo_full_name != f"{self.server.github_repo_owner}/{self.server.github_repo}":
                raise HTTPError(400, f"Repository mismatch. Expected {self.server.github_repo_owner}/{self.server.github}")
            if ref != f"refs/heads/{self.server.github_branch}":
                raise HTTPError(400, f"Branch mismatch. Expected {self.server.github_branch}")

            # Run the update script if provided
            if self.server.update_script:
                self.run_script(self.server.update_script)

            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"Webhook processed successfully.")
        except HTTPError as e:
            self.send_response(e.status_code)
            self.end_headers()
            self.wfile.write(e.detail.encode('utf-8'))
            logging.error(f"HTTPError: {e.detail}")
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(f"Error: {e}".encode('utf-8'))
            logging.error(f"Unexpected error: {e}")

    @staticmethod
    def run_script(script_path):
        """
        Execute the update script.
        """
        logging.info(f"Executing script: {script_path}")
        process = Popen([script_path], stdout=PIPE, stderr=PIPE)
        stdout, stderr = process.communicate()
        if stderr:
            logging.error(f"Script error: {stderr.decode('utf-8')}")
            raise Exception(f"Script error: {stderr.decode('utf-8')}")
        logging.info(f"Script output: {stdout.decode('utf-8')}")
        logging.info("Script executed successfully")

    def log_message(self, format, *args):
        """
        Log an arbitrary message to the logger.
        """
        logging.info("%s - - [%s] %s\n" %
                     (self.client_address[0],
                      self.log_date_time_string(),
                      format % args))

def run_server(host, port, secret_token, update_script, github_repo_owner, github_repo, github_branch):
    """
    Start the web server on the specified host and port.
    """
    server = HTTPServer((host, port), WebhookHandler)
    server.secret_token = secret_token
    server.update_script = update_script
    server.github_repo_owner = github_repo_owner
    server.github_repo = github_repo
    server.github_branch = github_branch

    logging.info(f"Starting server on {host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()
        logging.info("Server stopped.")

def main():
    parser = argparse.ArgumentParser(description="Simple HTTP server to handle GitHub webhooks.")
    parser.add_argument('--host', default='localhost', help='Hostname to bind the server to (default: ::)')
    parser.add_argument('--port', type=int, default=3001, help='Port to listen on (default: 3001)')
    parser.add_argument('--secret-token', help='Secret token to validate incoming requests')
    parser.add_argument('--update-script', required=True, help='Path to the script to execute upon valid webhook')
    parser.add_argument('--github-repo-owner', required=True, help='GitHub repository owner')
    parser.add_argument('--github-repo', required=True, help='GitHub repository name')
    parser.add_argument('--github-branch', required=True, help='GitHub branch to monitor for webhooks')
    parser.add_argument('--log-file', required=True, help='Path to the log file (default: server.log)')

    args = parser.parse_args()

    # Configure logging
    logging.basicConfig(
        filename=args.log_file,
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

    run_server(
        host=args.host,
        port=args.port,
        secret_token=args.secret_token,
        update_script=args.update_script,
        github_repo_owner=args.github_repo_owner,
        github_repo=args.github_repo,
        github_branch=args.github_branch
    )

if __name__ == "__main__":
    main()
