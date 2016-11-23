---
layout: post
date: 2016-11-23T15:49:41-08:00
comments: true
tags:
- data
- conferences
---

On November 19th-19th, 2016, the Huntington Library hosted a conference on ["Histories of Data and the Database"](http://www.huntington.org/historiesofdata/), convened by [Soraya de Chadarevian](http://socgen.ucla.edu/people/soraya-de-chadarevian/) and [Ted Porter](http://www.history.ucla.edu/faculty/theodore-porter) of UCLA. 
Their aims:

>In the age of internet searches and social media, data has become hot—and not for the first time. An international group of historians will consider the promises, fears, practices, and technologies for recording and transmitting data in the 18th century to the present, including the implications for the lives of citizens and subjects.

I did a [selective livetweet of the conference](https://storify.com/matthewdlincoln/histories); some even more selective reflections follow.

This was a fun event to attend as an erstwhile DHer.
While these talks suffered from no lack of thoughtful critique, they were free of the anxious signaling that accompanies a lot of DH-adjacent presentations (my own included) in which data has to be both problematized as well as defanged just enough to be used in the context of a humanistic question.
This is valuable, but it also feels like increasingly well-trodden ground.

Absent the burden of that kind of work, the speakers here unpacked "data" in a very different way, approaching it as a social phenomenon with many distinct permutations in different times and spaces.
One ensemble portrait that emerged was that data collection and databases need to be understood in a more nuanced light than the familiar Foucauldian lens of [biopower](http://www.iep.utm.edu/fouc-pol/#H7): data as a means of surveillance and control of the body.
While this is a crucial framework, actual instances of data generating and indexing practices, not to mention data analysis methods, show more complex relationships.

I'll mention just four talks here that particularly caught my attention.

Andrew Mendelsohn walked us through instances of early modern data collection and indexing.
Starting with a remarkable image of printed, fill-in-the-blank forms used to registering whether a given household was infected with leprosy, Mendelsohn charted a development of early modern data systems from the simple documenting of "**what**" (i.e. this house has leprosy), to the adoption of name indexing in municipal archives to collate documents by "**who**".
These indices were, in turn, augmented by compiled reports in which cases (medical, legal, etc.) were sorted according to topic; in other words, data about "**how**".
What made Mendelsohn's talk particularly interesting was his many examples in which a kind of early modern "crowdsourcing" -- be it individuals delivering self-created documents to the court, or scientists contributing small notes to a journal --- drove much of these databases.
The organization and use of these troves may certainly have been state-run, but the collection was not nearly so simple.

{% include figure.html src="http://blog.constitutioncenter.org/wp-content/uploads/2011/08/SSN-ring.jpg" caption="1938 advertisement for an SSN-engraved ring. [Image Source](http://blog.constitutioncenter.org/2011/08/happy-birthday-social-security/)" %}

Sarah Igo discussed the surprising history of the Social Security Number.
While today we are cautioned to guard the number carefully from identity theft, the first decades of the SSN were quite different.
Most Americans were eager to conspicuously connect themselves to their personal SSN, to ensure that their promised entitlements would be delivered properly.
While the Social Security Administration was quite adamant that it would not be issuing mandatory SSN dog tags (a totilitarian specter raised by Republican opposition), demand for SSN regalia was so potent that a _private_ market sprung up, complete with engraved rings and even tattoos!
This positive embrace, and indeed the lack (before the 1970s) of real organized anxiety about the massive data collection regime that Social Security required, truly surprised Igo when she was conducting her research.

Yet another interesting surprise came in a talk by Matthew Jones on [random forests](http://www.stat.berkeley.edu/~breiman/RandomForests/cc_home.htm) --- one which I was particularly interested in, as we are using them in our work at the Getty.
Much of his talk comprised an illuminating look at some statistical historiography --- one that is too little known, and too little referenced in digital humanities circles.
Jones, by way of Leo Breiman, gave a brief explanation the two statistical cultures of "data modeling" (developing theory to test on data) versus "algorithmic modeling" (developing models from those data).
Random forest models belong to the latter culture, aiming to "fit" the data very well, even as the internal mechanics they use to do so become difficult to parse back into a cogent, human-understandable theory.
These "black box"-ish[^bb] methods 
What was new to me in this talk was that the National Security Administration, which has financed random forest development, extolled the performance of RFs, but was gravely concerned about it uninterperability.
What use was the model if an analyst couldn't express, in real terms, why it made certain decisions?

{% include figure.html src="/assets/images-display/data_science_venn_diagram.png" caption="'data science venn diagram' results from Google Images." %}

Jones was interested in this case because he is interested epistemic virtue signaling among the contemporary data science crowd; a conversation, he noted, that often is rendered in [tweeted Venn diagrams](https://www.google.com/search?q=data+science+venn+diagram).
There is a cacophony of epistemic virtues being signaled by both critics and proponents of big data: that you don't need statistics; that you really do; that you must have specific domain expertise; that data is "theoryless" and thus domain expertise is irrelevant, etc.
While Jones is particularly curious about this in the context of contemporary history and national security, I think it's a useful reminder for us in the digital humanities that some of the best critiques of data are actually being taken up in data science circles.
As with the other talks in this conference, it turns out the data history we thought we knew is just a bit more complicated than we thought.

[^bb]: I say "-ish" because there _are_ some useful methods for visualizing the complex variable interactions that random forest models are so good at capturing, and which many scholars (humanists included) are so fond of asking for. 
    See, for example, the [forestfloor package](https://cran.r-project.org/package=forestFloor) for R.




