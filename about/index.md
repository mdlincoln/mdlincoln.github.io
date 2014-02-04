---
title: Contact Information
layout: default
show_title: false
---

<img src="/assets/images/author.jpg" align="right" />


## Current CV
{% for version in site.data.contact.cv %}
- [{{version.name}}]({{version.url}})
{% endfor %}

## Contact Information

**{{ site.data.contact.name }}**  
{{ site.data.contact.position }}  
{{ site.data.contact.address }}

<{{ site.data.contact.email }}>



## Other Links

{% for link in site.data.contact.links %}
- [{{ link.name }}]({{ link.url }})
{% endfor %}
