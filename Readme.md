![Add to Calendar TimeZone iCal Library](https://github.com/add2cal/timezones-ical-library/blob/main/readme-header.png?raw=true)

<br />

# Add to Calendar TimeZones iCal Library

The tool to convert the [IANA (formerly Olson) timezone database files](http://www.iana.org/time-zones) into VTIMEZONE blocks, compatible with the iCalendar specification (RFC2445).

It is based on the awesome tool by Damon Chaplin ([github.com/libical/vzic](https://github.com/libical/vzic)), but only provides the VTIMEZONE part to easily put this into any other iCal generator (like the [add-to-calendar-button](https://github.com/add2cal/add-to-calendar-button)). It is built to be used standalone or as JavaScript module, hosted as npm package.

<br /><br />

---

<br />

## 📦 Installation / Setup

### 0. Update it (not required)

**This step is only relevant if you want to build the package and data from source!** 
*(Requires Node.js as well as Linux as operating system.)* 
Run ...

```
sudo sh update-tzdata.sh tzVersionNumber
```

... with *tzVersionNumber* being the version of the IANA timezone database you want to use (e.g. sudo sh update-tzdata.sh 2022c).

<br />

### 1. Load it

#### A. VanillaJS

You can use the pure and simple version directly from the dist folder or the jsDelivr CDN and include in your application:

```
<script src="https://cdn.jsdelivr.net/npm/timezones-ical-library"></script>
```

#### B. npm package

Alternatively, you can install the package via npm with:

```
npm install timezones-ical-library
```

After the installation:
- require the package (commonJS) or ...
- import the module (ES) via `import { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones } from 'timezones-ical-library';`.

<br />

### 2. Use it

#### A. Get timezones

Use `tzlib_get_timezones()` to retrieve a list of all available timezone strings. You can pass `true` to retrieve a JSON formatted string instead of an array.

#### B. Get the iCal timezone block

Use the `tzlib_get_ical_block(tzName)` function to return the proper iCal VTIMEZONE block for a given timezone string (tzName). Again, pass `true` to retrieve a JSON formatted string instead of an array (not recommended).

You will receive an array, holding the VTIMEZONE block first, and the TZID line (additionally) second. The latter one is needed for any further time statement.

Include this into your further iCal data to come up with a complete ics file.

A final constellation could look like this:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-// github.com/add2cal/add-to-calendar-button // atcb v1.14.6 //EN
CALSCALE:GREGORIAN
```

```
BEGIN:VTIMEZONE
TZID:/timezones-ical-library/20220824/America/New_York
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
DTSTART;TZID=/timezones-ical-library/20220824/America/New_York:20230214T091500
DTEND;TZID=/timezones-ical-library/20220824/America/New_York:20230218T223000
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

For example, you can provide *tzName* `'Europe/Berlin'`, *isoDate* `'2023-05-23'`, and *isoTime* `'15:45'` in order to retrieve the offset, which applies for this timezone at the 23rd of May in 2023 at exactly 15:45.

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

Licensed under [Apache-2.0](LICENSE).

<br />

## ⚡ Changelog (without minor changes and fixes)

- v1.1 : get-offset function
- v1.0 : initial release

---

<br />

## 💜 Kudos go to

* The ["Time Zone King"](https://samueli.ucla.edu/time-zone-king-how-one-ucla-computer-scientist-keeps-digital-clocks-ticking/) [Paul Eggert](https://github.com/eggert) for optimizing timezones for the web, ...
* as well as all the contributors at [the official tz repository](https://github.com/eggert/tz).
* The awesome authors of zic and [vzic](https://github.com/libical/vzic/graphs/contributors); mainly Damon Chaplin, [Allen Winter](https://github.com/winterz), and [Ken Murchison](https://github.com/ksmurchison).
* [Trevor Eyre](https://github.com/trevoreyre) for his smooth and beautiful [autocomplete script](https://github.com/trevoreyre/autocomplete).
