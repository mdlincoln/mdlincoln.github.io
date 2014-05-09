---
layout: post
comments: true
title: "Network Models of Netherlandish Engravings"
date: 2014-05-09 00:17
tags: 
- Digital Humanities
- Art History
- Network Analysis
- Conferences
---

<aside>
These are the abstracts for a paper presentation and poster session, just accepted into the 2014 Sixteenth Century Society Conference in New Orleans, along with a few (very preliminary/subject to change) findings.
</aside>

## Inferring Artistic Networks from Cultural Data: Engravings in the Early Modern Netherlands

Daunted by the staggering volume of extant prints from the sixteenth- and seventeenth-century Netherlands, to date most art historians have profitably focused their studies of engravings and etchings on individual artists and publishers.
Yet the broad contours of artistic exchange facilitated by intaglio prints (more often than not a collaborative endeavor between designer, plate cutter, and publisher) have proven more elusive.

This paper attempts to outline the dynamics of the artistic print networks in the Netherlands in this period by inferring a network of individuals connected based on their shared roles as described in a database almost 60,000 period engravings from the Rijksmuseum.
Did the rapid growth in printmaking over this period foster *centralization* around a few publishers whose printing expertise and social connections gave them a competitive advantage in the relatively open market of engravings and etchings?
Or, alternatively, did networks *decentralize* as technical literacy spread and increasing wealth (particularly in Holland) supported more local artistic markets?
Rather than trying to use often-deceptive visualizations of the network itself to evaluate these hypotheses, this paper instead seeks to interpret the shifting trends of key network statistics such as global clustering coefficients and the size and number of algorithmically-detected communities.

<figure>
<a href="/assets/images/print_network_transitivity.svg"><img src="/assets/images/print_network_transitivity.svg" /></a>
<figcaption>Dynamic clustering coefficient (probability that an individual is connected to one of his colleague's colleagues).</figcaption>
</figure>

<figure>
<a href="/assets/images/print_network_communities.svg"><img src="/assets/images/print_network_communities.svg" /></a>
<figcaption>Dynamic number of sizable communities (populations in the 50th percentile).</figcaption>
</figure>

Preliminary results point to an intriguing interaction between these incentives to centralize and decentralize.
The rising popularity of artistic prints may indeed have encouraged local centralization around established professionals, rather than broad interaction between many artists.
At the same time, this local centralization ultimately fragmented the broader network of Netherlandish artistic prints, once dominated by Antwerp in the sixteenth century, into smaller regional hubs --- a trend that would only be reversed in the early eighteenth century.

Illuminating the network structure of printmaking can encourage us to clarify how we conceive of artistic influence and communication, and I will suggest several examples of how these results can help us re-situate our traditional efforts at close looking into fitter contextual frames.
Far from asserting a definitive conclusion, however, I also hope to emphasize the challenges of adapting computational methods to the information embedded in (and sometimes occluded by) by these artworks, outlining methodological problems still to be thought through and potential data sets yet to be fully engaged.

***

## Individual Influence in a Network Model of Netherlandish Artistic Print History

Whereas my paper presentation focuses on the interpretation of dynamic network-wide statistics for the Netherlandish artistic print community, this poster presentation will present some of the unexpected, yet informative results found when examining statistics of individual actors.
My project to represent the information embedded in artistic prints into a social network framework necessarily adopts certain restraints in order to produce usable data.
As Franco Moretti has suggested[^moretti], abstracting our objects of humanistic study into this kind of "operationalizable" data will produce alternate modes of theorizing our subjects, not simply alternate answers based on extant interpretive structures.
Network connections in this model are defined based on certain defined roles ("based on a design from", "published by", "with a privilege from", and others defined by the Rijksmuseum, the source of these data) that differ from a conventional understanding of social connections.
They do not necessarily describe individuals' direct acquaintance with each other, nor do they encompass artistic connections fostered in undocumented instances when one artist sees the work of another.
And yet, such a definition does capture something of the diachronic relationships art historians grapple with all the time, with artists referencing decades- or centuries-older models, in effect reinserting those older artists back into the current artistic sphere.
This poster will present several alternate perspectives on the concept of artistic influence and communication as modeled by social network analysis.

<figure>
<a href="/assets/images/print_network_rembrandt_degree.svg"><img src="/assets/images/print_network_rembrandt_degree.svg"></a>
<figcaption>Rembrandt van Rijn's weighted degree (his relative number of print network connections) from 1600 to 1800, with his lifespan (1606-1669) marked in red. Note how his connectivity to the network actually peaks decades after his death.</figcaption>
</figure>

[^moretti]: Moretti, Franco. "'Operationalizing': Or, the Function of Measurement in Modern Literary Theory." *Pamphlets of the Stanford Literary Lab* 6 (December 2013): 1–15.
