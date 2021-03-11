---
layout: default
title: Home
show_title: false
---

<img id="headshot" height="250" width="250" src="/assets/images-display/luxembourg_headshot.jpeg" alt="mlincoln headshot" />

I am the Collections Information Architect at [Carnegie Mellon University Libraries](http://library.cmu.edu/), where I design infrastructure to make cultural heritage data usable by students, researchers, and developers alike.

[Contact me about speaking at your institution!](/speaking)

{% if site.data.travel.entries.size > 0 %}
***

## Upcoming Public Appearances

{% include travel.html %}

{% endif %}
***

## Recent blog posts

<nav>
	<ul>
	{% for post in site.posts limit:5 %}
	  {% include postlink.html %}
	{% endfor %}
	</ul>
</nav>

[See more...](/archive)
