---
layout: post
title: "Ways of Forgetting: The Librarian, The Historian, and the Machine"
date: 2017-02-23T14:27:28-08:00
comments: true
tags:
- digital humanities
- lam
- conferences
aside: "The following is from my position statement contributed to [_Always Already Computational_](https://collectionsasdata.github.io/statements/), an IMLS forum that will be hosted at USCB later this month."
---

Jorge Luis Borges tells us of Funes, the Memorious: a man distinguished by his extraordinary recall.
So precise and complete were Funes' memories, though, that it was impossible for him to abstract from the near-infinity of recalled specifics he possessed, to general principles for understanding the world:

> Locke, in the seventeenth century, postulated (and rejected) an impossible idiom in which each individual object, each stone, each bird and branch had an individual name. Funes had once projected an analogous idiom, but he had renounced it as being too general, too ambiguous. In effect, Funes not only remembered every leaf on every tree of every wood, but even every one of the times he had perceived or imagined it... He was, let us not forget, almost incapable of general, platonic ideas... he was not very capable of thought. To think is to forget a difference, to generalize, to abstract. In the overly replete world of Funes there were nothing but details, almost contiguous details.[^borges]

[^borges]: Jorge Luis Borges, “Funes, the Memorious,” in _Ficciones_, ed. Anthony Kerrigan (New York: Grove Press, 1962), 27

Attending to Drucker's admonition that all "data" are properly understood as "capata", the story of Funes is a potent reminder that it is not only inevitable that we will be selective when capturing datasets from our collections, but that it is actually _necessary_ to be selective.[^drucker]
A data set that aims for perfect specificity does so at the expense of allowing any generalizations to be made though grouping, aggregating, or linking to other datasets.
For our data to be useful in drawing broad conclusions, it is an _imperative_ to forget.

[^drucker]: Johanna Drucker, _Graphesis: Performative Approaches to Graphical Forms of Knowledge Production in  the Humanities_. (Cambridge: Harvard University Press, 2014).

However, in considering library and museum collections as data, we must grapple with several different frameworks of remembering, forgetting, and abstracting: that of the librarian, the historian, and the machine.
These frameworks will often be at cross-purposes:

- The librarian favors data that is **standard**: forgetting enough specifics about the collection in order to produce data that references the same vocabularies and thesauri as other collection datasets. The librarian's generalization aims to support access by many different communities of practice.
- The historian favors data that is **rich**: replete with enough specifics that they may operationalize that data in pursuit of their research goals, while forgetting anything irrelevant to those goals. The historian's generalization aims to identify guiding principles or exceptional cases within a historical context. (No two historians, of course, will agree on what that context should be.)
- The machine favors data that is **structured**: amenable to computation because it is produced in a regularized format (whether as a documented corpus of text, a series of relational tables, a semantic graph, or a store of image files with metadata.) In a statistical learning context, the machine seeks generalizations that reduce error in a given classification task, forgetting enough to be able to perform well on new data without over-fitting to the training set.

At the Getty Research Institute, [our project to remodel the Getty Provenance Index® as Linked Open Data](http://www.getty.edu/research/tools/provenance/provenance_remodel/index.html) is compelling us to balance each of these perspectives against the labor required to support them.
Our legacy data is filled with a mix of transcriptions of sales catalogs, archival inventories, and dealer stock books, paired with editorial annotations that index some of those fields against authorities or other controlled vocabularies.
Originally designed to support the generation of printed volumes, and then later a web-based interface for lookup of individual records, these legacy data speak mostly about _documents_ of provenance events, and do so for an audience of human readers.
To make these data linkable to museums that are producing their own Linked Open Data (following the general CIDOC-CRM principles of defining objects, people, places, and concepts through their event-based relationships), we are transforming these data in to statements about those provenance events themselves.
In so doing, we are **standardizing** the terms referenced, **enriching** fields by turning them from transcribed strings into URIs of things, and explicitly **structuring** the relationships between these data as an RDF graph.

All this work requires dedicated labor.
This leads to hard questions about priorities.

To what extent do we preserve the literal content of these documents, versus standardizing the way that we express the ideas those documents communicate (in so far as we, as modern-day interpreters, can correctly identify those ideas)?
To maintain (to remember) plain text notes about, say, an object's materials as recorded by an art dealer, is to grant the possibility of perfect specificity about what our documents.
But not aligning descriptions with authoritative terms for different types of materials and processes forecloses the possibility of generalizing about the history of those materials and processes across hundreds of thousands of objects.
Remember too much, in other words, and we become Funes: incapable of synthetic thought.

Capacious collections data must remember enough _and_ forget enough to be useful.
For which terms will we expend the effort to do this reconciliation?
Which edge cases will we try to capture in an ever-more-complex data model?
Opinions on how to draw that line will frequently set the librarian, the historian, and the machine at cross purposes.
Outlining the necessary competencies a collections data production team needs, and the key questions, in order to navigate perspectives must therefore be a crucial output of this forum.
