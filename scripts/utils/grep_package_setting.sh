#!/bin/bash

# Grep setting value from package.json
RESULT=$(cat package.json \
  | grep $SETTING \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Trim whitespace
RESULT=${RESULT// /}

# Echo value to allow result to be captured
echo "$RESULT"
