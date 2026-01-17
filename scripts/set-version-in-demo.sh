#!/bin/sh

# get the version from package.json and set it in the demo Astro file for version display
sed_inplace() {
	if [ "$(uname)" = "Darwin" ]; then
		sed -i '' "$@"
	else
		sed -i "$@"
	fi
}

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR=$(cd "$SCRIPT_DIR/.." && pwd)

VERSION=$(node -p "require('$ROOT_DIR/package.json').version")
echo "Setting version $VERSION in demo file..."
sed_inplace "s/<div>.*<\/div>/<div>v$VERSION<\/div>/" "$ROOT_DIR/demo/src/components/Version.astro"
echo "Done."