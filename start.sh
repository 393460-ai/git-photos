#!/usr/bin/env bash
set -eu
rm -rf .runtime
mkdir -p .runtime
find . -maxdepth 1 ! -name .runtime ! -name .git -exec cp -R {} .runtime/ \;
awk '/<\/head>/ { print "    <link rel=\"stylesheet\" href=\"animation-enhancements.css\">"; print "    <script defer src=\"animation-enhancements.js\"></script>" } { print }' index.html > .runtime/index.html
exec npx --yes serve .runtime -l tcp://0.0.0.0:5000
