import fs from 'fs/promises'
import path from 'path'

/**
 * Create a file with the given content
 * If the file already exists, it will be overwritten
 * If the parent directory does not exist, it will be created
 *
 * @async
 *
 * @param {string} filePath - The path to the file to create
 * @param {string} content - The content of the file
 *
 * @throws {Error} - If the file cannot be created
 * @throws {Error} - If the parent directory cannot be created
 *
 * @returns {Promise<void>}
 */
export async function createFile(filePath, content) {
  return fs.mkdir(path.dirname(filePath), { recursive: true })
    .then(() => fs.writeFile(filePath, content));
}
