---
layout: default
title: Home
show_title: false
---

<img id="headshot" height="250" width="250" src="/assets/images-display/getty_headshot.png" alt="mlincoln headshot" />

I am a data research specialist at the [Getty Research Institute](http://www.getty.edu/research/), where I use computer-aided analysis of cultural datasets to help model long-term trends in iconography, art markets, and the social relations between artists.

I received my PhD in Art History at the [University of Maryland, College Park](http://arthistory.umd.edu/graduate-students/Matthew%20Lincoln).
For my [dissertation](/dissertation) research, I used computational network analysis to explore the long-term changes in the organization of print designers, engravers, and publishers in the Netherlands between 1500--1700.

On this site you can find my [CV](/about), various [blog posts](/archive) on art history, humanities computing, and (occasionally) the [Super Mutant Ninja Turtles](/2013/09/10/ninja-turtles.html), as well as articles and conference talks on the ['Projects' page](/projects).

{% if site.data.travel.size > 0 %}
***

## Public Appearances

{% include travel.html %}

{% endif %}
***

## Most recent posts

<nav>
	<ul>
	{% for post in site.posts limit:5 %}
	  {% include postlink.html %}
	{% endfor %}
	</ul>
</nav>

[See more...](/archive)
