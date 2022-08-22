/**
 * ++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++
 */
 const tzlibVersion = '1.0.0';
 /* Creator: Jens Kuerschner (https://jenskuerschner.de)
  * Project: https://github.com/add2cal/timezones-ical-library
  * License: GPL-3.0
  *
  */

// CHECKING FOR SPECIFIC DEVICED AND SYSTEMS
// browser
const isBrowser = new Function('try { return this===window; } catch(e) { return false; }');

// LOADING THE RIGHT CODE BLOCK
function tzlib_get_ical_block(tzName) {

}

// START INIT
if (isBrowser()) {
  if (document.readyState !== 'loading') {
    // if the script is loaded after the page has been loaded, run the initilization
    atcb_init();
  } else {
    // otherwise, init the magic as soon as the DOM has been loaded
    document.addEventListener('DOMContentLoaded', atcb_init, false);
  }
}
// END INIT