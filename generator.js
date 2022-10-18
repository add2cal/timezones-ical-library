/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Version: 1.4.1
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 * DO NOT REMOVE THE COPYRIGHT NOTICE ABOVE!
 *
 */

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./api/**/*.ics');
const tz = {};

// pull data from files
for (const zone of files) {
  const name = zone.replace('./api/', '').replace('.ics', '');
  // cleaning up the entry by stripping out general stuff, any empty line, replacing linebreaks with <br>, removing the file extension and path information (from symlink entries)
  tz[`${name}`] = fs
    .readFileSync(`./api/${name}.ics`, 'utf-8')
    .replace(/(END|BEGIN):VTIMEZONE/g, '')
    .replace(/\r\n$/, '')
    .replace(/\r\n/g, '<br>')
    .replace(/.ics$/, '')
    .replace(/^[(.)*/]*/g, '');
}

// clean up symlinks (we could also adjust the Makefile to generate ics files with the TZID-ALIAS-OF - however, since this is can conflict with calendars, we create symlinks first, and remove them here completely)
for (const index in tz) {
  const content = tz[`${index}`];
  if (content in tz) {
    tz[`${index}`] = tz[`${content}`];
  }
}

// build up secondary database, create timezone name overview JSON, and clean up main one
const overviewJson = [];
const tzNamesSecDb = [];
const tzFinal = {};
const shortenerMap = {
  "<br>":"<n>",
  "TZNAME:":"<tz>",
  "TZOFFSETFROM:":"<of>",
  "TZOFFSETTO:":"<ot>",
  "DTSTART:":"<s>",
  "RRULE:":"<r>",
  "BEGIN:DAYLIGHT":"<bd>",
  "END:DAYLIGHT":"<ed>",
  "BEGIN:STANDARD":"<bs>",
  "END:STANDARD":"<es>"
}
for (const index in tz) {
  overviewJson.push(index);
  const contentParts = tz[`${index}`].split('<br>LAST-MODIFIED:');
  // reduce contentParts[1] to a shortened version
  for (const [key, value] of Object.entries(shortenerMap)) {
    contentParts[1] = contentParts[1].replaceAll(key, value);
  }
  if (!tzNamesSecDb.includes(contentParts[1])) {
    tzNamesSecDb.push(contentParts[1]);
  }
  const dbIndex = tzNamesSecDb.indexOf(contentParts[1]);
  const nameParts = index.split('/');
  const newEntry = [];
  const location = contentParts[0].replace('<br>TZID:/timezones-ical-library/', '').split('<br>')[0];
  if (location == index) {
    newEntry.push('');
  } else {
    newEntry.push(location);
  }
  newEntry.push(dbIndex);
  if (nameParts.length === 3) {
    if (!tzFinal[nameParts[0]]) tzFinal[nameParts[0]] = {};
    if (!tzFinal[nameParts[0]][nameParts[1]]) tzFinal[nameParts[0]][nameParts[1]] = {};
    tzFinal[nameParts[0]][nameParts[1]][nameParts[2]] = newEntry;
  } else if (nameParts.length === 2) {
    if (!tzFinal[nameParts[0]]) tzFinal[nameParts[0]] = {};
    tzFinal[nameParts[0]][nameParts[1]] = newEntry;
  } else {
    tzFinal[nameParts[0]] = newEntry;
  }
}

// write output file (aka the local database)
const tzLibDBFile = './src/zonesdb.js';
const tzLibOutputJSON = JSON.stringify(tzFinal);
const tzLibOutputJSONDetails = JSON.stringify(tzNamesSecDb);
fs.writeFileSync(tzLibDBFile, 'const tzlibZonesDB = ' + tzLibOutputJSON + ';\n');
fs.writeFileSync(tzLibDBFile, '\nconst tzlibZonesDetailsDB = ' + tzLibOutputJSONDetails + ';\n', {
  flag: 'a',
});

// write overview JSON file for API
const tzlibAPIOverviewFile = './api/zones.json';
const apiOutputJSON = JSON.stringify(overviewJson, null, 2);
fs.writeFileSync(tzlibAPIOverviewFile, apiOutputJSON);
