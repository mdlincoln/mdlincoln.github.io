---
layout: post
title: "A Radical, Useable Data Model"
date: "2015-07-22 23:56"
tags:
- Digital humanities
- Code
---

We at [Keystone DH][keydh] were just treated to a crucial keynote address by
Miriam Posner. You can go read it here.

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
we could build some semblance of this kind of model in the graph database?[^new]

[^new]: I'd be quite shocked if I were the first person to think of this.

This has been on my mind as I've been working through revising my practical
[lesson for humanists on how to use SPARQL][sparql], the query language for
graph databases.

Take Miriam's example of the neighborhood.
A simplistic classification of neighborhoods might characterize "Springfield" as "majority African-American", which in RDF syntax would read like this:

    <Springfield> <has_race> <African-American> .

and in

{% include figure.html src="/assets/images-display/radical1.png" caption="A hopelessly simplistic model of race." %}

Somewhat better might be a careful accounting by population:

{% include figure.html src="/assets/images-display/radical2.png" caption="Ok. Ratios." %}

but this does nothing to address the fact of social construction.

 one that she might readily identify as "black", but which another inhabitant
 may instead view as "Haitian" more specifically.

{% include figure.html src="/assets/images-display/radical3.png" caption="A model of race that tries to account for its social construction." %}

{% include figure.html src="/assets/images-display/radical4.png" caption="A model with even more attributes." %}

{% include figure.html src="/assets/images-display/radical5.png" caption="All these models we have? They can live together in the same database." %}

## But is is usable?

Why do all this? For one, we now get multiple answers to the the question "What
are the perceived race(s) of the neighborhood Springfield?"[^query]:

    SELECT ?race
    WHERE {
      <Springfield> has_perceived_race ?race .
    }

gives us the following answers:

| race      |
|-----------|
| "Black"   |
| "Haitian" |
| "Korean"  |


But more than that, we can now ask the kinds of questions that didn't quite make
sense before, such as "To what extent is the racial construction of this
neighborhood contested?"[^contested]

    SELECT ?neighborhood ?diff
    WHERE {
      ?neighborhood has_type <Neighborhood> .
      ?neighborhood has_perceived_race ?perceived_race1 .
      ?neighborhood has_perceived_race ?perceived_race2 .

      ?person1 has_type <Person> .
      ?person2 has_type <Person> .
      ?person1 perceives_race ?perceived_race1 .
      ?person2 perceives_race ?perceived_race2 .

      FILTER (?perceived_race1 != ?perceived_race2)
    }

[^query]: Much like the graphs I've shown here, the following are pseudo-SPARQL queries, so they're lacking the usual baggage of prefixes and URIs. Again, take a look at my [SPARQL tutorial][sparql] to get a rundown on what is going on here.

[^contested]: Yes, this is just one way of counting contested identities --- but it helps us a lot more than just saying something is "particularly" contested, especially since it spurs us to unpack what we mean by "particularly", not to mention "contested".

But this may still sound overly deterministic, not accounting for the vagaries
of time and daily lived experience. It is likely possible to extend our graph
database to begin to factor in time and space, as Miriam suggested (though I'm
not quite sure how to implement that at this moment!) Another option is to
introduce some stochasticity into our queries, such that the same query on the
same data might return a different response, either suggesting 


[keydh]: http://sceti.library.upenn.edu/KeystoneDH

[sparql]: /2014/07/10/sparql-for-humanists.html
