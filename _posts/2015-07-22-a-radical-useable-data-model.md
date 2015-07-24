---
layout: post
title: "A Radical, Useable Data Model"
date: "2015-07-22 23:56"
tags:
- Digital humanities
- Code
---

We at [Keystone DH][keydh] were just treated to a crucial keynote address by
Miriam Posner. [You can go read it here.][posnerkey]

Go. Now.

Done?

Ok.

I find myself both chastened and enlivened by her call for decentering,
weird-making data models; models that resist categorical ontologies and the
filling in of forms with one line per question, black or blue pen only.

Of all her examples, I was most struck by the idea of how to model highly
contingent and contextual properties of our lived experience, such as race,
gender, or sexuality. To offer an ever-extending list of possible values (Miriam
pointed to the voluminous Facebook gender selection field) avoids the fact that
these aren't atomic attributes bound to a person's existence. The real rub is
these attributes are constructed entirely from social context; they only become
sensible when viewed from a particular perspective seated in personal identity,
in time, and in space/place. And as we know, those perspectives tend to provide
very different views.

As part of the talk, Miriam wondered whether existing tools and models can be
repurposed to suit these kinds of radical data models, or whether we need to
fundamentally rewrite them. I don't have a definitive answer for this, but I
would like to walk through a bit of a thought experiment in this post: what if
we could build some semblance of this kind of model in the graph database?^[I'd
be quite shocked if I were the first person to think of this.]

This has been on my mind as I've been working through revising my practical
[lesson for humanists on how to use SPARQL][sparql], the query language for
graph databases.

Take Miriam's example of the neighborhood.
A simplistic classification of neighborhoods might assign it characterize the neighborhood as "majority African-American"


 one that she might readily identify as "black", but which another inhabitant may instead view as "Haitian" more specifically.

[posnerkey]:

[keydh]: sceti.library.upenn.edu/KeystoneDH/
