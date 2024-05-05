---
layout: post
title: |
  Why is my ElasticSearch query so slow?
date: 2024-05-05
tags:
  - code
---

The center of my working hours for the past two years has been [constellate.org](https://constellate.org), a platform for teaching, learning, and performing text analysis with scholarly and primary source content from JSTOR, Portico, and elsewhere.

{% include figure.html src="/assets/images-display/constellate-builder.png" caption="The Constellate [dataset builder page](https://constellate.org/builder)." %}

Our dataset builder allows users to filter and explore a corpus of over 35 million documents.
This search - and the analytical queries that power the data visualizations in this builder - rely on an ElasticSearch cluster on the backend.
We rely heavily on ElasticSearch aggregations every time a user updates their filters, taking the resulting set of documents (no matter if it is 500 docs or 15 million) and count up the different document types, providers, genres, decades of publication, and more.
These aggregations are memory-heavy actions, especially when aggregating over 10+ million documents.
Even so, ElasticSearch was usually able to return results in under 3,000 milliseconds, providing an acceptable user experience.

## Why have our queries gotten slower and slower?

But we started to see something concerning happening: over the past six months, we watched the worst-case query durations (those the 95th percentile execution time for all searches performed in a week) steadily growing, starting to crest over an unbearable 10 seconds long.
At that point our default request timeouts on our backend services were truly breaking the end user experience.

{% include figure.html src="/assets/images-display/constellate-durations.png" caption="Median and 95th percentile durations (in milliseconds) of search queries on [constellate.org](https://constellate.org)" %}

I hadn't made any changes to the way we composed the queries we sent to ElasticSearch in that time.
Our overall usage was increasing, yes, and during very large bulk ingests we did see some overall slowdowns in query processing as expected.
But not at a pace that seemed liable to explain why these pathological query times were growing steadily worse.
We had been steadily adding new documents to the index, some coming in large monthly batches, but we'd been doing that for years without seeing this kind of progressive slowdown.

So I started experimenting, running searches directly against our cluster and one at a time, removing and adding back in the aggregations to see if any oe was causing a particularly heavy load on the cluster.
The culprit: our aggregation of keyphrases, which were sets of significant terms calculated for each document.
For very large search result sets that returned 20 or 30 million documents, the keyphrases [`terms`](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/search-aggregations-bucket-terms-aggregation.html) aggregation was adding between 3 and 8 ruinous whole seconds onto the query.

Why was this `terms` aggregation so slow, while the half-dozen others we were running were fast as ever?
Cardinality.
While we only have a handful of different providers, a few dozen subject categorizations, and maybe a hundred different languages, there are over **50 million distinct keyphrases** in the system.
With such high cardinality, ElasticSearch had to generate an extremely large set of global ordinals when being asked for a terms query, and then actually rank those ordinals and return the top fifty most frequently occurring.
Even [precalculating global ordinals](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/eager-global-ordinals.html#_avoiding_global_ordinal_loading) (the usual first step in addressing slow `terms` aggregations) was not enough to tame the IO needed to aggregate 30+ million documents' intersection with 50+ million keyphrase values.

Why hadn't this problem asserted itself before?
Because for a few years, we had only extracted keyphrases from about 1/3 of our documents, and weren't actively contributing new ones into the system.
While better automating our ingest pipelines this year, we took the opportunity to regenerate a lot of our keyphrases, backfilling our database with an enormous number of new keyphrase values.
While this problem of cardinality was in our system all along, the scale simply wasn't large enough to make its impact felt until recently.

## So make the problem smaller

Because we only want to get a relative ranking of the top keyphrases, a straightforward way to reduce this problem is to use a [`sampler`](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/search-aggregations-bucket-sampler-aggregation.html) aggregation.
By grabbing a sample of up to 5,000 documents before running the `terms` aggregation, we easily brought the impact of the keyphrases aggregation back under control.
This effectively puts a ceiling on the number of files whose keyphrases need to be looked up in an aggregation, and mitigates the real scaling issues that we were starting to encounter with our data.
