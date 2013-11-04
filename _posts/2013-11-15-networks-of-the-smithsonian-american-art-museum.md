---
layout: post
comments: true
title: Networks of the Smithsonian American Art Museum
date: 2013-11-15
tags:
- Art History
- Digital Humanities
---

Click through to see a [network map](/assets/gephi/saam_network) of artworks made between 1900 and 1935 at the Smithsonian American Art Museum.

[![Preview of a network map of paintings at the SAAM](/assets/images-display/saam_preview.png)](/assets/gephi/saam_network)

From a list of 40,218 artworks in the Smithsonian American Art Museum, I generated a subset of 19,584 records that have both a date as well as assigned keywords. From this subset I created a yet smaller subset database of those artworks whose date fell between 1900 and 1935, resulting in 2,255 records. In this visualization, every node, or point on the graph, represents a single artwork record.

The computer has drawn an edge, or connection, between artworks when those two artworks share **5 or more keyword tags**. These nodes and edges have been positioned by an algorithm that pushes apart nodes that do not share connections, and pulls together nodes that do share connections. The size of each node increases the more artworks with which they share an edge. The color has been assigned by an algorithm that attempts to detect "communities" of nodes; i.e. groups of nodes that are relatively more connected to each other than they are to the rest of the network. This algorithm does not understand the meaning of topic keywords or titles -- it works only by judging the relative number of connections between the many nodes in this network.
