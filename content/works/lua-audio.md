+++
# title for page
title = 'Lua Audio'
# date created
date = 2024-11-18T17:42:28Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['lua', 'audio']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = true
+++

So a library for Lua to do some kind of audio. I don't mean multimedia loading
as this could be simple `os.execute(...)` call wrappers, with perhaps `"...&"`,
but a bit of that is still an idea to add later. It's more sort of chip-tune
kind of stuff. A likely is `os.execute("<c-program> <arg> ... | pw-play -&")`
for a more exciting audio generation experience. As each note would then
become threaded, which for small sound experimentation would be fine.

The sample rate of `48000` does seem high for chip-tunes, but is a feature of
`pw-play` and not and sample generator program. The program just has to emit
signed 16 bit samples by default for a length and then close the output stream.
This would then make the thing portable across platforms as standard C code,
with minor scripting changes for other languages and "Windoze" in particular.

It then just becomes setting some standard argument conventions and a heuristic
based on computer history is useful here.

1. `Length` is seconds. A classic it can be controlled 1st step.
2. `Volume` between 0 and 1 for the next level of control of stimulation.
3. `Frequency` with 0 being a 440Hz and +1/-1 going up and down one semitone.
4. `Filter` also a frequency using the same note scaling.
5. `Resonance` this one might be more involved.
6. `Vol.drift` in 6dB per 100% length.
7. `Freq.drift` in semitones per 100% length.
8. `Filt.drift` also in semitones per 100% length.
9. `Res.drift` more involved, yes but of the 100% kind.
10. `Mod.volume` well parameter 10 kind of starts as parameter 2 of a modulator.

This then makes for an easy as many as needed with a 1 second beep for no
parameters, and all modulators starting off with parameter clone, but zero
volume. So the 10th parameter just applies some frequency matched PM modulation,
with cloned parameters from the carrier oscillation.

It's sounds like an idea.

```text
     _            _                  _
  __| | ___  _ __(_)___   _ ____   _(_)_ __ ___
 / _` |/ _ \| '__| / __| | '_ \ \ / / | '_ ` _ \
| (_| | (_) | |  | \__ \_| | | \ V /| | | | | | |
 \__,_|\___/|_|  |_|___(_)_| |_|\_/ |_|_| |_| |_|

```
