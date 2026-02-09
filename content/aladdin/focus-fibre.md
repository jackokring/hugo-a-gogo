+++
# title for page
title = 'Focus Fibre'
# date created
date = 2026-02-09T19:52:39Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['AI', 'Cardputer', 'uLisp', 'audio']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++
I've been forking the [ulisp-cardputer](https://github.com/jackokring/ulisp-cardputer)
repository to include somethings I like. A gradual extension of the **uLisp** 
and some new C/C++ primitives are likely on the audio and GUI front.

I'm also thinking about AI cross attention. So optimizing the transformer
attention as a "bundle" aggregate turns an I.M.O matrix problem into a 
I.A.M.B.O problem with M's size reducing to the lower square, and A and B
mapping from the larger M to a smaller one. Kind of making an attention fibre.

The dropout training on various M, depending on the focus context makes for 
a way of doing a sum of agents, by some selection or weighting of (maybe A)
and B based on input I or output O, or even A.M.B (iterative short term memory).


