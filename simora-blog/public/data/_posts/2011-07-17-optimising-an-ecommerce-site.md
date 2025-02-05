
Our development work this week has included a lot of server optimisation
for an eCommerce website and we **dramatically improved response
times**, lowered overall CPU use and memory use by making changes to the
server configuration.

The benefit is a **better experience for the Visitors**, Customers and
Google (page load speed is a factor in Page Rank) and it also enables
the server to cope with higher volumes of  visitors without becoming
overloaded.

All of the changes were made to the configuration of the server itself,
no changes were made to the website to gain these benefits.

### Memory

We started by improving memory use, as this was frequently consumed and
caused the site to become unresponsive and on rare occasions it become
unusable.

The main changes came from changes to the Apache, MySQL and PHP
configurations to reduce peak memory use to something the server could
cope with.

#### MySQL

The first thing to do was analyse the MySQL peak use, which is a complex
affair but our tools enabled us to quickly discover what the peak memory
requirement is and enables us to identify areas we can safely change.

There were multiple changes made to the MySQL configuration that brought
the peak memory requirement down from 18Gb to 6Gb, which ensured that
MySQL remained in RAM and didn't get swapped out to disk all of the time
and that is very bad.

#### Apache & PHP

Apache was tweaked to cope with the regular demands by modifying the
number of servers it keeps running and the memory they each consume. The
changes themselves were small but they are multiplied by the number of
servers that are created so the peak memory usage drops significantly.

PHP was quite an easy one to fix, this was a simple case of dropping the
memory used per instance and there was one of these per Apache server so
even small changes get multiplied to save lots of memory.

### CPU Use

Having monitored the server for some time there were peaks in the load
that corresponded with some MySQL queries being ran, we investigated
further and  identified some particularly slow, and CPU intensive,
queries by setting up and monitoring the slow_queries log.

#### MySQL

The CPU optimisation came by setting up the correct MySQL indexes to
match the queries being ran, in a number of cases this dropped queries
that were taking above 40s (yes! 40s) down to 0s (instant). There was a
single query that was taking anywhere between 85s and 240s to complete
that was painful to watch but thankfully this was just from the Admin
interface and was ultimately brought down to 0s with correct indexes.

#### XCache - PHP caching

To simplify things, PHP is a text script that is interpreted every time
it is loaded, executed to generate the page and then discarded. This is
repeated every time the page is requested and this all takes time.

With this in mind, the way to improve response times is to use a PHP
opcode cache, in our instance
called [XCache](http://xcache.lighttpd.net/). This is an Opcode Cache that stores the interpreted PHP scripts and a way that is very fast to execute and generate pages. This in turn reduces CPU load and also improves page response times as the pages are served much quicker.

We installed, configured and monitor the installation of XCache and at
the time of writing the cache is serving over 80% of pages from its
cache.

#### Page Caching - Not sending content

Page Caching is the means that your browser stores files locally and
doesn't download files from the server every time it wants it.

The dilemma
is: long expire times mean fewer hits on the site \*but\* this isn't great if you've got frequent content updates as you want the new content to be sent to the visitor.

The improvement here was to get a correctly configure the expiration
times for numerous different file types. E.g., dynamic webpages expire
within 1hr, the product images expires after 1yr. Once an item expires,
the browser will refetch the original.

#### Bad Robots - stopping leeches

There are lots of computers out there looking to steal your content,
hogging your bandwidth, crawling through your site and generating page
requests that don't bring you any business at all.

There is a 'nice' way to request they don't crawl through your content
by using a file called ROBOTS.TXT but it's not a requirement that
servers use it and most malicious ones simply ignore it.

There is a way to block the robots from every connecting with your site
that's quite simple to do and we have configurations that block over 75
known bad computers and prioritise genuine visitors and good search
engines like Google, Bing and Yahoo.

### Summary

Overall, the changes highlighted above along with some other smaller
tweaks enabled the server to cope with a higher volume of visitors and
also improve the response times for each customer.

These are general principles for well configured servers that can be
applied to pretty much any website without the need to change the
website itself.

[Contact us](/contact) if you'd like us to improve your visitors
experience or maybe you think your existing server just isn't up to
scratch.
