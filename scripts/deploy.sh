#!/bin/bash

# Get app version from package.json, replace dots with dashes
APP_VERSION=$(SETTING=version $PWD/scripts/utils/grep_package_setting.sh)
APP_VERSION=${APP_VERSION//./-}

echo "Deploying version $APP_VERSION"; echo ""

# Deploy to the version. Don't set as default, run without input
gcloud app deploy --quiet --no-promote --version=$APP_VERSION

# Show realtime logs after deployment
gcloud app logs tail -s default
