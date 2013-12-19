---
layout: post
comments: true
title: "Charting the Rijksmuseum: The Problem of Media"
date: 2013-12-19 17:18
tags:
- Art History
- Digital Humanities
- Museums
- Code
---

{% include rkm.html %}

All of the graphs I have made for this project are generated from collection-wide trends.
I did not discriminate between different types of artworks like paintings, prints, photographs, sculpture, or furniture.
This begs the question: what exactly are the ratios of different artworks at the Rijksmuseum?

<figure>
<img src="/assets/images-display/artwork_types.svg" alt="Ratios of artwork types in the Rijksmuseum" />
<figcaption>Ratios of major artwork types in the Rijksmuseum's online database.</figcaption>
</figure>

Printed artworks (woodcuts, engravings, etchings, lithographs, and the like) *vastly* outnumber works of any other format.
Paintings clock in at less than 1% of the Rijksmuseum's online collection.[^cleaned]
This should not be too surprising.
Prints are (generally) faster to make than paintings, easily reproduced, and are often issued in series with other prints after the same subject.
This quickly pushes up their absolute numbers in any given major collection.
This begs some troublesome questions for quantitative approaches to art history:

- Should paintings "count" more than prints because they are generally more expensive? (Though exceptional prints like Rembrandt's [*Hundred Guilder Print*](http://en.wikipedia.org/wiki/Hundred_Guilder_Print) could go for more than mid-to-low-end paintings.)
- Should prints be given more weight as the many impressions of a given print may have been seen by more people than a single painting? (Unless, of course, the painting was large and publicly displayed.)
- Should print series be counted as one artwork?

Whether you are trying to figure out "what people made" (artist intentions) versus "what people saw" (contemporary reception) may influence the answers to these questions.

[^cleaned]: As I mentioned earlier, the collection data I count here has been stripped of artworks that lack either a date or an Iconclass tag.

While I do not yet have rigorous answers for these questions, it is interesting to approach this problem of media from the perspective of iconography.
In my previous posts I have charted various iconographic trends over time, looking for correlations with major historic events, or even correlations with trends of related iconographic categories.
But what about correlations between iconographic trends across different media?

<figure>
<a href="/assets/images-display/war_media.svg"><img src="/assets/images-display/war_media.svg" alt="Contrasted ratios of all prints related to warfare to ratios of all paintings related to warfare." /></a>
<figcaption>Contrasted ratios of all prints related to warfare to ratios of all paintings related to warfare.</figcaption>
</figure>

Here I have calculated two trends (like last time, smoothed with a 20-year moving average): the ratio of prints with war imagery compared to total numbers of prints, and the ratio of paintings with that imagery to the total number of paintings.
(Note that the trendline for paintings in this chart is much more "blocky" than for the prints simply because it is built off of far fewer data points than the trendline for prints.)
Looking at our first example, images of warfare (Iconclass code `45`), trends in prints versus trends in paintings seem roughly correlated, with paintings lagging behind by a few years.
This makes a certain amount of sense -- prints can be made quickly in reaction to events.
While paintings can also be made relatively quickly, the more permanent and monumental nature of the medium may demand content with a longer shelf-life.
You would not use a painting to report on a battle, but you might use it to memorialize one several years later.

<figure>
<a href="/assets/images-display/bible_media.svg"><img src="/assets/images-display/bible_media.svg" alt="Contrasted ratios of prints with biblical subject matter to ratios of paintings with biblical subject matter." /></a>
<figcaption>Contrasted ratios of all prints with religious subject matter to ratios of all paintings with religious subject matter.</figcaption>
</figure>

Different patterns appear between prints and paintings after Biblical subjects.
Biblical prints appear to surge around 1500, and then again in the 1550s.
Biblical paintings also have two surges, one in the 1520s and another in the 1620s.
This is not quite the same "lag-time" that seems to occur in the war iconography trends.
It is interesting to note that the first sudden drop in biblical *prints* comes in the years after the outbreak of the Protestant reformation, and experiences another uptick with the start of the Catholic Counter-Reformation, after which biblical prints decline until they are only a small minority of the prints being made through the seventeenth century.
It seems likely that this historical context may explain some or most of this observed rise and fall. 

But is it significant that the ratio of biblical *paintings* appears to increase shortly after each of these drops?
It is revealing to look at the [list of biblical paintings from 1600 to 1660](/assets/docs/biblical-paintings.html) that actually comprise the latter of these upward swings.
About half of these artworks are by artists in the orbit of Rembrandt, who, along with his teacher Pieter Lastman, produced a remarkable variety of biblical scenes over his career.
The "surge" in this chart is thus, in large part, due to the reverberating effects of Lastman's and Rembrandt's art as reflected in the Rijksmuseum collection, a contribution to Dutch art history that stands out all the more now seen in a semi-macroscopic context
As [Tim Hitchcock has compellingly illustrated][hitchcock], even in a sea of numbers we need not loose sight of the power of individual actors.

Yet before we inadvertently begin to reinforce a kind of ["Great Man theory"](http://en.wikipedia.org/wiki/Great_man_theory) of art history, we should try to put into perspective the larger importance of this phase in Dutch visual culture.
Remember that this trend shows the ratio of biblical paintings to all other *paintings*.
On a chart showing the ratio of biblical paintings to all other artworks of any type, the paintings are so outnumbered that their trendline is barely even visible:

<figure>
<a href="/assets/images-display/bible_paintings_media.svg"><img src="/assets/images-display/bible_paintings_media.svg" alt="Directly comparing the trends in bibilical iconography of all artworks to that in paintings." /></a>
<figcaption>Directly comparing the trends in biblical iconography in all artworks to that in paintings.</figcaption>
</figure>

By the numbers alone, paintings barely register.
So where does this leave us with the problem of media?

In some ways, this simple quantitative visualization totally fails at telling us much about the contours of Dutch art history.
Paintings were, of course, extremely important.
There were far more than 27 biblical paintings done in the Netherlands in the years between 1600 and 1660.
Most of them were not done by the likes of Lastman, Rembrandt, or Lievens.
In fact, as [Angela Jager is discovering](/2013/10/30/sixteenth-century.html), the lowest-tier, often-anonymous painters (ones emphatically *not* held by the Rijksmuseum) seem to have most specialized in these figural scenes.
And as pointed out earlier, for all the things that these formats shared, paintings and prints could have wildly divergent functions, and demanded different modes of viewing that complicate any attempt to reduce "influence" to a game of relative quantities.
In short, it is misleading to try counting prints and paintings in exactly the same way, especially when counting out of a single repository of artworks.

Ok Matt, you ask, surely you knew all this going in?
Well, yes, certainly.

What is particularly exciting to me is the way in which these visualizations are usefully provocative, often precisely at the point when they appear to "fail".
Art historians frequently discuss the relationship of artistic trends to the larger historical contexts of those trends, but usually we limit these discussions to relatively soft definitions of "influence" and its effects.
When we actually chart out what might reasonably one measure of this influence -- the ratio of artworks each year that feature given sets of content matter -- we have seen there are both expected and unexpected results that complicate a simplistic definition of influence.
To chart out the relationship between, say, military history or economic history and art of the period, forces us to confront assumptions about which particular events actually had an impact on iconography, and what the size of that impact was relative to other events.
We similarly grapple with the relationship between trends in prints and trends in painting.
If we can't directly compare absolute numbers of prints and paintings as a measure of the influence of an artwork and its iconography, nor can we absolutely dismiss the massive numerical difference between these media in trying to come to terms with a macroscopic view of art history.

This first pass at iconographic charting has left me with several promising avenues of inquiry to test against larger data sets.
Knowing if this or similar trends will appear in a larger set of data (such as that maintained by the [RKD](www.rkd.nl)), or whether these are just eccentricities of the particular collections at the Rijksmuseum, is vital if we are to draw any larger art historical conclusions from these data.
This particular question of the relationship between Dutch print culture and the world of painting is one I hope to explore in my dissertation through this kind of quantitative analysis, as well as through other methods like exploring the networks of print publishers and their relationships with painters, engravers, and etchers.


The discipline demanded by these methods is sorely needed in art history.
Any outside reader would be shocked at how often assertive declarations about overarching trends in either styles or iconography appear in art historical literature with nary a footnote, relying entirely on implicit claims to the author's authority and experience.
Attempting to chart out aspects of this relationship quantitatively does not bind us into a one-dimensional method of reading artistic history, but it does force us to better define the nature of "influence", and to better articulate how we intend (even if only partially and problematically) to measure its existence.




[hitchcock]: http://historyonics.blogspot.com/2013/12/big-data-for-dead-people-digital.html
