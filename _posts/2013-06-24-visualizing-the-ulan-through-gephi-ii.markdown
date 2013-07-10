---
author: mlincoln
comments: true
date: 2013-06-24 15:00:52+00:00
layout: post
slug: visualizing-the-ulan-through-gephi-ii
title: Looking through the ULAN with Gephi, II
wordpress_id: 1270
categories:
- Art History
- Digital Humanities
tags:
- gephi
- network analysis
- ULAN
- visualization
---

In a recent [guest post](http://sixdegreesoffrancisbacon.com/post/53595757782/networks-as-constructs-the-curious-case-of-margaret) on the Six Degrees of Francis Bacon project, Shawn Moore discusses the curious networks of Maria Cavendish. Moore writes:


> In many ways, her networks are non-traditional in that they often exist outside of and beyond Cavendish herself…

Of significant interest is that the DNB data shows how important extra-personal (looking for a word that indicates connections beyond the intra-personal) connections are for the network Cavendish constructs, and to the networks that are constructed around the reception and reputation of “Margaret Cavendish,” thus exposing an important structure in the sociable practices at play during the period.


In other words, it seems that understanding the reception of a figure's work through network graphs requires surveying more than the immediate neighborhood, or ego network, of figures just one edge away from Margaret Cavendish (or Rembrandt van Rijn, for that matter.) It is, of course, the relationships between these first, second, or third-level nodes that actually constitute the public conversation about the root author or artist, the conversation we are so eager to better understand.

It was after I dove into Gephi last week that I found Scott Weingart's excellent [overview of network analysis for humanitsts](http://journalofdigitalhumanities.org/1-1/demystifying-networks-by-scott-weingart/).[^1] After a cogent introduction to the basics, Weingart offers some pointed warnings to humanists about creating multimodal networks - that is, networks with different classes of nodes (e.g. artists and organizations, illustrated below.) These require their own analytical and layout tools.

[![A graph of the Black Mountain College network, with both artist and organization nodes. (visualization by Matthew Lincoln, underlying data © 2013 The J. Paul Getty Trust. All rights reserved.)][blackmountain]](http://mlincoln.files.wordpress.com/2013/06/screen-shot-2013-06-23-at-3-47-03-pm.png)

[blackmountain]: http://mlincoln.files.wordpress.com/2013/06/screen-shot-2013-06-23-at-3-47-03-pm.png "A graph of the Black Mountain College network, with both artist and organization nodes. (visualization by Matthew Lincoln, underlying data © 2013 The J. Paul Getty Trust. All rights reserved.)"

Although for my own purposes I am content to filter out organizations from the ULAN dataset, I also want to take advantage of the rich variations of relationships it describes. This means devising some scheme for weighting relationship types by their attribute ("master of" assigned a weight of 10, for example, while "collaborator with" gets a weight of 5).[^2]

One would have to customize such a scheme depending on what type of influence you were interested in visualizing; interpretation and all its accompanying biases will be layered on fast and thick. I predict this will be one of the biggest hurdles to overcome as we move forward with this project.


	
[^1]: Scott B. Weingart, “Demystifying Networks, Parts I & II”, *Journal of Digital Humanities* 1, no. 1 (Winter 2011) ([URL](http://journalofdigitalhumanities.org/1-1/demystifying-networks-by-scott-weingart/))

	
[^2]: I am curious how the next version of Gephi (0.9), which will implement [multigraph support](https://gephi.org/2013/rebuilding-gephis-core-for-the-0-9-version/), might aid this process.



