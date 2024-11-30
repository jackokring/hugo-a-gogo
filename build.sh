#!/usr/bin/bash
elm make assets/elm/Main.elm --output=static/main.js
# build site
rm -rf public/
hugo
pagefind --site public
# hurray, it builds
git add .
# still think bash has wierd ... '\'' ... handling
git commit -m "$(date +'%A %Y-%m-%d %H:%M:%S')"
git push
