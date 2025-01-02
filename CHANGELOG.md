# Do-It CHANGELOG

All notable changes to the Do-It website will be documented in this file

## [Scaling Update - Do-It 3.0.0] - 2025-01-13

### Added

- Compliance checks make sure that your changes comply with the guidelines before pushing. Bad practices are no longer allowed.
- The website is now hosted on **aioli** at [https://do-it.aioli.ec-m.fr/](https://do-it.aioli.ec-m.fr/).
- Multiple helper scripts were added to help with the addition of new promotions and students.
- Added auto contributions script to automate the process of adding contributors to the promotion README files.
- Added multiple optimizing script that were added to help with the migration of the images.
- Added a new `CONTRIBUTING.md` file to help new contributors understand the guidelines and the workflow.
- CC0-1.0 License was added to the repository.
- A new `CHANGELOG.md` file was added to document all the changes made to the website.
- Added prism.js plugins: `line-numbers`, `copy-to-clipboard`, `toolbar`, `show-language`, `normalize-whitespace`

### Changed

- Uniformity in the codebase was achieved using better templates.
- Forced file structure compliance and conventions to former students and promotions.
- Simplified many templates and macros to make them more readable and maintainable.
- Revisited the `README.md` file to make it more informative and user-friendly, as it was outdated.
- Now using git submodules to manage the promotion repositories.
- Moved most of the scripts to the `scripts/` directory to make the root directory cleaner.
- Updated the GitHub workflows to force compliance checks before pushing to the repository.
- Frontend modules are no longer imported from local files, but from CDNs (only jsDelivr for now, there is no fallback).
- Sort the node dependencies in the `package.json` file, a lot of them were unecessarely in the dependencies instead of devDependencies.

### Deprecated

- Nothing other than HTML, CSS, and JS are present in the output directory. That means you have to reference the images and other assets using absolute URLs.

## [ Eleventy 3.0 upgrade - Do-It 2.0.0] - 2024-11-06

### Added

### Changed

- Updated the Eleventy version to 3.0.0 to benefit from the new features and bug fixes.

### Deprecated

## [Initial Release - Do-It 1.0.0] - XXXX-XX-XX
