#!/bin/sh

# check for the latest time zone data package at https://www.iana.org/time-zones
# provide tzVersion (like 2025c) via argument: sudo sh update-tzdata.sh 2025c
# provide "true" as second argument to also refresh vzic tool (not needed normally): sudo sh update-tzdata.sh 2025c true

sudo_sed_inplace() {
  if [ "$(uname)" = "Darwin" ]; then
    sudo sed -i '' "$@"
  else
    sudo sed -i "$@"
  fi
}

if [ "$1" ]
then
  echo "👉 Updating ..."
  # prepare system
  echo "⚙️ Installing build dependencies..."
  sudo apt-get install -y --no-install-recommends make gcc pkg-config libglib2.0-dev
  npm install
  cd src
  # update vzic tool if requested or no vzic folder exists
  if [ "$2" = "true" ] || [ ! -d "vzic" ]
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
    # in the vzic folder, remove any file that is not "Makefile" or ends with ".c" or ".h" or ".pl"
    cd vzic
    find . -type f ! -name 'Makefile' ! -name '*.c' ! -name '*.h' ! -name '*.pl' -delete
    # update file contents
    # in the Makefile, set TZID_PREFIX and PRODUCT_ID to empty
    sudo_sed_inplace 's/^TZID_PREFIX .*=.*$/TZID_PREFIX = /' Makefile
    sudo_sed_inplace 's/^PRODUCT_ID .*=.*$/PRODUCT_ID = /' Makefile
    # Fix unused argument warning by moving -L flag from CFLAGS to LDADD
    sudo_sed_inplace 's/ -L\/usr\/local\/lib64//' Makefile
    sudo_sed_inplace 's/^LIBICAL_LDADD = /LIBICAL_LDADD = -L\/usr\/local\/lib64 /' Makefile
    # in vzic-output.c, remove line "fprintf(fp, "BEGIN:VCALENDAR\r\nPRODID:%s\r\nVERSION:2.0\r\n", ProductID);" and "fprintf(fp, "END:VCALENDAR\r\n");"
    sudo_sed_inplace '/fprintf(fp, "BEGIN:VCALENDAR\\r\\nPRODID:%s\\r\\nVERSION:2.0\\r\\n", ProductID);/d' vzic-output.c
    sudo_sed_inplace '/fprintf(fp, "END:VCALENDAR\\r\\n");/d' vzic-output.c
    # in vzic-output.c, move "fprintf(fp, "X-LIC-LOCATION:%s\r\n", name);" before the line starting with "fprintf(fp, "LAST-MODIFIED:"
    sudo_sed_inplace -e '/fprintf(fp, "X-LIC-LOCATION:%s\\r\\n", name);/d' -e '/fprintf(fp, "LAST-MODIFIED:/i\
    fprintf(fp, "X-LIC-LOCATION:%s\\r\\n", name);' vzic-output.c
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
  wget "https://data.iana.org/time-zones/releases/tzdata${1}.tar.gz"
  tar -xf "tzdata${1}.tar.gz"
  cd ..
  # create local database
  echo "🛠 Building local tzdata database and API ..."
  rm -rf ../db
  mkdir ../db
  sudo make -B -s
  sudo ./vzic --olson-dir tzdata --output-dir output
  cd ..
  node db-generator.js
  # convert symlinks to real files
  echo "🪄 Converting symlinks to real files ..."
  cd vzic
  cd output
  for f in *.ics; do
    if [ -L "$f" ]; then
      cp --remove-destination "$f" "$f" 2>/dev/null
    fi
  done
  cd ..
  # create API data (overview zones.json alrady created by generator.js)
  echo "✨ Creating API data ..."
  rm -rf ../../api
  mkdir ../../api
  cp -r output/* ../../api/
  # move ../db/zones.json to ../../api/zones.json
  mv ../db/zones.json ../../api/zones.json
  # clean up build
  echo "🧹 Cleaning up ..."
  rm -rf output
  rm -rf tzdata
  # clean up API
  cd ../../api
  rm zones.h
  rm zones.tab
  cd ..
  echo "✅ Successfully updated to tzdata version $1"
else
  echo "❌ Error: no version given"
fi

# mind to run `npm run build` afterwards to not only update the database, but the whole tool!
