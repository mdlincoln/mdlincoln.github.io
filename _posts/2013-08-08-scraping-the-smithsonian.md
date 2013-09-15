---
layout: post
comments: true
title: Scraping the Smithsonian
date: 2013-08-08 13:48:16.418143
tags:
- Code
- Museums
- Linked Open Data
- Visualization
- Digital Humanities
---

<aside>
<p>See the <a href="/projects/scraping-the-smithsonian.html">related project page</a>.</p>
</aside>

I'm proud to push one of my first real forays into digital humanities toolmaking to GitHub today: [si-scrape](https://github.com/mdlincoln/si-scrape), a Ruby script that scrapes data off of the Smithsonian Institution's collection web portal [collections.si.edu](http://collections.si.edu).

It's a quick and dirty implementation at the moment (one that will be happily outdated once the Smithsonian finishes deploying a [Linked Open Data](http://en.wikipedia.org/wiki/Linked_data) interface!) but it could hopefully serve as a model for web-scraping other institutions whose public-facing collection websites are at least partially machine-readable.

All you need to run it is the URL that [collections.si.edu](http://collections.si.edu) generates once you define a search query. For example, searching for objects of the type `Works of Art` that feature the keyword `"space"` generates this URL: 

	http://collections.si.edu/search/results.htm?tag.cstype=all&q=space&fq=object_type:%22Works+of+art%22

Plug this URL into `si-scrape.rb` and it will deliver a ~50 MB HTML file that concatenates all the returned records that [collections.si.edu](http://collections.si.edu) normally paginates over hundreds of pages. You can then further parse this HTML to pull out the desired data. The Smithsonian has done rather well with this web interface; almost all of the metadata fields for a given object have been nicely tagged in the HTML so that you can easily have the computer hunt down `date`, `title`, or `topic` classes.

I intend to make future versions of this script that will output a flat CSV that one can open and manipulate in Excel, making this script more accessible to the broader humanities community that doesn't care to fumble with Ruby and [Nokogiri](http://nokogiri.org). Such an implementation would need to be flexible enough to accept the huge range of metadata fields that the Smithsonian's expansive and diverse collections demand. More experienced Ruby wranglers are [welcome to contribute](https://github.com/mdlincoln/si-scrape)!

I'm already using this script to do some bulk processing of the keyword schemae in the Smithsonian art collections. In a future post I'll be talking a bit more in depth about that, but for now here is a pretty teaser of a topic co-occurrence map of the Smithsonian American Art Museum's painting collection, all of it collected using `si-scrape.rb`:

![](/assets/images-display/saam_dated_full.png)

[Download the full ~15MB image](/assets/images/saam_dated_full.png)

P.S. And yes, I got the idea for this [while I was in the shower yesterday](http://www.phdcomics.com/comics.php?f=1617).

P.P.S. And it's gotten added in to the [Muse-Tech-Central list](https://github.com/MuseCompNet/muse-tech-central)!
