---
layout: post
comments: true
title: '"Doing the Season": Historic Art Sale Calendars'
date: 2014-03-17 11:30
tags: 
- Digital Humanities
- Art History
---

After working on visualizing the Getty's [Art & Architecture Thesaurus][aat] the other week, I decided to poke around some of the other data resources that the Getty has to offer.
The GRI hosts a vast trove of [provenance documents][provenance].
Coincidentally, one of the only computationally-focused panels on the [CAA2015 CFP][cfp] (PDF) just released last week calls for scholarship on historic art prices.
So just how well does the Getty's own data support these kinds of inquiries?

Though their web interface is rather sluggish and balks at some larger queries, you can download a rather rich CSV of search results.
Considering the heterogeneity of their sources, the Getty data are not too badly formatted.
That said, this is hardly a data table you can drop into R and start plotting.
Numeric values like prices, dimensions, and sale dates are buried within irregular text strings.

As a preliminary project, I decided to tackle sales dates.
Using Hadley Wickham's [lubridate] package for R, it was quick work to parse the sale date fields in a table of a little over 150,000 historic sales from [Christie's] (by far the most well-represented auction house in the Getty's digitized sale catalogs.)

Christie's was founded in 1766, and the lion's share of the Getty's historic records for the house span from 1780 to 1840:

<figure>
<a href="/assets/images/sales_by_year.svg"><img src="/assets/images/sales_by_year.svg" alt="sales by year" /></a>
<figcaption>Generated from data provided by the Getty Provenance Index® databases. J. Paul Getty Trust.</figcaption>
</figure>

Grouping these sales by month reveals two distinct seasons: a long spring auction season kicking off in March and spanning into mid-summer, followed by a smaller season in November and December:

<figure>
<a href="/assets/images/sales_by_month.svg"><img src="/assets/images/sales_by_month.svg" alt="sales by month" /></a>
<figcaption>Generated from data provided by the Getty Provenance Index® databases. J. Paul Getty Trust.</figcaption>
</figure>

That the auction calendar cycles between these two poles is not that surprising.
Even today, art market reporters [start getting breathless](http://www.artnews.com/2010/06/01/spring-art-auctions-confidence-is-back/) with the start of the spring season, vamping up again at the end of the year in [anticipation of November sales](http://www.artnet.com/insights/art-market-trends/auction-market-leading-up-to-november-2013-sales.asp).

What I found remarkable was how far back this seasonal tradition dates.
Below you can see the same records grouped by month and faceted by decade:

<figure>
<a href="/assets/images/faceted_sales_by_month.svg"><img src="/assets/images/faceted_sales_by_month.svg" alt="faceted sales by month" /></a>
<figcaption>Generated from data provided by the Getty Provenance Index® databases. J. Paul Getty Trust.</figcaption>
</figure>

Even the earliest sales in the late eighteenth century follow this general structure, although over the course of the century the peak auction season appears to fall later and later in the year, shifting from March to June.
This calendar was almost certainly defined by the ["London Season"](http://www.literary-liaisons.com/article024.html), the annual period that evolved in the 18th and 19th centuries during which the British aristocracy shifted from their country estates to their London town mansions to participate in a variety of social events.
The dates of the season ostensibly coincided with Parliament's sessions, though in practice it was linked to exhibitions at the Royal Academy of Art and key sporting events such as the Derby.

Far from being a specialist in eighteenth- and nineteenth-century London social history, I'm curious to what extent the Season defined this calendar, and to what extent the growth of auctions helped to re-define the Season itself.
Was it the changing habits of the London Season that motivated the shift of peak auction season deeper into the summer?
How much of our modern-day auction patterns are still defined by this centuries-old social calendar?

[Download the code to reproduce these plots here.][code]

[code]: https://github.com/mdlincoln/getty_christies_sales
[Christie's]: http://www.christies.com/about-us/company/overview/
[lubridate]: https://github.com/hadley/lubridate
[aat]: http://matthewlincoln.net/2014/02/21/hierarchies-of-the-getty.html
[provenance]: http://www.getty.edu/research/tools/provenance/search.html
[cfp]: http://www.collegeart.org/pdf/2015CallforParticipation.pdf
