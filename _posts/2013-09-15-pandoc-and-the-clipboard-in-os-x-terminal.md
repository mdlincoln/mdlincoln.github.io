---
layout: post
comments: true
title: Pandoc and the clipboard in OS X Terminal
date: 2013-09-15 17:15:40.244374
tags:
- Code
---

If you use [Markdown][md] with any frequency, you've likely heard of the command line utility [Pandoc][pandoc] that does a fantastic job of translating between Markdown and a host of formats from HTML to MS Word to EPUB. There's lots of plugins out there to fit Markdown and Pandoc into your favorite text editor, but it can be useful to have the tool ready at hand no matter what variety of apps you're using.

I use this scrap of bash code to let me copy any snippet of Markdown to the OS X clipboard and "pipe" the copied text into Pandoc. Not too many tutorials on using the OS X clipboard and Terminal mention that you can pipe the output of that program right back into the clipboard *in one go*:

{% highlight bash %}
pbpaste | pandoc -f markdown -t html | pbcopy
{% endhighlight %}

To make it dead easy on yourself, add this snippet as an alias in your `~/.bash_profile` ([what does that mean?][terminal]) like so:


{% highlight bash %}
alias md="pbpaste | pandoc -f markdown -t html | pbcopy; echo 'Conversion done.'"
{% endhighlight %}

So now I just need to type `md` to swap the Markdown in my clipboard for HTML, ready to be pasted down anywhere.


[md]: http://daringfireball.net/projects/Markdown/

[pandoc]: http://johnmacfarlane.net/pandoc/

[terminal]: http://mac.tutsplus.com/tutorials/terminal/speed-up-your-terminal-workflow-with-command-aliases-and-profile/