---
layout: post
comments: true
title: "jq and SPARQL"
date: 2015-06-04 11:16
tags:
- Code
---

A growing number of museums are creating [SPARQL endpoints to release their data](/2014/07/10/sparql-for-humanists.html), and it's a great way for researchers to build custom datasets for reuse in their own work.

Most of these services will only return results in XML or JSON formats, when all you were really looking for was a CSV table!

[jq] to the rescue.
This great command line utility[^cl] for filtering and re-writing JSON files can also be put to work converting RDF JSON from a SPARQL endpoint into a CSV that you can load into [RAW](http://raw.densitydesign.org/), [plot.ly](https://plot.ly/), [R](http://www.r-project.org/), or whatever your data exploration tool of choice may be.
Just run like so:

```sh
cat sparql.json | jq -r '.head.vars as $fields | ($fields | @csv), (.results.bindings[] | [.[$fields[]].value] | @csv)' > sparql.csv
```

jq will first write the `vars` array to the first line of the CSV, creating a table header.
Next, it will read through each result and add a row to the CSV, leaving a blank for any missing variables in a given result.

**Warning**: jq must read the entire JSON file in to memory, so be careful if you are trying to process a multi-gigabyte file!

[^cl]: The Programming Historian has a [great tutorial on the command line](http://programminghistorian.org/lessons/intro-to-bash).

[jq]: http://stedolan.github.io/jq/
