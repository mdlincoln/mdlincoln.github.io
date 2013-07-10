---
title: Environmentally-friendly print.css
layout: post
date: 2013-07-10
tags: github, humor
---

I ran accross [this stylesheet](https://github.com/golman/print.css) by David Bushell while searching for a simple CSS for printing.
	
	@media only print
		{
		    /* hide every element within the body */
		    body * { display: none !important; }
		    /* add a friendy reminder not to waste paper after the body */
		    body:after { content: "Don't waste paper!"; }
		}

Har har har.