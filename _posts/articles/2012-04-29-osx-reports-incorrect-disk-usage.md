---


title: OSX reports incorrect disk usage
date: 2012-04-29 14:05:44



type: post

---
If you're OSX disk usage is being reported incorrectly then you've
probably got caught by a Time Machine feature introduced in Apple OSX
10.7. This typically happens where your free disk space erodes over time
or when you delete some files and yet the disk still claims to have the
same space usage as before.

This is a silently introduced feature where Time Machine can operate on
on laptops (Macbook Air / Macbook Pro) when the TM volume isn't
available. The system essentially snapshots your changes for backing up
later.

Read about it
here <http://arstechnica.com/apple/reviews/2011/07/mac-os-x-10-7.ars/18>

If you want to disable the feature and reclaim your space go in to
*Terminal* and
enter:

    sudo tmutil disablelocal

**followed by return, and after entering you password and hitting return
again, it should delete the local snapshots and free up the missing
space.

 
