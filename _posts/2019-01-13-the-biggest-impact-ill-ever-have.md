---
layout: post
title: |
  The biggest impact I'll ever have
date: 2019-01-13 16:26:12
tags:
- code
- R
---

[^abrupt]: For better or worse, _all_ messages from CRAN tend to be abrupt.

[clipr]: https://github.com/mdlincoln/clipr

Last week, I got an abrupt message from CRAN, the R community package repository.[^abrupt]
Due to [a bothersome property of the way clipboards work on some Linux systems](https://github.com/mdlincoln/clipr/issues/38), a little package I wrote a few years ago - [clipr] - to provide cross-platform functions for reading from and writing to the clipboard from R was now in danger of being removed from CRAN.

This is not the first time that I've had to go back in and fix up problems with clipr.
You'd think that a package that has two basic core functions, `read_clip` and `write_clip`, would not need all that much development after its initial release.
Turns out that clipboards are sufficiently non-standard things that trying to properly implement and test such a package on a wide variety of systems had led me through ten (10!) different releases of this micro library prior to last week.
And the last time I had to go through this process, I honestly wondered whether it was worth the effort to keep trying to polish this.
After all, last I'd checked, only one or two other packages were relying on it.
I certainly found it useful in my day-to-day work, but it was really a tiny little set of helper functions, and certainly didn't do anything clever or interesting by the standards of my professional community.

But between early 2018 and now, something big changed.

{% include figure.html src="/assets/images/clipr_downloads.png" caption="Wow, last time I looked at this page, that downloads badge was much, much smaller..." %}

Yes, readr, a key package in the ["tidyverse"](https://www.tidyverse.org/) of data manipulation libraries for R, was now depending on clipr.
Which would explain how little clipr had suddenly shot to having more than 300k downloads per month.
Thankfully, with great responsibility comes great community, or at least it does in the R world.
Maintainers of the packages that were depending on clipr quickly came to my aid, so we could bounce around ideas and approaches for getting clipr back into the good graces of CRAN.

Now, this was hardly a Manhattan Project's worth of effort.
A few hours of coding, mostly spent on trying to engieer and run the right tests on multiple systems, fixed us up just fine.
But it was sobering to realize the sheer number of computers that had now downloaded this tiny library, and would continue to download it as part of its integration with the tidyverse.

It was, and will continue to be, far, far more than have ever downloaded my academic papers