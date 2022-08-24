/**
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Version: 1.0.0
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
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
      buffer += tzlibZonesDB[`${tzName}`].replace(/<br>/g, '\r\n').replace(/[^\w_\-\+\/]/g,'');
      buffer += 'END:VTIMEZONE';
      return buffer;
    }
  }
  error.log('Given timezone not valid.');
}

// PLACE EXPORT HERE
