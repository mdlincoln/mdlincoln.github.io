---
title: Projects
layout: default
show_title: true
---

The projects below include both "traditional" art historical research, papers, and conference talks, as well as digital humanities endeavors and tutorials.

<!-- Automatic project list generator -->

# Select Publications
{% for project in site.data.projects.articles %}
<div class="toc">
<img src="{{ project.avatar }}" class="avatar" />
<a href="{{ project.url }}">{{ project.title | markdownify }}</a>
<p>{{ project.snippet | markdownify }}</p>
</div>
{% endfor %}

# Select Digital Projects
{% for project in site.data.projects.dh %}
<div class="toc">
<img src="{{ project.avatar }}" class="avatar" />
<a href="{{ project.url }}">{{ project.title | markdownify }}</a>
<p>{{ project.snippet | markdownify }}</p>
</div>
{% endfor %}

# Select Research
{% for project in site.data.projects.other %}
<div class="toc">
<img src="{{ project.avatar }}" class="avatar" />
<a href="{{ project.url }}">{{ project.title | markdownify }}</a>
<p>{{ project.snippet | markdownify }}</p>
</div>
{% endfor %}
