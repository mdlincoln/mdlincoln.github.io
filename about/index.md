---
title: Contact Information
layout: default
show_title: true
---

**{{ site.data.contact.name_first }} {{ site.data.contact.name_last }}**  
{{ site.data.contact.position }}  
{{ site.data.contact.address }}

<{{ site.data.contact.email }}>

## [Current CV](https://www.dropbox.com/s/67epcc3kjiq6jad/mlincoln_cv.pdf)

## Other Links

<ul>
{% for link in site.data.contact.links %}
<li><a href="{{link.url}}">{{link.name}}</a></li>
{% endfor %}
</ul>
