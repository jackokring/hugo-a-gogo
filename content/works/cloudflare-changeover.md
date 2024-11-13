+++
# title for page
title = 'Cloudflare Changeover'
# date created
date = 2024-11-13T12:36:13Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['isp', 'cloudflare', 'dns', 'workers']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = true
+++

This site is hosted on CloudFlare with workers for lambda style JS server side
scripting. The login feature uses this. I'm moving my DNS to this site soon.
I can then shutdown the old development server or repurpose it for experimental
use. I may transfer some of the text articles over, as I have done a `wget` of
the old site. It used `WordPress`, and I am over my desire to use PHP, and
keeping up using a bit of an open-source news bane.

I'm actually liking this markdown/typescript way of working with `hugo`. It
makes really good locally indexed static sites, and JS can do all the clever
stuff keeping the server worker threads light with efficiently specified
"trimmed" XML. That old classic hidden `div` with `jquery`.
