#!/bin/sh
set -eu

# check for the latest time zone data package at https://www.iana.org/time-zones
# provide tzVersion (like 2026e) via argument: sh scripts/update-tzdata.sh 2026e
# provide "true" as second argument to also refresh vzic tool (not needed normally): sh scripts/update-tzdata.sh 2026e true

API_DIR="../../demo/public/api"

. ./scripts/maintainer-env.sh

if [ "${1:-}" ]
then
  # validate tzVersionNumber: must start with a 4-digit year, max 6 characters, only [a-z0-9]
  if ! echo "$1" | grep -Eq '^[0-9]{4}[a-z0-9]{0,2}$'; then
    echo "❌ Error: invalid tzVersionNumber '$1'."
    echo "   It must start with a 4-digit year and be at most 6 characters long, using only lowercase letters and digits (e.g. 2026e)."
    exit 1
  fi
  # validate rebuildVzic: must be "true" or "false" (if provided)
  if [ -n "${2:-}" ] && [ "$2" != "true" ] && [ "$2" != "false" ]; then
    echo "❌ Error: invalid rebuildVzic value '$2'."
    echo "   It must be either 'true' or 'false' (or omitted)."
    exit 1
  fi
  echo "👉 Updating ..."
  # prepare system
  echo "⚙️ Installing build dependencies..."
  maintainer_host
  require_tool node 'Install Node.js/npm before running the updater.'
  require_tool npm 'Install Node.js/npm before running the updater.'
  require_tool tar 'Install tar before running the updater.'
  if ! command -v curl >/dev/null 2>&1 && ! command -v wget >/dev/null 2>&1; then
    maintainer_error 'Missing downloader; install curl or wget before running the updater.'
  fi
  if [ "${2:-}" = true ] || [ ! -d src/vzic ]; then
    require_tool git 'Install git before refreshing vzic.'
  fi
  install_maintainer_dependencies
  maintainer_tools
  npm install
  cd src
  # update vzic tool if requested or no vzic folder exists
  if [ "${2:-}" = "true" ] || [ ! -d "vzic" ]
  then
    echo "🔄 Updating vzic tool ..."
    # clone repo from https://github.com/libical/libical
    rm -rf tmp_libical
    mkdir tmp_libical
    cd tmp_libical
    git clone -q https://github.com/libical/libical.git .
    # copy the content of the vzic folder to the parent directory
    cd ..
    rm -rf vzic
    mv tmp_libical/vzic vzic
    # clean up
    rm -rf tmp_libical
    # in the vzic folder, remove any file that is not "Makefile" or ends with ".c" or ".h" or ".pl" or ".md"
    cd vzic
    find . -type f ! -name 'Makefile' ! -name '*.c' ! -name '*.h' ! -name '*.pl' ! -name '*.md' -delete
    # Node is already required; avoid incompatible GNU/BSD sed -i dialects.
    node <<'NODE'
const fs = require('node:fs');
const makefile = fs.readFileSync('Makefile', 'utf8')
  .replace(/^TZID_PREFIX .*=.*$/m, 'TZID_PREFIX = ')
  .replace(/^PRODUCT_ID .*=.*$/m, 'PRODUCT_ID = ');
fs.writeFileSync('Makefile', makefile);
const source = fs.readFileSync('vzic-output.c', 'utf8');
const lines = source.split('\n').filter(line =>
  !line.includes('fprintf(fp, "BEGIN:VCALENDAR\\r\\nPRODID:%s\\r\\nVERSION:2.0\\r\\n", ProductID);') &&
  !line.includes('fprintf(fp, "END:VCALENDAR\\r\\n");') &&
  !line.includes('fprintf(fp, "X-LIC-LOCATION:%s\\r\\n", name);'));
const modified = lines.findIndex(line => line.includes('fprintf(fp, "LAST-MODIFIED:'));
if (modified === -1) throw new Error('Cannot locate vzic LAST-MODIFIED output; inspect upstream changes');
lines.splice(modified, 0, '    fprintf(fp, "X-LIC-LOCATION:%s\\r\\n", name);');
fs.writeFileSync('vzic-output.c', lines.join('\n'));
NODE
    cd ..
    echo "✅ vzic tool updated"
  else
    echo "ℹ️ Skipping vzic tool update"
  fi
  # load IANA data
  echo "📥 Downloading tzdata version $1 ..."
  cd vzic
  mkdir tzdata
  cd tzdata
  download_archive "https://data.iana.org/time-zones/releases/tzdata${1}.tar.gz" "tzdata${1}.tar.gz"
  tar -xf "tzdata${1}.tar.gz"
  # Reuse this data for both vzic and historical source certification.
  # Matching tzcode supplies zic/zdump and the backzone-aware source Makefile.
  test "$(cat version)" = "$1"
  download_archive "https://data.iana.org/time-zones/releases/tzcode${1}.tar.gz" "tzcode${1}.tar.gz"
  tar -xf "tzcode${1}.tar.gz"
  test "$(cat version)" = "$1"
  cd ..
  # create local database
  echo "🛠 Building local tzdata database and API ..."
  # Remove all previous database outputs, including obsolete files and coverage.
  rm -rf ../db
  mkdir ../db
  "$MAKE" -B -s CC="$CC" "LIBICAL_CFLAGS=$(pkg-config --cflags libical)" "LIBICAL_LDADD=$(pkg-config --libs libical)"
  ./vzic --olson-dir tzdata --output-dir output
  # create artificial aliases for common US timezone abbreviations that are
  # not part of the official IANA database (PT, MT, CT, ET) by symlinking
  # them to their closest top-level IANA equivalents
  echo "🔗 Creating artificial aliases (PT, MT, CT, ET) ..."
  cd output
  for pair in "PT:PST8PDT" "MT:MST7MDT" "CT:CST6CDT" "ET:EST5EDT"; do
    alias_name="${pair%%:*}"
    target_name="${pair##*:}"
    if [ -f "${target_name}.ics" ] && [ ! -e "${alias_name}.ics" ]; then
      ln -s "${target_name}.ics" "${alias_name}.ics"
      echo "  ${alias_name} -> ${target_name}"
    fi
  done
  cd ..
  cd ..
  node ../scripts/db-generator.js
  # Stage coverage before cleanup. A failed comparison must not publish metadata.
  (cd .. && sh scripts/generate-coverage.sh "$1" src/vzic/tzdata src/vzic/tzdata/offset-coverage.json)
  # convert symlinks to real files
  echo "🪄 Converting symlinks to real files ..."
  cd vzic
  cd output
  for f in *.ics; do
    if [ -L "$f" ]; then
      cp -L "$f" "$f.tmp"
      mv "$f.tmp" "$f"
    fi
  done
  cd ..
  # create API data (overview zones.json alrady created by generator.js)
  echo "✨ Creating API data ..."
  rm -rf "$API_DIR"
  mkdir "$API_DIR"
  # POSIX -R/-L also materializes nested alias links on BSD and GNU cp alike.
  cp -RL output/. "$API_DIR"/
  # move ../db/zones.json to ../../demo/public/api/zones.json
  mv ../db/zones.json "$API_DIR"/zones.json
  # clean up build
  echo "🧹 Cleaning up ..."
  rm -rf output
  # clean up API
  cd "$API_DIR"
  rm zones.h
  rm zones.tab
  cd ../../..
  mv src/vzic/tzdata/offset-coverage.json src/db/offset-coverage.json
  # Record the release only after all generation/API operations have succeeded.
  node - "$1" <<'NODE'
const fs = require('node:fs');
const file = 'package.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
data.tzdataVersion = process.argv[2];
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
NODE
  rm -rf src/vzic/tzdata
  echo "✅ Successfully updated to tzdata version $1"
else
  echo "❌ Error: no version given"
  exit 1
fi

# mind to run `npm run build` afterwards to not only update the database, but the whole tool!
