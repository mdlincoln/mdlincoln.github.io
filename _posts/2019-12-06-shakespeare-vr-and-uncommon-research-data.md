---
title: _Shakespeare VR_ and uncommon research data
date: 2019-12-06T14:34:00.000Z
tags:
  - CMU DH
  - Data
  - Publishing
layout: post
aside: >-
  This is part of a series of posts proudly showing off the projects our team
  has worked on during my first 18 months at Carnegie Mellon University.


  [See all posts in the series](/tags/cmu_dh.html)
---
While some of our projects present complexity in data analysis, or others in the multilayered dance that is web development, sometimes they challenge us in unexpected ways and present edge cases to the kinds of services our library offers.

Dr. Stephen Wittek's (_Shakespeare VR_)\[https://shx-vr.com] was one such project. From the project description:

> The Shakespeare-VR project uses virtual reality technologies to bring students face-to-face with professional actors performing Shakespearean soliloquies in a replica of Shakespeare’s Blackfriars Playhouse.

On the one hand, this project's needs were comparatively simple. It needed a straightforward, easy-to-edit, sustainable website where the project team could post links to the 360º videos they recorded at the Blackfriars Playhouse, as well as links to curricula and educational materials.

![360 video camera](/assets/images/vr_cam.jpg)

But the project presented a new (to me) data challenge - just what kinds of data do you need to save from a 360º video project? It was clear that we wanted to preserve copies of each of the finished, edited videos the team had filmed at the playhouse into CMU's institutional repository [KiltHub](https://kilthub.cmu.edu). But we also had the _raw_ video taken by each their camera rig's 17 cameras, as well as a host of other clips of audio and video, some snapped on a phone, during the filming day.

This also exposed lots of small usability issues in FigShare's offering, which resulted in a lot of useful conversations with our scholarly communications librarian who works with the vendor supplying it. I discussed this issue with our new data management librarian Hannah Gunderman in [a blog post she wrote about the project](https://www.library.cmu.edu/blog/tartan-datascapes/11292019), on how the convenience of cloud offerings falls apart when you have data too large to comfortably send outside your own local network:

>Matthew noted that with such a large amount of data (we are talking 500GB!), it was easier to have everything on a physical hard drive rather than stored in the cloud. He immediately reached out to David Scherer, our Scholarly Communications and Research Curation Consultant at CMU Libraries, to use a reliable, old-school method called FTP, or File Transfer Protocol, for moving these large files to KiltHub. In total, the upload included both the raw data as well as the final videos edited by Stitchbridge.

It's also helped us be more mindful about how we are asking researchers to document their deposits, as the "template" `README` was clearly designed primarily for someone with tabular data coming from a scientific instrument. We're now having ongoing discussions with all the folks who work with our repository and data deposits to figure out how to accommodate items like a JavaScript-based artwork, a virtual reality game, malfunctioning Jupyter notebooks, and [other kinds of researchers' un-runable code](https://statmodeling.stat.columbia.edu/2019/11/13/what-if-its-never-decorative-gourd-season/).
