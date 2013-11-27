---
layout: post
comments: true
title: Sharing DH Code
date: 2013-11-27 14:05:14.699164
tags: 
- Museums
- Code
- Digital Humanities
---

I have finally gotten around to [releasing the code](https://github.com/mdlincoln/saam) I used to generate my [iconography network graph](/2013/11/12/networks-of-the-smithsonian-american-art-museum.html) of the Smithsonian American Art Museum. 
Some more charts of the trends in various keywords over time [can be found here](https://docs.google.com/spreadsheet/ccc?key=0AsjvWNf_U5QbdF9fbVBUM1FIMXVlMU5WVTlEX2pqckE&usp=sharing).

[![SAAM collection iconography trends](/assets/images-display/saam_trends.png)](/assets/images/saam_trends.png)

I had meant to push this out in time for the [Archives of American Art symposium](/2013/11/15/american-art-history-and-digital-scholarship.html), but things got put on the back burner and when the symposium arrived, I realized I hadn't put much of any commenting or documentation in the repository at all -- neither in careful commenting in the source code, nor in a `README` file.
This is a no-no of course -- you really should be good about commenting as you code, especially for the benefit of *future*-you.
But it's especially vital when sharing your code with others.

There is a plethora of advice (even some [advocating no comments at all!](www.codinghorror.com/blog/2008/07/coding-without-comments.html)) available for documenting more conventional software projects that must remain legible to future developers and maintainers.
Facilitating future development is, of course, fundamental to academic work:
you want people to build their own scholarship off of your own -- and cite it in the process!
But an additional goal is also to make sure that someone may come along later and simply *reproduce* what you did, so that they might verify or refute claims supported by computational results.

As I finally got around to (at least partially) documenting the SAAM project doe, I got curious if there are any other sources out there for best practices for uploading code made for digital humanities work -- or any kind of academic project, for that matter.
This question will only become more pressing as more and more journals are moving to GitHub or the like as [code repositories](http://caseybergman.wordpress.com/2012/11/08/on-the-preservation-of-published-bioinformatics-code-on-github/), making the sharing of academic code a publishing norm.

A new article in *PLoS Computational Biology* on ["Ten Simple Rules for Reproducible Computational Research"](http://dx.doi.org/10.1371/journal.pcbi.1003285) establishes several good precepts for documenting not only the code itself, but your process in developing and using the code on your datasets.
Among the rules include documenting exactly *how* you reach every result, preferably doing so not just in a textual description but also recording it programmatically --
that is, writing a small script (or [Rakefile](rake.rubyforge.org)) that will run your scripts in the proper order and on the proper files, automating the reproduction process.
The authors also recommend you avoid manual manipulation of data in favor of programmatic manipulation, in order to reduce the number of manual steps that one must correctly take in order to reproduce your results.
(Lincoln Mullen has similarly suggested the need for programmatic data manipulation over at [DHAnswers](http://digitalhumanities.org/answers/topic/what-are-the-best-practices-for-data-curation-in-github).)

If you know of any other resources on best academic data/code practices, please let me know in the comments!
