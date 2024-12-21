/**
 * Compliance check script
 * Runs all compliance checks and logs the results
 */
import path from 'path';
import { validateDirectory } from './filenames.js';
import { validateMediaDirectory, validateMediaPlacement, MAX_MEDIA_SIZE, ASSETS_DIR } from './medias.js';

const SOURCE_DIR = 'src';

export function runComplianceChecks() {
    console.log(`Running compliance checks on ${path.join(process.cwd(), SOURCE_DIR)}...`);
    const invalidPaths = validateDirectory(SOURCE_DIR);
    const filesTooLarge = validateMediaDirectory(SOURCE_DIR);
    const incorrectPlacement = validateMediaPlacement(SOURCE_DIR);

    if (invalidPaths.length) {
        console.error('The following files or directories have invalid names (must be alphanumeric characters, upper or lower, dashes, underscores or dots):');
        invalidPaths.forEach(path => console.error(`    - ${path}`));
    }
    if (filesTooLarge.length) {
        console.error(`The following media files are too large (maximum size is ${Math.floor(MAX_MEDIA_SIZE / 1024 / 1024)}MB):`);
        filesTooLarge.forEach(path => console.error(`    - ${path}`));
    }
    if (incorrectPlacement.length) {
        console.error(`The following files were detected as media because they do not end with '.md' and are placed in the wrong directory, please move them to the assets directory:`);
        incorrectPlacement.forEach(path => console.error(`    - ${path}`));
    }

    if (invalidPaths.length || filesTooLarge.length || incorrectPlacement.length) {
        console.error('Compliance checks failed.');
        process.exit(1);
    }
}

runComplianceChecks();
