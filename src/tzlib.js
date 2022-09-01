/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 */
 const tzlibVersion = '1.2.0';
/* Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */

// PLACE ZONES DB HERE

// LOADING THE RIGHT CODE BLOCK
function tzlib_get_ical_block(tzName, jsonType = false) {  
  // validate timezone
  if (!tzlibZonesDB[`${tzName}`]) {
    console.error('Given timezone not valid.');
    return '';
  }
  // otherwise, create the output
  const tzBlock = tzlibZonesDB[`${tzName}`].replace(/[^\w_\-:,;=\+\/<br>]/g,'').replace(/<br>/g, '\r\n');
  const tzidLine = tzBlock.split('\r\n')[0];
  const output = ['BEGIN:VTIMEZONE\r\n' + tzBlock + '\r\nEND:VTIMEZONE', tzidLine];
  // return
  if (jsonType) {
    return JSON.stringify(output);
  }
  return output;
}

// PROVIDING THE OFFSET BASED ON A GIVEN DATE AND TIME (YYYY-MM-DD and hh:mm as per ISO-8601).
function tzlib_get_offset(tzName, isoDate, isoTime) {
  // validate timezone
  if (!tzlibZonesDB[`${tzName}`]) {
    console.error('Given timezone not valid.');
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
  if (!tzlibZonesDB[`${tzName}`].match(/BEGIN:DAYLIGHT/i)) {
    return tzlibZonesDB[`${tzName}`].match(/TZOFFSETTO:([+|-]\d{4})/i)[1];
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
  const timezoneData = tzlibZonesDB[`${tzName}`].replace(/[^\w_\-:,;=\+\/<br>]/g,'').split('<br>');
  // collect timezone breakpoints (exactly 2)
  const tzBreakpoints = {1: {}, 2: {}};
  let breakpointCount = 0;
  for (let i = 0; i < timezoneData.length; i++) {
    // always first and therefore drives the counter
    if (timezoneData[i].startsWith('TZOFFSETTO')) {
      breakpointCount++;
      tzBreakpoints[breakpointCount].offset = timezoneData[i].split(':')[1];
    }
    // only required for the critical hour
    if (timezoneData[i].startsWith('DTSTART')) {
      tzBreakpoints[breakpointCount].hour = parseInt(timezoneData[i].substr(17,2));
    }
    // the RRULE is deciding when the switch happens (excluding the hour information from DTSTART)
    if (timezoneData[i].startsWith('RRULE')) {
      let rruleParts = timezoneData[i].split(';');
      let rruleMonth = parseInt(rruleParts[1].split('=')[1]);
      tzBreakpoints[breakpointCount].month = parseInt(rruleMonth);
      tzBreakpoints[breakpointCount].day = rruleParts[2].split('=')[1];
    }
  }
  // swap objects, if larger one comes first
  if (tzBreakpoints[1].month > tzBreakpoints[2].month) {
    [tzBreakpoints[1], tzBreakpoints[2]] = [tzBreakpoints[2], tzBreakpoints[1]];
  }
  // check for easy cases where the month is cleary in between
  if (dateMonth != tzBreakpoints[1].month && dateMonth != tzBreakpoints[2].month) {
    if (dateMonth < tzBreakpoints[1].month || dateMonth > tzBreakpoints[2].month) {
      return tzBreakpoints[2].offset
    } else {
      return tzBreakpoints[1].offset;
    }
  }
  // in other cases, validate where we are exactly and pick the right offset
  // defining the critical case, we need to evaluate (the breakpoint we are matching by month)
  const theCase = (function () { return Object.keys(tzBreakpoints).find(key => tzBreakpoints[key].month == dateMonth); })();
  // determining the actual day
  const helperArrayWeekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const numberDays = new Date(dateYear, dateMonth, 0).getDate();
  let weekdayCount = new Date(dateYear, dateMonth - 1, 1).getDay();
  const weekdays = {'SU': {}, 'MO': {}, 'TU': {}, 'WE': {}, 'TH': {}, 'FR': {}, 'SA': {}};
  for (let d = 1; d <= numberDays; d++) {
    const occurence = Object.keys(weekdays[helperArrayWeekdays[weekdayCount]]).length + 1;
    weekdays[helperArrayWeekdays[weekdayCount]][occurence] = d;
    weekdayCount++;
    if (weekdayCount == 7) {
      weekdayCount = 0;
    }
  };
  const actualDay = (function () {
    if (tzBreakpoints[theCase].day[0] == '-') {
      const breakpointWeekday = tzBreakpoints[theCase].day.substr(2, 2);
      const dayIndex = Object.keys(weekdays[breakpointWeekday]).length + 1 - parseInt(tzBreakpoints[theCase].day[1]);
      return weekdays[breakpointWeekday][dayIndex];
    } else {
      const breakpointWeekday = tzBreakpoints[theCase].day.substr(1, 2);
      return weekdays[breakpointWeekday][tzBreakpoints[theCase].day[0]];
    }
  })();
  // finally identifying the right offset
  if (dateDay > actualDay || (dateDay == actualDay && dateHour >= tzBreakpoints[theCase].hour)) {
    return tzBreakpoints[theCase].offset;
  }
  const fallbackCase = (function () { if (theCase == 1) { return 2; } else { return 1; }})();
  return tzBreakpoints[fallbackCase].offset;
}

// PROVIDE ALL TIMEZONES
function tzlib_get_timezones(jsonType = false) {
  const tzNames = Object.keys(tzlibZonesDB);
  if (jsonType) {
    return JSON.stringify(tzNames);
  }
  return tzNames;
}

console.log('Add to Calendar TimeZones iCal Library loaded (version ' + tzlibVersion + ')');

// PLACE EXPORT HERE
