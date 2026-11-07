# System Architecture

## Overview

Maintainer-only source generation is separated from ordinary offline build/test checks and the zero-dependency JavaScript/TypeScript runtime.

## 1. Maintainer Data Generation

`scripts/update-tzdata.sh` downloads the selected IANA tzdata archive once. `vzic` parses it and emits VTIMEZONE `.ics` files; `scripts/db-generator.js` replaces the compact JSON database and zone overview. Previous `src/db/` contents, including obsolete files and coverage, are removed before regeneration. Static API files are replaced in `demo/public/api/`.

The same extracted release plus matching tzcode is used by `scripts/generate-coverage.sh`. Its `zic`/`zdump` build includes `PACKRATDATA=backzone` and an empty `PACKRATLIST`. `source-offsets.py` enumerates exact source offset partitions from 1800 through 2100, including POSIX-tail transitions. `certify-offsets.cjs` compares the union of source and bundled transition boundaries, not ICU samples. Only continuous matching tails are certified per requested name, with two-day wall-time margins and an exclusive end.

`src/db/offset-coverage.json` records ranges, uncertified names, release URLs, archive SHA-256 digests, database/evaluator digests and the IANA version. Coverage is staged before source cleanup; it and `package.json`'s `tzdataVersion` are finalized after API operations succeed. The npm package `version` is independent. Generation is not transactional: a failure can leave partial outputs, but must not advance the declared release or retain old certification.

This explicit flow installs system build dependencies on a Linux development machine; a disposable environment is optional. See the [data update guide](guides/data_update.md). Ordinary PR tests do not download IANA sources or regenerate certification.

## 2. Runtime Consumption

`src/tzlib.ts` exports `tzlib_get_ical_block`, `tzlib_get_offset` and `tzlib_get_timezones`. `scripts/build.js` creates CJS, ESM and two browser bundles. Its offline coverage guard rejects a mismatched committed database, evaluator or declared IANA release before compilation.

VTIMEZONE exports and static ICS remain compact recurring-rule summaries, not complete historical transition databases. Offset lookup in `src/offset.ts` uses this policy:

1. Within the requested name's certified date range, evaluate bundled rules using UTC arithmetic (`src/bundled-offset.ts`).
2. Outside coverage, use runtime `Intl.DateTimeFormat` history for the requested name. Only the artificial PT/MT/CT/ET abbreviations may inherit mapped-city history if ICU rejects them.
3. If runtime support is absent or fails, extrapolate the bundled rules as best effort. Historical accuracy outside certification is not guaranteed.

Coverage reflects the selected release, not future legislation. Runtime history depends on installed ICU/tzdata. The public signed `±HHMM` format truncates historical seconds toward zero to minutes. Folds select the earlier instant; gaps use the post-forward-jump offset. See the [API guide](guides/library-usage.md) for input validation and error behavior.

## Toolchain Dependencies

Maintainer generation needs make, GCC, pkg-config, libical/GLib development packages, Python 3, download/archive tools and Node.js/npm. Ordinary library builds need Node.js/npm development dependencies, not the C toolchain. The published runtime has no npm dependencies.
