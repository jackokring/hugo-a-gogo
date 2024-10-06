+++
# title for page
title = 'Suckless and Rofi'
# date created
date = 2024-10-05T23:43:45Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['suckless', 'dwm', 'st', 'slstatus', 'rofi', 'dmenu']
# param block
[params]
# use maths
maths = true
+++

## st

The suckless terminal. It's ideally small to bake in a nerd font, and remove
non UTF-8 mode, and the alt code Latin code page. On a Chromebook this is
important as the Crostini terminal doesn't have nerd font abilities. I then
launch `nvim` inside `st` to obtain a local and an `ssh -X` remote fonted
edit experience. Nice.

## rofi

A nice hot keyed quick launch selector. After a bit of setup lots can be
placed for access by `rofi -show combi`, the mix together mode.

## dwm, slstatus and dmenu

A simple efficient desktop window manager and it's status bar. Faster on
simpler hardware. Has it's uses. So `dmenu` is like a mini `rofi` custom for
`dwm`.

Checkout [suckless](https://suckless.org/) and
[rofi](https://github.com/davatorium/rofi) if you like it so.
