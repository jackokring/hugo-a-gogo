+++
# title for page
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
# date created
date = {{ .Date }}
# is draft to not build
draft = true
# place in main menu
menus = ['main']
# tag list
tags = ['untagged']
# type
# type = 'undated'
# param block
[params]
# use maths
maths = false
elm = false
+++
