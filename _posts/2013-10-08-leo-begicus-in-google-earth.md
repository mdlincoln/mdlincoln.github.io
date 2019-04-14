---
layout: post
comments: true
title: Leo Belgicus in Google Earth
date: 2013-10-08 09:18:10.856216
tags:
- GIS
- Digital Humanities
---

That 1611 map of the Netherlands in the shape of a lion that I'd been [geo-referencing/rectifying earlier this summer](/2013/06/08/georeferencing-hondius.html)? Well we've finally got it up and running. The map has been superimposed over a modern geographic coordinate system (geo-referencing) been algorithmically squeezed and stretched in certain areas to make sure it lines up OK (geo-rectifying). You can download this [Google Earth file](http://artinterp.org/hondius/leo_belgicus.kml) (the link file is under 1K; you'll need to be running Google Earth online to view the actual map images) to explore the map in all its zoom-able glory.


<figure>
<p><a href="/assets/images/ge_leo.jpg"><img src="/assets/images-display/ge_leo.png" alt="Leo Belgicus Google Earth layer" /></a></p>
<figcaption>A geo-rectified digital version of Jocodus Hondius' 1611 engraved map of the Low Countries in the form of a lion; as seen projected in Google Earth.</figcaption>
</figure>

Two things really stand out for me on this map.

1. The *Leo Belgicus* map is pretty much spot on in terms of real-world topography. QGIS (the program I used to geo-rectify this map -- i.e. "line up" this map with its real-world geographic locations) bends and stretches maps so cities go in the right place. Aside from some some slight tucking and squeezing around his paws and hindquarters, this is a rather accurate map.

2. Take a look at the Zuider Zee as described by Hondius is 1611, and compare it to the coastline now to see just how extensively the Dutch have reshaped the contours of their country. What is quite amazing is how much of this land had been reclaimed as early as the mid-seventeenth century.

If you want to geo-reference your own historical maps, take a look as these tutorials for doing it in [ArcGIS](http://spatialhistory.wordpress.com/2013/08/14/georeferencing-historic-maps-going-further/) or [QGIS](https://www.qgistutorials.com/en/docs/georeferencing_basics.html) (the free, open-source alternative to ArcGIS).
