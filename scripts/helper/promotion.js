/**
 * Helper script to create a standard promotion directory and start contributing right away.
 *
 * This script will create a new git submodule in the `src/promos` directory.
 * Is used when running the command `npm run init-promotion`
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import inquirer from 'inquirer';
import { Octokit } from '@octokit/rest';
import { simpleGit } from "simple-git"

// Default organization name
const DEFAULT_ORG_NAME = 'do-it-ecm';
// Default promotion repository name (must add the year)
const DEFAULT_PROMO_REPOSITORY_NAME = 'promo-%s';
// Default promotion repository description (must add the year)
const DEFAULT_PROMO_REPOSITORY_DESCRIPTION = '%s students work content';
// Default promotion team description (must add the year)
const DEFAULT_PROMO_DESCRIPTION = 'Graduates from year %s';
// Default team repositories
const DEFAULT_TEAM_REPOSITORIES = ['courses', 'do-it', 'slides'];
// Default update token secret name
const UPDATE_SECRET_NAME = 'DO_IT_UPDATE_TOKEN'
// Valid promotion directory name regex
const PROMO_DIRECTORY_REGEX = /^[0-9]{4}-[0-9]{4}$/;
// Path to the directory where the promotions are stored
export const PROMOS_DIRECTORY = path.join(process.cwd(), 'src', 'promos');
// Remote organization URL
const REMOTE_ORG_URL = `https://github.com/${DEFAULT_ORG_NAME}`;
// Default GitHub workflow
const DEFAULT_GITHUB_WORKFLOW = await fs.readFile(path.join('templates', 'promo', 'update-parent.yml'), 'utf-8');
// Default promo index page
const DEFAULT_INDEX_PAGE = await fs.readFile(path.join('templates', 'promo', 'index.njk'), 'utf-8');
// Default promo POK page
const DEFAULT_POK_PAGE = await fs.readFile(path.join('templates', 'promo', 'pok-index.njk'), 'utf-8');
// Default promo MON page
const DEFAULT_MON_PAGE = await fs.readFile(path.join('templates', 'promo', 'mon-index.njk'), 'utf-8');
// Default projects index page
const DEFAULT_PROJECTS_PAGE = await fs.readFile(path.join('templates', 'promo', 'projects-index.njk'), 'utf-8');
// Default gitignore file
const DEFAULT_GITIGNORE_CONTENT = await fs.readFile(path.join('templates', 'promo', '.gitignore'), 'utf-8');

/**
 * List all the promotion directories in the `src/promos` directory.
 *
 * @async
 *
 * @returns {Promise<string[]>} The promotion directories
 */
export async function listPromos() {
    const promos = await fs.readdir(PROMOS_DIRECTORY);
    const validPromos = promos.filter(promo => PROMO_DIRECTORY_REGEX.test(promo));
    return validPromos;
}

/**
 * Get the latest promotion directory.
 * The latest promotion is determined by the promotion directory name.
 *
 * @returns {Promise<string>} The latest promotion directory
 */
async function getLatestPromo() {
    const promos = await listPromos();
    const currentYear = new Date().getFullYear();
    return promos.length ? promos.sort()[promos.length - 1] : `${currentYear - 1}-${currentYear}`;
}

/**
 * Creates all of the required resources on GitHub for the promotion.
 *
 * @async
 *
 * @param {string} promo The promotion name
 * @param {string} githubToken The GitHub (API) token
 *
 * @returns {Promise<void>}
 */
async function createPromo(promo, githubToken) {
    // Authenticated Octokit instance
    const octokit = new Octokit({ auth: githubToken });
    // Promotion directory name
    const promoRepositoryName = DEFAULT_PROMO_REPOSITORY_NAME.replace('%s', promo);
    // Promotion repository description
    const promoRepositoryDescription = DEFAULT_PROMO_REPOSITORY_DESCRIPTION.replace('%s', promo);
    // Promotion remote URL
    const promotionRepositoryURL = `${REMOTE_ORG_URL}/${promoRepositoryName}.git`;
    // Promotion team name
    const promoTeamName = promo;
    // Promotion team description
    const promoDescription = DEFAULT_PROMO_DESCRIPTION.replace('%s', promo);
    // Relative path to promotion
    const promoPath = path.join(PROMOS_DIRECTORY, promo);

    // Create the organization team
    const promoTeamId = await createOrganizationTeam(octokit, DEFAULT_ORG_NAME, promoTeamName, promoDescription);

    // Create the GitHub organization repository
    const promoRepositoryId = await createOrganizationRepository(octokit, DEFAULT_ORG_NAME, promoRepositoryName, promoRepositoryDescription, promoTeamId);

    // Set the secret permissions for the new repository
    await addSecretVisibilityToRepository(octokit, DEFAULT_ORG_NAME, UPDATE_SECRET_NAME, promoRepositoryId);

    // Set the repos permissions to maintainers for the team
    const promises = [...DEFAULT_TEAM_REPOSITORIES, promoRepositoryName].map(repo => octokit.rest.teams.addOrUpdateRepoPermissionsInOrg({
        org: DEFAULT_ORG_NAME,
        team_slug: promoTeamName,
        owner: DEFAULT_ORG_NAME,
        repo,
        permission: 'maintain',
    }));
    await Promise.all(promises);

    // Add the promotion repository as a submodule if it does not already exist
    const gitRepo = simpleGit({ baseDir: process.cwd(), binary: 'git' });
    try {
        await gitRepo.subModule(['status', promoPath])
    } catch (error) {
        await gitRepo.submoduleAdd(promotionRepositoryURL, promoPath);
        console.log(`Promotion repository added as submodule at ${promoPath}`);
    }

    // Create the GitHub repository files
    await createPromoFS(promoPath);

    // Confirm adding the changes and pushing to the remote repository
    await confirmGitPush(promoPath, ['*'], `Default content for promotion ${promo}`);
    await confirmGitPush(process.cwd(), ['.gitmodules', promoPath], `Add submodule for promotion ${promo}`);
}

/**
 * Create the promotion directory and all the necessary files.
 *
 * @param {string} promoPath The promotion directory path
 *
 * @returns {Promise<void>}
 */
async function createPromoFS(promoPath) {
    return Promise.all([
        createFile(path.join(promoPath, '.github', 'workflows', 'update-parent.yml'), DEFAULT_GITHUB_WORKFLOW),
        createFile(path.join(promoPath, '.gitignore'), DEFAULT_GITIGNORE_CONTENT),
        createFile(path.join(promoPath, 'index.njk'), DEFAULT_INDEX_PAGE),
        createFile(path.join(promoPath, 'pok.njk'), DEFAULT_POK_PAGE),
        createFile(path.join(promoPath, 'mon.njk'), DEFAULT_MON_PAGE),
        createFile(path.join(promoPath, '_projets', 'index.njk'), DEFAULT_PROJECTS_PAGE),
    ]);
}

/**
 * Initialize the promotion directory.
 * This function will determine the next promotion name and create the promotion directory.
 *
 * @async
 */
async function initPromo() {
    const latestPromo = await getLatestPromo();
    const [latestStartYear, latestEndYear] = latestPromo.split('-').map(Number);

    const [nextStartYear, nextEndYear] = [latestStartYear + 1, latestEndYear + 1];
    const nextPromo = `${nextStartYear}-${nextEndYear}`;

    const promoName = await confirmCreatePromo(nextPromo);
    const githubToken = await requestUserToken();

    if (promoName) {
        createPromo(promoName, githubToken);
    } else {
        console.log('Promotion creation cancelled.');
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    initPromo();
}

// ========== GITHUB API FUNCTIONS ==========
/**
 * Add a new repository to the visibility of the secret.
 *
 * @param {Octokit} octokit - The authenticated octokit instance
 * @param {string} organization - The organization name
 * @param {string} secretName - The secret name
 * @param {number} newRepositoryId - The new repository ID
 *
 * @returns {Promise<void>}
 */
async function addSecretVisibilityToRepository(octokit, organization, secretName, newRepositoryId) {
    // Retrieve the secret visible repositories
    const secretRepositories = octokit.rest.actions.listSelectedReposForOrgSecret({
        org: organization,
        secret_name: secretName,
    });

    // Add repository visibility to secret
    await octokit.rest.actions.setSelectedReposForOrgSecret({
        org: organization,
        secret_name: secretName,
        selected_repository_ids: [...(await secretRepositories).data.repositories.map(repo => repo.id), newRepositoryId],
    });
    console.log(`Added secret ${secretName} visibility to repository ${newRepositoryId}`);
}

/**
 * Create a new organization team.
 * If the team already exists, it will return the existing team id.
 *
 * @param {Octokit} octokit - The authenticated octokit instance
 * @param {string} organization - The organization name
 * @param {string} promoTeamName - The promotion team name
 * @param {string} promoDescription - The promotion team description
 *
 * @returns {Promise<Number>}
 */
async function createOrganizationTeam(octokit, organization, promoTeamName, promoDescription) {
    // Create the GitHub organization team
    let promoTeam;
    try {
        promoTeam = await octokit.teams.getByName({ org: organization, team_slug: promoTeamName });
    } catch (error) {
        if (error.status === 404) {
            promoTeam = await octokit.teams.create({
                org: organization,
                name: promoTeamName,
                description: promoDescription,
                repo_names: DEFAULT_TEAM_REPOSITORIES.map(repo => `${organization}/${repo}`),
                permission: "push",
                privacy: "closed",
            });
        } else {
            throw error;
        }
    }
    console.log(`Team ${promoTeamName} created in ${organization}.`);

    let organizationRoles = await octokit.rest.orgs.listOrgRoles({ org: organization });
    console.log("Retrieved existing organization roles.");
    let readAllRepositoriesId = organizationRoles.data.roles.find(role => role.name === 'all_repo_read').id;
    console.log("Retrieved role read all repositories.");

    // Assign role read all repositories to the team
    await octokit.rest.orgs.assignTeamToOrgRole({
        org: organization,
        team_slug: promoTeamName,
        role_id: readAllRepositoriesId,
    });
    console.log(`Team ${promoTeamName} assigned to role read all repositories.`);

    return promoTeam.data.id;
}

/**
 * Create a new organization repository.
 * If the repository already exists, it will return the existing repository id.
 * The repository will be created in the organization and assigned to the owner team.
 *
 * @param {Octokit} octokit - The authenticated octokit instance
 * @param {string} organization - The organization name
 * @param {string} repositoryName - The repository name
 * @param {string} description - The repository description
 * @param {number} ownerTeamId - The owner team id
 *
 * @returns {Promise<Number>}
 */
async function createOrganizationRepository(octokit, organization, repositoryName, description, ownerTeamId) {
    let repository;
    try {
        repository = await octokit.repos.get({ owner: organization, repo: repositoryName });
    } catch (error) {
        if (error.status === 404) {
            repository = await octokit.rest.repos.createInOrg({
                name: repositoryName,
                org: organization,
                description,
                team_id: ownerTeamId,
                auto_init: true,
            });
        } else {
            throw error;
        }
    }
    console.log(`Repository ${organization}/${repositoryName} created or found`);
    return repository.data.id;
}

// ========== COMMAND LINE UTILITY FUNCTIONS ==========
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
 * Prompt the user for their GitHub auth token (must have API permissions)
 *
 * @async
 *
 * @returns {Promise<string>} The GitHub API token
 */
async function requestUserToken() {
    const { githubToken } = await inquirer.prompt([
        {
            type: 'password',
            name: 'githubToken',
            message: 'Enter your GitHub API token:',
            validate: (input) => {
                return input.trim().length > 0 ? true : 'GitHub API token is required';
            },
        },
    ]);

    return githubToken.trim();
}

/**
 * Prompt the user for confirmation before adding all changes and pushing to the remote repository.
 *
 * @async
 *
 * @param {string} repoPath The repository path
 * @param {string[]} filesToAdd The files to add to the repository
 * @param {string} commitMessage The commit message
 */
async function confirmGitPush(repoPath, filesToAdd, commitMessage) {
    const { confirm } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: `Do you want to add the following files ${filesToAdd} to the repository ${repoPath} ?}`,
            default: true,
        },
    ]);

    if (confirm) {
        const gitRepo = simpleGit({ baseDir: repoPath, binary: 'git' });
        await gitRepo.add(filesToAdd);
        await gitRepo.commit(commitMessage);
        await gitRepo.push();
    } else {
        console.log('Changes not added to the repository.');
    }
}
