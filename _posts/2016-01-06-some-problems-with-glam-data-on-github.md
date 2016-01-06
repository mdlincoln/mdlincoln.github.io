---
layout: post
title: "Some Problems with GLAM data on GitHub"
date: "2016-01-06 08:58"
comments: true
tags:
- LAM
- code
- data
- publishing
---

All the cool kids are putting their data on GitHub these days!
[The New York Public Library.](https://github.com/NYPL-publicdomain/data-and-utilities)
[The Carnegie Museum of Art.](https://github.com/cmoa/collection)
[The Cooper Hewitt Museum.](https://github.com/cooperhewitt/collection)
[The Tate Collection.](https://github.com/tategallery/collection)
[The Minneapolis Institute of Arts.](https://github.com/artsmia/collection)

Publishing machine-readable data as a Git repository makes it easy for researchers to download in bulk, and to _keep their copy of your data updated_ as you make refinements and additions.
I am going to assume that you are already including [good documentation](https://github.com/NYPL-publicdomain/data-and-utilities#items) of the schema for the data you are publishing, and that your institution's legal team has hammered out usage terms and conditions. (Try your best to make both of those clear and legible!)

However, if you chose to make that Git repository available through GitHub ([remember, Git ≠ GitHub](http://stackoverflow.com/questions/11816424/understanding-the-basics-of-git-and-github)), you should try to address a few norms specific to the GitHub hosting platform in your README file.

## Issues

Your institution likely already has some web form or email address, attached to some type of internal workflow (¯\\\_(ツ)\_/¯), for ingesting public feedback about the _content_ or _presentation_ of your collections information.

GitHub repositories have a light issue tracking system turned on by default, the idea being that any GitHub user can quickly post up an issue for review and discussion.
Do you want GitHub users to be able to post issues about content and formatting of the data themsevles?
Then you'll need to make sure someone on your team is monitoring that new feedback channel.
If you want to funnel all feedback through a pre-existing email or web-form, say so explicitly in your README, and consider [disabling GitHub issues on your repo](https://help.github.com/articles/disabling-issues/).

You may also want to take a middle path: accept feedback about the GitHub repository and documentation _itself_ via GitHub, but make sure that any data content/formatting issues go through your traditional submission process.
Again, just say so clearly under a specific heading in your README.

## Pull Requests

GitHub's defining feature are pull requests, a relatively user-friendly wrapper around Git's branching and merging mechanisms that allows users to copy your code, make modifications, and submit those changes back to you so that you might consider folding them back into the original repository.
This works well for open-source software projects, but collections data repositories are a slightly different creature.

In all likelihood, your Git repo is just an extract from your internal collections management database.
If a user submitted a pull request correcting some error in your data formatting, you could merge it back into your Git repo... but it would only get overwritten by the next data export that you perform.
Once someone brings an issue to your attention, you'd need to effect those fixes not in the data files in the repo, but rather in the original CMS and/or export scripts.

This all makes perfect sense, but it goes slightly against the default grain of the GitHub workflow, so make sure to address pull requests specifically in your README.
Perhaps you want all feedback to come via GitHub issues, or via your email/webform.
Say so.
Perhaps you _will_ review pull requests if they are offering changes to the README file itself.
Say so!
[The Carnegie Museum has nice clear language about this][cmoa_pr], and they've put it under a nice clear header in their README, to boot.

[cmoa_pr]: https://github.com/cmoa/collection#pull-requests

## Update Cycle

How often should users expect this repository to be updated?

This last one isn't totally GitHub specific, but it is one that is lacking for most all of the GLAM GitHub repositories I listed above.
A lot of them note rightly that the data they've published are subject to change.

No @#$%.

But how frequently is this going to happen?
Do you have a nightly cron job set up to push out internal CMS updates to your repo?
Is this a monthly process instead?
Is it whenever someone on the web team remembers that they once posted a data extract on GitHub?
Was the idea for a GitHub repo something that has zero support in your institution, and what you committed a year ago will never get updated again?
None of these answers (not even the last one) will necessarily render your repo unusable, but each one will affect how a researcher choses to put your data to work.

Look, if we've cloned a GitHub data repository for library/museum collections, you can bet that we understand at least _something_ of the slow, highly contingent pace of data projects in that sector.
But remember, too, that commit log lets users check your work, so we'll know if you've been exaggerating how often you are really running updates.
So try to be honest and specific in your README about future update policies, even if the answer is "basically never" (please, try to have that _not_ be the answer, but if it is, at least say so.)
