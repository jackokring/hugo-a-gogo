+++
# title for page
title = 'A Simple RISC'
# date created
date = 2024-11-12T19:50:19Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['ISA']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++

Some ideas for a simple RISC processor although unlikely to ever be made, do
have possible application. To make it easy a 16 bit wide instruction and 16
general registers 32 bit wide make most sense.

Hiding the link register `ln` has good security implications so it is always
implicit. Also the `pc` can be implicit too. So here goes. It's not as though
the return stack isn't heavily cached, and doesn't need writeback of anything
below the stack pointer line.

| 15 - 12 | 11 - 8 | 7 - 4 | 3 - 0 | function                                               |
| ------- | ------ | ----- | ----- | ------------------------------------------------------ |
| add     | rd     | rs1   | rs2   | rd := rs1 + rs2 (with `ln` taking carry in LSB)        |
| mul     | rd     | rs1   | rs2   | rd := rs1 \* rs2 (with `ln` taking hi-word)            |
| adc     | rd     | rs1   | rs2   | rd := rs1 + rs2 + `ln` (`ln` taking carry)             |
| mvq     | rd     | dnh   | dnl   | rd := imm(dnh\*8 + dnl)                                |
| sub     | rd     | rs1   | rs2   | rd := rs1 - rs2 (with `ln` taking borrow)              |
| sto     | rd     | rs1   | rs2   | (rs1) = rs2; rd = `ln`                                 |
| sbc     | rd     | rs1   | rs2   | rd := rs1 - rs2 - `ln` (`ln` taking borrow)            |
| bra     | cc     | dnh   | dnl   | pc += imm(dnh\*8 + dnl) (condition code of `ln` cc)    |
| xor     | rd     | rs1   | rs2   | rd := rs1 ^ rs2                                        |
| rcl     | rd     | rs1   | rs2   | `ln` = rs2; rd := (rs1)                                |
| and     | rd     | rs1   | rs2   | rd := rs1 & rs2                                        |
| orr     | rd     | rs1   | rs2   | rd := rs1 \| rs2                                       |
| adq     | rd     | rs1   | dnl   | rd := rs1 + imm(dnl)                                   |
| cmp     | cc     | rs1   | rs2   | \_ := rs1 - rs2 (like sub but cc masks `ln` bit holds) |
| trp     | dnx    | dnh   | dnl   | supervisor trap / mode set                             |

And a final 4 bit code to handle (with 12 bit for other things):

- `ln` := (pc+); (-sp) := pc; pc := `ln`
- pc := (sp+)
- `ln` := +(sp+); pc := (`ln`); (sp-) := `ln`
- `ln` := (pc+); pc := (`ln`); (sp-) := `ln`
- `ln` := +(sp+)
- rd := (pc+) -- (dnh selector)
- and other things ...

So maybe `r0` is a zero? Maybe write `r0` with `ln` is a `/dev/null`?
Maybe `r0` write with another source is opcode extend for expansion?
Maybe `r0` write from `sto` indirect is also a `/dev/null`?

No reason the registers couldn't be 64 bit, or even a more practical 48 bit.
It would drop 1/4 off the load stress and cover an amazing 281 GB+, especially
if indexing memory by 16 bit opcode words. It's a basic cosmic ray micron
issue.
