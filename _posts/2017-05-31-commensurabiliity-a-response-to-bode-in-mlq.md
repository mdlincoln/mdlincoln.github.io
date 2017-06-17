---
layout: "post"
title: "Commensurability: A Response to Bode in _MLQ_"
date: "2017-05-31 13:38"
tags:
- Digital Humanities
- LAM
---

I read with great interest “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,”[^bode] by  Katherine Bode in the latest _MLQ_. (h/t [Alan Liu](https://twitter.com/alanyliu/status/869782911746289664))

[^bode]: Katherine Bode, “The Equivalence of ‘Close’ and ‘Distant’ Reading; Or, Toward a New Object for Data-Rich Literary History,” _Modern Language Quarterly_ 78, no. 1 (March 1, 2017): 77–106, doi:[10.1215/00267929-3699787](https://dx.doi.org/10.1215/00267929-3699787). ([open-access pre-print](https://katherinebode.files.wordpress.com/2014/07/bode-article_mlq_final.pdf))

Bode presents a trenchant critique of the supposed close / distant divide.
She argues that both "distant reading" (as exemplified by Moretti/Jockers) and New Criticism's "close reading" draw from the same poisoned root: the idea that texts are commensurable across and between different periods and cultural situations.
In close reading, Bode writes, the text has pride of place, often to exclusion of awareness of or interest in the material circumstances of its production, dissemination, and reading.
Distant reading practices (in this piece, explicitly identified as Moretti and Jockers) replicate this by basing rhetoric of universality and large-scale evidence on ill-defined corpora in which uncertainty, biases, and missing information are papered over.

One could take issue with Bode's use of Moretti and Jockers as stand-ins for the diverse field of computational literary study, but I think her point largely stands.

I'm more interested, though, in the second half of her paper.

There, she describes one path to rectifying this: well-documented and shared research corpora that detail their history of construction, and precise types of works included (and excluded) from them.
She singles out for praise [the HathiTrust corpus for literary fiction][hathitrust], but suggests that it does not go far enough in describing the relationship between the dataset as it exists, and the historical "literary system" that produced the texts it contains.
What is required, Bode argues, is an approach to corpus construction similar to the genre of the scholarly edition, which is uniquely sensitive to publication histories, revised editions, and the like, and which is understood by its readers/users as a scholarly argument in its own right.
A raft of these literary datasets might provide a more solid foundation for what she terms "data-rich" history (a term I rather like!)

[hathitrust]: https://wiki.htrc.illinois.edu/display/COM/Extracted+Features+Dataset

Bode's approach to historical datasets as critical editions is an excellent framework.
I think it is worth playing out the ramifications and unarticulated requirements of her approach as specified, though.
There are two major challenges (or perhaps opportunities, thinking optimistically!) connected to this vision:

1) Disciplinary norms for commensurability: how do we arbitrate which datasets we get to compare?
2) The labor of documentation: what are the systems we need to develop to maintain these new objects of scholarly study?

## Norms of Commensurability

Bode's entire point is that, if we want to use data-rich methods that rely on commensurability between records, we need to be selective enough in our dataset construction that all the constituent records _are_, in fact, commensurable - at least by the given scholar's definition of "commensurable".
The point of documentation is to make the dataset usable by others.
Bode actually asks for even greater usability when suggesting that the ideal scholarly dataset, unlike the HathiTrust extract features set, also carries an interface for non-technical users.
I'll quote at length:

>a curated data set is accessible to all literary scholars through an interface for searching and browsing literary data as well as facilities for export.

>The curated data set for a scholarly edition of a literary system is intended not as raw data. Rather, with its associated introduction and apparatus, it constitutes a historically contextualized model of literary-historical events and connections, and an interpretive intermediary between increasingly complex, digital disciplinary infrastructure and the requirements of literary-historical analysis.

>For other researchers, including those currently using mass-digitized collections to locate particular authors and works in the historical contexts in which they operated, a scholarly edition of a literary system will provide a carefully, consistently, and explicitly historicized digital collection for this task. For researchers interested in analyzing large-scale trends in the publication, circulation, and reception of literary works, such an edition will provide a rigorously constructed and explained “shared” data set that could be analyzed and “combined in more ways that one” (Moretti 2005: 5).

I have [written and spoken previously][pains] about the challenges I encountered when trying to interrogate two separate museum datasets from the Rijksmuseum and the British Museum, each built according to different ontologies.
Bringing together multiple collections in service of a common question was a crucial way of identifying institution-specific biases.
But it was challenging enough that I was forced to do some creative workarounds, including not _actually_ merging the two datasets.[^merging]

<script async class="speakerdeck-embed" data-slide="24" data-id="2afbe88767dc4a9d842f93b2a11277ea" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

[pains]: /cesta_lod

[^merging]: You can read more detail about this in an [article I wrote for IJDAH](http://journals.ub.uni-heidelberg.de/index.php/dah/article/view/25337).

Humanists lack the methodological implements to perform such cross comparisons between such data-rich collections of sources.

In the history of art, more so, I think, than even in literary studies, we are painfully dependent on _multiple_ collections and their expression as structured data.[^cad]
Where is the machinery to meaningfully compare (or aggregate) two datasets with well-specified, but divergent, assumptions and biases baked in?

Much like [connoisseurship is a rich man's speciality](/2015/11/16/privilege-and-connoisseurship.html)

---

One point of Bode's article that I _would_ dispute, however, is her resistance to thinking through these problems with the help of statistical tools:

>The approach I have advocated does not take the path increasingly recommended for data-rich literary history: of integrating scientific and social-scientific measures of statistical uncertainty into historical analysis (e.g., Goldstone 2015).

Without those methods, we are left with little better than the argument-from-logic that Bode deemed insufficient in all of the other scholarly work that she cites here.

[^langmead]: Alison Langmead et al., “Towards Interoperable Network Ontologies for the Digital Humanities,” _International Journal of Humanities and Arts Computing_ 10, no. 1 (March 1, 2016): 22–35, doi:[10.3366/ijhac.2016.0157](https://dx.doi.org/10.3366/ijhac.2016.0157).

[^kuhn]: Thomas S. Kuhn, “Commensurability, Comparability, Communicability,” _PSA: Proceedings of the Biennial Meeting of the Philosophy of Science Association_ 1982 (1982): 669–88, <http://www.jstor.org/stable/192452>.

[^cad]: The IMLS-supported effort [_Always Already Computational: Collections as Data_](https://collectionsasdata.github.io/) is developing guidelines and principles for cultural heritage collections working to develop their collections data for creative reuse and computation.
