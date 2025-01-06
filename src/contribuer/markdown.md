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


## Sommaire

- [HTML](#html)
- [Titres](#titres)
- [Texte](#texte)
- [Liens](#liens)
- [Images & Vidéos](#images-videos)
- [Tables](#tables)
- [Code](#code)

Pour rédiger en Markdown, il faut connaître les bases de ce langage de balisage léger.

## HTML <a id="html"></a>

Markdown permet d'utiliser pleinement le HTML, le CSS et le JavaScript ! A vous les joies de la personnalisation !

```markdown
&lt;div style="border: 1px solid black; padding: 10px; margin: auto; width: fit-content;"&gt;
    &lt;div style="display: flex; gap: 15px; align-items: center; flex-direction: row"&gt;
        &lt;p&gt;Hello World!&lt;/p&gt;
        &lt;button&gt;Click me!&lt;/button&gt;
    &lt;/div&gt;
&lt;/div&gt;
```

<div style="border: 1px solid black; padding: 10px; margin: auto; width: fit-content;">
    <div style="display: flex; gap: 15px; align-items: center; flex-direction: row">
        <p>Hello World!</p>
        <button>Click me!</button>
    </div>
</div>

## Titres <a id="titres"></a>

Pour créer un titre, il suffit de mettre un `#` devant le texte du titre.\
Il existe 6 niveaux de titres, du plus grand au plus petit qui permettent de structurer votre contenu.

```markdown
# Titre 1
## Titre 2
### Titre 3
#### Titre 4
##### Titre 5
###### Titre 6
```

## Texte <a id="texte"></a>

Il est possible de mettre en forme le texte en gras, en italique, en barré, en souligné, en couleur, etc.

Pour mettre un texte en gras, il suffit de mettre le texte entre deux `**` ou deux `__`.

```markdown
**Texte en gras**
__Texte en gras__
```

Pour mettre un texte en italique, il suffit de mettre le texte entre deux `*` ou deux `_`.

```markdown
*Texte en italique*
_Texte en italique_
```

Pour mettre un texte en barré, il suffit de mettre le texte entre deux `~~`.

```markdown
~~Texte barré~~
```

Pour mettre un texte en souligné, il suffit de mettre le texte entre deux `<u>`.

```markdown
&lt;u&gt;Texte souligné&lt;/u&gt;
```

Pour mettre un texte en couleur, il suffit de mettre le texte entre deux `<span style="color: couleur;">`.

```markdown
&lt;span style="color: red;"&gt;Texte en rouge&lt;/span&gt;
```

Pour afficher le texte en gras et le faire ressortir, il suffit d'utiliser un backtick \` avant et après le texte.

```markdown
&#96;Texte en gras&#96;
```

## Liens <a id="liens"></a>

Pour insérer un lien, il suffit de mettre le texte du lien entre crochets, suivi du lien entre parenthèses.

Cela peut être un lien vers une page web, un fichier à télécharger, une autre page de votre site, etc.

```markdown
[Texte du lien](https://www.lien-du-site.com)
```

[Do-It]({{ site.url }})

{% attention %}
Si vous nommez votre fichier autrement que `index.md`{.fichier}, il faut mettre `../` devant le chargement de votre ressource (ex : `![image à voir](../mon-image.png)`{.fichier}).

En effet, si vous utilisez par exemple `mon_fichier.md`{.fichier} comme nom de post, eleventy va :

1. créer un dossier nommer `mon_fichier`{.fichier}
2. placer votre post dans ce dossier et le renommer `index.md`{.fichier}

Vos images ne se retrouvent du coup plus dans le bon dossier...

C'est pourquoi, il est recommandé de toujours créer un dossier avec le nom de votre post et d'y mettre vos données,fichier `index.md`{.fichier} et ressources.
{% endattention %}

## Images & Vidéos <a id="images-videos"></a>

### Image

Pour insérer une image, il suffit de mettre un point d'exclamation, le texte alternatif de l'image entre crochets, suivi du lien de l'image entre parenthèses.

Vous pouvez également ajouter des légendes à vos images en ajoutant un texte après le lien de l'image. Ces légendes s'afficheront en passant la souris sur l'image.

```markdown
![image à voir](./mon-image.png "Légende visible en passant la souris")
```

Vous pouvez utiliser une taille personnalisée pour vos images en utilisant le shortcode [sizedImage](../shortcodes#sizedimage).
### Vidéo

Pour insérer une vidéo, vous devez utiliser la balise `<video>` de HTML.\
Vous pouvez ainsi paramétrer la vidéo comme vous le souhaitez.

```markdown
&lt;div style="margin: auto; width: fit-content"&gt;
  &lt;video style="max-height: min(50vh, 300px)" controls loop&gt;
    &lt;source src="/assets/video/maid_knight.mp4" type="video/mp4"&gt;
    Votre navigateur ne supporte pas la balise video.
  &lt;/video&gt;
&lt;/div&gt;
```

<div style="margin: auto; width: fit-content">
  <video style="max-height: min(50vh, 300px)" controls loop>
    <source src="/assets/video/maid_knight.mp4" type="video/mp4">
    Votre navigateur ne supporte pas la balise video.
  </video>
</div>

## Tables <a id="tables"></a>

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

## Code <a id="code"></a>

Pour insérer du code, il suffit de mettre le code entre trois backticks.\
Vous pouvez également spécifier le langage de programmation pour avoir une coloration syntaxique grâce à PrismJS.

PrismJS ajoute automatiquement la **coloration syntaxique**, affiche le **langage utilisé** et permet de **copier** directement le code.

```markdown
&#96;&#96;&#96;python
def hello():
    print("Hello World!")

if __name__ == "__main__":
    hello()
&#96;&#96;&#96;
```

```python
def hello():
    print("Hello World!")

if __name__ == "__main__":
    hello()
```

## Autres guides

- [Guide des extensions markdown Eleventy](../extensions)
- [Guide ShortCodes pour le site](../shortcodes)
- [Guide de contribution au site](../)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
