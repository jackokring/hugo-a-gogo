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
maths = true
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
- and other things ...
