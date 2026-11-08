# Library Usage & API Reference

## Overview

The `timezones-ical-library` provides official IANA timezone data formatted for iCalendar (RFC 5545) usage. It is optimized for zero-dependency inclusion in JavaScript/TypeScript projects.

## 1. Installation

### NPM (Node.js / Bundlers)

```bash
npm install timezones-ical-library
```

### Imports

#### ES Modules (Preferred)

```typescript
import {
  tzlib_get_ical_block,
  tzlib_get_offset,
  tzlib_get_timezones
} from 'timezones-ical-library';
```

#### CommonJS

```javascript
const tzLib = require('timezones-ical-library');
```

## 2. Function Reference

`tzlib_get_timezones(returnJson)`
Retrieves a list of all supported IANA timezone strings (e.g., "Europe/Berlin", "America/New_York").

- Parameters:
  - returnJson (boolean, optional): If true, returns a JSON-formatted string. Default is false (returns Array).
- Returns: string[] (or string if JSON requested).

Usage:

```javascript
const zones = tzlib_get_timezones();
// Output: ['Africa/Abidjan', 'Africa/Accra', ...]
```

`tzlib_get_ical_block(tzName, returnJson)`
Generates the standard VTIMEZONE block required for .ics files.

- Parameters:
  - tzName (string): The IANA timezone identifier (e.g., "America/New_York").
  - returnJson (boolean, optional): If true, returns JSON string. Default false.
- Returns: [string, string] (Array), or its JSON string when requested. On an unsupported zone, returns the empty string, including with JSON output requested; check before destructuring.
  - Index 0: The full BEGIN:VTIMEZONE ... END:VTIMEZONE block.
  - Index 1: The TZID parameter (e.g., `TZID=America/New_York`), ready for `DTSTART;${tzid}`. The VTIMEZONE itself contains a `TZID:` property. Aliases may return a different bundled location.

Usage:

```javascript
const [icalBlock, tzid] = tzlib_get_ical_block('Europe/Berlin');
```

`tzlib_get_offset(tzName, isoDate, isoTime)`
Calculates the UTC offset for a local wall-clock date/time in the requested supported timezone (not a UTC timestamp).

- Parameters:
  - tzName (string): IANA timezone.
  - isoDate (string): Date in YYYY-MM-DD format.
  - isoTime (string): Time in HH:mm format (24h).
- Returns: string (Offset in +HHMM or -HHMM format), or `''` when the zone/input is invalid or an offset cannot be produced. Invalid input does not throw. Historical seconds are truncated toward zero to minutes.

Dates must be real Gregorian calendar dates in exact `YYYY-MM-DD` form, years 0001 through 9999. Times must be exact `HH:mm`, from 00:00 through 23:59. Zone validation occurs first. Date/time failures log these exact diagnostics respectively:

```text
offset calculation failed: date misspelled [-> YYYY-MM-DD]
offset calculation failed: time misspelled [-> hh:mm]
```

Offset lookup prefers bundled rules only within the requested name's source-certified date range (inclusive start, exclusive end, recorded in `src/db/offset-coverage.json`). Outside that range it uses requested-name `Intl.DateTimeFormat` history. If Intl is missing, rejects the name or fails, bundled recurrence extrapolation is best effort, not guaranteed historical accuracy. Folds select the earlier instant; gaps use the offset after the forward jump. Host-local timezone arithmetic is not used.

An IANA alias keeps its requested-name runtime history rather than borrowing its bundled VTIMEZONE identity. Only library-defined PT/MT/CT/ET may fall back to their mapped cities (Los Angeles/Denver/Chicago/New York) for Intl history. Supported names still come from the bundled library; an arbitrary ICU-supported name does not bypass validation.

Coverage reflects the generated IANA release, not future legislation. Outside coverage, accuracy depends on runtime ICU/tzdata. For example, New York `2001-03-25 12:00` is `-0500` with adequate runtime history, but best-effort bundled fallback gives `-0400`. Without runtime support, Sao Paulo in January 2018 gives `-0300`, not historical `-0200`. The VTIMEZONE exports/static ICS remain recurring-rule summaries, not full historical transitions; improved offset lookup does not change that limitation.

Usage:

```javascript
const offset = tzlib_get_offset('Europe/Berlin', '2023-05-23', '15:45');
// Output: "+0200" (CEST is UTC+2 in May)
```

## 3. Integration Pattern (Constructing .ics Files)

To generate a valid iCalendar file, you must inject the VTIMEZONE block before the VEVENT.

```javascript
import { tzlib_get_ical_block } from 'timezones-ical-library';

const zone = 'America/New_York';
const [vTimezone, tzidLine] = tzlib_get_ical_block(zone);

const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//My App//EN
CALSCALE:GREGORIAN
${vTimezone}
BEGIN:VEVENT
UID:12345@myapp
DTSTAMP:20230214T091500Z
DTSTART;${tzidLine}:20230214T091500
DTEND;${tzidLine}:20230214T100000
SUMMARY:Meeting
END:VEVENT
END:VCALENDAR`;
```

## 4. REST API (Non-JS Usage)

The library's data is also exposed via a public REST API for non-JavaScript environments.

Endpoints

- List All Zones:
  - GET https://tz.add-to-calendar-technology.com/api/zones.json
  - Returns: JSON array of strings.
- Get VTIMEZONE Block:
  - GET https://tz.add-to-calendar-technology.com/api/{ZoneName}.ics
  - Example: https://tz.add-to-calendar-technology.com/api/America/New_York.ics
  - Note: The URL is case-sensitive.

API Limitations

- The API returns only the VTIMEZONE component. You must still wrap it in BEGIN:VCALENDAR for a valid file.
