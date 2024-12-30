# coding: utf-8
"""
This module recursively sanitizes the src filesystem by removing all non ascii characters from
directory names, file names and their references in the project file.
"""

import os
import re
import unicodedata
import argparse
from typing import Dict, Tuple

VALID_FILENAME_REGEX = re.compile(r'^[a-zA-Z0-9\.\-_]+$')

def findSanitize(src: str) -> Tuple[Dict[str, str], Dict[str, str]]:
    """
    Rename all directories and files in the src filesystem to remove non ascii characters.
    Replace spaces with underscores.
    Any accentuated characters are replaced with their ascii equivalent.

    :param src: The path to the src filesystem

    :return: A dictionary mapping the original file/directory path to the sanitized file/directory path
    """
    sanitized_dir_map = {}
    sanitized_file_map = {}
    for root, dirs, files in os.walk(src):
        for directory in dirs:
            sanitized_directory = sanitizeString(directory)
            if sanitized_directory != directory:
                sanitized_dir_map[os.path.join(root, directory)] = os.path.join(root, sanitized_directory)
        for file in files:
            sanitized_file = sanitizeString(file)
            if sanitized_file != file:
                sanitized_file_map[os.path.join(root, file)] = os.path.join(root, sanitized_file)
    return sanitized_dir_map, sanitized_file_map


def sanitizeString(input_string: str) -> str:
    """
    Remove all non-ascii characters from a string.

    :param input_string: The string to sanitize

    :return: The sanitized string
    """
    normalized = unicodedata.normalize('NFD', input_string.replace(' ', '_'))
    ascii_equivalent = ''.join(c for c in normalized if unicodedata.category(c) != 'Mn')
    return ascii_equivalent


def defineParser():
    """
    Define the command line arguments for the script.
    """
    parser = argparse.ArgumentParser(description='Sanitize the src filesystem by removing all non ascii characters.')
    parser.add_argument('src', type=str, help='The path to the src filesystem to sanitize.')
    return parser


def parseArguments(parser : argparse.ArgumentParser):
    """
    Parse the command line arguments for the script.
    """
    args = parser.parse_args()

    if not args.src.startswith("/"):
        raise Exception(f"Invalid src path {args.src}. Path must be absolute.")
    elif not os.path.exists(args.src):
        raise Exception(f"Directory {args.src} does not exist.")

    sanitized_dir_map, sanitized_file_map = findSanitize(args.src)

    # Rename files first to avoid conflicts with directories
    for original_file, sanitized_file in sanitized_file_map.items():
        os.rename(original_file, sanitized_file)

    # Rename directories
    for original_dir, sanitized_dir in sanitized_dir_map.items():
        os.rename(original_dir, sanitized_dir)

    # Replace references in project files
    for root, _, files in os.walk(args.src):
        for file in files:
            if file.endswith(".md") or file.endswith(".html") or file.endswith(".njk"):
                replaceReferences(os.path.join(root, file), sanitized_dir_map, sanitized_file_map)


def replaceReferences(file_path : str, dir_map : Dict[str, str], file_map : Dict[str, str]):
    """
    Replace all references to sanitized directories and files in a project file.

    :param file_path: The path to the project file
    :param dir_map: A dictionary mapping the original directory path to the sanitized directory path
    :param file_map: A dictionary mapping the original file path to the sanitized file path
    """
    with open(file_path, 'r') as file:
        content = file.read()
    for original_dir, sanitized_dir in dir_map.items():
        content = content.replace(f"/{original_dir}", f"/{sanitized_dir}")
    for original_file, sanitized_file in file_map.items():
        content = content.replace(original_file, sanitized_file)
    with open(file_path, 'w') as file:
        file.write(content)


if __name__ == "__main__":
    parser = defineParser()
    parseArguments(parser)
