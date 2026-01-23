/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar Time Zones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Creator: Jens Kuerschner (https://jekuer.com)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 * DO NOT REMOVE THE COPYRIGHT NOTICE ABOVE!
 *
 */

const fs = require('fs');
const glob = require('glob');

// helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[^+\-\w]/g, '\\$&');
}

const files = glob.sync('../src/vzic/output/**/*.ics');
let tz = {};
let topLevelZones = [];

const shortenerMap = {
  '<br>': '<n>',
  'TZNAME:': '<tz>',
  'TZOFFSETFROM:': '<of>',
  'TZOFFSETTO:': '<ot>',
  'DTSTART:': '<s>',
  'RRULE:': '<r>',
  'BEGIN:DAYLIGHT': '<bd>',
  'END:DAYLIGHT': '<ed>',
  'BEGIN:STANDARD': '<bs>',
  'END:STANDARD': '<es>',
};

// pull data from files
for (const zone of files) {
  const name = zone.replace('../src/vzic/output/', '').replace('vzic/output/', '').replace('.ics', '');
  // collect top-level zones
  const nameParts = name.split('/');
  topLevelZones.push(nameParts[0]);
  // keep only unique entries
  topLevelZones = [...new Set(topLevelZones)];
  // cleaning up the entry by stripping out general stuff, any empty line, replacing linebreaks with <br>, removing the file extension and path information (from symlink entries)
  // for all occurences (TZID: and X-LIC-LOCATION:) of the name, we also replace the first part with its index in topLevelZones to reduce size (like Europe/Berlin becomes 9/Berlin)
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  tz[`${name}`] = fs
    .readFileSync(`../src/vzic/output/${name}.ics`, 'utf-8')
    .replace(/(END|BEGIN):VTIMEZONE/g, '')
    .replace(/\r\n$/, '')
    .replace(/\r\n/g, '<br>')
    .replace(/.ics$/, '')
    .replace(/^[(.)*/]*/g, '')
    .replace(
      new RegExp(`^TZID:${escapeRegExp(nameParts[0])}/`, 'gm'),
      `TZID:${topLevelZones.indexOf(nameParts[0])}/`,
    )
    .replace(
      new RegExp(`^X-LIC-LOCATION:${escapeRegExp(nameParts[0])}/`, 'gm'),
      `X-LIC-LOCATION:${topLevelZones.indexOf(nameParts[0])}/`,
    );
}

// clean up symlinks by copying the linked data for use in the entry item
// (we could also adjust the Makefile to generate ics files with the TZID-ALIAS-OF - however, since this is can conflict with calendars that do not support this, we create symlinks first, derive full content copies here, and then remove the symlinks again at the end of the process)
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
// sort by index alphabetically to ensure consistent order
const sortedTzKeys = Object.keys(tz).sort((a, b) => a.localeCompare(b));
tzSorted = {};
for (const key of sortedTzKeys) {
  tzSorted[`${key}`] = tz[`${key}`];
}
tz = tzSorted;
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
  const location = contentParts[0].replace('<br>TZID:', '').split('<br>')[0];
  if (location == index) {
    newEntry.push('');
  } else {
    newEntry.push(
      location.replace(
        new RegExp(`^${escapeRegExp(nameParts[0])}/`, 'gm'),
        `${topLevelZones.indexOf(nameParts[0])}/`,
      ),
    );
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

// write output file (aka the local database, which holds the different zones and data in a compact way)
// consists of a three-level object (Continent -> Country/Region -> City), each holding an array with [0] = location (or empty string, if same as timezone name), [1] = index to secondary database with the actual ical data
// also the actual ical data in a compacted way
// and a top-level mapping of all top-level zones
const tzLibDBFile = '../src/db/zonesdb.json';
fs.writeFileSync(
  tzLibDBFile,
  JSON.stringify({
    db: tzFinal,
    details: tzNamesSecDb,
    toplevel: topLevelZones,
  }),
  {
    flag: 'a',
  },
);

// write overview JSON file for API
const tzlibAPIOverviewFile = '../src/db/zones.json';
const apiOutputJSON = JSON.stringify(overviewJson, null, 2);
fs.writeFileSync(tzlibAPIOverviewFile, apiOutputJSON, {
  flag: 'a',
});
