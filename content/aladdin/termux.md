+++
# title for page
title = 'Termux'
# date created
date = 2025-02-07T22:14:09Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['chromebook', 'development', 'android']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

So the Debian container on my Chromebook became slow and large. Things needed
to be done. So I deleted it and went full on with the latest release of 
**Termux** from the play store and installed some things like Neovim. Then
I had a little play, and some more things were installed. 

Excellent. It is much faster, does have a few "unique" ways of doing things, 
but it does have rust working, and a few strange things to do with lua
in Neovim due to how the Mason language server has to be installed from 
the package manager and not Mason. Ah, all is well bar a few start up errors
along with a little more learning needed for clipboard interaction.

I'll likely set up an X11 server later on, with maybe some nice tools. The 
miniature nature of the repositories (and ease of setting up more) does kind
of keep things small and manageable. I'm sure there can be dwm in the future
on an X server. And so many things can be built from source as and when I 
need them.

So that just leaves compiling Java for Android. Or ...
