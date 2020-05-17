---
layout: post
title: |
  New book chapter: "Tangled Metaphors: Network Thinking and Network Analysis in the History of Art"
date: 2020-05-17 12:51:48
tags:
- articles
- art history
- digital humanities
---

After years of hard work by editor Kathryn Brown, [_The Routledge Companion to Digital Humanities and Art History_](https://doi.org/10.4324/9780429505188) is finally out!

It was almost three years ago that Dr. Brown invited me to contribute an appraisal of network analysis methods in art history. Like any review paper, by the time it finally appears "in print", its citations are fast going stale. However I still stand by the thrust of the survey, ["Tangled Metaphors"](https://doi.org/10.4324/9780429505188-9): that it's a relatively small portion of art historical network analysis that actually takes advantage of network measures to gain a new perspective on a set of historical sources:

>I aim to shift attention to art-historical work that has engaged with the most fundamentally transformative aspects of networks: that measurements one can make of a network transcend the mere sum of its individual constituents and their interconnections. These are studies that directly engage concepts from network mathematics, using computation as a way to evaluate evidence in ways not accessible through argumentation via case study or even non-network-based quantitative approaches like counting and averaging. I will identify early prototypes for this type of more formalized art-historical network thinking, and then point to a few recent examples of network analysis that push these methodological boundaries in useful ways.

In the chapter, I discuss several little-known forerunners for network thinking in art history. I also point to some exemplars of modern art historical network analysis in the literature over the past few years; works that successfully push boundaries by asking questions that can only be done using network analysis. I argue pretty stridently for art historians to push much harder in this direction; that too many of our "network analysis" touchstones could be replaced with simple counting of events, since they don't really engage with network-wide metrics.

But I also acknowledge how useful network analysis and network thinking can be for a researcher even when, on pursuing the method, they find that network analysis was not the right method to begin with:

>[Michelle] Moravec sought to trace the reprinting of key manifestos within a large corpus of American periodicals from 1969 to 2013. However, the resulting network of reprintings was extremely sparse, with evidence of only two manifestos reprinted within the corpus of periodicals she was studying. Rather than dismissing this as a case of insufficient data, Moravec instead focused on the information communicated by this absence;“on a deeper level,” she writes,"the very premise that feminist periodicals circulated manifestos turned out to be flawed."
>
>...
>
>In this case, it was not the quantitative results of network analysis that supported new interpretations but instead the very process of constructing the analysis that led to new insights. Its rigid methodological confines compelled Moravec to examine her sources and the assumptions underlying her research more closely.

If I were starting this survey again today, I would have focused much more on this latter section. It's not that I've gone completely bear-ish on the use of network analysis. But I've seen so many art historians finding more than enough new insights through straightforward counting and aggregating measures, needing exactly none of the more complex statistical measures that you could use on network data. Networks (and mapping, also) are tempting hooks in workshops and institutes like the [Network Analysis + Digital Art History](/2019/12/10/technical-teaching-cmu.html) workshop that took place here in Pittsburgh last year, for reasons I explain in this new book chapter. However, after doing the hard ontological work of rendering data from their collections or archival sources, I've seen those researchers getting so much rich insight from finally _having_ a database, and being able to filter and facet that information, that they rarely ever have to run network metrics. Their time would have been better spent learning about cardinality and table joins rather than parsing the difference between closeness and betweenness centrality.

Indeed, after observing lots of the NA+DAH projects, it jumps out at me time and again how so many of the art historical networks are based on co-occurrence (two artists working on the same object; or being shown in the same exhibit), and so all the measures of direct information transmission across networks that are useful for e.g. written correspondence, or for transit networks, don't obtain.[^prov] If the useful information ends up being how often did Rembrandt get exhibited alongside Jan Lievens, you don't need a network. You need some filters and counting tools... and well-structured data to use them on.

[^prov]: Wouldn't a rich network of provenance events let you use complex network metrics for art historical gain? If only we actually had provenance data with both the scope and completeness for _network-wide_ measures to be useful! If you've actually found some, let me know. The Getty Provenance Index ain't it.

Thus, I've come around to the idea that it's information modelling / knowledge representation experience that art historians need first and foremost, before getting into analytical methods that will only work once you've finished that knowledge representation work. I've spoken about my turn towards information architecture and engineering earlier this spring as part of the [Sawyer Seminar on Information Ecosystems](https://infoecosystems.libsyn.com/episode-10-matthew-lincoln) hosted at the University of Pittsburgh. And I was planning on teaching more about this in ["Tidy Data for Humanists"](http://web.sas.upenn.edu/dream-lab/tidydataforhumanists/) at Penn's DREAM Lab this summer (now cancelled; though watch this space for some annotated bibliography for the course soon.) It's also why I'm very pleased to see Alison Langmead's and David Newbury's contribution in this same book, ["Pointers and Proxies: Thoughts on the Computational Modeling of the Phenomenal World"](https://doi.org/10.4324/9780429505188-31) that digs into these issues as well.
