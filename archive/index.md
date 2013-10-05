---
layout: default
title: Blog Posts
show_title: true
---


<nav>
	<ul>
	{% for post in site.posts %}
	  <li><time datetime="{{ post.date }}">{{ post.date | date_to_string }}</time> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
	</ul>
</nav>

