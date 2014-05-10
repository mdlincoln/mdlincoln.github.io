---
layout: post
comments: true
title: "The Changing Shape of Dutch Paintings in the NGA"
date: 2014-05-08 16:04
tags:
- Museums
- Visualization
- Art History
---

My advisor, Arthur Wheelock, [celebrates his 40th year of teaching][celebration] at the University of Maryland this Saturday.
This comes just a few short weeks after he and his team at the National Gallery of art released the second edition of the systematic catalog of the [Dutch paintings of the seventeenth century][oed].
This is the first born-digital collection catalog published by the Gallery, and the architects have done a wonderful job in creating an interface that presents texts with its interlinked images as well as I've seen it done to date.
(Be sure to check out the image viewer for Vermeer's [*Girl with the Red Hat*][vermeer], which, along with a host of other works in the catalog, has a very useful feature that allows you to pan and zoom the artwork under visible light and x-radiography simultaneously.)

For all the well-justified fanfare about the switch to a web-based publication, it is the new content that many (at least, many in the field of Dutch art history) may find even more valuable.
Arthur has pointed out on several occasions that the first edition of the syscat was already out-of-date when it was published in 1995.
That edition did not include any information about the landmark 1995-96 NGA Vermeer exhibition.
Nor did it discuss the newly-constructed cabinet galleries --- a series of smaller-scale galleries that allow one to have a more intimate reaction with the many small, gem-like paintings in the collection.

One of the unique joys of learning from Arthur has been the chance to understand his perspective on the ever-shifting nature of artistic taste.
In a lively [introductory essay on the history of the Dutch collection][collhist], Arthur describes the impact that Andrew W. Mellon's and P.A.B Widener's understanding of Dutch art had on the early shape of the Gallery's Dutch collections.
These two founding collectors saw Dutch art through a period eye; one strongly influenced by nineteenth-century British taste and collecting habits.
It was from British and Continental nobility, after all, that American magnates amassed so much of their Old Master collections in the early twentieth century.
This taste favored Rembrandt, Hals, Vermeer, and Hobbema.
It generally did *not* include still life paintings, Caravaggesque works, classicizing subjects, or any of the myriad other modes of seventeenth-century Dutch painting that had fallen out of favor by the late nineteenth century.
Much of Arthur's work on behalf of the Gallery has involved filling these lacunae.

The online edition of the Dutch collections syscat offers a nice opportunity to quantitatively explore this evolution.
I composed [several scripts][ngagit] to harvest object information from the online edition and plot it.

It is remarkable to compare the core Mellon and Widener collections with those sets of paintings acquired by later curators.
The core paintings cover a remarkably narrow period of time, less than fifty years of the Dutch Golden age.
Even the paintings acquired between Widener's bequest and Arthur's arrival remain largely within that historical range.
The works acquired after Arthur joined the gallery, however, cover a far wider range of dates.
Arthur has also filled out holdings of certain genres, especially still lifes and seascapes, that did not interest Mellon and Widener, and yet today are some of the most captivating images in the collection.

<figure>
<a href="/assets/images/nga_date_plot.svg"><img src="/assets/images/nga_date_plot.svg"></a>
<figcaption>Compare the creation dates of artworks entering the gallery in different eras. 95% of the Mellon and Widener collections (marked by the vertical range labeled "Core") fall between the late 1630s and 1670, while 95% of paintings entering the gallery under Wheelock's tenure cover a much wider range.</figcaption>
</figure>

<figure>
<a href="/assets/images/nga_genres.svg"><img src="/assets/images/nga_genres.svg"></a>
<figcaption>Breaking down the collection by genre clearly demonstrates the preferences and preconceptions that Mellon and Widener held about the nature of Dutch art.</figcaption>
</figure>

<figure>
<a href="/assets/images/nga_sizes.svg"><img src="/assets/images/nga_sizes.svg"></a>
<figcaption>Even physical size of paintings is a matter of taste. Mellon's Dutch collections tended towards similar sizes, and were largely oriented as landscapes. Widener's collection had more diversity of scale, and his core collection of small pieces served as a foundation for Wheelock's many additions that now fill the suitably-scaled cabinet galleries.</figcaption>
</figure>

[Download the code for scraping and visualizing the collections here.][ngagit]

[recent]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings/recent-acquisitions-dutch-paintings-17th.html

[vermeer]: http://purl.org/nga/collection/artobject/60

[collhist]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings/essay-history-dutch-paintings-nga.html

[oed]: http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings.html

[celebration]: http://arthistory.umd.edu/department-celebrate-professor-arthur-k-wheelock-jr-daylong-symposium-saturday-may-17th

[ngagit]: https://github.com/mdlincoln/nga_dutch_collections
