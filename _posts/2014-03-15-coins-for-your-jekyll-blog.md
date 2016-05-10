---
layout: post
comments: true
title: "COinS for Your Jekyll Blog"
date: 2014-03-15 13:13
tags:
  - Code
  - Publishing
---

[COinS] is a convention for embedding bibliographic metadata in HTML.
If, like most academics, you use citation management software like [Zotero] or [Mendeley], when you visit a site like [JSTOR] or [WorldCat] your browser plugin will helpfully recognize that you are looking at a journal article or book, and give you the option to import it directly to your citation database.
This plugin has read the bit of COinS code and scraped all that information up for you.

As academics increasingly turn to "gray publications" like blogs for their scholarly communication, it's important that we make *citing* these online publications as easy as possible.
If you use WordPress, you can already use a [ScholarPress plugin](http://wordpress.org/plugins/scholarpress-coins/) to add these COinS snippets to your blog posts.
For those of us using [Jekyll], the easiest way to add these is via the `_includes` system.
Just pop this snippet into your `_includes` folder and then add `{% raw %}{% include coins.html %}{% endraw %}` in the body of your post layout file:

{% highlight html %}
{% raw %}
<span class="Z3988" title="ctx_ver=Z39.88-2004&amp;rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Adc&amp;rft.title={{ page.title | cgi_escape }}&amp;rft.aulast={{ site.data.contact.name_last | cgi_escape }}&amp;rft.aufirst={{ site.data.contact.name_first | cgi_escape }}&amp;rft.source={{ site.data.site.title | cgi_escape }}&amp;rft.date={{ page.date | date_to_xmlschema }}&amp;rft.type=blogPost&amp;rft.format=text&amp;rft.identifier={{ site.url | cgi_escape }}{{ page.url | cgi_escape }}&amp;rft.language=English"></span>
{% endraw %}
{% endhighlight %}

Because everything needs to be escaped as part of a single HTML string, it's a bit hard to read the raw code.
The important variables here are:

- post title
- last name
- first name
- site title
- post date
- resource type (I've automatically set this as `blogPost`)
- post url

You should modify the liquid tags as needed to match your own Jekyll setup.


[COinS]: http://ocoins.info/

[Zotero]: https://www.zotero.org

[Mendeley]: http://www.mendeley.com/

[Jekyll]: http://jekyllrb.com

[JSTOR]: http://jstor.org

[WorldCat]: http://worldcat.org
