#!/bin/sh

# check for the latest time zone data package at https://www.iana.org/time-zones
# provide tzVersion (like 2023c) via argument: sudo sh update-tzdata.sh 2023c
if [ "$1" ]
then
  # prepare system
  sudo apt-get install -y --no-install-recommends make gcc pkg-config libglib2.0-dev
  npm install
  # load IANA data
  mkdir tzdata
  cd tzdata
  wget "https://data.iana.org/time-zones/releases/tzdata${1}.tar.gz"
  tar -xf "tzdata${1}.tar.gz"
  cd ..
  # create own database
  rm -r api
  sudo make -B
  sudo ./vzic
  node generator.js
  # clean up
  find ./api -type l -delete 
  rm ./api/zones.h
  rm ./api/zones.tab
  rm -r tzdata
else
  echo "no version given"
fi

# mind to run `npm run build` afterwards to not only update the database, but the whole tool!
