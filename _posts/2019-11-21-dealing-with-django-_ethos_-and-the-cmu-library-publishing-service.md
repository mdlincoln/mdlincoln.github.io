---
title: 'Dealing with Django: _ETHOS_ and the CMU Library Publishing Service'
date: 2019-12-05T20:23:36.632Z
tags:
  - CMU DH
  - Code
  - Publishing
  - LAM
layout: post
aside: >-
  This is part of a series of posts proudly showing off the projects our team
  has worked on during my first 18 months at Carnegie Mellon University.


  [See all posts in the series](/tags/digital_humanities.html)
---
When I interviewed for this job, I made clear that web development was the least developed corner of my programming skills.
In fact, one of the main reasons the CMU position was so appealing to me was that it was a chance to build a broader foundation of skills.
Between my dissertation work and the Getty, I'd had nearly 5 years of data transformation work; but had never once really set up a web server or had to deal with things like object-relational-mappers or routing or views, and so on and so on.

So my first major web project, the [_Encyclopedia for the History of Science_, or _ETHOS_](https://lps.library.cmu.edu/ETHOS) (General editor: [Christopher Phillips](https://www.cmu.edu/dietrich/history/people/faculty/phillips.html)), was like getting tossed into the lake and told to swim (except, like, **way** less abusive.) 

![Screenshot of the front page of the Encyclopedia of the History of Science](/assets/images/ethos.png)

Luckily, this wasn't a project done totally from scratch. The team had already settled on using the open source journal platform [Janeway](https://janeway.systems/) because it was based in plain simple Django, which meant it was far easier to build custom modules for behavior like [creating versioned articles](https://github.com/cmu-lib/archive_plugin) or using [Pandoc to convert MS Word manuscripts into display-ready HTML](https://github.com/BirkbeckCTP/pandoc_plugin) without needing to touch the core software itself. 

The reason this was so crucial is that our installation of Janeway would not just be dedicated to _ETHOS_, but would in fact become a core service for the nascent [CMU Library Publishing Service](https://lps.library.cmu.edu), with plans to support the production and publishing of several CMU-affiliated journals.
Because we were keeping an eye on this several years down the road, it was a priority for our platform to be relatively modular, letting us build out custom capabilities for select publications while still keeping our core deployment of Janeway up to date with new code coming in from the hardworking team at Birkbeck CTP.

This was also one of the roughly 50% of projects (so far) where I had fellow collaborators contributing code, rather than being the sole dev for a project. For _ETHOS_, it was actually quite the team: not only did we have the core Janeway developers actively updating the core system, as well as my predecessors at CMU Dan Evans and Drew Stimson but we also had just hired a new staff programmer at CMU Libraries, [Jonathan Kiritharan](https://library.cmu.edu/about/people/jonathan-kiritharan), who had the immense task of joining the project and coming up to speed just three months before its soft launch. Jonathan would be taking responsibility for supporting the service in production for future journals as well. Beyond even that, as a marker of how much work is really needed to create the polished sites that you enjoy on a daily basis, we contracted a crack frontend developer here in Pittsburgh, [Patrick Fulton](https://twitter.com/patrickfulton), to render [Heidi Bartlett's](https://library.cmu.edu/about/people/heidi-bartlett) designs into the styled website you see now.

