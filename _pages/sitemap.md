---
layout: archive
permalink: /sitemap/
title: "Sitemap"
date: 2014-12-26
modified: 2016-02-19
excerpt: "A visual sitemap of all the pages on pashley.org"
fullwidth: true
share: false
ads: false
---

A hierarchical breakdown of all the sections and pages found on the site. For you robots out there is an [XML version](/sitemap.xml) available for digesting.

<div class="sitemap">
  <ul id="primaryNav" class="col5">
    <li id="home"><a href="/">Home</a></li>
    <li><a href="/about/">About</a>
      <ul>
        <li><a href="/faqs/">Frequently Asked Questions</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li><a href="/support/">Support</a></li>
        <li><a href="/terms/">Terms</a></li>
        <li><a href="/style-guide/">Style Guide</a></li>
      </ul>
    </li>
    <li><a href="/tag/">Archives by Tag</a>
      <ul>
        {% assign tags_list = site.tags | sort %}
        {% for tag in tags_list %}
          <li><a href="/tag/{{ tag[0] | replace:' ','-' | downcase }}/">{{ tag[0] }}</a></li>
        {% endfor %}
      </ul>
    </li>
    <li><a href="/">Articles</a>
      <ul>
        {% for post in site.categories.articles %}
          {% include post-list.html %}
        {% endfor %}
      </ul>
    </li>
    <li><a href="/work/">Work</a>
      <ul>
        {% for post in site.categories.work %}
          {% include post-list.html %}
        {% endfor %}
      </ul>
    </li>
  </ul><!-- /.col5 -->
</div><!-- /.sitemap -->

