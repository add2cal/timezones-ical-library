/*!
 *  @preserve
 *
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar Time Zones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Creator: Jens Kuerschner (https://jekuer.com)
 * Project: https://github.com/add2cal/timezones-ical-library
 * Version:
 * License: Apache-2.0
 *
 */

import tzDbData from './db/zonesdb.json';
import { get_tz_content, escapeRegExp } from './utils';
import { get_offset } from './offset';
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
  const output = ['BEGIN:VTIMEZONE\r\nTZID:' + location + '\r\nX-LIC-LOCATION:' + location + '\r\nLAST-MODIFIED:' + blockArray[1].replace(/[^\w\-:,;=+/<>]/g, '').replace(/<br>/g, '\r\n') + 'END:VTIMEZONE', tzidLine];
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

  return get_offset(tzName, tzBlock[0], tzBlock[1], isoDate, isoTime);
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
              const location = entry[0].replace(new RegExp(`^${escapeRegExp(key)}/${escapeRegExp(key2)}/`), `${tzDb.toplevel.indexOf(key)}/${key2}/`);
              ((mappedData[`${key}`] as ZoneMap)[`${key2}`] as ZoneMap)[`${key3}`] = [location, entry[1]];
            }
          } else {
            const entry = value2 as ZoneEntry;
            const location = entry[0].replace(new RegExp(`^${escapeRegExp(key)}/`), `${tzDb.toplevel.indexOf(key)}/`);
            (mappedData[`${key}`] as ZoneMap)[`${key2}`] = [location, entry[1]];
          }
        }
      } else {
        const entry = value as ZoneEntry;
        const location = entry[0].replace(new RegExp(`^${escapeRegExp(key)}/`), `${tzDb.toplevel.indexOf(key)}/`);
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
