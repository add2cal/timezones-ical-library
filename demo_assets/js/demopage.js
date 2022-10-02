/* eslint-disable no-undef */
/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library - Demo Page Style
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 * Using the awesome autocomplete script by Trevor Eyre (licensed MIT)
 * DO NOT REMOVE THE COPYRIGHT NOTICE ABOVE!
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
  const newCval = document.body.classList.contains('atcb-dark') ? 'dark' : 'light';
  const d = new Date();
  d.setTime(d.getTime() + 90 * 24 * 60 * 60 * 1000);
  document.cookie = 'atcb-light-mode=' + newCval + ';expires=' + d.toUTCString();
}

// TYPEAHEAD AUTO COMPLETE DROPDOWN
// via https://github.com/trevoreyre/autocomplete by Trevor Eyre (https://github.com/trevoreyre)
const tzNames = tzlib_get_timezones();
let inputValue = '';
const today = new Date();
const currentIsoDate = today.toISOString().replace(/:\d{2}.\d{3}Z$/g, '');
const currentDate = currentIsoDate.split('T');
const input = document.getElementById('tz-input');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tzInput = new Autocomplete('#autocomplete', {
  search: (input) => {
    inputValue = input;
    if (input.length < 1) {
      return [];
    }
    return tzNames.filter((tzName) => {
      return tzName.toLowerCase().includes(input.toLowerCase());
    });
  },

  onUpdate: (results) => {
    const showNoResults = inputValue && results.length === 0 ? true : false;
    if (showNoResults) {
      autocomplete.classList.add('no-results');
      input.setAttribute('aria-describedby', 'no-results');
    } else {
      autocomplete.classList.remove('no-results');
      input.removeAttribute('aria-describedby');
    }
  },

  onSubmit: (result) => {
    let tzBlock = tzlib_get_ical_block(`${result}`)[0];
    let tzOffsetBlock = tzlib_get_offset(`${result}`, currentDate[0], currentDate[1]);
    if (tzBlock == '') {
      tzBlock = 'Given timezone not valid.';
      tzOffsetBlock = tzBlock;
    }
    document.getElementById('tz-output').textContent = tzBlock;
    document.getElementById('tz-offset-output').textContent = 'Current Offset: ' + tzOffsetBlock;
    document.getElementById('tz-input').blur();
    document.getElementById('tz-output-wrapper').style.display = 'block';
  },

  autoSelect: true,

  debounceTime: 100,
});

input.addEventListener('focus', () => {
  input.classList.add('focused');
});
input.addEventListener('blur', () => {
  input.classList.remove('focused');
});
