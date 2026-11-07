# Testing Strategy & Guidelines

## Ordinary Offline Library Checks

Run `npm ci`, then `npm test` from the root. The custom Node runner in `test/tests.js` is followed by TypeScript checking. npm dependency installation is separate from source certification; these tests do not download IANA archives or run privileged generation.

- `test/bundled-offsets.cjs` tests the compact recurrence evaluator.
- `test/coverage.cjs` checks committed coverage consistency and verifies that database bytes, evaluator bytes or the declared IANA release cannot change unnoticed. It exercises the actual build entry point's rejection and selected-release provenance/checksum wiring using fixtures, without downloads.
- `test/update-tzdata.cjs` runs the actual maintainer shell scripts and actual JSON generator with stubbed downloads, system installation, compilers, source enumeration and certification. It checks release reuse, one download per archive, backzone configuration, full database cleanup, replacement of pre-existing JSON, repeated successful updates, API alias conversion, certification-before-cleanup and preservation of the old declaration on certification failure.
- The runner builds all four bundles (CJS, ESM, browser and minified browser) and checks their injected package-version headers. `test/offsets.cjs` is run in separate processes under UTC, America/New_York, Europe/Berlin and Pacific/Auckland, covering the four bundles, historical/alias cases, folds/gaps, invalid inputs and runtime-unavailable fallback behavior.
- Module-loading tests exercise CJS/ESM APIs, and static API checks confirm ICS presence for the selected test zones, not exhaustive validation of every zone.

Prefer actual bundled JSON/filesystem fixtures for library behavior. Stubs are intentional for nonprivileged maintainer wiring tests, but must not be presented as a real source-download/compiler end-to-end update.

Successful `npm test` removes `dist/`. Run `npm run build:lib-only` afterward before `npm pack --dry-run`, or use the full `npm run build` to also install/build the demo. Run `npm run eslint`, `npm run prettier` and `git diff --check` separately.

## Maintainer Generation and C Tools

`vzic` emits ICS; `scripts/db-generator.js` converts it to JSON. The updater runs generation and source certification, not `npm test` or the npm build. Run the [data update guide](data_update.md)'s explicit checks after generation on a Linux development machine (a disposable environment is optional).

`src/vzic/Makefile` provides the upstream `test-vzic` target, requiring the libical development toolchain. Building that target is not equivalent to validating the entire generated dataset. Normal npm tests do not compile vzic. Real source generation, including selected-release zic/zdump and backzone comparison, is a separate explicit maintainer operation; report whether it was actually run.

Certification compares exact constant-offset partitions over the source interval and records finite per-name coverage. The offline guards validate committed release/database/evaluator consistency, not a fresh re-download or a claim that runtime ICU matches the selected release. No PR-triggered source-certification workflow is required.

## Demo Application

After building the root library, `cd demo && npm ci && npm run check && npm run build` checks Astro/types/lint/format and static-site compilation. Root `npm run build` also builds the demo but does not run its `check` command. There are no automated interactive UI tests; a successful build alone does not validate browser interaction.
