---
layout: post
title: Fixing Git checkout line endings
categories: []
tags: []
published: True
author: gamelinchpin

---

Recently when I was trying to run `brew update` on my Mac I was hitting errors that claimed I
had uncommitted changes to my local brew and yet I hadn't made any changes. It didn't matter what I did, the changes would not revert and the errors would not go away.

<!-- more -->

`brew doctor` revealed there were uncommitted changes so I followed the fix instructions to no avail.

The problem turned out to be caused by line-endings that were being modified due to my local `~/.gitattributes`.

Making the global fix commonly recommended on stackoverflow.com didn't help, due to my local settings over-riding the settings.

This didn't work:

```bash
git config --global core.autocrlf false
```

Reverting all local changes to brew after adding any necessary changes to `~/.gitattributes` for the line-endings / binary:

```bash
cd /usr/local/Library
git rm --cached -r .
git reset --hard origin/master
git status
```

`git rm --cached -r .` will remove all local files preparing your local directory to accept the correct attributes.

`git reset --hard origin/master` pulls all changes back in

`git status` should now say:

```bash
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```
