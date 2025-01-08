---
layout: layout/post.njk

title: "Contribuer"
authors:
  - François Brucker
  - Loïck Goupil-Hallay

tags:
  - "HOME"
  - "GUIDE"

resume: "Guide de contribution au site Do-It"
---

{% lien "**Liens utiles**" %}
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
- [Guide Markdown pour le site](./markdown)
- [Guide des extensions apportées par Eleventy](./extensions)
- [Guide des Shortcodes](./shortcodes)
- [Cours Markdown - François Brucker](https://francoisbrucker.github.io/cours_informatique/tutoriels/format-markdown/)
{% endlien %}

Le site **Do_It** est entièrement [statique](https://en.wikipedia.org/wiki/Static_web_page) et généré par [eleventy](https://www.11ty.dev/).\
Les pages qui s'affichent sont des fichiers à la base écrit en [Markdown](https://francoisbrucker.github.io/cours_informatique/tutoriels/format-markdown/) pour permettre une écriture simple et rapide.

## Ajouter du contenu

Pour ajouter du contenu, il faut d'abord connaître sa promotion (par exemple `2024-2025`), et son nom (par exemple `Gordon-Zola`).

### Le directory élève

Le directory élève (dossier élève pour ceux qui viennent de Windows) est **le directory qui contient les informations et les publications de l'élève**. Il est situé dans le dossier `src/promos/2024-2025/Gordon-Zola/`{.fichier}.

Pour le créer, vous devez utiliser l'utilitaire node: `npm run init-student` dans le terminal. Vous allez devoir selectionner la promotion dans laquelle vous voulez ajouter votre directory élève. Ensuite vous devrez rentrer votre nom et prénom.\
Cela va **automatiquement** créer un **directory élève** ainsi qu'une **branche git locale** à votre nom dans la promotion choisie, avec tous les fichiers nécessaires pour commencer à écrire.

{% details "Structure du directory élève" %}
```plaintext
Zola-Gordon/ (Student directory)
├── index.md (Student index file)
├── assets/ (Student assets directory, contains medias, styles, scripts)
├── mon/
│   ├── index.md
│   ├── temps-X.Y/
│   │   ├── assets/ (MON assets directory, contains medias, styles, scripts)
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
│   ├── ...
├── pok/
│   ├── index.md
│   ├── temps-X/
│   │   ├── assets/ (POK assets directory, contains medias, styles, scripts)
│   │   ├── index.md (MANDATORY if markdown files are present)
│   │   ├── other_file.md (OPTIONAL)
│   │   ├── subdirectory/ (OPTIONAL)
│   │   │   ├── ...
│   ├── ...
```
{% enddetails %}

{% attention %}
Si vous avez déjà un directory élève, n'allez pas en créer un autre. Vous pouvez directement ajouter des fichiers dans votre directory élève existant.
{% endattention %}

### Ajouter un POK

Pour ajouter / éditer un POK, il suffit d'aller éditer le fichier `src/promos/VOTRE_PROMOTION/VOTRE_DIRECTORY_ELEVE/pok/temps-TEMPS/index.md`{.fichier}.

Il faut seulement s'assurer que le fichier contient son entête avec:
- Le layout **POK** (layout/pok.njk) à utiliser
- Le titre du **POK**
- La date de publication
- Le temps du **POK**
- Les auteurs
- Les tags (optionnel mais recommandé)
- Un résumé (optionnel mais recommandé)

Le reste du fichier est en markdown, vous êtes **libre** d'écrire ce que vous voulez.

{% details "Exemple d'entête **POK**" %}
```markdown
---
layout: layout/pok.njk

title: TITRE_DE_VOTRE_POK

date: DATE_DE_PUBLICATION

temps: TEMPS_DU_POK (1,2,3)

authors:
  - VOTRE_APPELLATION

tags:
  - VOS_TAGS

résumé: RÉSUMÉ_DE_VOTRE_POK
---
```
{% enddetails %}

### Ajouter un MON

Pour ajouter / éditer un MON, il suffit d'aller éditer le fichier `src/promos/VOTRE_PROMOTION/VOTRE_DIRECTORY_ELEVE/mon/temps-TEMPS/index.md`{.fichier}.

Il faut seulement s'assurer que le fichier contient son entête avec:
- Le layout **MON** (layout/mon.njk) à utiliser
- Le titre du **MON**
- La date de publication
- Le temps du **MON**
- Les auteurs
- Les tags (optionnel mais recommandé)
- Un résumé (optionnel mais recommandé)

Le reste du fichier est en markdown, vous êtes **libre** d'écrire ce que vous voulez.

{% details "Exemple d'entête **MON**" %}
```markdown
---
layout: layout/mon.njk

title: TITRE_DE_VOTRE_MON

date: DATE_DE_PUBLICATION

temps: TEMPS_DU_MON (1,2,3)

authors:
  - VOTRE_APPELLATION

tags:
  - VOS_TAGS

résumé: RÉSUMÉ_DE_VOTRE_MON
---
```
{% enddetails %}

### Ajouter un projet

Pour ajouter / éditer un projet, cela se passe dans `src/promos/VOTRE_PROMOTION/_projets/VOTRE_PROJET`{.fichier}.

Il faut seulement s'assurer que le fichier contient son entête avec:
- Le layout **projet** (layout/projet.njk) à utiliser
- Le titre du **projet**
- La date de publication
- Les auteurs
- Les tags (optionnel mais recommandé)
- Un résumé (optionnel mais recommandé)

Le reste du fichier est en markdown, vous êtes **libre** d'écrire ce que vous voulez.

{% details "Exemple d'entête **projet**" %}
```markdown
---
layout: layout/projet.njk

title: TITRE_DE_VOTRE_PROJET

date: DATE_DE_PUBLICATION

authors:
  - VOTRE_APPELLATION

tags:
  - VOS_TAGS

résumé: RÉSUMÉ_DE_VOTRE_PROJET
---
```
{% enddetails %}

## Bonnes pratiques

Pour que le site reste **cohérent** et **lisible**, il est recommandé de suivre quelques bonnes pratiques:
- Apprendre à utiliser **Git** correctement pour éviter les **conflits** et les **problèmes**
- **Utiliser des titres** pour structurer votre texte
- Nommer les fichiers sans **caractères spéciaux** (accents, espaces, etc.) et en **minuscules**
- Produire du contenu **original**, **intéressant**, **pertinent** et surtout **concis**
- **Citer** vos sources si vous utilisez des informations provenant d'autres sites
- **Éviter** les fautes d'orthographe et de grammaire

## Autres guides

- [Guide de contribution Markdown](./markdown)
- [Guide des Shortcodes](./shortcodes)
- [Guide des extensions apportées par Eleventy](./extensions)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
