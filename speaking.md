---
title: Invited Speaking
layout: default
talks:
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
  - year: 2015
    text: "Experimental Models and Art Historical Computing: Networks in the Golden Age of Dutch and Flemish Printmaking"
    place: "Digital Dialogues, Maryland Institute for Technology in the Humanities"
    location: College Park, MD
    date: 27 October 2015
    url: "http://mith.umd.edu/podcasts/dd-fall-2015-matthew-lincoln"
    invited: true
  - year: 2015
    text: "The Art Historian's Macroscope: Museum Data and the Academy"
    place: "DASER Forum, National Academy of Sciences"
    location: "Washington, DC"
    date: 21 May 2015
    url: "http://matthewlincoln.net/macroscope"
    invited: true
---

I'm delighted to come speak at your institution about **digital art history**, the use and abuse of **network analysis and machine learning** in historical study, as well as **research and collections data infrastructure**. Contact me at [@matthewdlincoln](https://twitter.com/matthewdlincoln) or by [email](&#109;&#097;&#105;&#108;&#116;&#111;:&#109;&#108;&#105;&#110;&#099;&#111;&#108;&#110;&#064;&#103;&#101;&#116;&#116;&#121;&#046;&#101;&#100;&#117;)!

## Recent invited lectures

{% for lecture in page.talks %}
- **{{ lecture.text }}**, {{ lecture.place }}, {{ lecture.location }} ({{ lecture.date }})
{% endfor %}
