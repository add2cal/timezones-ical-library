![Add to Calendar Time Zone iCal Library](https://github.com/add2cal/timezones-ical-library/blob/main/readme-header.png?raw=true)

[![Build Status](https://img.shields.io/github/actions/workflow/status/add2cal/timezones-ical-library/npm-publish.yml?style=for-the-badge)](https://github.com/add2cal/timezones-ical-library/actions/workflows/npm-publish.yml)
[![npm Installations](https://img.shields.io/npm/dt/timezones-ical-library?label=npm%20Installations&style=for-the-badge)](https://www.npmjs.com/package/timezones-ical-library)
[![GitHub license](https://img.shields.io/github/license/add2cal/timezones-ical-library?style=for-the-badge)](https://github.com/add2cal/timezones-ical-library/blob/main/LICENSE)

<br />

# Add to Calendar Time Zones iCal Library

Convert the [IANA (formerly Olson) time zone database files](http://www.iana.org/time-zones) into VTIMEZONE blocks, compatible with the iCalendar specification (RFC2445).

It is based on [vzic](https://github.com/libical/libical/tree/master/vzic), but only provides the VTIMEZONE part to easily put this into any other iCal generator (like the [add-to-calendar-button](https://github.com/add2cal/add-to-calendar-button)).  
It is built to be used standalone, via API, or as JavaScript/TypeScript module, hosted as npm package.

<br /><br />

---

<br />

## 📦 Installation / Setup

### 0. Update it

<details>
<summary>Learn more (not required)</summary>

**This step is only relevant if you want to build the package and data on your own and from source!**  
_(Requires Node.js as well as Linux as operating system. You would also need to load/include it manually into your codebase.)_  

Run ...

```
sudo sh scripts/update-tzdata.sh tzVersionNumber rebuildVzic
```

- with _tzVersionNumber_ being the version of the [IANA time zone database](https://www.iana.org/time-zones) you want to use (e.g. `sudo sh scripts/update-tzdata.sh 2026e`);
- and _rebuildVzic_ as an optional param to rebuild the vzic library from scratch (e.g. `sudo sh scripts/update-tzdata.sh 2026e true`).
</details>

<br />

### 1. Install it

```
npm install timezones-ical-library
```

<br />

### 2. Import it

For CommonJS:

```
require tzLib = require('timezones-ical-library');
```

With ES:

```
import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from 'timezones-ical-library';
```

<br />

### 3. Use it

#### A. Get time zones

Use `tzlib_get_timezones()` to retrieve a list of all available time zone strings.  
You can pass `true` to retrieve a JSON formatted string instead of an array.  
For CommonJS, you would use `tzLib.tzlib_get_timezones()`.

#### B. Get the iCal time zone block

Use the `tzlib_get_ical_block(tzName)` function to return the proper iCal VTIMEZONE block for a given time zone string (tzName).  
Again, pass `true` to retrieve a JSON formatted string instead of an array _(not recommended)_.  
For CommonJS, you would use `tzLib.tzlib_get_ical_block(tzName)`.

You will receive an array, holding the VTIMEZONE block first, and the TZID line (additionally) second. The latter one is needed for any further time statement.

Include this into your iCal data to come up with a complete ics file.

A final constellation could look like this:

```diff
  BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-// github.com/add2cal/add-to-calendar-button //EN
  CALSCALE:GREGORIAN
+ BEGIN:VTIMEZONE
+ TZID:America/New_York
+ LAST-MODIFIED:20220824T133813Z
+ X-LIC-LOCATION:America/New_York
+ BEGIN:DAYLIGHT
+ TZNAME:EDT
+ TZOFFSETFROM:-0500
+ TZOFFSETTO:-0400
+ DTSTART:19700308T020000
+ RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
+ END:DAYLIGHT
+ BEGIN:STANDARD
+ ZNAME:EST
+ TZOFFSETFROM:-0400
+ TZOFFSETTO:-0500
+ DTSTART:19701101T020000
+ RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
+ END:STANDARD
+ END:VTIMEZONE
  BEGIN:VEVENT
  UID:2022-08-30T19:29:38.618Z@add-to-calendar-button
  DTSTAMP:20230214T091500Z
  DTSTART;TZID=America/New_York:20230214T091500
  DTEND;TZID=America/New_York:20230218T223000
  SUMMARY:A sample event
  DESCRIPTION:Just some descriptive text...
  LOCATION:World Wide Web
  STATUS:CONFIRMED
  LAST-MODIFIED:20220830T192938Z
  SEQUENCE:0
  END:VEVENT
  END:VCALENDAR
```

#### C. Get a specific offset

Use `tzlib_get_offset(tzName, isoDate, isoTime)` to get specific offset (relative to UTC), based on a provided date and time.

For example, you can provide _tzName_ `'Europe/Berlin'`, _isoDate_ `'2023-05-23'`, and _isoTime_ `'15:45'` in order to retrieve the offset, which applies for this time zone at the 23rd of May in 2023 at exactly 15:45.

The date and time describe a **local wall-clock time in the requested zone**, not a UTC instant or the host's local time. The result remains a signed `±HHMM` string. Invalid zone names, impossible dates, invalid times or missing runtime time-zone support return `''`. Dates must use `YYYY-MM-DD` (years `0001` through `9999`) and times `HH:mm` (`00:00` through `23:59`). Historical offsets containing seconds are truncated toward zero to whole minutes because this API cannot represent seconds.

- Historical lookup uses the JavaScript runtime's `Intl.DateTimeFormat` IANA/ICU data, rather than extrapolating the bundled VTIMEZONE's current DST rules. For example, `America/New_York` at `2001-03-25 12:00` returns `-0500`, not the modern-rule `-0400`.
- During a backward clock change, a repeated local time selects the **earlier instant** (the larger UTC offset). During a forward clock change, a nonexistent local time returns the **post-transition offset**. For example, New York `2021-11-07 01:30` returns `-0400`, and `2021-03-14 02:30` also returns `-0400`. The latter does not make the nonexistent time valid; callers needing strict rejection must validate it separately.
- The bundled, case-sensitive zone list is still used for validation. Native IANA names are resolved directly to preserve their history, even where their exported VTIMEZONE blocks are shared. Names not understood by `Intl`, including the convenience aliases `PT`, `MT`, `CT` and `ET`, use their bundled mapped IANA names.
- No runtime dependency or full transition database is added to the bundle. The tradeoff is that results depend on the host's ICU/tzdata version, which can differ from the bundled database or another runtime. An up-to-date runtime with IANA time-zone support is required; unavailable runtime data returns `''` rather than silently falling back to inaccurate current rules.

> [!WARNING]
> This historical correction applies only to `tzlib_get_offset`. The generated `tzlib_get_ical_block` output and static `.ics` API files are unchanged and are **not full historical transition data**. For example, the bundled New York VTIMEZONE uses March/November recurrence rules, which do not describe its April/October transitions in 2001. Do not use those blocks as evidence of historical correctness.

<br /><br />

---

<br />

## ⚙️ API

Instead of using this code or the npm package, you could also make use of the free and open API.

### GET a list of all zone names

```
https://tz.add-to-calendar-technology.com/api/zones.json
```

### GET the ics part of a respective zone

```
https://tz.add-to-calendar-technology.com/api/{{zoneName}}.ics
```

With `{{zoneName}}` being your time zone.  
So, for New York, this would be [https://tz.add-to-calendar-technology.com/api/America/New_York.ics](https://tz.add-to-calendar-technology.com/api/America/New_York.ics).

**This is case sensitive!**

> [!WARNING]
> Mind that this does not deliver a fully valid ics file, since it only contains the VTIMEZONE part. You will need to combine this with your other event information.

<br /><br />

---

<br />

## 🙌 Contributing

Anyone is welcome to contribute, but mind the [guidelines](.github/CONTRIBUTING.md):

- [Bug reports](.github/CONTRIBUTING.md#bugs)
- [Feature requests](.github/CONTRIBUTING.md#features)
- [Pull requests](.github/CONTRIBUTING.md#pull-requests)

<br />

## 📃 Copyright and License

Copyright (c) [Jens Kuerschner](https://jekuer.com) (Calendarverse GmbH). Licensed under [Apache-2.0](LICENSE).

<br />

## ⚡ Changelog

![npm version](https://img.shields.io/npm/v/timezones-ical-library?label=current%20version&style=for-the-badge)

<details>
<summary>History (without minor changes and fixes)</summary>

- v2.4 : database update (2026e)
- v2.3 : artificial time zone aliases PT, MT, CT, ET for convenience
- v2.2 : database update (2026c)
- v2.1 : JS to TS migration
- v2.0 : Full refactoring reducing bundle size and easing future updates, using Astro for Demo page
- v1.11 : database update (2025c)
- v1.10 : upgrading to latest vzic improvements
- v1.9 : database update (2025b)
- v1.8 : database update (2024a)
- v1.7 : database update (2023c)
- v1.6 : database update (2022g)
- v1.5 : new dist structure
- v1.4 : further minification via data mapping
- v1.3 : bundle size optimization and API
- v1.2 : providing tzblock as array with separate tzid
- v1.1 : get-offset function
- v1.0 : initial release
</details>

<br />

## 💜 Kudos go to

- The ["Time Zone King"](https://samueli.ucla.edu/time-zone-king-how-one-ucla-computer-scientist-keeps-digital-clocks-ticking/) [Paul Eggert](https://github.com/eggert) for optimizing time zones for the web, ...
- as well as all the contributors at [the official tz repository](https://github.com/eggert/tz).
- The awesome authors of zic, vzic, and [libical](https://github.com/libical/libical/graphs/contributors); mainly Damon Chaplin, [Allen Winter](https://github.com/winterz), and [Ken Murchison](https://github.com/ksmurchison).
