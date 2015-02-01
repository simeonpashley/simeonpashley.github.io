---
layout: post
author: gamelinchpin
title: Pinterest pins fails to stick
date: 2012-05-05 12:38:35
categories: web development

status: publish
type: post
published: true
---
[Pinterest](http://pinterest.com/simeonp/ "Pinterest") is a fantastic way to discover content, styles, products and ideas. As such, it's crucial that websites make it as simple as possible for their content to be 'pinned' on Pinterest.

Sadly, it appears that many web developers are struggling to get their
content on their due to silent errors. Many pages around the web give
workarounds for clients but they don't address the issues faced by the
website itself.

I tried a few ways to find solutions for the websites I manage.

**Pinning typically fails in 2 ways:**
 When pinning via the common **'Pin It' bookmarklet** or using the
onpage embedded 'Pin It' button the Image and description appear OK for
the javascript pop-up but when the 'Pin This' button is pressed nothing
is pinned and the dialog refreshes with no content.

![](assets/Screen-Shot-2012-05-05-at-12.26.42.png "Pinterest Pin")

![](assets/Screen-Shot-2012-05-05-at-12.27.19.png "Pinterest Pin")

![](assets/Screen-Shot-2012-05-05-at-12.27.28.png "Pinterest Pin fail")

**Directly pinning** the content when on pinterest.com reveals "*We
couldn't find any images*" despite the javascript app clearly finding
images.

![Pinterest Pin "We couldn't find any
images"](assets/Screen-Shot-2012-05-05-at-12.27.52.png "Pinterest Pin "We couldn't find any images"")

As a web developer I've attempted to fix this in a number of ways based
on findings from around the web.

-   **Is the image too small?** Reports say minimum size is 109x109 and
    anything smaller will fail.
-   **Strip parameters** from image URLs such as timthumb 'w=300&h=300
    from URL'
-   **Improved image quality** and therefore image filesize on the
    'found' images
-   Changed **http headers** for the images to '*Cache-Control: public*'
-   Added/removed **Facebook opengraph** image hints 'og:image' meta tag
-   Double checked reverse DNS and other **potential quirks**.

<div>

 I also built a specific page that only included a 300x300 high quality
image and some content for testing and this failed too.

</div>

To date, **none of my changes have made any of the pins stick** on
Pinterest so I have raised a support ticket with them and I await some
assistance from them. However, evidence from around the 'net seems to
suggest the Pinterest support is a blackhole for support tickets.

As a web developer, have you found a solution?
