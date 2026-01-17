/*!
 *  @preserve
 *
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar Time Zones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Creator: Jens Kuerschner (https://jekuer.com)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */

import tzDbData from './db/zonesdb.json';
import { get_tz_content, escapeRegExp } from './utils.js';

const tzDb = tzDbData;

// LOADING THE RIGHT CODE BLOCK
export function tzlib_get_ical_block(tzName, jsonType = false) {
  const tzBlock = get_tz_content(tzName);
  if (!tzBlock[1] || tzBlock[1] === '') {
    return '';
  }
  // create the output
  const location = (function () {
    if (tzBlock[0] == '') {
      return tzName;
    } else {
      return tzBlock[0];
    }
  })();
  const tzidLine = 'TZID=' + location;
  const output = [
    'BEGIN:VTIMEZONE\r\nTZID:' +
      location +
      '\r\nX-LIC-LOCATION:' +
      location +
      '\r\nLAST-MODIFIED:' +
      tzBlock[1].replace(/[^\w\-:,;=+/<>]/g, '').replace(/<br>/g, '\r\n') +
      'END:VTIMEZONE',
    tzidLine,
  ];
  // return
  if (jsonType) {
    return JSON.stringify(output);
  }
  return output;
}

// PROVIDING THE OFFSET BASED ON A GIVEN DATE AND TIME (YYYY-MM-DD and hh:mm as per ISO-8601).
export function tzlib_get_offset(tzName, isoDate, isoTime) {
  const tzBlock = get_tz_content(tzName);
  if (tzBlock[1] == null || tzBlock[1] == '') {
    return '';
  }
  // validate date
  if (!isoDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    console.error('offset calculation failed: date misspelled [-> YYYY-MM-DD]');
    return '';
  }
  // validate time
  if (!isoTime.match(/^\d{2}:\d{2}$/)) {
    console.error('offset calculation failed: time misspelled [-> hh:mm]');
    return '';
  }
  // return early if there are no daylight changes
  if (!tzBlock[1].match(/BEGIN:DAYLIGHT/i)) {
    return tzBlock[1].match(/TZOFFSETTO:([+|-]\d{4})/i)[1];
  }
  // otherwise, calculate offset
  // creating a JS date from the input
  const dateString = isoDate + 'T' + isoTime + ':00';
  const date = new Date(dateString);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDay = date.getDate();
  const dateHour = date.getHours();
  // preparing the tz data
  const timezoneData = tzBlock[1].replace(/[^\w\-:,;=+/<>]/g, '').split('<br>');
  // collect time zone breakpoints (exactly 2)
  const tzBreakpoints = { 1: {}, 2: {} };
  let breakpointCount = 0;
  for (let i = 0; i < timezoneData.length; i++) {
    // always first and therefore drives the counter
    if (timezoneData[`${i}`].startsWith('TZOFFSETTO')) {
      breakpointCount++;
      tzBreakpoints[`${breakpointCount}`].offset = timezoneData[`${i}`].split(':')[1];
    }
    // only required for the critical hour
    if (timezoneData[`${i}`].startsWith('DTSTART')) {
      tzBreakpoints[`${breakpointCount}`].hour = parseInt(timezoneData[`${i}`].substr(17, 2));
    }
    // the RRULE is deciding when the switch happens (excluding the hour information from DTSTART)
    if (timezoneData[`${i}`].startsWith('RRULE')) {
      let rruleParts = timezoneData[`${i}`].split(';');
      let rruleMonth = parseInt(rruleParts[1].split('=')[1]);
      tzBreakpoints[`${breakpointCount}`].month = parseInt(rruleMonth);
      tzBreakpoints[`${breakpointCount}`].day = rruleParts[2].split('=')[1];
    }
  }
  // swap objects, if larger one comes first
  if (tzBreakpoints[1].month > tzBreakpoints[2].month) {
    [tzBreakpoints[1], tzBreakpoints[2]] = [tzBreakpoints[2], tzBreakpoints[1]];
  }
  // check for easy cases where the month is cleary in between
  if (dateMonth != tzBreakpoints[1].month && dateMonth != tzBreakpoints[2].month) {
    if (dateMonth < tzBreakpoints[1].month || dateMonth > tzBreakpoints[2].month) {
      return tzBreakpoints[2].offset;
    } else {
      return tzBreakpoints[1].offset;
    }
  }
  // in other cases, validate where we are exactly and pick the right offset
  // defining the critical case, we need to evaluate (the breakpoint we are matching by month)
  const theCase = (function () {
    return Object.keys(tzBreakpoints).find((key) => tzBreakpoints[`${key}`].month == dateMonth);
  })();
  // determining the actual day
  const helperArrayWeekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const numberDays = new Date(dateYear, dateMonth, 0).getDate();
  let weekdayCount = new Date(dateYear, dateMonth - 1, 1).getDay();
  const weekdays = { SU: {}, MO: {}, TU: {}, WE: {}, TH: {}, FR: {}, SA: {} };
  for (let d = 1; d <= numberDays; d++) {
    const occurence = Object.keys(weekdays[helperArrayWeekdays[`${weekdayCount}`]]).length + 1;
    weekdays[helperArrayWeekdays[`${weekdayCount}`]][`${occurence}`] = d;
    weekdayCount++;
    if (weekdayCount == 7) {
      weekdayCount = 0;
    }
  }
  const actualDay = (function () {
    if (tzBreakpoints[`${theCase}`].day[0] == '-') {
      const breakpointWeekday = tzBreakpoints[`${theCase}`].day.substr(2, 2);
      const dayIndex =
        Object.keys(weekdays[`${breakpointWeekday}`]).length +
        1 -
        parseInt(tzBreakpoints[`${theCase}`].day[1]);
      return weekdays[`${breakpointWeekday}`][`${dayIndex}`];
    } else {
      const breakpointWeekday = tzBreakpoints[`${theCase}`].day.substr(1, 2);
      return weekdays[`${breakpointWeekday}`][tzBreakpoints[`${theCase}`].day[0]];
    }
  })();
  // finally identifying the right offset
  if (dateDay > actualDay || (dateDay == actualDay && dateHour >= tzBreakpoints[`${theCase}`].hour)) {
    return tzBreakpoints[`${theCase}`].offset;
  }
  const fallbackCase = (function () {
    if (theCase == 1) {
      return 2;
    } else {
      return 1;
    }
  })();
  return tzBreakpoints[`${fallbackCase}`].offset;
}

// PROVIDE ALL TIME ZONES
export function tzlib_get_timezones(jsonType = false) {
  // parse zone names from tzDb.db object where we join levels with '/' to get the full names
  const zoneNames = [];
  const map_db_data = (raw) => {
    const mappedData = {};
    for (const [key, value] of Object.entries(raw)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        mappedData[`${key}`] = {};
        for (const [key2, value2] of Object.entries(value)) {
          if (typeof value2 === 'object' && !Array.isArray(value2)) {
            mappedData[`${key}`][`${key2}`] = {};
            for (const [key3, value3] of Object.entries(value2)) {
              const location = value3[0].replace(
                new RegExp(`^${escapeRegExp(key)}/${escapeRegExp(key2)}/`),
                `${tzDb.toplevel.indexOf(key)}/${key2}/`,
              );
              mappedData[`${key}`][`${key2}`][`${key3}`] = [location, value3[1]];
            }
          } else {
            const location = value2[0].replace(
              new RegExp(`^${escapeRegExp(key)}/`),
              `${tzDb.toplevel.indexOf(key)}/`,
            );
            mappedData[`${key}`][`${key2}`] = [location, value2[1]];
          }
        }
      } else {
        const location = value[0].replace(
          new RegExp(`^${escapeRegExp(key)}/`),
          `${tzDb.toplevel.indexOf(key)}/`,
        );
        mappedData[`${key}`] = [location, value[1]];
      }
    }
    return mappedData;
  };
  const tzDbZones = map_db_data(tzDb.db);
  // recursive function to traverse the db object
  const traverse_db = (obj, path = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        traverse_db(value, path + key + '/');
      } else {
        zoneNames.push(path + key);
      }
    }
  };
  traverse_db(tzDbZones);
  // return
  if (jsonType) {
    return JSON.stringify(zoneNames);
  }
  return zoneNames;
}
