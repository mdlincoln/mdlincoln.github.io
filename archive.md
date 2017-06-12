---
layout: default
title: Archive
show_title: true
redirect_from: /archive/
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
        {% include postlink.html %}
    {% endfor %}
    </ul>
</nav>
