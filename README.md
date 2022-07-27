[![Build Status](https://travis-ci.org/simeonpashley/simeonpashley.github.io.svg?branch=master)](https://travis-ci.org/simeonpashley/simeonpashley.github.io)

Repo for [simeonpashley.github.io](http://simeonpashley.github.io)

### Install tools

I had loads of issues when coming back to this project after a while away. Here's what I did, you may need some/all of this.

```bash
$ xcode-select --install
$ gem install bundler
$ sudo gem update --system
$ yarn install
$ yarn bower update
$ bundle update && bundle install
$ gem install jekyll
$ gem install bundle
$ gem install kramdown
$ gem install jekyll-paginate
```

### Update the site & serve locally

```bash
./up.sh
```

### Update tools

```bash
yarn bower update && bundle update && gem update
```
