---

title: Setting up OSX for Web Development
date: 2012-04-11 16:57:46

---_(I will be maintaining this Post with my current setup steps as time
moves on)_

I've been using OSX for Web Development for a while now, initially on a
Mac Mini, then migrating to a MacBook Pro and on to a MacBook Air. I
thought it was a good idea to get my web development software setup down
so I can recall it more easily and get things moving a lot more quickly
when I need to re-set everything back up again.

Read on to find out how.

## Main apps

After starting from a fresh OSX Install I usually follow up with a few
default web development applications that I have stored on my local
server under 'app_0' to indicate that they're the critical.

- **XCode** - install via the App Store. While it's not used for web
  development it is required as it includes vital system tools that
  others depend on, such as PEAR, Brew/MacPorts. It's a big old
  download so it's worth starting early and make sure you've got some
  elbow room on your locale HD.
- [Google Chrome](http://google.com/chrome) - my browser of choice, I
  use the regular suite of Firefox, Safari and some VMWare Fusion
  Virtual Machines for testing
- [MAMP Pro](http://www.mamp.info/en/mamp-pro/index.html "MAMP Pro") -
  the nuts and bolts Mac Apache, MySQL and PHP setup
- [Sublime Text 2](http://www.sublimetext.com/) - an awesome text
  editor. I was using the ubiquitous TextMate  for a long time but I
  shifted over to ST2 and I can honestly say it's awesome. More on my
  configuration later.
- [Sequel Pro](http://www.sequelpro.com/) - a useful interface into
  MySQL when the default phpMyAdmin isn't enough. It has a very handy
  'Optimise Type' that I'll cover.
- [Tower](http://www.git-tower.com/) - an GIT visual client that's got
  some amazing features when you fancy moving away from the Terminal
- [CodeKit](http://incident57.com/codekit/) - I use this as a
  continuous integration [SASS](http://sass-lang.com/) (scss) &
  [Compass](http://compass-style.org/) compiler for my web projects.

### Install XCode

then **install the command line tools** by running XCode then via

_Preferences->Downloads->Command Line Tools->(Install)_

### Stop losing disk space

Prevent disk space erosion and incorrectly reported free space by
disabling Time Machine local snapshots with the following
command:

    sudo tmutil disablelocal f

### Fix Terminal

OSX Terminal has a nasty habit of dropping characters over SSH and I've
hunted down a Preferences change that I've found to really help fix
missing characters over SSH.

Inside Terminal
Preferences:

    -> Advanced -> Declare Terminal

As: (xterm-color)

## Setup PEAR

PEAR is used as to install and manage some PHP tools so it's worth
setting up early.
Reference:
<http://blog.borntocode.com/2011/03/complete-php-dev-environment/>

    ln -s /Applications/MAMP/bin/php/php5.2.17 /Applications/MAMP/bin/php5

This final 'mv' operation fixes a broken default PEAR installation
within MAMP

    mv /Applications/MAMP/bin/php5/conf/pear.conf /Applications/MAMP/bin/php5/conf/pear.confg.backup

nano \~/.profile

add `export PATH=/Applications/MAMP/bin/php5/bin:$PATH` to \~/.profile

    sudo /Applications/MAMP/bin/php5/bin/pear channel-update pear.php.net
    sudo /Applications/MAMP/bin/php5/bin/pear upgrade pear
    /Applications/MAMP/bin/php5/bin/pear -V

check versions are running

    sudo /Applications/MAMP/bin/php5/bin/pear channel-discover pear.phpunit.de
    sudo /Applications/MAMP/bin/php5/bin/pear channel-discover components.ez.no
    sudo /Applications/MAMP/bin/php5/bin/pear channel-discover pear.symfony-project.com

### PHPUnit - testing framework

[PHPUnit](http://www.phpunit.de/) is a unit test framework that allows you to run automated tests on your code to ensure it's consistently robust and error free. Unit Testing is a fundamental part of [Test Driven
Development](http://en.wikipedia.org/wiki/Test-driven_development)

    sudo /Applications/MAMP/bin/php5/bin/pear install phpunit/PHPUnit

### Phing - build tool

[Phing](http://www.phing.info/trac/) is a build tool that can save you a whole load of grief by running unit tests (PHPUnit), syntax checks
(lint), deployment scripts and much more. All of this automatically
checks your development is pretty solid before it gets published.

    sudo /Applications/MAMP/bin/php5/bin/pear channel-discover pear.phing.info
    sudo /Applications/MAMP/bin/php5/bin/pear install phing/phing

`I'll post more on the specific configuration later`

### Install DiffMerge

via <http://sourcegear.com/diffmerge/downloads.php>

### Install GIT

GitHub maintains a great page on [Set Up Git for
Mac](http://help.github.com/mac-set-up-git/), which you should follow before returning here. We'll be using GIT for semi-automated deployment to your production servers later.

## Local Terminal Configuration

Now you have all of the necessary files installed you can go ahead and
start configuring your local system.

I keep a GIT repository of all of my hidden 'dotfiles' at the link below
that you can use as a great starting point for your own config

    cd ~/Projects
    git clone git@github.com:simeonpashley/dotfiles.git
    cd dotfiles
    ./bootstrap.sh

Restart Terminal and all the relevant config files should be in the
right places.

## Summary

Hopefully you'll be starting to get a decent setup and the following
posts should help solidify a nice web development environment.
