---
layout: post
title: "DataGIFs: Animate Your Visualizations for Fun and Clarity"
date: "2015-12-18 09:00"
tags:
- Visualization
- R
- Code
---

After running into this neat experiment with [animation and ggplot][ggplot] tucked away in one of Hadley Wickham's wikis, I decided to try my hand at some data animations in the form of GIFs.

[ggplot]: https://github.com/hadley/ggplot2/wiki/Using-ggplot2-animations-to-demonstrate-several-parallel-numerical-experiments-in-a-single-layout

[animation]: https://cran.r-project.org/package=animation

With the help of the [animation] package, it's easy to write a loop that creates the plots for your animation, and have R handle getting every frame in the right order and saving the file.
I tried this out on a [dataset of European urban populations between 1500 and 1800][europop] as a way to animate the shift in population share from Italian cities to northern centers in Paris, Amsterdam, and London.

{% include figure.html src="/assets/images-display/europop.gif" caption="Urban populations in Europe, 1500-1800. The size of each point indicates that city's share of the total urban population at that year. [See code here.](https://gist.github.com/mdlincoln/b5d1045b0d48d769b565)" %}

[europop]: https://github.com/mdlincoln/europop

Now, you could do a much flashier, interactive version of this on a website using [Shiny](http://shiny.rstudio.com/) or some other kind of Javascript.
However, I think the GIF is superior in certain contexts.
You can simply drop it into your PowerPoint, and it's there.
When giving a presentation, it's begging for trouble to switch out of PowerPoint to get to your fancy interactive site.
It is also easily embeddable in a Twitter, Facebook, or Slack post, or even (gasp!) a regular old blog like this.

Moreover, _looping_ animation makes perfect sense for our purposes.
While I might want to show detailed still images when doing a more lengthy presentation of results, here there is just a simple point I need to get across via comparison of 6 different maps.
With the loop, the audience doesn't need to catch all of it the first time.
Instead, as they are used to doing with GIFs, they can watch the entire animation several times in a few seconds and register the population shift being shown.

{% include figure.html src='/assets/images-display/range_simulation.gif' caption='Illustrating the process of simulation replication to determine a range of values. [See code here.](https://gist.github.com/mdlincoln/102cb07100238649fde3)' %}

I've also been interested in using animation to elucidate _how_ I arrive at some of the visualizations I show.
The idea of stochastic simulation --- a simulation with an element of chance --- is certainly novel for most humanists.
By running a stochastic simulation multiple times, we can chart the distribution of values that simulation might return.
Instead of just showing the finished product, I can also animate the process of arriving at that final visualization.
The GIF provides a visual explanation that can be seen in parallel with my spoken explanation, making it easier to progress from methodology discussion onto results and analysis.
