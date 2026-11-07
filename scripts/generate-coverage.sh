#!/bin/sh
# Run from the repository root, using the update's already extracted sources.
set -eu
version=$1
source_dir=$(cd "$2" && pwd)
output=$3
test "$(cat "$source_dir/version")" = "$version"
make -s -C "$source_dir" zic zdump
make -s -C "$source_dir" PACKRATDATA=backzone PACKRATLIST= tzdata.zi
mkdir "$source_dir/offset-zones"
"$source_dir/zic" -b fat -d "$source_dir/offset-zones" "$source_dir/tzdata.zi"
python3 scripts/source-offsets.py "$source_dir/offset-zones" "$source_dir" "$version" "$source_dir/source-offsets.json"
node scripts/certify-offsets.cjs "$source_dir/source-offsets.json" "$source_dir" "$version" "$output"
