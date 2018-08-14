---
layout: default
title: Home
show_title: false
---

<img id="headshot" height="250" width="250" src="/assets/images-display/getty_headshot.png" alt="mlincoln headshot" />

I am the digital humanities developer at the at the [dSHARP lab at Carnegie Mellon University](http://dsharp.library.cmu.edu/), where I collaborate with scholars to plan and implement computational approaches to humanities research.

My current book project with Sandra van Ginhoven uses [data-driven analysis to illuminate patterns in the history of the art market and collecting](http://blogs.getty.edu/iris/predicting-the-past-digital-art-history-modeling-and-machine-learning/). (Forthcoming, Getty Publications)

[Contact me about speaking at your institution!](/speaking)

{% if site.data.travel.size > 0 %}
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
