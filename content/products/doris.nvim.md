+++
# title for page
title = 'Doris.nvim [Free]'
# date created
date = 2024-11-13T12:05:38Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['nvim', 'neovim', 'plugin']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

A plugin for `nvim` (LazyVim) hosted open-source MIT licence. It's quite a bit
of a mix. [Check here](https://github.com/jackokring/doris.nvim) for details.
I'm liking Lua, especially now I'm building something to help with my future
experience with it. The repository also contains some dotfiles for some other
tools and my `nvim` (LazyVim) dotfiles with a `cmp` example fetching `autojump`
directories after typing a `/`. Easier after combining a few online
tutorials, and a bit of hacking `lua/config/complete.lua`.

It kind of depends on `plenary.nvim`, but as LazyVim loads this anyway, that's
fine. I'm still customizing `nvim` for how I'm finding it. I'm picking (have
picked) through `plenary.nvim` and passed through some goodies into the `_G`
context. I added `Novaride` to protect `_G` from clobbered symbols, so
it should be safe to use, as long as you respect the `require("doris.novaride")`
usage. My dotfiles also use `<C-\>` as a normal leader for some things like
some of the nicer `telescope.nvim` modes. Nice.
