---
layout: post
title: "Keystone DH: Simulating Print Production Networks"
date: "2015-08-04 10:31"
comments: true
tags:
- Conferences
- Digital Humanities
- Art History
- R
- Network Analysis
---

Below are the slides and speaking notes for my [Keystone DH][keydh] talk "The Trees, the Forest, and the Passion for Prints".

[keydh]: http://sceti.library.upenn.edu/KeystoneDH

<script async class="speakerdeck-embed" data-id="cfd91c6cf1a04bf4bdb13ae0b8a07e9a" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

***

Prints present us with a pretty interesting problem. Like most art museums, the
British museum is almost 90% prints, at least counting total numbers of objects.
How can we tell a synthetic story of printmaking when there is just so much
evidence to grapple with?

Prints offer an excellent index of their own production, and through that, a
proxy for understanding artistic networks from the early modern period. Networks
are an especially apt frame for thinking about artistic prints, because these
are often a collaborative process.

Furthermore, the result of this process – the print itself – serves as a great
index of the existence of a professional relationship at a certain period in
time, even to the point of being recorded on the print itself!

From these surviving prints we can infer a dynamic network of social connections
between artistic sources, engravers, and publishers, well suited to
computational network analysis.

A few years ago the British Museum took the gargantuan step of publishing their
collections data as LOD, and this seemed like a perfect dataset to adopt for the
print production question. This is obviously a sample biased by the facts of
what has survived to us over the last four centuries, and by the historical
collecting practices of the BM – and I’ll get to ways towards addressing that by
the end of the talk. As collections go, however, the BM does have two useful
assets – a particularly broad collection of European prints from this period,
and a meticulous set of curatorial data.

It wouldn’t be a DH session without a messy-yet-beautiful network graph of all
these nodes and edges. Obviously this won’t work for us, in large part because
flattening this dynamic network removes the 250-odd years of history informing
its evolution. More accurately, time is basically the _only_ thing it shows us –--
artists have been clustered here basically according to which year they were
born in, because that’s one of the biggest (and maybe most uninteresting)
predictors for who connects to you.[^scott]

[^scott]: Thanks to [Scott Weingart](http://www.scottbot.net/) for pointing this out!

## Dynamic network analysis

Instead, we need to do dynamic network analysis on a series of temporal
subgraphs.

The metric I’m interested in today is centralization – did Dutch printmaking
become more or less centralized during the golden age in the seventeenth
century? On the one hand, the medium of printing demanded a set of artistic and
technical skills, not to mention a set of social connections and financial
capital, that presented a barrier to new entrants into the printmaking world,
and would have encouraged a network centralized around a few well-connected
experts. On the other hand, knowledge is not a fixed quantity: as printmaking
increased in popularity, more and more artists could have learned the technical
skills necessary to succeed in the medium. Thus, as time passed, the barriers to
entry may have decreased as more and more knowledgeable engravers and printers
were able to create their own local connections without relying on a printmaking
"elite". A burgeoning Dutch economy in the first half of the seventeenth century
may also have supported print markets in smaller Dutch towns, thus leading to a
more decentralized network of print producers.

Network analysis has a metric for this question: the graph centrality score,
which helps to characterize in just one number whether your network looks more
like the star network above, or more like the mesh network below. How does this
one index – and it is just one index – change over time?

Some quick reactions:

- Rapid centralization around 1580-1600
- Swift re-distribution within a generation, reverting to a low level by 1640s
- If the golden age helped the network decentralize, economic contraction in 1670s did not lead to an immediate return of centralization

We get both sides of our proposed effects – periods of centralization, but also
periods of decentralization.

Already this is very useful information for us. It helps us to contextualize the
work of individual printmakers – how Lucas van Leyden became a locus of
Netherlandish printmaking activity early in the sixteenth century...

And how the next spike of centralization would not come until the Haarlem-based
master Hendrick Goltzius established his studio and trained a vital generation
of new Dutch printmakers and publishers.

An engraver and publisher like Claes Visscher, working in a relatively
centralized print production world at the turn of the century, could command a
wide sweep of the industry by publishing landscapes, portraits, maps, book
illustrations, and more.

But it is also useful to think about lesser-known printmakers like Nicolaes de
Bruyn, who would have trained during the short generation where the production
network was rapidly decentralizing. Did this decentralization encourage him to
define a niche in oversized, fanciful landscape prints in order to stand out in
a more distributed production network?

Or we can look to Abraham Blooteling, who still produced prints after a wide
range of artists, but earned praise for his dedication to the relatively novel
technique of mezzotint.

Moving into the eighteenth century, it is also worth considering the sudden
return to centralization, perhaps headed by Bernard Picart, the French-born
printmaker who came to Amsterdam in the 1710s.

What’s really interesting about all of this is that this tells a rather
different story than the one we get just from counting active artists, or
numbers of prints, from this period. While both those counts seem to have peaked
shortly after 1650, the spike in network centralization came and went in the
decades around the turn of the seventeenth century.

The relatively immature Dutch print production network in the late sixteenth
century benefitted from centralizing around the few expert printmakers able to
train the following generation and also provide them access to a larger social
and artistic network. This was a classic rich-get-richer scenario, where having
many social links made you even more attractive to new social links. Over time,
however, even as more and more artists entered the marketplace through the first
half of the seventeenth century, and more and more prints were being made, the
larger number of well-trained printmakers did not need to centralize as much in
order to maintain a productive network. What is more, rather than this being a
gradual shift towards decentralization, we instead see a sharp drop in the space
of just a decade or two.

The take-home point: Simply counting artists actually masks a more complex and
dynamic history.

## BUT WAIT

So far we’ve just done descriptive network analysis – measuring our dataset, and
postulating some reasons for why it shows what it does. But this does not test
if the actual explanation – that Dutch printmakers pursued a rich-gets-richer
mode of connection – would really create the kind of network trends we see. So
far, all we have is a post-facto explanation.

This is where simulation comes in. What we want to do is create a simulation fed
with the same inputs – the same target numbers of artists and total connections
made each year – as our “real” observed network, and see how it reacts to the
connection rules we’ve established. If our simulated network metrics appear
similar to the observed metrics from our dataset, then we can feel more
confident about our proposed explanation.

I’m going to do two super-simple simulations, probably horribly flawed in many
ways, but also relatively transparent in their behavior – aka a good place to
start, which is pretty much where I’m at with this part of the project.

Both of these graphs have 20 nodes and 50 edges. In the Erdos-Renyi graph, edges
are added completely at random. In the scale-free graph, edges are also added
randomly, but following a power-law distribution. What does that mean? It means
that a few nodes (like 19 and 20 here) will receive the bulk of the connections,
while most will only have a handful – in other words, a rich-get-richer world
like the one we’ve posited for our Dutch print producers.

What happens when we feed these two simulations with the same number of nodes
and edges as from the BM data, but no other information about our print
production network?

Because each simulation is randomized, I run it 100 times for each year we want
to study, and so instead of one number I get a range of values – here, a 90%
confidence interval, aka the range that 90 of the centrality scores fall in to –
hence the ribbons on this plot. The black line you should recognize – it’s our
empirically-observed data. What we see is pretty good news for our proposal!
While the fully random simulation (in red) never really centralizes, the
scale-free, power-law graph’s centralization (in blue) generally matches the
observed centralization – it even predicts that huge spike in centralization
followed by a quick drop towards relative distribution.

That said, there’s clearly a paradigm shift around 1720 that this model doesn’t
account for – but that’s also pretty exciting, because it means we need to
return to our source material – the prints themselves – and ask some new
questions.

Two take-home points: Printmakers needed expert collaborators – the story of
Dutch printmaking goes well beyond an aggregation of individual engravers and
etchers, and a lot of it seems to have been driven by expert-seeking behavior.

There’s also lessons for humanistic network analysis in general. We need to look
at metrics over time, not only network viz. We also need to eventually test our
proposals through simulation.
