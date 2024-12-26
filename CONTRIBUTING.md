# Contributing to Do-It

Thank you for your interest in contributing to Do-It! We welcome all contributions, whether it be a simple typo fix or a new feature. Please read the guidelines below to ensure that your contribution is accepted.

## How to contribute

1. Clone the repository and create a new branch:
    - `git clone --recurse-submodules https://github.com/do-it-ecm/do-it.git`
    - `cd do-it`
    - `npm install`
    - `git checkout -b <MY_BRANCH_NAME>`
2. Make your changes and checkout how they look:
    - `npm run serve`
    - Open your browser and go to `http://localhost:8080`
3. Commit your changes:
    - `git add .`
    - `git commit -m "Add my changes"`
4. Push to your branch:
    - `git push --set-upstream origin <MY_BRANCH_NAME>`
5. Create a pull request

Please be aware that a push on the main branch which is not a pull request **will NOT trigger a build**.\
If you want to trigger a build, you can create a pull request from your branch to the main branch. (You can merge the pull request yourself if you want to).

## Helper Scripts

The repository contains a few helper scripts to help you with the development process. You can find them in the `scripts/` directory.

### Compliance Checks
`npm run check-compliance` will run the compliance checks on the repository. It will check the filestructure to find any inconsistencies with the guidelines.

### Init Student
`npm run init-student` will create a new git branch and checkout in it. It will then create the student directory in the corresponding promotion. It will prompt you for the promotion and student name. It will also create the necessary files and directories for the student.

### Init Promotion
`npm run init-promotion` will create a new git submodule for a promotion. It will prompt you for the promotion year. It will also create the necessary files and directories for the promotion. It will set the upstream repository to a new repository that will be created on GitHub.

## Guidelines

### Language

The website preferred language is **French**. If you want to contribute in another language, please make sure to provide a French translation for the content you are adding.

Please make sure to use the correct spelling and grammar. If you are not sure about the spelling of a word, you can use the [Larousse dictionary](https://www.larousse.fr/dictionnaires/francais), or if you are under 957 years old, you can use recent software or AI models specialized in spelling and grammar checking.

### File Structure

#### Do-It

The Do-It repository uses eleventy to generate a static website. Eleventy uses the `src/` directory as the source directory and the `dist/` directory as the output directory.\
It uses markdown or nunjucks files to generate HTML files.\
After several iterations, the file structure has been optimized to be as simple and as clear as possible. It also solves any scaling issues that started to appear with the former versions of the website.

Be wary, the **build output will never contain any media file**. It will only contain files directly built by the eleventy packager script (HTML, CSS, JS).
That means **you cannot package images** directly in the dist directory. **You must reference** the GitHub repository (or any other website) **URL** in the markdown files.\
If you need to add a new image for the website (NOT a student page), you can add it in the `src/assets/` directory and reference its permalink URL in the markdown file.

```
do-it/
├── .eleventy.js (Eleventy configuration file)
├── postcss.config.js (PostCSS configuration file)
├── tailwind.config.js (Tailwind CSS configuration file)
├── src/ (Source files for the website)
│   ├── _includes/ (Reusable HTML snippets)
│   │   ├── layout/ (Layout templates)
│   │   ├── macros/ (Nunjucks macros)
│   ├── cs/ (Courses presentation directory)
│   ├── promos/ (Promotions directory)
│   ├── assets/ (Static assets, medias, styles, scripts for the website, NOT the student assets)
├── CONTRIBUTING.md (Guidelines for contributing)
├── README.md (Project README)
├── package.json (Node.js packages configuration and custom commands definition)
├── package-lock.json (Lock file for Node.js packages)
├── node_modules/ (Node.js packages DO NOT COMMIT)
├── scripts/ (Custom build / utility scripts)
│   ├── compliance/ (Compliance checks scripts)
│   ├── helper/ (Helper scripts)
│   ├── eleventy/ (Website build & Post build scripts)
├── .github/
│   ├── workflows/ (CI/CD workflows for GitHub Actions)
│   │   ├── build.yml (Website build & publish workflow)
│   │   ├── compliance.yml (Compliance checks workflow)
├── .gitmodules (Git submodules configuration)
├── .gitignore (Files to ignore in Git)
├── .git/ (Git repository DO NOT COMMIT)
├── dist/ (Eleventy output directory DO NOT COMMIT)
```

#### Promotions

A promotion directory is a git submodule placed directly in the `src/promos/` directory. It contains the student directories and the project directories for a promotion.

Be wary, the **build output will never contain any media file**. It will only contain files directly built by the eleventy packager script (HTML, CSS, JS).
That means **you cannot package images** directly in the dist directory. **You must reference** the GitHub repository (or any other website) **URL** in the markdown files.\
If you need to add a new image for the website (NOT a student page), you can add it in the `src/promos/<PROMO_DIRECTORY>/assets/` directory and reference its permalink URL in the markdown file.

```
src/promos/ (Promotions directory)
├── 20..-20../ (Promotion directory)
│   ├── index.njk (Promotion index file)
│   ├── mon.njk (Promotion MON references file)
│   ├── pok.njk (Promotion POK references file)
│   ├── assets/ (Promotion assets directory, contains medias, styles, scripts, NOT the student assets)
│   ├── Zola-Gordon/ (Student directory)
│   ├── .github/ (Promotion GitHub Actions workflows)
│   │   ├── workflows/ (CI/CD workflows for GitHub Actions)
│   │   │   ├── compliance.yml (Compliance checks workflow)
│   │   │   ├── update-parent.yml (Sends an update notification to the Do-It parent repository, triggering a rebuild)
│   ├── .git/ (Git repository DO NOT COMMIT)
│   ├── .gitignore (Files to ignore in Git)
```

#### Student Directory

A student directory is a directory placed directly in a promotion directory. It contains the student's work for the course.
The file structure must at be formatted as per the model for it to be correctly displayed and navigable on the website.

Be wary, the **build output will never contain any media file**. It will only contain files directly built by the eleventy packager script (HTML, CSS, JS).
That means **you cannot package images** directly in the dist directory. **You must reference** the GitHub repository (or any other website) **URL** in the markdown files.\
If you need to add a new image for the website (NOT a student page), you can add it in the `src/promos/<PROMO_DIRECTORY>/<STUDENT_DIRECTORY>/assets/` directory and reference its permalink URL in the markdown file.

Under the MON directory, you have to place the student's work for each 
```
Zola-Gordon/ (Student directory)
├── index.md (Student index file)
├── assets/ (Student assets directory, contains medias, styles, scripts)
├── mon/
│   ├── index.md
│   ├── temps-X.Y/
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
│   ├── ...
│   ├── bonus/
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
├── pok/
│   ├── index.md
│   ├── temps-X/
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
│   ├── ...
│   ├── bonus/
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
```
