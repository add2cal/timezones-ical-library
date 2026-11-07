# Code Map

This code map gives an overview of the most important files and directory, structured by nature. It is no complete sitemap of the codebase!

## Root Directory

- `scripts/update-tzdata.sh`: Explicit maintainer update: selected tzdata/tzcode downloads, full database cleanup, C/JSON/API generation, certification and release declaration. Not an ordinary PR check.
- `scripts/db-generator.js`: Node script that orchestrates the JSON generation after C tools run.
- `scripts/generate-coverage.sh`: Builds selected-release zic/zdump with backzone histories and runs source comparison before cleanup.
- `scripts/maintainer-env.sh`: Shared explicit host/package-manager dispatch, Linux-only install elevation, build prerequisites and curl/wget download selection. Sourcing it does not install anything.
- `scripts/source-offsets.py`: Enumerates source transition partitions for each requested name.
- `scripts/certify-offsets.cjs`: Certifies continuous matching bundled tails and records source provenance/digests.
- `scripts/verify-coverage.cjs`: Offline release/database/evaluator consistency guard, called before library builds.
- `scripts/build.js`: Builds the CJS, ESM, and browser bundles with esbuild. It reads the version from `package.json` and injects it into the preserved header without modifying `src/tzlib.ts`.
- `src/vzic/Makefile`: Instructions to compile the C source files (`vzic`). Do not alter this as it gets pulled directly from the vzic dependency.
- `demo/`: **ISOLATED.** Contains the Astro documentation site. Has its own `package.json` and dependencies, but includes the library as dependency directly from the root project's dist directory (therefore, requires its built first).
- `.github/workflows/`: yml based scripts to run GitHub based tests, deploy to npm as well as deploying the demo page to GitHub Pages.

## C Source (Data Tools)

- `src/vzic/vzic.c` / `src/vzic/vzic.h`: Main logic for parsing timezone definitions.
- `src/vzic/vzic-parse.c`: Parses source timezone definitions.
- `src/vzic/vzic-dump.c`: Dumps parsed source data for diagnostics.
- `src/vzic/vzic-output.c`: Writes VTIMEZONE blocks.
- `src/vzic/test-vzic.c`: Unit tests for the C components.

## JavaScript Source (Library)

- `src/`: Contains the source for the npm package.
- `src/tzlib.ts`: Main TypeScript entry point. Its preserved header intentionally contains the empty `* Version:` placeholder used by the build.
- `src/offset.ts`: Validated wall-time offset dispatch: certified bundle, requested-name Intl history, best-effort bundle fallback.
- `src/bundled-offset.ts`: UTC-only evaluator for the compact fixed/annual recurrence subset.
- `src/db/zonesdb.json`: Generated compact VTIMEZONE database.
- `src/db/offset-coverage.json`: Generated per-name ranges, uncertified names, selected release and certification digests. Do not hand-edit to bypass guards.
- `src/utils.ts`: Utility functions.
- `src/types.ts`: Internal TypeScript definitions.
- `index.d.ts`: Public TypeScript definitions (ensure these are updated if library changes).
- `test/`: Node regression tests, including `bundled-offsets.cjs` (recurrences), `coverage.cjs` (offline guards/provenance), `update-tzdata.cjs` (stubbed maintainer integration with actual JSON generation) and `offsets.cjs` (four bundles, run under four host zones). See the [testing guide](guides/testing.md).
- `dist/`: **DO NOT EDIT.** Generated CJS (`dist/cjs/index.js`), ESM (`dist/mjs/index.js`), and browser (`dist/tzlib.js` and `dist/tzlib.min.js`) artifacts.

## Configuration

- `package.json`: Defines exports for `.` (default), `import`, and `require`.
