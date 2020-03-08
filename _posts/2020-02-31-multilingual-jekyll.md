---
title: |
  Multilingual Jekyll: How _The Programming Historian_ Does That
date: 2020-02-31T04:34:00.000Z
tags:
  - code
  - publishing
layout: post
---

One of my roles as the technical lead of [_The Programming Historian_](https://programminghistorian.org) is to help train up all the members of our full technical team so that they are comfortable troubleshooting when things go wrong, and capable of building out new features on their own.

This post really got its start as an internal walkthrough of how PH's multilingual setup actually works on Jekyll, but I thought it was probably applicable enough to other Jekyllers out there that it was worth writing in public.

This is not the only way to internationalize your Jekyll website, but it's how we produce a complex multilingual static site using GitHub pages.
If you're using this as a guide for your own Jekyll site, you may only need one or two parts of this workflow.

Also: The intended audience of this guide is the technical team of *The Programming Historian*, so it assumes that you are already moderately familiar with Jekyll and understand our editorial & translation workflows. It may still be useful to outside readers.

## Setting Page Languages

We need to have a `lang` tag associated with every page so that Jekyll and its templating language, Liquid, will know what language a page is.
To add any kind of key-value pair to a page (here, the key being `lang` and the value being `en` or `es` or `fr`), you can always put it in the YAML header of a markdown file:

``` md
lang: en
```

This becomes really onerous across hundreds of markdown files.
As a shortcut, we use Jekyll's [front matter defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/) feature to implicitly assign this key-value pair based on the directory that a markdown file is in:

```yaml
defaults:
  - scope:
      path: "en"
    values:
      lang: "en"
  - scope:
      path: "es"
    values:
      lang: "es"
  - scope:
      path: "fr"
    values:
      lang: "fr"
```

For each entry in this list of defaults, there's a `scope` definition that declares which files will get this default applied.
We are setting the scope here based on the folder `path`.
With each scope definition is `values`, which contains the key-value pairs that should be assigned to every page that matches the defined `scope`.

Now, we can set up files like:

```
├── en
│   ├── about.md
│   └── lessons
│       └── ...
├── es
│   ├── acerca-de.md
│   └── lecciones
│       └── ...
├── fr
│   ├── apropos.md
│   └── lecons
│       └── ...
```

This lets us simultaneously keep our files organized by directory, set up the URL patterns that we want, and automatically assign pages their proper language.
Now, inside our page templates, we can access the language value by calling `page.lang`

## Two Kinds of Translation

Now that we know what a given page's `lang`, we need to handle two different kinds of translation on PH:

1. "in-place" translation of every kind of standard text from menu titles to button labels

2. "free text" translation of page content, both for our translated lessons as well as our "infrastructure" pages such as the "Project Team" or "Author Guidelines" pages

In-place translations are bits and pieces of our web content that have a one-to-one match, where we need a database with lots of snippets of text.
Free text translations have their own URLs and can often have relatively different content structures from their source versions.
We therefore pair together two translation approaches.

## In-Place Translation

We use Jekyll's `_data` feature to define a long YAML dictionary of components that show up on all versions of our pages, but whose HTML text needs to change based on the language of that particular page.

For example, on our lesson pages we list the editors for a lesson. The HTML and styling for that list are identical English, French, and Spanish versions of the page. The text is not.
We add an entry to the `_data/snippets.yml` file:

```yaml
editor:
  en: edited by
  es: editado por
  fr: suivi éditorial par
```

Then, in the HTML code to render the button, we use Liquid to fill in the blanks:

```html
{% raw %}<h3>{{ site.data.snippets.editor[page.lang] }}</h3>{% endraw %}
```

We use dot-notation to drill down from the `site` to the `data` in the site, to the `snippets` data object, to the `editor` dictionary.
If all I needed to do was get the French entry for that dictionary, I could have written `site.data.snippets.editor.fr`. However, this code is in the layout definition for our lessons. When we write the template, we don't know if it's going to be passed a French or a Spanish or an English page. So instead we switch to `[]` notation. This lets us look up the `page.lang` and then use that string as the key we wanted to retrieve:

- On an English page this would first render into `site.data.snippets.editor['en']`, which would perform the lookup and return "edited by"
- On a Spanish page this would first render into `site.data.snippets.editor['es']`, which would peform the lookup and return "editado por"

If the element being translated also needs additional non-text attributes to change, like a menu link that needs a text as well as a poitner to the correct URL (which varies based on language), we can use the same structure:

``` YAML
menu-about-team:
  en:
    title: Project Team
    link: /en/project-team
  es:
    title: Equipo
    link: /es/equipo-de-proyecto
  fr:
    title: L'équipe
    link: /fr/equipe-projet
```

and then in our menu, we can drill down further beyond the `[page.lang]` key:

```html
{% raw %}<a class="dropdown-item"
  href="{{ site.baseurl }}{{ site.data.snippets.menu-about-team[page.lang].link }}"
  role="menuitem">{{ site.data.snippets.menu-about-team[page.lang].title }}</a>{% endraw %}
```

## Linking Full-Page Translations

Translation of free text can't be done in this cut-and-paste manner.
The entire content of the lesson page might change, and so it means an entirely new markdown file.

First, we need to create links between pages and their translations.
We wanted to avoid requiring authors to explicitly declare links between original pages and new translations, and instead use Liquid to auto-detect them.
While this adds code complexity, it cuts down on the amount of metadata that authors need to add correctly - which will become more and more onerous as the numbers of languages and potential new translation links increase.

Translations point to their originals with the `original` key:

In `/fr/lecons/preserver-ses-donnees-de-recherche`

``` yaml
original: preserving-your-research-data
```

But if we're generating `en/preserving-your-research-data`, how do we know that this French translation exists? What's more, how would we know that there's also a Spanish version at `es/preservar-datos-de-investigacion`?

We compute those links at generation time with code in `_includes/translation-links.html`:

```html
{% raw %}
{% if page.original %}

  {% assign target_slug = page.original %}
  {% assign target_name = target_slug | append: ".md" %}

  {% assign translation_source = site.pages | where: "name", target_name | first %}

{% else %}

  {% assign target_slug = page.name | remove_first: ".md" %}
  {% assign translation_source = page %}

{% endif %}

{% assign translation_candidates = site.pages | where: "original", target_slug %}
{% endraw %}
```

We take slightly different routes depending on whether the page is a translation, and therefore has a `page.original` key in its YAML header.

1. If yes, then we take that key and add `.md` to it, which should give us the original base file name for the lesson we need to point to. We do this because Jekyll tracks those base file names in a variable called `name` assinged to each `page`. Once we know what page `name` we are looking for, we can search through all `site.pages` to find the page where the name equals the `target_name`. Since the `where` filter returns a list, we take just the first entry of that list (which ought to be the only entry) and assign that page to the `translation_source` variable.

    We also save the value of `page.original` to  `target_slug`, because we will need to search for other pages that may translate the same original.

2. If no, then we treat the page as an "original" and can directly assign it to the `translation_source`. As in the first scenario, we also create the `target_slug` to search for all translations of this page.

Once we have both `translation_source` and the `target_slug` variables, we can finish creating the translation list. We look for any page that has the `target_slug` (our ID for the "original" page) set as the value of the `original` key in its YAML metadata (so if we're on a Spanish page, we will also find any French translations of the same original lesson.)

We assign this list of translation versions to `translation_candidates`

## How links show up across lessons

Now that we have a chunk of code that can compute both `translation_source` and `translation_candidates`, we can call on them in our lesson layout:

``` html
{% raw %}
{% for candidate in translation_candidates %}
   {% unless page.lang == candidate.lang %}
   <!-- Banner pointing to translations of this lesson when they exist -->
   <div class="alert alert-warning">
    {{ site.data.snippets.translation-target[page.lang]}}
    {{ site.data.snippets.language-name[candidate.lang][page.lang]}}: <a
      href="{{ candidate.url }}">{{ candidate.title }}</a>
   </div>
   {% endunless %}
{% endfor %}
{% endraw %}
```

We loop through the possible translations, skipping the current page we're on, and then create the text for a banner that will point to the translated site.
Note that we have a snippet both for the phrase "This lesson has been translated into" (`translation-target`) as well as for each language's term for every other language, so Spanish pages will say the lesson has been translated into `inglés` or `francés`, while French pages would instead say `anglais`.

We also have a chunk of code in the lesson layout that will point to the "original" version of a lesson (using the `translation_source` variable) if you're on a translated version.

## How we create the language toggle in our menu bar

The language toggle buttons in our menu bar access the same variables as our lesson banners do.
Before starting to create the buttons, we put all versions of a page into one list that can be quickly searched. Then, we loop through ALL the available languages on our site (`site.data.snippets.language-list`) to create the buttons:

```html
{% raw %}
{% assign all_translations = translation_candidates | push: translation_source %}

<li class="nav-item">
  <div class="btn-group" role="group" aria-label="Language selector">
    {% for lang in site.data.snippets.language-list %}

    {% if page.lang == lang %}
    <a class="btn btn-secondary nav-link active disabled" role="button"
      aria-pressed="true">{{ site.data.snippets.menu-lang[lang].title }}</a>
    {% else %}

    {% assign alternate_target = all_translations | where: "lang", lang | first %}

    {% if alternate_target %}
    <a class="btn btn-secondary nav-link" role="button"
      href="{{ alternate_target.url }}">{{ site.data.snippets.menu-lang[lang].title }}</a>
    {% else %}
    <a class="btn btn-secondary nav-link" role="button"
      href="{{ site.data.snippets.menu-lang[lang].link }}">{{ site.data.snippets.menu-lang[lang].title }}</a>
    {% endif %}
    {% endif %}
    {% endfor %}
  </div>
</li>
{% endraw %}
```

If we're currently on, say, an English page (if `page.lang == lang`), then we create a "disabled", grayed-out button.

Otherwise, we check the list of `all_translations` for the given language button. If one exists, we point to that target's url. If one doesn't exist, then we just point to the home page of that particular language.

## Beware the pitfalls of variable scoping

Because we are deploying via GitHub pages, we can only use Liquid template code, and can't write custom Ruby code to make a Jekyll plugin.
Unfortunately, Liquid variables have strange scoping behavior.
"Variable scope" determines what parts of the Jekyll and Liquid processing pipeline can see/access the variables that we compute with our Liquid template code.
When you assign a liquid variable in an include, it is only available to the immediate context in which it is called; it has a "local" scope only.

This has bothersome consequences for us.
We put all of the translation link code into an include so that we could reuse the logic all over the site. When we {% raw %}`{% include translation-links.html %}`{% endraw %} at the start of the lesson layout, then we can reference `translation_source` and `translation_candidates` in other parts of the `lesson.html` layout.

However, those variables are _not_ available to `lesson.html`'s parent layout, `base.html`, or the `menu.html` include that is called in the base layout.

If we only called {% raw %}`{% include translation-links.html %}`{% endraw %} in the `base.html` layout, the variables wouldn't be seen in the child `lesson.html` layout or in the `menu.html` include that is called in `base.html`. (Believe me, I tried!)

This can feel very strange to a programmer used to object-oriented programming, as we would normally expect that child layouts would "inherit" all the variables available to their parent layouts. This is _not_ the case in Liquid, however.
Therefore, we unfortunately need to include `translation-links.html` both in the menu as well as in all lesson pages, which means that it actually gets run _twice_ on all lesson pages.
