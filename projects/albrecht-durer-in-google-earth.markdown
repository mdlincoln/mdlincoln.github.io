---
date: 2013-06-14 16:51:57+00:00
layout: project
title: Albrecht Dürer in Google Earth
snippet: A Google Earth visualization of part of Albrecht Dürer's 1520 journey to the Netherlands.
img: /assets/images-display/durer_avatar.png
---

# Introduction


This February I was introduced to Janelle Jenstead's [Map of Early Modern London](http://mapoflondon.uvic.ca/). This project seeks to mark up a host of sixteenth and seventeenth-century texts in [TEI](http://www.tei-c.org/index.xml)-compliant XML, and to generate both a web-accessible linked repository as well as an overlay of landmarks and links on a digitized version of the [Agas map](http://mapoflondon.uvic.ca/map.htm). The MoEML was a static map, but it got me wondering how could you map a text that covered broad spans of both space, as well as time?

The German master artist Albrecht Dürer left art historians an unparalleled archival legacy with his detailed diary of his trip to the Netherlands in 1520-1521. This text is invaluable for documenting Dürer's encounter with the art and artists of the Netherlands, as well as his opinions on the growing religious tensions in northern Europe. Beyond this, however, Dürer’s meticulous journal offers a glimpse of a sixteenth-century international traveler's day-to-day experience, telling us of his quotidian purchases, sales and gifts of small sketches, and personal interactions large and small as he traveled between the great cities of the north.

During the spring of 2013, thanks to an assistantship in the digital humanities funded through my Smith Family fellowship with the Department of Art History's Michelle Smith Collaboratory for Visual Culture at the University of Maryland, College Park, I devised a solution for generating an interactive representation of this journey in [Google Earth](http://www.google.com/earth/index.html). Using a translation published in Georges Marlier and Marnix Gijsen, _Albrecht Dürer: Diary of His Journey to the Netherlands, 1520-1521_ (Greenwich, New York Graphic Society, 1971), I created a proof-of-concept map that charts the first month of Dürer's journey.


# Processing the diary


By encoding the text as an XML document where places, people, and artworks are marked as elements in a hierarchical tree of diary entries, I was able to create a machine-readable "index" of the diary. This process was not unlike preparing a book index. Below you can see an example of the plain text of a diary entry, and it's marked-up version:

	Next day, Friday, we came to Forchheim and there I paid 22 pf. for the convoy. Thence I journeyed to Bamberg where I presented the Bishop with a painting of the Virgin, a Life of the Virgin, an Apocalypse, and a florin's worth of engravings. He invited me as his guest, gave me a Toll-pass and three letters of introduction and paid my bill at the Inn, where I had spent about a florin.

{% highlight xml %}
<entry>
	<date>1520-07-13</date>
	<text><place id="Forchheim">Next day, Friday, we came to Forchheim and there I paid 22 pf. for the convoy.</place><place id="Bamberg"> Thence I journeyed to Bamberg where I presented <person id="GeorgSchenk">the Bishop</person> with a <artwork id="VirginPtg1">painting of the Virgin</artwork>, <artwork id="VirginCut1504">a Life of the Virgin</artwork>, <artwork id="ApocCut1498">an Apocalypse</artwork>, and <artwork id="MiscEng">a florin's worth of engravings</artwork>. He invited me as his guest, gave me a Toll-pass and three letters of introduction and paid my bill at the Inn, where I had spent about a florin.</place></text>
</entry>
{% endhighlight %}

I have marked Dürer's various colloquial references with unique identifiers, so that even if he refers variously to the same entity (e.g. "my wife", "Agnes"), the program can still register them as the same thing, and copy equivalent information onto the map. I then generated an XSLT stylesheet that could format this document into a KML file to be displayed in Google Earth, copying in additional information on people and artworks that I listed in accompanying tables.

[![Clicking on cities will reveal the locations, people, and artworks mentioned in that location. ](http://mlincoln.files.wordpress.com/2013/06/screen-shot-2013-06-14-at-8-37-55-am.png?w=625)](http://mlincoln.files.wordpress.com/2013/06/screen-shot-2013-06-14-at-8-37-55-am.png)

All the placemarks on this map - places, people, and artworks - are timestamped, so that by adjusting the time slider in the Google Earth interface one can visualize Dürer's journey through space and time in a way not easily grasped by reading the printed diary text alone. Because this map was generated directly from the text of the diary, the primary source has been preserved. By clicking on individual placemarks, you may read the specific diary entry from which that marker was derived, connecting you directly back to the primary source. Future additions and revisions to the digitized diary text can be easily incorporated by re-processing the text with the XSLT stylesheet.


# Results and future work


You can immediately recognize Dürer's decreasing pace of travel as he moves out of the familiar regions around Nuremberg. It is also revealing that his route, which looks winding and erratic from afar, in fact hews quite closely to the rivers along his path.

I hope that this proof-of-concept might inspire more creative models for digital publishing of primary sources. Though not all texts can be as readily mapped as Dürer's travelogue, visualizations of the contents, subjects, or geographical/temporal coverage of varied primary sources can help make them more immediately accessible to users, while designing these discovery layers in such a way that the source text is preserved and remains accessible in its entirety.

# Links

- See this project featured at the [Michelle Smith Collaboratory for Visual Culture](http://michellesmithcollaboratory.umd.edu/maps).
- See the full XML and XSLT on [GitHub](https://github.com/mdlincoln/durer/tree/master).