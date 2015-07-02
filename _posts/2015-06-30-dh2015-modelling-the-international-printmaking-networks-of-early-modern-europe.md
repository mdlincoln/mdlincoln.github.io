---
layout: post
title: "DH2015: Modelling the (Inter)national Printmaking Networks of Early Modern Europe"
date: 2015-06-30 8:00
comments: true
tags:
- Digital Humanities
- Conferences
- Art History
- R
- Network Analysis
redirect_from:
  - DH2015.html
  - dh2015.html
---

Below are the slides and speaking notes for my DH2015 talk "Modelling the (Inter)national Printmaking Networks of Early Modern Europe".

[View the official abstract in the published proceedings.](http://dh2015.org/abstracts/xml/LINCOLN_Matthew_Modelling_the__Inter_National_Pri/LINCOLN_Matthew_Modelling_the__Inter_National_Printmaki.html)

[Access the data and visualization code bundled in an R package.](http://artinterp.org/dh2015/dh2015_0.1.tar.gz)

<script async class="speakerdeck-embed" data-id="52b80212233c461e95b4e0bf9d7f95da" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

---

<aside>n.b. These are notes for a more freely-delivered talk, so many of these ideas
are not a formally articulated as you might expect in a published article.</aside>

One key point in the history early modern Dutch artistic printmaking is the
formation of what might be called a national school: a shift away from
internationalized, courtly mannerism such as the Goltzius print above after a
design by a German painter, and towards domestic subjects and styles, like the
Frisius print after a Matthijs Bril landscape.

Scholars have connected this turn in style and content to the coalescing of a
Dutch national identity during the course of the revolt against Spain between
1568-1648. However, little work has been done trying to understand how changing
production practices might have effected this shift, both in Holland and in
other countries in the early modern period. This is where network analysis comes
in.

Engravings are a fundamentally collaborative process (designer, engraver,
publisher)

Furthermore, the result of this process – the print itself – serves as a great
index of the existence of a professional relationship at a certain period in
time…

...even to the point of being recorded on the print itself!

From these surviving prints we can infer a dynamic network of social connections
between artistic sources, engravers, and publishers, well suited to
computational network analysis.

Better yet, promising datasets have already been constructed for us – by
museums! A few years ago the British Museum took the gargantuan step of
publishing their collections data as LOD, and this seemd like a perfect dataset
to adopt for the print production question. This is obviously a sample biased by
the facts of what has survived to us over the last four centuries, and by the
historical collecting practices of the BM – and I’ll get to ways towards
addressing that by the end of the talk. As collections go, however, the BM does
have two useful assets – a particularly broad collection of European prints from
this period, and a meticulous set of curatorial data.

It wouldn’t be a DH session without a messy-yet-beautiful network graph of all
these nodes and edges. Obviously this won’t work for us, in large part because
flattening this dynamic network removes the 250-odd years of history informing
its evolution.

Instead, we need to do dynamic network analysis on a series of temporal
subgraphs.

The metric we’ll consider today is the EI index - a simple measure of the
propensity for nodes belonging to an arbitrary group to connect to members of
that group, or members outside that group. This provides a simple measure of how
closely print production connections aligned with actor nationality.

Here, I’ve plotted out the changing EI indicies for six major regional
printmaking communities – Dutch, French, English, Flemish, Italian, and German.

As a reminder, above the 0 line means members of the community were making the
majority of their connections to foreign actors

While below the 0 line means members of a community made the majority of their
connections to each other.

There’s some noise in the trends in the early years of the 16th century for
several of these charts – that’s why I’ve included size of points as a variable
to show how many prints each year’s subgraph is taking account of.

There are a few interesting shapes here. Notice that the Dutch, Flemish, French,
and English communities all begin the sixteenth century making most of their
connections outward (save for some noise in the Dutch trend caused by the
painter and engraver Lucas van Leyden, each one undergoing at different points a
relatively swift turn towards more inward connections.

Each of these externally-connected networks underwent their own relatively
precipitous shift towards majority-internal connection, but at different points
in time. We could make make individual suggestions for what might have
precipitated these changes – for example, the beginning of the Dutch revolt in
1566, the French wars of religion in the 1620s, or the English civil war between
1642 and 1651 making it more difficult to conduct international trade.

And yet it is quite easy to locate exceptions to this apparent link between
conflict and internal connection. If the onset of conflict spurred Dutch artists
to connect more inwardly, the end of the revolt in 1648 and the reopening of
borders did not result in a sudden return to more international collaboration.
In that same vein, the sudden inward turn of Flemish print production occurred
not during conflict, but during great prosperity, as the transfer of foreign
trading houses from Bruges to Antwerp around 1500-1510 led to a veritable
economic golden age in Antwerp.

This is not to say that these historical events had no significance – they
undoubtedly did. But may be more useful to think of these events not as sole
motivating agents, but rather as catalyzing agents affected by larger structural
forces.

The odd players out in this analysis are the Italianate and Germanic networks.
Unlike the swift drops towards relatively stable, internally-connected
production, the Italian network remains majority-internally connected for the
duration of this study period. And the Germanic network experiences several
ongoing fluctuations back and forth across that 0 line, though for at least the
first half of the 16th century it remains majority-domestically connected.

It’s tempting to think that the Italians were largely cut off from international
European print production just looking at this graph. However, remember we are
only looking at the EI ratios of each of these groups, not the actual balance of
who was receiving or sending connections across this entire group.

Above is the percentage of all external connections received by each region,
below is the percentage of all external links being sent. It’s very easy to risk
overinterpretation of such a complex graph, so I’ll limit my remarks to a few
quick observations.

Most importantly, we find that, although Germanic and Italianate regions were
largely internally-connected in the early 16th century, they were by far the
greatest _recipients_ of what international printmaking ties _were_ being sent
and received at that time. Italy would remain a strong recipient of
international connections through to the mid-17th century as many foreign
printmakers and publishers looked to Italian artists for design sources. However
Italian printmakers showed little interest in sending out their own
international links; that distinction clearly went to the Flemish, and soon
later the Dutch and French, and even English printmakers and publishers in
succession.

It seems little coincidence that the regional networks that are primarily
inward-connecting in the mid-16th century (Italy and Germany) also had some of
the longest printmaking traditions, dating back to the late 15th century. The
medium of printing demanded a set of artistic and technical skills, not to
mention a set of social connections and financial capital, that presented a
barrier to new entrants into the printmaking world In the aggregate, these
requirements presented a barrier not only to individuals but also to regions and
countries. Germany and Italy, the respective origins of woodcut printing in the
north and the south in the late 15th century, were able to make mostly internal
connections through the 16th century. They would gradually receive an increasing
number of foreign connections, as Dutch, French, and English artists sought to
connect to expert printmakers. Over time, these externally dependent regions
would begin to cultivate more native talent, knowledge, and physical resources,
as experienced printmakers trained new students and transitioned from making
prints to establishing their own publishing firms. It seems that once a critical
mass of designers, printmakers, and publishers had developed within a country,
these national networks shifted quickly, rather than gradually, towards
increased domestic production.

But I promised I’d speak to the problems caused by looking at just one museum
dataset! What about the collecting biases of that particular institution?

This is where the open data from the Rijksmuseum API comes in. The Rijksmuseum’s
Prentenkabinet another one of the great European print rooms, although unlike
the BM, it was built with a more express goal of creating a definitive
repository of Dutch and Flemish prints and drawings. The RKM has documented
their prints with a similar level of detail, specifying the particular roles of
actors in those artworks, meaning that we can run the same analyses and compare
the results. Both institutions are biased in their own ways, but if we see
shared patterns then at least we can speak with a bit more confidence.

It’s particularly interesting to see these results in light of the fact that
both museums have slightly different ontologies for artist nationality (in the
BM, for example, an artist may have multiple nationalities). However, the
results are broadly consistent for Dutch, Flemish, French and Italian, mostly
consistent for German, but not at all similar for English prints (in which the
BM has voluminous holdings, while the RKM has very few). This is reassuring that
the trends are not wholly due to the collecting practices of a single
institution. More work needs to be done comparing these modern collex against
what documentation – like stock lists – survives from the 17th c.

Future Directions

- There’s a lot more descriptive work to be done, and I’ll be exploring that further in my dissertation.
- Ultimately it’d be interesting to evaluate my interpretations of these trends through simulation, to check if they are at least plausible explanations for the observed network behaviors.
- However, we’ve more work to do in modelling print production...

Prints are a tricky fit for art museum CMSes. They are unique objects, but
they’re also multiples that can be linked to physical printing plates that have
their own states and histories, as well as preparatory materials like drawings.
None of these complex relationships fit comfortably into the CMS for a single
institution. That’s why we have fantastic reference sources on European prints –
they’re just locked into a 50/60 printed volumes of Bartsch and Hollstein that
sit on art library shelves.

I close, thus, with a plea for some way to link this data in an open way... say,
a list of addressable URIs that museums could reference w/o reinventing the
wheel every time. So, get in touch with your local LODLAM afficionados, and
let's make this happen!
