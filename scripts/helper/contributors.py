# coding: utf-8
"""
Fetches the contributors of GitHub repositories
"""

import requests
import argparse
from typing import Dict

# GitHub api URL
GITHUB_API_URL = "https://api.github.com"
# GitHub Token (optional)
GITHUB_TOKEN = None
# Default owner
DEFAULT_OWNER = 'do-it-ecm'
# Global verbose flag
VERBOSE = False

# Request headers
headers = {
    "Accept": "application/vnd.github.v3+json",
}

if GITHUB_TOKEN:
    headers["Authorization"] = f"token {GITHUB_TOKEN}"

def getContributorsInRepo(owner : str, repo : str) -> Dict[str, Dict[str, str]]:
    """
    Fetches the contributors of a GitHub repository

    :param owner: The owner of the repository
    :param repo: The repository name

    :return: A dictionary of contributors
    """
    url = f"{GITHUB_API_URL}/repos/{owner}/{repo}/contributors"

    # Make the API request
    if VERBOSE:
        print(f"Fetching contributors for {owner}/{repo}")
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        contributors = response.json()
        return {contributor["login"] : {
            "url": contributor["html_url"],
            "avatar": contributor["avatar_url"],
            "contributions": contributor["contributions"],
        } for contributor in contributors}

    else:
        print(f"Failed to fetch contributors: {response.status_code}")


def defineParser() -> argparse.ArgumentParser:
    """
    Defines the command line arguments for the script

    :return: An ArgumentParser object
    """
    parser = argparse.ArgumentParser(description="Fetches the contributors of a GitHub repository")

    # Owner argument (default: do-it-ecm)
    parser.add_argument(
        "-o",
        "--owner",
        type=str,
        default=DEFAULT_OWNER,
        help="The owner of the repository",
    )

    # Repositories argument (can be multiple, at least one is required)
    parser.add_argument(
        "-r",
        "--repo",
        type=str,
        required=True,
        nargs="+",
        help="The repository name",
    )

    # Token argument
    parser.add_argument(
        "-t",
        "--token",
        type=str,
        help="The GitHub token",
    )

    # Verbose argument
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Prints the contributors",
    )
    return parser


def parseArguments(parser: argparse.ArgumentParser):
    """
    Parses the command line arguments

    :param parser: An ArgumentParser object
    """
    args = parser.parse_args()

    # Set the global verbose flag
    global VERBOSE
    VERBOSE = args.verbose

    # Set the global GitHub token
    if args.token:
        global GITHUB_TOKEN
        GITHUB_TOKEN = args.token

    # Fetch the contributors
    contributors = {}
    for repo in args.repo:
        repo_contributors = getContributorsInRepo(args.owner, repo)
        for contributor, data in repo_contributors.items():
            if contributor in contributors:
                contributors[contributor]["contributions"] += data["contributions"]
            else:
                contributors[contributor] = data

    # Print the contributors formatted for html import (sort the contributors by contributions)
    print("""## Contributors

<style>
.contributor {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
}

.contributor-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 5px;
}
</style>

""")
    print('<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">')
    for contributor, data in sorted(contributors.items(), key=lambda x: x[1]["contributions"], reverse=True):
        print(f'    <a href="{data["url"]}" class="contributor"><img src="{data["avatar"]}" title="{contributor}" class="contributor-icon"></a>')
    print('</div>')


if __name__ == "__main__":
    parser = defineParser()
    parseArguments(parser)
