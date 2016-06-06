---
layout: "post"
title: "Linked Open Realities: The Joys and Pains of Using LOD for Research"
date: "2016-06-06 18:27"
comments: true
aside: "I presented this talk at the June 1, 2016 meeting of the [CESTA](https://cesta.stanford.edu/) Graduate Fellows at Stanford University. [You can see the full slides here.](https://speakerdeck.com/mdlincoln/linked-open-realities-the-joys-and-pains-of-using-lod-for-research). What follows is the translation of some very loose and informal notes, along with a subset of the slides, into something more resembling a blog post."
tags:
  - Data
  - LAM
---

[jq]: https://stedolan.github.io/jq/

[dplyr]: https://github.com/hadley/dplyr

<script async class="speakerdeck-embed" data-slide="1" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

So, you might guess by this image (from [@LegoAcademics](https://twitter.com/legoacademics)!) that I’m something of a linked open data pessimist.
I’ve just come off of a dissertation that relied for half of its data on a large RDF museum database that was open, rich in complex and nuanced historical information, and rigorously structured... but lacked any real links to other institutions or outside authorities, and more often than not was unavailable due to technical outages.

These are my joys and pains of trying to use linked open data to drive disciplinary research.

## Why I Want to Like LOD

<script async class="speakerdeck-embed" data-slide="3" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

This will be an opinionated talk: I come at LOD not from the perspective of a systems librarian trying to build an interoperable discovery portal, or an iPhone developer trying to make a museum visitor app.
Those are really valid use cases --- and they already receive a lot of attention.

I'm a scholarly researcher, and I use different computational methods to consider old art historical data from new angles.
After talking a bit about my dissertation, I will walk through some of the ups and downs of using these data, concluding with a few desiderata for research-focused LOD in the future.

<script async class="speakerdeck-embed" data-slide="6" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

My [dissertation](/dissertation) uses data about early modern Dutch and Flemish prints to infer network dynamics of early modern etching and engraving production in the Low Countries.
By taking individual objects as an index of professional relationships at a certain point in time, it became possible to make claims about larger network phenomena in this period; phenomena that had been difficult or impossible for art historians to discern without computational analysis.

<script async class="speakerdeck-embed" data-slide="8" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

I pulled data from two excellent sources:

1. the Rijksmuseum (RKM) in Amsterdam, which offers collection data via a JSON-based API [(though which it is rolling out as Linked Open Data... sort of. See the epilogue below.)][epilogue]
2. The British Museum (BM) in London, which is one of the best pioneers of LOD in the cultural heritage sector. (This is not to say their LOD doesn't suck, though. They are not to be blamed, however. I am of the opinion that _everyone's LOD sucks_.)

## Complex Data, Complex Queries

<script async class="speakerdeck-embed" data-slide="9" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

What I loved about working with the BM linked data, as opposed to the RKM JSON, was that I didn't have to bend the data model over backwards to extract the tables I wanted.
The RKM's JSON was focused on describing artworks, with artists and their relationships described in embedded objects in each array.
This meant doing a lot of gymnastics with [jq] and table joins (mostly in R's [dplyr]) to get an edge list of artist-artist relationships.
Moreover, because the API was built to squirt out info on only 10-100 objects at a time, I had to spend a long time slowly scraping all their data in order to do bulk queries over thousands of objects.

<script async class="speakerdeck-embed" data-slide="10" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Ostensibly, the BM's SPARQL endpoint should solve these problems: it gives access to the entire data dump, along with the ability to compute virtually any table I want with a single, well-written query.

This is easier said than done, of course.

<script async class="speakerdeck-embed" data-slide="11" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

SPARQL is difficult to write, because to pull it off, you need to be familiar with the schema of your target database.... which is hard to grok if you can't write SPARQL to query it in the first place.

I’m going to show you a screencast trying to write a simple query on the Getty Union List of Artist Names: how many different nationalities are represented in that database of artists born between 1600 and 1700, and how many of each nationality are recorded therein?
This was recorded by a colleague at the [Harvard MetaLab institute _Beautiful Data 2_](http://beautifuldata.metalab.harvard.edu/2015/) who wanted to understand LOD a bit better.
In real time, this apparently took about 20 minutes, with me talking through it the whole time.
The sped-up screencast will just show about 3 minutes.

<iframe width="600" height="450" src="https://www.youtube.com/embed/yNv6z8oYvA0" frameborder="0" allowfullscreen></iframe>

As you can see, navigating a new repository just to find the right terms to _write_ your query is easily the most exasperating part of working in LOD.
So building tools for understanding _how_ someone has assembled their data are important if we want to encourage researchers to take advantage of LOD in their work.

Part of figuring out an LOD endpoint means not just understanding how to navigate the graph to find the information you want, but understanding how often the information you want will be present for a given type of constituent in the database, and how often it will be missing.

I learned this the hard way with Anthony van Dyck.

<script async class="speakerdeck-embed" data-slide="17" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

One of the joys of LOD is that it allows for complexity like certain properties of a node having multiple values.
However, there's a difference between knowing this is an abstract possibility, and querying/processing the data with the knowledge of which properties will always have just one value, and which properties _you can and should expect to be multiple (or **missing**) with considerable frequency_.

I'd been building a network analysis that looked at the assortativity of collaboration based on artists' nationalities, and when I began to pore over individual results, I noticed a big name was missing: Anthony van Dyck.

Panicking, I went back over my data processing pipeline.
It turns out that in the British Museum, Anthony van Dyck actually has two nationalities: "Flemish" and "British" - a data wrinkle that I'd not accounted for when programming my analysis.

(Quick aside: He's Flemish. He just is. Yes, he spent a lot of time in London.
But in no art history that I know of is he classified as a British artist.
Moving on...)

On the other hand, in the Rijksmuseum data, van Dyck was actually **missing a nationality altogether**, which meant (again, thanks to my naive processing pipeline) that he got erased from this particular analysis completely.

(What _is_ it with this guy?)

Now, I'd expected that minor artists might be missing nationalities --- but I hadn't expected that Van Dyck, along with several other big names, would be missing these otherwise-present fields.
As I just noted, this is not a pitfall unique to linked data --- had I been processing my data carefully, I would have caught it!
But the blessing of complexity bestowed by a graph database also creates many more chances for stupid user screw-ups like this.
Thus, building tools to help _audit_ unfamiliar LOD datasets is also on my list of LOD desiderata, so researchers can quickly tell if the endpoint would be able to support their research, and which landlines to look out for.

## "Linkable" Open Data

<script async class="speakerdeck-embed" data-slide="18" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

Another potential upside of LOD is that it is addressable: that you literally have a URI for a given resource (e.g., the concept of the individual "Anthony van Dyck") which you can point to from anywhere on the web.
As a researcher, I'm interested in this from a reproducibility standpoint.
I would like to share my analytical code and derived data, but this also requires sharing the original data tables that I started with.

<script async class="speakerdeck-embed" data-slide="19" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

There is no easy way to do this with the JSON-based RKM data, other than packaging the tables I built from their API using [jq].
On the other hand, I could ostensibly give you a series of SPARQL queries formatted as URLs that are fired at the BM endpoint, retrieving the correct starting tables programmatically.

"Ostensibly" being the operative word.

You see, if you go to <http://collections.britishmuseum.org> right now [at least as of the June 1, 2016 writing of this talk], you get this:

<script async class="speakerdeck-embed" data-slide="20" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

It turns out both roots of my reproducible data analysis tree are poisoned: the JSON is challenging to bulk download, and the RDF/LOD is extremely unreliable.
Like so much else, Linked Open Data is just data sitting on someone else's computer.
And the British Museum (as much as I love them) is terrible (_terrible!_) at keeping its digital infrastructure running:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Sorry teach, the British Museum is continuing to eat my homework. (48 hours and counting...) <a href="http://t.co/8xtePE1v7Z">pic.twitter.com/8xtePE1v7Z</a></p>&mdash; Matthew Lincoln (@matthewdlincoln) <a href="https://twitter.com/matthewdlincoln/status/645610266630193152">September 20, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So for now, I thank my lucky stars that the BM provides a bulk download of their entire LOD that I can host locally, and from which I can construct and package relevant data tables into sharable research code.
But this is a realistic reminder that the dream of a just-in-time-style data provisioning isn't sustainable (at least not at the price point that GLAM institutions can pay), and so you as a researcher need to think carefully about how you'll build in fault tolerance into your own data analysis pipeline.

<script async class="speakerdeck-embed" data-slide="21" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

## Data linked... but to what?

<script async class="speakerdeck-embed" data-slide="23" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

There's another funny think about my use of BM LOD in my dissertation.
I didn't ever take advantage of it being "linked" with anything - because it isn't!

<script async class="speakerdeck-embed" data-slide="24" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

There are several relevant authorities out there for GLAM data: VIAF, LOC subject headings, DBpedia, GeoNames, not to mention the Getty's AAT, ULAN, and TGN.
The British Museum links to none of them.

I don't actually blame them.
They already have their own internal thesaurus of people and materials and subjects, and to map those to existing authorities would be a monumental task.
But the result is that we are left with a very nice graph database that simply isn't linked to the outside world in the way that the "Semantic Web" folks keep talking about.

A consequence of this is that I never merged the BM and RKM databases in my research, but instead kept them separated.
(This had its own uses for validation, but it started out as a data-driven cop-out.)

## LOD Desiderata

<script async class="speakerdeck-embed" data-slide="26" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

This goes to show that, at the end of the day, I mainly want access to the underlying data; and the more structure you can give to it, the better.

As a researcher, I honestly don't need the data to have %99.999 uptime.
I don't need them to seamlessly link out to other institutions --- though I wouldn't mind if you took advantage of existing authorities and slapped some shared identifiers on those entities (like Anthony van dyck) that have them, even if you still need to keep an in-house system for 100% coverage of those very minor entities that don't merit inclusion in the big shared authority indices.

But I do need better tools for assessing this data (make your implicit knowledge more explicit) and accessing this data (better query interfaces):

<script async class="speakerdeck-embed" data-slide="28" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

I've already mentioned many of my LOD desiderata in the course  of this talk, but my last one would be an exhortation to GLAM institutions to seek out research uses of their data, and not limit their thinking to mere aggregation and dissemination. (A balance that will come up in the [epilogue] shortly.)
Creating LOD is hard enough for these institutions, so with some more utilities for individual researchers to take advantage of the complex data expressions and queries offered by LOD, hopefully it will be easier for GLAMs to design their data offerings to better support the kind of detailed research that these data projects keep promising to enable.

<script async class="speakerdeck-embed" data-slide="29" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

[epilogue]: #epilogue

## Epilogue

After giving this talk at Stanford, I finally took the time to check out the draft LOD that the Rijksmuseum has been developing.
They've been at it for a few years, and I must say, the results are not what I'd hoped for.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Unless I’m misreading this <a href="https://twitter.com/rijksmuseum">@rijksmuseum</a> LOD flattens diverse artist-object relationships into “dc:creator” <a href="https://t.co/y0sVFdYa3Y">https://t.co/y0sVFdYa3Y</a></p>&mdash; Matthew Lincoln (@matthewdlincoln) <a href="https://twitter.com/matthewdlincoln/status/738776348915838976">June 3, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[You may click through to see a much longer conversation.](https://twitter.com/matthewdlincoln/status/738779325802156032)
In short, they have drastically simplified the data they already have available in order to connect to Europeana, a lowest-common-denominator content aggregator.

I believe this is going about the project backwards.
A graph database like this is useful precisely because it allows you to easily project very complex relationships into much simper ones, adding additional, simpler layers on top of a foundational, full-complexity data model.
Adding complex layers atop simple ones is much more challenging, and not just from a technical standpoint.

While everyone wants to cater both to the mass public as well as the scholarly researcher, in a battle of limited resources the mass public will win out.
It's not even a contest.
If the simple, already-public data is deemed good enough, then nuts to your "adding future complexity" plans.

[So, as I have written before, museum technology will likely _default_ to perpetuating the "two art histories" --- a simplistic-yet-engaged museum art history vs. the nuanced-yet-isolated academic art history.](https://hyp.is/oEeiuiw4EeaTxBdP31Ffzg/perspective.revues.org/6021)
But then, we can always resist the default...
