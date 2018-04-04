#!/bin/bash

# Get firefox version from package.json
FIREFOX_VERSION=$(SETTING=firefox $PWD/scripts/utils/grep_package_setting.sh)

# Install Firefox
echo "Installing Firefox $FIREFOX_VERSION"; echo ""
apt-get update && \
apt-get -y install wget && \
rm firefox-$FIREFOX_VERSION.tar.bz2 -f && \
wget http://ftp.mozilla.org/pub/firefox/releases/$FIREFOX_VERSION/linux-$(uname -m)/en-US/firefox-$FIREFOX_VERSION.tar.bz2 && \
tar -xjf firefox-$FIREFOX_VERSION.tar.bz2 && \
rm firefox-$FIREFOX_VERSION.tar.bz2 -f
