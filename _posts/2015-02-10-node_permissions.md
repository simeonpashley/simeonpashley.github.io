---
layout: post
author: gamelinchpin
title: Fix node privileges when using brew
date: 2015-02-10 18:36:45
status: publish
type: post
published: true
description: Fix node privilege issues when installed via brew. User will be constantly receive permission denied without this fix.
---

Fix node privilege issues when installed via brew. User will be constantly receive permission denied without this fix.

``` bash
brew update
brew upgrade
brew cleanup
brew install node
brew link --overwrite node
sudo chown -R whoami /usr/local
```
