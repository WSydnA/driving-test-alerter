#!/bin/bash

echo ""; echo "+++"; echo "Starting casper script..."; echo "+++"; echo ""

# Run casper script with slimerjs in headless mode
SLIMERJSLAUNCHER=$PWD/firefox/firefox casperjs --engine=slimerjs --headless ./src/app.js
