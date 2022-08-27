/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 */
 const tzlibVersion = '1.0.0';
/* Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: GPL-3.0
 *
 */

// PLACE ZONES DB HERE

// LOADING THE RIGHT CODE BLOCK
function tzlib_get_ical_block(tzName) {  
  if (tzlibZonesDB[`${tzName}`]) {
    // if symlink, follow
    if (!tzlibZonesDB[`${tzName}`].startsWith('TZID')) {
      return tzlib_get_ical_block(tzName);
    } else {
      // otherwise, create the output
      let buffer = 'BEGIN:VTIMEZONE\r\n';
      // replace the linebreak placeholders with real linebreaks and strip out any bad characters
      buffer += tzlibZonesDB[`${tzName}`].replace(/[^\w_\-:\+\/<br>]/g,'').replace(/<br>/g, '\r\n');
      buffer += '\r\nEND:VTIMEZONE';
      console.log('iCal timezone information provided for ' + `${tzName}`);
      console.log('via Add to Calendar TimeZones iCal Library (version ' + tzlibVersion + ')');
      return buffer;
    }
  }
  console.error('Given timezone not valid.');
  return '';
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
