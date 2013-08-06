---
layout: post
comments: true
title: VerbalExpressions
date: 2013-08-06 09:41:21.988191
tags:
- Code
---

[Jehna](https://github.com/jehna/VerbalExpressions) has come up with the [CoffeeScript](http://coffeescript.org/) of regular expressions: [VerbalExpressions](https://github.com/jehna/VerbalExpressions), a JavaScript library (already implemented in a [host of other languages](https://github.com/VerbalExpressions), including Ruby) that makes regex almost human-writeable. (tip: [The Changelog](http://thechangelog.com/stop-writing-regular-expressions-express-them-with-verbal-expressions/) via [Dave](https://twitter.com/kleinschmidt))

This is going to really ease parsing datasets with idiosyncratic conventions. See how the Ruby implementation works on the location headings in the [ULAN](http://www.getty.edu/research/tools/vocabularies/ulan/about.html) that annoyingly concatenate unique id numbers with preferred terms:

{% highlight ruby %}
require 'verbal_expressions'

location = "5600392409/New York City (New York state, United States) (inhabited place)"

num_query = VerEx.new do
	start_of_line
	anything_but "/"
end

puts num_query.source # => ^(?:[^/]*)

content_query = VerEx.new do
	find "/"
	anything_but "("
end

puts content_query.source # => (?:/)(?:[^\(]*)

puts location.slice(num_query) # => 5600392409
puts location.slice(content_query) # => New York City

{% endhighlight %}

