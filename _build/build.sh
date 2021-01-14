#!/bin/bash

bundle exec jekyll build && bundle exec htmlproofer ./_site \
  --assume-extension \
  --timeframe '30d' \
  --http-status-ignore 0,503,302,301,303,403,429 \
  --url-ignore /https://github.com/mdlincoln/mdlincoln.github.io/commits/*/,/collection.britishmuseum.org/,/https?://twitter.com*/,/https?://t.co*/,/https://cards-dev.twitter.com/validator/
