// simple check to see if we can require the commonJS script
const requireTest = require('../dist/cjs/index.js');

const testCases = process.argv[2] ? JSON.parse(process.argv[2]) : ['Europe/Berlin'];
const availableTimezones = requireTest.tzlib_get_timezones();
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
let counter = 1;

console.log('\n❷  Running Tests in CommonJS require environment:\n');
testCases.forEach((tz) => {
  console.log(`   ${counter}/${testCases.length} Testing time zone: ${tz}, CommonJS require`);
  try {
    const block = requireTest.tzlib_get_ical_block(tz);
    if (!block || block === '') {
      throw new Error(`🔴 iCal block invalid`);
    }

    const offset = requireTest.tzlib_get_offset(tz, dayAfterTomorrow.toISOString().split('T')[0], '15:45');
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
