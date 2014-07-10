---
layout: post
comments: true
title: "SPARQL for humanists"
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
We need to *aggregate* them.

This is where SPARQL comes in.

Europeana is rolling out their datasets as [Linked Open Data](http://labs.europeana.eu/api/linked-open-data/introduction/) (or LOD), a graph database format accessible via the SPARQL query language.
I'll leave it to Europeana to explain why they (and many, many others are doing this), but I want to get into the weeds of what LOD allows us to do that we can't do via the visual user interface.

## A LOD starter

LOD represents information in a series of three-part "statements" like this:

    <subject>   <predicate>   <object> .

Each subject, predicate, and object, is a node in a vast graph.
To keep these statements machine-readable and standardized, they usually come in the form of URIs, a.k.a. web links (I made up the first URL for the sake of argument, so don't try following it!):

    <http://data.rijksmuseum.nl/item/8909812347>   <http://purl.org/dc/terms/creator>  <http://dbpedia.org/resource/Rembrandt> .

Conceptually, what this statement is saying is this:

    <The Nightwatch>   <created by>   <Rembrandt van Rijn> .

It's important to remember that each URI in the first statement links to many other statements.
In order to get the "labels" for each of these URI's, what we're really doing is just retrieving more LOD statements:

    <http://data.rijksmuseum.nl/item/8909812347> <http://purl.org/dc/terms/title> "The Nightwatch" .

    <http://purl.org/dc/terms/creator> <http://www.w3.org/1999/02/22-rdf-syntax-ns#label> "created by" .

    <http://dbpedia.org/resource/Rembrandt> <http://xmlns.com/foaf/0.1/name> "Rembrandt van Rijn" .

See the predicates in these statements, with domain names like `purl.org`, `w3.org`, and `xmlns.com`?
These are some of the many providers of ontologies that help standardize the way we describe relationships between data points, like "title", "label", "creator", or "name".
The more LOD that you work with, the more of these providers you'll find.

## Searching LOD with SPARQL

SPARQL lets us translate LOD's heavily interlinked, graph data into normalized, tabular data like the kind you can open up in Excel, with rows and columns.
Let's say I want to get a list of Europeana **images**, with their titles and creators.
Our first step is understanding how the data model works.
Like many cultural LOD providers, Europeana has a... *complex* data model.
I don't want to paper over this complexity, so please bear with the following.
In learning how to deal with these tricky models, you'll come to understand just how much of the legwork SPARQL can do for you.

### Figure out the model

**We will be typing our query into [Europeana's SPARQL endpoint](http://europeana.ontotext.com/sparql), so open that now.**

<figure>
<a href="/assets/images/europeana_model.png"><img src="/assets/images-display/europeana_model.png" alt="Europeana&#39;s data model" /></a>
<figcaption>Europeana's data model visualized (<a href="http://europeana.ontotext.com/europeana/tab?uri=http%3A%2F%2Fdata.europeana.eu%2Fitem%2F03486%2FBD917F8C888476E9885B79DCD58E9B4D29A58B5E&amp;role=Graph">source</a>). You may want to open this up in a separate window so you can follow along with the next section.</figcaption>
</figure>

This is the data model for a single object.

Our first stop is the yellow box of "Prefixes". These are shortcuts that allow us to skip typing out entire long URIs.
For example, that predicate for retrieving the title of the Nightwatch, `<http://purl.org/dc/terms/title>`?
With these prefixes, we just need to type `dct:title` --- `dct:` stands in for `http://purl.org/dc/terms/`, and `title` just gets pasted onto the end of this link.

We'll be using these prefixes for our query:

    PREFIX dc:      <http://purl.org/dc/elements/1.1/>
    PREFIX edm:     <http://www.europeana.eu/schemas/edm/>
    PREFIX ore:     <http://www.openarchives.org/ore/terms>

Next, look to the center of the model, in dark blue.
That represents the primary link for this object, with all other information resources branching out from it.
The boldface label `edm:ProvidedCHO` is the identifier for this node.

Next, we need to figure out how to navigate from that link to the variables we're interested in.
Europeana splits its information among several subgroups for *provider aggregations*, *Europeana aggregations*, *provider proxies*, and *Europeana proxies*.
You can [read more about the distinctions between these](http://labs.europeana.eu/api/linked-open-data/FAQ/), but in short:

- Proxies are metadata about the object itself. Provider proxies contain object metadata direct from providers, while Europeana proxies have additional generated metadata, such as links to geographic, bibliographic, and content databases.
- Aggregations are meta-metadata about the provenance, rights, and creation of these metadata. Like proxies, each object has a provider aggregation and a Europeana aggregation.

Let's consider our target information and where to find it:

1. Items
2. With a  title
3. And a creator
4. And they should be images

In the upper-left corner of the model visualization you'll see the box for `ore:Proxy`.
This is the provider proxy, and it contains info about the title, creator, and type of the object.
This box represents a bunch of LOD statements with that particular proxy as the `subject`, the various `dc:XXX` labels as `predicates`, and the values as `objects`.
More on this in a second.

### Our first query

Back to the SPARQL query box, we can add in this:

    SELECT ?item ?title ?creator
    WHERE {
        # we'll fill this in next
    }

The `?` items after `SELECT` are the names of our variables.
You can name these anything you wish; you will actually define what statements they correspond to within the `WHERE {}` section.

Below you'll find the full query written out, with explanations for each line.
You can cut and paste this directly into the Europeana SPARQL endpoint to see the results.

    PREFIX dc:      <http://purl.org/dc/elements/1.1/>
    PREFIX edm:     <http://www.europeana.eu/schemas/edm/>
    PREFIX ore:     <http://www.openarchives.org/ore/terms/>

    SELECT ?link ?title ?creator
    WHERE { 

        # In the WHERE statement, we define both the variables
        # we asked for in the SELECT statement, as well as any
        # intermediate variables needed to get to those targets
        
        ?objectInfo dc:title ?title .
        ?objectInfo dc:creator ?creator .

        # This statement asks for ANY statement that has the
        # predicates dc:title and dc:creator. Because we only
        # included the ?title and ?creator variables in our SELECT
        # statement, the ?objectInfo variable will not show up
        # in our results. BUT we can still use it to shape the
        # rest of our query.

        # We only want objects of the type "IMAGE". This statement
        # effectively restricts the output of every other statement
        # in our query. We'll only get ?titles and ?creators attached
        # to objects that are also images.

        ?objectInfo edm:type "IMAGE" .

        # Finally, we want to get the canonical Europeana link to the
        # object. Check the model map to see the name of the predicate
        # we need to use in order to retrieve that dark blue link

        ?objectInfo ore:proxyFor ?link .
    }

### Adding more limits

What if we want to restrict this even more, by only retrieving completely public-domain images?
We need to add a few more statements to our query, looping in the *provider aggregation* data section that contains the rights statement:

    PREFIX dc:      <http://purl.org/dc/elements/1.1/>
    PREFIX edm:     <http://www.europeana.eu/schemas/edm/>
    PREFIX ore:     <http://www.openarchives.org/ore/terms/>

    SELECT ?link ?title ?creator
    WHERE { 
        
        ?objectInfo dc:title ?title .
        ?objectInfo dc:creator ?creator .
        ?objectInfo edm:type "IMAGE" .
        ?objectInfo ore:proxyFor ?link .

        # Check the map again. We need to find the link from the
        # provider proxy to the provider aggregation, which is in
        # the lower left corner of the map. We'll create another
        # "throwaway" variable called ?objectAgg. Like ?objectInfo,
        # this link won't show up in our results, but it will restrict
        # what the database returns to us.

        ?objectInfo ore:proxyIn ?objectAgg .
        ?objectAgg edm:rights <http://creativecommons.org/publicdomain/zero/1.0/> .

        # Remember to surround any URIs with < and >, and always add
        # a period at the end of every statement!
    }

Try restricting these results even more --- say, by provider, or date.

## Aggregating with SPARQL

So far we have just been emulating the kinds of queries that you can make using the visual user interface.
But what about aggregating these data?

One question is the distribution of rights: how many objects are totally open source?
How many have some restrictions?
How many are paid-access only?

So far we have just used SPARQL's `PREFIX`, `SELECT`, and `WHERE` commands.
For this aggregation query, we will introduce `COUNT`, `GROUP BY`, and `ORDER BY`.

    # Add your prefixes
    PREFIX dc:  <http://purl.org/dc/elements/1.1/>
    PREFIX edm: <http://www.europeana.eu/schemas/edm/>
    PREFIX ore: <http://www.openarchives.org/ore/terms/>

    SELECT ?edmrights ?provider (COUNT(*) as ?count)
    WHERE {
    ?agg edm:dataProvider ?provider .
    ?agg edm:rights ?edmrights .
    ?agg dc:rights ?dcrights .

    ?proxy ore:proxyIn ?agg .
    ?proxy edm:type "IMAGE" .
    }
    GROUP BY ?edmrights ?provider
    ORDER BY ?provider DESC(?count)
