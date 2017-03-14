---
layout: post
comments: true
title: "The Changing Shape of Dutch Paintings in the NGA"
date: 2014-05-15 12:00
tags:
- LAM
- Visualization
- Art History
---

My advisor, Arthur Wheelock, [celebrates his 40th year of teaching][celebration] at the University of Maryland this Saturday.
This comes just a few weeks after he and his team at the National Gallery of art released the second edition of the systematic catalog of the [Dutch paintings of the seventeenth century][oed].
This is the first born-digital collection catalog published by the Gallery, and the architects have done a wonderful job interlinking catalog texts and figures.
For example, the image viewer for Vermeer's [*Girl with the Red Hat*][vermeer] has a very useful feature that allows you to pan and zoom the artwork under visible light and x-radiography simultaneously.

For all the well-justified fanfare about the switch to a web-based publication, it is the new content that many (at least, many in the field of Dutch art history) may find even more valuable.
Arthur has pointed out on several occasions that the first edition of the syscat was already out-of-date when it was published in 1995.
That edition did not include any information about the Gallery's landmark 1995--96 Vermeer exhibition.
Nor did it discuss the newly-constructed cabinet galleries --- a series of smaller-scale rooms that allow a more intimate interaction with the many small, gem-like paintings in the collection.

One of the unique joys of studying with Arthur has been the chance to understand his perspective on the ever-shifting nature of artistic taste.
In a lively [introductory essay on the history of the Dutch collection][collhist], Arthur describes the impact that Andrew W. Mellon's and P.A.B Widener's understanding of Dutch art had on the early shape of the Gallery's Dutch collections.
These two founding collectors saw Dutch art through a period eye; one strongly influenced by nineteenth-century British taste and collecting habits.
It was from British and Continental nobility, after all, that American magnates amassed so much of their Old Master collections in the early twentieth century.
This taste favored Rembrandt, Hals, Vermeer, and Hobbema.
It generally did *not* include still life paintings, Caravaggesque works, classicizing subjects, or any of the myriad other modes of seventeenth-century Dutch painting that had fallen out of favor by the late nineteenth century.
Much of Arthur's work on behalf of the Gallery has involved filling these lacunae.

The online edition of the Dutch syscat offers a nice opportunity to quantitatively explore this evolution.
I composed [several scripts][ngagit] to harvest object information from the online edition and plot it.

It is remarkable to compare the core Mellon and Widener collections with those sets of paintings acquired by later curators.
The core paintings cover a remarkably narrow period of time, less than fifty years of the Dutch "Golden Age".
Even the paintings acquired between Widener's bequest and Arthur's arrival remain largely within that historical range.
The works acquired after Arthur joined the gallery, however, cover a far wider range of dates.
Arthur has also filled out holdings of certain genres, especially still lifes and seascapes, that did not interest Mellon and Widener.

{% include figure.html src=" src="/assets/images/nga_date_plot.svg"></a>" caption="Compare the creation dates of artworks entering the gallery in different eras. 95% of the Mellon and Widener collections (marked by the vertical range labeled "Core") fall between the late 1630s and 1670, while 95% of paintings entering the gallery under Wheelock's tenure cover a much wider range." %}

{% include figure.html src="/assets/images/nga_genres.svg" caption="Breaking down the collection by genre clearly demonstrates the preferences and preconceptions that Mellon and Widener held about the nature of Dutch art." %}

While I'd generally understood that the later additions to the Gallery's Dutch paintings were more diverse in date and genre, I had never realized there were patterns in something as basic as *scale*.
In plotting the paintings by their height and width, it becomes clear how much Mellon preferred paintings of a certain orientation, and a relatively small range of sizes.
Notably, the one of the few outliers on Mellon's plot is the aforementioned [*Girl with the Red Hat*][vermeer].
Apparently, not even Andrew Mellon could pass on a painting for being too small if it had been done by Vermeer.[^small]

{% include figure.html src="/assets/images/nga_sizes.svg" caption="Even the physical size of paintings can be a matter of taste. Mellon's Dutch collections tended towards similar sizes, and were largely oriented as landscapes. Widener's collection had more diversity of scale, and his core collection of small pieces served as a foundation for Wheelock's many additions that now fill the suitably-scaled cabinet galleries." %}

There are [almost a dozen recent acquisitions][recent] still awaiting full entries.
When they are posted, you can update these plots yourself by [downloading the web-scraping and visualization code here][ngagit].

[recent]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings/recent-acquisitions-dutch-paintings-17th.html

[vermeer]: http://purl.org/nga/collection/artobject/60

[collhist]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings/essay-history-dutch-paintings-nga.html

[oed]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings.html

[celebration]: http://arthistory.umd.edu/department-celebrate-professor-arthur-k-wheelock-jr-daylong-symposium-saturday-may-17th

[ngagit]: https://github.com/mdlincoln/nga_dutch_collections

[^small]: Interestingly, the small scale of this panel has caused some to cast doubt on its attribution. [It is not the only small work in the painter's oeuvre, however.](http://www.essentialvermeer.com/vermeer_in_scale_one.html)
