/**
 * Helper script to create a standard student directory and start contributing right away.
 * 
 * This script will create a new directory with a student filestructure in the `src/promos/<PROMO_DIRECTORY>/<STUDENT_DIRECTORY>` directory.
 * Is used when running the command `npm run init-student`
 */

import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';
import { listPromos, PROMOS_DIRECTORY } from './promotion.js';
import { VALID_NAME_REGEX } from '../compliance/filenames.js';

// Valid student name, must be letters, special accentuated characters, at least 1 character and max 50 characters
const VALID_STUDENT_REGEX = /^[\p{L}\p{M}'\-\s]+$/u;
// Default student profile content
const DEFAULT_PROFILE_CONTENT = `---
layout: layout/profile.njk

title: "STUDENT_NAME"
authors:
    - "STUDENT_NAME"
---

Bienvenue sur le profil de STUDENT_NAME.

## POK & MON

- [POK](./pok)
- [MON](./mon)

## Projet
`;
// Default student POK index content
const DEFAULT_POK_INDEX_CONTENT = `---
layout: layout/pok-index.njk

title: "POK de STUDENT_NAME"
authors:
  - "STUDENT_NAME"
---

Ensemble des POK réalisés par STUDENT_NAME.

- [POK 1](./temps-1)
- [POK 2](./temps-2)
- [POK 3](./temps-3)
`;
// Default student MON index content
const DEFAULT_MON_INDEX_CONTENT = `---
layout: layout/mon-index.njk

title: "MON de STUDENT_NAME"
authors:
  - "STUDENT_NAME"
---

Ensemble des MON réalisés par STUDENT_NAME.

- [MON 1.1](./temps-1.1)
- [MON 1.2](./temps-1.2)
- [MON 2.1](./temps-2.1)
- [MON 2.2](./temps-2.2)
- [MON 3.1](./temps-3.1)
- [MON 3.2](./temps-3.2)
`;
// Default MON content
const DEFAULT_MON_CONTENT = `---
layout: layout/mon.njk

title: "Titre du MON PERIOD.HALF"
authors:
  - STUDENT_NAME

date: 1970-09-01

temps: PERIOD
tags:

résumé: "Un MON traitant d'un sujet."
---

{% prerequis %}

Liste des prérequis du POK ET/OU MON

{% endprerequis %}
{% lien %}

Les lien utiles pour la compréhension de celui-ci.

{% endlien %}

Quelques phrases permettant de connaître, sans jargon ni blabla, le contenu de ce MON. On oubliera pas de donner :

- le niveau et les prérequis nécessaires en utilisant la balise [prerequis](/cs/contribuer-au-site/#prerequis)
- les autres POK & MON en rapport en utilisant la balise [lien](/cs/contribuer-au-site/#lien)

## Contenu

Le contenu du MON.
`;
// Default POK content
const DEFAULT_POK_CONTENT = `---
layout: layout/pok.njk

title: "Titre du POK du temps PERIOD"
authors:
  - STUDENT_NAME

date: 1970-09-01

temps: PERIOD
tags:

résumé: Un POK traitant d'un sujet.
---

{% prerequis %}

Liste des prérequis du POK ET/OU MON

{% endprerequis %}
{% lien %}

Les lien utiles pour la compréhension de celui-ci.

{% endlien %}

Quelques phrases permettant de connaître, sans jargon ni blabla, le contenu de ce POK. On oubliera pas de donner :

- le niveau et les prérequis nécessaires en utilisant la balise [prerequis](/cs/contribuer-au-site/#prerequis)
- les autres POK & MON en rapport en utilisant la balise [lien](/cs/contribuer-au-site/#lien)

## Tâches

### Sprints

But final.

#### Sprint 1

Liste des taches que l'on pense faire. On coche si la tache est réalisée. A la fin du sprint on fait une petite étude post-mortem pour voir ce qui s'est passé et les ajustement à faire pour le prochain sprint, pok.

- [ ] Une tâche non réalisée
- [x] Une tâche réalisée

#### Sprint 2

- [ ] Une tâche non réalisée
- [x] Une tâche réalisée

Liste des taches que l'on pense faire. On coche si la tache est réalisée. A la fin du sprint on fait une petite étude post-mortem pour voir ce qui s'est passé et les ajustement à faire pour le prochain sprint, pok.

### Horodatage

Toutes les séances et le nombre d'heure que l'on y a passé.

| Date | Heures passées | Indications |
| -------- | -------- |-------- |
| Mardi 27/08  | 1H  | Travail sur la trame du site |

## Contenu

Le contenu du POK.

### Premier Sprint

### Second Sprint
`;

async function selectPromo() {
    const promos = listPromos();
    if (promos.length === 0) {
        console.log('No promotions available.');
        return;
    }

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'promo',
            message: 'Select a promotion:',
            choices: promos
        }
    ]);

    console.log(`Creating student in selected: ${answer.promo}`);
    return answer.promo;
}


async function inputStudentName() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter your first name (can use accents):',
            validate: (input) => {
                if (VALID_STUDENT_REGEX.test(input.trim())) {
                    return true;
                } else {
                    return 'First name must only contain letters and be less than 50 characters (can use accents).';
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter your last name (can use accents):',
            validate: (input) => {
                if (VALID_STUDENT_REGEX.test(input.trim())) {
                    return true;
                } else {
                    return 'Last name must only contain letters and be less than 50 characters (can use accents).';
                }
            }
        }
    ]);

    return [answers.firstName.trim(), answers.lastName.trim()];
}


function createStudentDirectory(promo, studentFirstAndLastName) {
    const studentName = studentFirstAndLastName.join(' ');
    const [firstName, lastName] = studentFirstAndLastName;
    const studentDirectoryName = `${removeAccents(firstName)}-${removeAccents(lastName)}`;

    const studentDirectory = path.join(PROMOS_DIRECTORY, promo, studentDirectoryName);
    if (fs.existsSync(studentDirectory)) {
        console.error(`Student directory already exists: ${studentDirectory}`);
        process.exit(1);
    } else if (!VALID_NAME_REGEX.test(studentDirectoryName)) {
        console.error(`Invalid student directory name: ${studentDirectoryName}\nPlease make sure the student directory name is only letters, dashes and numbers.`);
        process.exit(1);
    } else {
        fs.mkdirSync(studentDirectory, { recursive: true });
        fs.writeFileSync(path.join(studentDirectory, 'index.md'), DEFAULT_PROFILE_CONTENT.replace(/STUDENT_NAME/g, studentName));

        // Create the POK directory with the index file
        const pokDirectory = path.join(studentDirectory, 'pok');
        fs.mkdirSync(pokDirectory, { recursive: true });
        fs.writeFileSync(path.join(pokDirectory, 'index.md'), DEFAULT_POK_INDEX_CONTENT.replace(/STUDENT_NAME/g, studentName));

        // Create the MON directory with the index file
        const monDirectory = path.join(studentDirectory, 'mon');
        fs.mkdirSync(monDirectory, { recursive: true });
        fs.writeFileSync(path.join(monDirectory, 'index.md'), DEFAULT_MON_INDEX_CONTENT.replace(/STUDENT_NAME/g, studentName));

        // Create the assets directory
        const assetsDirectory = path.join(studentDirectory, 'assets');
        fs.mkdirSync(assetsDirectory, { recursive: true });

        // Create the periods directories
        for (let period = 1; period <= 3; period++) {
            // Create the POK period directory and index file
            const pokPeriodDirectory = path.join(pokDirectory, `temps-${period}`);
            fs.mkdirSync(pokPeriodDirectory, { recursive: true });
            fs.writeFileSync(path.join(pokPeriodDirectory, 'index.md'), DEFAULT_POK_CONTENT.replace(/STUDENT_NAME/g, studentName).replace(/PERIOD/g, period));
            for (let half = 1; half <= 2; half++) {
                // Create the MON half period directory and index file
                const monHalfDirectory = path.join(monDirectory, `temps-${period}.${half}`);
                fs.mkdirSync(monHalfDirectory, { recursive: true });
                fs.writeFileSync(path.join(monHalfDirectory, 'index.md'), DEFAULT_MON_CONTENT.replace(/STUDENT_NAME/g, studentName).replace(/PERIOD/g, period).replace(/HALF/g, half));
            }
        }
        console.log(`Student directory created: ${studentDirectory}`);
    }
}


async function initStudent() {
    const promo = await selectPromo();
    if (!promo) {
        console.error('No promotion selected.');
        process.exit(1);
    }

    const studentName = await inputStudentName();
    createStudentDirectory(promo, studentName);
}


function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

initStudent();
