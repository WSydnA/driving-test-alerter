#!/bin/bash

# Make everything executable
echo "Making everything executable"; echo ""
chmod -R +xr .

# Try the casper script outside of web server
echo ""; echo "chmod firefox"
chmod +x $PWD/firefox/firefox
echo ""; echo "chmod casperjs"
chmod +x $PWD/node_modules/casperjs/bin/casperjs
echo ""; echo "chmod slimerjs"
chmod +x $PWD/node_modules/slimerjs/src/slimerjs
echo ""; echo "chmod casper.sh"
chmod +x $PWD/scripts/casper.sh
echo ""; echo "chmod app.js"
chmod +x $PWD/src/app.js
echo ""; echo "chown everything"
chown $(whoami) -v --changes .
echo ""; echo "run casper script"
$PWD/scripts/casper.sh
