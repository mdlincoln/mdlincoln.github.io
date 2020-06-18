---
layout: post
title: |
  Leaving _The Programming Historian_
date: 2020-06-18
tags:
  - code
  - publishing
---

It's been my pleasure to serve as an editor, technical advisor, and eventually technical team leader for _The Programming Historian_ since 2017.
After three very busy and eventful years, I've decided to step down from the project team and hand the programming reins to others in our capable technical group, which will now led by Zoe LeBlanc.

I came on at the tail end of a tremendous redesign of the entire website headed up by Fred Gibbs and Amanda Visconti. [Take a stroll in the Wayback Machine to see what we looked like before we merged the extensive rewrite of our templates and styling:](https://web.archive.org/web/20170620222904/http://programminghistorian.org/)

{% include figure.html src="/assets/images-display/ph_before_and_after.png" caption="programminghistorian.org before the style rewrite (left) and after (right)" %}


I want to reflect on why I'm deciding to leave at this time, but also, frankly, to brag about the accomplishments of our technical team over the past three years. *PH* has expanded enormously over my short time working on it, and I want to raise up the work that I and my talented colleagues have done on the back end to bring things to where they are today.

## Metadata and link validation

All of our site relies on carefully formatted metadata in each of the lesson text files, and soon after I arrived, it was apparent that the ever-growing editorial team and number of lessons were causing lots of metadata headaches because we ran on Jekyll instead of a relational database with its guarantees of data validation and consistency.

One of my first big technical undertakings was to [create a script that would validate metadata](https://programminghistorian.org/posts/infrastructure-at-ph) on lessons and provide helpful error message if an editor forgot to include the `reviewers` field or incorrectly spelled a `category` label. This same script also began periodically checking for dead links in lessons. By 2020 we find that we need to replace two to three links every month with pointers to web archives like the Internet Archive.

## Lesson Retirement Mechanisms

Technical tutorials go stale fast, and we were increasingly faced with lessons that had fundamentally broken because of chagnes in software, or changes to third-party services (such as the betrayal of the British Museum in destroying its published Linked Open Data, thus [breaking my own very popular lesson on SPARQL](https://programminghistorian.org/en/lessons/retired/graph-databases-and-SPARQL).)

Sometimes we had the bandwidth to keep these lessons updated, but there was no way that we could commit to continually update now over 100+ lessons. We didn't want to pull down "broken" lessons completely, so [instead I worked to implement a technical system (along with guidelines developed by the entire team)](https://programminghistorian.org/posts/retirement-and-sustainability-policies) to "retire" lessons, pulling them from the public lesson directory but keeping their old links active and explaining why the lesson is no longer usable in its entirety. We have found this compromise respects the sustainability of the project by keeping our pages published and on the record, while also acknowledging that our labor is ultimately limited.

## A Fully-Multilingual *PH*

*PH* had just begun to publish Spanish translations in late 2016.
At that point, the team had structured its workflows as well as the website to accommodate just translations of lessons _from_ English _into_ Spanish.
By late 2018 however, we had begun serious discussions about how to accommodate French translations.
Not only was our data architecture not prepared to support that, but nor could it handle the translation of original Spanish or French lessons into other languages.
This bias towards English was baked into our URLs as well. To that point, everything under `programminghistorian.org` was English, and *PH en español* was tucked under `programminghistorian.org/es`.

So as we [prepared to bring on *PH en français*](https://programminghistorian.org/posts/bienvenue-ph-fr), I did a full re-work of our code behind the scenes to make *PH* language-agnostic. As with all our endeavors, this went beyond coding. It involved the work of the entire team thinking through how we wanted to divvy up editorial teams and begin to manage our varied identities, even as far as now needing multiple ISSN nubmers!

I am happy to say that [all of my work on this](/2020/03/01/multilingual-jekyll.html) was supported by my employer, Carnegie Mellon University Libraries, under a major DH grant by the Andrew W. Mellon foundation. Without that institutional commitment, it would have been many dozens of totally-volunteered hours of my time. (You may notice on the [Project Team](https://programminghistorian.org/en/project-team) page that *PH* now acknowledges where our team members come with very different levels of institutional support, in the hopes of making sure this labor is duly acknowledged, and to push more institutions to actively support the work of our team by making it part of their regular duties.)

## DOIs

For a very long time the team had gone back and forth over the feasibility as well as the appropriateness of getting DOIs for our lessons. Not only had we lacked a true financial & institutional foundation (DOIs cost money after all), but, as I mentioned above, we had long been in the habit of updating lessons, sometimes substantially - to the point that they might be said to be new "objects" replacing the original objects living at those URLs.

However we couldn't ignore the benefits of integrating *PH* into the larger scholarly ecosystem, so working with James Baker and University of Sussex Libraries, we [just earlier this spring put a DOI workflow in to action](https://programminghistorian.org/posts/dois-for-ph) including new editorial policies governing how we make updates. I don't want to [look at CrossRef XML ever again](https://twitter.com/matthewdlincoln/status/1260608231837220865) after diong this, but I'm glad I now know how to do it, and even more glad that *PH* now has this piece of data infrastructure in place for the foreseeable future.

## Full-Text Search

This one doesn't really "belong" to me at al, but it was one of my great joys over the past few months to work with Zoe LeBlanc as she developed and implemented a system that would allow [full-text searching of all our lessons](https://programminghistorian.org/posts/full-text-search).

I'm a bit of a [solo dev shop at CMU](/2019/07/27/whats-in-a-name.html), so it's a rare treat to be able to talk through architectural options and to review code with another hotshot DH developer - especially one who has much more JavaScript-fu than myself!

## Farewell but not goodbye

As much fun as it has been to work on *PH*, there comes a time when you've learned about all there is to learn from a job. I'm over the moon that Zoe will be taking over for me as leader of the technical team, and that I can finally move my name onto the [*PH* project team alumni wall](https://programminghistorian.org/en/project-team#project-team-membership-history). In terms of number of readers, I'm pleased to think that my work on *PH* has directly impacted many thousands of learners, far beyond any of the "scholarly" research publications that would go on a formal CV.

I'll close with the note I sent to the rest of the team today:

>At the end of the day it's not shiny full text search or smooth interfaces or DOIs or banners that bring people to PH - it's the lessons that you all have authored, edited, reviewed, and translated. I've watched the project team struggle over the past few years (often to good effect) to adapt its organization and structure to meet the demands of a much larger and decentralized group of editors. At the risk of pontificating, I'd leave you all with the advice (and maybe also the warning) to remember that the heart of the work is in these lessons, not in our website or in our promotional materials. The total labor to support that core mission through organizational, outreach, and technical endeavors should never exceed the total labor of actually shepherding these lessons from submission to publication. I know that everyone has been thinking carefully about this balance over the past year. I am so pleased to have been a part of a group that takes that kind of critical self-reflection seriously, even when it is challenging.
>
>I wish you all the best, and I look forward to submitting a lesson or doing a peer review again (well, maybe after a little vacation :) It's been too long since I've seen that side of the project.

If *The Programming Historian* has been useful for your own research or teaching, and you have the capability, [they would love to have your support](https://programminghistorian.org/en/support-us).
