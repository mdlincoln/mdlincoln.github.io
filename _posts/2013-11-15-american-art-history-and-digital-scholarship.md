---
layout: post
comments: true
title: "American Art History and Digital Scholarship: New Avenues of Exploration"
date: 2013-11-15 09:43:20.943466
tags:
- Digital Humanities
- Art History
---

Here are some live notes from the Smithsonian Institution Archives of American Art symposium ["American Art History and Digital Scholarship: New Avenues of Exploration"](http://www.aaa.si.edu/symposium).

There is also a *very* active Twitter stream under the hashtag [#AAHDS](https://twitter.com/search?q=aahds)

(I'll note they have a very neat idea to have people sign up on large categorical posters ("Digital Pedagogy", "Data Mining" etc.) as a way to find lunch partners, and also a way to kick off a longer digital conversation.)

# Mapping Images

## Photogrammar

[Laura Wexler](https://twitter.com/laura_wexler) and [Lauren Tilton](https://twitter.com/NOLauren) presented their [Photogrammar] project that maps the locations of thousands of photographs taken during the Great Depression by the [Farm Security Administration][fsa]. Though the conventional wisdom is that FSA photos focused on the south and the dustbowl region, a national map of the actual photograph locations immediately challenged this assumption, presenting quite a different, diversified picture of where photographs were taken.. In Laura WExler's thoughtful words, the FSA project was not a document, but a *simulacrum* of the U.S. -- a representation without an "authentic" original.

<figure>
<img src="/assets/images-display/photogrammar.png" alt="photogrammar project" />
<figcaption>The Yale <a href="http://photogrammar.yale.edu">Photogrammar</a> project map</figcaption>
</figure>

[Photogrammar]: http://photogrammar.yale.edu

[fsa]: http://www.loc.gov/pictures/collection/fsa/

Particularly exciting was when Laura Tilton started giving us a tour thought the map and started tracking individual photographers as they moved across the country. Also interesting was confronting the legacy classification tag system that comes with these photos. Intriguingly, different shots of the same scene could be sorted into completely different categories: a portrait-like image of a man is tagged "People as Such -- Middle-aged man", but an image of the *very same person* playing the piano becomes "Entertainment" -- how telling that formal, compositional changes can change completely our perception of the *content* of those images.

## Schematizing Landscape with the Inventory of American Paintings

[David Sledge](https://twitter.com/djsledge__) ([Williams College](https://williams.edu) represent!) wanted to see how he could use new tools and techniques to better contextualize images of American landscapes. 
He used the [Inventory of American Paintings](iap) compiled by the Smithsonian as a massive database of American landscape painting writ large.

David was particularly interested in understanding what locations American artists depicted. 
By mining the metadata of the IAP, he could draw out interesting trends in the numbers of artists painting particular subjects at any one time, with results that served as an invitation to new research.
For example, if New York was the most-painted city in American landscapes, why was Venice, Italy the second-most-painted? 
And if this surprises us (as it seemed to do for many in the auditorium), what does this say about lacunae in American art scholarship, about the assumptions that scholars have made about the grand narratives of American landscape painting?
He ended with a call for museums to release their databases not just in web forms designed for single-record lookup, but in raw forms that allow utterly different kinds of processing.

[iap]: http://americanart.si.edu/research/programs/inventory/

## Computational Analysis of Andy Warhol's Flowers

Marian Mazzone and Thomas Brady tried to apply computer image processing techniques in order to look at Andy Warhol.
For an art historian not interested in attribution questions or in differentiating style (as Marian says aptly, "I don't need a computer to do that for me, I can use my eyes"), what can computer vision give to us?
She turned to Warhol's flower series in part because there was a large body of materials (paintings as well as prints) to process, and since the images are based off of a single photograph, the differences between images can be more easily schematized and abstracted. 

Since computers are not yet useful for thinking about "style", Marian decided to simplify and ask basic schematic visual questions like "color". 
She wondered if we could detect patterns of changing artistic choices (e.g. color, rotation, scale) over a long series of works? 
Thomas Brady, a computer science undergraduate who partnered with her on this project, discussed how they got the computer to quickly record the flower colors of all the series images. 
Using this information, they were able to start counting up images with certain characteristics (flower size, flower color.) 
Though Marian and Thomas had not yet drawn conclusions from these data, they hope to combine this information with a network analysis of the movement of these images between galleries and collectors to see if any correlation can be found between formal properties and the exchange and distribution of these artworks.

# Networks and Contexts

## Visualizing Schneemann

[Michelle Moravec](https://twitter.com/professmoravec) discussed Carolee Schneemann through the lens of of the Schneemann correspondence digitized by the Getty.
Through a blizzard of visualizations (perhaps too many too fast?) */[ed: wonderfully, she's [shared her slides here](http://t.co/0rNOQwhzzG)/]* Michelle explored the balance of male to female correspondents of Schneeman, derived from Named Entity Recognition algorithms.
She also wanted to see Schneemann's use of the past -- literally, the word "past" -- in her correspondence.

[Melissa Rogers](melissarogers17) (UMD what what!) was curious about Schneemann's "mail art" and its interaction with her other performances, films, and assemblages.
She wanted to see if she could map out the mail art geographically.
A good part of her talk was actually discussing her own trials and travails working with [Omeka](http://omeka.org) and [Neatline](http://neatline.org) to do so.
She laid out her project for mapping Schneemann, and walked through the questions that she as a graduate student must confront when embarking on this kind of digital project.
Sadly, Melissa didn't have any actual map examples to show yet -- hopefully she will put it out there when she does!

## Docuemnting the Postwar Audience for American Avant-Garde Art

When introducing her approach to researching American avant-garde art, Titia Hulst invoked the work of John Michael Montias, an economic historian who looked at the seventeenth-century Dutch art market on a large scale.
Her project traverses and attempts to re-map the (rather rocky) territory of the history of exhibitions of American avant-garde art.
She discovered that her initial subject -- the gallerist Leo Castelli -- was quite the unreliable source, whose own claims and writings have distorted the literature on this market history.

In order to evaluate these claims, Titia says she had to become an "accidental" digital historian through using [AAA]-digitized invoices.
She created her own table of more than 20,000 transactions from these and other files.
Interestingly, she compared the trends in her data to historic GDP trends, in order to discern trends in taste for particular artists (not just the overall trend in art buying writ large.)
From this, she was able to compare the character of galleries collections (diversification of artists held) as well as their market share across US cities.

Titia also mapped the locations of *purchasers* from different gallerists.
The results run counter to Castelli's own story -- that he was promoting avant-garde art in places no one else did.
Rather, it seems he didn't sell anywhere other gallerists weren't already selling.

She wanted to grapple with the question of "taste" -- not style, embedded in the artwork, but the reasons why collectors wanted certain artworks.
Categorizing by these categories of "taste" (e.g. "cool" abstraction, "expressive" abstraction, "fantasy", etc.), it seems Castelli sold far more figurative work than he claims in his own narratives.

Finally, and most interestingly, she used network analysis to see which collectors bought from multiple gallerists -- early on, it was only museums doing this.
Moreover, Castelli had a tighter network than anyone else, suggesting his own very different practice from other gallerists.

[AAA]: http://www.aaa.si.edu

## The Warhol Timeweb

Jessica Gogan and Tresa Varner from the Any Warhol Museum presented their [Timeweb](http://warhol.gradientlabs.com/) platform for exploring the cultural context of Warhol's artworks, which I think is better seen than read about, so go visit it!
I did particularly like that they considered museum technology from an education standpoint -- the Warhol museum wants to make sure it uses tech to the utmost, but that it gives visitors a "break" from the technology and its noise when they are looking at the art itself.

<aside>
<p>Lunch is over, so the live blog will start again!</p>
</aside>

# Curating Online

# Publishing Online
