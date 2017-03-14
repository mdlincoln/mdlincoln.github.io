---
layout: "post"
title: "DH2016: Measuring Genre Diversity in Seventeenth-Century Dutch Painting and Printmaking"
date: "2016-07-13 23:43"
comments: true
tags:
- conferences
- digital humanities
- art history
aside: "These are the slides and notes from my talk at DH2016 in Kraków on July 13, 2016. The notes are mostly unedited, however I have added a short bibliography at the end of the post. [The \"official\" abstract is available here](http://dh2016.adho.org/abstracts/133), however, as often happens, it is now rather out of date compared to the talk!"
redirect_from:
- DH2016.html
- dh2016.html
---

<script async class="speakerdeck-embed" data-slide="1" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

So I learned a few months ago that talk was going to be part of a session of papers about actual computer vision and image processing.

Mine is not about that at all.

I will be talking about artworks, but from the perspective of human-coded, rather than machine-coded, descriptions.

<script async class="speakerdeck-embed" data-slide="2" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Many of us here are likely familiar with the challenges of systems for describing artworks – while some institution use a controlled vocabulary like Getty Art & Architecture Thesaurus or ICONCLASS, you more often find a home-grown vocabulary used only by that particular collection database or catalog raisonnée.
I will _not_ be addressing the problem of reconciling these vocabularies today.
Instead, I want to demonstrate how we can use these heterogeneous structured descriptions, _in spite_ of their conflicts, in order to address some real art historical questions. 
I'll be talking about two projects, first from my research on prints, and then concluding with a preview of a work in progress that deals with some similar issues.

<script async class="speakerdeck-embed" data-slide="3" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The first concerns something that has long interested historians of the art of the Low Countries: the phenomenon of genre specialization. 
It is commonly-accepted that a great number of Dutch and Flemish painters began to specialize in particular genres of paintings in the late 16th and early 17th centuries. Economic concerns may have made specialization an attractive strategy within the relatively open artistic market in the Low Countries. 

The economic historian John Michael Montias described the two advantages that specialization offered:

1. product innovations that offered novel types of paintings to the market
2.  process innovations that made the production of each additional painting that much easier.  A painter who, for example, specialized in seascapes, would be able to rely on a set of recurring compositions and motifs, and practiced fluency in rendering certain effects and materials.

<script async class="speakerdeck-embed" data-slide="4" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

But the story with printmakers is somewhat more unclear. 
You will find conflicting narratives in the current print scholarship on whether it was advantageous for printmakers to specialize or, on the other hand, to diversify. 
A printmaker like Nicolaes de Bruyn was able to spend a very long and successful career turning out one type of large-scale narrative landscape print. 
On the other hand, we can also point to printmakers like Hendrick Hondius who covered an enormous range of portraits, maps, religious images, and mythologies. But what was the balance between these two approaches to printmaking? And did that balance shift significantly over time, as it appears to have done with painters?

<script async class="speakerdeck-embed" data-slide="5" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

A data-driven approach to this question needs a method to determine the relative balance or skewness of an artists oeuvre. 
There's a very simple measure called Shannon's diversity, which was developed by Claude Shannon to characterize information entropy, but which has been used to describe subjects as wide-ranging as ecological diversity, national economic specialization, and even housing segregation. 
What this measure does is characterize the balance of different category ratios within a population. 
For an evenly balanced population, like the one on the left, we get a relatively high index of 1.1, while for the more skewed population on the right, we find a lower index of 0.56.
By treating each painting genre as a different "species", it is possible to calculate an oeuvre-wide diversity for each artist. 

But where can we get this information, and how can we evaluate whether it captures the historical change we are looking for?

<script async class="speakerdeck-embed" data-slide="6" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

I'll first test the metric against two paintings databases – one contemporary to the seventeenth century, the other modern – as a way to see if this diversity metric can, indeed, capture the recognized turn towards greater specialization by Dutch and Flemish artists around the turn of the century. 
Having established the effectiveness of Shannon's diversity measure, we can then try the metric against a database of prints.

<script async class="speakerdeck-embed" data-slide="7" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The Montias Database will serve as an archival baseline. Montias assigned one subject keyword per entry, like "Landscape", "Religious", "Portrait", and so forth, based on the textual descriptions of individual items in each archive. This scheme – with one subject per artwork, serves as a baseline for the way we will measure oeuvre diversity in the other data sources. 

<script async class="speakerdeck-embed" data-slide="8" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The modern database is maintained by the RKD. Because they apply multiple keywords per entry, and we need to sort individual artworks in to just one category each, I used k-means clustering to produce 5 different paintings groups based on the co-occurrence of keywords, and then did a sanity check to see how well these groups aligned with the types of genres that Montias had coded. Even this unsupervised grouping worked quite well, producing groups for landscapes, still-lifes, portraits, religious paintings, and a more general group encompassing genre paintings and history paintings.

<script async class="speakerdeck-embed" data-slide="9" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The print data comes from the collections of the Rijksmuseum, which have been carefully catalogued with tags from the ICONCLASS iconography notation system. ICONCLASS is a hierarchical vocabulary, so the marking for the Story of Isaac, for example, shares the same root of "Bible" and "Old Testament" with the "story of Noah". As with the RKD data, I used k-means clustering to sort objects in to broad groups that could be used for oeuvre diversity characterization.

<script async class="speakerdeck-embed" data-slide="10" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Both of the paintings datasets have their own problems. 
The Montias set is biased towards the collections of rich households, and, because most are inventories drawn up by probate courts, they are also skewed towards the inventories of those who died with significant debts. 
Meanwhile, the RKD database is a view of the 1600s filtered by the collecting practices of intervening centuries. 
However, if we can discern roughly similar patterns from both datasets, then we can feel more confident that we are perceiving an actual historical signal. 

Unfortunately, archival information on individual prints is not nearly as granular as it is for paintings, so at this current point in time I am working solely from the Rijksmuseum database – this suffers the same filtering effect as does the RKD database. As more print collections data are made available with useful subject description tags, then we can revisit the results. 

<script async class="speakerdeck-embed" data-slide="11" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Just as the montias database sets the common denominator for a single genre per artwork, it will also set the historical limits for this experiment – restricting to artists born between 1520 and 1675, as it is only between those limits that we have sufficient data from all three databases. 

<figure>
<video width="100%" height="100%" controls>
  <source src="/assets/video/dh2016_window_anim.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>
<figcaption>Visualizing the use of a moving window. (Made with the help of the <a href="https://github.com/dgrtwo/gganimate/">gganimate</a> package.)</figcaption>
</figure>

To understand how the balance of specialization vs. diversity shifted over time, if at all, we'll calculate an oeuvre-wide diversity for each artist. 
Then, using a moving window, we can calculate the mean diversity value for artists born within that window. 
To account for the fact that some windows will have a larger sample of artists from which to calculate a mean diversity, I'll be bootstrapping confidence intervals, which will essentially mark where our estimate of the mean diversity is more uncertain because it is based on fewer artists. 

<script async class="speakerdeck-embed" data-slide="13" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>


This data-driven approach confirms the commonly-acknowledged turn by painters towards specialization by artists born after 1580.
On the other hand, we find that printmakers did not experience a parallel decline in mean diversity; in fact, printmakers born around 1550 saw a _rise_ in genre diversity later in their careers.

<script async class="speakerdeck-embed" data-slide="14" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>


Now again, this is not to say that printmakers _never_ specialized – indeed many did. 
Of those printmakers who DID specialize, a pattern is clearly visible: they were almost all painters, as well. Their specialization in printmaking developed alongside their painterly specializations. For example, Ostade and his students Bega and Dusart produced both paintings and prints of peasant life, while seascape printmakers Nooms and Van Everdingen were prolific seascape painters as well. 

<script async class="speakerdeck-embed" data-slide="15" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The generalist printmakers, on the other hands, were those like Jonas Suyderhoef who made a living producing plates after a wide range of artists, working for multiple publishers and even, like Hendrick Goltzius, starting their own independent printmaking firms. It seems that those printmakers who made their livelihood almost exclusively through printmaking _had_ to be able and willing to render a wide variety of subjects. Such flexibility may have presented an attractive insurance policy both for printmakers themselves, but also for print publishers, who had to continually react to the demands of a quickly-moving market for artistic prints and illustrations.

<script async class="speakerdeck-embed" data-slide="16" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

So it is possible to extract some useful insights even from unreconciled artwork description databases. But I'm also very interested in applying machine learning to help parse out individual databases with their own highly contextual vocabularies.

<script async class="speakerdeck-embed" data-slide="17" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="18" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

One example of this is a database produced by a collaborator of mine at UMD, Henry Gregory, who catalogued over 600 known still life paintings from Haarlem-based artists between 1610-1660.
He created a highly specific vocabulary of compositional and symbolic attributes.

<script async class="speakerdeck-embed" data-slide="21" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="22" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

As you can see, some of these features only make sense in the context of these particular types of still life paintings, and would never fit into a larger aggregation model of other types of paintings.

<script async class="speakerdeck-embed" data-slide="23" data-id="362cd4ad6f23413e8aed242e8ae3b131" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

This is an entirely preliminary visualization, but this is the type of question in which I'm interested: if we train a classifier (in this case, a random forest model) with just motif, or just composition variables, does it do particularly well or particularly poorly with certain artists? 
Some artists can be predicted very reliably based on their motifs, and others very reliably based on their compositions. 
Some, though, are highly unpredictable, at least by these data. 

What does it tell us about the nature of the artists' work, not to mention the nature of our data, that we feel confident attributing a Gerrit Heda, but that the model does not, even when given this apparently-detailed information? Even as we look to reconciling more and more cultural heritage data under shared vocabularies, I am also still quite interested in what can be done computationally with these "thick, bespoke descriptions", and I think we must remember their value when preparing and analyzing art historical data.

## Select Bibliography

Henry Duval Gregory, "Tabletop Still Lifes in Haarlem, C. 1610-1660: A Study of the Relationships Between Form and Meaning" (PhD diss., University of Maryland, 2003).

John Michael Montias, "Cost And Value In Seventeenth-Century Dutch Art," _Art History_ 10, no. 4 (December 1987): 455.

Jari Oksanen et al., "Vegan: Community Ecology Package" (R Package [version 2.2-1], 2015), <http://cran.r-project.org/package=vegan>.

Claude Elwood Shannon and Warren Weaver, _The Mathematical Theory of Communication_ (Urbana: University of Illinois Press, 1949).

H. van de Waal, _Iconclass: An Iconographic Classification System_ (Amsterdam: North-Holland Pub. Co, 1973).
