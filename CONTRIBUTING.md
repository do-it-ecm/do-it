# Contributing to Do-It

Thank you for your interest in contributing to Do-It! We welcome all contributions, whether it be a simple typo fix or a new feature. Please read the guidelines below to ensure that your contribution is accepted.

## Table of Contents <span id="table-of-contents"></span>

- [Table of Contents](#table-of-contents)
- [How to contribute](#how-to-contribute)
- [Helper Scripts](#helper-scripts)
    - [Compliance Checks](#compliance-checks)
    - [Serve](#serve)
    - [Init Student](#init-student)
    - [Init Promotion](#init-promotion)
- [ShortCodes](#shortcodes)
    - [SizedImage](#sizedimage)
    - [Attention](#attention)
    - [Details](#details)
    - [Exercice](#exercice)
    - [Faire](#faire)
    - [Info](#info)
    - [Lien](#lien)
    - [Lien Interne](#lien-interne)
    - [Note](#note)
    - [Prérequis](#prérequis)
- [Guidelines](#guidelines)
    - [Language](#language)
    - [File Structure](#file-structure)
        - [Do-It](#do-it)
        - [Promotions](#promotions)
        - [Student Directory](#student-directory)

## How to contribute <span id="how-to-contribute"></span>

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

## Helper Scripts <span id="helper-scripts"></span>

The repository contains a few helper scripts to help you with the development process. You can find them in the `scripts/` directory.

### Compliance Checks <span id="compliance-checks"></span>
`npm run check-compliance` will run the compliance checks on the repository. It will check the filestructure to find any inconsistencies with the guidelines.

### Serve <span id="serve"></span>
`npm run serve` will build the website and serve it on a local server. It will watch for changes in the source files and rebuild the website when a change is detected. It will also reload the browser when the build is complete.

PLEASE use this command to **check your changes before pushing them**. It will help you to see how your changes will look on the website.

You can use `npm run serve-nav` to serve the website with the navigation bar. It will help you to navigate through the website more easily, but the build will be slower.

### Init Student <span id="init-student"></span>
`npm run init-student` will create a new git branch and checkout in it. It will then create the student directory in the corresponding promotion. It will prompt you for the promotion and student name, then for a confirmation. It will also create the necessary files and directories for the student.

### Init Promotion <span id="init-promotion"></span>
`npm run init-promotion` will create a new git submodule for a promotion. It will prompt you for the promotion year. It will also create the necessary files and directories for the promotion. It will set the upstream repository to a new repository that will be created on GitHub.

## ShortCodes <span id="shortcodes"></span>

The website uses shortcodes to generate HTML content. You can find the shortcodes in the `scripts/eleventy/markdown/shortcodes/` directory.\
You can use the shortcodes in your markdown files to generate styled content that fits the website's design.

### SizedImage <span id="sizedimage"></span>

The `sizedImage` is a **regular shortcode** used to generate an image with a specific formatted size.\
You can use it like this:

```markdown
{% sizedImage "<IMAGE_LINK>", "<IMAGE_ALT>", "<IMAGE_SIZE>", <CENTER_IMAGE> %}
```

- `<IMAGE_LINK>`: The URL of the image. (Mandatory)
- `<IMAGE_ALT>`: The alt text of the image. (Mandatory)
- `<IMAGE_SIZE>`: The size of the image. You can use `veryTinyIcon`, `tinyIcon`, `smallIcon`, `icon`, `bigIcon`, `biggerIcon`, `hugeIcon`, `smallImg`, `img`, `bigImg`, `smallBanner`, `banner`, `bigBanner`. (Default is `img`)
- `<CENTER_IMAGE>`: A boolean to center the image. You can use `true` or `false`. (Default is `true`)

### Attention <span id="attention"></span>

The `attention` is a **paired shortcode** used to generate a styled attention block.\
You can use it like this:

```markdown
{% attention "<ATTENTION_TITLE>" %}
<ATTENTION_CONTENT>
{% endattention %}
```

The default title is **Attention**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Details <span id="details"></span>

The `details` is a **paired shortcode** used to generate a styled details block.\
You can use it like this:

```markdown
{% details "<DETAILS_TITLE>" %}
<DETAILS_CONTENT>
{% enddetails %}
```

The default title is **Détails**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Exercice <span id="exercice"></span>

The `exercice` is a **paired shortcode** used to generate a styled exercice block.\
You can use it like this:

```markdown
{% exercice "<EXERCICE_TITLE>" %}
<EXERCICE_CONTENT>
{% endexercice %}
```

The default title is **Exercice**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Faire <span id="faire"></span>

The `faire` is a **paired shortcode** used to generate a styled faire block.\
You can use it like this:

```markdown
{% faire "<FAIRE_TITLE>" %}
<FAIRE_CONTENT>
{% endfaire %}
```

The default title is **À faire**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Info <span id="info"></span>

The `info` is a **paired shortcode** used to generate a styled info block.\
You can use it like this:

```markdown
{% info "<INFO_TITLE>" %}
<INFO_CONTENT>
{% endinfo %}
```

The default title is **Information**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Lien <span id="lien"></span>

The `lien` is a **paired shortcode** used to generate a styled links section.\
You can use it like this:

```markdown
{% lien "<LIEN_TITLE>" %}
<LIEN_CONTENT>
{% endlien %}
```

The default title is **Liens**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Lien Interne <span id="lien-interne"></span>

The `lieninterne` is a **regular shortcode** used to generate an internal link, with a summary of the linked content.\
You can use it like this:

```markdown
{% lieninterne "<LINK_URL>" %}
```

- `<LINK_URL>`: The URL of the link. (Mandatory)

### Note <span id="note"></span>

The `note` is a **paired shortcode** used to generate a styled note block.\
You can use it like this:

```markdown
{% note <NOTE_TITLE> %}
<NOTE_CONTENT>
{% endnote %}
```

The default title is **Note**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

### Prérequis <span id="prérequis"></span>

The `prerequis` is a **paired shortcode** used to generate a styled prerequis block.\
You can use it like this:

```markdown
{% prerequis "<PREREQUIS_TITLE>" %}
<PREREQUIS_CONTENT>
{% endprerequis %}
```

The default title is **Prérequis**. You can set the title to an empty string to remove it.\
You can use any length of content (multiline, images, code blocks,...) inside the shortcode.

## Guidelines <span id="guidelines"></span>

### Language <span id="language"></span>

The website preferred language is **French**. If you want to contribute in another language, please make sure to provide a French translation for the content you are adding.

Please make sure to use the correct spelling and grammar. If you are not sure about the spelling of a word, you can use the [Larousse dictionary](https://www.larousse.fr/dictionnaires/francais), or if you are under 957 years old, you can use recent software or AI models specialized in spelling and grammar checking.

### File Structure <span id="file-structure"></span>

#### Do-It <span id="do-it"></span>

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
│   ├── optimize/ (Useful script to reduce build size)
├── .github/
│   ├── workflows/ (CI/CD workflows for GitHub Actions)
│   │   ├── build.yml (Website build & publish workflow)
│   │   ├── compliance.yml (Compliance checks workflow)
├── .gitmodules (Git submodules configuration)
├── .gitignore (Files to ignore in Git)
├── .git/ (Git repository DO NOT COMMIT)
├── dist/ (Eleventy output directory DO NOT COMMIT)
```

#### Promotions <span id="promotions"></span>

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

#### Student Directory <span id="student-directory"></span>

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
