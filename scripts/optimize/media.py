# coding: utf-8
"""
Optimize media files in a directory by reducing their size
"""

import os
import re
import argparse
import subprocess
from typing import List, Dict

# Verbosity flag
verbose = False
# Replacement dictionary for media files
REPLACEMENT_DICT_IMAGE = {
    "png": "webp",
    "jpg": "webp",
    "jpeg": "webp",
}
REPLACEMENT_DICT_VIDEO = {
    "mp4": "mp4",
    "mov": "mp4",
    "mkv": "mp4",
    "webm": "mp4",
    "avi": "mp4",
    "flv": "mp4",
    "wmv": "mp4",
    "mpg": "mp4",
    "mpeg": "mp4",
    "m4v": "mp4",
}
REPLACEMENT_DICT_AUDIO = {
    "mp3": "opus",
    "wav": "opus",
    "flac": "opus",
    "m4a": "opus",
    "aac": "opus",
    "ogg": "opus",
    "wma": "opus",
}

# FFMPEG arguments for image optimization
FFMPEG_ARGS_IMAGE = ['-q:v', '75']
# FFMPEG arguments for video optimization
FFMPEG_ARGS_VIDEO = ["-c:v", "libx264",
                    "-preset", "veryslow",
                    "-c:a", "aac",
                    "-b:a", "96k"]
# FFMPEG arguments for audio optimization
FFMPEG_ARGS_AUDIO = ["-c:a", "libopus",
                    "-b:a", "96k"]


def findMediaInDirectory(directory_path: str, extensions: List[str], ignore_directories : List[str]) -> List[str]:
    """
    Recursively find all media files in a directory
    :param directory_path: The path to the directory to scan
    :param extensions: A list of file extensions to search for
    :return: A list of paths to media files
    """
    MEDIA_FILE_REGEX = re.compile(r".*\.(" + "|".join(extensions) + r")$", re.IGNORECASE)
    media_files: List[str] = []

    with os.scandir(directory_path) as entries:
        for entry in entries:
            if entry.name in ignore_directories:
                continue
            elif entry.is_file():
                if MEDIA_FILE_REGEX.match(entry.name):
                    media_files.append(entry.path)
            elif entry.is_dir():
                # Recursively scan subdirectory
                media_files.extend(findMediaInDirectory(entry.path, extensions, ignore_directories))

    return media_files


def replaceMediaMentionInDirectory(directory_path : str, replacementDict : Dict[str, str], ignore_directories : List[str]):
    """
    Recursively replaces all mentions of media files in a directory
    :param directory_path: The path to the directory to scan
    :param replacementDict: A dictionary of file paths to replace
    """
    with os.scandir(directory_path) as entries:
        for entry in entries:
            if entry.name in ignore_directories:
                continue
            elif entry.is_file() and (entry.name.endswith(".md") or entry.name.endswith(".njk") or entry.name.endswith(".html")):
                with open(entry.path, "r", encoding='utf-8') as file:
                    content = file.read()
                replaced_content = replaceMediaExtensionsInText(content, replacementDict)
                with open(entry.path, "w") as file:
                    file.write(replaced_content)
            elif entry.is_dir():
                # Recursively scan subdirectory
                replaceMediaMentionInDirectory(entry.path, replacementDict, ignore_directories)


def replaceMediaExtensionsInText(content: str, extension_map: Dict[str, str]) -> str:
    """
    Replicate the 'ignore lines containing http, otherwise replace .ext → .newext' logic
    in a single pass over the file text.
    """

    pattern_str = r"\.(" + "|".join(re.escape(ext) for ext in extension_map.keys()) + r")\b"
    pattern = re.compile(pattern_str, re.IGNORECASE)

    # Process line by line
    lines = content.splitlines(keepends=True)
    new_lines = []

    for line in lines:
        # If the line contains 'http', keep it unchanged.
        if 'http' in line:
            new_lines.append(line)
            continue

        # Otherwise, do a single re.sub with a replacement function:
        replaced_line = pattern.sub(
            lambda match: '.' + extension_map[match.group(1).lower()],
            line
        )
        new_lines.append(replaced_line)

    return "".join(new_lines)


def runFFMPEGCommand(original_file : str, output_file : str, args : List[str]) -> List[str]:
    """
    Run an FFMPEG command to optimize a media file
    :param original_file: The path to the original media file
    :param output_file: The path to the output media file
    :param args: A list of arguments to pass to FFMPEG
    :return: None if the command was successful, the error message if it failed
    """
    command = ["ffmpeg", "-i", original_file, "-y", *args, output_file]
    if verbose:
        print(f"Running command: {" ".join(command)}")
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    _, stderr = process.communicate()
    if process.returncode != 0:
        return stderr.decode("utf-8")
    return None


def defineParser():
    """
    Define the command line argument parser
    :return: The argument parser
    """
    parser = argparse.ArgumentParser(
        description="Optimize media files in a directory by reducing their size"
    )

    # Directory argument:
    parser.add_argument(
        "directory", type=str,
        help=("The directory to search for media files. "
              "Must be absolute.")
    )

    # Boolean flags for image, video, and audio
    parser.add_argument(
        "--image",
        action="store_true",
        help="Optimize image files"
    )
    parser.add_argument(
        "--video",
        action="store_true",
        help="Optimize video files"
    )
    parser.add_argument(
        "--audio",
        action="store_true",
        help="Optimize audio files"
    )

    # Verbose mode (-v / --verbose)
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Enable verbose mode"
    )

    # Ignore directories
    parser.add_argument(
        "--ignore",
        action="append",
        default=[],
        help="Directories to ignore (can be used multiple times)"
    )

    return parser


def optimizeMediaFiles(directory: str, replacement_dict: Dict[str, str], ignore_directories: List[str]):
    """
    Optimize media files in a directory
    :param directory: The path to the directory to scan
    :param replacement_dict: A dictionary of file extensions to replace
    """
    # Find all media files in the directory
    media_files = findMediaInDirectory(directory, list(replacement_dict.keys()), ignore_directories)
    if verbose:
        print(f"Found media files: {", ".join(media_files)}")

    # Replace media file extensions in all files in the directory
    replaceMediaMentionInDirectory(directory, replacement_dict, ignore_directories)

    # Optimize media files
    failed_files = []
    for media_file in media_files:
        former_extension = media_file.split(".")[-1]
        # Get the new file extension
        new_extension = replacement_dict[former_extension.lower()]
        # Generate the new file path
        tmp_file = media_file.replace(former_extension, f"compressed.{new_extension}")
        new_file = media_file.replace(former_extension, new_extension)
        # Run the FFMPEG command
        error = runFFMPEGCommand(media_file, tmp_file, FFMPEG_ARGS_IMAGE if new_extension == "webp" else FFMPEG_ARGS_VIDEO if new_extension == "mp4" else FFMPEG_ARGS_AUDIO)
        if error:
            failed_files.append(media_file)
            if verbose:
                print(f"Failed to optimize file {media_file}: {error}")
        else:
            # Replace the original file with the optimized one
            os.remove(media_file)
            os.rename(tmp_file, new_file)
            if verbose:
                print(f"Optimized file {media_file} to {new_file}")

    if failed_files:
        print(f"Failed to optimize the following files: {'\n'.join(failed_files)}")


def processArguments(parser):
    """
    Parse the command line arguments and start the optimization process
    :param parser: The argument parser
    """
    arguments = parser.parse_args()
    if not arguments.directory.startswith("/"):
        parser.error("Please provide an absolute path")
    elif not os.path.isdir(arguments.directory):
        parser.error(f"Directory '{arguments.directory}' not found")
    if not (arguments.image or arguments.video or arguments.audio):
        parser.error("At least one of --image, --video, or --audio must be specified")
    replacement_dict = {}
    if arguments.image:
        replacement_dict.update(REPLACEMENT_DICT_IMAGE)
    if arguments.video:
        replacement_dict.update(REPLACEMENT_DICT_VIDEO)
    if arguments.audio:
        replacement_dict.update(REPLACEMENT_DICT_AUDIO)
    if arguments.verbose:
        global verbose
        verbose = True
    ignore_directories = arguments.ignore
    optimizeMediaFiles(arguments.directory, replacement_dict, ignore_directories)


if __name__ == "__main__":
    parser = defineParser()
    processArguments(parser)
