# Do-It CHANGELOG

All notable changes to the Do-It website will be documented in this file

## [Scaling Update - Do-It 3.0.0] - 2025-01-13

### Added

#### Functionality
- Added prism.js plugins: `line-numbers`, `copy-to-clipboard`, `toolbar`, `show-language`, `normalize-whitespace`
- Added courses to the cs directory and made it a submodule.
- Added a sidebar navigation to the courses to make it easier to discover the courses.

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
- CC0-1.0 License was added to the repository.
- A new `CHANGELOG.md` file was added to document all the changes made to the website.

#### Deployment
- The website is now hosted on **aioli** at [https://cumin.aioli.ec-m.fr/](https://cumin.aioli.ec-m.fr/).
- Python scrip to start a server and serve the website in production.
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
