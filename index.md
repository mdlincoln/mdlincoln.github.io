---
layout: default
title: Home
show_title: false
---

I am a PhD candidate in Art History at the [University of Maryland, College Park](http://arthistory.umd.edu/graduate-students/Matthew%20Lincoln) interested in the potential for computer-aided analysis of cultural datasets to help model long-term artistic trends in iconography, art markets, and social relations between artists in the early modern period.
My [dissertation](/dissertation) research uses computational network analysis to explore the long-term changes in the organization of print designers, engravers, and publishers in the Netherlands between 1500--1700.
During the 2014--2015 academic year he held a University of Maryland Museum Fellowship at the Office of Northern Baroque Paintings at the [National Gallery of Art](http://www.nga.gov).

On this site you can find my [CV](/about), various [blog posts](/archive) on art history, digital humanities, and (occasionally) the [Super Mutant Ninja Turtles](/2013/09/10/ninja-turtles.html), and the full-text of conference talks and descriptions of my digital projects on the ['Projects' page](/projects).

{% if site.data.travel.size > 0 %}
***

## Upcoming Presentations

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
