/**
 * Helper script to create a standard promotion directory and start contributing right away.
 * 
 * This script will create a new git submodule in the `src/promos` directory.
 * Is used when running the command `npm run init-promotion`
 */

import * as fs from 'fs';
import * as path from 'path';

// Valid promotion directory name regex
const PROMO_DIRECTORY_REGEX = /^[0-9]{4}-[0-9]{4}$/;
// Path to the directory where the promotions are stored
export const PROMOS_DIRECTORY = path.join(process.cwd(), 'src', 'promos');

export function listPromos() {
    const promos = fs.readdirSync(PROMOS_DIRECTORY);
    const validPromos = promos.filter(promo => PROMO_DIRECTORY_REGEX.test(promo));
    return validPromos;
}
