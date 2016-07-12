---
title: Week ending - 11th October
tags: [web development, docker, react]
date: 2015-10-11 18:36:45
---

There are a few things I discovered this week worth noting:

- [Docker empty volumes](#a1)
- [Starting React](#a2)
- [Profile refresh](#a3)

{% include toc.html %}

<!-- more -->

## <a name="a1"></a> Docker empty volumes

Earlier in the week I moved all projects stored on my laptop into a new directory to get them out of my _User_ directory to adhere to our internal project storage policy.

[Docker] started behaving oddly, mounted volumes & paths were now empty on the host. The folder existed on the image but none of the files mapped from my laptop were there anymore.

It took a long while to figure out that the issue was specific to the paths themselves. What I had completely forgotten was that [Docker] on Windows/Mac can **only see below your home directory**. Therefore mapping '~/projectX/www' worked fine but `/projects/projectX/www` didn't.

I tried to symlink the folder beneath the `~` directory but that didn't work as Docker resolved the path back to its original home.

As I write, the projects are now back under my home directory and Docker is now back working again!

## <a name="a2"></a>Starting React

After enjoying building iOS apps recently with [React Native] I thought I'd take the plunge and migrate our new internal project from [Laravel] /PHP over to [React] & [NodeJS]. It feels like a great match for the project objectives too.

## <a name="a3"></a>Profile refresh

I took a little time out to refresh this site and also my LinkedIn profile to update them a little to reflect changes. My LinkedIn profile was heavily focused on my career in video games that ended in 2010 so it was long due a re-vamp.

[Docker]: http://www.docker.com
[React]: https://facebook.github.io/react/
[React Native]: https://facebook.github.io/react-native/
[NodeJS]: https://nodejs.org/
[Laravel]: http://www.docker.com

### Debug
{:.no_toc}
