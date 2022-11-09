// simple check to see if we can import the ES Module
import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from '../dist/mjs/index.js';
tzlib_get_ical_block('Europe/Berlin');
tzlib_get_offset('Europe/Berlin', '2023-04-15', '15:45');
tzlib_get_timezones();
