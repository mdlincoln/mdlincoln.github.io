---
layout: default
title: "<i>How Did They Make That?</i> - Printmaking Networks"
show_title: true
---

_Inspired by Miriam Posner's ["How did they make that?" series](http://miriamposner.com/blog/how-did-they-make-that/)!_

The following are links to various software, services, and resources that I used during my dissertation research.

## Data sources

- [The Rijksmuseum](http://rijksmuseum.github.io/): JSON-based API ([Example output](https://www.rijksmuseum.nl/api/nl/collection/RP-P-OB-10.148?key=fpGQTuED&format=json))
- [The British Museum](http://collection.britishmuseum.org/): Linked Open Data, accessible as bulk download as well as a SPARQL endpoint. ([Example query](http://collection.britishmuseum.org/sparql?sample=PREFIX+bmo%3A+++%3Chttp%3A%2F%2Fcollection.britishmuseum.org%2Fid%2Fontology%2F%3E%0D%0APREFIX+ecrm%3A++%3Chttp%3A%2F%2Ferlangen-crm.org%2Fcurrent%2F%3E%0D%0APREFIX+skos%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0D%0APREFIX+thes%3A++%3Chttp%3A%2F%2Fcollection.britishmuseum.org%2Fid%2Fthesauri%2F%3E%0D%0APREFIX+rdfs%3A++%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+qudt%3A+%3Chttp%3A%2F%2Fqudt.org%2Fschema%2Fqudt%23%3E%0D%0APREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0A%0D%0ASELECT+%3Fobject+%3Fdatestart+%3Fdateend+%3Fschool+%3Ftechnique+%3Fheight+%3Fwidth+%3Funit+%3Fseries+%3Fsubjectlabel+%3Fdescription%0D%0AWHERE+%7B%0D%0A++%0D%0A++%23+Prints+only%0D%0A++%3Fobject+bmo%3APX_object_type+thes%3Ax8577+.%0D%0A++%3Fobject+ecrm%3AP108i_was_produced_by+%3Fproduction+.%0D%0A%0D%0A++%23+Get+date%0D%0A++OPTIONAL+%7B+%3Fproduction+ecrm%3AP9_consists_of+%3Fcomponent3+.%0D%0A++%3Fcomponent3+ecrm%3AP4_has_time-span+%3Ftimespan+.%0D%0A++%3Ftimespan+ecrm%3AP82a_begin_of_the_begin+%3Fdatestart+.%0D%0A++%3Ftimespan+ecrm%3AP82b_end_of_the_end+%3Fdateend+.+%7D%0D%0A%0D%0A++%23+Get+national+school%0D%0A++OPTIONAL+%7B+%3Fproduction+ecrm%3AP9_consists_of+%3Fcomponent4+.%0D%0A++%3Fcomponent4+ecrm%3AP14_carried_out_by+%3Fschool_object+.%0D%0A++%3Fschool_object+skos%3AinScheme+thes%3Aschool+.%0D%0A++%3Fschool_object+skos%3AprefLabel+%3Fschool+.+%7D%0D%0A%0D%0A++%23+Get+technique%0D%0A++OPTIONAL+%7B+%3Fproduction+ecrm%3AP9_consists_of+%3Fcomponent5+.%0D%0A++%3Fcomponent5+ecrm%3AP32_used_general_technique+%3FtechniqueEntry+.%0D%0A++%3FtechniqueEntry+skos%3AprefLabel+%3Ftechnique+.+%7D%0D%0A%0D%0A++%23+Get+dimensions%0D%0A++OPTIONAL+%7B+%3Fobject+ecrm%3AP43_has_dimension+%3Fdim1+.%0D%0A++%3Fdim1+ecrm%3AP2_has_type+%3Chttp%3A%2F%2Fcollection.britishmuseum.org%2Fid%2Fthesauri%2Fdimension%2Fheight%3E+.%0D%0A++%3Fdim1+ecrm%3AP90_has_value+%3Fheight+.%0D%0A++%3Fdim1+ecrm%3AP91_has_unit+%3Funit+.+%7D%0D%0A%0D%0A++OPTIONAL+%7B+%3Fobject+ecrm%3AP43_has_dimension+%3Fdim2+.%0D%0A++%3Fdim2+ecrm%3AP2_has_type+%3Chttp%3A%2F%2Fcollection.britishmuseum.org%2Fid%2Fthesauri%2Fdimension%2Fwidth%3E+.%0D%0A++%3Fdim2+ecrm%3AP90_has_value+%3Fwidth+.+%7D%0D%0A%0D%0A++OPTIONAL+%7B+%3Fobject+ecrm%3AP46i_forms_part_of+%3Fseriesref+.+%0D%0A++%3Fseriesref+rdfs%3Alabel+%3Fseries+.+%7D%0D%0A%0D%0A++OPTIONAL+%7B+%3Fobject+ecrm%3AP128_carries+%3Fconcept+.%0D%0A++%3Fconcept+ecrm%3AP129_is_about+%3Fsubject+.%0D%0A++%3Fsubject+skos%3AprefLabel+%3Fsubjectlabel+.+%7D%0D%0A%0D%0A++OPTIONAL+%7B+%3Fobject+bmo%3APX_physical_description+%3Fdescription+.+%7D%0D%0A%7D%0D%0A))
- Printed books (I know, old school!)
    - De Vries, Jan. _European Urbanization: 1500-1800_. Cambridge: Harvard University Press, 1984.
    - van der Waals, Jan. _Prenten in de gouden eeuw: van kunst tot kastpapier_. Rotterdam: Museum Boijmans Van Beuningen, 2006.

## Data Formats

- CSV
- JSON
- N-triples (Linked Open Data)

## Command line tools

- [Intro to the command line](http://cli.learncodethehardway.org/book/)
- [curl](https://curl.haxx.se/): download JSON from Rijksmuseum API
- [parallel](https://www.gnu.org/software/parallel/parallel_tutorial.html#GNU-Parallel-Tutorial): run lots of curl calls at once, to download from the Rijksmuseum more efficiently
- [jq](https://stedolan.github.io/jq/): Parse JSON into CSV files
- [fuseki](https://jena.apache.org/documentation/fuseki2/index.html): Graph database to store a local version of the British Museum LOD
- [rsync](https://www.digitalocean.com/community/tutorials/how-to-use-rsync-to-sync-local-and-remote-directories-on-a-vps): move data and scripts on and off of Digital Ocean servers
- [pandoc](http://pandoc.org/README.html): Turn text written in [Markdown](https://daringfireball.net/projects/markdown/) into PDF

## GUI tools

- [RStudio](https://www.rstudio.com/): an integrated development environment for R
- [Tabula](http://tabula.technology/): extracts tabular data from scanned PDFs
- Adobe Acrobat: OCRing PDFs (though this can also be done with open-source [Tesseract](https://github.com/tesseract-ocr/tesseract))
- [briss](http://briss.sourceforge.net/): Brilliant free little tool for cropping scanned PDFs --- way more intuitive than Acrobat's cropping tools.
- Excel: Yes, I use it. Easiest option to hand enter a table with just a few dozen rows
- [Zotero](https://www.zotero.org/): Not technically used for data analysis, but this is my go-to citation manager. I use it in combination with [Better BibTeX](https://zotplus.github.io/zotero-better-bibtex/) for formatting all my citations via Markdown/LaTeX.

## Languages

- [SPARQL](http://programminghistorian.org/lessons/graph-databases-and-SPARQL): A query language for Linked Open Data. Similar to SQL... but different.
- [jq](https://stedolan.github.io/jq/manual/): Not _really_ a language, but you need to learn how to tell jq to turn JSON into the type of table you want
- [LaTeX](https://en.wikipedia.org/wiki/LaTeX): A rich language for formatting long documents. It is a beast, but still easier than using Word when you have hundreds of pages with sections, citations, images, and a persnickety style guide to follow.
- [Markdown](https://daringfireball.net/projects/markdown/): Also not _really_ a language, but an easy-to-use text markup system for writing documents.

Last, and most important:

- [R](https://www.r-project.org/): An open-source language designed for working with tabular data and statistical calculations. Vanilla R can be ([kind of weird](http://www.burns-stat.com/documents/books/the-r-inferno/)), but the following packages make it shine:

### R Packages

[Example code from my dissertation.](https://gist.github.com/mdlincoln/9ba3b6c580f110abadd8)

- [readr](https://github.com/hadley/readr): reads in massive CSV/TSV files very quickly, and with the correct variable types (e.g. `character`, `numeric`, `boolean`)
- [dplyr](https://cran.r-project.org/web/packages/dplyr/vignettes/dplyr.html): filter, group, aggregate, join, and run operations on tabular data with easy-to-use syntax and impressive speed. Without exaggeration, this may be the most important extension ever written for R.
- [tidyr](https://github.com/hadley/tidyr): Transform between [wide and narrow](https://en.wikipedia.org/wiki/Wide_and_narrow_data) data tables (don't worry, it's a thing that starts to make sense once you begin to work with tabular data a lot)
- [lubridate](https://cran.r-project.org/web/packages/lubridate/vignettes/lubridate.html): seamlessly parses many different ways for writing date strings
- [stringr](https://cran.r-project.org/web/packages/stringr/vignettes/stringr.html): string manipulation functions, like [regular expressions](http://regexr.com/).
- [igraph](http://igraph.org/): Network analysis package (also available in python and C). This package constructs graphs from edge lists, offers a wide range of functions for measurement, simulation, and plotting as well.
- [doParallel](https://cran.r-project.org/web/packages/doParallel/vignettes/gettingstartedParallel.pdf): Helps set up parallel R sessions so you can run multiple jobs at the same time, and collect all their results in one place.
- [clipr](https://github.com/mdlincoln/clipr): A little utility package I wrote for quickly sending R results to my clipboard for pasting elsewhere, such as [Palladio](http://palladio.designhumanities.org/).
- [ggplot2](http://docs.ggplot2.org/current/index.html): creates beautiful 2D plots for both screen and page.
- [animation](https://cran.r-project.org/web/packages/animation/index.html): Makes animated GIFs from ggplot2.

## Services

- [Digital Ocean](https://www.digitalocean.com/): cloud hosting service for quickly spinning up a lot of processors to run R jobs in parallel for relatively low $$$. This was the only software I actually had to directly pay for.


## Books

- Hanneman, Robert A., and Mark Riddle. _Introduction to Social Network Methods_. Riverside: University of California, Riverside, 2005. <http://faculty.ucr.edu/~hanneman/nettext/>.
- Prell, Christina. _Social Network Analysis: History, Theory and Methodology_. Los Angeles: Sage, 2011.
- Arnold, Taylor, and Lauren Tilton. _Humanities Data in R: Exploring Networks, Geospatial Data, Images, and Text_. Cham: Springer, 2015.
