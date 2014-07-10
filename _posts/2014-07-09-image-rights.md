---
layout: post
comments: true
title: "Image rights, Europeana, and SPARQL"
date: 2014-07-09 22:08
tags: 
- Libraries
- Archives
- Code
---

As I noted in my [previous post](/2014/06/30/the-things-they-dont-teach-you-image-rights.html), image rights are a perennial challenge for all scholars, and art historians in particular.
I've been following the Getty/George Mason summer institute ["Rebuidling the Portfolio: DH for Art Historians"](http://arthistory2014.doingdh.org/) on Twitter at [`#doingdah14`](https://twitter.com/search?f=realtime&q=%23doingdah14&src=typd), where the participants spent some time exploring the intersecting problems of image copyright and online image search.

One growing resource for images is [Europeana](http://europeana.eu/), an aggregation service that is slowly working to build a massive database encompassing the holdings of Europe's many "memory institutions".

One of the many ways you can facet your Europeana search is by copyright status.
If I search for [images with the term "landscape"](http://europeana.eu/portal/search.html?query=landscape&rows=24&qf=TYPE%3AIMAGE), the left sidebar allows me to further refine by specific copyright status, and by the more overarching categories of "Can I use it?"

<figure>
<a href="/assets/images/europeana_search.png"><img src="/assets/images-display/europeana_search.png" alt="Europeana search screenshot" /></a>
<figcaption>Europeana search screen, with faceted sidebar.</figcaption>
</figure>

If you are searching Europeana for individual images, going through this visual interface is the easiest way.
However, what if I want to see how copyright status breaks down by contributing institution, or by medium, or by date of creation?
For this kind of query, we can't just look at a list of results.
We need to count, or *aggregate* them.

This is where SPARQL comes in.




    PREFIX dc:  <http://purl.org/dc/elements/1.1/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX edm: <http://www.europeana.eu/schemas/edm/>
    PREFIX ens: <http://www.europeana.eu/schemas/edm/>
    PREFIX ore: <http://www.openarchives.org/ore/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT DISTINCT ?edmrights ?provider (COUNT(*) as ?count)
    WHERE {
    ?agg rdf:type ore:Aggregation .
    ?agg edm:dataProvider ?provider .
    ?agg edm:rights ?edmrights .
    ?agg dc:rights ?dcrights .

    ?proxy ore:proxyIn ?agg .
    ?proxy edm:type "IMAGE" .
    }
    GROUP BY ?edmrights ?provider
    ORDER BY ?provider DESC(?count)
