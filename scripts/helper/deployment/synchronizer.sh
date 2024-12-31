#!/bin/sh

DO_IT_PATH="${HOME}/.do-it/do-it"
REMOTE_BRANCH="gh-pages"
LOG_DIRECTORY="${HOME}/.do-it/logs"
LOG_FILE="${LOG_DIRECTORY}/synchronizer.log"

mkdir -p ${LOG_DIRECTORY}


# Function to prepend a formatted timestamp
log_with_timestamp() {
  while IFS= read -r line; do
    echo "$(date '+%Y/%m/%d %Hh%M:%S') $line"
  done
}

cd ${DO_IT_PATH} && \
GIT_ORIGIN_URL="$(git remote get-url origin)" && \
git fetch origin ${REMOTE_BRANCH} 2>&1 | log_with_timestamp | tee -a ${LOG_FILE} && \
git reset --hard origin/${REMOTE_BRANCH} 2>&1 | log_with_timestamp | tee -a ${LOG_FILE} && \
echo "Synchronized with the remote origin ${GIT_ORIGIN_URL} ${REMOTE_BRANCH} branch" 2>&1 | log_with_timestamp | tee -a ${LOG_FILE}
