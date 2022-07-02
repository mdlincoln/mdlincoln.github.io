---
layout: post
title: |
  Relocating Complexity
date: 2022-07-01
tags:
  - code
  - articles
  - publishing
---

Along with co-authors Jennifer Isasi, Sarah Melton, and François Dominic Laramée, I'm excited to have an article out in _Digital Humanities Quarterly_ on ["Relocating Complexity: The Programming Historian and Multilingual Static Site Generation"](http://www.digitalhumanities.org/dhq/vol/16/2/000585/000585.html).
This is part of an exciting, and long-time-coming, [special issue on minimal computing](http://www.digitalhumanities.org/dhq/vol/16/2/index.html) edited by Roopika Risam and Alex Gil.

From our case study:

> Like any technologists, practitioners embracing minimal computing principles must grapple with the changing purposes, audiences, scales, and functionalities of the project they are supporting.
> In this case study, we explore the challenges of maintaining a sustainable static-site architecture during the multilingual expansion of _The Programming Historian_, an open-access publication of peer-reviewed tutorials on digital tools and workflows geared at humanities teachers and researchers.
> By elucidating the deep intertwining of the technical, logistical, and social challenges of moving from a monolingual to a multilingual publication, we hope to provide other digital project teams with a valuable perspective on the tradeoffs of static sites when the projects they support are rapidly growing in size and complexity.

We submitted this article more than two years ago, at the very start of the pandemic in 2020.
Jekyll has been at a virtual standstill over that time.
[Releases since 2020](https://github.com/jekyll/jekyll/releases) have been primarily security patches.[^flag]
But our general pont stands - and it's one that is recognized by many developers.
As Hugh Cayless adroitly puts it, ["you can't get rid of complexity, you can only move it around."](https://twitter.com/hcayless/status/1541441450512089088)

[^flag]: While this would be a red flag for many developers, perhaps from the standpoint of minimal computing there is something to be said for software that just gets the job done, and doesn't continue to add feature set after feature set?

In my current job at JSTOR Labs we're working on managing the complexity of corpus creation and text analysis with [Constellate](https://constellate.org).
It's been an interesting challenge trying to figure out what complexities we try to manage on behalf of the user, and which we leave for them to manage themselves.
The primary goal of Constellate is to help users learn and teach text analysis.
Beyond being a data provisioner or a cloud computing platform, Constellate offers a structured curriculum of lessons - and expert instructors doing live lessons - in using Python for natural language processing.

Our users are quite advanced by the standards of most JSTOR users: primarily graduate students, researchers, instructors, and librarians.
So they come to our dataset builder with a fair amount of knowledge (and expectation) of advanced searching functionalities like filtering by date, faceting by journal or subject, and complex combinations thereof.
But most are also just starting their text analysis journey.
So they often don't _yet_ have the expertise to work with the data that we provide them in response to these queries.

Thus the design of the entire platform, from search engine UI to data formats and bulk data downloading affordances, needs to accommodate the beginner-to-intermediate user who has worked with a CSV before and knows what a boolean search is, but is just dipping their toes into Python for the first time.
Adding to this, the goal of the platform is to train users to move from beginner to intermediate to advanced; *by design*  we want users outgrow the simplest affordances that we offer for search and data manipulation.
If we're successful, our users will demand bigger corpora and more control over the kind of data they are downloading.

This presents an interesting moving target.
It's tempting to try to design an entirely smooth scaffold from naive beginner to knowledgeable expert, with multiple levels of GUI ranging from simple Google-like search box to complex query editor.
But every additional graphical user interface you make is another set of abstractions that both users and developers now have to keep in their heads.
As we work to balance this tension, we're trying to keep in mind Alan Kay's words: "make simple things simple, and complicated things possible."
If we can design one very clear GUI for most starting users, and make sure that we are clear about its limitations, then it becomes easier for us to ask more advanced users to work directly with Python or another scripting language to write their own more advanced filters on large data dumps (perhaps using more efficient formats like [Parquet](https://arrow.apache.org/docs/python/parquet.html)), rather than try to design a customzed, extra-advanced GUI for them to use.

We're in the midst of revising much of the back-end of Constellate so that it it easier for us to implement these kinds of interfaces, so keep your eyes peeled for updates on our [mailing group](https://ithaka.groups.io/g/tdm-jstor-portico)!
