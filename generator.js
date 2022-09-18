/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Version: 1.2.1
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./zoneinfo/**/*.ics');
const tz = {};

// pull data from files
for (const zone of files) {
  const name = zone.replace('./zoneinfo/', '').replace('.ics', '');
  // cleaning up the entry by stripping out any last empty line, replacing linebreaks with <br>, removing the file extension and path information (from symlink entries)
  tz[name] = fs.readFileSync(`./zoneinfo/${name}.ics`, 'utf-8').replace(/\r\n$/, '').replace(/\r\n/g, '<br>').replace(/.ics$/, '').replace(/^[(\.)*\/]*/g, '');
}

// clean up symlinks
for (const index in tz) {
  const content = tz[index];
  if (content in tz) {
    tz[index] = tz[content];
  }
}

// build up secondary database and clean up main one
const tznames = [];
const tzFinalArr = [];
const tzFinal = {};
for (const index in tz) {
  const content = tz[index];
  const cutPos = content.indexOf("<br>LAST-MODIFIED");
  const dbPart = content.slice(cutPos);
  if (!tznames.includes(dbPart)) {
    tznames.push(dbPart);
  }
  const dbIndex = tznames.indexOf(dbPart);
  const nameParts = index.split('/');
  // TODO: the next part could be smarter, maybe bringing in some reduce function
  const newEntry = [];
  newEntry.push(content.slice(0, cutPos).replace("TZID:/timezones-ical-library/", ''));
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
const tzlibDBFile = './src/zonesdb.js';
const outputJSON = JSON.stringify(tzFinal, null, 2);
const outputJSONDetails = JSON.stringify(tznames, null, 2);
fs.writeFileSync(tzlibDBFile, 'const tzlibZonesDB = ' + outputJSON + ';\n');
fs.writeFileSync(tzlibDBFile, '\nconst tzlibZonesDetailsDB = ' + outputJSONDetails + ';\n', {flag: 'a'});