---
layout: layout/post.njk

title: "Shortcodes"

authors:
  - François Brucker
  - Loïck Goupil-Hallay

tags:
  - "HOME"
  - "GUIDE"
  - "shortcodes"

eleventyExcludeFromCollections: ["HOME"]

resume: "Liste des shortcodes eleventy disponibles pour améliorer vos visuels."
---

{% sommaire %}
[[toc]]
{% endsommaire %}

{% lien "**Liens utiles**" %}
- [Guide Markdown pour le site](../markdown)
- [Guide des extensions apportées par Eleventy](../extensions)
- [Guide de contribution au site](../)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
{% endlien %}

## Shortcodes

Un **shortcode** est une balise qui est remplacée par un contenu plus complexe lors de la génération du site.\
Cela permet de simplifier l'écriture de contenu en évitant de répéter des blocs de code HTML, ou en ajoutant des fonctionnalités supplémentaires.

On distingue deux types de shortcodes : les **paired shortcodes** et les **shortcodes** auto-fermants (comme les balises HTML).

### Paired shortcodes

Les **paired shortcodes** sont des balises qui s'ouvrent et se ferment à deux endroits différents.\
Elles peuvent prendre des paramètres en argument ET inclure du contenu entre les balises.

Elles sont de la forme suivante :

```markdown
&#123;% NOM_SHORTCODE PARAM1, PARAM2, ... %&#125;
Ligne de contenu
&lt;img src="image.jpg" alt="Image" /&gt;
&#123;% endNOM_SHORTCODE %&#125;
```

### Shortcodes auto-fermants

Les **shortcodes** auto-fermants sont des balises qui s'ouvrent et se ferment au même endroit.\
Elles peuvent prendre des paramètres en argument, mais n'incluent pas de contenu entre les balises.

Elles sont de la forme suivante :

```markdown
&#123;% NOM_SHORTCODE PARAM1, PARAM2, ... %&#125;
```

## Liste des shortcodes

Notre site met à disposition de nombreux shortcodes pour vous aider à rendre vos contenus les plus jolis possibles.\
Tous nos paired shortcodes reçoivent **un unique argument** (optionel) : le titre de la balise.\
Si le titre n'est pas renseigné, la balise présentera son **titre par défaut** (le nom de la balise capitalisé).

{% note %}
Vous pouvez appliquer n'importe quelle balise HTML pour le titre et le contenu des shortcodes.
{% endnote %}
{% attention %}
Le titre de la balise est toujours optionnel. Mais s'il est présent il est **obligatoirement** entre " " (chaîne de caractères).\
Si vous voulez placer un titre vide, vous devez mettre des guillemets vides : `""`.
{% endattention %}

### Paired Shortcode `sommaire`

Permet d'ajouter une barre de navigation sur le côté droit de votre contenu. La barre est pliable / dépliable pour les petits écrans.\
Ce shortcode peut être agrémenté du contenu **&#36;&#123;toc&#125;** ou **&#91;toc&#93;** ou **&#91;&#91;toc&#93;&#93;** ou **&#91;&#91;&#95;toc&#95;&#93;&#93;** pour générer automatiquent une table des matières.

```markdown
&#123;% sommaire "**Titre du sommaire**" %&#125;
&#36;&#123;toc&#125;
&#123;% endsommaire %&#125;
```

{% sommaire %}
[[toc]]
{% endsommaire %}

### Paired Shortcode `note`

Permet d'ajouter une note à retenir distinguée dans votre contenu.

```markdown
&#123;% note "**Titre de la note**" %&#125;
Contenu de la note.
&#123;% endnote %&#125;
```

{% note "**Titre de la note**" %}
Contenu de la note.
{% endnote %}

### Paired Shortcode `attention`

Permet d'ajouter une mise en garde dans votre contenu.

```markdown
&#123;% attention "**Titre de l'attention**" %&#125;
Contenu de l'attention.
&#123;% endattention %&#125;
```

{% attention "**Titre de l'attention**" %}
Contenu de l'attention.
{% endattention %}

### Paired Shortcode `info`

Permet d'ajouter une information utile, mais pas indispensable, dans votre contenu.

```markdown
&#123;% info "**Titre de l'info**" %&#125;
Contenu de l'info.
&#123;% endinfo %&#125;
```

{% info "**Titre de l'info**" %}
Contenu de l'info.
{% endinfo %}


### Paired Shortcode `faire`

Permet d'ajouter une action à réaliser dans votre contenu.

```markdown
&#123;% faire "**Titre de l'action**" %&#125;
Contenu de l'action.
&#123;% endfaire %&#125;
```

{% faire "**Titre de l'action**" %}
Contenu de l'action.
{% endfaire %}

### Paired Shortcode `details`

Permet d'ajouter un contenu dépliable dans votre fichier.

```markdown
&#123;% details "**Titre du détail**" %&#125;
Contenu du détail.
&#123;% enddetails %&#125;
```

{% details "**Titre du détail**" %}
Contenu du détail.
{% enddetails %}

### Paired Shortcode `exercice`

Permet d'ajouter un exercice à réaliser dans votre contenu.

```markdown
&#123;% exercice "**Titre de l'exercice**" %&#125;
Contenu de l'exercice.
&#123;% endexercice %&#125;
```

{% exercice "**Titre de l'exercice**" %}
Contenu de l'exercice.
{% endexercice %}

### Paired Shortcode `chemin`

Permet d'ajouter un chemin de fichier dans votre contenu.

```markdown
&#123;% chemin "**Titre du chemin**" %&#125;
Contenu du chemin.
&#123;% endchemin %&#125;
```

{% chemin "**Titre du chemin**" %}
Contenu du chemin.
{% endchemin %}

### Paired Shortcode `prerequis`

Permet d'ajouter une liste de pré-requis à lire dans votre contenu.

```markdown
&#123;% prerequis "**Titre des pré-requis**" %&#125;
- un pré-requis à lire
- un autre pré-requis à lire
&#123;% endprerequis %&#125;
```

{% prerequis "**Titre des pré-requis**" %}
- un pré-requis à lire
- un autre pré-requis à lire
{% endprerequis %}

### Paired Shortcode `lien`

Permet d'ajouter des liens dans votre contenu.

```markdown
&#123;% lien "**Liens utiles**" %&#125;
- [Lien 1](https://www.example.com)
- [Lien 2](https://www.example.com)
&#123;% endlien %&#125;
```

{% lien "**Liens utiles**" %}
- [Lien 1](https://www.example.com)
- [Lien 2](https://www.example.com)
{% endlien %}

### Shortcode auto-fermant `lienInterne`

Ajoute un lien vers une ressource interne du site. Affiche son titre et son résumé.\
Le chemin de la ressource peut être absolu ou relatif.

Optionnellement, il est aussi possible de spécifier un format de date pour la ressource.

```markdown
&#123;% lienInterne "CHEMIN/VERS/RESSOURCE" "FORMAT_DATE" %&#125;
```

{% lienInterne "/promos/2024-2025/Loick-GoupilHallay/pok/temps-2" %}

### Shortcode auto-fermant `sizedImage`

Permet d'ajouter une image avec une taille configurable.\
Les paramètres sont:
- Le chemin de l'image (un lien http ou un chemin relatif)
- Le texte alternatif de l'image
- La taille de l'image parmi:
    - `bigBanner` : pour une bannière large
    - `banner`: pour une bannière
    - `smallBanner`: pour une petite bannière
    - `hugeIcon`: pour une icône très grande
    - `biggerIcon`: pour une icône grande
    - `bigIcon`: pour une icône moyenne
    - `icon`: pour une icône petite
    - `smallIcon`: pour une petite icône
    - `tinyIcon`: pour une icône très petite
    - `veryTinyIcon`: pour une icône minuscule
    - `bigImg`: pour une grande image
    - `img`: pour une image moyenne
    - `smallImg`: pour une petite image
- Centrer l'image (optionnel, valeur par défaut est "true") (string "true" ou "false")

```markdown
&#123;% sizedImage "SOURCE_IMAGE", "TEXTE_ALTERNATIF", "TAILLE_IMAGE", "CENTRER" %&#125;
```

{% sizedImage "https://via.placeholder.com/150", "Image de test", "bigIcon" %}

## Autres guides

- [Guide Markdown pour le site](../markdown)
- [Guide des extensions apportées par Eleventy](../extensions)
- [Guide de contribution au site](../)
- [Documentation du site (anglais)](https://github.com/do-it-ecm/do-it/blob/main/README.md)
- [Guide de contribution complet (anglais)](https://github.com/do-it-ecm/do-it/blob/main/CONTRIBUTING.md)
