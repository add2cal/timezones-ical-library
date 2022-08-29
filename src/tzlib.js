/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 */
 const tzlibVersion = '1.0.0';
/* Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */

// PLACE ZONES DB HERE

// LOADING THE RIGHT CODE BLOCK
function tzlib_get_ical_block(tzName) {  
  // validate timezone
  if (!tzlibZonesDB[`${tzName}`]) {
    console.error('Given timezone not valid.');
    return '';
  }
  // if symlink, follow
  if (!tzlibZonesDB[`${tzName}`].startsWith('TZID')) {
    return tzlib_get_offset(tzName, isoDate, isoTime);
  }
  // otherwise, create the output
  let buffer = 'BEGIN:VTIMEZONE\r\n';
  // replace the linebreak placeholders with real linebreaks and strip out any bad characters
  buffer += tzlibZonesDB[`${tzName}`].replace(/[^\w_\-:,;=\+\/<br>]/g,'').replace(/<br>/g, '\r\n');
  buffer += '\r\nEND:VTIMEZONE';
  console.log('iCal timezone information provided for ' + `${tzName}`);
  console.log('via Add to Calendar TimeZones iCal Library (version ' + tzlibVersion + ')');
  return buffer;
}

// PROVIDING THE OFFSET BASED ON A GIVEN DATE AND TIME (YYYY-MM-DD and hh:mm as per ISO-8601).
function tzlib_get_offset(tzName, isoDate, isoTime) {
  // validate timezone
  if (!tzlibZonesDB[`${tzName}`]) {
    console.error('Given timezone not valid.');
    return '';
  }
  // if symlink, follow
  if (!tzlibZonesDB[`${tzName}`].startsWith('TZID')) {
    return tzlib_get_offset(tzName, isoDate, isoTime);
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
  // calculate offset
  let offset = '';
  // creating a JS date from the input
  const dateString = isoDate + 'T' + isoTime + ':00';
  const date = new Date(dateString);
  const dateMonth = date.getMonth() + 1;
  const dateDay = date.getDate();
  const dateHour = date.getHours();
  // collect timezone breakpoints
  const timezoneData = tzlibZonesDB[`${tzName}`].replace(/[^\w_\-:,;=\+\/<br>]/g,'').split('<br>');
  let tzBreakpoints = new Object();
  let offsetBreakpointCount = 0;
  let hoursBreakpointCount = 0;
  let rruleBreakpointCount = 0;
  let noChange = true;
  let easyCase = true;
  for (let i = 0; i < timezoneData.length; i++) {
    if (!tzBreakpoints[offsetBreakpointCount]) {
      tzBreakpoints[offsetBreakpointCount] = new Object();
    }
    if (timezoneData[i].startsWith('TZOFFSETTO')) {
      tzBreakpoints[offsetBreakpointCount]['offset'] = timezoneData[i].split(':')[1];
      offsetBreakpointCount++;
    }
    if (!tzBreakpoints[hoursBreakpointCount]) {
      tzBreakpoints[hoursBreakpointCount] = new Object();
    }
    if (timezoneData[i].startsWith('DTSTART')) {
      tzBreakpoints[hoursBreakpointCount]['startingHour'] = parseInt(timezoneData[i].substr(17,2));
      hoursBreakpointCount++;
    }
    if (timezoneData[i].startsWith('RRULE')) {
      let rruleParts = timezoneData[i].split(';');
      let rruleMonth = parseInt(rruleParts[1].split('=')[1]);
      tzBreakpoints[rruleBreakpointCount]['month'] = rruleMonth;
      tzBreakpoints[rruleBreakpointCount]['day'] = rruleParts[2].split('=')[1];
      noChange = false;
      if (dateMonth == rruleMonth) {
        easyCase = false;
      }
      rruleBreakpointCount++;
    }
  }
  // abort early if there are no daylight changes
  if (noChange) {
    offset = tzBreakpoints[0]['offset'];
  } else if (easyCase) {
    // check for other easy cases where the month is cleary in between
    if (
      (tzBreakpoints[0]['month'] < tzBreakpoints[1]['month'] && dateMonth < tzBreakpoints[0]['month']) || 
      (tzBreakpoints[0]['month'] < tzBreakpoints[1]['month'] && dateMonth > tzBreakpoints[1]['month']) ||
      (tzBreakpoints[0]['month'] > tzBreakpoints[1]['month'] && dateMonth > tzBreakpoints[1]['month'] && dateMonth < tzBreakpoints[0]['month'])
      ) {
      offset = tzBreakpoints[1]['offset'];
    } else {
      offset = tzBreakpoints[0]['offset'];
    }
  } else {
    // in other cases, validate where we are exactly and pick the right offset
    // preparing the information
    let theCase = 0; // what we check
    offset = tzBreakpoints[1]['offset']; // setting the opposite as default offset and override it later, if the check is true
    if (dateMonth == tzBreakpoints[1]['month']) { // adjusting the case, if necessary
      theCase = 1;
      offset = tzBreakpoints[0]['offset'];
    }
    // determining the actual day
    const helperArrayWeekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    const numberDays = new Date(date.getFullYear(), dateMonth, 0).getDate();
    let startWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    let weekdays = new Object();
    for (let d = 1; d <= numberDays; d++) {
      if (!weekdays[helperArrayWeekdays[startWeekday]]) {
        weekdays[helperArrayWeekdays[startWeekday]] = new Object();
      }
      let occurence = Object.keys(weekdays[helperArrayWeekdays[startWeekday]]).length + 1;
      weekdays[helperArrayWeekdays[startWeekday]][occurence] = d;
      startWeekday++;
      if (startWeekday == 7) {
        startWeekday = 0;
      }
    };
    if (tzBreakpoints[theCase]['day'][0] == '-') {
      let breakpointWeekday = tzBreakpoints[theCase]['day'].substr(2, 2);
      let dayIndex = Object.keys(weekdays[breakpointWeekday]).length + 1 - parseInt(tzBreakpoints[theCase]['day'][1]);
      tzBreakpoints[theCase]['actualDay'] = weekdays[breakpointWeekday][dayIndex];
    } else {
      let breakpointWeekday = tzBreakpoints[theCase]['day'].substr(1, 2);
      tzBreakpoints[theCase]['actualDay'] = weekdays[breakpointWeekday][tzBreakpoints[theCase]['day'][0]];
    }
    // checking case and override default offset if true
    if (dateDay > tzBreakpoints[theCase]['actualDay'] || (dateDay == tzBreakpoints[theCase]['actualDay'] && dateHour >= tzBreakpoints[theCase]['startingHour'])) {
      offset = tzBreakpoints[theCase]['offset']
    }
  }
  // create the output
  console.log('timezone offset information provided for ' + `${tzName}`);
  console.log('via Add to Calendar TimeZones iCal Library (version ' + tzlibVersion + ')');
  return offset;
}

// PROVIDE ALL TIMEZONES
function tzlib_get_timezones(jsonType = false) {
  const tzNames = Object.keys(tzlibZonesDB);
  if (jsonType) {
    return JSON.stringify(tzNames);
  }
  return tzNames;
}

// PLACE EXPORT HERE
