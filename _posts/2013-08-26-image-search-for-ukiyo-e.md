---
layout: post
comments: true
title: Image Search for Ukiyo-e
date: 2013-08-26 09:45:24.055094
tags:
- Art History
- Digital Humanities
---

John Resig, lead developer of [jQuery](http://jquery.com/) (!) happens to be an avid *ukiyo-e* print collector. Lucky for us, because he has been putting his considerable programming skills to work developing a [database of *ukiyo-e* prints](http://ukiyo-e.org/) that you can search by *uploading a digital image of a print*, with the service returning prints from dozens of different museums and dealers that match yours.

I tried it out with a Hiroshige print that we had discussed last spring in a graduate seminar on continuity and change in the Japanese visual arts by Drs. [Yui Suzuki](http://arthistory.umd.edu/faculty/Yui%20Suzuki) and [Alicia Volk](http://arthistory.umd.edu/faculty/Alicia%20Volk). 

[![Hiroshige Vesper Bell at Mii Temple, 1835, Metropolitan Museum of Art](/assets/images-display/hiroshige_biwa.png)](http://data.ukiyo-e.org/met/images/DP122119.jpg)

This version of *Vesper Bell at Mii Temple, Lake Biwa* (from the series *Eight Views of Omi Province*, ca. 1835) came from the Metropolitan Museum of Art. When I uploaded a JPEG of this image to Resig's site, it delivered a pitch-perfect list of "close" images matches (you can see the results at [this permalink](http://ukiyo-e.org/upload/470c7ce9dba9182448ff83464786e7f2)) including prints of all quality levels, variously cropped, even black and white reproductions.

This technique represents a welcome paradigm shift for any scholars of print culture. I butted heads with the current frustrating search methods for variations on different prints as I was writing my [MA thesis on Hendrick Goltzius' print designs in the 1580s](http://hdl.handle.net/1903/12861). Authors and publishers have developed a broad swath of bibliographic technologies to handle "image searching" within printed books such as the [Bartsch catalogs](http://www.artstor.org/what-is-artstor/w-html/col-illustr-bartsch.shtml) of Old Master prints. Books like these will be indexed by artist (which only helps if you know who the artist is in the first place); by genre (often frustratingly broad); or by date (again, broad and limited in its usefulness). Several attempts have also been made to create keyword authorities - standardized lists of terms (say, "boat" or "quill") you can attach to entries to create useful cross-references between images. These include the [Getty Vocabularies](http://www.getty.edu/research/tools/vocabularies/) and [Iconclass](http://iconclass.nl/home), the latter a particularly inventive way for describing iconography through a multi-character notation that gets progressively more specific (e.g., `92G2: Nemesis (Adrastea)` is a specification descended from `9: Classical Mythology and Ancient history`, `92: gods ~ classical mythology`, and `92G: lesser divinities of Heaven ~ destiny, fate, adversity`)

All these methods rely on a mediating textual layer. We don't have an established method to lay out a book by categories of visual form[^1], but because we do have methods for organizing the *names* of forms (hooray for alphebetization!) we can just try our best to translate this visual data into more-easily-sorted textual data. The drawbacks are legion, however. These systems demand hours and hours of expert labor to structure, requiring institutional support to put in place, not to mention inter-institutional agreement if any one schema is going to be applied, say, to a dozen different museum collections instead of just one.

[^1]: One exception: [Chinese character dictionaries](http://en.wikipedia.org/wiki/Chinese_dictionary#Graphically_organized_dictionaries). But even there, visual form is at least somewhat standardized through recurring radicals.

But recent computer vision algorithms able to judge rough similarity (rather than pixel-perfect similarity) between two images can change all of this. A great deal of the evidence we use in art historical arguments is based on recognizing and explaining the transmission visual motifs and characteristics. I imagine that harnessing computer vision algorithms to *find* potential similarities between previously unassociated artworks would enrich the work of art historians interested in explaining *how* and *why* these similarities exist. I would be fascinated to see how we could use these algorithms in conjunction with the [ever-increasing number of open-access image respositories](http://localhost:4000/2013/08/20/getty-open-content.html) being set up by major museums. Combine, say, the holdings of the Rijksmusem's and National Gallery of Art's print rooms, and you'll be well on your way to building European Old Master edition of Resig's inspired utility.
