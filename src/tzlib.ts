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
import { get_tz_content, escapeRegExp } from './utils';
import { ZonesDb, ZoneMap, ZoneEntry } from './types';

const tzDb: ZonesDb = tzDbData as unknown as ZonesDb;

export type JsonString<_T = unknown> = string;

// LOADING THE RIGHT CODE BLOCK
export function tzlib_get_ical_block(tzName: string): string[] | string;
export function tzlib_get_ical_block(tzName: string, jsonType: false): string[] | string;
export function tzlib_get_ical_block(tzName: string, jsonType: true): JsonString<[string, string]>;
export function tzlib_get_ical_block(tzName: string, jsonType: boolean = false): string[] | string {
  const tzBlock = get_tz_content(tzName);
  // get_tz_content returns string[] | string (empty string on error)
  // Check if it returned an array and has the second element
  if (typeof tzBlock === 'string' || !tzBlock[1] || tzBlock[1] === '') {
    return '';
  }

  // tzBlock is string[] here
  const blockArray = tzBlock as string[];

  // create the output
  const location = (function () {
    if (blockArray[0] == '') {
      return tzName;
    } else {
      return blockArray[0];
    }
  })();
  const tzidLine = 'TZID=' + location;
  const output = [
    'BEGIN:VTIMEZONE\r\nTZID:' +
      location +
      '\r\nX-LIC-LOCATION:' +
      location +
      '\r\nLAST-MODIFIED:' +
      blockArray[1].replace(/[^\w\-:,;=+/<>]/g, '').replace(/<br>/g, '\r\n') +
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
export function tzlib_get_offset(tzName: string, isoDate: string, isoTime: string): string {
  const tzBlock = get_tz_content(tzName);
  if (typeof tzBlock === 'string' || tzBlock[1] == null || tzBlock[1] == '') {
    return '';
  }

  const blockArray = tzBlock as string[];

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
  if (!blockArray[1].match(/BEGIN:DAYLIGHT/i)) {
    const match = blockArray[1].match(/TZOFFSETTO:([+|-]\d{4})/i);
    return match ? match[1] : '';
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
  const timezoneData = blockArray[1].replace(/[^\w\-:,;=+/<>]/g, '').split('<br>');

  interface Breakpoint {
    offset?: string;
    hour?: number;
    month?: number;
    day?: string;
  }

  // collect time zone breakpoints (exactly 2)
  const tzBreakpoints: Record<string, Breakpoint> = { 1: {}, 2: {} };
  let breakpointCount = 0;
  for (let i = 0; i < timezoneData.length; i++) {
    const line = timezoneData[i]; // eslint-disable-line security/detect-object-injection
    // always first and therefore drives the counter
    if (line.startsWith('TZOFFSETTO')) {
      breakpointCount++;
      if (tzBreakpoints[`${breakpointCount}`]) {
        tzBreakpoints[`${breakpointCount}`].offset = line.split(':')[1];
      }
    }
    // only required for the critical hour
    if (line.startsWith('DTSTART')) {
      if (tzBreakpoints[`${breakpointCount}`]) {
        tzBreakpoints[`${breakpointCount}`].hour = parseInt(line.substr(17, 2));
      }
    }
    // the RRULE is deciding when the switch happens (excluding the hour information from DTSTART)
    if (line.startsWith('RRULE')) {
      const rruleParts = line.split(';');
      const rruleMonthPart = rruleParts[1].split('=')[1];
      const rruleMonth = parseInt(rruleMonthPart);
      if (tzBreakpoints[`${breakpointCount}`]) {
        tzBreakpoints[`${breakpointCount}`].month = rruleMonth;
        tzBreakpoints[`${breakpointCount}`].day = rruleParts[2].split('=')[1];
      }
    }
  }
  // swap objects, if larger one comes first
  if (
    tzBreakpoints['1'].month !== undefined &&
    tzBreakpoints['2'].month !== undefined &&
    tzBreakpoints['1'].month > tzBreakpoints['2'].month
  ) {
    [tzBreakpoints['1'], tzBreakpoints['2']] = [tzBreakpoints['2'], tzBreakpoints['1']];
  }

  const bp1 = tzBreakpoints['1'];
  const bp2 = tzBreakpoints['2'];

  if (
    bp1.month === undefined ||
    bp2.month === undefined ||
    bp1.offset === undefined ||
    bp2.offset === undefined
  ) {
    // Should not happen if data is correct
    return '';
  }

  // check for easy cases where the month is cleary in between
  if (dateMonth != bp1.month && dateMonth != bp2.month) {
    if (dateMonth < bp1.month || dateMonth > bp2.month) {
      return bp2.offset;
    } else {
      return bp1.offset;
    }
  }
  // in other cases, validate where we are exactly and pick the right offset
  // defining the critical case, we need to evaluate (the breakpoint we are matching by month)
  const theCase = (function () {
    return Object.keys(tzBreakpoints).find((key) => tzBreakpoints[`${key}`].month == dateMonth);
  })();

  if (!theCase) return bp2.offset; // Fallback

  const currentBp = tzBreakpoints[`${theCase}`];

  // determining the actual day
  const helperArrayWeekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const numberDays = new Date(dateYear, dateMonth, 0).getDate();
  let weekdayCount = new Date(dateYear, dateMonth - 1, 1).getDay();
  const weekdays: Record<string, Record<string, number>> = {
    SU: {},
    MO: {},
    TU: {},
    WE: {},
    TH: {},
    FR: {},
    SA: {},
  };
  for (let d = 1; d <= numberDays; d++) {
    const wcIndex = helperArrayWeekdays[weekdayCount]; // eslint-disable-line security/detect-object-injection
    const occurence = Object.keys(weekdays[`${wcIndex}`]).length + 1;
    weekdays[`${wcIndex}`][`${occurence}`] = d;
    weekdayCount++;
    if (weekdayCount == 7) {
      weekdayCount = 0;
    }
  }

  const actualDay = (function () {
    if (!currentBp.day) return 0;
    if (currentBp.day[0] == '-') {
      const breakpointWeekday = currentBp.day.substr(2, 2);
      const dayIndex = Object.keys(weekdays[`${breakpointWeekday}`]).length + 1 - parseInt(currentBp.day[1]);
      return weekdays[`${breakpointWeekday}`][`${dayIndex}`];
    } else {
      const breakpointWeekday = currentBp.day.substr(1, 2);
      return weekdays[`${breakpointWeekday}`][currentBp.day[0]];
    }
  })();

  // finally identifying the right offset
  if (dateDay > actualDay || (dateDay == actualDay && dateHour >= (currentBp.hour || 0))) {
    return currentBp.offset || '';
  }

  const fallbackCase = (function () {
    if (theCase == '1') {
      return '2';
    } else {
      return '1';
    }
  })();
  return tzBreakpoints[`${fallbackCase}`].offset || '';
}

// PROVIDE ALL TIME ZONES
export function tzlib_get_timezones(jsonType?: boolean): string[] | string;
export function tzlib_get_timezones(jsonType: false): string[] | string;
export function tzlib_get_timezones(jsonType: true): JsonString<string[]>;
export function tzlib_get_timezones(jsonType: boolean = false): string[] | string {
  // parse zone names from tzDb.db object where we join levels with '/' to get the full names
  const zoneNames: string[] = [];

  const map_db_data = (raw: ZoneMap): ZoneMap => {
    const mappedData: ZoneMap = {};
    for (const [key, value] of Object.entries(raw)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        mappedData[`${key}`] = {};
        const subValue = value as ZoneMap;
        for (const [key2, value2] of Object.entries(subValue)) {
          if (typeof value2 === 'object' && !Array.isArray(value2)) {
            (mappedData[`${key}`] as ZoneMap)[`${key2}`] = {};
            const subValue2 = value2 as ZoneMap;
            for (const [key3, value3] of Object.entries(subValue2)) {
              const entry = value3 as ZoneEntry;
              const location = entry[0].replace(
                new RegExp(`^${escapeRegExp(key)}/${escapeRegExp(key2)}/`),
                `${tzDb.toplevel.indexOf(key)}/${key2}/`,
              );
              ((mappedData[`${key}`] as ZoneMap)[`${key2}`] as ZoneMap)[`${key3}`] = [location, entry[1]];
            }
          } else {
            const entry = value2 as ZoneEntry;
            const location = entry[0].replace(
              new RegExp(`^${escapeRegExp(key)}/`),
              `${tzDb.toplevel.indexOf(key)}/`,
            );
            (mappedData[`${key}`] as ZoneMap)[`${key2}`] = [location, entry[1]];
          }
        }
      } else {
        const entry = value as ZoneEntry;
        const location = entry[0].replace(
          new RegExp(`^${escapeRegExp(key)}/`),
          `${tzDb.toplevel.indexOf(key)}/`,
        );
        mappedData[`${key}`] = [location, entry[1]];
      }
    }
    return mappedData;
  };

  const tzDbZones = map_db_data(tzDb.db);

  // recursive function to traverse the db object
  const traverse_db = (obj: ZoneMap, path: string = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        traverse_db(value as ZoneMap, path + key + '/');
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
