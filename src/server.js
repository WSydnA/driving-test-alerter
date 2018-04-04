'use strict';

var exec = require('child_process').exec;
var express = require('express')();
var CONSTANTS = require('./constants');

const prettify = str => `<pre>${str}</pre>`;

express.get('/', (req, res) => {
  exec('npm run casper', function (error, stdout, stderr) {
    // Return errors if applicable
    if (error !== null) {
      res.status(400).send(prettify(stdout) + prettify(stderr)).end();
      return;
    }
    // Return response
    res.status(200).send(prettify(stdout)).end();
  });
});

// Start the server
express.listen(CONSTANTS.BROWSING_DATA.SERVER_PORT, () => {
  console.log(`App listening on port ${CONSTANTS.BROWSING_DATA.SERVER_PORT}`);
  console.log('Press Ctrl+C to quit.');
});
