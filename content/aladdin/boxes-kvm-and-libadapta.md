+++
# title for page
title = 'Boxes, KVM and Libadapta'
# date created
date = 2025-10-08T18:10:29Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['virtual', 'style', 'libadatpta', 'lua', 'python', 'C++', 'lua']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

## Boxes and KVM

I've recently removed and converted some VMs from `VirtualBox` to `gnome-boxes`
and the `.qcow2` format. It went well. The only loss was "tiny video" as the
resolution scaling is absent from the boxes version I'm on. The fact I
can keep a `podman` instance up working (relies on kvm) was a major reason
for the switch. So really not that much of a change.

## Libadapta and Themes

On the Linux Mint 22.2 upgrade, I tried out the `libadapta` theming under a
python program. Using `Gtk-4` Adwaita is not too bad, but sometimes looks
limited and unstyled. So I developed the basic demo further, adding in
`C++` to a `hatch` project, and then also added in `luaJIT-5.1` for preference
for some things. I don't mind python for its large module range, ML to
quite a few GUI toolkits. But I do like the simplicity of Lua and such a thing
is more likely to fit mostly in the I-cache.

I'll add to this demo project as I think of good implementation ideas. I
think I might try some multithreaded audio, as the `.lv2` plugin spec is in my
opinion, overly verbose waffle.

## Other Project News

I'm doing all this as me, myself. If anything gets really good traction I
suppose it will become a company focus. But my "housing" has a "no working"
clause, and so It's just "hobby" just like the competition "arranged".
