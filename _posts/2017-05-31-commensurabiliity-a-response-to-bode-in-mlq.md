---
layout: "post"
title: "Commensurability: A Response to Bode in _MLQ_"
date: "2017-05-31 13:38"
tags:
- Digital Humanities
- LAM
---

I read with great interest “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,” by  Katherine Bode in the latest _MLQ_.[^bode] (h/t [Alan Liu](https://twitter.com/alanyliu/status/869782911746289664))

[^bode]: Katherine Bode, “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,” _Modern Language Quarterly_ 78, no. 1 (March 1, 2017): 77–106, doi:[10.1215/00267929-3699787](https://dx.doi.org/10.1215/00267929-3699787). ([open-access pre-print](https://katherinebode.files.wordpress.com/2014/07/bode-article_mlq_final.pdf)) https://katherinebode.wordpress.com/articles-chapters/

Bode presents a trenchant critique of the supposed close / distant divide.
She argues that both "distant reading" (as exemplified by Moretti/Jockers) and New Criticism's "close reading" draw from the same poisoned root: the idea that texts are commensurable across and between different periods and cultural situations.
In close reading, Bode writes, the text has pride of place, often to exclusion of awareness of or interest in the material circumstances of its production, dissemination, and reading.
Distant reading practices (in this piece, explicitly identified as Moretti and Jockers) replicate this by basing rhetoric of universality and large-scale evidence on ill-defined corpora in which uncertainty, biases, and missing information are papered over.

One could take issue with Bode's use of Moretti and Jockers as stand-ins for computational literary study, but I think her point largely stands.
I'm more interested, though, in the second half of her paper.
There, she describes one path to rectifying this: well-documented and shared research corpora that detail their history of construction, and precise types of works included (and excluded) from them.
She singles out for praise [the HathiTrust corpus for literary fiction][hathitrust], but suggests that it does not go far enough in describing the relationship between the dataset as it exists, and the historical "literary system" that produced the texts it contains.
What is required, Bode argues, is an approach to corpus construction similar to the genre of the scholarly edition, which is uniquely sensitive to publication histories, revised editions, and the like, and which is understood by its readers/users as a scholarly argument in its own right.
A raft of these literary datasets might provide a more solid foundation for what she terms "data-rich" history (a term I rather like!)

[hathitrust]: https://wiki.htrc.illinois.edu/display/COM/Extracted+Features+Dataset

While I really like Bode's approach to historical datasets as critical editions, I think it is worth playing out the ramifications and unarticulated requirements that her approach, as specified, would impose on the field.
There are two major issues that go unaddressed in this piece:

1) Disciplinary norms for commensurability: how do we decide what we get to compare?
2) The labor of documentation: what are the systems we need to develop to maintain these new objects of scholarly study?

Bode's entire point is that, if we want to use data-rich methods that rely on commensurability between records, we need to be selective enough in our dataset construction that all the constituent records _are_, in fact, commensurable - at least by the given scholar's definition of "commensurable".
The point of documentation is to make the dataset usable by others.
Bode actually asks for even greater usability when suggesting that the ideal scholarly dataset, unlike the HathiTrust extract features set, also carries an interface for non-technical users:

>a curated data set is accessible to all literary scholars through an interface for searching and browsing literary data as well as facilities for export.

>The curated data set for a scholarly edition of a literary system is intended not as raw data. Rather, with its associated introduction and apparatus, it constitutes a historically contextualized model of literary-historical events and connections, and an interpretive intermediary between increasingly complex, digital disciplinary infrastructure and the requirements of literary-historical analysis.

If it becomes a disciplinary norm that one cannot convincingly build an argument from data produced by someone else... then we hobble our work, and also make it more difficult for someone to engage.
Much like [connoisseurship is a rich man's speciality][connoisseurship]

>For other researchers, including those currently using mass-digitized collections to locate particular authors and works in the historical contexts in which they operated, a scholarly edition of a literary system will provide a carefully, consistently, and explicitly historicized digital collection for this task. For researchers interested in analyzing large-scale trends in the publication, circulation, and reception of literary works, such an edition will provide a rigorously constructed and explained “shared” data set that could be analyzed and “combined in more ways that one” (Moretti 2005: 5).

[connoisseurship]: /2015/11/16/privilege-and-connoisseurship.html

In short: would we be left with islands of data that are incommensurable?

I am not so convinced, however, that humanists have the methodological implements to perform such cross comparisons between collections of sources.

This is an urgent question.
In the history of art, more so than in literary studies, we are painfully dependent on collections and their expression in data.[^cad]

Where is the machinery to meaningfully compare (or aggregate) two datasets with well-specified, but divergent, assumptions and biases baked in?

I have [written and spoken previously][pains] about the challenges I encountered when trying to address two separate museum datasets from the Rijksmuseum and the British Museum, built according to different ontologies and from different sources.
Bringing together multiple collections was crucial.

But as scholars we also have a responsibility to the larger ecosystem of our fields.
It would be a sad world indeed where the only acceptable humanities computing research is done by data that the author collected and composed herself.

I'm also surprised that Bode does not cite any work on knowledge modeling from the domains of information and library science.
This is a strange omission - although I suspect it's more informative about the predilections of _MLQ_ than it is for Bode herself.

There are so many differences that we need to account for in any given dataset.

>The approach I have advocated does not take the path increasingly recommended for data-rich literary history: of integrating scientific and social-scientific measures of statistical uncertainty into historical analysis (e.g., Goldstone 2015).

[pains]: /cesta_lod

[^langmead]: Alison Langmead et al., “Towards Interoperable Network Ontologies for the Digital Humanities,” _International Journal of Humanities and Arts Computing_ 10, no. 1 (March 1, 2016): 22–35, doi:[10.3366/ijhac.2016.0157](https://dx.doi.org/10.3366/ijhac.2016.0157).

[^kuhn]: Thomas S. Kuhn, “Commensurability, Comparability, Communicability,” _PSA: Proceedings of the Biennial Meeting of the Philosophy of Science Association_ 1982 (1982): 669–88, <http://www.jstor.org/stable/192452>.

[^cad]: The IMLS program [_Always Already Computational: Collections as Data_](https://collectionsasdata.github.io/) is developing guidelines and principles for cultural heritage collections working to develop their collections data for creative reuse and computation.
