---
title: Invited Speaking
layout: default
talks:
  - year: 2019
    text: "The Auctioneer's Genre: Digital Approaches to Category Construction and the Rhetoric of the 18th Century Art Market"
    place: Department of Art History
    location: Princeton University
    date: 18 October 2019
    invited: true
    short: true
  - year: 2019
    text: "'Linked Open Data for Art Historians' and 'Dealing with Uncertain and Missing Data'"
    place: Getty Foundation "Network Analysis + Digital Art History" Advanced Workshop
    location: University of Pittsburgh
    date: 29 July - 2 August 2019
    invited: true
  - year: 2019
    preamble: Chair
    text: "The State of Digital Humanities Software Development"
    place: ACH Conference
    location: Pittsburgh
    date: 26 July 2019
    conference: true
  - year: 2019
    text: |
      "Creating Tidy Humanities Data that Sparks Joy," Digital Humanities Literacy Workshop, Carnegie Mellon University
    date: 28 May--30 May 2019
    teaching: true
  - year: 2018
    text: "Linked Open Museum Data: Why Curators Should Care"
    place: AAMC Networked Curator Workshop
    location: Getty Research Institute, Los Angeles
    date: 8 February 2018
  - year: 2017
    text: "Missing Data in Digital Provenance Research"
    place: ArtTracks and the Digital Humanities Symposium
    location: Carnegie Museum of Art, Pittsburgh
    date: 6 November 2017
    conference: false
    short: false
    invited: true
  - year: 2017
    text: "From Document to Event: Challenges and Opportunities in Remodeling the Getty Provenance Index"
    place: "Golden Agents: Creative Industries and the Making of the Dutch Golden Age"
    location: "Huygens ING, Amsterdam"
    date: 12 April 2017
    invited: true
    short: true
  - year: 2016
    text: "Computing with Genre in Paintings, Prints, and Purchases: Questions of Category and Measure"
    place: Department of Art History, Emory University
    location: Atlanta
    date: 10 November 2016
    invited: true
    short: true
  - year: 2016
    text: "In the Face of the Unknown: Missingness in (Digital) History"
    place: "Creative Amsterdam: An E-Humanities Perspective"
    location: "University of Amsterdam"
    date: 28 October 2016
    invited: true
    short: true
  - year: 2016
    text: "Linked Open Data: A Researcher's Perspective"
    place: "American Art Collaborative meeting"
    location: Information Sciences Institute, Los Angeles
    date: 3 October 2016
    invited: true
    short: false
  - year: 2016
    text: "Linked Open Realities: The Joys and Pains of Using Linked Open Data for Research"
    place: "Center for Textual and Spatial Analysis, Stanford University"
    url: http://matthewlincoln.net/cesta_lod
    date: 1 June 2016
    invited: true
    short: true
  - year: 2016
    text: "Specialization and Diversity in Dutch and Flemish Printmaking (and Painting!): A Computational Approach"
    place: Digital Art History Lab, The Frick Collection
    location: New York
    date: 7 April 2016
    invited: true
    short: true
  - year: 2016
    text: "Continuity/Discontinuity: Network Dynamics in the Golden Age of Dutch Printmaking"
    place: "DHRX: Digital Humanities Research at Pitt, University of Pittsburgh"
    date: 28 March 2016
    invited: true
  - year: 2016
    text: "Assessing Potential Pasts: Computation and Networks of the Golden Age of Dutch and Flemish Printmaking"
    place: "Digital Humanities Center and the Department of Art History & Archaeology, Columbia University"
    location: New York
    date: 19 February 2016
    invited: true
    short: true
---

I'm delighted to come speak at your institution about **digital art history**, the use and abuse of **network analysis and machine learning** in historical study, as well as **collections data infrastructure for supporting research**. Contact me at [@matthewdlincoln](https://twitter.com/matthewdlincoln) or by [email](mailto:mlincoln@andrew.cmu.edu)!

## Recent invited lectures

{% for lecture in page.talks %}
- **{{ lecture.text }}**, {{ lecture.place }}, {{ lecture.location }} ({{ lecture.date }})
{% endfor %}
