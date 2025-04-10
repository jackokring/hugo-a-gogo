+++
# title for page
title = 'Godot Game Engine'
# date created
date = 2025-04-10T23:12:57Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['games', 'development', 'GDScript']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

So, developing a game. I picked Godot, as I didn't feel like developing a lot
of game engine code, as the gameplay code seemed more challenging and of a
more experimental nature. Circa April '25 there is just a basic play field,
a character movable by keyboard or joypad, a bounce mechanic at the display
edge, some menu for sound settings, a four note tune with some drums, some
free graphics and a path generator.

Next is some of the AI, as it is appropriate to merge it with the navigation
`A*` system for the simplest of path following AI character. There is a little
thought about genetic algorithms and verb tenses, to cover "thoughts" of
future characters to the mix. "Follow an expected future position," for example.

At some point there may be things like a randomized "card" (or spin) mechanic
as this is popular for progression and meta-progression (over a number of plays)
in popular gaming. Some might say I'm over thinking it, but that is why I
tend to like the coding. For example, I must find a way that the "card" mechanic
doesn't stop the real time flow of the chase action.

I think opening a python AI server port for the game might be going too far.
I don't think a full SQL massive multiplayer is good for a cheap to free
game as the server billing dynamics don't favour generosity.

Um ...
