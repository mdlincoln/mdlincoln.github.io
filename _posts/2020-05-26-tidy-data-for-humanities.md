---
layout: post
title: |
  Tidy Data for the Humanities
date: 2020-05-26
tags:
  - data
  - digital humanities
  - teaching
---

In an alternate universe, I'd be at the University of Pennsylvania next week teaching a four-day course at [Penn's DREAM Lab on "Tidy Data for the Humanities."](http://web.archive.org/web/20200307162929/http://web.sas.upenn.edu/dream-lab/tidydataforhumanists/) Obviously, that's not happening.

Instead, the wonderful folks at the Price Lab for Digital Humanities have organized a podcast with episodes for many of the courses, alongside what materials and readings each instructor could assembled to at least give an impression of what the course might have been. While we wait for the podcast to come out, I'm posting up a kind of annotated reading/workshop list for my course.

## Why "tidy" data?

{% include figure.html src="/assets/images-display/kondo_excel.jpg" caption="Marie Kondo cradling an Excel spreadsheet" %}

The more I listen to humanists working through data issues and challenges, I see a common tension arise:

1. We know that all data is a reductive construction
2. We also worry a lot about creating data that's clean and usable enough to share, which would seem to imply we've already compromised on point 1.

The reason I leaned on the word "tidy" of course, partly from Marie Kondo's _Tidying Up_, newly popularized in the United States from the Netflix special last year. Marie Kondo's tidiness is not an absolute, but instead contextual. In _your_ home, what matters most? Answering that question isn't a prerequisite to starting to tidy - it's an ongoing discovery that happens during the process of tidying.

This was the way I wanted to train my students to approach the task humanities data tidying. There's a really artificial construct in a lot of intro DH advice that constantly reminds students to "figure out your research question before you blindly start using network graphs" or whatever. I get where that's coming from, but we all know that "the research question" isn't something that appears fully formed like Minerva emerging from your Zeus-like skull. It's something that takes months of toying around to even start to articulate.

So like tying to train your ability to sense "joy" in your personal belongings, I hoped to help our students hone their sense of what data will be most important for them to collect from their sources in order to get to their larger goals. And that we would do this knowing that we might not yet be able to definitively say that our project will involve text analysis versus parsing time series data.

## Annotated Readings and Lessons

Although the course got cancelled well before I could pull together the full lesson plan, I'd like to give the general outline of the syllabus. My planned structure was a daily mix of hands-on work with some sample sources and accessible tools, followed by discussion about a reading or two where we'd try to bring the morning's practice into conversation with more theoretical discussions about structuring data. Given that this planning got suspended early on, some of these sections are more complete while others are more sketchy.

### What is tidying?


I love to start out with [Palladio](https://hdlab.stanford.edu/palladio/) because it is designed to draw your attention to oddities in the construction of your data, more so than to be the primary tool that leads you to a publication-ready visualization.

[In my tutorial for Palladio](https://matthewlincoln.net/mapping-knoedler-palladio/), I use an extract of data from the Knoedler Archive held by the Getty Research Institute because

1. It has categorical and numeric data, coordinates, dates, and network relationships: everything we need to get a feel for Palladio's possibilities
2. It promises to hold insights into the history of the art market in New York City - about genres, prices, relationships between buyers and sellers, or locations of collectors over time...
3. ... but cursory inspection shows that trying to distill those insights from naive queries will tell you more about the eccentricity of the data itself than about that "history" as such.

Every time I teach with it, students quickly grasp its utility as a data inspector. The ease of faceting categories or making quick histograms or timelines highlights typos; very fast maps show you where your geocoding may have gone sideways; equally simple network graph visualizations unearth misplaced values or the dominance of `ANONYMOUS` in your dataset.

After jump-starting our course with some direct work in Palladio with some tricky historical data, I wanted to anchor everyon in the foundantional texts for this class: Katie Rawson and Trevor Muñoz's ["Against Cleaning"](https://doi.org/10.5749/j.ctvg251hk.26), and the ["Tidy Data"](https://doi.org/10.18637/jss.v059.i10) paper they cite by statistician Hadley Wickham. Although the former comes from a humanistic / librarian perspective, and the latter a statistical and programming perspective, I believe they are in fundamental agreement.

Rawson and Muñoz deep dive in to the process of preparing encoded data from the NYPL's vast collection of historical menus, walking through, in painstaking detail, decisions big and small that happen at every step of the way from physical paper menus to a searchable database that could be use to ask questions about popular ingredients or methods over time.

Wickham's paper, published in the Journal of Statistical Software, has been fairly called a manifesto, as it strongly advocates for more attention towards the "mundane data manipulation chores" that precede any kind of analytical work.

> Tidy datasets are easy to manipulate, model and visualize, and have a specific structure: each variable is a column, each observation is a row, and each type of observational unit is a table.

What I draw most on from Wickham isn't the purity of some kind of logical form (it's no different than one of Codd's [normal forms]() from 50 years earlier), but his emphasis on why this format is crucial _in practice_: because it allows you to more rapidly iterate on questions and ideas.
For most problems, computational power isn't the bottleneck - it's the cognitive power of the programmer.
"Tidy" in Wickham's sense doesn't mean that the data are representative, accurate, or complete enough for your research - that's not something that software will fix.
However, shaping data in the tidy format makes it vastly easier to iterate through different filters and analyses, often more quickly revealing holes or problems in your data that would be hidden in a less normalized format.
What was important about the Knoedler data being "tidy" wasn't that it was puritanically clean, but instead that it allowed students to try a large number of queries against the data with much less effort than if they had been working with, for example, a word document transcribing the stock books into paragraphs.
In this way, tidy data goes hand in hand with the deep questiond that Rawson and Muñoz pose about the notion of "clean" data.

### Let's Get Ontological

So given a certain set of sources, and innumerable decisions to make about encoding them into a database, what guiding principles can we follow?

I'm a major fan of the Mark Merry's _Designing Databases for Historical Research_ as a rich entrypoint for historians to learn about database construction, in particular the chapter on ["Conceptual models of database design"](https://port.sas.ac.uk/mod/book/view.php?id=75&chapterid=133) that contrasts "source-oriented" and "method-oriented" models:

>The Source-oriented model of database design dictates that everything about the design of the historical database is geared towards recording every last piece of information from the sources, omitting nothing, and in effect becoming a digital surrogate for the original...
>
>[The method-oriented model] is based on what the database is intended to do, rather than the nature of the information it is intended to contain...
>
>Method-oriented databases are quicker to design, build and enter data into, but it is very hard to deviate away from the designed function of the database, in order to (for example) pursue newly discovered lines of enquiry.
>
> Ultimately, historians will need to steer a middle course between the two extreme models, perhaps with a slight tendency to lean towards the Source-oriented approach. When making decisions about what information you need from your sources to go into the database, it is important to take into account that your needs may change over the course of a project that might take a number of years.

[For the starter exercise in this lesson](https://matthewlincoln.net/tidy-dh-data/), I have small groups try their hand at coming up with a spreadsheet to capture relevant info from a primary source, and then we have the groups compare the different schemas they came up with. By giving the different groups different objectives (say, to try to create data for comparing artwork descriptions versus data that could be sued to investigate patterns of sales) they'll explore the delicate balance between trying to create a comprehensive encoding of a source, versus creating an easily-usable (for a certain definition of "use") database.

### Time, Space, Uncertainty

Keeping to the theme of being practical, this unit covers some of the perennial challenges in how to manage time, spatial information, and uncertainty, and other kinds of data integrity. Some references include:

- [Best practices for using google sheets in your data project](/2018/03/26/best-practices-for-using-google-sheets-in-your-data-project.html) about using data validation and conditional formatting to make your data entry and checking easier.
- ["Uncertainty, Missing Information, and Network Analysis"](https://doi.org/10.1184/R1/12363362)
- Karl Grossner and Elijah Meeks, ["Topotime"](http://dh.stanford.edu/topotime/docs/TemporalGeometry.pdf)
- Matthew Lincoln and Sandra van Ginhoven, ["Modeling the Fragmented Archive: A missing Data Case Study from Provenance Research,"](https://doi.org/10.1184/R1/12363059) presented at the Alliance of Digital Humanities Organizations annual conference, 2018, Mexico City.

### Complexity, Re-use, and Linking Data

Continuing the core theme of balancing complexity with usability, I also wanted to give our students an introduction to Linked Open Data, not from the super-technical publishing point of view, but from the researcher point of view.

In this exercise based on an earlier workshop I've given called ["Linked Open Data for Art Historians: Who Cares?"](https://doi.org/10.1184/R1/11325704.v1), I aimed to get researchers thinking about what parts of Linked Open data they really need to spend time caring about. Individual researchers don't need to actually produce LOD - they don't have a big enough user-base for their data to justify it; and even if they did, they definitely don't have access to the resources for continued live data publishing.

But I do emphasize the importance of _reconciliation_: connecting entities in their data like people, places, objects, or concepts that might be referenced in other people's or institutions' datasets. You may not be producing live linked data on the web, but you can publish a CSV in your institutional repository with canonical IDs from LoC, Getty, VIAF, Wikidata, and more.

In addition to helping with data cleaning, OpenRefine has a pretty good user interface for reconciling columns in your data to controlled authorities. This lesson shows how to use it with the Getty's varied vocabularies. Almost no researcher will find a vocabulary that has identities for ALL the people or concepts they wish to reference, but the point is not to replace your local identifer system. Rather, it's to augment your data so that others can much more easily integrate it with their own information, and so that you don't have to take on data entry and encoding tasks that have already been done by the community.

- Miriam Posner's 2015 talk ["What’s Next: The Radical, Unrealized Potential of Digital Humanities"](https://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/)

  This keynote at Keystone DH is still a keystone (🤣) in my intellectual makeup. I particularly appreciate the call for data structures that give different answers based on the context of the observer/inquirer. It was enough to make me [run my own thought experiment about it in response](/2015/07/25/a-radical-useable-data-model.html) and it was important for me to make clear to students that such a database is entirely possible, but comes with the tradeoffs of much greater complexity, and far, far more labor in data entry and software-building.

- Alison Langmead and David Newbury. [“Pointers and Proxies: Thoughts on the Computational Modeling of the Phenomenal World,”](https://doi.org/10.4324/9780429505188-31) in _The Routledge Companion to Digital Humanities and Art History_, edited by Kathryn Brown, 358–73. New York: Routledge, 2020.

  This is hot off the presses and a great distillation of differences in data traditionally used in heritage collections data versus the data that researchers might wish to have for historical insight or inference.

- Rob Sanderson, ["Tiers of Abstraction and Audience in Cultural Heritage Data Modeling"](https://www.slideshare.net/azaroth42/tiers-of-abstraction-and-audience-in-cultural-heritage-data-modeling-230217697)

  This one is on the more advanced end, and aimed at information science professionals, but I wanted to give my students some impression of what these data construction conversations look like from the perspective of collecting institutions and the systems and software programmers that use them.
