---
layout: post
title: |
  Convert EDTF to Regular Dates Without Needing to Code
date: 2021-03-20
tags:
  - data
  - digital humanities
  - code
---

TL;DR: I've made a small, [in-browser utility for converting EDTF dates to pairs of date boundaries][edtfconverter] without needing to code.

[edtfconverter]: /pages/edtf.html

{% include figure.html src="/assets/images/edtf-convert.png" caption="A screenshot of the EDTF min/max calculator" %}

Many readers of this blog will be familiar with the "preferred" way to specify dates for computers: [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601), or `YYYY-MM-DD`, such as the date of this post, `2021-03-20`.

This is great when you have an exact date you want to specify, but as is often the case in messy historical / humanisitc data, we rarely have such precision. We may only know, for example, that:

1. a painting was made at some point in 1653
2. a book was published on some day in August 1801
3. a person of interest arrived at a city on April 2, 1930, and left sometime in November of 1934
4. a probate inventory has only a partially legible date written on it: 1731-02-1...\[something\]

One strategy to deal with assertions like these when computing is to create a pair of `YYYY-MM-DD` dates representing the earliest and latest possible dates given our range of certainty. Thus:

1. The painting was made between 1653-01-01 and 1653-12-31
2. The book was published between 1801-08-01 and 1801-08-31
3. The person was within the city at some time between 1930-04-02 and 1934-11-30
4. The probate inventory was made between 1731-02-10 and 1731-02-19

With these boundaries, we can search through uncertain dates, visualize possible time ranges and overlaps with tools like [Palladio](/mapping-knoedler-palladio), and more. But it is a tremendous pain to manage so many different columns during data entry and cleaning.

The [Extended Date/Time Format (EDTF) Specification](https://www.loc.gov/standards/datetime/), or ISO 8601-2, is an expressive update to the strict precision of ISO 8601-1, specifying notation for dates and date ranges of varying precision and certainty. From our examples above, we could succinctly write:

1. 1653
2. 1801-08
3. 1930-04-02/1934-11
4. 1731-02-1X

and tools / code libraries for parsing EDTF can understand each of these cases and compute the possible earliest/latest dates (along with many other properties) for further use in search, computing, or visualization. But if you aren't able to easily use the [Python](https://github.com/ixc/python-edtf) or [JavaScript](https://github.com/inukshuk/edtf.js) EDTF libraries, you can paste a list of EDTF dates into [my EDTF converter][edtfconverter] and it'll calculate the earliest and latest date boundaries (as well as alert you if any of your date strings are invalid.)