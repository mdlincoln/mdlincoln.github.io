---
layout: post
title: |
  Only Connect: MCN2017 and The M2M Gap
date: 2017-11-10
tags:
- LAM
- conferences
---

As a first time attendee, I didn't know entirely what to expect, other than lots of digital and museums.
The program is really quite diverse, and ranged from relatively technical discussions (sometimes dry; sometimes hilarious) to more meta-professional sessions that really did function as a kind of group therapy.
The latter sessions were clearly necessary for many attendees.
[Rachel Ropeik wrote movingly][ropeik] about how this year's MCN was teeming with stories of disillusionment, marked by a distressing number of people talking about leaving the field.[^1]

[^1]: H/T to my UMD compatriot [Nicole Riesenberger for pointing me](https://twitter.com/NRiesenberger/status/931218839152529409) to Ropeik's post.

This post is an attempt to square Ropeik's trenchant observations with some big questions that loomed during the pre-conference [Digital Provenance Symposium][dps] hosted by the Carnegie Museum of Art.

[dps]: http://conference.mcn.edu/2017/DigiProvConf.cfm

I want to focus in on one question in one session in particular, though.
At a [panel on funders' perspectives][funders_panel], program officers from the Kress Foundation, the Knight Foundation, and the Pew Center for Arts & Heritage gathered to discuss what they look for in a grant application for digital and technology initiatives in museums.
One question asked about standards: given museums' predilection to build their own bespoke services, how are funders modifying their calls to discourage "reinventing the wheel" and one-off projects, and instead encourage building of reusable systems and infrastructure.
The response from the panel was (and I paraphrase): "When the community looks like it wants that, we'll be there to support it."

[funders_panel]:  http://conference.mcn.edu/2017/profile.cfm?profile_name=session&master_key=5191A47A-A8AA-DE3B-F1A6-FC79409403BD&page_key=0244AE70-CFED-1DEC-42AB-9041A6F4885D&xtemplate&userLGNKEY=0

[w3c]: https://www.w3.org/community/art/

This was a fascinating inversion of the drumbeat of the conference, which was "find out what your audience/visitors/users actually want."
Does the museum community actually want to connect their digital assets 
together?
What should my services look like when other museums are my users?

Opening your data, or your source code, may ensure someone is able to access it... but it does not ensure they know how to use it.
How do I implement the [Barnes' particular flavor of computer vision][barnes] for collections browsing, when it's been [baked into the same repository][barnes_gh] as their custom web interface?
Does the Williams College Museum of Art collections data use the `culture` tag in the same way that the Carnegie Museum of Art collections data uses `nationality`?

The research community would love that, from a practical standpoint.
Many of the archivists and art librarians I talked to loved to the idea from a ideological point of view.

[ropeik]: https://medium.com/@TheArtRopeik/mcn2017-are-you-ok-friend-f98f21615c1

[barnes]: https://medium.com/barnes-foundation/honoring-the-ensemble-by-design-a7edbc584d3a

[barnes_gh]: https://github.com/BarnesFoundation/CollectionWebsite

[wcma_gh]: https://github.com/wcmaart/collection

[cmoa_gh]: https://github.com/cmoa/collection
