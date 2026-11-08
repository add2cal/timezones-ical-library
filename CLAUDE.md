# Project Instructions for Claude

Specific entry information for Claude Code.

## Context

This is the `timezones-ical-library`. It provides IANA timezone data for iCalendar files.
It can be used to access VTIMEZONE blocks for a specific time zone as well as retrieve offset information within JavaScript/Typescript projects. Those blocks are also already optimized for ideal compatibility with all kinds of calendars - from Google Calendar to Microsoft Outlook and Apple Calendar.
It is a **hybrid project**:

1. **Data Generation (C):** Uses `vzic` (C code) to parse IANA databases into VTIMEZONE blocks.
2. **Library (TS):** A Node.js package (Dual CJS/ESM) that serves this data.

## Documentation References

- Architecture & Data Flow: @.ai/architecture.md
- Coding Standards: @.ai/conventions.md
- Directory Map: @.ai/code_map.md
- Library API and historical limitations: @.ai/guides/library-usage.md
- Maintainer updates: @.ai/guides/data_update.md
- Test coverage and limitations: @.ai/guides/testing.md

## Common Commands

- **Build:**
  - `npm run build` (also builds the demo app)
  - `npm run build:lib-only` (only builds the library)
- **Test JS:** `npm test`
- **Lint and format:** `npm run format`
- **Update TZ Data:** `sh scripts/update-tzdata.sh <version>` (e.g. 2026f), an explicit maintainer operation with macOS/Homebrew, Debian/Ubuntu/apt-get or Alpine/apk dispatch, not an ordinary PR check. Run without whole-script sudo; see the data update guide for prerequisites and stubbed-test limitations.
- **Update TZ Data and vzic dependency:** `sh scripts/update-tzdata.sh <version> true`; see @.ai/guides/vzic_update.md.
- **Compile C tools:** GNU `make` (`gmake` on macOS) in `src/vzic/` with pkg-config library flags (configured by the maintainer update, not the ordinary npm build).

## Critical Rules

1. Do not modify `dist/` directly; it is generated.
2. When touching `vzic-*.c` files, ensure you verify the build with `make`.
3. Respect the dual-module nature (CJS/ESM) in `package.json`.
4. Mind the monorepo structure, where the Astro powered demo website sits under ./demo, while the library can be accessed from root.
5. Offset lookup uses source-certified bundled ranges, then requested-name Intl history, then best-effort bundled extrapolation. Do not claim full historical accuracy for VTIMEZONE exports or unsupported runtime history.
6. Builds verify committed coverage offline. Database/evaluator/release changes must be recertified through the maintainer flow; do not bypass the guard or generate source coverage on every PR.
