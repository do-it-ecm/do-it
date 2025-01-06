---
layout: layout/post.njk

title: "Guide des extensions Eleventy"
authors:
  - François Brucker
  - Loïck Goupil-Hallay

tags:
  - "HOME"
  - "GUIDE"
  - "extensions"

eleventyExcludeFromCollections: ["HOME"]

resume: "Guide des extensions apportées par Eleventy pour améliorer vos visuels."
---

{% lien "**Liens utiles**" %}
- [Guide Markdown pour le site](../markdown)
- [Guide ShortCodes pour le site](../shortcodes)
- [Guide de contribution au site](../)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
- [Documentation PrismJS](https://prismjs.com/)
- [Documentation MermaidJS](https://mermaid.js.org/intro/)
- [Documentation MathJax](https://www.mathjax.org/)
{% endlien %}

En plus des fonctionnalités de base du Markdown et des shortcodes, nous avons ajouté des plugins Eleventy pour améliorer vos visuels.\
Notre layout de base contient plusieurs librairies javascript et CSS pour améliorer l'expérience utilisateur.

## Variables

Plusieurs variables sont disponibles pour uniformiser le style / code du site.\
Elles sont définies dans les fichiers `src/_data/*.json`{.fichier} et sont accessibles dans les fichiers HTML et Markdown.

Pour importer celles du fichier `site.json`{.fichier}, il suffit de placer entre crochets doubles &#123;&#123; &#125;&#125; le nom de la variable.\
Par exemple, pour importer l'URL du site :

```markdown
URL du site : [&#123;&#123; site.url &#125;&#125;](&#123;&#123; site.url &#125;&#125;)
```

URL du site : [{{ site.url }}]({{ site.url }})

### Exemple de fichier `site.json`

```json
{
    "url": "https://do-it.aioli.ec-m.fr",
    "source": "https://github.com/do-it-ecm/do-it",
    "colors": {
        "info": "#93c47d",
        "mgt": "#a9c6f4",
        "gp": "#f5cfcf"
    }
}
```

## Librairies

### PrismJS

[PrismJS](https://prismjs.com/) est une librairie JavaScript qui permet de **styliser les blocs de code** et de les rendre significativement plus agrréables à lire.\
Nos blocs de code apparaissent avec une **coloration syntaxique** dépendant du langage pour une meilleure lisibilité.\
On peut aussi voir apparaître des **numéros de ligne** pour faciliter la lecture.\
Il y a un bouton en haut à droite de chaque bloc de code pour **copier le code** dans le presse-papier.\
Enfin, le **langage du bloc de code** est indiqué en haut à droite du bloc.

Pour déclarer un bloc de code, il suffit de l'entourer de trois backticks (&#96;&#96;&#96;) et de préciser le langage du code.\
Par exemple, pour un bloc de code en JavaScript :

```markdown
&#96;&#96;&#96;javascript
console.log("Hello World!");
&#96;&#96;&#96;
```

```javascript
console.log("Hello World!");
```

### MermaidJS

[MermaidJS](https://mermaid.js.org/intro/) est une librairie JavaScript qui permet de **générer des diagrammes** à partir de code texte.\
Les diagrammes sont générés en temps réel et peuvent être **exportés en image**.\
MermaidJS supporte un grand nombre de diagrammes différents, plusieurs sont ajoutés régulièrement.

Pour déclarer un diagramme, il suffit de déclarer un bloc HTML de type pre avec la classe `mermaid`.\
Par exemple, pour un diagramme de séquence :

```markdown
&lt;pre class="mermaid" style="background-color: transparent;"&gt;
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.
&lt;/pre&gt;
```

<pre class="mermaid" style="background-color: transparent;">
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.
</pre>

### MathJax

[MathJax](https://www.mathjax.org/) est une librairie JavaScript qui permet de **générer des équations mathématiques** à partir de code LaTeX.\
Les équations sont générées en temps réel et peuvent être **exportées en image**.\
MathJax supporte un grand nombre de symboles mathématiques, plusieurs sont ajoutés régulièrement.

Une équation se déclare de deux manière différentes, en ligne ou en bloc.\
Par exemple, pour une équation en bloc, c'est tout comme pour un bloc de code avec deux dollars ($$) à la place des trois backticks :

```markdown
$$
y = ax + b
$$
```

$$
y = ax + b
$$

Pour une équation inline, il suffit de mettre le code LaTeX entre `\(` et `\)`.\
Par exemple, pour une équation en ligne :

```markdown
L'équation \(y = ax + b\) est une équation linéaire.
```

L'équation \\(y = ax + b\\) est une équation linéaire.

### Pagefind

[Pagefind](https://pagefind.app/)
Pagefind est une librairie JavaScript qui permet de **rechercher du contenu** sur une page web en consommant le moins de ressources possible.\
Pagefind est **rapide** et **léger** et permet de **rechercher du contenu** sur l'intégralité du site en quelques millisecondes.\
Cela nous permet de faire la fonctionnalité de recherche par tag / description / contenu accessible dans [l'onglet search](/search).

### html-minifier-terser

[html-minifier-terser](https://www.npmjs.com/package/html-minifier-terser) est un plugin Eleventy qui permet de **minifier le code HTML** généré par le site.\
Cela permet de **réduire la taille des fichiers HTML** et d'**accélérer le chargement des pages**.\
On gagne ainsi en performance, on améliore l'expérience utilisateur et en bonus, on diminue la consommation de bande passante.

## Style

### TailwindCSS

[TailwindCSS](https://tailwindcss.com/) est une librairie CSS qui permet de **styliser les éléments HTML** de manière simple et rapide.\
TailwindCSS utilise des **classes CSS** pour styliser les éléments, ce qui permet de **personnaliser le style** de chaque élément.\
TailwindCSS est **responsive** et permet de **créer des designs adaptatifs** pour tous les écrans.

Pour utiliser TailwindCSS, il suffit de **déclarer les classes** dans les balises HTML.\
Par exemple, pour un bouton stylisé :

```markdown
&lt;div class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"&gt;
    Hello !
&lt;/div&gt;
```

<div class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
    Hello !
</div>

## Plugins Eleventy

### Eleventy Navigation

[Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/) est un plugin Eleventy qui permet de **générer des menus de navigation** pour le site.\
Les menus de navigation sont générés à partir de **fichiers de configuration** et peuvent être **personnalisés**.\
Eleventy Navigation permet de **créer des menus dynamiques** qui s'adaptent à la structure du site.

Globalement vous n'avez pas besoin d'y toucher, les layouts s'occupent de tout.\
Mais si vous voulez ajouter des éléments à la navigation, il faudra aller éditer chacun des layouts. Vous pouvez utiliser le keyword `eleventyNavigation` avec un gros CTRL + F pour trouver les endroits à éditer.

## Autres guides

- [Guide Markdown pour le site](../markdown)
- [Guide des ShortCodes pour le site](../shortcodes)
- [Guide de contribution au site](../)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
