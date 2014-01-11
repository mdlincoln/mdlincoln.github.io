---
layout: default
title: All Blog Posts
show_title: true
---


<nav>
    <ul>
    {% for post in site.posts %}
        {% unless post.next %}
            <h1>{{ post.date | date: '%Y' }}</h1>
        {% else %}
            {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
            {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
            {% if year != nyear %}
                <h1>{{ post.date | date: '%Y' }}</h1>
            {% endif %}
        {% endunless %}
        <li><time datetime="{{ post.date }}">{{ post.date | date: "%d %b" }}</time> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
    </ul>
</nav>
