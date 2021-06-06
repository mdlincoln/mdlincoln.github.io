---
layout: post
title: |
  The Labor Behind DH Data Complexity: Balancing Priorities as a Real-Life Researcher
date: 2021-06-07
tags:
  - data
  - digital humanities
aside: |
  This is an edited version of a talk that I gave at the May 21, 2021 workshop ["Making Research Data Public: Workshopping Data Management for Digital Humanities,"](https://biblio.uottawa.ca/en/news/making-research-data-public-workshopping-data-curation-digital-humanities-projects)_ hosted by the University of Ottawa Library. [The complete slides are available here.](https://doi.org/10.1184/R1/14740440)
---

This started out as some quick remarks about a specific project, but soon turned into a bit of a polemic about data and labor. There's more to be said than can be done in fifteen minutes, so I hope it's enough for me to raise some questions now, particularly because I don't have all the answers for them yet.

So first, what do I mean by DH data complexity? I mean the kinds of knowledge we have that is situated, uncertain, approximated, inferred - everything that doesn't easily fit into the usual corporate idea of data about people, art, books, documents, and all our other sources and focuses of study.

Six years ago when I was still a PhD student, I had the joy of attending [Keystone DH](https://keystonedh.network/2015/), a regional conference held in the state of Pennsylvania in the US every few years. In [Miriam Posner's keynote talk on the radical, unrealized potential of DH](http://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/), she challenged us to think about more nuanced and complex data models that didn't approach identities like gender or race as an ever-expanding dropdown menu of attributes for a person, but as situated perspectives that could vary based on the time, the place, or the observer:

>For example: a useful data model for race would have to be time- and place-dependent, so that as a person moved from Brazil to the United States, she might move from white to black. Or perhaps the categories themselves would be time- and place-dependent, so that certain categories would edge into whiteness over time...
>
>Perhaps... it makes more sense to define race not as a data point in itself but as the product of a set of relationships of power; in that sense, it’s both imaginary and constitutive of our reality. Is there a data model, or a set of functions we might define, that could represent that?

[I found Posner's talk exhilarating]({% link _posts/2015-07-25-a-radical-useable-data-model.md %}), and it gave me incentive to learn more about data modeling, starting my gradual turn from a pure art historian to a cultural heritage data engineer and architect. Because what I learned was there really *are* ways to program these concepts in a computable way that goes beyond the arbitrary restrictions of a single, easy-to-use spreadsheet. And therein lies the rub of my talk:

**Because embedded in the decision to add more complexity to data is a decision to invest more labor at many levels.** I am not saying this to dissuade such complexity – as I hope to demonstrate, the labor and results are often deeply rewarding. But I think we often elide the many kinds of labor that are affected by these decisions.

I suspect much of this audience is painfully aware of the labor of data entry, reconciliation, and verification. I hope you are also thinking about the ways that this labor can be fairly or unfairly distributed. Here I show a picture of the largely-uncredited punch card operators for Roberto Busa's famous Index Thomisticus - a common example of the pejorative feminiziation of data entry in the earliest history of DH recently illuminated by [Melissa Terras and Julianne Nyhan](https://www.jstor.org/stable/10.5749/j.ctt1cn6thb.9).

{% include figure.html src='/assets/images/terras_nyhan.jpg' caption='Livia Canestraro (L) and another punch card operator for the Index Thomisticus. Published in [Terras and Nyhan 2016](https://www.jstor.org/stable/10.5749/j.ctt1cn6thb.9)' %}

But there are additional kinds of labor that come with increased complexity:

- Labor of designing data schemae and documenting processes and rationales for your team
- Labor of implementing the database and its interfaces in software, and continually updating those affordances as the research project evolves
- Labor of iteratively exploring and analyzing the collected data to answer questions or formulate new ones
- Labor you demand from your audiences/communities when they try to understand and re-use the data you publish

I'll walk through each of these types in my case study: the [*Index of Digital Humanities Conferences*](https://dh-abstracts.library.cmu.edu/) edited by Scott Weingart and Nickoal Eichmann-Kalwara, and coded & constructed by myself. The *Index* is an attempt to collate a growing database of DH and humanities computing conference programs and presentation abstracts dating back to the early days of academic computing. Although we launched publicly in fall of 2020, the *Index* is very much a work in progress – as we speak, contributors continue to enter and correct more data. I strongly recommend you read the project's [About pages](https://dh-abstracts.library.cmu.edu/pages/about/) to get a fuller sense of the motivations behind it, and what is and isn’t contained in it.

What I want to focus on today is one part of our data model – we wanted to be able to connect papers by the same author, while still maintaining all the original variations of names, differing institutional affiliations, and the connections of each of those assertions to the original source materials.

[Here](https://dh-abstracts.library.cmu.edu/works/8993) for example, you see a panel from the 2019 Keystone DH, where one of the presenters, Dr. Zoe LeBlanc, gave an affiliation with the University of Virginia.

[But clicking through to her page](https://dh-abstracts.library.cmu.edu/authors/4130) in the website, you can see all the linked works, along with a list of all the varied names and affiliations listed across those works.
So rather than normalizing all our author names, we maintained them as given in our source materials, linking together those presentations where we were confident they belonged to the same author. You’ll see this lets us show not only the different variations, but directly link to the source where that variation came from.

Already, this introduces complexity in understanding the website: there are more boxes, more hyperlinks, more text on the page that may look more complex than users expect.

But this increased data complexity also directly resulted in a lengthier data entry workflow for our project team. It included a lot of additional time spent training and troubleshooting with our student workers, and more of my own time spent customizing data entry interfaces; time I could not spent on refining the public-facing side of the website that most people would see.

This meant a lot of additional developer time configuring a database and web application where author names as well as their affiliations were not simple properties of the person, but assertions made by specific conference programs.

{% include figure.html src="/assets/images/dh-abstracts-data-model.svg" caption="Excerpt from The Index of Digital Humanities data model." %}

This is a diagram of our [model published on the site](https://dh-abstracts.library.cmu.edu/pages/colophon/). In the case of "Jane Doe" here, Person 321 isn’t directly connected to these names, but is linked to them via their authorship of different conference papers, in which they gave different variations of their name.

This meant I couldn’t use straightforward ways of querying the database, where all our author data in just one table.
Instead, I had to chain together many tables to get from person to authorship to appellation, increasing the time it took to write the code in the first place, as well as making further changes during the project more costly. This also impacts analysis and aggregation of the data. Because of this more nuanced model, we could ask more refined questions of the data, but asking them meant writing out more code than we would have had to with simpler data.

To reiterate: this added complexity in data and programming isn't inherently bad. In fact, because I had adequate time to fully explore our options, and because *I had enough authority within the larger project to have my recommendations followed and respected*, this was a very rewarding and engaging software design challenge. Without that close collaborative relationship between myself (the technologist) and the researchers on the project, this complexity would have been an alienating burden.

Perhaps most importantly, though, creating more complex data demands more labor from our audience, too. [The documentation for the full, unflattened data runs many pages long](https://dh-abstracts.library.cmu.edu/downloads). This raises a barrier for those who might re-use the data, requiring them to take more time to understand what we made, and how it works. We were so concerned about this complexity that we simultaneously publish a simplified version of the same database in a single CSV file. The questions you can ask of that version of the data are more restricted, but it is far easier to use - especially for someone working with these data for the first time.

Now, I hope in the subtext of each of these examples, you've noticed that the added labor – when it was structured and accounted for – resulted not only in a more nuanced data product, but in a richer experience for the project team and, we hope, for our audiences.

- More nuanced data entry ⇆ more critical engagement with the source materials
- More database planning and justification ⇆ more critical thought about the project ahead of time
- More time needed to code and analyze ⇆ richer engagement with technologists as intellectual collaborators
- Less easily re-used data ⇆ more attention to thoughtful documentation, explanation, and audience needs

But these upsides of added data labor do not come automatically. It only worked for us because our project team actively committed to recognizing the many varied forms of data labor. To gain these benefits demands deep and continual engagement with how project labor is distributed, compensated, and credited. And it also demands that you expand your definition of labor beyond the borders of the project team, to encompass the work of future users trying to understand what you have created.

## References and Related Works

Boyles, Christina, Anne Cong-Huyen, Carrie Johnston, Jim McGrath, and Amanda Phillips. “Precarious Labor and the Digital Humanities.” American Quarterly 70, no. 3 (2018): 693–700. <https://doi.org/10.1353/aq.2018.0054>.

Langmead, Alison, Tracey Berg-Fulton, Thomas Lombardi, David Newbury, and Christopher Nygren. “A Role-Based Model for Successful Collaboration in Digital Art History.” International Journal for Digital Art History, no. 3 (July 27, 2018). <https://doi.org/10.11588/dah.2018.3.34297>.

Morgan, Paige C. "Building Collectivity in Digital Humanities Through Working With Data," presented at *Recovering the US Hispanic Literary Heritage*, January 25, 2021. <https://www.youtube.com/watch?v=QxGIxppyPdw>.

Posner, Miriam. “What’s Next: The Radical, Unrealized Potential of Digital Humanities.” Miriam Posner’s Blog, July 27, 2015. <http://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/>.

Terras, Melissa, and Julianne Nyhan. “Father Busa’s Female Punch Card Operatives.” In Debates in the Digital Humanities 2016, edited by Matthew K. Gold and Lauren F. Klein, 60–65. University of Minnesota Press, 2016. <https://www.jstor.org/stable/10.5749/j.ctt1cn6thb.9>.

Weber, Chela, Martha Conway, Nicholas Martin, Gioia Stevens, and Brigette Kamsler. “Total Cost of Stewardship: Responsible Collection Building in Archives and Special Collections,” 2021. <https://doi.org/10.25333/ZBH0-A044>.
