---
layout: "post"
title: "R packages, secret keys, and testing on Appveyor"
date: "2016-05-13 17:32"
comments: true
tags:
- Code
- R
---

In the wake of [defending my dissertation](https://twitter.com/matthewdlincoln/status/722811630791356416) and [landing a new job](https://twitter.com/matthewdlincoln/status/730083315189960705), I've been relaxing by polishing up an R package, [PastecR](https://github.com/mdlincoln/PastecR) that wraps the API for [Pastec](http://pastec.io/), an open-source fuzzy image matching engine.

The creator of Pastec recently launched a [hosted version of the service of the service](https://api.pastec.io).
I've just updated PastecR to talk to both self-hosted instances of Pastec, as well as the SaaS instance at api.pastec.io.

Because I use both [Travis-CI](https://travis-ci.org) as well as [Appveyor](https://ci.appveyor.com), I needed to jump through hoops to make sure that I could provide the CI services with encrypted versions of my api.pastec.io keys, while also making sure that I didn't send extraneous keys (encrypted or not) to CRAN.

[Jennifer Bryan has a great rundown of how to work with encrypted keys on Travis](https://rawgit.com/jennybc/googlesheets/master/vignettes/managing-auth-tokens.html#encrypting-tokens-for-hosted-continuous-integration).
But what about Appveyor?

## Save key objects as .rda

api.pastec.io requires both an `index_id` as well as an `auth_key`.
Encrypting multiple files is a bit of a pain on both Travis and Appveyor, so I sidestepped this by `save()`-ing both strings into one `.rda` object that I can easily load again.

```r
# Save your keys BUT DO NOT SAVE THIS CODE
index_id <- "XXXXXXXXXXXXXXXXXXXX"
auth_key <- "XXXXXXXXXXXXXXXXXXXX"

save(index_id, auth_key, file = "tests/testthat/hosted_keys.rda")
# NOW DELETE THIS CODE!
```

## Encrypt your keys

## Setup appveyor.yml



## `.ignore` the right things
