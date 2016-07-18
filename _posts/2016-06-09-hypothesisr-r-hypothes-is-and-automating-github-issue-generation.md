---
layout: "post"
title: "hypothesisr: R, hypothes.is, and Automating GitHub Issue Generation"
date: "2016-06-09 13:42"
comments: true
tags:
  - R
  - code
---

[hypothes.is]: http://hypothes.is

[hapi]: https://h.readthedocs.io/en/latest/api

[gapi]: https://github.com/cscheid/rgithub

[hypothesisr]: https://github.com/mdlincoln/hypothesisr

[phissues]: https://github.com/mdlincoln/ph_annotations

[phgh]: https://github.com/programminghistorian/jekyll

The web annotation layer [hypothes.is] has a [relatively simple API][hapi] for searching, creating, reading, updating, and deleting annotations.
As a personal coding exercise, I just completed an R wrapper for interacting with this API: [hypothesisr]

[You can read about the package's capabilities more in-depth on its GitHub page.][hypothesisr]
However, in this post I wanted to demonstrate using [hypothesisr] along with another R wrapper for the [GitHub API][gapi] as a way of harvesting annotations to create project repo issues.

[_The Programming Historian_](http://programminghistorian.org), (a journal [I contribute to](http://programminghistorian.org/lessons/graph-databases-and-SPARQL)) has encouraged readers to use [hypothes.is] as a way of commenting on lessons that can be a little bit easier than using the GitHub issue submission system.
To date, however, editors of _PH_ have had to manually review annotations and then write their own issues on the [_PH_ GitHub repository][phgh].
Using my new API wrapper, I wanted to see if I could [automate issue creation and initial annotation responses][phissues].

[Here's what an annotation on a _PH_ lesson might look like](https://hyp.is/yLYvAC5oEear4MfPQurdUA/programminghistorian.org/lessons/sonification):

{% include figure.html src="/assets/images-display/ph_annotation_1.png" caption="A hypothes.is annotation in the context of the target webpage." %}

The script I composed will use [hypothesisr]'s `hs_search_all()` function to search for annotations on the `programminghistorian` domain, keep those that were added after the last time it was run, and then [construct a new issue](https://github.com/programminghistorian/jekyll/issues/258) for each annotation on the [_PH_ Github repository][phgh].

{% include figure.html src="/assets/images-display/ph_annotation_2.png" caption="The auto-generated issue includes the title of the lesson annotated, the highlighted text, as well as the text of the annotation itself, with a link to the annotation _in context_ on the lesson page." %}

While this annotation has now been brought to the attention of the editors, we also want to let the annotator know that their contribution has been noted, and may be responded to.
Using the `hs_reply()` utility in [hypothesisr], the script now posts a reply to the original comment with a link to the newly-opened issue.

{% include figure.html src="/assets/images-display/ph_annotation_3.png" caption="A response annotation is generated with a link to the new GitHub issue." %}

The script ends by saving to disk the date-time on which it was run.
When run again, it will check that last-run time and exclude any annotations added before that time.

This is a highly-breakable, not-production-ready script, and could certainly be improved in many ways.
Perhaps you would like to only generate issues in response to annotations bearing particular tags, etc.
The work of _substantively_ responding to these annotations & issues remains, of course, up to the human authors and editors --- as it should.
I'm mostly interested in showing how small bit of connective tissue like this that can help, in a small way, to interconnect different communication channels.

Meanwhile, I'll be submitting [hypothesisr] to [CRAN](https://cran.r-project.org/) soon, so please try it out and [report any issues you find](https://github.com/mdlincoln/hypothesisr/issues).
