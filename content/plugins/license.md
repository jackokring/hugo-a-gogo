+++
# title for page
title = 'Audio LV2 License'
# date created
date = 2024-12-14T03:16:27Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['plugin', 'audio', 'lv2', 'license']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

# Audio-LV2, Copyright 2024, Simon Jackson, K Ring Technologies Ltd

The files in the `plugins/audio-lv2` (source) directory are mainly copyright
2024, Simon Jackson, K Ring Technologies Ltd. The build scripts are under
various copyright covered in the files themselves and/or the LICENSES folder.

All commercial and non-commercial rights reserved. Modification of the build
scripts and the helper shell scripts are for the purpose of making a binary
distribution `build/plugins/audio-lv2.lv2` folder for LV2 plugin hosts. Standard
LV2 extensions are used.

All example source of the other plugins has been removed from the build chain.
The example source which builds those other plugins can be found at
[The Example Plugins](https://gitlab.com/lv2/lv2/-/tree/main/plugins) if you
wish to develop your own plugins in the LV2 format. The extensions used are
also available from this repository. It is an excellent source of initial
information, but you are suggested to obtain information on GUI design from
other sources as the `plugins/eg-sampler.lv2` example uses the Gtk toolkit and
this is known to have certain issues with being loaded more than once (perhaps
also by the DAW or other host).
