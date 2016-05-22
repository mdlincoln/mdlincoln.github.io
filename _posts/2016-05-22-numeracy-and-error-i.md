---
layout: "post"
title: "Numeracy and Error, I"
date: "2016-05-22 15:14"
comments: true
tags:
- Digital Humanities
---

Last week, Christopher Warren of the Six Degrees of Francis Bacon project wrote a [post describing a new Twitter bot that tweets relationships, _even spurious ones_, inferred by the project from the text of the Oxford Dictionary of National Biography](http://6dfb.tumblr.com/post/144301456476/toward-a-pragmatics-of-error-in-the-digital):

>[there's] a dialogic community for whom Six Degrees errors can and should be provocations, invitations to resolve more clearly what for many is still a sense of the past too fuzzy, too inchoate, too etherial to wrap heads and hearts around.
If earlier generations might have taken a purely censorious approach to error, today's humanists can and should take a more pragmatic approach.
There often remains an infuriating gap between what true experts know and the ways that computers take up and represent that knowledge, but this gap is where slightly alien forms of humanistic scholarship like Twitter bots exist, and it is one that bots like ours seek to bridge.

Pragmatically, Warren hopes that tweeting these relationships will allow the SDFB team to uncover errors by harnessing many eyes, and thus better understand which kinds of relationships their computational model could successfully infer from the ODNB, and which are mere phantasms: things that merely _look like relationships on paper_.

Matthew Harrison wonders, however, whether moral issues need to be considered when building a bot that publicizes likely-incorrect information:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">There are risks to conflating them: even if the pragmatics are similar, the absurdity and truthiness have different moral statuses.</p>&mdash; Matthew Harrison (@matthewharrison) <a href="https://twitter.com/matthewharrison/status/732207080048726021">May 16, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Harrison also linked to his [own fascinating rumination on the historical construction of error](http://www.thrumpledumthrum.com/?p=201).
I was struck by his typology of reactions to scholarly error:

>One response is to attempt to repair the order: to remedy the typo, clarify the crux, rewrite the self-deprecation as sign of mastery.
Another, as in (2) above, is to peer into the gap, to see what we can learn about the procedures of order from its failure.
The third is to treat the break as somehow conceptually fundamental, as negating our previous understanding of order.

Warren embraces the Type 1 response: taking error as a way to correct the record.
However, he also alludes to Harrison's Type 2 response, or at least a variation thereof.
(Not to be confused with [Type II error](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#Type_II_error))
By exposing errors produced by the SDFB inference engine, they can expose its ways of ordering --- and by extension, I would suggest, some perspective on the ODNB's ways of ordering.
What does it say about the ODNB's own rhetorical style(s) that illusory relationships like this can manifest from this particular mode of textual digestion?
This is a very worthwhile exploration, one that goes beyond the regular pablum of "explaining the limitations of your sources".

What I find particularly interesting about the example that Warren gives in his post, however, is that the error isn't one of kind, but of degree:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">It is 47% likely that John Fell Bishop of Oxford met John Owen: <a href="https://t.co/l1OSOZyiE9">https://t.co/l1OSOZyiE9</a></p>&mdash; 6° of Bacon Bot (@6Bacon_Bot) <a href="https://twitter.com/6Bacon_Bot/status/730750280044847104">May 12, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Warren notes that John Bishop and John Owen most definitely knew each other.
The "error" in this particular statement, thus, is that it is not certain _enough_ about the status of the Bishop-Owen relationship.

Thinking about this brought me back to Scott Enderle's [post from last year about multidimensionality in machine learning and in humanistic research](http://www.lagado.name/blog/a-random-entry/).
Enderle points out that there is a history of machine learning --- a shift away from a focus on deterministic, logic-based systems towards dependence on probabilistic statistical models --- that is relevant for the (digital) humanities.[^2]
Indeed, he argues that probabilistic machine learning adopts a humanistic hermeneutic that predates it by several decades:

[^2]: [Ted Underwood has also suggested](http://dx.doi.org/10.1177/2053951715602494) this intellectual history adds more nuanced coloration current polemics about big data in the humanities.

>The kind of knowledge that these machines have does not take the form of a rich, highly structured network of immutable concepts and relations with precise and predictable definitions.
It takes the form of a loose assembly of inconsistent and mutually incompatible half-truths, always open to revision and transformation, and definable only by the particular distinctions it can make or elide at any given moment.
It's the kind of knowledge that many literary scholars and humanists have found quite interesting for the last few decades.

I like the parallel that Enderle draws between PML and the multidimensional, accumulative character of humanistic inquiry (its current modes in particular).
I appreciate that it underlines how subtle machine learning can actually be.
While the precision of SDFB's uncertainty statements ("47%") can appear alien to the uninitiated, they are precisely the measure of uncertainty that scholars have been asking of their digital techniques.
Increasingly, I think that it is machine learning's focus on _uncertainty_ that promises the most valuable contribution to art history and other humanistic disciplines.

That said, my gut instinct is that, as attractive as the parallel is, it is difficult to realize its affordances in practice.
Humanistic vocabulary for doubt rarely trades in such explicitly quantitative idioms.
What is more, even as these PML systems can manage accumulative and contradictory layers of evidence, that evidence must still be entered in some discretized manner --- that is, it must be expressed as some type of [feature](http://www.lagado.name/blog/the-size-of-the-signifier/).
The demand for structured assertions --- even if they are allowed to be contradictory and multidimensional --- is probably still a tough pill for many scholars to swallow.

Computing over conflicting, heterodox descriptive systems is, I believe, a crucial and largely-uncharted region of digital humanities research.
There is surely a place for it between the DH realms of rich description (such as Miriam Posner's ["Radical, Unrealized Potential of Digital Humanities"](http://miriamposner.com/blog/whats-next-the-radical-unrealized-potential-of-digital-humanities/) or Todd Presner's ["thick mapping"](http://escholarship.org/uc/item/3mh5t455)) and those of statistical analysis and machine learning.
Rather than yet another play on the affordances of scale or "distant X", this approach could pay more attention to [small _n_, large _p_](http://stats.stackexchange.com/questions/13481/summary-of-large-p-small-n-results) problems, where the number of objects may be relatively small, but the number of their properties challenges synthetic analysis.

I am particularly interested in the relationship between confidence measures in PML and the language of confidence and uncertainty used in art historical scholarship.
Confidence is a crucial question art history, particularly the [connoisseurial branch](/2015/11/16/privilege-and-connoisseurship.html) of the discipline.
Rhetorics of certainty and uncertainty can impact auction sales by millions of dollars, or institutional repute by even greater measures.[^1]
Ad hoc "uncertainty dictionaries" can be found in both catalogues raisonné as well as on museum wall labels, designed to suit the specific purpose of the catalogue, or to conform to the collecting and cataloguing histories of the institution.
(See, for example, the [typology of attribution used for seventeenth-century Dutch paintings at the National Gallery of Art](http://www.nga.gov/content/ngaweb/research/online-editions/17th-century-dutch-paintings/notes-to-the-user-online-editions.html))
How can we compute over these heterodox methods for describing attribution uncertainty --- or uncertainty in provenance or technique, for that matter?

[^1]: See, for example, the perceptive and scathing review of the Rembrandt Research Project by Mansfield Kirby Talley, "Connoisseurship and the Methodology of the Rembrandt Research Project," _The International Journal of Museum Management and Curatorship_ 8 (1989): 175–214. doi:[0260-4779(89)90022-8](http://dx.doi.org/10.1016/0260-4779(89)90022-8)

I've [written previously](/2014/07/28/the-meta-slash-data-of-art-history.html) about how grappling with the history of art classification and description must be a crucial part of digital art history going forward.
In a forthcoming post next week, I'll introduce a collaborative project that tries to use probabilistic machine learning to interrogate one such art historical uncertainty dictionary, looking not at stereotypically "big" data, but rather a relatively small set of very richly-described paintings.
