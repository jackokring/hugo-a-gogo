+++
# title for page
title = 'JQuery and Underscore'
# date created
date = 2024-10-24T22:42:53Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['jquery', 'underscore', 'js', 'ts']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

## Underscore.js

A nice functional JavaScript library. I like it, although it might be a bit of
a challenge to get it working server side with CloudFlare workers. It even
includes a simple dynamic template system with `_.template()`. It can be found
as an ESM module as well as "normal" UMD, so that might help some.

## JQuery

A compact library to do DOM processing based on tags. A similar challenge to
get it server side, but it would make for more expressive terse code
if the server had a DOM, but it doesn't. I suppose that's lucky. It's not
as though all it does can't be done otherways, it's just so compact to write
without all the boilerplate duplication. I'm sure with DOM templates it will
be efficient to implement things.

As modern browsers have `fetch`/`async`/`await` it seems best to use the slim
version without `ajax` and `effects` itself replaced by CSS effects. For new
projects this will be best.

## TypeScript

The type definitions are available, so that's nice.
