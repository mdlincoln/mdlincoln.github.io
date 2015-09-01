---
layout: post
title: "Setup RStudio and Shiny Servers on Digital Ocean"
date: "2015-08-31 16:42"
comments: true
tags:
  - R
---

I use [Digital Ocean] a lot in my own research work when I need to run a big parallel computation job.
But I've also used it when teaching R, as it's a great way to spin up an [RStudio server](https://www.rstudio.com/products/rstudio/download-server/) that students can log into and work on without having to set up their own development environments.

Setting up RStudio server on DO [can be involved](http://deanattali.com/2015/05/09/setup-rstudio-shiny-server-digital-ocean/), but a large amount of that work can be done automatically with this `cloud-config` script I've written.
Just paste it into the "User Data" section when starting a droplet on Ubuntu 14.04.

(N.B. that the R packages here probably require at least 1GB of RAM to compile, so the lowest you can go is the second-smallest DO instance.)

<script src="https://gist.github.com/mdlincoln/1f40f4e88ce32c55b5f3.js"></script>
