+++
# title for page
title = 'Plugins'
# date created
date = 2024-12-03T07:57:55Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['plugin', 'audio', 'vcv', 'vcvrack', 'lv2']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

Ah, plugins. So the [VCVRack](https://vcvrack.com) is quite nice and my
plugins there are [KRTPluginA](https://library.vcvrack.com/KRTPluginA). Nice.
So on to some newer code making LV2 plugins. The code is not open circa 2024,
and there are many decisions to make. I'm finding [carla](https://kx.studio/Applications:Carla)
for the test host to be OK. The OSC control feature is going to be useful.

This section of the website is also for the needed URI that LV2 needs for the
manifest files. This makes the plugins Linux by design and possibly working
on Mac by `Darwin` compatibility and Windows by [MSYS2](https://msys2.org).
It seems very similar to VST and VCVRack design, and supports other formats
which I don't think I'll be using. Hold onto your knobs.
