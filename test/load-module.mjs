// simple check to see if we can import the ES Module
import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from '../dist/mjs/index.js';

const testCases = process.argv[2] ? JSON.parse(process.argv[2]) : ['Europe/Berlin'];
const availableTimezones = tzlib_get_timezones();
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
let counter = 1;

console.log('\n❶  Running Tests in ES Module import environment:\n');
testCases.forEach((tz) => {
  console.log(`   ${counter}/${testCases.length} Testing time zone: ${tz}, ES Module import`);
  try {
    const block = tzlib_get_ical_block(tz);
    if (!block || block === '') {
      throw new Error(`🔴 iCal block invalid`);
    }

    const offset = tzlib_get_offset(tz, dayAfterTomorrow.toISOString().split('T')[0], '15:45');
    if (!offset || offset === '') {
      throw new Error(`🔴 Offset is invalid`);
    }

    if (!availableTimezones.includes(tz)) {
      throw new Error(`🔴 Time zone missing in time zones list`);
    }

    console.log(`🟢 Time zone ${tz} passed all tests\n`);
  } catch (e) {
    console.log(e.message + '\n');
    console.error(e.message + '\n');
  }
  counter += 1;
});
