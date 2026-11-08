#!/bin/sh
# Shared by the explicit updater and source-coverage builder; never installs on sourcing.
maintainer_error() {
  printf 'Error: %s\n' "$*" >&2
  exit 1
}

require_tool() {
  command -v "$1" >/dev/null 2>&1 || maintainer_error "Missing prerequisite '$1'. $2"
}

maintainer_host() {
  case "$(uname -s)" in
    Darwin)
      require_tool brew 'Install Homebrew yourself, then rerun as your ordinary user.'
      [ "$(id -u)" != 0 ] || maintainer_error 'Do not run Homebrew or the updater as root; rerun without sudo.'
      MAINTAINER_MANAGER=brew
      ;;
    Linux)
      if command -v apt-get >/dev/null 2>&1; then
        MAINTAINER_MANAGER=apt-get
      elif command -v apk >/dev/null 2>&1; then
        MAINTAINER_MANAGER=apk
      else
        maintainer_error 'Unsupported Linux package manager; use Debian/Ubuntu (apt-get) or Alpine (apk).'
      fi
      ;;
    *) maintainer_error 'Unsupported host; use macOS with Homebrew, Debian/Ubuntu or Alpine.' ;;
  esac
}

linux_install() {
  if [ "$(id -u)" = 0 ]; then
    "$@"
  else
    require_tool sudo 'Install the Linux build prerequisites as root, or provide sudo for package installation only.'
    sudo "$@"
  fi
}

install_maintainer_dependencies() {
  case "$MAINTAINER_MANAGER" in
    brew) brew install make pkg-config libical glib python || maintainer_error 'Homebrew dependency installation failed; resolve its diagnostic before retrying.' ;;
    apt-get)
      linux_install apt-get update || maintainer_error 'apt-get package index refresh failed; resolve repository, network or permission diagnostics before retrying.'
      linux_install apt-get install -y --no-install-recommends build-essential pkg-config libical-dev libglib2.0-dev python3 || maintainer_error 'apt-get dependency installation failed after index refresh; check that configured distro repositories provide build-essential, pkg-config, libical-dev, libglib2.0-dev and python3, and resolve permission diagnostics before retrying.'
      ;;
    apk) linux_install apk add --no-cache build-base pkgconf libical-dev glib-dev python3 || maintainer_error 'apk dependency installation failed; check repositories and permissions before retrying.' ;;
  esac
}

maintainer_tools() {
  if [ "$MAINTAINER_MANAGER" = brew ]; then
    # Homebrew's GNU make is gmake; its libraries may be outside /usr/local (Apple Silicon).
    MAKE=gmake
    brew_prefix=$(brew --prefix)
    PATH="$brew_prefix/bin:$PATH"
    glib_prefix=$(brew --prefix glib)
    ical_prefix=$(brew --prefix libical)
    PKG_CONFIG_PATH="$glib_prefix/lib/pkgconfig:$ical_prefix/lib/pkgconfig${PKG_CONFIG_PATH:+:$PKG_CONFIG_PATH}"
    export PATH PKG_CONFIG_PATH
  else
    MAKE=make
  fi
  CC=${CC:-cc}
  require_tool "$MAKE" 'Install GNU make (Homebrew: make; Linux: build-essential/build-base).'
  require_tool "$CC" 'Install a C compiler (macOS: xcode-select --install; Linux: build-essential/build-base). CC must name one executable.'
  require_tool pkg-config 'Install pkg-config/pkgconf and the libical/GLib development packages.'
  pkg-config --exists glib-2.0 libical || maintainer_error 'pkg-config cannot find glib-2.0 and libical; check development packages and PKG_CONFIG_PATH.'
  require_tool python3 'Install Python 3.9 or newer with the standard-library zoneinfo module.'
  python3 -c 'import zoneinfo' || maintainer_error 'Python 3.9+ with zoneinfo is required; check which python3 is first on PATH.'
  export MAKE CC
}

download_archive() {
  if command -v curl >/dev/null 2>&1; then
    curl -fL --retry 3 -o "$2" "$1"
  elif command -v wget >/dev/null 2>&1; then
    wget -O "$2" "$1"
  else
    maintainer_error 'Missing downloader; install curl or wget before running the updater.'
  fi
}
