// simple check to see if we can require the commonJS script
const requireTest = require('../npm_dist/cjs/index.js');
requireTest.tzlib_get_ical_block("Europe/Berlin");
