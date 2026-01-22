# Code Map

## Root Directory
* `scripts/update-tzdata.sh`: Script to download IANA data and trigger the build.
* `scripts/db-generator.js`: Node script that orchestrates the JSON generation after C tools run.
* `src/vzic/Makefile`: Instructions to compile the C source files (`vzic`). Do not alter this as it gets pulled directly from the vzic dependency.
* `demo/`: **ISOLATED.** Contains the Astro documentation site. Has its own `package.json` and dependencies, but includes the library as dependency directly from the root project's dist directory (therefore, requires its built first).
* `.github/workflows/`: yml based scripts to run GitHub based tests, deploy to npm as well as deploying the demo page to GitHub Pages.

## C Source (Data Tools)
* `vzic.c` / `vzic.h`: Main logic for parsing timezone definitions.
* `vzic-dump.c`: Handles the output formatting of VTIMEZONE blocks.
* `test-vzic.c`: Unit tests for the C components.

## JavaScript Source (Library)
* `src/`: Contains the source for the npm package.
* `index.d.ts`: TypeScript definitions (ensure these are updated if library changes).
* `test/`: Unit/Component tests.
* `dist/`: **DO NOT EDIT.** Generated build artifacts (CJS/MJS).

## Configuration
* `package.json`: Defines exports for `.` (default), `import`, and `require`.