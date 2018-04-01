var casper = require('casper').create();
var CONSTANTS = require('./constants');
var DATA = require('../data');

// Go to first page and follow link
casper.start(CONSTANTS.PAGES.START, function () {
  this.echo(this.getTitle());
  casper.waitForSelector(CONSTANTS.SELECTORS.START_LINK, function () {
    this.click(CONSTANTS.SELECTORS.START_LINK);
  });
})

// Stop if blocked or click car test button
casper.waitForSelector(CONSTANTS.SELECTORS.BLOCKED_OR_SUCCESSFUL, function () {
  if (this.exists(CONSTANTS.SELECTORS.BLOCKED_IFRAME)) {
    this.die('Blocked :(');
  }
  else {
    this.echo(this.getTitle());
    this.click(CONSTANTS.SELECTORS.CAR_TEST_BUTTON);
  }
});

// Complete details form
casper.waitForSelector(CONSTANTS.SELECTORS.LICENCE_FIELD, function () {
  this.echo(this.getTitle());

  var licenceFieldSelector = CONSTANTS.SELECTORS.LICENCE_FIELD;
  var formData = {};
  formData[licenceFieldSelector] = DATA.LICENCE_NUMBER;
  // Enter licence number
  this.fillSelectors(CONSTANTS.SELECTORS.LICENCE_FORM, formData, false);
  // Select no extended test
  this.click(CONSTANTS.SELECTORS.NO_EXTENDED_TEST);
  // Select no special needs
  this.click(CONSTANTS.SELECTORS.NO_SPECIAL_NEEDS);
  // Submit form
  this.click(CONSTANTS.SELECTORS.LICENCE_SUBMIT);
});

// Complete date and instructor form
casper.waitForSelector(CONSTANTS.SELECTORS.CALENDAR_TOGGLE, function () {
  this.echo(this.getTitle());

  // Select today's date
  this.click(CONSTANTS.SELECTORS.CALENDAR_TOGGLE);
  casper.waitForSelector(CONSTANTS.SELECTORS.CALENDAR_TODAY, function () {
    this.click(CONSTANTS.SELECTORS.CALENDAR_TODAY);
  });
  // Enter instructor's number, if available
  if (DATA.INSTRUCTOR_NUMBER) {
    var instructorFieldSelector = CONSTANTS.SELECTORS.INSTRUCTOR_FIELD;
    var formData = {};
    formData[instructorFieldSelector] = DATA.INSTRUCTOR_NUMBER;
    this.fillSelectors(CONSTANTS.SELECTORS.LICENCE_FORM, formData, false);
  }
  // Submit form
  this.click(CONSTANTS.SELECTORS.LICENCE_SUBMIT);
});

// Complete test center form
casper.waitForSelector(CONSTANTS.SELECTORS.TEST_CENTER_FIELD, function () {
  this.echo(this.getTitle());

  var testCenterSelector = CONSTANTS.SELECTORS.TEST_CENTER_FIELD;
  var formData = {};
  formData[testCenterSelector] = DATA.TEST_CENTER_NAME;
  // Enter test center name
  this.fillSelectors(CONSTANTS.SELECTORS.TEST_CENTER_FIELD, formData, false);
  // Submit form
  this.click(CONSTANTS.SELECTORS.TEST_CENTER_SUBMIT);
  // Click test center link
  casper.waitForSelector(CONSTANTS.SELECTORS.TEST_CENTER_LINK, function () {
    this.click(CONSTANTS.SELECTORS.TEST_CENTER_LINK);
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
