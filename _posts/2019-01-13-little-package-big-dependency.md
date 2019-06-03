---
layout: post
title: |
  Little package, big dependency
date: 2019-01-13 16:26:12
tags:
- code
- R
---

[^abrupt]: For better or worse, [_all_ messages from CRAN tend to be abrupt](http://r-pkgs.had.co.nz/release.html#release-submission).

[clipr]: https://github.com/mdlincoln/clipr

Last week, I got an abrupt message from CRAN, the R community package repository.[^abrupt]
Due to [a bothersome property of the way clipboards work on some Linux systems](https://github.com/mdlincoln/clipr/issues/38), [clipr], a little package I wrote a few years ago to provide cross-platform functions for reading from and writing to the clipboard from R, was now in danger of being summarily removed from CRAN.

This is not the first time that I've had to go back in and fix up problems with clipr.
You'd think that a package that has two basic core functions, `read_clip` and `write_clip`, would not need all that much development after its initial release.
Turns out that clipboards are sufficiently non-standard things that trying to properly implement and test such a package on a wide variety of platforms had led me through ten (10!) different releases of this micro library prior to last week.
And the last time I had to go through this process, I honestly wondered whether it was worth the effort to keep trying to polish this.
After all, last I'd checked, only one or two other packages were relying on it.
I certainly found it useful in my day-to-day work, but it was really just a tiny little set of helper functions, and certainly didn't do anything clever or interesting by the standards of my professional community.

But between early 2018 and now, something big changed.

{% include figure.html src="/assets/images/clipr_downloads.png" caption="Wow, last time I looked at this page, that downloads badge was much, much smaller..." %}

Yes, readr, a key package in the ["tidyverse"](https://www.tidyverse.org/) of data manipulation libraries for R, was now depending on clipr.
Which would explain how little clipr had suddenly shot to having more than 300k downloads per month.
Thankfully, with great responsibility comes great community, or at least it does in the R world.
Maintainers of the packages that were depending on clipr quickly came to my aid, so we could bounce around ideas and approaches for getting clipr back into the good graces of CRAN.

Now, this was hardly a Manhattan Project's worth of effort.
A few hours of coding, mostly spent on trying to engineer and run the right tests on multiple systems, fixed us up just fine.
But it was sobering to realize the sheer number of computers that had now downloaded this tiny library, and would continue to download it as part of its integration with the tidyverse.
Yes, many of those downloads are totally automated CI builds, and many users who download readr won't ever exercise its functions that call clipr; but now that it's tied into that and other more user-facing packages, the impact of a broken or disappeared clipr is no less strong.

It was, and will certainly continue to be, far, far more than have ever downloaded my academic papers.
By sheer numbers, it probably even beats the eyes on my technical work on [_The Programming Historian_](https://programminghistorian.org/).
And it's been funny for me to think about this in the context of my recent job shift from the Getty to Carnegie Mellon University - from the world of art historical post-doc-ery to being a research programmer and software developer for the libraries and the humanities college here.

There is little reason to try and produce a minimally-functioning piece of scholarship.
Not because no one will read it (plenty of maximally-functioning pieces of scholarship aren't read, either!) but because scholarship, especially in the humanities, isn't componentizable like a set of software functions.
While it's true that we academics talk a lot about the "building blocks of prior scholarship", and we do sometimes use references to major well-known pieces as a kind of shorthand to sketch out either evidentiary or theoretical frameworks that we rely on, those practices have only a rhetorical resemblance to a software engineer importing a code library.
You don't get points in the humanities for creating small, tidy arguments whose primary purpose is to be used as components of larger arguments.
You get points for big, expansive, completist arguments, the best of which suggest new paths for inquiry that will exist adjacent to, rather than as structure on top of, your work.
Yet producing tight, highly focused software that does a few things well is generally considered a boon in SWE.

Balancing between the scholarly drive to extend the possibilities of our community through unique and non-standard digital humanities projects, and the programmer's drive to cement capability through reusable products, is going to be one of my biggest personal goals here at CMU.[^rsk]
clipr isn't nearly interesting enough to be part of that work directly, being at once way too small and also way too big.
But it's a nice, and now very popular, mile-marker for me to think about when designing the work that we are going to build out here.

[^rsk]: Rebecca Sutton Koeser and Benjamin Hicks spoke about this last summer: "Bridging Digital Humanities Internal and Open Source Software Projects through Reusable Building Blocks" (DH 2018, Mexico City: Alliance of Digital Humanities Organizations, 2018), <https://cdh.princeton.edu/updates/2018/06/29/dh2018-reusable-software/>.
