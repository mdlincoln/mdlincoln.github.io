---
title: Contact Information
layout: default
show_title: true
---

**{{ site.data.contact.name }}**  
{{ site.data.contact.position }}  
{{ site.data.contact.address }}

<{{ site.data.contact.email }}>

## Current CV
{% for version in site.data.contact.cv %}
<ul>
<li><a href="{{version.url}}">{{version.name}}</a></li>
</ul>

{% endfor %}

## Other Links

<ul>
{% for link in site.data.contact.links %}
<li><a href="{{link.url}}">{{link.name}}</a></li>
{% endfor %}
</ul>
