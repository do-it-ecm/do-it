# Do-It 3 <span id="do-it-3"></span>

Welcome to the Do-It 3 static website generator. This repository contains the source code and scripts for the Do-It 3 website.

## Table of Contents <span id="table-of-contents"></span>

- [Do-It 3](#do-it-3)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Run In Local](#run-in-local)
  - [Important Links](#important-links)
  - [Contributing](#contributing)
  - [Maintainance](#maintainance)
    - [Maintainers](#maintainers)
    - [Updating](#updating)
  - [License](#license)
  - [Troubleshooting](#troubleshooting)
    - [Windows](#windows)
  - [Contributors](#contributors)

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

### Run In Local <span id="run-in-local"></span>

To run the website in your local environment, you can use the `npm run serve` command.

This command will start a local server on `http://localhost:8080/` and watch for changes in the source files.\
You can access the website by opening the URL in your browser.

PLEASE use this command to **check your changes before pushing them**. It will help you to see how your changes will look on the website.

You can use `npm run serve-nav` to serve the website with the navigation bar. It will help you to navigate through the website more easily, but the build will be slower.

## Important Links <span id="important-links"></span>

- [Do-It 3 Repository on GitHub](https://github.com/do-it-ecm/do-it)
- [Do-It 3 Website](https://do-it.aioli.ec-m.fr/)
- [Eleventy Documentation](https://www.11ty.dev/docs/)

## Contributing <span id="contributing"></span>

Thank you for your interest in contributing to Do-It! We welcome all contributions, whether it be a simple typo fix or a new feature. Please read [the guidelines](./CONTRIBUTING.md) to ensure that your contribution is accepted.

## Maintainance <span id="maintainance"></span>

Do-It 3 is designed to not require any maintenance. In case of an issue, please open an issue on the GitHub repository.

### Maintainers <span id="maintainers"></span>

- [BoxBoxJason](https://github.com/BoxBoxJason)
- [alouradou](https://githubcom/alouradou)
- [François Brucker](https://github.com/FrancoisBrucker)

### Updating <span id="updating"></span>

For any updates to the website, please make sure to document them in the [CHANGELOG](./CHANGELOG.md) file.\
If you want to add a new promotion or student, you can use the helper scripts provided in the `scripts/` directory.

#### Adding a new promotion

This process requires corresponding privileges on the GitHub organization and the GitHub repository.

1. Create a remote repository on GitHub with a README file and a license file (CC0-1.0) in the main branch.
2. Add the new repository to the list of allowed repositories for DO_IT_UPDATE_TOKEN secret in the [GitHub repository settings](https://github.com/organizations/do-it-ecm/settings/secrets/actions/DO_IT_UPDATE_TOKEN)
3. Run the `npm run init-promotion` script and follow the instructions.

#### Adding a new student

This process requires corresponding privileges on the GitHub organization and the GitHub repository.

1. Make sure the corresponding promotion repository is present in the `src/promos/` directory.
2. Make sure you have the permissions to push on the promotion repository.
3. Run the `npm run init-student` script and follow the instructions.

## License <span id="license"></span>

This project is licensed under the Creative Commons Zero v1.0 Universal License - see the [LICENSE](./LICENSE) file for details.
That means you can use the code for any purpose, including commercial purposes, without asking for permission. You can also modify the code as you wish. The only restriction is that you cannot hold the authors liable. You can read more about the license [here](https://creativecommons.org/publicdomain/zero/1.0/).

## Troubleshooting <span id="troubleshooting"></span>

### Windows <span id="windows"></span>

If you are using Windows, you will surely encounter multiple issues while setting up the project.\
We **strongly encourage** you to switch to a **proper operating system** like **Fedora**, Ubuntu or MacOS.\
If you are stuck with Windows, here is a list of common issues and their solutions.

#### Windows Permissions Issue

There is a known issue with Windows permissions that **prevents you from running scripts** by default.\
To fix this issue, you need to open a PowerShell terminal as an administrator and run `Set-ExecutionPolicy RemoteSigned`.

#### Windows OneDrive Issue

**OneDrive will cause issues** with the project files, and it will take a lot of time / space to sync all of them.\
To avoid this issue, you need to move the project files to a location outside of the OneDrive folder. Or you can disable OneDrive sync for the project folder.

## Contributors <span id="contributors"></span>

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">
    <a href="https://github.com/gabrielbarbe00" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874056?v=4" title="gabrielbarbe00" alt="gabrielbarbe00" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/nbert71" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/75083621?v=4" title="nbert71" alt="nbert71" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/LouiseGacoin" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874138?v=4" title="LouiseGacoin" alt="LouiseGacoin" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/EugenieGiraud-Telme" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874091?v=4" title="EugenieGiraud-Telme" alt="EugenieGiraud-Telme" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/Jean-Baptiste-DP" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/77680664?v=4" title="Jean-Baptiste-DP" alt="Jean-Baptiste-DP" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/Timothee-Bermond" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/94856338?v=4" title="Timothee-Bermond" alt="Timothee-Bermond" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/BoxBoxJason" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/62643679?v=4" title="BoxBoxJason" alt="BoxBoxJason" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/TuncayBilgi" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/90749676?v=4" title="TuncayBilgi" alt="TuncayBilgi" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/AntwanV" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/73229456?v=4" title="AntwanV" alt="AntwanV" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/KasimirRomer" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/47687775?v=4" title="KasimirRomer" alt="KasimirRomer" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/alouradou" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/18040415?v=4" title="alouradou" alt="alouradou" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/JeffreyEdisah" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874174?v=4" title="JeffreyEdisah" alt="JeffreyEdisah" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/ossamaabdane" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874071?v=4" title="ossamaabdane" alt="ossamaabdane" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/ThibaultAdelain" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/94785843?v=4" title="ThibaultAdelain" alt="ThibaultAdelain" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/SarahHonore" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874112?v=4" title="SarahHonore" alt="SarahHonore" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/tesdt-ecm-3" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/144914029?v=4" title="tesdt-ecm-3" alt="tesdt-ecm-3" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/royantk" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/91052551?v=4" title="royantk" alt="royantk" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/ThomasP04" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/95079084?v=4" title="ThomasP04" alt="ThomasP04" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/FrancoisBrucker" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/1096186?v=4" title="FrancoisBrucker" alt="FrancoisBrucker" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/ThomasDGH" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/116448822?v=4" title="ThomasDGH" alt="ThomasDGH" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/nathan-gissler" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112874234?v=4" title="nathan-gissler" alt="nathan-gissler" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/leonardbarbo" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/112567740?v=4" title="leonardbarbo" alt="leonardbarbo" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/SamyDiafat" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/118663043?v=4" title="SamyDiafat" alt="SamyDiafat" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/slaeuffer" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/78797063?v=4" title="slaeuffer" alt="slaeuffer" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/lauravietor" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/92258848?v=4" title="lauravietor" alt="lauravietor" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/LucieLbrcd1" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/118168976?v=4" title="LucieLbrcd1" alt="LucieLbrcd1" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/ValentinBilla" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/91964228?v=4" title="ValentinBilla" alt="ValentinBilla" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/williamlalanne1" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/144914730?v=4" title="williamlalanne1" alt="williamlalanne1" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/sophia-capdevielle" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/180400312?v=4" title="sophia-capdevielle" alt="sophia-capdevielle" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
    <a href="https://github.com/MbayeSyAmar" style="display: flex; flex-direction: column; align-items: center; text-decoration: none;"><img src="https://avatars.githubusercontent.com/u/111590312?v=4" title="MbayeSyAmar" alt="MbayeSyAmar" style="width: 50px; height: 50px; border-radius: 50%; margin: 5px;"></a>
</div>
