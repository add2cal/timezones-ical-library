import tzDbData from './db/zonesdb.json';

const tzDb = tzDbData;

// helper function to escape special regex characters
export function escapeRegExp(string) {
  return string.replace(/[^+\-\w]/g, '\\$&');
}

// static mapping of shorteners to actual ical data parts
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

// function to enrich previously shortened ical data parts
function enrich_details(string) {
  for (const [key, value] of Object.entries(shortenerMap)) {
    string = string.replaceAll(value, key);
  }
  return string;
}

// function to map back ical location (TZID and X-LIC-LOCATION) database data
function map_db_data(dbData) {
  const raw = dbData.db;
  const topLevelZones = dbData.toplevel;
  // for every entry of raw, map the first element back to the actual location name (got mapped to index in the db-generator)
  // {"Zulu":["0/UTC",0],"WET":["1/Lisbon",1],"W-SU":["1/Moscow",2]} would become something like {"Zulu":["Etc/UTC",0],"WET":["Europe/Lisbon",1],"W-SU":["Europe/Moscow",2]}
  const expandLocation = (location, fallbackPath) => {
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
  const mappedData = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      mappedData[`${key}`] = {};
      for (const [key2, value2] of Object.entries(value)) {
        if (typeof value2 === 'object' && !Array.isArray(value2)) {
          mappedData[`${key}`][`${key2}`] = {};
          for (const [key3, value3] of Object.entries(value2)) {
            const fallbackPath = `${key}/${key2}/${key3}`;
            mappedData[`${key}`][`${key2}`][`${key3}`] = [expandLocation(value3[0], fallbackPath), value3[1]];
          }
        } else {
          const fallbackPath = `${key}/${key2}`;
          mappedData[`${key}`][`${key2}`] = [expandLocation(value2[0], fallbackPath), value2[1]];
        }
      }
    } else {
      mappedData[`${key}`] = [expandLocation(value[0], key), value[1]];
    }
  }
  return mappedData;
}

// function to get the time zone content from the internal database
export function get_tz_content(tzName) {
  const tzDbZones = map_db_data(tzDb);
  // get time zone parts
  const nameParts = tzName.split('/');
  let dbData;
  // validate time zone
  try {
    if (nameParts.length === 3) {
      dbData = tzDbZones[`${nameParts[0]}`][`${nameParts[1]}`][`${nameParts[2]}`];
    } else if (nameParts.length === 2) {
      dbData = tzDbZones[`${nameParts[0]}`][`${nameParts[1]}`];
    } else {
      dbData = tzDbZones[`${nameParts[0]}`];
    }
    if (dbData == null || dbData.length < 2) {
      throw new Error('Given time zone not valid.');
    }
  } catch {
    console.error('Given time zone not valid.');
    return '';
  }
  // create the output
  return [dbData[0], enrich_details(tzDb.details[dbData[1]])];
}
