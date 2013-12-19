---
layout: post
comments: true
title: "Charting the Rijksmuseum: The Problem of Media"
date: 2013-11-14 10:29:12.583003
tags:
- Art History
- Digital Humanities
- Museums
- Code
---

{% include rkm.html %}


This final (much delayed) post is brief, really just a post-script to the ideas I've already laid out in the first two posts.

All of the graphs I have made for this project are generated from collection-wide trends.
I did not discriminate between different types of artworks like paintings, prints, photographs, sculpture, or furniture.
This begs the question, what exactly are the ratios of different artworks at the Rijksmuseum?

<figure>
<img src="/assets/images-display/artwork_types.svg" alt="Ratios of artwork types in the Rijksmuseum" />
<figcaption>Ratios of major artwork types in the Rijksmuseum's online database.</figcaption>
</figure>

Printed artworks (woodcuts, engravings, etchings, lithographs, and the like) *vastly* outnumber works of any other format.
Paintings clock in at less than 1% of the Rijksmuseum's online collection.
This should not be too surprising.
Prints are (generally) faster to produce than paintings, easily reproduced, and are often produced as part of a series.
This quickly pushes up their absolute numbers in any given major collection.
This begs some difficult questions for quantitative approaches to art history:

- Should paintings "count" more than prints because they are generally more expensive? (Though exceptional prints like Rembrandt's [*Hundred Guilder Print*](http://en.wikipedia.org/wiki/Hundred_Guilder_Print) could go for more than mid-to-low-end paintings.)
- Should prints be given more weight as the many impressions of a given print may have been seen by more people than a single painting? (Unless, of course, the painting was large and publicly displayed.)
- Should print series be counted as one artwork?
- What about multiple impressions of a single print?

Whether you are trying to figure out "what people made" (artist intentions) versus "what people saw" (contemporary reception) may influence the answers to these questions.

While I do not have rigorous answers for these questions, it is interesting to approach this problem of media from the perspective of iconography.
In my previous posts I have been charting various iconographic trends over time looking for correlations with major historic events, or even correlations with trends of related iconographic categories.
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
You would not use a painting to report on a battle, but you might use it to memorialize one several years laster.

<figure>
<a href="/assets/images-display/bible_media.svg"><img src="/assets/images-display/bible_media.svg" alt="Contrasted ratios of prints with biblical subject matter to ratios of paintings with biblical subject matter." /></a>
<figcaption>Contrasted ratios of all prints with religious subject matter to ratios of all paintings with religious subject matter.</figcaption>
</figure>

Different patterns appear between prints and paintings after Biblical subjects.
Biblical prints appear to surge around 1500, and then again in the 1550s.
Biblical paintings also have two surges, one in the 1520s and another in the 1620s.
This is not quite the same "lag-time" that seems to occur in the war iconography trends.
It is interesting to note that the first sudden drop in biblical prints comes in the years after the outbreak of the Protestant reformation, and experiences another uptick with the start of the Catholic Counter-Reformation, after which biblical prints decline until they are only a small minority of the prints being made through the seventeenth century.
But is it significant that the ratio of biblical *paintings* appears to increase shortly after each of these drops?

Looking at the [list biblical paintings from 1600 to 1660](/assets/docs/biblical-paintings.html) that actually comprise one of these upward swings is revealing.
About half of these artworks are by artists in the orbit of Rembrandt, who, along with his teacher Pieter Lastman, produced a remarkable variety of biblical scenes over his career. 
The "surge" in this chart is, in large part, the reverberating effects of Lastman's and Rembrandt's art.

Knowing whether this or similar trends will appear in a larger set of data (such as that maintained by the [RKD](www.rkd.nl)), or whether it is just an eccentricity of the particular collections at the Rijksmuseum, is vital if we are to draw any larger art historical conclusions from these data.
All that being said, these data 

[hitchcock]: http://historyonics.blogspot.com/2013/12/big-data-for-dead-people-digital.html
