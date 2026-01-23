import tzDbData from './db/zonesdb.json';
import { ZonesDb, ZoneMap, ZoneEntry } from './types';

const tzDb: ZonesDb = tzDbData as unknown as ZonesDb;

// helper function to escape special regex characters
export function escapeRegExp(string: string): string {
  return string.replace(/[^+\-\w]/g, '\\$&');
}

// static mapping of shorteners to actual ical data parts
const shortenerMap: Record<string, string> = {
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

// function to enrich previously shortened ical data parts
function enrich_details(string: string): string {
  for (const [key, value] of Object.entries(shortenerMap)) {
    string = string.replaceAll(value, key);
  }
  return string;
}

// function to map back ical location (TZID and X-LIC-LOCATION) database data
function map_db_data(dbData: ZonesDb): ZoneMap {
  const raw = dbData.db;
  const topLevelZones = dbData.toplevel;
  // for every entry of raw, map the first element back to the actual location name (got mapped to index in the db-generator)
  // {"Zulu":["0/UTC",0],"WET":["1/Lisbon",1],"W-SU":["1/Moscow",2]} would become something like {"Zulu":["Etc/UTC",0],"WET":["Europe/Lisbon",1],"W-SU":["Europe/Moscow",2]}
  const expandLocation = (location: string, fallbackPath: string): string => {
    if (location === '') {
      return fallbackPath;
    }
    const match = location.match(/^(\d+)\/(.+)$/);
    if (match) {
      const zoneIndex = Number(match[1]);
      const zonePrefix = topLevelZones.find((_, index) => index === zoneIndex);
      if (zonePrefix != null) {
        return `${zonePrefix}/${match[2]}`;
      }
    }
    return location;
  };
  const mappedData: ZoneMap = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      mappedData[`${key}`] = {};
      const subLevel1 = value as ZoneMap;
      for (const [key2, value2] of Object.entries(subLevel1)) {
        if (typeof value2 === 'object' && !Array.isArray(value2)) {
          (mappedData[`${key}`] as ZoneMap)[`${key2}`] = {};
          const subLevel2 = value2 as ZoneMap;
          for (const [key3, value3] of Object.entries(subLevel2)) {
            const entry = value3 as ZoneEntry;
            const fallbackPath = `${key}/${key2}/${key3}`;
            ((mappedData[`${key}`] as ZoneMap)[`${key2}`] as ZoneMap)[`${key3}`] = [
              expandLocation(entry[0], fallbackPath),
              entry[1],
            ];
          }
        } else {
          const entry = value2 as ZoneEntry;
          const fallbackPath = `${key}/${key2}`;
          (mappedData[`${key}`] as ZoneMap)[`${key2}`] = [expandLocation(entry[0], fallbackPath), entry[1]];
        }
      }
    } else {
      const entry = value as ZoneEntry;
      mappedData[`${key}`] = [expandLocation(entry[0], key), entry[1]];
    }
  }
  return mappedData;
}

// function to get the time zone content from the internal database
export function get_tz_content(tzName: string): string[] | string {
  const tzDbZones = map_db_data(tzDb);
  // get time zone parts
  const nameParts = tzName.split('/');
  let dbData: ZoneEntry | ZoneMap | undefined;

  // validate time zone
  try {
    if (nameParts.length === 3) {
      const l1 = tzDbZones[`${nameParts[0]}`];
      if (l1 && !Array.isArray(l1)) {
        const l2 = (l1 as ZoneMap)[`${nameParts[1]}`];
        if (l2 && !Array.isArray(l2)) {
          dbData = (l2 as ZoneMap)[`${nameParts[2]}`];
        }
      }
    } else if (nameParts.length === 2) {
      const l1 = tzDbZones[`${nameParts[0]}`];
      if (l1 && !Array.isArray(l1)) {
        dbData = (l1 as ZoneMap)[`${nameParts[1]}`];
      }
    } else {
      dbData = tzDbZones[`${nameParts[0]}`];
    }

    // Check if dbData is a valid entry (array with length >= 2)
    if (dbData == null || !Array.isArray(dbData) || dbData.length < 2) {
      throw new Error('Given time zone not valid.');
    }

    // Cast to ZoneEntry since we verified it is an array
    const entry = dbData as ZoneEntry;

    // create the output
    return [entry[0], enrich_details(tzDb.details[entry[1]])];
  } catch {
    console.error('Given time zone not valid.');
    return '';
  }
}
