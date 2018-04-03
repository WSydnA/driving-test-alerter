#!/bin/bash

VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

VERSION=${VERSION//./-}
VERSION=${VERSION// /}

echo "Deploying version $VERSION"; echo ""

gcloud app deploy --quiet --version=$VERSION

gcloud app logs tail -s default
