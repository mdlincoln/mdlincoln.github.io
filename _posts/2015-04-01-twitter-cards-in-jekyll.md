---
layout: post
comments: true
title: "Twitter cards in Jekyll"
date: 2015-04-01 14:21
tags: 
- Code
---

A while back I brought you [COinS for Your Jekyll Blog][coins].
(I'm proud to say they've also recently been [added to Programming Historian][ph] posts!)
Today, I discuss how to add [Twitter Cards][tc] to your Jekyll posts.

Adding a few `<meta>` tags to your Jekyll layout will ensure that any time someone pastes one of your URLs into a tweet, a small post summary and even an image will pop up within that tweet.

![Twitter Card example](/assets/images-display/twitter_card.png)

While you can read more on the Twitter dev pages about the intricacies of different fields, I use the following setup on this blog. I've got a snippet called `twitter_card.html` in my `_includes` folder that looks like this:

{% highlight html %}
{% raw %}
<!-- Enables twitter cards on posts -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@matthewdlincoln" />
<meta name="twitter:title" content="{{ page.title }}" />
<meta name="twitter:description" content="{{ page.excerpt | escape }}" />
<meta name="twitter:url" content="{{ page.url }}" />
{% endraw %}
{% endhighlight %}

I just drop an {% raw %}`{% include twitter_card.html %}`{% endraw %} into my post layout, and Jekyll will render every post with the appropriate meta tags.

One final step: [validate your cards with Twitter][validate], and you're good to go.

[coins]: /2014/03/15/coins-for-your-jekyll-blog.html

[ph]: https://github.com/programminghistorian/jekyll/pull/76

[tc]: https://dev.twitter.com/cards/overview

[validate]: https://cards-dev.twitter.com/validator