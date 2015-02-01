---
layout: page
title: Behind The Curtain
date: 2010-06-17 11:09:40
categories: []
tags: []
status: publish
type: page
published: true

---
###### Last
Updated: 17th June 2010

Whilst it isn't strictly in the message of my web-site, I thought it
worth sharing some of the technical behind the scenes elements of how I
put this site together that may prove useful to new people starting out
setting up Wordpress.

This list will most likely change over time so I've popped a 'last
updated' element here so you can figure out just how likely this is to
be up-to-date.

### Post Wordpress install tips

**Perma

DO THIS FIRST change your perma
something more meaningful to your readers and search engines from the
default:

    http://example.com/?p=54321

to something more like

    http://example.com/Sport/WorldCup2010/

by making it a
custom:

    /%category%/%postname%/

Also, make sure you have canonical names enabled to make sure the post
itself has a meaningful name (a.k.a. slug) derived from the title.

You need to do this ASAP as it causes all manner of problems to solve if
you decide to change it later, it will cause 404s, bad page ranking, as
all your all old

**Categories**

Setup your categories to reflect keywords you want to associate with
your site, such as Artwork, Design, Production as they will appear on
every post the search engine crawls.

### Plugins Used

**Plugins to install ASAP**

The following plugins are really required from day 0 as they include
settings that can really help your site perform well

**W3 Total Cache**

The fastest and most complete WordPress performance plugin. Dramatically
improve the speed and user experience of your blog by
adding: page
caching, database caching, minify, content delivery network (CDN)
functionality and more...

Version 0.8.5.2 | By [Frederick
Townes](http://www.linkedin.com/in/w3edge "Visit author homepage") |
[Visit plugin
site](http://www.w3-edge.com/wordpress-plugins/w3-total-cache/ "Visit plugin site")

W3 Total Cache made this web-site tremendously faster and I wish I'd got
this in there early. Quicker page load times improve your readers
experience and contribute towards a better page rank. It achieves this
by caching, compressing and minifying your content making it faster to
deliver to your viewers.

**FD Feedburner Plugin**

Redirects all feeds to a Feedburner feed

Version 1.42 | By [John
Watson](http://flagrantdisregard.com/ "Visit author homepage") | [Visit plugin
site](http://flagrantdisregard.com/feedburner/ "Visit plugin site")

Re-direct all your feeds via [Google
Feedburner](http://feedburner.google.com/) - **which you \*have\* to
use!**

**Google Analyticator**

Adds the necessary JavaScript code to enable [Google's
Analytics](http://www.google.com/analytics/). After enabling this plugin visit [the settings
page](options-general.php?page=google-analyticator.php) and enter your
Google Analytics' UID and enable logging.

Version 6.1.1 | By [Ronald
Heft](http://ronaldheft.com/ "Visit author homepage") | [Visit plugin
site](http://ronaldheft.com/code/analyticator/ "Visit plugin site") |
[FAQ](http://forums.ronaldheft.com/viewforum.php?f=5) |
[Support](http://forums.ronaldheft.com/viewforum.php?f=6) |
[Donate](http://ronaldheft.com/code/donate/)

**KEY BENEFIT**: Allows you to strip the analytics for logged in users
(admins / authors) so your stats stay true to your audience. Not the 100
times you login a day to tweak your site and write articles.

**Redirection**

Manage all your 301 redirects and monitor 404 errors

Version 2.1.27 | By [John
Godley](http://urbangiraffe.com "Visit author homepage") | [Visit plugin
site](http://urbangiraffe.com/plugins/redirection/ "Visit plugin site")

**KEY BENEFIT**: This catches all the mis-typed URLS and people looking
for stuff on your site that doesn't exist so you can redirect them to
the write place

#### SEO plugins

These plugins help search engines like Google, Bing and Yahoo have a
better experience trawling your site and improve your page ranking

**WordPress SEO Pager**

An SEO-enhanced pagination control for WordPress.

Version 1.97 for WP 2.5+ | By [SEO Egghead,
Inc.](http://www.seoegghead.com/ "Visit author homepage") | [Visit plugin
site](http://www.seoegghead.com/software/wordpress-seo-pager.seo "Visit plugin site")

This presents more of your site to search engines and helps them
navigate their way around your site, creating internal
strengthen your page rank.

**Google XML Sitemaps**

This plugin will generate a special XML sitemap which will help search
engines like Google, Yahoo, Bing and Ask.com to better index your blog.

Version 3.2.4 | By [Arne
Brachhold](http://www.arnebrachhold.de/ "Visit author homepage") |
[Visit plugin
site](http://www.arnebrachhold.de/redir/sitemap-home/ "Visit plugin site")
|
[Settings](options-general.php?page=google-sitemap-generator/sitemap.php)
| [FAQ](http://www.arnebrachhold.de/redir/sitemap-plist-faq/) |
[Support](http://www.arnebrachhold.de/redir/sitemap-plist-support/) |
[Donate](http://www.arnebrachhold.de/redir/sitemap-plist-donate/)

Use this plugin to generate your XML site map then make sure that it's
picked up by [Google Webmaster Tools](http://www.google.com/webmasters),
[Bing](http://www.bing.com/webmaster) and
[Yahoo!](http://siteexplorer.search.yahoo.com) equivalents

**iRobots.txt SEO**

iRobots.txt SEO is a SEO optimized, secure and customizable robots.txt
virtual file creator.

Version 1.1.2 | By [Mark
Beljaars](http://markbeljaars.com "Visit author homepage") | [Visit plugin
site](http://markbeljaars.com/plugins/irobottxt-seo/ "Visit plugin site")

Search engines will pickup the file this generates and you can use this
to keep them out of areas you don't want (admin / uploads / archives)
and also automatically tell them about your XML site map

**SEO Friendly Images**

Automatically adds alt and title attributes to all your images. Improves
traffic from search results and makes them W3C/xHTML valid as well.

Version 2.4.4 | By [Vladimir
Prelovac](http://www.prelovac.com/vladimir "Visit author homepage") |
[Visit plugin
site](http://www.prelovac.com/vladimir/wordpress-plugins/seo-friendly-images "Visit plugin site")

This makes your image names support your article title, improving page
rank. DSC3123.jpg or IMG32234_150x150.png doesn't really help anyone
find the content you've worked hard to put together

**SEO Power**

implements best SEO tactics with auto - handlers. Plugin provides
configuration options so that you can choose the best one suitable for
your situation. Also you can keep the defaults just to see how the
plugin works.

Version 1.5 | By
[MarkDulisse.com](http://MarkDulisse.com "Visit author homepage")

This highlights people hitting your site looking for missing files /
content so you can capture it and use it to redirect them to something
relevant. It's all automated.

**SEO Smart

SEO Smart
addition to custom keyword lists, nofollow and much more. (Brian
Edition)

Version 2.6 | By [Vladimir
Prelovac](http://www.prelovac.com/vladimir "Visit author homepage") |
[Visit plugin
site](http://www.prelovac.com/vladimir/wordpress-plugins/seo-smart-

Not only will this automatically link up text matching your category
names, you can tell it to auto replace keywords with
Disney would always link to Disney.com, or feedback to your feedback
page.

**Use Google Libraries**

Allows your site to use common javascript libraries from Google's AJAX
Libraries CDN, rather than from Wordpress's own copies.

Version 1.0.9.2 | By [Jason
Penney](http://jasonpenney.net/ "Visit author homepage") | [Visit plugin
site](http://jasonpenney.net/wordpress-plugins/use-google-libraries/ "Visit plugin site")

**KEY BENEFIT**: Downloading scripts in parallel from Googles site is
faster for your viewers and saves a smidge of bandwidth.

#### Social plugins

A collection of plugins to promote social interaction and sharing

**FaceBook Share (New)**

Adds a button which allows you to share post and also shows the number
of times the post or page has been shared through out the Facebook just
like tweetmeme button does for twitter.

Version 1.9.2 | By
[Appointy.com](http://www.appointy.com "Visit author homepage") | [Visit plugin
site](http://www.appointy.com/web/facebookshare "Visit plugin site")

Used by the little widgets on the post teasers

**TweetMeme Retweet Button**

Adds a button which easily lets you retweet your blog posts.

Version 1.8.5 | By
[TweetMeme](http://tweetmeme.com "Visit author homepage") | [Visit plugin site](http://tweetmeme.com/about/plugins "Visit plugin site")

**Twitter Tools**

A complete integration between your WordPress blog and
[Twitter](http://twitter.com). Bring your tweets into your blog and pass your blog posts to Twitter. Show your tweets in your sidebar, and post tweets from your WordPress admin.

Version 2.3.1 | By [Alex
King](http://alexking.org "Visit author homepage") | [Visit plugin
site](http://alexking.org/projects/wordpress "Visit plugin site")

**Twitter Tools - Bit.ly URLs**

Use Bit.ly for URL shortening with Twitter Tools. This plugin relies on
Twitter Tools, configure it on the Twitter Tools settings page.

Version 2.3.1 | By [Crowd
Favorite](http://crowdfavorite.com "Visit author homepage") | [Visit plugin site](http://crowdfavorite.com/wordpress/ "Visit plugin site")

**Twitter Tools - Exclude Category**

Exclude posts in certain categories from being tweeted by Twitter Tools.
This plugin relies on Twitter Tools, configure it on the Twitter Tools
settings page.

Version 2.3.1 | By [Crowd
Favorite](http://crowdfavorite.com "Visit author homepage") | [Visit plugin site](http://crowdfavorite.com/wordpress/ "Visit plugin site")

**Twitter Tools - Hashtags**

Set \#hashtags for blog post tweets sent by Twitter Tools. This plugin
relies on Twitter Tools, configure it on the Twitter Tools settings
page.

Version 2.3.1 | By [Crowd
Favorite](http://crowdfavorite.com "Visit author homepage") | [Visit plugin site](http://crowdfavorite.com/wordpress/ "Visit plugin site")

#### Regular plugins

A collection of other plug-ins I use to help make game-linchpin.com a
better place

**Advertising Manager**

Control and arrange your Advertising and Referral blocks on your
Wordpress blog. With Widget and inline post support, integration with
all major ad networks.

Version 3.4.18 | By [Scott
Switzer](http://www.switzer.org "Visit author homepage") | [Visit plugin
site](http://code.openx.org/projects/show/advertising-manager "Visit plugin site")

Used to control any ad blocks you may want around your site. **Key
Benefit:** it hides them from logged in users (admins/authors) so you're reader stats stay focus on your audience.

**Contact Form 7**

Just another contact form plugin. Simple but flexible.

Version 2.2.1 | By [Takayuki
Miyoshi](http://ideasilo.wordpress.com/ "Visit author homepage") |
[Visit plugin site](http://contactform7.com/ "Visit plugin site")

Used on the 'contact' page

**Disqus Comment System**

The Disqus comment system replaces your WordPress comment system with
your comments hosted and powered by Disqus. Head over to the Comments
admin page to set up your DISQUS Comment System.

Version 2.33.8752 | By
[Disqus](http://disqus.com/ "Visit author homepage") | [Visit plugin
site](http://disqus.com/ "Visit plugin site")

**Exclude Pages from Navigation**

Provides a checkbox on the editing page which you can check to exclude
pages from the primary navigation. IMPORTANT
NOTE: This will remove the pages from any "consumer" side page listings, which may not be limited to your page navigation listings.

Version 1.8.3 | By [Simon
Wheatley](http://simonwheatley.co.uk/wordpress/ "Visit author homepage")
| [Visit plugin
site](http://wordpress.org/extend/plugins/exclude-pages/ "Visit plugin site")

Nice little widget if you want to have a 'pages' widget but don't want
everything to be in there.

**Future Calendar**

A simple plugin that utalizes a modified get_calendar function that
shows what dates have a future post scheduled in a calendar format, and
makes it easy to change the current timestamp. Temperature Functionality
and some tweaks by Flavio Jarabeck (www.InternetDrops.com.br)

Version 1.0 | By [Aaron
Harun](http://anthologyoi.com/ "Visit author homepage") | [Visit plugin
site](http://anthologyoi.com/wordpress/plugins/future-posts-calendar-plugin.html "Visit plugin site")

**kStats Reloaded**

kStats Reloaded is one of the fastest real-time statistics plugins for
Wordpress. See who's on your site, where they came from, and where
they're going.

Version 0.7.4 | By [Mark
Waterous](http://mark.watero.us/ "Visit author homepage") | [Visit plugin site](http://mark.watero.us/kstats-reloaded/ "Visit plugin site")

**Multi Column Category List**

Displays a customizable list of categories in multiple columns

Version 1.3 | By [Dagon
Design](http://www.dagondesign.com "Visit author homepage") | [Visit plugin
site](http://www.dagondesign.com/articles/multi-column-category-list-plugin-for-wordpress/ "Visit plugin site")

**Popular Posts**

Displays a [highly
configurable](options-general.php?page=popular-posts.php) list of the
most popular posts. [Instructions and help
online](http://rmarsh.com/plugins/post-options/). Requires the latest version of the [Post-Plugin
Library](http://wordpress.org/extend/plugins/post-plugin-library/) to be
installed.

Version 2.6.2.0 | By [Rob Marsh,
SJ](http://rmarsh.com/ "Visit author homepage") | [Visit plugin
site](http://rmarsh.com/plugins/popular-posts/ "Visit plugin site")

**Post-Plugin Library**

Does nothing by itself but supplies common code for the [Similar
Posts](http://rmarsh.com/plugins/similar-posts/), [Recent
Posts](http://rmarsh.com/plugins/recent-posts/), [Random
Posts](http://rmarsh.com/plugins/random-posts/), and [Recent
Comments](http://rmarsh.com/plugins/recent-comments/) plugins. Make sure you have the latest version of this plugin.

Version 2.6.2.1 | By [Rob Marsh,
SJ](http://rmarsh.com/ "Visit author homepage") | [Visit plugin
site](http://rmarsh.com/plugins/post-plugin-library/ "Visit plugin site")

**Privacy Policy**

Automatically adds an AdSense-compliant privacy page. [Options
configuration panel](options-general.php?page=privacy-policy.php)

Version 1.1 | By [Eric
Giguere](http://www.ericgiguere.com "Visit author homepage") | [Visit plugin
site](http://www.memwg.com/privacy-policy-plugin/ "Visit plugin site")

**Random Posts**

Displays a [highly
configurable](options-general.php?page=random-posts.php) list of
randomly selected posts. [Instructions and help
online](http://rmarsh.com/plugins/post-options/). Requires the latest version of the [Post-Plugin
Library](http://wordpress.org/extend/plugins/post-plugin-library/) to be
installed.

Version 2.6.2.0 | By [Rob Marsh,
SJ](http://rmarsh.com/ "Visit author homepage") | [Visit plugin
site](http://rmarsh.com/plugins/random-posts/ "Visit plugin site")

**Really Simple CAPTCHA**

Really Simple CAPTCHA is a CAPTCHA module intended to be called from
other plugins. It is originally created for my Contact Form 7 plugin.

Version 1.1 | By [Takayuki
Miyoshi](http://ideasilo.wordpress.com/ "Visit author homepage") |
[Visit plugin
site](http://ideasilo.wordpress.com/2009/03/14/really-simple-captcha/ "Visit plugin site")

**Recent Posts**

Displays a [highly
configurable](options-general.php?page=recent-posts.php) list of the
most recent posts. [Instructions and help
online](http://rmarsh.com/plugins/post-options/). Requires the latest version of the [Post-Plugin
Library](http://wordpress.org/extend/plugins/post-plugin-library/) to be
installed.

Version 2.6.2.0 | By [Rob Marsh,
SJ](http://rmarsh.com/ "Visit author homepage") | [Visit plugin
site](http://rmarsh.com/plugins/recent-posts/ "Visit plugin site")

**Similar Posts**

Displays a [highly
configurable](options-general.php?page=similar-posts.php) list of
related posts. Similarity can be based on any combination of word usage
in the content, title, or tags. Don't be disturbed if it takes a few
moments to complete the installation -- the plugin is indexing your
posts. [Instructions and help
online](http://rmarsh.com/plugins/post-options/). Requires the latest version of the [Post-Plugin
Library](http://wordpress.org/extend/plugins/post-plugin-library/) to be
installed.

Version 2.6.2.0 | By [Rob Marsh,
SJ](http://rmarsh.com/ "Visit author homepage") | [Visit plugin
site](http://rmarsh.com/plugins/similar-posts/ "Visit plugin site")

**Simple Tags**

Extended Tagging for WordPress 2.8 and 2.9 ! Suggested Tags, Mass edit
tags, Autocompletion, Tag Cloud Widgets, Related Posts, Related Tags,
etc!

Version 1.7.4.4 | By [Amaury
BALMER](http://www.herewithme.fr "Visit author homepage") | [Visit plugin
site](http://redmine.beapi.fr/projects/show/simple-tags "Visit plugin site")

**WordPress Database Backup**

On-demand backup of your WordPress database. Navigate to [Tools ?
Backup](edit.php?page=wp-db-backup) to get started.

Version 2.2.2 | By [Austin
Matzko](http://www.ilfilosofo.com/ "Visit author homepage") | [Visit plugin
site](http://www.ilfilosofo.com/blog/wp-db-backup "Visit plugin site")

**Wordpress Gravatars**

Makes use of Gravatars and MyBlogLog Avatars, places Gravatars,
OpenAvatar, Wavatar, Identicon, monsterID or MyBlogLog Avatars in the
comments section. Uses the comment authors email to display their
Gravatar. It also gives the user an Author Profile picture, based on his
or hers **Gravatar**. Developer blog at [this
site](http://shuttlex.blogdns.net).

Version 2.7.1 | By [Rune
Gulbrandsøy](http://gravatar.bloggs.be "Visit author homepage") | [Visit plugin
site](http://wordpress.org/extend/plugins/wp-gravatar/ "Visit plugin site")

**WP-Polls**

Adds an AJAX poll system to your WordPress blog. You can easily include
a poll into your WordPress's blog post/page. WP-Polls is extremely
customizable via templates and css styles and there are tons of options
for you to choose to ensure that WP-Polls runs the way you wanted. It
now supports multiple selection of answers.

Version 2.50 | By [Lester 'GaMerZ'
Chan](http://lesterchan.net "Visit author homepage") | [Visit plugin
site](http://lesterchan.net/portfolio/programming/php/ "Visit plugin site")

**Yoast Breadcrumbs**

Outputs a fully customizable breadcrumb path.

Version 0.8.5 | By [Joost de
Valk](http://yoast.com/ "Visit author homepage") | [Visit plugin
site](http://yoast.com/wordpress/breadcrumbs/ "Visit plugin site")
