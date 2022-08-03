---
title: Epic Citadel - lean, mean development
date: 2010-09-06 11:17:04
tags: ["development", "iphone", "middleware", "unreal"]
---

![epic-citadel-004](/assets/epiccitadel004.jpg "epic-citadel-004") The
recent outing on iPhone of the amazing looking Unreal Engine 3 demo
entitled [Epic
Citadel](http://itunes.apple.com/us/app/epic-citadel/id388888815)
(available free) by Epic really shows the underlying capability of the
hardware that current mobile devices have. In short, it’s like nothing
you’ve seen on any iOS device so far. But is it all good for game
developers?

I’m reminded when I see such apparent wonders of technology that
actually, this is what most developers can achieve if they’re prepared
to go as low down in the API as they can, right down the HAL if
possible. The closer you get, the more layers of noisy slow API you get
past and the more precious CPU & GPU time you get to spend on your
content.

I’m also reminded of the fat, lazy techniques that it’s easy to get away
with when you’ve got a lot of CPU & GPU power to play with on most
non-portable systems such as PS3 / X360 / PC / Mac.

Why bother to optimise your artwork, level design, code when you can
just let the video card do all of the work for you? This is a bad
attitude.

Sloppy implementation really hurts handheld devices and the best teams
know how to be lean with their systems and really squeeze every ounce
out of the available hardware. This is generally good practice anyway.

As an example for iPhone; If you can, go straight past
[COCOS2D](http://www.cocos2d-iphone.org/) / 
[Unity](http://unityiphone.com/) /
[Prime](http://www.the-prime-engine.com/) to EAGL and [Open GL
ES](http://developer.apple.com/iphone/library/documentation/3DDrawing/Conceptual/OpenGLES_ProgrammingGuide/OpenGLESontheiPhone/OpenGLESontheiPhone.html#//apple_ref/doc/uid/TP40008793-CH101-SW1). From here low-level code, smart techniques, clever level design and diligent artists will all combine to get you a great, fast experience. I appreciate it’s tougher to do but the benefits are worth the effort.

If you’re not careful, the danger then is adding in fat such as
scripting languages such as [LUA](http://www.lua.org/) or [UE3
Kismet](http://www.unreal.com/) (Unreal’s embedded scripting language) that cost you performance to interpret at run-time.

You should also consider the type of game you make. I've personally work
on a few UE3 titles and from personal experience, and  many game devs
will tell you, UE3 is great at making Gears of War type games. The
further you get away from doing short-view FPS games, the more and more
of UE3 you have to re-write to make it work. Just ask the team on APB
who tried to make an open-world MMO using it.

Try and think about this when you’re setting out with your system
architecture and you’re choosing your low-level systems that you’re
going to build everything on top of. Make sure it’s right, make sure
it’s going to stand the test of time and get the game \*you\* want to
make.

Check out what can be [achieved in just 4,096
bytes](http://www.assembly.org/summer10/gallery/4k-intro/neanderstaller-by-pittsburgh-stallers) if you try.
