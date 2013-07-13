---
title: Projects
layout: page
---

<!-- Automatic project list generator -->
{% for page in site.pages %}

{% if page.layout == 'project' %}
<h1><a href="{{ page.url }}">{{ page.title }}</a></h1>
<p>{{ page.snippet }}</p>
{% else %}
{% endif %}
{% endfor %}

