'use strict';

var casper = require('casper');
var CONSTANTS = require('./constants');
var DATA = require('../data');

var userAgentChoice = Math.floor(Math.random() * CONSTANTS.BROWSING_DATA.USER_AGENTS.length);
var userAgent = CONSTANTS.BROWSING_DATA.USER_AGENTS[userAgentChoice];
var width = Math.floor(Math.random() * 1400) + 800;
var height = Math.floor(Math.random() * 1000) + 600;

var randomWait = function () {
  return Math.floor(Math.random() * 1200) + 2400;
};

// Log settings
console.log('Using user agent ' + (userAgentChoice + 1) + ': ' + userAgent);
console.log('Using screen dimensions ' + width + ' x ' + height);
console.log();

// Create casper instance
casper = casper.create({
  pageSettings: {
    userAgent: userAgent,
    javascriptEnabled: true,
    loadImages: true,
    loadPlugins: true,
    allowMedia: true
  },
  viewportSize: {
    width: width,
    height: height
  },
  logLevel: 'debug',
  verbose: true,
  httpStatusHandlers: {
    403: function () {
      this.die('403 error - we\'ve been blocked :(');
    }
  }
});

// Go to first page and follow link
casper.start(CONSTANTS.BROWSING_DATA.START_PAGE, function () {
  this.echo(this.getTitle());
  casper.waitForSelector(CONSTANTS.SELECTORS.START_LINK, function () {
    this.wait(randomWait, function () {
      this.click(CONSTANTS.SELECTORS.START_LINK);
    });
  });
});

// Stop if unavailable or click car test button
casper.waitForSelector(
  CONSTANTS.SELECTORS.CAR_TEST_BUTTON + ',' +
  CONSTANTS.SELECTORS.UNAVAILABLE_NOTICE,
  function () {
    this.echo(this.getTitle());
    if (this.exists(CONSTANTS.SELECTORS.UNAVAILABLE_NOTICE)) {
      this.die('Service is unavailable. Try again after 06:00 GMT.');
    }
    this.wait(randomWait, function () {
      this.click(CONSTANTS.SELECTORS.CAR_TEST_BUTTON);
  });
});

// Complete details form
casper.waitForSelector(CONSTANTS.SELECTORS.LICENCE_FIELD, function () {
  this.echo(this.getTitle());

  var licenceFieldSelector = CONSTANTS.SELECTORS.LICENCE_FIELD;
  var formData = {};
  formData[licenceFieldSelector] = DATA.LICENCE_NUMBER;
  // Enter licence number
  this.wait(randomWait, function () {
    this.fillSelectors(CONSTANTS.SELECTORS.LICENCE_FORM, formData, false);
    // Select no extended test
    this.wait(randomWait, function () {
      this.click(CONSTANTS.SELECTORS.NO_EXTENDED_TEST);
      // Select no special needs
      this.wait(randomWait, function () {
        this.click(CONSTANTS.SELECTORS.NO_SPECIAL_NEEDS);
        // Submit form
        this.wait(randomWait, function () {
          this.click(CONSTANTS.SELECTORS.LICENCE_SUBMIT);
        });
      });
    });
  });
});

// Complete date and instructor form
casper.waitForSelector(CONSTANTS.SELECTORS.CALENDAR_TOGGLE, function () {
  this.echo(this.getTitle());

  // Select today's date
  this.wait(randomWait, function () {
    this.click(CONSTANTS.SELECTORS.CALENDAR_TOGGLE);
    casper.waitForSelector(CONSTANTS.SELECTORS.CALENDAR_TODAY, function () {
      this.wait(randomWait, function () {
        this.click(CONSTANTS.SELECTORS.CALENDAR_TODAY);
        // Enter instructor's number, if available
        if (DATA.INSTRUCTOR_NUMBER) {
          var instructorFieldSelector = CONSTANTS.SELECTORS.INSTRUCTOR_FIELD;
          var formData = {};
          formData[instructorFieldSelector] = DATA.INSTRUCTOR_NUMBER;
          this.wait(randomWait, function () {
            this.fillSelectors(CONSTANTS.SELECTORS.LICENCE_FORM, formData, false);
            // Submit form
            this.wait(randomWait, function () {
              this.click(CONSTANTS.SELECTORS.LICENCE_SUBMIT);
            });
          });
        }
      });
    });
  });
});

// Complete test center form
casper.waitForSelector(CONSTANTS.SELECTORS.TEST_CENTER_FIELD, function () {
  this.echo(this.getTitle());

  var testCenterSelector = CONSTANTS.SELECTORS.TEST_CENTER_FIELD;
  var formData = {};
  formData[testCenterSelector] = DATA.TEST_CENTER_NAME;
  // Enter test center name
  this.wait(randomWait, function () {
    this.fillSelectors(CONSTANTS.SELECTORS.TEST_CENTER_FIELD, formData, false);
    // Submit form
    this.wait(randomWait, function () {
      this.click(CONSTANTS.SELECTORS.TEST_CENTER_SUBMIT);
      // Click test center link
      casper.waitForSelector(CONSTANTS.SELECTORS.TEST_CENTER_LINK, function () {
        this.wait(randomWait, function () {
          this.click(CONSTANTS.SELECTORS.TEST_CENTER_LINK);
        });
      });
    });
  });
});

// Read soonest available date
casper.waitForSelector(CONSTANTS.SELECTORS.FIRST_BOOKABLE_DATE, function () {
  this.echo(this.getTitle());

  // Report next available date
  var date = this.getElementAttribute(CONSTANTS.SELECTORS.FIRST_BOOKABLE_DATE, 'data-date');
  var dateParts = date.split('-');
  var day = dateParts[2];
  var month = dateParts[1];
  var year = dateParts[0];
  this.echo();
  this.echo('Next available test: ' + day + ' / ' + month + ' / ' + year);

  // Report available times that day
  this.click(CONSTANTS.SELECTORS.FIRST_BOOKABLE_DATE);
  var times = [];
  casper.evaluate(function () {
    var times = document.querySelectorAll(CONSTANTS.SELECTORS.BOOKABLE_TIMES);
    for (var i = 0; i < times.length; i++) {
      times.push(times[i].textContent);
    }
  });
  this.echo('Available times: ' + times.join(', '));
  this.echo();
});

casper.run();
