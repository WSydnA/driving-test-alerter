exports.PAGES = {
  // Initial URL
  START: 'https://www.gov.uk/book-driving-test'
};

exports.SELECTORS = {
  // Initial page, test for next step or blocked
  START_LINK: '#get-started a',
  BLOCKED_OR_SUCCESSFUL: 'iframe[src*="_Incapsula_Resource"], #test-type-car',
  BLOCKED_IFRAME: 'iframe[src*="_Incapsula_Resource"]',
  // All steps
  LICENCE_FORM: '#main header ~ section form',
  LICENCE_SUBMIT: '#driving-licence-submit',
  // First step
  CAR_TEST_BUTTON: '#test-type-car',
  LICENCE_FIELD: '#driving-licence',
  NO_EXTENDED_TEST: '#extended-test-no',
  NO_SPECIAL_NEEDS: '#special-needs-none',
  // Second step
  CALENDAR_TOGGLE: '#test-choice-calendar-button',
  CALENDAR_TODAY: 'ui-datepicker-today a',
  INSTRUCTOR_FIELD: '#instructor-prn',
  // Third step
  TEST_CENTER_FIELD: '#test-centres-input',
  TEST_CENTER_SUBMIT: '#test-centres-submit',
  TEST_CENTER_LINK: '.test-centre-details-link',
  // Fourth step
  FIRST_BOOKABLE_DATE: '.BookingCalendar-date--bookable a',
  BOOKABLE_TIMES: '.SlotPicker-day[id] .SlotPicker-time'
};
