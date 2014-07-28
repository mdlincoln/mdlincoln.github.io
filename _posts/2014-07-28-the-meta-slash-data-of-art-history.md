---
layout: post
comments: true
title: "The Meta/Data of Art History"
date: 2014-07-28 08:13
tags: 
- Digital Humanities
- LAM
---

Any one who is interested in generating and analyzing cultural heritage object data should take a look at the [position paper][oldman] by the Special Interest Group for the CIDOC Conceptual Reference Model (CIDOC CRM) in the latest edition of *D-Lib Magazine*.[^1]

Their paper discusses the reasoning behind the CIDOC CRM in great detail.
In brief, they wish to replace relatively static models for describing cultural objects with a common set of core fields for "date created", "artist", "location", and the like.
The CIDOC CRM aspires to a more flexible model that instead conceives of an object's contextual information as a varied set of "interrelated events and activities connected to hierarchies of part-whole relationships of things, events and people, and things subject to chains of derivation and modification."
One of the more prominent implementations of this model is the [British Museum Semantic Web Collection Online][bmlod].

The authors point out that the term we use to refer to all this contextual information is a loaded one:

>The utterly unlucky choice of the term 'metadata', for cultural data, assuming that the material cultural object is the real 'data', actually degrades curatorial knowledge to an auxiliary retrieval function without scientific merit, as if one could 'read out' all curatorial knowledge just by contemplating the object, in analogy to reading a book.

This question of what counts as "data" or "metadata" puts me in mind of the *Arcade* colloquy ["What is Data in Literary Studies?"][arcade] from January of this year.
While the authors don't touch on this issue specifically, I do think the question bears asking.

What is data, then, in art history?

The authors of the CIDOC paper are correct to note that the distinction between "data" and "metadata" is blurry, and possibly even specious.[^3]
Yet it is nevertheless true that while we have made great progress in creating data models to represent an artwork's *non-visual* information, we still struggle to establish useful and reusable models for the *visual* aspects of artworks, whether these be formal or symbolic/iconographic properties.

I believe that "digital art history" must recognize that some of its roots can be found in the long, discipline-wide history of creating vocabularies and ontologies for visual classification.
I am thinking of [ICONCLASS], yes, but also looking back even farther: to Aby Warburg, Heinrich Wölfflin, Alois Riegl, and many others who have grappled with this question of formal and symbolic typologies in art --- a kind of digital art history *avant la lettre*.[^2]

A successful digital art history will have to reckon with these past attempts, trying to understand the nature of their successes as much as with their more numerous failures.
This will be a vital prerequisite to thoughtfully bridging the gap between the visual typologies art historians are accustomed to, and the image components and properties best recognized and measured by algorithmic image analysis.

[^2]: For more on ICONCLASS, see my [previous post](/2013/09/18/iconclass-and-charting-the-rijksmuseum.html) on the Rijksmuseum's use of the iconography classification system.

[ICONCLASS]: http://iconclass.org/

[oldman]: http://www.dlib.org/dlib/july14/oldman/07oldman.html

[^1]: Dominic Oldman et al., “Realizing Lessons of the Last 20 Years: A Manifesto for Data Provisioning and Aggregation Services for the Digital Humanities (A Position Paper),” *D-Lib Magazine* 20, no. 7/8 (July 2014), [doi:10.1045/july2014-oldman](http://dx.doi.org/doi:10.1045/july2014-oldman).

[bmlod]: http://collection.britishmuseum.org/

[arcade]: http://arcade.stanford.edu/content/what-data-literary-studies-1

[^3]: They may not be alone in this: "Someone just said &quot;I don&#39;t believe in the distinction between data and metadata&quot; and the entire room snapped to attention. <a href="https://twitter.com/hashtag/ChathamHouseRule?src=hash">#ChathamHouseRule</a> &mdash; John Overholt (@john_overholt) <a href="https://twitter.com/john_overholt/statuses/491574522110545920">July 22, 2014</a>
