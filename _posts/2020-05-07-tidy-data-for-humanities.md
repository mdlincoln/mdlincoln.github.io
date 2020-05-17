---
layout: post
title: |
  Tidy Data for the Humanities
date: 2020-05-08
tags:
  - data
  - digital humanities
  - teaching
---

In an alternate universe, I'd be at the University of Pennsylvania in just a few weeks teaching a four-day course at Penn's DREAM Lab on "Tidy Data for the Humanities." Obviously, that's not happening.

Instead, the wonderful folks at the Price LAb for Digital Humanities have organized a podcast with episodes for many of the courses, alongside what materials and readings each instructor could assembled to at least give an impression of what the course might have been.

## Why "tidy" data?

{% include figure.html src="/assets/images-display/kondo_excel.jpg" caption="Marie Kondo cradling an Excel spreadsheet" %}

The more I listen to humanists working through data issues and challenges, I see a common tension arise:

1. We know that all data is a reductive construction
2. We also worry a lot about creating data that's clean and usable enough to share, which would seem to imply we've already compromised on point 1.

The reason I leaned on the word "tidy" of course, partly from Marie Kondo's _Tidying Up_, newly popularized in the United States from the Netflix special last year. Marie Kondo's tidiness is not an absolute, but instead contextual. In _your_ home, what matters most? Answering that question isn't a prerequisite to starting to tidy - it's an ongoing discovery that happens in conjucntion with tidyig.

This was the way I wanted to train my students to approach the task humanities data tidying. There's a really artificial construct in a lot of intro DH advice that constantly reminds students to "figure out your research question before you blindly start using network graphs" or whatever. I get where that's coming from, but we all know that "the research question" isn't something that appears fully formed like Minerva emerging from your Zeus-like skull. It's something that takes months of toying around to even start to articulate.
$$
So like tying to train your ability to sense "joy" in your personal belongings, I hoped to help our students hone their sense of what data will be most important for them to collect from their sources in order to get to their larger goals. And that we would do this knowing that we might not yet be able to definitively say that our project will involve text analysis versus parsing timeseries data.

## Annotated Readings and Lessons

Although the course got cancelled well before I could pull together the full lesson plan, I'd like to give the general outline of the syllabus - a daily mix of

### What is tidying?

- Against Cleaning and Tidy Data Manifesto

  ["Against Cleaning"](https://doi.org/10.5749/j.ctvg251hk.26) and the "Tidy Data Manifesto" they cite by statistician Hadley Wickham.

  What I draw most on from Wickham isn't the purity of some kind of logical form (it's no different than one of Codd's [normal forms] from 50 years earlier), but his emphasis on why this format is crucial _in practice_: because it allows you to more rapidly iterate on questions and ideas. For most problems, computational power isn't the bottleneck - it's the cognitive power of the programmer. Arranging data in these forms is a question of implementation, not the more difficult abstraction work of ontology-building.

  Balancing context+complexity with usability (by yourself and by others): this is the core thread I wanted to run through this course.

- Palladio

  I love Palladio because it is designed to draw your attention to oddities in the construction of your data, more so than to be the primary tool that leads you to a publication-ready visualization. Every time I teach with it, students quickly grasp its utility as a data inspector. The ease of faceting categories or making quick histograms or timelines highlights typos; very fast maps show you where your geocoding may have gone sideways; equally simple network graph visualizations unearth misplaced values or the dominance of "ANONYMOUS" in your dataset.

  [In my tutorial for Palladio](/mapping-knoedler-palladio/), I use an extract of data from the Knoedler Archive held by the Getty Research Institute because

  1. It has categorical and numeric data, coordinates, dates, and network relationships: everything we need to get a feel for Palladio's possibilities
  2. It promises to hold insights into the history of the art market in New York City - about genres, prices, relationships between buyers and sellers, or locations of collectors over time...
  3. ... but cursory inspection shows that trying to distill those insights from naive queries will tell you more about the eccentricity of the data itself than about that "history" as such.

### Let's Get Ontological

- OK, so how _should_ we construct these data?

  I'm a major fan of the Mark Merry's _Designing Databases for Historical Research_, in particular the chapter on ["Conceptual models of database design"](https://port.sas.ac.uk/mod/book/view.php?id=75&chapterid=133).

  > Method-oriented databases are quicker to design, build and enter data into, but it is very hard to deviate away from the designed function of the database, in order to (for example) pursue newly discovered lines of enquiry.
  >
  > Ultimately, historians will need to steer a middle course between the two extreme models, perhaps with a slight tendency to lean towards the Source-oriented approach. When making decisions about what information you need from your sources to go into the database, it is important to take into account that your needs may change over the course of a project that might take a number of years.

  [For the starter exercise in this lesson](/tidy-dh-data), I have small groups try their hand at coming up with a spreadsheet to capture relevant info from a primary source, and then we have the groups compare the different shcemae they came up with.

### Time, Space, Uncertainty

Keeping to the theme of being practical, this unit covers some of the perennial challenges

- Karl Grossner and Elija Meeks, ["Topotime"](http://dh.stanford.edu/topotime/docs/TemporalGeometry.pdf)
-

### Complexity versus Re-use

- Miriam Posner's 2015 talk ["What’s Next: The Radical, Unrealized Potential of Digital Humanities"](https://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/) was a kyestone for me (haha get it, Keystone DH!)

- Alison Langmead and David Newbury. [“Pointers and Proxies: Thoughts on the Computational Modeling of the Phenomenal World,”](https://www.taylorfrancis.com/books/e/9780429505188/chapters/10.4324/9780429505188-31.) in _The Routledge Companion to Digital Humanities and Art History_, edited by Kathryn Brown, 358–73. New York: Routledge, 2020.

  This one is hot off the presses, and a great

  We would also learn some [brass tacks useful things in Google Sheets](- [Google Sheets in your Data Project](/2018/03/26/best-practices-for-using-google-sheets-in-your-data-project.html), your problematic fave, about using data validation and conditional formatting to make your data entry and checking easier.

  Writing data documentation

### Linking Data

- Rob Sanderson, ["Tiers of Abstraction and Audience in Cultural Heritage Data Modeling"](https://www.slideshare.net/azaroth42/tiers-of-abstraction-and-audience-in-cultural-heritage-data-modeling-230217697)

  This one is on the more advanced end, and aimed at information science professionals, but I wanted to give my students some impression of what these data construction conversations look like from the perspective of collecting institution. How can these scholars help make their data interconnect just a little ore more fluidly with

- Matthew Lincoln, ["Linked Open Data for Art Historians: Who Cares?"](https://doi.org/10.1184/R1/11325704.v1)

  In this exercise I aimed to get researchers thinking about what parts of Linked Open data they really need to spend time caring about. Individual researchers don't need to actually produce LOD - they don't have a big enough user-base for their data to justify it; and even if they did, they definitely don't have access to the resources for continued live data publishing.

  However, I emphasize the importance of _reconciliation_: connecting entities in their data like people, places, objects, or concepts that might be referenced in other people's or institutions' datasets. You may not be producing live linked data on the web, but you can publish a CSV in your institutional repository with canonical IDs from LoC, Getty, VIAF, Wikidata, and more.

  In addition to helping with data cleaning, OpenRefine has a pretty good user interface for reconciling columns in your data to controlled authorities. This lesson shows how to use it with the Getty's varied vocabularies. Almost no researcher will find a vocabulary that has identities for ALL the people or concepts they wish to reference, but the point is not to replace your local identifer system. Rather, it's to augment your data so that others can much more easily integrate it with their own information, and so that you don't have to take on
