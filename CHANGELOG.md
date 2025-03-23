# Do-It CHANGELOG

All notable changes to the Do-It website will be documented in this file

## [Dark Mode - Do-It 3.4.0] - 2025-03-23

### Added

- Added the `citation` paired shortcode to generate a stylish citation block.
- Added a dark mode to the website to make it easier on the eyes at night.
- Added meta tags and other SEO improvements to the website to improve its visibility on search engines.
- Added an auto generated sitemap to help search engines index the website.

### Changed

- Reformat existing shortcodes to fix a improper syntax issue
- Merged the compliance check into the build workflow (as a preliminary step) to avoid redundant pulls
- Replaced `résumé` with `description` in the markdown files to avoid non-ASCII characters

## [Security & Automation - Do-It 3.3.0] - 2025-03-17

### Breaking

- Replace the "`compliance check` directory by a separate submodule

### Added

- Added autofocus on the `pagefind` input to make it easier to search for a page.
- GitHub action dedicated to the compliance check of the website before pushing to the repository.
- Added timers to the build process to measure the time taken by each step.

### Changed

- Fixed a visual issue with sidebars in screen between 1536px and 1616px
- Updated a few dependencies to their latest versions
- Renamed shortcodes to camelCase (lieninterne -> lienInterne, currentyear -> currentYear)
- Upgraded the `init-student` script
    - Use git sdk to avoid the use of raw git commands
    - Use concurrent requests to speed up the process
    - Using templates files instead of raw variables for the default student files
- Upgraded the `init-promotion` script
    - Use git sdk to avoid the use of raw git commands
    - Use concurrent requests to speed up the process
    - Using the octokit library to interact with the GitHub API to automatically create all required resources
    - Using templates files instead of raw variables for the default promo files

### Removed

- Removed `markdown-it-attrs` plugin as it was not used and causing useless warnings

## [Auto Deploy - Do-It 3.2.1] - 2025-02-27

### Added

- New GitHub action to automatically build and publish the website image to the GitHub Container Registry when pushing to the `main` branch with a tag.

## [TailwindCSS upgrade - Do-It 3.2.0] - 2025-02-05

### Changed

- Upgraded TailwindCSS from version 3 to version 4 to benefit from the new features, bug fixes and x1000 performance improvements.

## [Nginx max payload increase - Do-It 3.1.1] - 2025-02-04

### Changed

- Fixed `client_max_body_size` in the nginx configuration to allow larger payloads to be sent to the server. (To accept the update payload from github webhook)
- Upgraded the auto update cronjob on the container

## [Deployment Upgrade - Do-It 3.1.0] - 2025-02-02

### Added

- Gzip compression is now enabled on production buildon the server to reduce the size of the files sent to the client.
- Containerized the website using Docker to make it easier to deploy and maintain. The image is in the GitHub Container Registry.
- Upgraded and optimized nginx configuration to improve the performance of the website.

### Changed

- Pagefind is now only created for the production build to reduce the build time.

## [Scaling Update - Do-It 3.0.0] - 2025-01-13

### Added

#### Functionality

- Added prism.js plugins: `line-numbers`, `copy-to-clipboard`, `toolbar`, `show-language`, `normalize-whitespace`
- Added courses to the cs directory and made it a submodule.
- Added a sidebar navigation to the courses to make it easier to discover the courses.
- Added `markdown-it-toc-done-right` plugin to generate a table of contents for the markdown files.
- Added a `sommaire` paired shortcode to generate a table of contents for the markdown files.
- Added a `sizedImage` single shortcode to generate an image with a specific size.

#### Compliance

- Compliance checks make sure that your changes comply with the guidelines before pushing. Bad practices are no longer allowed.
- Multiple helper scripts were added to help with the addition of new promotions and students.

#### Optimization

- Added multiple optimizing script that were added to help with the migration of the images.
- Build time rewrite of the media URLs (images, videos, etc.) to use the GitHub raw URL instead of the local path.
- Minifying the HTML output using `html-minifier-terser` to reduce the size of the files.

#### Documentation

- Added auto contributions script to automate the process of adding contributors to the promotion README files.
- Added a new `CONTRIBUTING.md` file to help new contributors understand the guidelines and the workflow.
- A new `CHANGELOG.md` file was added to document all the changes made to the website.

#### Deployment

- The website is now hosted on **aioli** at [https://do-it.aioli.ec-m.fr/](https://do-it.aioli.ec-m.fr/).
- Auto update of server when pushing to build (gh-pages) branch.

### Changed

#### Functionality

- Now using git submodules to manage the promotion repositories.

#### Compliance

- Uniformity in the codebase was achieved using better templates.
- Forced file structure compliance and conventions to former students and promotions.
- Moved most of the scripts to the `scripts/` directory to make the root directory cleaner.
- Updated the GitHub workflows to force compliance checks before pushing to the repository.

#### Optimization

- Simplified many templates and macros to make them more readable and maintainable.
- Frontend modules are no longer imported from local files, but from CDNs (only jsDelivr for now, there is no fallback).
- Tailwind CSS now outputs a minified CSS file (it was not minified before).
- Sort the node dependencies in the `package.json` file, a lot of them were unecessarely in the dependencies instead of devDependencies.

#### Documentation

- Revisited the `README.md` file to make it more informative and user-friendly, as it was outdated.
- Revisited the `contribuer-au-site.md` file to update to current guidelines and workflow. It was outdated.
- Moved the `contribuer-au-site.md` file to `/contribuer` which is now directly accessible from the website homepage.

### Deprecated

- Nothing other than HTML, CSS, and JS are present in the output directory. That means you have to reference the images and other assets using absolute URLs. (The rewrite is done at build time automatically)

## [Eleventy 3.0 upgrade - Do-It 2.0.0] - 2024-11-06

### Added

### Changed

- Updated the Eleventy version to 3.0.0 to benefit from the new features and bug fixes.

### Deprecated

## [Initial Release - Do-It 1.0.0] - XXXX-XX-XX
