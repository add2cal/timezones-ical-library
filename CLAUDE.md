# Project Instructions for Claude

Specific entry information for Claude Code.

## Context
This is the `timezones-ical-library`. It provides IANA timezone data for iCalendar files.
It can be used to access VTIMEZONE blocks for a specific time zone as well as retrieve offset information within JavaScript/Typescript projects. Those blocks are also already optimized for ideal compatibility with all kinds of calendars - from Google Calendar to Microsoft Outlook and Apple Calendar.
It is a **hybrid project**:
1. **Data Generation (C):** Uses `vzic` (C code) to parse IANA databases into VTIMEZONE blocks.
2. **Library (JS):** A Node.js package (Dual CJS/ESM) that serves this data.

## Documentation References
- Architecture & Data Flow: @.ai/architecture.md
- Coding Standards: @.ai/conventions.md
- Directory Map: @.ai/code_map.md

## Common Commands
- **Build:**
  - `npm run build` (also builds the demo app)
  - `build:lib-only` (only builds the library)
- **Test JS:** `npm test`
- **Lint and format:** `npm run format`
- **Update TZ Data:** `sudo sh update-tzdata.sh <version>` (e.g. 2025c)
- **Update vTZ Data and zic dependency:** `sudo sh update-tzdata.sh <version> true` (updates the vzic dependency before updating the tz data)
- **Compile C tools:** `make` in @src/vzic (done automatically via build)

## Critical Rules
1. Do not modify `dist/` directly; it is generated.
2. When touching `vzic-*.c` files, ensure you verify the build with `make`.
3. Respect the dual-module nature (CJS/ESM) in `package.json`.
4. Mind the monorepo structure, where the Astro powered demo website sits under ./demo, while the library can be accessed from root.