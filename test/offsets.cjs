const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

async function main() {
  const commonjs = require('../dist/cjs/index.js');
  const esm = await import('../dist/mjs/index.js');
  const browser = (file, intl = Intl) => {
    const context = { window: {}, Intl: intl, console };
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
    return context.window;
  };
  const cases = [
    ['America/New_York', '2001-03-25', '12:00', '-0500'],
    ['America/New_York', '2001-04-01', '01:59', '-0500'],
    ['America/New_York', '2001-04-01', '03:00', '-0400'],
    ['America/New_York', '2001-10-28', '00:00', '-0400'],
    ['America/New_York', '2001-10-28', '01:30', '-0400'],
    ['America/New_York', '2001-10-28', '02:00', '-0500'],
    ['America/New_York', '2001-10-29', '00:00', '-0500'],
    ['America/New_York', '2007-03-11', '03:00', '-0400'],
    ['America/New_York', '2001-11-01', '00:00', '-0500'],
    ['America/New_York', '2021-03-14', '01:59', '-0500'],
    ['America/New_York', '2021-03-14', '02:00', '-0400'],
    ['America/New_York', '2021-03-14', '02:30', '-0400'],
    ['America/New_York', '2021-03-14', '03:00', '-0400'],
    ['America/New_York', '2021-11-07', '01:00', '-0400'],
    ['America/New_York', '2021-11-07', '01:59', '-0400'],
    ['America/New_York', '2021-11-07', '02:00', '-0500'],
    ['Europe/Berlin', '2021-03-28', '02:30', '+0200'],
    ['Europe/Berlin', '2021-10-31', '02:30', '+0200'],
    ['Australia/Lord_Howe', '2021-10-03', '02:15', '+1100'],
    ['Australia/Lord_Howe', '2021-04-04', '01:45', '+1100'],
    ['Asia/Kathmandu', '2021-01-01', '00:00', '+0545'],
    ['Pacific/Chatham', '2021-01-01', '00:00', '+1345'],
    ['Pacific/Apia', '2011-12-30', '12:00', '+1400'],
    ['Asia/Kolkata', '1900-01-01', '12:00', '+0521'],
    ['America/Sao_Paulo', '2018-01-01', '12:00', '-0200'],
    ['America/Sao_Paulo', '2021-01-01', '12:00', '-0300'],
    ['Africa/Bangui', '1900-01-01', '12:00', '+0013'],
    ['US/Eastern', '2001-03-25', '12:00', '-0500'],
    ['ET', '2001-03-25', '12:00', '-0500'],
    ['PT', '2021-07-01', '12:00', '-0700'],
    ['MT', '2021-07-01', '12:00', '-0600'],
    ['CT', '2021-07-01', '12:00', '-0500'],
    ['CST6CDT', '2021-07-01', '12:00', '-0500'],
    ['Etc/GMT+5', '2021-01-01', '12:00', '-0500'],
    ['GMT0', '2021-01-01', '00:00', '+0000'],
    ['UTC', '0099-01-01', '00:00', '+0000'],
    ['UTC', '0001-01-01', '00:00', '+0000'],
    ['UTC', '9999-12-31', '23:59', '+0000'],
    ['UTC', '2000-02-29', '23:59', '+0000'],
  ];
  for (const [name, api] of [
    ['CJS', commonjs],
    ['ESM', esm],
    ['browser', browser('dist/tzlib.js')],
    ['browser-min', browser('dist/tzlib.min.js')],
  ]) {
    for (const [zone, date, time, expected] of cases) {
      assert.equal(api.tzlib_get_offset(zone, date, time), expected, `${name}: ${zone} ${date} ${time} in host ${process.env.TZ}`);
    }
    const originalError = console.error;
    console.error = () => {};
    try {
      for (const [zone, date, time] of [
        ['Invalid/Zone', '2021-01-01', '12:00'],
        ['america/new_york', '2021-01-01', '12:00'],
        ['UTC', '2021-02-29', '12:00'],
        ['UTC', '2021-04-31', '12:00'],
        ['UTC', '2021-00-01', '12:00'],
        ['UTC', '2021-13-01', '12:00'],
        ['UTC', '2021-01-00', '12:00'],
        ['UTC', '0000-01-01', '12:00'],
        ['UTC', '2021-1-01', '12:00'],
        ['UTC', '2021-01-01', '24:00'],
        ['UTC', '2021-01-01', '12:60'],
        ['UTC', '2021-01-01', '1:00'],
      ])
        assert.equal(api.tzlib_get_offset(zone, date, time), '', `${name}: invalid ${zone} ${date} ${time}`);
    } finally {
      console.error = originalError;
    }
    const diagnostics = [];
    console.error = (...args) => diagnostics.push(args);
    try {
      for (const [date, time, field, format] of [
        ['2021-1-01', '12:00', 'date', 'YYYY-MM-DD'],
        ['2021-02-29', '12:00', 'date', 'YYYY-MM-DD'],
        ['2021-04-31', '12:00', 'date', 'YYYY-MM-DD'],
        ['2021-01-01', '1:00', 'time', 'hh:mm'],
        ['2021-01-01', '24:00', 'time', 'hh:mm'],
        ['2021-01-01', '12:60', 'time', 'hh:mm'],
      ]) {
        diagnostics.length = 0;
        assert.equal(api.tzlib_get_offset('UTC', date, time), '');
        assert.deepEqual(diagnostics, [[`offset calculation failed: ${field} misspelled [-> ${format}]`]], `${name}: ${field} diagnostic`);
      }
      diagnostics.length = 0;
      assert.equal(api.tzlib_get_offset('UTC', '2000-02-29', '23:59'), '+0000');
      assert.deepEqual(diagnostics, [], `${name}: valid input must not log an error`);
    } finally {
      console.error = originalError;
    }
    // Offset lookup is fixed separately from the bundled, modern-rule-only VTIMEZONE export.
    const block = api.tzlib_get_ical_block('America/New_York')[0];
    assert.ok(block.includes('RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU'));
    assert.ok(block.includes('RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU'));
  }
  const nativeIntl = global.Intl;
  for (const mode of ['absent', 'unsupported', 'stale', 'native']) {
    let calls = [];
    const mocked =
      mode === 'absent'
        ? null
        : {
            DateTimeFormat: function (locale, options) {
              calls.push(options.timeZone);
              if (mode === 'unsupported') throw new RangeError('unsupported');
              return new nativeIntl.DateTimeFormat(locale, mode === 'stale' ? { ...options, timeZone: 'UTC' } : options);
            },
          };
    const apis = [commonjs, esm, browser('dist/tzlib.js', mocked), browser('dist/tzlib.min.js', mocked)];
    global.Intl = mocked;
    try {
      for (const api of apis) {
        calls = [];
        assert.equal(api.tzlib_get_offset('America/New_York', '2021-07-01', '12:00'), '-0400', `covered ignores ${mode} Intl`);
        assert.equal(api.tzlib_get_offset('America/Sao_Paulo', '2021-01-01', '12:00'), '-0300', 'formerly-DST coverage');
        assert.equal(api.tzlib_get_offset('Pacific/Chatham', '2021-09-26', '02:45'), '+1345', 'transition minutes and gap');
        assert.deepEqual(calls, [], 'certified bundled dates must never consult Intl');
        if (mode === 'stale') {
          assert.equal(api.tzlib_get_offset('Africa/Bangui', '1915-01-01', '12:00'), '+0100');
          assert.deepEqual(calls, [], 'alias has its own established coverage');
          assert.equal(api.tzlib_get_offset('Africa/Lagos', '1915-01-01', '12:00'), '+0000');
          assert.deepEqual(calls, ['Africa/Lagos'], 'shared bundled rules do not imply shared historical coverage');
          calls = [];
          assert.equal(api.tzlib_get_offset('America/New_York', '2001-03-25', '12:00'), '+0000');
          assert.deepEqual(calls, ['America/New_York'], 'outside coverage the runtime remains authoritative');
          calls = [];
          assert.equal(api.tzlib_get_offset('America/New_York', '2100-12-30', '00:00'), '+0000');
          assert.deepEqual(calls, ['America/New_York'], 'finite coverage end is exclusive');
        }
        calls = [];
        if (mode === 'native') {
          assert.equal(api.tzlib_get_offset('America/New_York', '2001-03-25', '12:00'), '-0500');
          assert.deepEqual(calls, ['America/New_York'], 'historical date uses runtime');
          calls = [];
          assert.equal(api.tzlib_get_offset('Africa/Bangui', '1900-01-01', '12:00'), '+0013');
          assert.deepEqual(calls, ['Africa/Bangui'], 'requested historical alias is not replaced by bundled target');
          assert.equal(api.tzlib_get_offset('America/Sao_Paulo', '2018-01-01', '12:00'), '-0200');
        } else if (mode !== 'stale') {
          assert.equal(api.tzlib_get_offset('America/New_York', '2001-03-25', '12:00'), '-0400', 'uncertified history has best-effort bundled fallback');
          assert.equal(api.tzlib_get_offset('America/Sao_Paulo', '2018-01-01', '12:00'), '-0300', 'fallback does not promise historical DST');
          assert.equal(api.tzlib_get_offset('UTC', '0099-01-01', '00:00'), '+0000');
        }
        const diagnostics = [];
        const originalError = console.error;
        console.error = (...args) => diagnostics.push(args);
        try {
          calls = [];
          for (const [date, time, field, format] of [
            ['2021-02-29', '12:00', 'date', 'YYYY-MM-DD'],
            ['2021-01-01', '24:00', 'time', 'hh:mm'],
          ]) {
            diagnostics.length = 0;
            assert.equal(api.tzlib_get_offset('UTC', date, time), '');
            assert.deepEqual(diagnostics, [[`offset calculation failed: ${field} misspelled [-> ${format}]`]]);
          }
          assert.deepEqual(calls, [], 'invalid input never reaches either lookup tier');
        } finally {
          console.error = originalError;
        }
      }
    } finally {
      global.Intl = nativeIntl;
    }
  }
  // Every bundled name, including artificial and legacy aliases, must remain usable.
  for (const zone of commonjs.tzlib_get_timezones()) {
    assert.match(commonjs.tzlib_get_offset(zone, '2021-07-01', '12:00'), /^[+-]\d{4}$/, zone);
  }
  console.log(`Historical offsets, aliases, validation and all four bundles passed in host TZ=${process.env.TZ}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
