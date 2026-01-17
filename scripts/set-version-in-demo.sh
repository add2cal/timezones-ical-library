#!/bin/sh

# get the version from package.json and set it in the demo Astro file where id="script-version"
VERSION=$(node -p "require('../package.json').version")
echo "Setting version $VERSION in demo file..."
sed -i '' "s/<div>.*<\/div>/<div>v$VERSION<\/div>/" ../demo/src/components/Version.astro
echo "Done."