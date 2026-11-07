# Data Update Guide

## Explicit Maintainer Operation

Run on a Linux development machine with Node.js/npm, sudo, apt-get, git, wget and tar available. A disposable environment may be used but is not required. The script installs make, GCC, pkg-config, libical/GLib development packages and Python 3 with apt-get, and runs `npm install`. This changes system packages and generated repository files; it is not a normal PR build/test command. Do not run it on a live production server.

1. Select an official IANA release. Substitute it for `2026e` below; the example is not an automatic latest-version lookup. Start with a clean checkout and no leftover `src/vzic/tzdata/` or `src/vzic/output/` from an interrupted update.
2. From the repository root, run:

   ```bash
   sudo sh scripts/update-tzdata.sh 2026e
   ```

3. Inspect the resulting database, coverage, static API and `package.json` diff. `tzdataVersion` identifies the generated IANA release; the npm package `version` is not automatically bumped.
4. Run the checks explicitly; the updater does not run `npm test` or the npm build:

   ```bash
   npm test
   npm run eslint
   npm run prettier
   npm run build
   npm pack --dry-run
   git diff --check
   ```

   `npm test` removes `dist/` after testing, so build afterward before inspecting/packing the package. The full build also installs the demo's lockfile dependencies and builds the static site. `npm run build:lib-only` is available for library-only verification.

5. Review all generated differences before committing. Do not hand-edit coverage digests to make checks pass.

## Generation Order and Certification

- The selected tzdata archive is downloaded once and reused for VTIMEZONE generation and historical comparison. Matching tzcode is downloaded once into the same source directory; both extracted version declarations are checked.
- Existing `src/db/` is removed entirely before generation, including obsolete outputs and previous certification. `vzic` emits ICS; `scripts/db-generator.js` replaces the database/overview JSON, including pre-existing files on a direct generator rerun.
- `scripts/generate-coverage.sh` builds release-matched zic/zdump and backzone-aware source data (`PACKRATDATA=backzone`, empty `PACKRATLIST`). Python enumerates source partitions; the Node certifier compares exact source/bundle transition boundaries over 1800-01-01 through 2101-01-01, not runtime ICU samples.
- Only per-requested-name continuous matching tails are certified, with two-day wall-time margins and a finite exclusive end. Missing or unresolved histories remain uncertified. Metadata includes source URLs/archive hashes, database/evaluator hashes and the selected release.
- Certification is staged inside `src/vzic/tzdata/` before cleanup. Symlinks are converted to actual API files and `demo/public/api/` is replaced. Coverage is then moved into `src/db/`, `tzdataVersion` is recorded, and extracted sources are removed after success.
- Ordinary PR builds/tests verify committed coverage offline. They do not download IANA archives or regenerate source certification. Coverage reflects that release, not future legislation or a freshness guarantee.

## Failure and Retry

The updater fails fast, but is not transactional. A failed generation/certification does not advance `tzdataVersion`; old coverage has already been removed if database regeneration started. Database/API files may be partial and source/build directories may remain. Do not publish that state or restore stale certification over new data.

Inspect or discard the partial generated changes and the exact `src/vzic/tzdata/` and `src/vzic/output/` leftovers before a full retry in a clean checkout. The full updater uses plain `mkdir` for its source directory, so an interrupted directory cannot simply be reused by rerunning it. Direct JSON-generator replacement tests do not prove that the entire updater is resumable.

See the [testing guide](testing.md) for the distinction between offline regressions, stubbed integration and an actual privileged source-generation run. For refreshing upstream vzic as well, use the [vzic update guide](vzic_update.md).
