# Do-It 3 <span id="do-it-3"></span>

Welcome to the Do-It 3 static website generator. This repository contains the source code and scripts for the Do-It 3 website.

## Table of Contents <span id="table-of-contents"></span>

- [Do-It 3](#do-it-3)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Important Links](#important-links)
  - [Contributing](#contributing)
  - [License](#license)
  - [Troubleshooting](#troubleshooting)
    - [Windows](#windows)

## Getting Started <span id="getting-started"></span>

Follow these instructions to create a local copy of the Do-It 3 website and start contributing to it.

### Prerequisites <span id="prerequisites"></span>

To install, compile and run the website, you need the following software on your machine:

#### Git

To check if git is installed on your machine, run ```git --version``` in your terminal.\
If you don't have git installed, you can download it from [here](https://git-scm.com/downloads) for windows users.\
If you are using a mac, you can use [brew](https://brew.sh) to install it: `brew install git`.\
If you are using a linux distribution, you can use your package manager to install it: `sudo apt-get install git`.

#### Node

To check if node is installed on your machine, run ```node --version``` in your terminal.\
If you don't have node installed, you can follow the installation workflow from [here](https://nodejs.org/en/download/) for any operating system.\
We strongly recommend to install the latest available LTS version of node using a node version manager like [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

You must also ensure to have a Node package manager (npm OR yarn OR any other of your choice) installed on your machine.\
To check if npm is installed on your machine, run ```npm --version``` in your terminal.\
If you don't have npm installed, you can follow the installation workflow using nvm from [here](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

### Installation <span id="installation"></span>

1. Clone the repository to your local machine
2. Install the dependencies
3. Start contributing (see [Contributing](./CONTRIBUTING.md))

```bash
git clone --recurse-submodules https://github.com/do-it-ecm/do-it.git
cd do-it
npm install
```

## Important Links <span id="important-links"></span>

- [Do-It 3 Repository on GitHub](https://github.com/do-it-ecm/do-it)
- [Do-It 3 Website](https://do-it.aioli.ec-m.fr/)
- [Eleventy Documentation](https://www.11ty.dev/docs/)

## Contributing <span id="contributing"></span>

Thank you for your interest in contributing to Do-It! We welcome all contributions, whether it be a simple typo fix or a new feature. Please read [the guidelines](./CONTRIBUTING.md) to ensure that your contribution is accepted.

## License <span id="license"></span>

This project is licensed under the Creative Commons Zero v1.0 Universal License - see the [LICENSE](./LICENSE) file for details.
That means you can use the code for any purpose, including commercial purposes, without asking for permission. You can also modify the code as you wish. The only restriction is that you cannot hold the authors liable. You can read more about the license [here](https://creativecommons.org/publicdomain/zero/1.0/).

## Troubleshooting <span id="troubleshooting"></span>

### Windows <span id="windows"></span>

If you are using Windows, you will surely encounter multiple issues while setting up the project.\
We **strongly encourage** you to switch to a **proper operating system **like **Fedora**, Ubuntu or MacOS.\
If you are stuck with Windows, here is a list of common issues and their solutions.

#### Windows Permissions Issue

There is a known issue with Windows permissions that **prevents you from running scripts** by default.\
To fix this issue, you need to open a PowerShell terminal as an administrator and run `Set-ExecutionPolicy RemoteSigned`.

#### Windows OneDrive Issue

**OneDrive will cause issues** with the project files, and it will take a lot of time / space to sync all of them.\
To avoid this issue, you need to move the project files to a location outside of the OneDrive folder. Or you can disable OneDrive sync for the project folder.
