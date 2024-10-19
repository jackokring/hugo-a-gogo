+++
# title for page
title = 'Typescript'
# date created
date = 2024-10-19T12:43:30Z
# is draft to not build
draft = false
# place in main menu
menus = []
# tag list
tags = ['typescript', 'javascript', 'website', 'server']
# param block
[params]
# use maths
maths = true
+++

Ah, after a bit of setup, some peace. So renaming the `.js` to `.ts` and
changing the include in the header to `.ts` too, typescript becomes easy.
Sure, there's the `index.d.ts` to allow `window.<name>` assignments,
and adding in a few type definition files along with the `dom` library.

Then there's an ease of using `Function` as a callable type, or `{ prop?: type }`
for when some functions need particular properties in the JSON. That then
just left the `async`/`await` hell, which can be ignored quite a bit, needing
just `(async () => { await ... })()` as a wrapper when unsure if you should
allow a `Promise` to pass back or not as it gives you back a normal function
return.

## The Google Login

Yes, it works to the extent of now needing a logout, and some decision on
the data persistence tech to use on the server side. Trying out CloudFlare
workers (a serverless script tech), and then options to store the server side
authentication details. Typescript does make this much easier, with less
uploading future errors to find. The `.ts` is compiled on the server.

All in all, an excellent addition, now if only it didn't need `npm` to make
type definition downloads as I don't see myself using node or such. I mean
worker scripts can also be python `.py` scripts too.

## Precision

I suppose some Typescript maniacs would complain of the simple generic use
of `Function`, but for me I don't want a fully rigid system. I want something
where just a little hint can spot a bug while not overdoing that necessary
for correct construction. That's the nice thing of Typescript, it doesn't
need a full type specification, just an occasional tightening from a default
`any`. You'd think it was `rust` the way some type definition is done.
