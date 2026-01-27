---
title: Invited Speaking
layout: default
talks:
  - year: 2023
    text: What is non-consumptive data and what can you do with it?
    place: NISO+
    date: 14 February 2023
    tech: true
  - year: 2021
    text: |
      Digital Art History, Network Analysis, and DH Dissertations
    place: Michelle Smith Collaboratory for Visual Culture
    location: University of Maryland
    date: 1 November 2021
    invited: true
  - year: 2021
    text: |
      The Labor Behind DH Data Complexity
    place: |
      Making Research Data Public: Workshopping Data Management for Digital Humanities
    location: University of Ottawa Library
    date: 21 May 2021
    invited: true
    url: https://doi.org/10.1184/R1/14740440
  - year: 2021
    preamble: With Julia Corrin, Emily Davis, and Scott B. Weingart
    text: |
      Centering the Human Expert: Experiments in Computer Vision Infrastructure for Digital Collection Management
    place: CNI Spring 2021 Virtual Membership Meeting
    conference: true
    url: https://doi.org/10.1184/R1/14216609
    date: 15 March 2021
  - year: 2021
    text: |
      From Social Networks to Ontological Networks: The Tricky Relationship Between DH and GLAM Data
    place: Vanderbilt University
    invited: true
    short: true
    date: February 11 2021
  - year: 2020
    text: |
      Yet another digital surrogate? Computer vision and the future of collections management systems
    place: |
      DHNord 2020: The Measurement of Images
    location: Lille Nord de France
    date: November 18 2020
    conference: true
    tech: true
    url: https://doi.org/10.1184/R1/13203917
  - year: 2020
    text: |
      From Supercomputer to Static Site: Boiling Down Big Research Data for Preservation and Usability
    place: code4lib
    location: Pittsburgh
    conference: true
    tech: true
    date: 9 March 2020
  - year: 2020
    text: |
      Ways of Forgetting: The Librarian, The Historian, and the Machine
    place: Sawyer Seminar "Information Ecosystems"
    location: University of Pittsburgh
    date: 6 February 2020
    invited: true
    short: true
  - year: 2019
    text: |
      The Auctioneer's Genre: Digital Approaches to Category Construction and the Rhetoric of the 18th Century Art Market
    place: Department of Art History
    location: Princeton University
    date: 18 October 2019
    invited: true
    short: true
  - year: 2019
    text: |
      'Linked Open Data for Art Historians' and 'Dealing with Uncertain and Missing Data'
    place: Getty Foundation "Network Analysis + Digital Art History" Advanced Workshop
    location: University of Pittsburgh
    date: 29 July - 2 August 2019
    invited: true
  - year: 2019
    preamble: Chair
    text: |
      The State of Digital Humanities Software Development
    place: ACH Conference
    location: Pittsburgh
    date: 26 July 2019
    conference: true
  - year: 2019
    text: |
      What Data Science Gets Wrong About Art History, And Why That Makes It Useful
    place: Elon University Art History Speaker Series
    date: 27 February 2019
    invited: true
  - year: 2018
    text: |
      Enjoying the Reputation of Rubens: Language, Category, and Construction in the History of the Art Market
    place: Duke University
    date: 2 November 2018
    invited: true
---

I'm delighted to come speak at your institution about **digital art history**, the use and abuse of **network analysis and machine learning** in historical study, as well as **collections data infrastructure for supporting research**, and **alternative career paths for PhDs**. Contact me by [email](mailto:matthew.d.lincoln@gmail.com)!

## Recent invited lectures

{% for lecture in page.talks %}
- <strong>{{ lecture.text }}</strong><br/>
  {{ lecture.place }}, {{ lecture.location }} ({{ lecture.date }})
{% endfor %}
