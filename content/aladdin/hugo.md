+++
# title for page
title = 'Hugo'
# date created
date = 2024-10-05T14:37:38Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['hugo', 'build']
# param block
[params]
# use maths
maths = true
+++

[Hugo](https://gohugo.io) is a static site templating builder used here.
It works well. It seems similar to how github pages works, but is written in go
instead of ruby. It does take a little while to scan the documentation and
setup, as some of the more complex themes don't work with some integration
solutions such as **CloudFlare**. Simple truths such as a theme being a fallback
site make sense, as after some time migrating the templating to the theme
and just using the site layouts for overrides just makes sense.

After a few concepts such as front matter, `_index.md` files and complex folder
with an `index.md` plus resources for complex "posts", it all becomes simpler.
The ease with which new sections can be made besides the default "posts" is
good, although the documentation tends to be too over complex about this
simple process of expansion. Expanding the `assets/css` with template
layout alteration was easy once I'd read the simple layout files.

As soon as you find the place to inject the `.js` it's just easy to make
client side apps, and something like HTMX could be used for this too, as I'm  
sure with some aggregating servers and a backend shard database, complex sites
can be made.

It's even possible to make content for each tag for a kind of context theming.
I wish I'd had this in 1995. It would have made somethings much easier. It still
doesn't get passed the odd CSS order for float rights before the regular lefts.
