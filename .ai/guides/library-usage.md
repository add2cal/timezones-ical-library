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

* Parameters:
  * returnJson (boolean, optional): If true, returns a JSON-formatted string. Default is false (returns Array).
* Returns: string[] (or string if JSON requested).

Usage:

```javascript
const zones = tzlib_get_timezones();
// Output: ['Africa/Abidjan', 'Africa/Accra', ...]
```

`tzlib_get_ical_block(tzName, returnJson)`
Generates the standard VTIMEZONE block required for .ics files.

* Parameters:
  * tzName (string): The IANA timezone identifier (e.g., "America/New_York").
  * returnJson (boolean, optional): If true, returns JSON string. Default false.
* Returns: [string, string] (Array)
  * Index 0: The full BEGIN:VTIMEZONE ... END:VTIMEZONE block.
  * Index 1: The TZID line (e.g., TZID:America/New_York).

Usage:

```javascript
const [icalBlock, tzid] = tzlib_get_ical_block('Europe/Berlin');
```

`tzlib_get_offset(tzName, isoDate, isoTime)`
Calculates the UTC offset for a specific timezone at a specific point in time (accounts for Daylight Saving Time).

* Parameters:
    * tzName (string): IANA timezone.
    * isoDate (string): Date in YYYY-MM-DD format.
    * isoTime (string): Time in HH:mm format (24h).
* Returns: string (Offset in +HHMM or -HHMM format).

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
* List All Zones:
    * GET https://tz.add-to-calendar-technology.com/api/zones.json
    * Returns: JSON array of strings.
* Get VTIMEZONE Block:
    * GET https://tz.add-to-calendar-technology.com/api/{ZoneName}.ics
    * Example: https://tz.add-to-calendar-technology.com/api/America/New_York.ics
    * Note: The URL is case-sensitive.

API Limitations
* The API returns only the VTIMEZONE component. You must still wrap it in BEGIN:VCALENDAR for a valid file.