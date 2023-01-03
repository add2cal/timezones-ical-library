![Add to Calendar TimeZone iCal Library](https://github.com/add2cal/timezones-ical-library/blob/main/readme-header.png?raw=true)

[![Codacy Grade](https://img.shields.io/codacy/grade/aa298c980fa4459a9f7a386c8f8dc35f?style=for-the-badge)](https://app.codacy.com/gh/add2cal/timezones-ical-library/dashboard)
[![Build Status](https://img.shields.io/github/actions/workflow/status/add2cal/timezones-ical-library/npm-publish.yml?style=for-the-badge)](https://github.com/add2cal/timezones-ical-library/actions/workflows/npm-publish.yml)
[![npm Installations](https://img.shields.io/npm/dt/timezones-ical-library?label=npm%20Installations&style=for-the-badge)](https://www.npmjs.com/package/timezones-ical-library)
[![GitHub license](https://img.shields.io/github/license/add2cal/timezones-ical-library?style=for-the-badge)](https://github.com/add2cal/timezones-ical-library/blob/main/LICENSE)

<br />

# Add to Calendar TimeZones iCal Library

The tool to convert the [IANA (formerly Olson) time zone database files](http://www.iana.org/time-zones) into VTIMEZONE blocks, compatible with the iCalendar specification (RFC2445).

It is based on the awesome tool by Damon Chaplin ([github.com/libical/vzic](https://github.com/libical/vzic)), but only provides the VTIMEZONE part to easily put this into any other iCal generator (like the [add-to-calendar-button](https://github.com/add2cal/add-to-calendar-button)). It is built to be used standalone or as JavaScript module, hosted as npm package.

<br /><br />

---

<br />

## 📦 Installation / Setup

### 0. Update it (not required)

**This step is only relevant if you want to build the package and data on your own and from source!**
_(Requires Node.js as well as Linux as operating system.)_
Run ...

```
sudo sh update-tzdata.sh tzVersionNumber
```

... with _tzVersionNumber_ being the version of the [IANA time zone database](https://www.iana.org/time-zones) you want to use (e.g. sudo sh update-tzdata.sh 2022g).

<br />

### 1. Load it

Install the package via npm with:

```
npm install timezones-ical-library
```

After the installation:

- require the package (commonJS) or ...
- import the module (ES) via `import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from 'timezones-ical-library';`.

<br />

### 2. Use it

#### A. Get time zones

Use `tzlib_get_timezones()` to retrieve a list of all available time zone strings. You can pass `true` to retrieve a JSON formatted string instead of an array.

#### B. Get the iCal time zone block

Use the `tzlib_get_ical_block(tzName)` function to return the proper iCal VTIMEZONE block for a given time zone string (tzName). Again, pass `true` to retrieve a JSON formatted string instead of an array (not recommended).

You will receive an array, holding the VTIMEZONE block first, and the TZID line (additionally) second. The latter one is needed for any further time statement.

Include this into your further iCal data to come up with a complete ics file.

A final constellation could look like this:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-// github.com/add2cal/add-to-calendar-button //EN
CALSCALE:GREGORIAN
```

```
BEGIN:VTIMEZONE
TZID:America/New_York
LAST-MODIFIED:20220824T133813Z
X-LIC-LOCATION:America/New_York
BEGIN:DAYLIGHT
TZNAME:EDT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZNAME:EST
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE
```

```
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

<br /><br />

---

<br />

## ⚙️ API

Instead of using this code or the npm package, you could also make use of the free and open API.

### Getting a list of all zone names

```
https://tz.add-to-calendar-technology.com/api/zones.json
```

### Getting the ics part of a respective zone

```
https://tz.add-to-calendar-technology.com/api/%zoneName%.ics
```

With %zoneName% being your time zone. So, for New York, this would be [https://tz.add-to-calendar-technology.com/api/America/New_York.ics](https://tz.add-to-calendar-technology.com/api/America/New_York.ics).
**This is case sensitive!**

(Mind that this does not deliver a fully valid ics file, since it only contains the VTIMEZONE part. You will need to combine this with your other event information.)

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

Copyright (c) [Jens Kuerschner](https://jenskuerschner.de).

Licensed under [Apache-2.0](LICENSE).

<br />

## ⚡ Changelog (without minor changes and fixes)

![npm version](https://img.shields.io/npm/v/timezones-ical-library?label=current%20version&style=for-the-badge)

- v1.6 : database update
- v1.5 : new dist structure
- v1.4 : further minification via data mapping
- v1.3 : bundle size optimization and API
- v1.2 : providing tzblock as array with separate tzid
- v1.1 : get-offset function
- v1.0 : initial release

---

<br />

## 💜 Kudos go to

- The ["Time Zone King"](https://samueli.ucla.edu/time-zone-king-how-one-ucla-computer-scientist-keeps-digital-clocks-ticking/) [Paul Eggert](https://github.com/eggert) for optimizing time zones for the web, ...
- as well as all the contributors at [the official tz repository](https://github.com/eggert/tz).
- The awesome authors of zic and [vzic](https://github.com/libical/vzic/graphs/contributors); mainly Damon Chaplin, [Allen Winter](https://github.com/winterz), and [Ken Murchison](https://github.com/ksmurchison).
- [Trevor Eyre](https://github.com/trevoreyre) for his smooth and beautiful [autocomplete script](https://github.com/trevoreyre/autocomplete).
