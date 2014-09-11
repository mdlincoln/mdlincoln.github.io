---
layout: default
title: Home
show_title: false
---

I am a Ph.D. student in Art History at the [University of Maryland, College Park](http://arthistory.umd.edu/graduate-students/Matthew%20Lincoln) interested in the potential for computer-aided analysis of cultural datasets to help model long-term artistic trends in iconography, art markets, and social relations between artists in the early modern period.
My present research employs computational social network analysis to help understand the long-term changes in the relationships between print designers, engravers, and publishers in the Netherlands between 1500--1800.

For the 2014 academic year I will be the University of Maryland Museum Fellow at the Office of Northern Baroque Paintings at the [National Gallery of Art](http://www.nga.gov).

On this site you can find my [CV](/about), various [blog posts](/archive) on art history, digital humanities, and (occasionally) the [Super Mutant Ninja Turtles](/2013/09/10/ninja-turtles.html), and the full-text of conference talks and descriptions of my digital projects on the ['Projects' page](/projects).

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
