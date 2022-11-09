// simple check to see if we can require the commonJS script
const requireTest = require('../dist/cjs/index.js');
requireTest.tzlib_get_ical_block('Europe/Berlin');
requireTest.tzlib_get_offset('Europe/Berlin', '2023-04-15', '15:45');
requireTest.tzlib_get_timezones();
