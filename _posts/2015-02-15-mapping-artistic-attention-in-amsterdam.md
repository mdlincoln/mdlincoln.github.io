---
layout: post
comments: true
title: "Mapping Artistic Attention in Amsterdam, 1550-1750"
date: 2015-02-15 21:46
tags: 
- GIS
- Art History
- Conferences
- Digital Humanities
redirect_from:
- caa2015.html
- CAA2015.html
---

<aside>
<p>These are the slides and notes from the lightning talk I gave at the CAA 2015 session <a href="http://conference2015.collegeart.org/programs/doing-digital-art-history/">"Doing Digital Art History: Reflections on the Field"</a>, an overview of the work done at the <a href="/2014/01/21/summer-2014-digital-art-history-institutes.html">2014 summer institutes</a> sponsored by the Kress and Getty Foundations.</p>
<p><a href="https://github.com/mdlincoln/middlebury_amsterdam">See the underlying data and processing code here.</a></p>
<p><a href="http://dx.doi.org/10.5281/zenodo.15461"><img src="https://zenodo.org/badge/5105/mdlincoln/middlebury_amsterdam.svg" alt="DOI" /></a></p>
</aside>

<script async class="speakerdeck-embed" data-id="2f56994087f846ff8cb733fcbf1f6c11" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

This project is an interesting example of one where the research question was not only enabled, but fundamentally inspired by museum data.
The Rijksmuseum has about 1,000 images (mostly prints, like this, from a series by Claes Visscher) depicting specific locations in Amsterdam between 1550 and 1750.
Amsterdam expanded rapidly during this period. Successive fortifications and ring canals were built out from the medieval core of the city.
My core question is this: how did artists react to this periodic expansion? Did they turn their attention immediately towards new construction, or focus on old areas of the city, or some combination of both?
Was it possible to design an experiment that could use the Rijksmuseum data to explore this question?

Using ArcMap, I generated a series of heatmaps that attempt to illustrate where artistic depictions were focused at 20-year intervals. The intensity is based on the number of artworks depicting each location.
The churches, town hall, and weigh house at the old center of the city were a consistent subject across all these periods.
It took some time for the 1613 westward expansion of the city to attract artistic depictions. 
The southeastern expansion in the 1660s, however, featured more palatial buildings that seem to have drawn attention much more quickly.

Visualizing the spatial relationships of these depictions is leading me to now ask more detailed questions about why certain areas of the city may have attracted depiction while others did not.
I also want to examine spurs for depiction other than expansion.
In the final slide, I've plotted the number of Amsterdam images per year from my dataset against the amount of money spent on public works in Amsterdam over the same period.[^1]
Some spikes in depiction align with major construction outlays, but others (like the fire that destroyed the old town hall) do not. 
This is where we need to turn from this macro-view to a micro-view, looking at the different characters of individual depictions and what they can tell us about period relationships between vision and the space of the city. 

[^1]: I derived these data from Marjolein ’t Hart, "The Glorious City: Monumentalism and Public Space in Seventeenth-Century Amsterdam," in *Urban Achievement in Early Modern Europe: Golden Ages in Antwerp, Amsterdam, and London*, ed. Patrick Karl O’Brien (Cambridge: Cambridge University Press, 2001), fig. 6.1. I was able to extract the dataset from this printed chart using the excellent [Plot Digitizer](http://plotdigitizer.sourceforge.net/).
