---
layout: post
comments: true
title: Parsing the Smithsonian
date: 2013-08-09 13:57:32.265622
tags:
- Code
- Museums
- Linked Open Data
- Digital Humanities
---

[Yesterday I posted](http://matthewlincoln.net/2013/08/08/scraping-the-smithsonian.html) about a Ruby script I published for scraping information from [collections.si.edu](http://collections.si.edu). Today I [pushed a sister script , `si-parse.rb`](https://github.com/mdlincoln/si-scrape), that will turn `si-scrape.rb`'s raw HTML output into well-formed JSON.

I'd initially wanted to try and make this tool as friendly to tech-uncomfortable humanities scholars as possible, and have it spit out a CSV that could be opened and manipulated in Excel. However, to do that would not just mean flattening the Smithsonian data, but squashing it completely. Even a carefully-limited query on [collections.si.edu](http://collections.si.edu) could return you a list containing paintings side by side with airplane models, oral history transcripts, articles of clothing, photographs, and library catalog records. A two-dimensional table would have hundreds of thousands of unused cells, as rows describing paintings would have to leave room for video duration tags, call numbers, or industrial manufacturer descriptions required by other objects.

Rather than try to anticipate multiple cases of desired functionality, and thus potentially limit the tool's *actual* functionality, I elected to dump everything into the flexible [JSON format](http://json.org), which can reliably describe objects with heterogeneous metadata, and comes standard with the ability to handle data fields with multiple values (such as a "topic" field with multiple assigned keywords). I'm already trying out all kinds of ways to search and interpret this data, and it works like a charm.

But what average scholar in the humanities would know what to do with this output?

![computer confusion](http://i3.kym-cdn.com/photos/images/newsfeed/000/241/713/0fb.gif)

I was reminded of a minor debate that came up during a session from this June's THATCamp Prime on scripting languages ([notes available here](http://chnm2013.thatcamp.org/notepads/scripting-for-humanists/)) proposed by [Lincoln Mullen](http://lincolnmullen.com/blog/report-from-thatcamp/). There was some back and forth about whether or not the most tech-savy in the DH sphere ought to work harder to make easy to use interfaces for their tools, or whether it is instead better to ask scholars interested in digital approaches to roll up their sleeves and get (at least somewhat) familiar with computing details.

At first I felt the former attitude was the more productive one. If we are to spread digital humanities practices through the academy, shouldn't we strive to make our tools as accessible as possible? Yet a counter-argument was raised that, just as many programs require their students gain competency in applicable foreign languages, shouldn't it be acceptable to ask a budding digital humanist to learn applicable coding languages?

Humanities scholars are (rightly) fond of saying that they embrace complex arguments that can't be boiled down to a bumper sticker or a bullet point. Perhaps they will increasingly come to embrace not only vital complexity in digital methodologies, but also their own capacity to learn these tools and bend them to their own needs. Some fantastic resources, like Jason Heppler's [Rubyist Historian](http://jasonheppler.org/rubyist-historian/), are already helping to bridge this knowledge gap. I anticipate (hope?) that as more and more DH projects filter into traditional venues like the MLA or CAA conferences, we will see not only a rise in *acceptance* of these projects as legitimate academic production, but also a rise in the *literacies* needed to both create and critique them.



