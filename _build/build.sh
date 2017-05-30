#!/bin/bash

bundle exec jekyll build && bundle exec htmlproofer ./_site \
  --assume-extension \
  --timeframe '30d' \
  --http-status-ignore 0,503 \
  --url-ignore /https://github.com/mdlincoln/mdlincoln.github.io/commits/*/
