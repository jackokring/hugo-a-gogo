#!/usr/bin/bash
# make elm main.js file if elm installed
# use elm = true in front matter
# makes it optional
elm && elm make assets/elm/Main.elm --output=static/main.js
# build site
rm -rf public/
hugo
pagefind --site public
# hurray, it builds
git add .
# still think bash has wierd ... '\'' ... handling
git commit -m "$(date +'%A %Y-%m-%d %H:%M:%S')"
git push
