/** 
 * Part of the compliance check script, this module contains functions to validate filenames and directory names.
 */

import * as fs from 'fs';
import * as path from 'path';

// Regular expression to validate filenames and directory names
const validNameRegex = /^[a-zA-Z0-9_.-]+$/;

/**
 * Recursively validates that all files and directories in a given directory have valid names.
 * @param dirPath The path to the directory to validate.
 * @returns A list of invalid file or directory paths.
 */
export function validateDirectory(dirPath) {
    const invalidPaths = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const entryName = entry.name;
        const fullPath = path.join(dirPath, entryName);

        if (!validNameRegex.test(entryName)) {
            invalidPaths.push(fullPath);
        }

        if (entry.isDirectory()) {
            // Recursively validate subdirectories
            invalidPaths.push(...validateDirectory(fullPath));
        }
    }

    return invalidPaths;
}
