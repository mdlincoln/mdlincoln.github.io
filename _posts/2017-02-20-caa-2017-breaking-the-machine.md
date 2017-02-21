---
title: "CAA 2017: Breaking the Machine"
layout: post
date: 2017-02-20 18:42:02
tags:
- art history
- academia
- digital humanities
redirect_from:
- CAA2017.html
- caa2017.html
- 2017/02/20/caa-2020-breaking-the-machine.html
aside: "I presented this talk at CAA 2017 in New York on February 17th, 2017. The [data and processing scripts used here can be found on GitHub](https://github.com/mdlincoln/dutchtabletops)."
---

<script async class="speakerdeck-embed" data-slide="1" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

17th c. Dutch still life painting seems to torment us modern viewers into one of two contradictory positions. On the one hand, they can be so conventional as to verge on the banal. Certain motifs - the overturned cup, the half-eaten herring, or the peeled lemon dangling over the edge of the table - appear time and time again, not because of any one particular iconographic intention or visual goal, but because convention demanded it. This visual conventionality, as Lawrence Goedde has so aptly illustrated across several specialized genres, was powerful indeed among 17th c. Dutch artists.

<script async class="speakerdeck-embed" data-slide="3" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

This opens the genre to lampoon in the 21st century, such as in this “Honest Museum Audio Tour” from the New Yorker a few months ago.

All joking aside, the interchangeable similarity of these paintings can frustrate indeed – particularly so in archival inventories, where you are lucky to get anything more than the most terse of descriptions.

<script async class="speakerdeck-embed" data-slide="4" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

But simultaneously, 17th c. Dutch still lives inspire, in some, an intellectual horror vacui – obsessive quests to document, catalog, and atomically explain the presence of all their contents, as Sam Segal has done in his infamous diagrams of floral bouquet pieces.

<script async class="speakerdeck-embed" data-slide="6" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Now, I don’t mean to say that this obsession is unproductive. Indeed, by demonstrating that artists composed bouquets of flowers that, in reality, would never bloom at the same time of the year, we can put to lie the notion that these were transcriptions of reality. Projects like Julie Hochstrasser’s careful documentation of the economic-imperial contexts of the foodstuffs and luxury wares that fill these paintings has opened entirely new interpretive pathways for art historians.

<script async class="speakerdeck-embed" data-slide="7" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

But even as we have more avenues in to understanding Dutch still life than ever, the challenge of situating any one painting within its larger genre remains – and perhaps has even been compounded. Though hardly identitcal, these pieces share more conventions than not. To sift these catalogs of motifs and stylistic solutions presents a challenge to the single art historian.

<script async class="speakerdeck-embed" data-slide="8" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Enter the database. More than a decade ago, collaborator of mine at UMD, Quint Gregory, intricately indexed over 600 paintings for his dissertation on so-called tabletop still lifes by Haarlem-based artists between 1610-1660. His aim was to try to map out a larger context that could track how artists navigated both stylistic and subject matter in this highly conventionalized genre.

<script async class="speakerdeck-embed" data-slide="9" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="10" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="11" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="12" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-slide="13" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

As I mentioned, work by Goedde, Segal, Hochstrasser, and others, have demonstrated both the importance of individual motifs, as well as the perils in interpreting them. It’s for these reasons that Quint developed a context-specific vocabulary of compositional and symbolic/motif variables. Rather than striving for interoperability and so-called objectivity, he instead embraced the intense specificity of a specialist scholar, with all the subjectivity that comes with it.

<script async class="speakerdeck-embed" data-slide="14" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>


A decade later, what I wanted to do is to revisit his database in order to understand how we can compare the aggregate proximities of certain motif and compositional pairings.

Moreover, I was curious as to how well his data actually capture distinctions between the artists in his dataset. Are there certain artists who are more conventional – who are literally more predictable based on the compositional or symbolic attributes of their paintings? Are there certain artists whose known works are comparatively unpredictable based on these attributes – for whom compositional or symbolic conventions – at least as captured in Quint’s vocabulary, are not their defining characteristic?

In the interest of time I’m not going to go into the detailed mechanics of the approach I used, called random forest classification, though I’m very glad to discuss it after the talk with anyone who’s interested. The gist of it is that we give the computer a portion of this database, and it attempts to learn general rules to classify those paintings by artist. We can then evaluate how well it learned by giving it the other half of the data it hasn’t seen, and seeing how well it performs. By giving it just the symbolic variables from this dataset, or just the stylistic ones, can it correctly tell us which artist produced the painting? Remember, our end goal is not a list of attributions. We already know who the artist is – art historians are quite good at doing attributions without resorting to computers – but we want to see how well the computer does, and what that tells us about the artists’ larger oeuvre that can be difficult for us to synthesize form a handful of examples.

<script async class="speakerdeck-embed" data-slide="15" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

In “learning” this dataset, the random forest algorithm must capture many of the overall patterns that appear in these data, including which combinations of variables tend to appear together frequently, and which of those, despite appearing frequently across the entire corpus, rarely appear together. This beautiful Heda, for example, contains many of the motifs common to tabletop still lifes: an extinguished candle, an ornate, overturned tazza, a mince pie, a pile of oyster shells.

These individual features are quite common – but certain combinations of those features are anything but. For example, take oysters here. They appear with a rolled paper of pepper – a pairing that is common both in this corpus of paintings, but also in period recipe books. Oysters’ aphrodisiacal properties were said to be enhanced by pepper – their combination here underlining the erotic quality of this particular dish. (And a note – proximity here has nothing to do with the placement on this canvas, but rather their proximity within an abstract, multidimensional mathematical space in which motifs that appear together in more paintings are “closer” to each other than those that appear less frequently together.)

Another common motif, though – the broken glass – almost never appears with oysters. Even more rare is to pair it with multiple overturned vessels like the silver tazza here. Knowing the comparative exceptionalism of this combination should affect an iconographical reading of this work, moving us beyond the argument that the pairing was motivated by conventionality alone. The uncommon juxtaposition of the vanitas trope of the shattered glass with the earthly, carnal delights of oysters becomes all the more pointed in light of this larger awareness of the corpus.

Furthermore, Heda’s exceptional profusion of shattered and overturned objects – and we can say now that it is, indeed, exceptional – showcases all the more boldly his facility at complex lighting effects and varied materials. Rather than closing off certain interpretive avenues, this approach allows us to see those avenues from a bird’s eye view, more easily drawing out those features of this composition that diverge from the overall conventions of the genre.

<script async class="speakerdeck-embed" data-slide="19" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

So that was a view of the overall corpus and how motifs relate to one another within it, with no attention to the actual authorship of these paintings. But remember that we built the classifier to actually try to make attributions, in order to see for whom it succeeded, and for whom it failed.

This two dimensional plot is showing us where, and how badly, this classifier failed. Along the horizontal axis is error rate based on compositional variables, the vertical axis is error based on motifs. The lower the error, the better a job the classifier did at correctly attributing paintings to the artists that we actually know they were produced by. Up and to the right means more error: the machine slotting more of an artists works into the wrong oeuvre.

<script async class="speakerdeck-embed" data-slide="20" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Now this program actually performed surprisingly well given the incredibly limited amount of properties that this dataset supplied. When looking only at motifs, the model incorrectly attributed Floris van Dijck 2 out of 5 times – but when looking only at compositional variables, it only messed up on 1 out of 6. Floris, in other words, has quite a strong compositional signal – here we may think of his steeply tilted tables, and carefully spaced elements.

<script async class="speakerdeck-embed" data-slide="21" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Others were more predictable by their motifs, such as Pieter Claesz – only 1 out of 6 paintings mis-attributed by the model that knew only at the motif tags that Quint created.

<script async class="speakerdeck-embed" data-slide="22" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

The machine also makes some very human mistakes. Works by Gerrit Heda has commonly been mis-attributed to his father, Willem Claesz Heda. What interested me here is that the random forest model did so as well – but did so specifically based on his compositional styles. It couldn’t tell the difference between Willem Claesz’s compositions as tagged in Quint’s database, versus Gerrit’s.

<script async class="speakerdeck-embed" data-slide="23" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Heda also gets terribly mis-attributed based on motif, but here it’s a more complex story – rather than totally derivative of his father, he instead appears to often synthesize the subject matter patterns deployed by Pieter Claesz. 

<script async class="speakerdeck-embed" data-slide="24" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

It is systematic mistakes that like these that are most revealing. Cornelis Mahu, a minor Flemish painter, was commonly said to look to the Haarlem still life tradition for his forays into the genre. But the direction in which our classifier broke – giving 100% of Mahu’s works to Pieter Claesz – suggests the individual focus of Mahu’s attention on the city. Rather than moving from specificity to generality, as quantitative methods are so often thought to do, in this case we actually move from art historical generalization – oh, he looked IN GENERAL at Haarlem – to a more particularized perspective on where Mahu’s focus really lay.

<script async class="speakerdeck-embed" data-slide="25" data-id="40a1b447a0cd485798eedda4931cd285" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

So why should you care? For one, this work with still life data helps decenter our rather stable methods for looking at still life, troubling the notion of conventionality. but for me it is also about making a kind of intervention in the way that we, as art historians, frame the way we approach data and other structured knowledge.

I hope that you begin to think of data as subjective – and not just from a stance of suspicion, but from one of embrace. Mindfully building a dataset can be a way to articulate our contextual and subjective interpretations of the objects and histories we study. 

I hope that you look to where complex models fail, to better understand what those failures tell us about what has been left out of the portrait of the world that we have fed them, but also to see how the nature of those failures can highlight connections or similarities that we’d not been able to articulate previously.

And I hope that you will look to computing in art history not as a place of objective or definitive answers – as if we’ve ever wanted those – but instead as a way to accentuate the gaps in our knowledge, and a way to augment the way that we talk about uncertainty and unknowns across our discipline.

