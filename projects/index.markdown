---
title: Projects
layout: page
---


{% for page in site.pages %}

{% if page.layout == 'project' %}
<h2><a href="{{ page.url }}">{{ page.title }}</a>: {{ page.snippet }}</h2>
{% else %}
{% endif %}
{% endfor %}

