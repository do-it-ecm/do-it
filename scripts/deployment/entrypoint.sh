#!/bin/sh

# Check if the user has provided the required environment variables
if [ -z "$GITHUB_TOKEN" ]; then
  echo "The GITHUB_TOKEN is required to run this script"
  exit 1
fi

# Clone the repository
git clone --branch gh-pages --single-branch https://github.com/do-it-ecm/do-it.git /opt/do-it/do-it

# Start the python server (listening to POST requests on port 3001)
python3 /opt/do-it/jobs/server.py --update-script /opt/do-it/jobs/synchronizer.sh --github-repo-owner do-it-ecm --github-repo do-it --github-branch gh-pages --secret-token ${GITHUB_TOKEN} --log-file /opt/do-it/logs/server.log --host localhost --port 3001 &

# Start the nginx server
exec nginx -g "daemon off;"
