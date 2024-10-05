+++
# title for page
title = 'Neovim'
# date created
date = 2024-10-05T11:10:32Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['nvim']
# param block
[params]
# use maths
maths = true
+++

The excellent [Neovim](https://neovim.io/) has improved a lot since the older
`vim` and even the original `vi`. It now includes Lua scripting as well as
the more obscure Vim Script. It is best using some extra configuration of which
[LazyVim](https://www.lazyvim.org/) I have found to be very useful.

As a fast loading editor with treesitter and various LSP servers, it's nice,
although the way "modes" work is not your usual editor way. It has the speed
advantage over `VSCode` and also will load files over an `SSH` connection
whereas `VSCode` just freezes. I tried `Emacs` for a while and have used it
back in the 90s. I found the LISP configuration more annoying than using
Lua for configuration. Also `LazyVim` really solves the initial setup problems.

I'm still learning commands and I'm finding `o` to be a useful instead of
`A<cr>`. Multi-cursor is not really needed with `:%s/ ... / ... /g` as a
classic regular expression find and replace. While `q` allows recording
key macros, for easy replay. It's a steep learning curve, but powerful.
