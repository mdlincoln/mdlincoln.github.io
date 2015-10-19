---
layout: post
title: "Images & Data from the Rijksmuseum via BitTorrent"
date: "2015-10-19 21:12"
comments: true
tags:
- Art History
- LAM
---

[Download the torrent file.][torrent]

---

Museum APIs [are all the rage][ch].
They are wonderful for building web or mobile apps that present small selections of images on demand.

[ch]:http://www.theatlantic.com/technology/archive/2015/01/how-to-build-the-museum-of-the-future/384646/

But they really suck at delivering bulk data. ([Yeah, I've been a grump about this before.](/2015/01/26/unsustainable-museum-data.html))

I've wasted days of my life cranking out scripts to do this for my dissertation research, and I'd rather it not all go to waste.
So, I've assembled the JSON object data as well as all available web images [as a torrent you can download here][torrent].

- The collections data of 515802 objects are in one JSON file (1.7 GB uncompressed - I recommend [jq](https://stedolan.github.io/jq/) for trawling it.)
- The 218442 images are about 164 GB, and average around 2500 pixels on the longest side.

This dataset was developed using the Rijksmuseum's API, with images from the
Rijksmuseum Collection _as downloaded in October 2015_, so be aware that it won't reflect later changes.

As for licensing, [you're in the clear](https://www.rijksmuseum.nl/en/api/terms-and-conditions-of-use):

>All data and all images made available through the API are either in the public domain or are subject to a CC0 license. The data and images are royalty-free and may be copied, distributed, modified and used without the permission of the Rijksmuseum.

[torrent]: /assets/docs/rijksmuseum_data.torrent
