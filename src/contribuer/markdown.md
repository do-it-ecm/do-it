---
layout: layout/post.njk

title: "Markdown"
authors:
  - François Brucker
  - Loïck Goupil-Hallay

tags:
  - "HOME"
  - "GUIDE"
  - "markdown"

eleventyExcludeFromCollections: ["HOME"]

resume: "Guide de rédaction en Markdown pour le site Do-It"
---

{% lien "**Liens utiles**" %}
- [Cours Markdown - François Brucker](https://francoisbrucker.github.io/cours_informatique/tutoriels/format-markdown/)
- [Guide ShortCodes pour le site](../shortcodes)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
- [Guide de contribution au site](../)
{% endlien %}

Pour rédiger en Markdown, il faut connaître les bases de ce langage de balisage léger.

## Images & Vidéos

Pour insérer une image, il suffit de mettre un point d'exclamation, le texte alternatif de l'image entre crochets, suivi du lien de l'image entre parenthèses.\
Même principe pour les vidéos.

Vous pouvez également ajouter des légendes à vos images et vidéos en ajoutant un texte après le lien de l'image ou de la vidéo. Ces légendes s'afficheront en passant la souris sur l'image ou la vidéo.

### Image

```markdown
![image à voir](./mon-image.png "Légende visible en passant la souris")
```

### Vidéo

```markdown
![vidéo à voir](./ma-video.mp4)
```

![Welcome Back](/assets/video/maid_knight.mp4)

## Tables

Markdown permet de créer des **jolis tableaux** pour structurer les données. La syntaxe est simple et intuitive.\
On utilise les possibilités de [multimarkdown](https://fletcher.github.io/MultiMarkdown-6/syntax/tables.html)

### Table avec titre

| titre colonne 1 | titre colonne 2 |
| --------------- | --------------- |
| Content Cell    | Content Cell    |
| Content Cell    | Content Cell    |

Code :

```markdown
| titre colonne 1  | titre colonne 2 |
| ---------------- | --------------- |
| Content Cell     | Content Cell    |
| Content Cell     | Content Cell    |
```

### Tables sans titre

| ------------- | ------------- |
| Content Cell | Content Cell |
| Content Cell | Content Cell |

Code :

```markdown
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |
```

### Tables multi-colonnes

| ------------- | ------------- |
| Je prends 2 colonnes ||
| Content Cell | Content Cell |

Code :

```markdown
| ------------- | ------------- |
| Je prends 2 colonnes ||
| Content Cell | Content Cell |
```

### Tables multi-lignes

| ------------- | ------------- |
| Je prends 2 lignes |Content Cell |
| ^^ |Content Cell |
| Content Cell | Content Cell |

Code :

```markdown
| ------------- | ------------- |
| Je prends 2 lignes |Content Cell |
| ^^ |Content Cell |
| Content Cell | Content Cell |
```

### plusieurs ligne dans une cellule

| ------------- | ------------- |
| 1. ligne colonne 1 | 1. ligne colonne 2 | \
| 1. ligne colonne 1 | 2. ligne colonne 2 |
| Content Cell | Content Cell |

Code :

```markdown
| ------------- | ------------- |
| 1. ligne colonne 1 | 1. ligne colonne 2 | \
| 1. ligne colonne 1 | 2. ligne colonne 2 |
| Content Cell | Content Cell |
```

### Alignement horizontal

| :- | :-: | -: |
| Content Cell | Content Cell | Content Cell |
| Content Cell | Content Cell |Content Cell |
| Content Cell | Content Cell |Content Cell |

Code :

```markdown
| :- | :-: | -: |
| Content Cell | Content Cell | Content Cell |
| Content Cell | Content Cell |Content Cell |
| Content Cell | Content Cell |Content Cell |
```

### Alignement vertical

On ajoute un style, mais il ne faut pas que ce soit la dernière colonne. Exemple sur une colonne multi-ligne :

| ------------- | ------------- |
| Content Cell {style="vertical-align:middle"}| Content Cell |
| ^^| Content Cell |
| Content Cell | Content Cell |

Code :

```markdown
| ------------- | ------------- |
| Content Cell {style="vertical-align:middle"}| Content Cell |
| ^^| Content Cell |
| Content Cell | Content Cell |
```

Si l'on veut avoir un alignement vertical de la dernière colonne, il faut ajouter une colonne vide (je ne sais pas trop pourquoi) :

| ------------- | ------------- | - |
| Content Cell | Content Cell {style="vertical-align:middle"}| |
| Content Cell | ^^ | |
| Content Cell | Content Cell | |

Code :

```markdown
| ------------- | ------------- | - |
| Content Cell | Content Cell {style="vertical-align:middle"}| |
| Content Cell | ^^ | |
| Content Cell | Content Cell | |
```
