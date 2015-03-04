---
layout: post
comments: true
title: "How did they make that? Extracting data from old plots"
date: 2015-03-03 11:00
tags: 
- Digital Humanities
- Visualization
---

One quote from today's [DHNow] Editor's Choice, ["Researcher Perspectives on Publication and Peer Review of Data"][plos][^1], really stuck out to me.
In surveying how researchers obtained previously-published data, Kratz and Strasser note, "Eight respondents (5%) wrote-in that they had obtained data through a channel we had not considered: extracting data from the text, tables, or figures of a published paper."

I found it necessary to do this a few weeks ago when preparing my talk for CAA on [artistic attention in Amsterdam 1550--1750][caa] as measured by prints from the Rijksmuseum.
Inspired by Miriam Posner's ["How did they make that?"][posner], I wanted to write up the back story behind the [last slide][last] of my presentation, which draws on historical construction expenditure data that had previously been published in a printed book.[^2]
But I wanted more than a picture of the book --- I wanted to compare its underlying data with my own.
[WebPlotDigitizer][wpd] to the rescue!
This is a great browser-based application developed by Ankit Rohatgi, which is available either on a [hosted website][hosted], or which you can download yourself and run in your own browser.

## 1. Load your image

![WebPlotDigitizer axis calibration](/assets/images-display/digitizer_axes.png)

You'll first need to scan your image --- obviously the sharper the better, and try to avoid distortions from book gutters if you can.
When you open WebPlotDigitizer, you can then load your scan.
You'll be prompted to calibrate your axes by clicking on two known points on each axis, and entering the values for each.

## 2. Click all the points!

![WebPlotDigitizer adding points](/assets/images-display/digitizer_points.png)

Start clicking away!
Usefully, there's a zoom window in the upper right corner that helps you more accurately place your cursor.

## 3. View your data

![WebPlotDigitizer data export](/assets/images-display/digitizer_export.png)

Once you're satisfied with all your points, you can download the data as a CSV, or send it off to [plot.ly].

## 4. Interpolate (advanced)

One drawback to manually digitizing your work is that points that are meant to have integer values (e.g. a year like 1604) often come out as real values (e.g. 1604.00325).
You can just round these integers, but depending how carefully you clicked, you may have multiple associated values with each of your rounded points.
*Interpolation* in the programming language of your choice is a useful solution.
This is a simple task with R's `approx()` function:

{% highlight R %}

# Get the column of your already-digital data you wish to match
desired_integers <- my_data$year

# Run the interpolation
interp_points <- approx(
    x = extracted_data$x,
    y = extracted_data$y,
    xout = desired_integers)

# Access the interpolated data
interp_points$x # => Interpolated x values (equal to desired_integers)
interp_points$y # => Interpolated y values

{% endhighlight %}

Voila --- you can now incorporate extracted data from an old printed source into your digital workflow!

![Data from the printed plot replotted using ggplot2](/assets/images-display/guilders_plot.png)

[^1]: John Ernest Kratz and Carly Strasser, “Researcher Perspectives on Publication and Peer Review of Data,” *PLoS ONE* 10, no. 2 (February 23, 2015): e0117619, doi:[10.1371/journal.pone.0117619][plos].

[^2]: Marjolein ’t Hart, “The Glorious City: Monumentalism and Public Space in Seventeenth-Century Amsterdam,” in *Urban Achievement in Early Modern Europe: Golden Ages in Antwerp, Amsterdam, and London*, ed. Patrick Karl O’Brien (Cambridge: Cambridge University Press, 2001), fig. 6.1.

[DHNow]: http://digitalhumanitiesnow.org/

[plos]: http://dx.doi.org/10.1371/journal.pone.0117619

[caa]: /2015/02/15/mapping-artistic-attention-in-amsterdam.html

[wpd]: https://github.com/ankitrohatgi/WebPlotDigitizer

[hosted]: http://arohatgi.info/WebPlotDigitizer/

[plot.ly]: http://plot.ly

[posner]: http://miriamposner.com/blog/how-did-they-make-that/

[last]: https://speakerdeck.com/mdlincoln/artistic-attention-in-amsterdam-1550-1750?slide=15
