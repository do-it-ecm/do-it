# coding: utf-8
"""
This module is responsible for relinking media references in the project file.
- if line has ![SOME_TEXT](SOME_PATH) then SOME_PATH is a media reference if there is no http in SOME_PATH
- if line has <video src="SOME_PATH"> then SOME_PATH is a media reference if there is no http in SOME_PATH
- if line has <audio src="SOME_PATH"> then SOME_PATH is a media reference if there is no http in SOME_PATH
- if line has <img src="SOME_PATH"> then SOME_PATH is a media reference if there is no http in SOME_PATH
"""

import re
import os
import argparse
from typing import List, Dict, Set

# Raw GitHub url
RAW_GITHUB_URL = "https://raw.githubusercontent.com"
# Raw GitHack url
RAW_GITHACK_URL = "https://raw.githack.com"
# Set of video extensions
VIDEO_EXTENSIONS = {
    'mp4'
    'mov',
    'mkv',
    'webm',
    'avi',
    'flv',
    'wmv',
    'mpg',
    'mpeg',
    'm4v',
}
# Video match regex
VIDEO_MATCH_REGEX = re.compile(rf'\.({'|'.join([re.escape(ext) for ext in VIDEO_EXTENSIONS])})$', re.IGNORECASE)
# Set of audio extensions
AUDIO_EXTENSIONS = {
    'mp3',
    'wav',
    'flac',
    'm4a',
    'aac',
    'ogg',
    'wma',
    'opus'
}
# Audio match regex
AUDIO_MATCH_REGEX = re.compile(rf'\.({'|'.join([re.escape(ext) for ext in AUDIO_EXTENSIONS])})$', re.IGNORECASE)
# Set of image extensions
IMAGE_EXTENSIONS = {
    'png',
    'jpg',
    'jpeg',
    'gif',
    'bmp',
    'webp',
    'tiff',
    'svg',
    'ico',
    'eps',
    'psd',
    'ai',
}
# Image match regex
IMAGE_MATCH_REGEX = re.compile(rf'\.({'|'.join([re.escape(ext) for ext in IMAGE_EXTENSIONS])})$', re.IGNORECASE)
# Regex to match files ending with any of the extensions (case-insensitive)
VIDEO_AUDIO_MATCH_REGEX = re.compile(rf'\.({'|'.join([re.escape(ext) for ext in VIDEO_EXTENSIONS.union(AUDIO_EXTENSIONS)])})$', re.IGNORECASE)
# Media match regex,
# matches if there is ![SOME_TEXT](SOME_PATH) and there is no http in SOME_PATH
# matches if there is <video(ANYTHING)> and there is no http in the line
# matches if there is <audio(ANYTHING)> and there is no http in the line
# matches if there is <img(ANYTHING)> and there is no http in the line
MEDIA_MATCH_REGEX = re.compile(r'!\[.*?\]\((?!http).*?\)|<(video|audio|img)[^>]*?src=["\'](?!http).*?["\'][^>]*?>')
# Global verbosity flag
VERBOSE = False
# Total error counts for the run
ERROR_COUNT = 0


def findMediaReferencesInFile(filepath : str) -> Dict[str, str]:
    """
    Find all media references in the file and outputs their resolved paths.
    """
    with open(filepath, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    media_references = {}
    absolute_path = os.path.dirname(filepath)
    global ERROR_COUNT
    for line in lines:
        search = re.search(MEDIA_MATCH_REGEX, line)
        if search:
            matching_part = search.group(0)
            media_link = extractLinkFromMediaReference(matching_part)
            if media_link.startswith("/"):
                print(f"WARN: Absolute path found in media reference: {media_link}")
            else:
                absolute_media_path = os.path.realpath(os.path.join(absolute_path, media_link))

                if os.path.isfile(absolute_media_path):
                    media_references[absolute_media_path] = media_link
                else:
                    ERROR_COUNT += 1
                    if VERBOSE:
                        print(f"WARN: Media reference not found in {filepath}: {absolute_media_path}")
    return media_references


def buildMediaReferenceMap(media_references : Dict[str, Dict[str, str]], github_repo : str, main_branch : str, root_dir : str) -> Dict[str, str]:
    """
    Build a map of media references to their resolved paths.
    """
    media_reference_map = {}
    for media_path, media_link in media_references.items():
        if re.search(VIDEO_AUDIO_MATCH_REGEX, media_path):
            if VERBOSE:
                print(f"WARN: Skipping video/audio reference: {media_path}")
        else:
            if not root_dir.endswith("/"):
                root_dir += "/"
            media_reference_map[media_link] = f"{RAW_GITHUB_URL}/{github_repo}/{main_branch}/{media_path.replace(root_dir, '')}"
    return media_reference_map


def extractLinkFromMediaReference(media_reference : str) -> str:
    """
    Extract the link from the media reference.
    """
    if media_reference.startswith("!"):
        # ![SOME_TEXT](SOME_PATH)
        return re.search(r'\((.*?)\)', media_reference).group(1).split(' ')[0]
    else:
        # <video src="SOME_PATH">
        # <audio src="SOME_PATH">
        # <img src="SOME_PATH">
        return re.search(r'src=["\'](.*?)["\']', media_reference).group(1)


def findMediaReferencesInDirectory(directory_path : str, ignore_directories : List[str]) -> Dict[str, Dict[str, str]]:
    """
    Recursively find all media references in a directory.
    """
    media_references = {}
    with os.scandir(directory_path) as entries:
        for entry in entries:
            if entry.name in ignore_directories:
                continue
            elif entry.is_file():
                if entry.name.endswith(".md") or entry.name.endswith(".html") or entry.name.endswith(".njk"):
                    media_references[entry.path] = findMediaReferencesInFile(entry.path)
            elif entry.is_dir():
                # Recursively scan subdirectory
                media_references.update(findMediaReferencesInDirectory(entry.path, ignore_directories))
    return media_references


def defineParser():
    """
    Define the command line arguments parser.
    """
    parser = argparse.ArgumentParser(description='Find all media references in the project.')
    # Directory arg, defines the directory to scan for media references
    parser.add_argument('directory', type=str, help='The promo directory to scan for media references.')
    # GitHub repository arg, defines the GitHub repository to build the media reference map for
    parser.add_argument('github_repo', type=str, help='The GitHub repository to build the media reference map for.')
    # Main branch arg, defines the main branch of the GitHub repository (default is main)
    parser.add_argument('--main_branch', type=str, default='main', help='The main branch of the GitHub repository.')
    # Ignore arg, defines the directories to ignore
    parser.add_argument('--ignore', nargs='+', default=[], help='List of directories to ignore.')
    #Verbose arg, defines the verbosity level (-v or --verbose)
    parser.add_argument('-v', '--verbose', action='store_true', help='Enable verbose mode.')

    return parser


def processArguments(parser):
    """
    Process the command line arguments.
    """
    args = parser.parse_args()

    if not args.directory.startswith("/"):
        raise ValueError("Please provide an absolute path.")
    elif not os.path.isdir(args.directory):
        raise FileNotFoundError(f"Directory '{args.directory}' not found.")

    global VERBOSE
    VERBOSE = args.verbose

    media_references = findMediaReferencesInDirectory(args.directory, args.ignore)
    if VERBOSE:
        print(f"Found {len(media_references)} media references in the project.")
        print(f"Errors found: {ERROR_COUNT}")

    for filepath, media_references in media_references.items():
        media_reference_map = buildMediaReferenceMap(media_references, args.github_repo, args.main_branch, args.directory)

        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()

        for media_link, resolved_media_link in media_reference_map.items():
            content = content.replace(media_link, resolved_media_link)

        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)


if __name__ == '__main__':
    parser = defineParser()
    processArguments(parser)
