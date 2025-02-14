+++
# title for page
title = 'Termux and MultiVNC'
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

So that just leaves compiling Java for Android. Or ... X11 using VNC with dwm?
Ah, yes. Minor `Alt + i` and `Alt + Shift + c` problems of entry with the free
VNC client I'm using. Customization is also limited due to missing `ft2build.h`
but that's not too bad.

### Later Additions

Microsoft RDP Client and package `xrdp` (a slightly involved setup) gives full
screen desktop and both vnc and rdp connection options. Apparently Termux uses
`eth5` for the `traceroute` gateway. All the Alt keys work too without bad
workarounds (should that be reach-arounds). The following is useful in build
files.

```bash
PREFIX=${PREFIX:-/usr}
gcc -I$PREFIX/include
```

Other things that work `dwm`, `gimp`, `godot` (actually version 4), `hugo`,
`python`, `go` and all the regular utilities. `xsetroot -name <title>` is available
too. I found the `ft2build.h` as all builds need the `$PREFIX` hack (not to be
confused with the installation prefix often used in make files). Embedded `lua`
compiles into `c` too. Apparently `ardour` should work but it goes segmentation
fault on shared memory, though `audacity` works. I might have to go `LADSPA`.

I'm pleasantly surprised how much of my Neovim/LazyVim config works. Even the
two errors on markdown and lua language servers are likely due to them being
system installs on Termux, and as such they do "work", although I always have
the loading errors. Ah, Tokyo moon just a Termux:style £1.79.
