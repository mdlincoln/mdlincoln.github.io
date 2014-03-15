---
title: Projects
layout: default
show_title: true
---

The projects below include both "traditional" art historical research, papers, and conference talks, as well as digital humanities endeavors and tutorials. 

<!-- Automatic project list generator -->
{% for project in site.data.projects %}
<div class="toc">
<h1><a href="{{ project.url }}">{{ project.title }}</a></h1>
<img src="{{ project.avatar }}" class="avatar" />
<p>{{ project.snippet }}</p>
</div>
{% endfor %}

