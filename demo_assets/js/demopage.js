/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library - Demo Page Style
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * icense: GPL-3.0
 * 
 */

const lightModeButtonHeader = document.getElementById('light-mode-switch-header');
const lightModeButtonFooter = document.getElementById('light-mode-switch-footer');
const cval = document.cookie.match('(^|;)\\s*atcb-light-mode\\s*=\\s*([^;]+)')?.pop() || '';

if (cval == '') {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.toggle('atcb-dark');
  }
} else {
  if (cval == 'dark') {
    document.body.classList.toggle('atcb-dark');
  }
}

lightModeButtonHeader.addEventListener('click', toggle_atcb_light_mode);
lightModeButtonFooter.addEventListener('click', toggle_atcb_light_mode);

function toggle_atcb_light_mode() {
  document.body.classList.toggle('atcb-dark');
  // also save as cookie
  let newCval = 'light';
  if (document.body.classList.contains('atcb-dark')) {
    newCval = 'dark';
  }
  const d = new Date();
  d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);
  document.cookie = 'atcb-light-mode=' + newCval + ';expires=' + d.toUTCString();
}
