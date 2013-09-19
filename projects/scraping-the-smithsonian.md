---
comments: true
date: 2013-08-09 14:04:42.465484
layout: project
title: Scraping the Smithsonian
snippet: A beginner Ruby script for downloading collection data from the Smithsonian Institution in bulk, and parsing it into well-formed JSON.
img: /assets/images-display/si_scrape_avatar.png
---

<aside>
<p>See associated blog posts <a href="/2013/08/08/scraping-the-smithsonian.html">here</a> and <a href="/2013/08/09/parsing-the-smithsonian.html">here</a>.</p>
</aside>

`si-scrape` is a Ruby script for scraping information from the web portal for the collections of the Smithsonian Institution and parsing them into JSON, a standard data interchange format that is human readable and can accommodate the heterogeneous metadata of the Smithsonian's sprawling collections.

**[Download si-scrape from GitHub](https://github.com/mdlincoln/si-scrape)**

Records will appear as such:

{% highlight json %}
{
"saam_1978.146.1": {
    "Title": "Slaughterhouse Ruins at Aledo",
    "Image": "http://americanart.si.edu/images/1978/1978.146.1_1a.jpg",
    "Artist": [
      "Gertrude Abercrombie, born Austin, TX 1909-died Chicago, IL 1977"
    ],
    "Medium": [
      "oil on canvas"
    ],
    "Dimensions": [
      "20 x 24 in. (50.9 x 61.0 cm)"
    ],
    "Type": [
      "Painting"
    ],
    "Date": [
      "1937"
    ],
    "Topic": [
      "Landscape",
      "Landscape\\Spain\\Aledo",
      "Architecture Exterior\\ruins",
      "Architecture Exterior\\industry\\slaughterhouse"
    ],
    "Credit Line": [
      "Smithsonian American Art Museum, Gift of the Gertrude Abercrombie Trust"
    ],
    "Object number": [
      "1978.146.1"
    ],
    "See more items in": [
      "Smithsonian American Art Museum Collection"
    ],
    "Data Source": [
      "Smithsonian American Art Museum"
    ],
    "Record ID": [
      "saam_1978.146.1"
    ],
    "Visitor Tag(s)": [
      "\nNo tags yet, be the first!\n\nAdd Your Tags!\n"
    ]
  },
}
{% endhighlight %}

Every SI object comes with a unique ID (e.g. `saam_1978.146.1`) and title (e.g. `Slaughterhouse Ruins at Aledo`), as well as an image URL (although this will sometimes be a blank image for objects without visual records). Other elements could potentially have multiple values, and so they are stored as nested arrays in the JSON output, which can easily be parsed by [Ruby's JSON module](http://www.ruby-doc.org/stdlib-2.0/libdoc/json/rdoc/JSON.html) or other library of your choice.

![Trends in the National Inventory of Artworks and Sculpture](/assets/images/aic_moving_average.svg)


