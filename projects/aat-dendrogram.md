---
date: 22014-02-21 11:46:23.215180
layout: project
title: "Hierarchies of the Getty Art & Architecture Thesaurus"
snippet: "A D3-driven visualization of the Getty Research Institute's Art & Architecture Thesaurus"
img: /assets/images-display/aat_avatar.png
---

The Getty released their Art & Architecture Thesaurus (or AAT) as [Linked Open Data](http://vocab.getty.edu/) yesterday, part of their ongoing project to publish each of their wonderfully-detailed vocabularies onto the Semantic Web.
According to the Getty, the AAt is "a structured vocabulary, including terms, descriptions, and other information for generic concepts related to art and architecture."

This vocabulary is a curious beast that covers concepts from materials and object types, to abstract concepts like physical attributes and types of organizations.
While its breadth and specificity sometimes seem to verge on the ludicrous ("fireworks" can be found under "post-1945 fine arts styles and movements >> Sky art"), many cultural institutions like libraries and museums find the thesaurus incredibly valuable for allowing them to tag and label their collections with standardized terms.

To give a better sense of the real scope of this vocabulary, I built a small script that walked through the AAT hierarchy and built a collapsible [dendrogram](http://en.wikipedia.org/wiki/Dendrogram) that could be visualized in a web browser.
Click below to open up the visualization, which works best when viewed on a full screen.

<figure>
<a href="/projects/dendrogram-fullscreen.html"><img src="/assets/images-display/aat_screenshot.png" alt="Screenshot from the AAT dendrogram visualization" /></a>
<figcaption>Click to open the interactive visualization of the Getty Art and Architecture Thesaurus Hierarchy.</figcaption>
</figure>

I lifted the JavaScript almost wholesale from one of [Mike Bostock's D3 examples](http://bl.ocks.org/mbostock/4339083).
You can see the code I used to import and query the data on [GitHub](https://github.com/mdlincoln/getty_vocab).
You can also [download the underlying JSON](/assets/docs/aat-style-hierarchy.json) for this particular visualization.

This visualization contains contains information from Art & Architecture Thesaurus (AAT)® which is made available under the ODC Attribution License. [See more here](http://www.getty.edu/research/tools/vocabularies/lod/sparql.html#sthash.cSqLzpWr.dpuf).
