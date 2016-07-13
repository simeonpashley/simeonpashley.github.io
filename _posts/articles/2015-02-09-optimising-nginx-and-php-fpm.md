---


title: Optimising Nginx & PHP-FPM
date: 2015-02-09 21:38:50
categories: [nginx,php-fpm,server,unix,performance]
tags: [nginx,php-fpm,server,unix,performance]

type: post

---
Some notes from another round of performance optimisation of our server stack hosting our online platform that dramatically improved customer experience too.

{% include toc.html %}

<!-- more -->

The environment is a set of dedicated front end webhosts running Nginx & PHP-FPM all of which share a common disk volume for the web application itself. Services including MySQL, Memcached and Elastic Search run on seperate VMs to ease the load. Memcached exists in 2 forms:

1 - a dedicated **session** cache.

2 - a dedicated **content** cache.

There are also [bespoke Varnish caches](https://www.ukfast.co.uk/web-acceleration.html) sat infront of the servers to reduce load as much as possible.

Each web VM is running 1 instant of NGinx forwarding to a local PHP-FPM farm of 2 local ports to improve core use and reduce latency. APC is running locally to improve PHP raw performance.

In this configuration disk writes are **very** expensive as they lock the shared volume and force a sync across all reading devices.

### The scenario
An extreme load event was expected when the business appeared was to appear on National TV. The load was expected to be 10x-20x the highest number of concurrent users we'd seen.

Here are a few strategies taken along the way.

### Losing Session Data
The first issue encountered when load testing was that session data was getting lost, where users were experiencing random login fails, clicks weren't adding things to baskets, quanitity changes were lost and more.

The issue was that when PHP-FPM was left to it's own session management it appeared to lazily write out the session data at some point after the PHP page work closed. This causes issues in a multi-threaded layout.

Lets imagine 2 servers, A & B, now lets imagine each one runs 2 PHP-FPM works, 1 & 2.  As a user retrieves content from the servers they could retrieve it from anywhere at random A1, A2, B1 & B2. Now lets imagine that content from A1 updates session data but B2 starts reading before A1 has had the chance to write it's data out. B2 doesn't see the update and may write it's own verson of session data.

**The answer is simple:** Explcitly add `session_write_close();` into your PHP code before `exit;` to write the session data out and immediately close the PHP worker.

### Exclusive cache content creation

When a cached component expires it must be rebuilt, then re-cached. If multiple requests are made simultaneously this means that each requests can attempt to rebuild the data &amp; re-cache the data itself.

We use two strategies to eliminate this issue:

- Use server **cron jobs** to pro-actively & forceably refresh the content before the cache expires. E.g., the homepage has a natural 5 min expiry on it but the cron job refreshes this data every 1 min so the clients never rebuild the content.

- When a rebuild occurs due to cache expiry there is a **Mutex** lock placed around the build code.

-- Option 1: If the build is locked then that build is passed over, typically returning no content. Typically a content build is microseconds so there could be a handful of users that get blank content.

-- Option 2: If the build is locked then wait to acquire the mutex and rebuild the content. This approach always returns content but causes long waits & multiple rebuilds for all requests.

### Is the cache working?

Our stack uses 2 layers of caching: 1) Varnish as the front layer, 2) Memcached for fragments.

When the site is under load it's difficult to tell just what isn't being cached and is being accessed.

The following command shows which of the files are being read at the moment of issuing the command,
``` bash
$ lsof | grep -e "[[:digit:]]\+r" | grep /var/www/vhost
```

As well as the expected access of PHP, this exposed some image file accessing that should have been cached by Varnish and never actually reached the backend server.

### GFS2 contention issues

In the environment used, there is a shared disk volume using GFS2 that houses the content for the websites. We already know that accessing this shared disk is expensive and writing to it is very very expensive.

A common occurence is maxed out CPU usage on the web servers that typically comes down to `glock_workqueue` holding 100% CPU while it waits for disk access.

This redhat article also describes the issue we had pretty much exactly: https://access.redhat.com/solutions/69822

> When a large number of cached glocks are built up for GFS2, and memory pressure causes a flush of cache, the CPU utilization of `glock_workqueue` becomes very high, possibly causing the system to become unresponsive.
>
> When page cached is flushed out, the CPU utilization of `glock_workqueue` spikes.
>
> We are seeing high load on our clusters. This high load is due to CPU utilization. There is an associated large drop in page cache for the GFS2 filesystem during the high load. When the large pagecache drop completes, the load goes back down to normal. The `glock_workqueue` processes are increased during this high load time period. Very little I/O occurs during the high load event.
>
> A hung process was halted, and during that time the system stopped functioning for all existing users. A glock service spiked to 100% CPU, you were not able to start any new ssh sessions and it kicked existing ssh users off. The symptom went away by the time you we were able to gain access... We saw a huge spike in load and CPU usage, but I/O was at normal levels.
>
> Multiple instances of glock_workqueue using 100% cpu.

While trying to find this issue I found that `iotop` was far too generic and didn't give the detail I really neded to find this issue.

In our scenario the shared volume was mounted under `/var/www/vhosts` so to discover which files weere open for writing I used the following command:

``` bash
lsof | grep -e "[[:digit:]]\+w" | grep /var/www/vhost
```

What came to light was that the `nginx` process was locking every file for write access! Wow!!

#### Remove access time updates
Whilst investigating glock contention further I found this article that may be useful with reference to reducing the file writes:
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Global_File_System_2/s1-ov-lockbounce.html

> If you do not set the "noatime mount" parameter, then reads will also result in writes to update the file timestamps. We recommend that all GFS2 users should mount with noatime unless they have a specific requirement for
atime."

Our engineers took this a step further and implemented `noatime nodiratime` on the shared volume mount, which instantly removed the disk write access and `glock_workqueue` disappeared from iotop.

### Reducing general disk access
In an effort to further reduce disk access system wide there were a few small changes made to various services.

#### APC
[APC cache](http://php.net/manual/en/book.apc.php) will access the disk for 2 things, writing temporary files and `stat`ing the files. `stat` means to check the file timestamp to see if it has been modified.

Use a ram-disk for storing temporary files, in our stack this is `/dev/shm`

**apc.ini**
```
apc.mmap_file_mask=/dev/shm/apc.XXXXXX
```

Disable `stat`ing your code to see if it's changed. **BEWARE** that APC will now need telling to flush the cache when you update/deploy your code or you won't see the changes. I achieve this via a small php script that is invoked on each server when I deploy new code by using `wget` in my deploy scripts.

**apc.ini**
```
apc.stat=0
```

**apc-clear.php**
``` php
apc_clear_cache();
apc_clear_cache('opcode');
```

#### New Relic
While [New Relic is a peerless awesome server analyis tool](http://newrelic.com), it does write a lot of log files out. In short, find &amp; disable all of the log files you can. The New Relic eco-system is so variable and changes so rapidly that it's pointless me describing the specifics here but here's some I had to change.

- nr-sysmon-d
- nr-nginx
- nr-plugin   (php-fpm)
- nr-mysql

