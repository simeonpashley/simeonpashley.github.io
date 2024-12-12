---
title: 20 years of a Video Game Developer's Career – Part 2
date: 2010-08-19 18:26:54

tags: ["career"]

description: this week we delve a little deeper on how we used to make video games before networks
---

I follow on from [Part 1 of this
series](http://pashley.org/2010/08/20-years-of-a-video-game-developer-career.html) with some more information on how I got where I am today in the video game development community. Most of the old stuff is irrelevant but I hope it shares the need to actively plan your career to avoid some development cul-de-sacs.

Let's continue...

I wrapped up the previous post where I'd pretty much reached a point
where I recognised a need to get a grip of my own career and make some
long-term plans, after all, no-one else was going to do this for me and
this wasn't going to happen overnight. Of course, this was all based on
assumption that everything else would stay the same in that the way
games were being made wouldn't change too much and we all know how wrong
that assumption was.

I'm not going to talk specifically about [the games I've
made](http://gamedevconsulting.blogspot.com/p/softography.html) as that information is available in lots of other places but more about my career so far.

![](/assets/img/AmigaInsertWorkbench-300x257.gif "AmigaInsertWorkbench")In
response to some comments on the 1st part I thought I'd embellish on
typical examples of how we made the games back then too. I see echos of
these early development concerns being raised on small mobile platforms
all of the time. Remember we're back in the days of no network
(definitely no internet), no development conferences, no degree courses,
no source control, virtually no support. You did this on your own,
learnt everything yourself and the only way you got stuff around was to
copy it onto a floppy disk.

### 100% system take over

The early games were largely done on the target machine with very little
debug facilities available. You made a change, compiled your code, ran
it, if it crashed then it was obviously the last thing you did. It's
true to say that we didn't have linkers either, so everything was in 1
file typically called 'MAIN.S' or similar, graphics were largely
included within that file as a series of HEX numbers that were
translated from the original files via some custom tools. A game
typically took over the whole system as there wasn't really the notion
of an operating system that was efficient enough for games to use, we
wanted 100% of everything available to
us: memory, cpu, gpu, etc. The games didn't share the system with anything else, everything had to be within the game.

You can imagine that these single files were pretty big and we started
to push the text editors capabilities but that thankfully coincided with
the advent of linkers that meant we could split our files out into
sensible chunks.

It's worth remembering that the floppy disks themselves were largely
just storage, we came up with our own file-formats and file loading
routines from scratch typically accessing the hardware at a low-level.
For us this was an iteration of the custom tape loaders that had been
the norm back on C64/Spectrum where they were necessary to speed up
loading times via 'turbo' loads and the like. Our loaders typically
involved decompression routines too as we constantly tried to improve
the loading times and how much content we could fit on a disk. We also
rolled our own security systems with the hope of stalling the pirates
ripping off our games for at least a few hours.

#### Memory Management

Clever games were starting to use dynamic memory management instead of
the fixed memory maps of old, these came with a massive 12-byter
overhead per allocation so it was quite expensive. We naturally hit
memory fragmentation problems quickly such as where we'd load a file
into region 'A', then decompress to 'B' and free up 'A' to be re-used,
i.e., typically adjacent AB. Now, if the next file you wanted to load
wasn't 100% identical to 'A' then you'd end up using some of it, maybe
even decompressing within that space too and the whole process rapidly
broke down into chaos as the largest single consecutive piece of memory
dwindled into nothing.

The quickest solution to fragmented memory? Bi-directional allocation,
i.e., load files from the end of memory down and then decompress from
the bottom up. This also resulted in the revelation that given a little
buffer space you can decompress over the top of the source file, which
was mighty useful when your last file was loaded.

So, all of our game files obviously had to be compressed and this took
quite a while to do on the relatively slow systems we had too. The tools
we built on PC were entirely custom made and we had our own compression
routines based on generally available ones, which were specialised to
accommodate the specific needs of bitmaps, audio and level data.

#### The alternative use of compression

Our tools at the time had lots of stats, bouncing colours, meters going
up and down, progression bars and all manner of bells and whistles. It
was often the case that most of the content of these frontends was
largely 'fluff' and that they gave us an excuse to do other things, I'd
even say that some of our tools gave the illusion of them doing lots of
work even though they'd finished! They simply waited a special keystroke
command to 'finish' their processing. This was very handy sometimes when
you just needed to be undistracted and you could just say "it's still
packing". :)

#### File Editors & Remote Debug

![](/assets/img/BriefTextEditor-300x264.png "BriefTextEditor")The advent of
remote debugging using SNASM dev-kits (later renamed PsyQ) brought in
the use of proper compilers, linkers, debuggers and text editors. The
debugger was \*the\* most important aspect of the whole setup and the
company called [SN Systems](http://www.snsys.com/) still makes the systems of choice for PS3 development.

Back then though, PC systems running DOS were the de facto standard and
the ubiquitous text editor then was
'[BRIEF](<http://en.wikipedia.org/wiki/Brief_(text_editor)>)', which was a revelation because it not only restored your session but also enabled you to have multiple files open in split windows! Later versions also integrated the error messages from your tools that meant you could quickly jump around your code and fix the errors quickly without referencing a separate compiler output file.

**<span style="font-weight: normal;">
</span>**

I'll continue my career story in Part 3...
