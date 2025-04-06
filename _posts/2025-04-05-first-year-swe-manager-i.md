---
layout: post
title: |
  My first year as a software engineering manager, pt. 1
date: 2025-04-05
tags:
  - management
  - code
---

Well it's been over a year since taking on [managing the engineering team at JSTOR Labs](/2024/01/27/managing) and I haven't exactly been posting prolifically on here...
I think I am just better at knowing how much I don't know now, compared to when I began this blog.
I also feel as though I haven't had a lot original to say that hasn't been said elsewhere, better.

It's high time I get this out of my drafts branch, where it's been stewing for almost 5 months now:
In no particular order, here's some things that have been taking up my mind space since 2024:

## Explicit over implicit

Software developers often talk about the benefits of being explicit vs. implicit.
This applies a lot in management work, too.

A small thing I pushed for early this year was making our professional development funding process as transparent as possible to the whole Labs team.
We'd always had a budget for folks for everything from buying books to paying for workshops and classes, and certifications, up to and including tuition towards a degree.
Whether you were an engineer, a designer, or a product owner, all you had to do was ask your manager.
_But you had to know to ask!_
And it was never spelled out what the range of options was, nor what decisionmaking amongst leadership was about how fund bigger ticket requests like a multi-week training across the many folks in our team - something we can gladly fund, but not for every single person each year.
So we made sure to write it down in a shared document: every single person gets a modest amount earmarked annually for educational materials, no questions asked.
For things exceeding that amount, we asked team members to let us know their requests by late January to get priority consideration.

A more difficult adjustment I am still working on making is dealing with the changed nature of my technical advice and suggestions in my new role.
I am trying to be more disciplined about being _explicit_ when I am suggesting a task or story as something for one of our team to consider, and to be equally explicit when I am instructing the team to add a task to their sprint or move it forward in the priority list.
It's important I be able to do both, and to communicate the difference.
For what it's worth, the latter directives are quite rare!

## Prioritize lower priority but high importance code

Because I now get pulled in a lot of different directions in any given day, I need to keep myself _off_ the critical path for hour-to-hour commits that need to happen on our projects.
This means I avoid picking up too many application-feature tickets in our sprints.
The devs on those teams will _always_ be able to work those out faster, and with much better context, than I will.

What I focus on instead is building out or refactoring parts of our codebases that tend to share patterns across our projects: runtime configuration; CICD improvements; logging; dependency upgrades; and the like.

A big part of this has been building out more monitoring - getting our applications to send us better data about how healthy they are, creating dashboards our devs can eyeball to look for behavior patterns,
as well as push alerts when our services start showing unusual behavior.
It has also meant gradually aligning our bouquet of different technical experiments into greater alignment with technologies and patterns the rest of ITHAKA's technology organization is familiar with.

## Developers have user stories too

The engineering teams on our projects are quite small.
Our very largest has only just grown to three software engineers; our smallest is supported currently by just one.
We build on the shoulders of ITHAKA's software deployment platform that supports all of JSTOR, however.
Therefore we don't have to invent our own Kubernetes support, routing, CDNs, autoscaling, logging, monitoring, or networking from scratch.
We get to lean on shared infrastructure teams, and we've been learning how to work better with them this past year.

Specifically, we've been intentionally working to frame all our asks to the core infrastructure and deployment teams in the form of _user stories_.
Developers are used to user stories, usually phrased like:

> As a USER ROLE, I want to be able to DO SOME FUNCTION so that I can accomplish SOME OBJECTIVE

By phrasing it so, teams can capture what kind of user is asking for this, and what the broader context of that feature will be in their workflow, without prescribing _how_ developers will implement that feature.

It's easy to forget this when we're trying to ask our infrastructure teams for advice.

I might say:

> How do I create a ConfigMap instance on our Kubernetes cluster from a value that I've written in to s3?

And our infra team, used to some very heterogeneous tech stacks at ITHAKA, would gamely start trying to work out how best enable that, no matter that it might be an unnecessarily complicated solution to my real underlying need.
Whereas, if I'd asked:

> As a developer on X service, I want my application to read a configuration value from a centrally-managed location on startup so that I can configure every instance to have the correct database host and password.

By not overspecifying an implementation, our infra teams could then come back with advice on the most well-supported golden path for that need, before accidentally adding in requirements we don't actually have.

---

In a follow up to this post, I'll discuss harder things that happened over this first year: sunsetting several of our projects.
