---
title: Contact Information
layout: default
show_title: false
---

<img src="/assets/images/author.jpg" align="right" />


## Current CV ([Word]({{ site.data.contact.cv.word }})) ([PDF]({{ site.data.contact.cv.pdf }})) ([HTML]({{ site.data.contact.cv.html }}))

## Contact Information

**{{ site.data.contact.name }}**  
{{ site.data.contact.position }}  
{{ site.data.contact.address }}

<{{ site.data.contact.email }}>



## Other Links

{% for link in site.data.contact.links %}
- [{{ link.name }}]( {{ link.url }})
{% endfor %}
