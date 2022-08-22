#!/bin/sh

# provide tzVersion (like 2022c) via argument: sh update-tzdata.sh 2022c
if [ $1 ]
then
  sudo apt-get install -y --no-install-recommends make gcc pkg-config libglib2.0-dev
  rm -r tzdata
  mkdir tzdata
  cd tzdata
  wget "https://data.iana.org/time-zones/releases/tzdata${1}.tar.gz"
  tar -xf "tzdata${1}.tar.gz"
  make -B
  ./vzic
else
  echo "no version given"
fi