---
layout: post
title: Bridgebuilding in Digital History
date: 2017-07-31 08:08
tags:
- digital humanities
- conferences
aside: |
  I'm publishing my position statement for ["Arguing with Digital History"](https://rrchnm.org/news/arguing-with-digital-history-workshop-to-address-a-central-problem-in-digital-history/), a workshop being held at George Mason University in September. We were asked to respond to the following questions:
  
  - How is argumentation in digital history different from other forms of history, and how is it the same?
  - Should DH argumentation be inherently disciplinary, or should it be interdisciplinary?
  - Why is there not more digital history that makes explicit arguments in conversation with the scholarly literature, for an academic audience? What are the barriers to making arguments in digital history? If possible, include examples from your projects.
  - What successful models have you found for making explicit arguments in conversation with the scholarly literature for an academic audience? In those models, what is the relationship between traditional venues for publication and digital projects?
  - If applicable, how have you used digital history to make explicit arguments in conversation with the scholarly literature, for an academic audience? What is the relationship between the arguments you have made and the digital part of your project?
---

Joshua Epstein famously wrote that we are all already modelers - that anyone who ventures an explanation for an observed phenomenon has formed an implicit model in their heads of how that phenomenon functions.[^epstein]
What distinguishes digital history from other forms of history, then, is not whether to build models, but whether to build them _explicitly_, and approach them _experimentally_.
Our current turn (or re-turn) towards explicit specification of evidence, hypotheses, models, and evaluation of those models against known results, could be broadly summarized as a turn towards experimental humanities.
As Ted Underwood notes, the distinguishing factor here is thus not the "digital", but the experimental, model-centric focus of these arguments.[^underwood]

[^epstein]: Joshua M. Epstein, “Why Model?,” _Journal of Artificial Societies and Social Simulation_ 11, no. 4 (2008), <http://jasss.soc.surrey.ac.uk/11/4/12.html>.

[^underwood]: For more on the "experimental" turn, see Ted Underwood, “A Genealogy of Distant Reading,” _Digital Humanities Quarterly_ 11, no. 2 (2017), <http://www.digitalhumanities.org/dhq/vol/11/2/000317/000317.html>.

Explicit model building is frequently sold as a solution to evidence at scale that defies implicit-model argumentation, one that affords falsifiability, reproduction, and greater exactitude.
These are valid points, however there is a third which I believe is undersold, and which is the most important thing that distinguishes digital/explicit-model history from implicit-model history: that of uncertainty.
It compels us to be specific and precise about our uncertainty in ways that we haven't before.
The right framing turns a potential barrier into a productive locus.
Most explicit models - whether developed through deterministic methods like linear regression, or more complex, randomized systems such as random forests, neural nets, or agent-based modeling - have measures of confidence and uncertainty in their predictions.
Working creatively with these features offers new perspectives on uncertainty, the boundaries of plausible explanations, and the interaction of complex systems.

Because of the multiple competencies required to do computational work relevant to historical fields, DH will thus almost always be interdisciplinary in its _execution_.[^langmead]
However, some of the most difficult work in DH is building the intellectual bridges between computational transformations and their resulting uncertainties, and the way that specific disciplines have navigated such evidentiary lacunae in implicit-model histories.
Therefore, the core structure of any particular DH argument will always be _disciplinary_.
In discussions of uncertainty, or of the representation of evidence as structured data, or any other motif raised by computation, different disciplines will have distinct historiographical touch points.
Art history, more so than literary history, for example, has been closely bound up in the production of catalogues raisonné and other structured-data representations of the objects that we study.
Discussions of digital art history will thus only be productive if they are connected to the storied, sometimes-contentious relationship of academic art history to the world of the art museum.
Likewise, to articulate why particular computational methodologies have a significance to a field beyond mere instrumentality means discipline-specific contextualization.

[^langmead]: Alison Langmead discusses overlapping DH competencies in a forthcoming paper in _The International Journal of Digital Art History_.

[^lincoln]: Matthew D. Lincoln, “Social Network Centralization Dynamics in Print Production in the Low Countries, 1550-1750,” _International Journal for Digital Art History_ 2 (2016): 134–57, doi:[10.11588/dah.2016.2.25337](http://dx.doi.org/10.11588/dah.2016.2.25337); Matthew Lincoln and Abram Fox, “The Temporal Dimensions of the London Art Auction, 1780–1835,” _British Art Studies_, no. 4 (November 28, 2016), doi:[10.17658/issn.2058-5462/issue-04/afox-mlincoln](http://dx.doi.org/10.17658/issn.2058-5462/issue-04/afox-mlincoln).

For example, my research interests concern the embedding of artistic production and dissemination in social systems and networks.[^lincoln]
These may be systems of trade and commerce, social networks among artists and their patrons, or even rhetorical structures used to describe artworks in letters or auction catalogues.
Therefore, computational network analysis, as well as other methods for general, non-network predictive modeling, is key to my scholarship.
Art historians have long grappled with historical networks, though rarely in any formal manner.
By getting art historians to understand that network analysis is not so alien as it may first appear, I can open the door to deploying these approaches' more innovative contributions in the service of art historical argumentation.

The multidisciplinarity demanded by computational humanities work is a high bar to reach, and may explain the dearth of well-developed scholarship integrating digital approaches with historical interpretation.
Divergent publication expectations make explicit collaboration between humanists and scientists difficult.
Funding structures exacerbate this challenge.
Most importantly, the intellectual bridges mentioned above must be tightly woven into the core argument and reasoning for a paper - it is impossible for them to be a late-stage appendix or addition that is merely supplemental to an argument.[^prestige]
It is thus little surprise that some of the most cogent digital history arguments have come from humanities scholars who have personally built strong competencies in their respective methods (e.g. Micki Kaufmann, Ted Underwood, Scott Weingart)
It is far less common (in _history_, at least) to see collaborative teams of a humanities and a computing specialist produce such tightly-integrated work (although there are absolutely exceptions, such as [Ruth and Sebastian Ahnert](http://dx.doi.org/10.1353/elh.2015.0000).)

A final note on digital presentation of these arguments:
While I am very interested to see how thoughtfully-implemented interactivity can help explain the methodology behind an article (for example, [this explanation of decision tree construction](http://www.r2d3.us/visual-intro-to-machine-learning-part-1/)), I am less convinced that interactivity is useful for presenting the results of an analysis.
Historical argumentation relies on selectivity and framing - not a strength of "open ended" visualization tools like infinitely zooming graphs or continually scrolling maps.
I suspect the more successful forms of scholarly argument will actually hew _closer_ to linear argumentation than non-linear approaches such as [Scalar](http://scalar.usc.edu/scalar/).

[^prestige]: One touchstone example in my own scholarly development has been Ted Underwood and Jordan Sellers, “How Quickly Do Literary Standards Change?,” 2015, doi:[10.6084/m9.figshare.1418394](http://dx.doi.org/10.6084/m9.figshare.1418394).
