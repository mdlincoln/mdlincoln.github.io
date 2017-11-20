---
layout: post
title: MCN2017 and the Museum <-> Museum Gap
date: 2017-11-17
tags:
- LAM
- conferences
---

As a first time attendee of MCN last week, I didn't know entirely what to expect, other than all things digital plus museums.
The program was really quite diverse, and ranged from relatively technical discussions (sometimes dry; sometimes hilarious) to more meta-professional sessions that really did function as a kind of group therapy.
The latter sessions were clearly necessary for many attendees.
[Rachel Ropeik starkly describes][ropeik] how this year's MCN teemed with stories of disillusionment, marked by a distressing number of people talking about leaving the field.[^1]
This post is an attempt to set Ropeik's trenchant observations next to some overarching questions from the pre-conference [Digital Provenance Symposium][dps] hosted by the Carnegie Museum of Art, and assess how MCN and the musetech community are doing at actually building shared digital practices.

[^1]: H/T to my UMD compatriot [Nicole Riesenberger for pointing me](https://twitter.com/NRiesenberger/status/931218839152529409) to Ropeik's post.

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">2017 Digital Provenance Symposium seeing <a href="https://twitter.com/cmoa?ref_src=twsrc%5Etfw">@cmoa</a>’s Northbrook tools in the wild <a href="https://twitter.com/hashtag/MCN2017?src=hash&amp;ref_src=twsrc%5Etfw">#MCN2017</a> <a href="https://twitter.com/hashtag/digiprov?src=hash&amp;ref_src=twsrc%5Etfw">#digiprov</a> <a href="https://t.co/AF5Mfly8Of">pic.twitter.com/AF5Mfly8Of</a></p>&mdash; Karina Wratschko (@karinanw) <a href="https://twitter.com/karinanw/status/927628858739838978?ref_src=twsrc%5Etfw">November 6, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The pre-conference gathering was supported by CMOA's [ArtTracks project][arttracks] to develop a suite of open source software tools, as well as data models and vocabularies, for structuring data about provenance.
Part of ArtTracks' stated mission is to develop outcomes that are "useful (and usable) across multiple institutions."
What were we doing, asked keynote speaker Jo Ellen Parker (president of the Carnegie Museums of Pittsburgh) to stem the tide of these proliferating, bespoke ways of talking about shared problems?
Most speakers only proved how badly our community needed to hear that point.
They each discussed how they are handling the creation and sharing of their own provenance data - most of which entailed creating custom data models and services to run them.
Everyone, though, was acknowledging the problem Parker pointed out: what does it mean to collect data for your research but help it have a life (and users) outside that particular project?
And how will we deal - both technically and socially - with the perils of OPP: Other People's Provenance?

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Sketchnotes from the afternoon session on <a href="https://twitter.com/hashtag/digiprov?src=hash&amp;ref_src=twsrc%5Etfw">#digiprov</a>, pre-<a href="https://twitter.com/hashtag/MCN2017?src=hash&amp;ref_src=twsrc%5Etfw">#MCN2017</a>, with <a href="https://twitter.com/matthewdlincoln?ref_src=twsrc%5Etfw">@matthewdlincoln</a> <a href="https://twitter.com/workergnome?ref_src=twsrc%5Etfw">@workergnome</a> &amp; many more. /cc <a href="https://twitter.com/caw_?ref_src=twsrc%5Etfw">@caw_</a> <a href="https://t.co/tp10QBlOrg">pic.twitter.com/tp10QBlOrg</a></p>&mdash; Jason Alderman (@justsomeguy) <a href="https://twitter.com/justsomeguy/status/927767414544195584?ref_src=twsrc%5Etfw">November 7, 2017</a></blockquote>

[arttracks]: http://www.museumprovenance.org/

[dps]: http://conference.mcn.edu/2017/DigiProvConf.cfm

Did the sessions at MCN proper fill the gaps in this conversation?
Short answer: no.

I did not see sustained discussions about museum-to-museum functions and processes at this conference.
When it came to bits-on-the-ground technical work, there was lots of "here's what we do in _our_ museum."
But there was vanishingly little of "a group of us think this is the way to go and we're trying to get others to join, too."

Now, there were some really important exceptions to this: workshops on IIIF, on database-backed publishing, and a session on what it means for museums to open-source.
And I'm sad to say I had to leave before making the Friday session on collaborative digital projects that looks like it did touch on some of these questions more explicitly.
But my overall impression solidified while I was listening to a [panel on funders' perspectives][funders_panel].
Here, program officers from the Kress Foundation, the Knight Foundation, and the Pew Center for Arts & Heritage gathered to discuss what they look for in a grant application for digital and technology initiatives in museums.
One member of the audience asked the $64,000 question: given museums' predilection to build their own bespoke services, how are funders shaping their calls to discourage "reinventing the wheel" and one-off projects, and instead encourage building of reusable systems and infrastructure?

The response from the panel was (and I paraphrase): "When the community looks like it really wants that, we'll be there to support it."

[funders_panel]:  http://conference.mcn.edu/2017/profile.cfm?profile_name=session&master_key=5191A47A-A8AA-DE3B-F1A6-FC79409403BD&page_key=0244AE70-CFED-1DEC-42AB-9041A6F4885D&xtemplate&userLGNKEY=0

[w3c]: https://www.w3.org/community/art/

While one could grumble that this sets up a catch-22, it's hard to disagree with the assessment that MCN and the musetech community still doesn't seem ready to dive into the weeds about growing a _community of practice for building digital services and infrastructure that crosses institutional boundaries_.
There were many presentations on lovely systems being constructed to serve institutional needs (both staff-facing and visitor-facing).
But there was little discussion of what components of those systems could be re-deployed by sibling institutions for their own uses.

[ch_api]: https://labs.cooperhewitt.org/2014/the-api-at-the-center-of-the-museum/

This was a fascinating inversion of the drumbeat of the conference, which was "find out what your audience/visitors/users actually want."
If it's crucial to acknowledge that "you are not your visitors," it's likewise important to recognize that visitors are not the only (or even the most predominant) users of your digital systems.
What should my services look like when my own museum and staff are the users?[^2]
What should my services look like when other museums are my users?
How do I support visitors and users who don't view my museum as the extent of the known universe, but want to aggregate my collections with other institutions?

[^2]: [See Cooper Hewitt Labs on dogfooding their API.][ch_api]

If MCN2017 wasn't taking strides towards addressing these questions, you could see those questions being asked between the lines in sessions like that on the challenges of open sourcing.
Opening your data, or your source code, may ensure someone is able to access it... but it does not necessarily help them use it.
For example, how do I implement the [Barnes' particular flavor of computer vision][barnes] for collections browsing, when it's been [baked into the same repository][barnes_gh] as their custom web interface, rather than split out as its own service component?
If I'm a visitor who wants to compare collections, how do I know if the [Williams College Museum of Art collections data][wcma_gh] uses the `culture` tag in the same way that the [Carnegie Museum of Art collections data][cmoa_gh] uses `nationality`?
If I'm a curatorial assistant, do I really have to copy labels out of a PDF generated by a loaning museum's TMS into _my_ TMS by hand? (Raise your hand if you or someone you know has to do this regularly 👋)
If I want fix some of these problems by working with nascent standards, how can I start to implement the [linked.art] model being established by the American Art Collaborative and the Getty, when it's just little old me and I have fifty other priorities on my to-do list?

At the end of the day, looming over this need for museum-to-museum standards are the realities of understaffing and mixed-up priorities that Ropeik outlined.
In other words: "Help build a standard _and_ implement it? In this economy!?"

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">Sketchnotes from the <a href="https://twitter.com/hashtag/mcn2017?src=hash&amp;ref_src=twsrc%5Etfw">#mcn2017</a>-F27 session on collaborative digital projects, linked data and ... operationalizing? /cc <a href="https://twitter.com/ddegler?ref_src=twsrc%5Etfw">@ddegler</a> <a href="https://t.co/AfoeR3j5Q2">pic.twitter.com/AfoeR3j5Q2</a></p>&mdash; Jason Alderman (@justsomeguy) <a href="https://twitter.com/justsomeguy/status/929095662976815105?ref_src=twsrc%5Etfw">November 10, 2017</a></blockquote>

But paradoxically, figuring out how to foster the kinds of communities that develop practical digital standards and tools could actually help the musetech community to dig itself out of the institutional traps that are plainly causing so much pain.
Rather than acceding to requests to build fancy one-off solutions (the Getty, by the way, is massively guilty of this!) we can start pointing to the work of [growing communities][w3c] that are making it practically possible to advocate for tool and standards reuse.
It can ensure that the major investments of staff time and brainpower that places like MoMA or the Getty can afford can _practically_ benefit much smaller institutions relying on a single "digital" staff member.

I'm not yet sure if I'm coming to MCN2018.
But I don't plan on fleeing the community quite yet.
I'm hopeful it can turn towards building a community of shared digital practice that matches the incredible and aspirational community of social practice that it has fostered so well in the past few years.

In the meantime, come chime in on the growing [linked.art] community :)

[linked.art]: http://linked.art

[ropeik]: https://medium.com/@TheArtRopeik/mcn2017-are-you-ok-friend-f98f21615c1

[barnes]: https://medium.com/barnes-foundation/honoring-the-ensemble-by-design-a7edbc584d3a

[barnes_gh]: https://github.com/BarnesFoundation/CollectionWebsite

[wcma_gh]: https://github.com/wcmaart/collection

[cmoa_gh]: https://github.com/cmoa/collection
