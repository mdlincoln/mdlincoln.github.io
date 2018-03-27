---
layout: "post"
title: "Best Practices for Using Google Sheets in Your Data Project"
date: "2018-03-26 20:39"
tags:
- code
- data
---

A [tweet by Hadley Wickham](https://twitter.com/hadleywickham/status/978401746182549504) made me realize that we've learned quite a few good practices for using Google Sheets as part of our in-progress [Provenance Index Remodel project at the Getty Research Institute][pir].

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Can you point me to any good papers or blog posts that document best practices for using google sheets when collecting data?</p>&mdash; Hadley Wickham (@hadleywickham) <a href="https://twitter.com/hadleywickham/status/978401746182549504?ref_src=twsrc%5Etfw">March 26, 2018</a></blockquote>

This post is an attempt to sum up some lessons learned.

A quick bit of context:
while you can [read more about the PIR project on the Getty website][pir], from a technical standpoint what we're doing is a very involved research database migration and enhancement project from a legacy storage system to Linked Open Data.
This is not a "pure" database migration that can be accomplished by a passel of well-written scripts.
We needed to do a huge amount of data cleaning and enhancement that involves new research work by subject specialists, some with decades of experience working with our legacy system and the archival source documents.
As the resident data scientist and art historian at the Getty, I work in close collaboration with our software engineers and our subject specialists to figure out what new research was needed, and how to build that work as seamlessly as possible into our transformation.

Much of this new data entry and editing involves computing views of the data not supported by the current production system.
The tasks we've identified are almost all one-off tasks that won't need to be repeated after this project, and were also so disparate and unpredictable that we quickly realized it was not worth our time to write a CRUD app from scratch.
So we settled early on using Google Sheets as a system for hosting worksheets that our staff could collaboratively edit, and that I could (almost) painlessly incorporate into our [ETL] pipeline.

[ETL]: https://en.wikipedia.org/wiki/Extract,_transform,_load

While much of this may seem like common sense, I hope it'll be helpful to others working on similar projects.
I'll start off with our one unifying lesson:

[pir]: http://www.getty.edu/research/tools/provenance/provenance_remodel/index.html

## 80% of sheet design should be for editors, only 20% for data scientists

There are two audiences for these sheets: the editors who are consulting and modifying them, and the data scientist who is consuming them.
A common theme of the best practices we arrived at is that these sheets need to be designed primarily with the editor user experience in mind, with the data scientist's user experience an important, but only secondary consideration.

## Don't make the Sheet too Tidy™️

As an R user well-versed in the [Tidyverse], I pathologically want to produce tables of [Tidy data](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html#tidy-data) with one variable per column, one observation per row, and one table per "observational unit".
While this form is ideal for doing core tabular operations like filtering, grouping, and aggregation, it makes life a bit difficult for data entry.

One of our key tasks is reconciling free text fields to the Getty's Art & Architecture Thesaurus, a controlled list of cultural heritage concepts.
Any given artwork has a one to many relationship with AAT concepts - it might take from 6 to 12 to describe the materials, techniques, subjects, and styles of an artwork.
In a "long" table, this would mean repeating plain text terms over multiple rows, pairing them with one AAT concept and one property type (e.g. materials, support type, object type, technique) per row.

This table would suck for data entry, though.
No user should have to waste time duplicating rows to keep a table in a good long format..
It also makes it much harder for an editor to visually assess how complete the translation of some set of free text terms has been.
A wide data format that allowed the editor to quickly tab through several columns, putting multiple AAT terms into one cell when needed (e.g. for a painting made on canvas mounted on panel), separating them with a semicolon.

This format does mean a little extra engineering on the data processing end. 
Multiple values needed to be split out, and `tidyr::gather`ed into a long format suitable for easy filtering and joining.
However, I only needed to code that data reshaping once, while our editors bravely had to work though hundreds of different free text combinations.

## Use data validation and data protection

Sheets were a compelling UI solution because our editors were already well-versed in working with Excel spreadsheets, and so recongnized the form.
However, their extreme power and ease of editability can be a drawback - it's easy for a user to change data they shouldn't, or to enter data that doesn't adhere to the desired schema.
Although Google Sheets can't offer the bulletproof data correctness guarantees that a relational database with well-designed data types and constraints can, its tools are Good Enough to catch a lot of simple typos.



## Use conditional formatting to help your editors

## Documentation at the point of need

(Like all docs, this is something we could be better at consistently maintaining. However between notes here as well as discussion in our JIRA we can make sure everyone is generally on board with the required tasks.)

## Use comments as feedback (but not as data entry!)


