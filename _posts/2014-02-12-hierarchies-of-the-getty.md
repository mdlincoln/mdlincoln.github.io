---
layout: post
date: 2014-02-21 16:41:41.030765
title: "Hierarchies of the Getty Art & Architecture Thesaurus"
---

The Getty released their Art & Architecture Thesaurus (or AAT) as [Linked Open Data](http://vocab.getty.edu/) yesterday, part of their ongoing project to publish each of their wonderfully-detailed vocabularies onto the Semantic Web.
The AAT is a curious beast that covers concepts from materials and object types, to abstract concepts like physical attributes and types of organizations.
Just for fun, I decided to visualize one lobe of the AAT: their descriptions for artistic styles and periods.
Click below to open up the visualization, which works best when viewed on a full screen.

<figure>
<a href="/projects/dendrogram-fullscreen.html"><img src="/assets/images-display/aat_screenshot.png" alt="Screenshot from the AAT dendrogram visualization" /></a>
<figcaption>Click to open the interactive visualization of the Getty AAT hierarchy of artistic styles and periods.</figcaption>
</figure>

I lifted the JavaScript almost wholesale from one of [Mike Bostock's D3 examples](http://bl.ocks.org/mbostock/4339083).
You can see the code I used to import and query the data on [GitHub](https://github.com/mdlincoln/getty_vocab).
You can also [download the underlying JSON](/assets/docs/aat-style-hierarchy.json) for this particular visualization.

This visualization contains contains information from Art & Architecture Thesaurus (AAT)® which is made available under the ODC Attribution License. [See more here](http://www.getty.edu/research/tools/vocabularies/lod/sparql.html#sthash.cSqLzpWr.dpuf).

