# Do-It CHANGELOG

All notable changes to the Do-It website will be documented in this file

## [Scaling Update - Do-It 3.0.0] - 2025-01-13

### Added

- Compliance checks make sure that your changes comply with the guidelines before pushing. Bad practices are no longer allowed.
- The website is now hosted on **aioli** at [https://do-it.aioli.ec-m.fr/](https://do-it.aioli.ec-m.fr/).
- Multiple helper scripts were added to help with the addition of new promotions and students.
- CC0-1.0 License was added to the repository.
- A new `CHANGELOG.md` file was added to document all the changes made to the website.

### Changed

- Uniformity in the codebase was achieved using better templates.
- Forced file structure compliance and conventions to former students and promotions.
- Simplified many templates and macros to make them more readable and maintainable.
- Revisited the `README.md` file to make it more informative and user-friendly, as it was outdated.
- Now using git submodules to manage the promotion repositories.
- Moved most of the scripts to the `scripts/` directory to make the root directory cleaner.
- Updated the GitHub workflows to force compliance checks before pushing to the repository.

### Deprecated

- Nothing other than HTML, CSS, and JS are present in the output directory. That means you have to reference the images and other assets using absolute URLs.

## [ Eleventy 3.0 upgrade - Do-It 2.0.0] - 2024-11-06

### Added

### Changed

- Updated the Eleventy version to 3.0.0 to benefit from the new features and bug fixes.

### Deprecated

## [Initial Release - Do-It 1.0.0] - XXXX-XX-XX