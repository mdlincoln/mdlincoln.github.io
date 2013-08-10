---
title: Projects
layout: default
show_title: true
---

<!-- Automatic project list generator -->
{% for page in site.pages %}

{% if page.layout == 'project' %}
<div class="toc">
<h1><a href="{{ page.url }}">{{ page.title }}</a></h1>
<img src="{{ page.img }}" class="avatar" />
<p>{{ page.snippet }}</p>
</div>
{% else %}
{% endif %}
{% endfor %}

