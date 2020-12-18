---
layout: default
title: Home
show_title: false
---

<img id="headshot" height="250" width="250" src="/assets/images-display/luxembourg_headshot.jpeg" alt="mlincoln headshot" />

I am a research software engineer at [Carnegie Mellon University Libraries](http://library.cmu.edu/), where I focus on computational approaches to the study of history and culture, and on making library and archives collections tractable for data-driven research.

My current book project with Sandra van Ginhoven uses [data-driven analysis to illuminate patterns in the history of the art market and collecting](http://blogs.getty.edu/iris/predicting-the-past-digital-art-history-modeling-and-machine-learning/). (Forthcoming, Getty Publications)

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
