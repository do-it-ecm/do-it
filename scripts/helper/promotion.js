/**
 * Helper script to create a standard promotion directory and start contributing right away.
 *
 * This script will create a new git submodule in the `src/promos` directory.
 * Is used when running the command `npm run init-promotion`
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

// Valid promotion directory name regex
const PROMO_DIRECTORY_REGEX = /^[0-9]{4}-[0-9]{4}$/;
// Path to the directory where the promotions are stored
export const PROMOS_DIRECTORY = path.join(process.cwd(), 'src', 'promos');
// Remote organization URL
const REMOTE_ORG_URL = 'https://github.com/do-it-ecm';
// Default GitHub workflow
const DEFAULT_GITHUB_WORKFLOW = `name: Notify Parent Repo Build

    on:
    push:
        branches:
        - main

    jobs:
    notify-parent:
        runs-on: ubuntu-latest

        steps:
        - name: Trigger Parent Workflow
            uses: peter-evans/repository-dispatch@v3
            with:
            token: \${{ secrets.DO_IT_UPDATE_TOKEN }}
            repository: do-it-ecm/do-it
            event-type: submodule-update
            client-payload: '{"submodule": "\${{ github.repository }}"}'
    `;
// Default promo index page
const DEFAULT_INDEX_PAGE = `---
    layout: layout/promo.njk
    ---
    `
// Default promo POK page
const DEFAULT_POK_PAGE = `---
    layout: layout/pok-mon-promo-index.njk

    category: POK
    ---
    `;
// Default promo MON page
const DEFAULT_MON_PAGE = `---
    layout: layout/pok-mon-promo-index.njk

    category: MON
    ---
    `;
// Default projects index page
const DEFAULT_PROJECTS_PAGE = `---
    layout: layout/projet-index.njk
    ---
    `;
// Default gitignore file
const DEFAULT_GITIGNORE_CONTENT = `# IDE
.vscode
.vs
.idea
.idea/
*.iml
.idea_modules
*.ipr
*.iws
*.bak
*.swp
*.swo
*.swn
*.suo
*.workspace

# Compile output
dist/
build/

# Node.js
node_modules/
npm-debug.log
yarn-error.log
yarn-debug.log*
yarn.lock

# Python
__pycache__/
*.pyc
.env/
.venv/
venv/
env/

# Mac
.DS_Store
.AppleDouble
.LSOverride

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# Keys
*.key
*.pem
*.p12
*.pfx
*.crt
*.csr
*.cer
*.jks
*.pub
`;

/**
 * List all the promotion directories in the `src/promos` directory.
 *
 * @returns {string[]} List of promotion directories
 */
export function listPromos() {
    const promos = fs.readdirSync(PROMOS_DIRECTORY);
    const validPromos = promos.filter(promo => PROMO_DIRECTORY_REGEX.test(promo));
    return validPromos;
}

/**
 * Get the latest promotion directory.
 * The latest promotion is determined by the promotion directory name.
 *
 * @returns {string} The latest promotion directory
 */
function getLatestPromo() {
    const promos = listPromos();
    const currentYear = new Date().getFullYear();
    return promos.length ? promos.sort().reverse()[0] : `${currentYear - 1}-${currentYear}`;
}

/**
 * Confirm if the user wants to create a new promotion directory.
 * If the user selects "No", they will be prompted to enter the promotion name.
 * The promotion name must match the format `YYYY-YYYY`.
 * If the user selects "Yes", the initial promotion name will be used.
 *
 * @async
 *
 * @param {string} initialPromo The initial promotion name
 *
 * @returns {Promise<string>} The promotion name
 */
async function confirmCreatePromo(initialPromo) {
    const { promo } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Do you want to create a new promotion directory for ${initialPromo}?`,
            default: true,
        },
        {
            type: 'input',
            name: 'promo',
            message: 'Enter the promotion name (format YYYY-YYYY):',
            validate: (input) => {
                return PROMO_DIRECTORY_REGEX.test(input)
                    ? true
                    : 'Promotion name must match the format YYYY-YYYY';
            },
            when: (answers) => !answers.confirm, // Only show this prompt if the user selects "No"
        },
    ]);

    return promo || initialPromo;
}

/**
 * Create the promotion directory and all the necessary files.
 *
 * @param {string} promoPath The promotion directory path
 */
function createPromo(promoPath) {
    // Create the promotion directory
    fs.mkdirSync(promoPath, { recursive: true });
    console.log(`Promotion directory created at ${promoPath}`);

    // Create the github workflow directory and the update-parent.yml file
    const githubWorkflowPath = path.join(promoPath, '.github', 'workflows');
    fs.mkdirSync(githubWorkflowPath, { recursive: true });
    fs.writeFileSync(path.join(githubWorkflowPath, 'update-parent.yml'), DEFAULT_GITHUB_WORKFLOW);
    console.log(`GitHub workflow directory created at ${githubWorkflowPath}`);

    // Create the gitignore file
    fs.writeFileSync(path.join(promoPath, '.gitignore'), DEFAULT_GITIGNORE_CONTENT);
    console.log(`Gitignore file created at ${promoPath}`);

    // Create the index page
    const indexPagePath = path.join(promoPath, 'index.njk');
    fs.writeFileSync(indexPagePath, DEFAULT_INDEX_PAGE);

    // Create the POK page
    const pokPagePath = path.join(promoPath, 'pok.njk');
    fs.writeFileSync(pokPagePath, DEFAULT_POK_PAGE);

    // Create the MON page
    const monPagePath = path.join(promoPath, 'mon.njk');
    fs.writeFileSync(monPagePath, DEFAULT_MON_PAGE);

    // Create the projects directory and the index page
    const projectsPath = path.join(promoPath, '_projets');
    fs.mkdirSync(projectsPath, { recursive: true });
    fs.writeFileSync(path.join(projectsPath, 'index.njk'), DEFAULT_PROJECTS_PAGE);

    console.log(`All promotion files created at ${promoPath}`);
}

/**
 * Creates a git submodule in the main repository for the promotion.
 *
 * @async
 *
 * @param {string} promo The promotion name
 *
 * @returns {Promise<void>}
 */
async function promoGitInit(promo) {
    // Default remote URL
    const remoteURL = `${REMOTE_ORG_URL}/promo-${promo}.git`;

    // Confirm and optionally prompt for custom remote URL
    const { push, customRemoteURL } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'push',
            message: `Confirm the EXISTING promotion remote repository (must exist at ${remoteURL}) ?`,
            default: true,
        },
        {
            type: 'input',
            name: 'customRemoteURL',
            message: 'Enter a custom EXISTING remote repository URL:',
            validate: (input) => {
                return input.trim().length > 0
                    ? true
                    : 'Remote URL cannot be empty';
            },
            when: (answers) => !answers.push, // Prompt only if "No" is selected
        },
    ]);

    const finalRemoteURL = (customRemoteURL || remoteURL).trim();

    // Add the promotion as a submodule in the main repository
    execSync(`git submodule add --force ${finalRemoteURL} src/promos/${promo}`);
    execSync('git submodule update --init --force --recursive');
}

/**
 * Push the first commit to the remote repository.
 * This function will add all the files, commit them, and push them to the remote repository.
 *
 * @param {string} promoPath The promotion directory path
 */
function promoGitFirstCommit(promoPath) {
    const currentWorkingDirectory = process.cwd();
    process.chdir(promoPath);
    execSync('git checkout main')
    execSync('git add .');
    execSync('git commit -m "Init promotion"');
    execSync('git push --set-upstream origin main');
    console.log(`Changes pushed to the remote repository`);

    process.chdir(currentWorkingDirectory);
}

/**
 * Initialize the promotion directory.
 * This function will determine the next promotion name and create the promotion directory.
 *
 * @async
 */
async function initPromo() {
    const latestPromo = getLatestPromo();
    const [latestStartYear, latestEndYear] = latestPromo.split('-').map(Number);

    const [nextStartYear, nextEndYear] = [latestStartYear + 1, latestEndYear + 1];
    const nextPromo = `${nextStartYear}-${nextEndYear}`;

    const promoName = await confirmCreatePromo(nextPromo);

    if (promoName) {
        await promoGitInit(promoName);
        const promoPath = path.join(PROMOS_DIRECTORY, promoName);
        createPromo(promoPath);
        promoGitFirstCommit(promoPath);
    } else {
        console.log('Promotion creation cancelled.');
    }
}

if (import.meta.url === new URL(import.meta.url).href) {
    initPromo();
}
