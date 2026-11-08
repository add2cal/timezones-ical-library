# Data Update Guide

## Explicit Maintainer Operation

Use a development machine with Node.js/npm, tar and either curl or wget already available (curl is preferred). Git is required when refreshing vzic. A disposable environment may be used but is not required. Run from an ordinary user shell, never with whole-script sudo. The updater selects only these explicit host/package-manager paths:

- macOS: existing Homebrew, run without sudo and not as root. `brew install make pkg-config libical glib python` supplies GNU make (`gmake`) and libraries/Python. Install Apple's Command Line Tools yourself with `xcode-select --install` if `cc` is missing. Homebrew is not installed automatically. Its prefix and GLib/libical pkg-config directories are discovered, including Apple Silicon prefixes.
- Debian/Ubuntu: existing apt-get; `apt-get update` refreshes package indexes before `build-essential pkg-config libical-dev libglib2.0-dev python3` are installed. A failed refresh stops before installation or generation. If packages are still unavailable after refresh, check the configured distro repositories and package-manager diagnostics; no repositories are enabled automatically.
- Alpine: existing apk; `build-base pkgconf libical-dev glib-dev python3` are installed.

Only Linux package installation is elevated through sudo for non-root users. Already-root Linux environments execute the package manager directly and do not require sudo. Build tools, npm, source edits and generation are never prefixed with sudo. Unsupported hosts/managers and missing prerequisites fail with a diagnostic rather than guessing or bootstrapping a package manager. A failed package installation stops before generation. GNU make, a C compiler (`CC`, default `cc`, must name one executable), libical/GLib pkg-config discovery and Python 3.9+ with `zoneinfo` are checked before source downloads/database replacement. The script also runs `npm install`. This changes system packages and generated repository files; it is not a normal PR build/test command. Do not run it on a live production server.

Host/privilege dispatch is covered by Linux-executed stubs, not a complete macOS or Alpine regeneration. No full cross-platform source-generation validation is implied. Windows and other Linux package managers are not supported by this updater.

1. Select an official IANA release. Substitute it for `2026f` below; the example is not an automatic latest-version lookup. Start with a clean checkout and no leftover `src/vzic/tzdata/` or `src/vzic/output/` from an interrupted update.
2. From the repository root, run:

   ```bash
   sh scripts/update-tzdata.sh 2026f
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

See the [testing guide](testing.md) for the distinction between offline regressions, stubbed integration and an actual source-generation run with system dependency installation. For refreshing upstream vzic as well, use the [vzic update guide](vzic_update.md).
