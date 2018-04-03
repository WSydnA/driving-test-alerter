#!/bin/bash

apt-get update && \
apt-get -y install wget && \
wget http://ftp.mozilla.org/pub/firefox/releases/$FIREFOX_VERSION.0/linux-$(uname -m)/en-US/firefox-$FIREFOX_VERSION.0.tar.bz2 && \
tar -xjf firefox-$FIREFOX_VERSION.0.tar.bz2.1 && \
mv firefox /opt/ && \
ln -s /opt/firefox/firefox /usr/bin/firefox
