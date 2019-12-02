---
layout: post
date: 2016-11-23T15:49:41-08:00
comments: true
tags:
- data
- conferences
---

On November 18-19th, 2016, the Huntington Library hosted a conference on ["Histories of Data and the Database"](http://web.archive.org/web/20161121223723/http://www.huntington.org/historiesofdata/), convened by [Soraya de Chadarevian](http://socgen.ucla.edu/people/soraya-de-chadarevian/) and [Ted Porter](http://www.history.ucla.edu/faculty/theodore-porter) of UCLA.
Their aims:

>In the age of internet searches and social media, data has become hot—and not for the first time. An international group of historians will consider the promises, fears, practices, and technologies for recording and transmitting data in the 18th century to the present, including the implications for the lives of citizens and subjects.

I did a [selective livetweet of the conference](https://twitter.com/search?q=matthewdlincoln%20%23historiesofdata&src=typd); some even more selective reflections follow.

This was a fun event to attend as an erstwhile DHer.
While these talks suffered from no lack of thoughtful critique, they were free of the anxious signaling that accompanies a lot of DH-adjacent presentations (my own included) in which data has to be both problematized as well as defanged just enough to be used in the context of a humanistic question.
Whether we need it to conspicuously succeed or fail, we need our data to _do something_.
This is valuable, but it also feels like increasingly well-trodden ground.

Absent the burden of that kind of work, the speakers here unpacked "data" in a very different way, approaching it as a social phenomenon with distinct permutations in different times and spaces.
One ensemble portrait that emerged was that data collection and databases need to be understood in a more nuanced light than the familiar Foucauldian lens of [biopower](http://www.iep.utm.edu/fouc-pol/#H7); that is, data as a means of state surveillance and control, of the body in particular.
While this is a crucial framework, the actual instances of data generating and indexing practices, not to mention data analysis methods, discussed at this conference unearthed more complex relationships.

I'll mention just three talks here that particularly caught my attention.

Andrew Mendelsohn walked us through instances of early modern data collection and indexing.
Starting with a remarkable image of printed, fill-in-the-blank forms used in Germany to register whether a given household was infected with leprosy, Mendelsohn charted a development of early modern data systems from the simple documenting of "_what_" (i.e. this house has leprosy), to the adoption of name indexing in municipal archives to collate documents by "_who_".
These indices were, in turn, augmented by compiled reports in which cases (medical, legal, etc.) were sorted according to topic; in other words, data about "_how_".
What made Mendelsohn's talk particularly interesting was his many examples in which a kind of early modern "crowdsourcing" -- be it individuals delivering self-created documents to the court, or scientists contributing small notes to a journal --- drove the construction of these databases.
The organization and use of these troves may certainly have been state-run, but the collection was not as top-down as we may have assumed.

{% include figure.html src="/assets/images/SSN-ring.jpg" caption="1938 advertisement for an SSN-engraved ring. [Image Source](https://web.archive.org/web/20170328071328/https://constitutioncenter.org/blog/happy-birthday-social-security/)." %}

Sarah Igo discussed the surprising history of the Social Security Number.
While today we are cautioned to guard the number carefully from identity theft, the first decades of the SSN were quite different.
Most Americans were eager to conspicuously connect themselves to their personal SSN, to ensure that their promised entitlements would be delivered properly.
While the Social Security Administration was quite adamant that it would not be issuing mandatory SSN dog tags (a totalitarian specter raised by Republican opposition to the act), demand for SSN regalia was so potent that a _private_ market sprung up, complete with engraved rings and even tattoos!
This positive embrace, and indeed the lack (before the 1970s) of real organized anxiety about the massive data collection regime that Social Security required, truly surprised Igo when she was conducting her research.

Yet another surprise came in a talk by Matthew Jones on [random forests](http://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm) --- one which I was particularly interested in, as we are using them in our work at the Getty.
Much of his talk comprised an illuminating look at some statistical historiography --- one that is too little known, and too little referenced in digital humanities circles.
Jones, by way of Leo Breiman, gave a brief explanation the [two statistical cultures of "data modeling" (developing theory to test on data) versus "algorithmic modeling" (developing models from those data)](http://projecteuclid.org/euclid.ss/1009213726).
Random forest models belong to the latter culture, aiming to "fit" the data very well, even as the internal mechanics they use to do so become difficult to parse back into a cogent, human-understandable theory.
This is sometimes called the "black box" problem.[^bb]
What was new to me in this talk was that the National Security Administration, which has financed random forest development, extolled the performance of RFs, but was gravely concerned about their uninterperability.
What use was the model if an analyst couldn't express, in real terms, why it made certain decisions?

{% include figure.html src="/assets/images-display/data_science_venn_diagram.png" caption="'data science venn diagram' results from Google Images." %}

Jones looked in to this case because he was interested epistemic virtue signaling among the contemporary data science crowd; a conversation, he noted, that often is rendered in [tweeted Venn diagrams](https://www.google.com/search?q=data+science+venn+diagram).
There is a cacophony of epistemic virtues being signaled by both critics and proponents of big data: that you don't need statistics; that you really do; that you must have specific domain expertise; that data is "theoryless" and thus domain expertise is irrelevant, etc.
While Jones is particularly curious about this in the context of contemporary history and national security, I think it's a useful reminder for us in the digital humanities that some of the best critiques of data are actually being taken up in data science circles, and, as Ted Underwood frequently reiterates, that [statistics has its own historiography](https://doi.org/10.1177/2053951715602494) which humanists ignore at our own peril.

[^bb]: Random forests are really only black-box-_ish_ because there _are_ some useful methods for visualizing the complex variable interactions that random forest models are so good at capturing, and which many scholars (humanists included) are so fond of asking for.
    See, for example, the [forestfloor package](https://cran.r-project.org/package=forestFloor) for R.




