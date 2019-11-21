---
title: 'CMU DH: Bridges of Pittsburgh'
date: 2019-12-02T14:00:00.000Z
tags:
  - Digital Humanities
  - CMU DH
layout: post
aside: >-
  This is part of a series of posts proudly showing off the projects our team
  has worked on during my first 18 months at Carnegie Mellon University.


  \[See all posts in the series](/tags/digital_humanities.html)
---
The very first project that landed in my lap upon arriving here at the end of August 2019 was something called the _Bridges of Pittsburgh_ project:

>In 1736, mathematician Leonard Euler proved it was impossible to walk through the German city of Königsberg crossing each of the city’s seven bridges exactly once. His work, famously dubbed the "Bridges of Königsberg" problem, laid the foundation for graph theory and network analysis, and foreshadowed the invention of topology. We intend to create an expanded, more complex version of this famous study using Pittsburgh’s 446 bridges.

How _very_ Carnegie Mellon, I thought! Local interest plus an NP-hard computing problem.

As in most things, though, the real time spent wasn't so much on fancy math, but on data wrangling. 

As I write on our project site:

>Although maps can carry an awful lot of information, they might seem at first to be a relatively simple data structure: identify a point in space and then associate a bunch of values to it – street number, land cover type, public water fountain, stoplight… you name it.
>
>But once you start to pull on that thread, you realize it’s a much more complicated tapestry. Certain points need to be associated with one another so that you know they all belong to a pathway like road or a river bank or to the outline of your house foundation. Not just that, but they may need to be associated in a particular order so that you know what direction the road is going or where the riverbank meanders. And now it’s not just those individual points that need attached data – now so too do the paths so that we can have road names and building names and administrative boundaries.
>
>Pull on the thread even more, and soon you realize that often those individual paths also need to be grouped together. A bus route runs over a multitude of different roads, a university campus comprises the outlines of a lot of different disconnected buildings, an archipelago holds a series of small islands each with their own coastline. And now these relationships too need names and values and keys.

Since we clearly needed to use OpenStreetMap data, I had to learn just how to decode it all.

![A map showing a route over all the bridges of Pittsburgh](/assets/images/bridges_of_pittsburgh.png)

Our [Bridges of Pittsburgh site](https://bridgesofpittsburgh.net/posts) hosts "the map", as well as process posts from myself and Jessica Otis on the ins and outs of handling and processing Open Street Map Data, to running community analysis on the
