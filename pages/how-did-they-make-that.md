---
layout: default
title: "<i>How Did They Make That?</i> - Printmaking Networks"
show_title: true
---

Inspired by Miriam Posner's ["How did they make that?" series](http://miriamposner.com/blog/how-did-they-make-that/).
The following are links to various software or services

## Data sources

- The Rijksmuseum
- The British Museum
- Actual books!

## Data Formats

- CSV
- JSON
- N-triples (Linked Open Data)
- PDF

## Command line tools

- curl: download JSON from Rijksmuseum API
- parallel: run lots of curl calls at once, to download from the Rijksmuseum more efficiently
- jq: Parse JSON into CSV files
- fuseki: Graph database to store a local version of the British Museum LOD
- rsync/scp: move data and scripts on and off of Digital Ocean servers
- pandoc: Turn text written in markdown into PDF

## GUI tools

- RStudio: an integrated development environment for R
- Tabula: extracting tabular data from scanned PDFs
- Adobe Acrobat: OCRing PDFs
- briss: Brilliant little tool for cropping scanned PDFs
- Excel: for hand-entered data!
- Powerpoint: latex/markdown presentation templates just do. not. work for me.

## Languages

- SPARQL: the
- jq: Not _really_ a language, but you need to learn how to tell jq to turn JSON into the type of table you want
- LaTeX: formatting
- R

### R Packages

- dplyr: filter, group, aggregate, join, and run operations on tabular data
- tidyr
- lubridate
- stringr
- readr
- igraph
- doParallel
- clipr
- ggplot2

## Services

- Digital Ocean: cloud hosting service for quickly spinning up a lot of processors to run R jobs in parallel for relatively low $$$
