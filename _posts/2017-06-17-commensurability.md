---
layout: "post"
title: "Commensurability"
date: "2017-06-17 13:38"
tags:
- Digital Humanities
- LAM
---

I read with great interest “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,”[^bode] by  Katherine Bode in the latest _MLQ_. (h/t [Alan Liu](https://twitter.com/alanyliu/status/869782911746289664))

[^bode]: Katherine Bode, “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,” _Modern Language Quarterly_ 78, no. 1 (March 1, 2017): 77–106, doi:[10.1215/00267929-3699787](https://dx.doi.org/10.1215/00267929-3699787). ([open-access pre-print](https://katherinebode.files.wordpress.com/2014/07/bode-article_mlq_final.pdf))

Bode presents a trenchant critique of the supposed close / distant divide.
She argues that both "distant reading" (as exemplified by Moretti/Jockers) and New Criticism's "close reading" draw from the same poisoned root: the idea that texts are commensurable across and between different periods and cultural situations.
One could take issue with Bode's use of Moretti and Jockers as stand-ins for the diverse field of computational literary study.
I'm more interested, though, in the second half of her paper.

There, she describes one path to rectifying this issue: well-documented and shared critical datasets that detail their history of construction, and precise types of works included (and excluded) from them.
She singles out for praise [the HathiTrust corpus for literary fiction][hathitrust], but suggests that it does not go far enough in describing the relationship between the dataset as it exists, and the historical "literary system" that produced the texts it contains.
What is required, Bode argues, is an approach to corpus construction similar to the genre of the scholarly edition, which is uniquely sensitive to publication histories, revised editions, and the like, and which is understood by its readers/users as a scholarly argument in its own right:

>The curated data set for a scholarly edition of a literary system is intended not as raw data. Rather, with its associated introduction and apparatus, it constitutes a historically contextualized model of literary-historical events and connections, and an interpretive intermediary between increasingly complex, digital disciplinary infrastructure and the requirements of literary-historical analysis.

A raft of these literary datasets might provide a more solid foundation for what she terms "data-rich" history (a term I rather like!)

[hathitrust]: https://wiki.htrc.illinois.edu/display/COM/Extracted+Features+Dataset

Bode's approach to historical datasets as critical editions is a useful reminder (albeit one in a field now quite full of them) that dataset construction is an historical argument.
However, her argument ends before grappling with the problem of recombination and commensurability.
Bode does not discuss the mechanics of cross-dataset analysis and argumentation under this framework of critical data editions.
Her argument largely describes the critical data corpus as a standalone entity that functions only within its own context:

>For other researchers, including those currently using mass-digitized collections to locate particular authors and works in the historical contexts in which they operated, a scholarly edition of a literary system will provide a carefully, consistently, and explicitly historicized digital collection for this task. For researchers interested in analyzing large-scale trends in the publication, circulation, and reception of literary works, such an edition will provide a rigorously constructed and explained “shared” data set that could be analyzed and “combined in more ways that one” (Moretti 2005: 5).

The key word here is "consistently".
If we want to use data-rich methods that rely on commensurability between records, we need to be selective enough in our dataset construction that all the constituent records _are_, in fact, commensurable - at least by the given scholar's definition of "commensurable".
However, we have very few disciplinary norms for negotiating the commensurability of cultural datasets.
How will we arbitrate which corpora we are allowed to compare and combine?

Bode gestures to this issue implicitly, invoking Alan Liu:

>Describing the relationship of postmodern historicism to the database, Liu notes that of neither form does one ask, what is the meaning of this whole? Rather, the question becomes, how does this complex system I am investigating appear from this particular perspective or this one? 

Bringing together multiple collections, with their multiple perspectives, in service of a common question is a crucial way of identifying collection-specific biases, while similarly understanding which features of one's results are robust across different datasets.[^merging]
In the history of art (more so, perhaps, than even in literary studies), we are painfully dependent on _multiple_ collections and their expression as structured data.[^cad]
For example, I have [written and spoken previously][pains] about the challenges I encountered when trying to interrogate two separate museum datasets from the Rijksmuseum and the British Museum, each built according to different ontologies.

[pains]: /cesta_lod

[^merging]: You can read more detail about this in an [article I wrote for IJDAH](http://journals.ub.uni-heidelberg.de/index.php/dah/article/view/25337).

Statistical theories of confidence and sampling, and their theorizing about the gap between one's evidentiary sample and historical reality, have a lot to say about this problem.
I think Bode is wrong to reject them with a brief hand wave.
Confirming the strength of an effect across multiple types of samples (["curatorial bootstrapping" in the words of Ryan Heuser](https://twitter.com/quadrismegistus/status/876119051721887744)), for example, is a common and powerful statistical tool.
We historians have a long way to go in incorporating these theories of evidence into our current frameworks - but it is an encounter worth having.

However, while quantitative approaches really can address many of the sampling issues that Bode worries about, we will be faced with much deeper problems when it comes to conflicting _ontologies_ between scholarly datasets - and this is another question Bode leaves open. If, for example, Underwood publishes one dataset of textual features, and Bode another, they may have divergent samples with divergent lacunae.
However, they would still fundamentally agree that the unit of the text and its constituent n-gram counts are a useful (if incomplete) proxy for cultural/historical processes.
If their perspectives on a given period are different, their atomic units would be commensurate.

But as [Miriam Posner has challenged us to consider](http://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/), we may begin to develop ever more bespoke ontologies for encoding humanities data - for example, a framework for describing an individual's gender that is perspectival and relational, rather than an immanent property.
Composing such "radical" datasets is one of the most exciting opportunities of DH work.
But that work is at cross-purposes with creating shared frameworks for commensurable literary or historical datasets.
This can be a creative tension, I hope, but it is a distinction that I think we need to better articulate.
We have spent the last few years just getting comfortable with data-rich methods for carefully-curated scholarly datasets.[^again]
One of our next major challenges will be navigating how to recombine (and recontextualize through that recombination,) _multiple_ curated scholarly datasets.

[^again]: Or just getting comfortable _again_ with data-rich methods, as [Scott Weingart reminds us](http://scottbot.net/lessons-from-digital-historys-antecedents/).

Productive work in this area (e.g. [Langmead et al. 2016](https://dx.doi.org/10.3366/ijhac.2016.0157)) is coming out of information science - a field that was surprisingly absent from Bode's citations (though I suspect that may say more about _MLQ_ than about Bode's own perspective.)
I'll be interested to see if and how disciplines engage with this problem of commensurability - not only in literary studies, but also in [physical cultural heritage](https://www.slideshare.net/azaroth42/introduction-to-the-linked-art-data-model).

[^cad]: The IMLS-supported effort [_Always Already Computational: Collections as Data_](https://collectionsasdata.github.io/) is developing guidelines and principles for cultural heritage collections working to develop their collections data for creative reuse and computation.
