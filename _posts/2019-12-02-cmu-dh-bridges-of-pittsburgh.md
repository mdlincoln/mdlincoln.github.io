---
title: 'CMU DH: Bridges of Pittsburgh'
date: 2019-12-02 10:23:12
tags:
  - Digital Humanities
  - CMU DH
layout: post
aside: >-
  This is part of a series of posts proudly showing off the projects our team
  has worked on during my first 18 months at Carnegie Mellon University.


  [See all posts in the series](/tags/cmu_dh.html)
---
The very first project that landed in my lap upon arriving here at the end of August 2019 was something called the _Bridges of Pittsburgh_ project:

>In 1736, mathematician Leonard Euler proved it was impossible to walk through the German city of Königsberg crossing each of the city’s seven bridges exactly once. His work, famously dubbed the "Bridges of Königsberg" problem, laid the foundation for graph theory and network analysis, and foreshadowed the invention of topology. We intend to create an expanded, more complex version of this famous study using Pittsburgh’s 446 bridges.

How _very_ Carnegie Mellon, I thought! Local interest, large and complex data, plus an NP-hard computing problem.

As in most things, though, the real time spent wasn't so much on fancy math, but on data wrangling.

[As I write on our project site](https://bridgesofpittsburgh.net/posts/cleaning-open-street-map-data/):

>Although maps can carry an awful lot of information, they might seem at first to be a relatively simple data structure: identify a point in space and then associate a bunch of values to it – street number, land cover type, public water fountain, stoplight… you name it.
>
>But once you start to pull on that thread, you realize it’s a much more complicated tapestry. Certain points need to be associated with one another so that you know they all belong to a pathway like road or a river bank or to the outline of your house foundation. Not just that, but they may need to be associated in a particular order so that you know what direction the road is going or where the riverbank meanders. And now it’s not just those individual points that need attached data – now so too do the paths so that we can have road names and building names and administrative boundaries.
>
>Pull on the thread even more, and soon you realize that often those individual paths also need to be grouped together. A bus route runs over a multitude of different roads, a university campus comprises the outlines of a lot of different disconnected buildings, an archipelago holds a series of small islands each with their own coastline. And now these relationships too need names and values and keys.

Since we clearly needed to use OpenStreetMap data, I had to learn just how to decode it all.

![A map showing a route over all the bridges of Pittsburgh](/assets/images/bridges_of_pittsburgh.png)

Our [Bridges of Pittsburgh site](https://bridgesofpittsburgh.net/posts) hosts "the map", as well as process posts from myself and Jessica Otis on the ins and outs of handling and processing Open Street Map Data, to running community analysis on the road network we constructed from OSM data.

![Community detection visualization on the Pittsburgh road network](/assets/images/colored-network-copy_lesswhitespace.png)

I'm also proud to say that this project resulted in a handful of R packages that solve different components of this problem. One of my goals in this position is, when possible, to spin out reusable packages or libraries from specific projects. BoP presented a handful of issues that weren't solved by existing packages:

1. How to manage very large dumps of XML data from OpenStreetMap - solved by <https://github.com/cmu-lib/bigosm>
2. How to run a greedy search across a set of _bundles_ of edges in a generic graph - solved by <https://github.com/cmu-lib/pathfinder>
3. How to rewire a graph to remove 2-degree nodes while maintaining the same overall topology (which we needed to do in order to remove the tens of thousands of extra nodes that OSM uses to describe curving roads - info that is essential for making a map, but which slows down the process of finding a route) - solved by <https://github.com/cmu-lib/pathfinder>
4. And finally, a library that wraps all these separate processes up so that you can plot a path across bridges in your own town - solved by <https://github.com/cmu-lib/konigsbergr>
