exports.BROWSING_DATA = {
  USER_AGENTS: [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko'
  ],
  SERVER_PORT: '8080',
  START_PAGE: 'https://www.gov.uk/book-driving-test'
};

exports.SELECTORS = {
  // Initial page, test for next step or blocked
  START_LINK: '#get-started a',
  // All steps
  LICENCE_FORM: '#main header ~ section form',
  LICENCE_SUBMIT: '#driving-licence-submit',
  UNAVAILABLE_NOTICE: '#unavailability-notice-title',
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
