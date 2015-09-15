---
layout: post
title: "clipr: cross-platform access to the clipboard"
date: "2015-09-02 12:26"
comments: true
tags:
  - R
---

Oddly enough, base R only includes clipboard interaction functions for Windows.
But with a little bit of calling to the command line, we can solve that issue for OS X and Linux.

I'm pleased as punch to introduce my very first R package on CRAN: [clipr], a micropackage with two simple utility functions to read and write from your system clipboard, whether you're running on OS X, Linux, or Windows:

{% highlight r %}
library("clipr")

var <- read_clip()

write_clip(c("Text", "for", "clipboard"), sep = "\n")
{% endhighlight %}

[clipr]: https://cran.r-project.org/web/packages/clipr/index.html
