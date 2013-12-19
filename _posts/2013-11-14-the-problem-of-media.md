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

Let's look at the biblical paintings from 1600 to 1660 that actually comprise this "surge":


<table >
    <tr>
        <th>title</th>
        <th>artist</th>
        <th>date</th>
    </tr>
    <tr>
        <td>Aaron verandert het water van de rivier in bloed</td>
        <td>schilder: Pynas, Jan Symonsz.</td>
        <td>1610</td>
    </tr>
    <tr>
        <td>De aanbidding der koningen</td>
        <td>schilder: Brugghen, Hendrick ter</td>
        <td>1619</td>
    </tr>
    <tr>
        <td>De aartsengel Gabriel verschijnt aan Zacharias</td>
        <td>schilder: Giselaer, Nicolaes de</td>
        <td>1625</td>
    </tr>
    <tr>
        <td>De doornenkroning van Christus</td>
        <td>schilder: Honthorst, Gerard van</td>
        <td>1622</td>
    </tr>
    <tr>
        <td>De ongelovige Tomas</td>
        <td>schilder: Brugghen, Hendrick ter</td>
        <td>1622</td>
    </tr>
    <tr>
        <td>De ongelovige Tomas</td>
        <td>schilder: Crabeth, Wouter Pietersz II</td>
        <td>1626</td>
    </tr>
    <tr>
        <td>De onthoofding van Johannes de Doper</td>
        <td>omgeving van schilder: Rembrandt Harmensz. van Rijn</td>
        <td>1640</td>
    </tr>
    <tr>
        <td>De ontmoeting van Jacob en Ezau</td>
        <td>toegeschreven aan schilder: Pynas, Jacob Symonsz.</td>
        <td>1610</td>
    </tr>
    <tr>
        <td>De verdrijving uit het paradijs</td>
        <td>schilder: Poelenburch, Cornelis van</td>
        <td>1646</td>
    </tr>
    <tr>
        <td>Drie regentessen en de binnenmoeder van het leprozenhuis te Amsterdam</td>
        <td>schilder: Valckert, Werner van den</td>
        <td>1624</td>
    </tr>
    <tr>
        <td>Ecce Homo</td>
        <td>schilder: Stom, Matthias</td>
        <td>1630</td>
    </tr>
    <tr>
        <td>Elia door de raven gevoed</td>
        <td>atelier van schilder: Savery, Roelant</td>
        <td>1634</td>
    </tr>
    <tr>
        <td>Farao's dochter vindt Mozes in het biezen mandje</td>
        <td>schilder: Wtenbrouck, Moyses van</td>
        <td>1625</td>
    </tr>
    <tr>
        <td>Farao's dochter vindt Mozes in het biezen mandje</td>
        <td>schilder: Bor, Paulus</td>
        <td>1635</td>
    </tr>
    <tr>
        <td>Het offer van Abraham</td>
        <td>schilder: Lastman, Pieter</td>
        <td>1612</td>
    </tr>
    <tr>
        <td>Interieur van de Sint Bavokerk te Haarlem, gezien vanuit de zuidelijke kooromgang door het koor en de noordelijke kooromgang met het grote orgel</td>
        <td>schilder: Saenredam, Pieter Jansz.</td>
        <td>1636</td>
    </tr>
    <tr>
        <td>Isaak zegent Jakob</td>
        <td>schilder: Flinck, Govert</td>
        <td>1638</td>
    </tr>
    <tr>
        <td>Jeremia treurend over de verwoesting van Jeruzalem</td>
        <td>schilder: Rembrandt Harmensz. van Rijn</td>
        <td>1630</td>
    </tr>
    <tr>
        <td>Jozef vertelt zijn dromen aan zijn ouders en zijn broers</td>
        <td>schilder: Rembrandt Harmensz. van Rijn</td>
        <td>1633</td>
    </tr>
    <tr>
        <td>Lot en zijn dochters</td>
        <td>schilder: Goltzius, Hendrick</td>
        <td>1616</td>
    </tr>
    <tr>
        <td>Pashur slaat Jeremia in de tempel  ()</td>
        <td>schilder: Bramer, Leonaert</td>
        <td>1648</td>
    </tr>
    <tr>
        <td>Paulus en Barnabas te Lystra door het volk als goden vereerd</td>
        <td>schilder: Pynas, Jacob Symonsz.</td>
        <td>1628</td>
    </tr>
    <tr>
        <td>Salome danst voor Herodes</td>
        <td>schilder: Horions, Hans</td>
        <td>1634</td>
    </tr>
    <tr>
        <td>Schippers met hun boten aan de oever van een Italiaans meer; misschien bedoeld als de vlucht naar Egypte</td>
        <td>schilder: Pijnacker, Adam</td>
        <td>1650</td>
    </tr>
    <tr>
        <td>Simson en Delila</td>
        <td>schilder: Lievens, Jan</td>
        <td>1630</td>
    </tr>
    <tr>
        <td>Tobit en Anna met het bokje  ()</td>
        <td>schilder: Rembrandt Harmensz. van Rijn</td>
        <td>1626</td>
    </tr>
    <tr>
        <td>Vier regenten en de binnenvader van het leprozenhuis te Amsterdam</td>
        <td>schilder: Valckert, Werner van den</td>
        <td>1624</td>
    </tr>
</table>


In fact, this is an interesting example where the chart may partially mislead, suggesting an explicit relationship between biblical prints and paintings that actually elides a more complex art historical reality.

<figure>
<a href="/assets/images-display/material_life_media.svg"><img src="/assets/images-display/material_life_media.svg" alt="Contrasted ratios of all prints with material life subject matter to ratios of all paintings with material life subject matter." /></a>
<figcaption>Contrasted ratios of all prints with material life subject matter to ratios of all paintings with material life subject matter.</figcaption>
</figure>


<blockquote class="twitter-tweet" lang="en"><p>What is the Narrative? Does it rustle a leaf as it passes? Does it dance on the head of a pin? Only through numbers does the Signal whisper.</p>&mdash; Nate Silver 2.0 (@fivethirtynate) <a href="https://twitter.com/fivethirtynate/statuses/264569367570825217">November 3, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

You can bet there's a lot of false noise in these charts.
But art historians ought to start thinking a bit more like him that we have been trained to do so far, so let's at least take the first few steps.
