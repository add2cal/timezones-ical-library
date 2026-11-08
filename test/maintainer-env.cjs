// Dispatch tests use a closed PATH: no real package manager, sudo, download or compiler can run.
/* eslint-disable security/detect-non-literal-fs-filename -- all paths are isolated test fixtures */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'maintainer-env-'));
const helper = path.resolve('scripts/maintainer-env.sh');
let counter = 0;
function run({ host = 'Linux', uid = '1000', manager = 'apt-get', missing = [], fail = '', downloader = 'curl', install = true } = {}) {
  const directory = path.join(root, String(counter++));
  const bin = path.join(directory, 'bin');
  const log = path.join(directory, 'log');
  fs.mkdirSync(bin, { recursive: true });
  const write = (name, body) => {
    if (!missing.includes(name)) fs.writeFileSync(path.join(bin, name), '#!/bin/sh\n' + body + '\n', { mode: 0o755 });
  };
  write('uname', `echo '${host}'`);
  write('id', `echo '${uid}'`);
  const logged = 'printf "%s\\n" "$0 $*" >> "$LOG"';
  if (manager) {
    write(manager, `${logged}\nif [ "$1" = --prefix ]; then printf '%s\\n' "$BREW_PREFIX"; elif [ "$1" = update ]; then [ "$FAIL" != update ]; else [ "$FAIL" != install ]; fi`);
  }
  write('sudo', `${logged}\ncase "$1" in apt-get|apk) exec "$@" ;; *) exit 91 ;; esac`);
  write('make', logged);
  write('gmake', logged);
  write('cc', logged);
  write('pkg-config', `${logged}\n[ "$FAIL" != pkg-config ]`);
  write('python3', `${logged}\n[ "$FAIL" != python ]`);
  if (downloader) write(downloader, logged);
  const command = `. "$HELPER"; maintainer_host; ${install ? 'install_maintainer_dependencies;' : ''} maintainer_tools; download_archive https://example.invalid/archive.tar.gz archive.tar.gz; printf 'RESULT %s %s %s\\n' "$MAKE" "$CC" "\${PKG_CONFIG_PATH:-}"`;
  const result = spawnSync('/bin/sh', ['-ec', command], {
    encoding: 'utf8',
    env: { PATH: bin, LOG: log, HELPER: helper, FAIL: fail, BREW_PREFIX: directory, CC: 'cc' },
  });
  return { ...result, log: fs.existsSync(log) ? fs.readFileSync(log, 'utf8') : '' };
}
try {
  for (const manager of ['apt-get', 'apk']) {
    for (const uid of ['0', '1000']) {
      const result = run({ manager, uid, missing: uid === '0' ? ['sudo'] : [] });
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.log, manager === 'apk' ? /apk add --no-cache build-base pkgconf libical-dev glib-dev python3/ : /apt-get install -y --no-install-recommends build-essential pkg-config libical-dev libglib2.0-dev python3/);
      assert.equal(result.log.includes('/sudo '), uid !== '0');
      if (manager === 'apt-get') {
        assert.ok(result.log.indexOf('/apt-get update\n') < result.log.indexOf('/apt-get install '), 'refresh must precede installation');
        assert.match(result.log, /\/apt-get update\n/);
      } else {
        assert.doesNotMatch(result.log, /update/);
      }
      assert.doesNotMatch(result.log, /sudo (?:g?make|python3) /);
    }
  }
  const mac = run({ host: 'Darwin', manager: 'brew', missing: ['sudo'] });
  assert.equal(mac.status, 0, mac.stderr);
  assert.match(mac.log, /brew install make pkg-config libical glib python/);
  assert.match(mac.stdout, /RESULT gmake cc .*\/lib\/pkgconfig:.*\/lib\/pkgconfig/);
  assert.doesNotMatch(mac.log, /sudo/);
  const rootMac = run({ host: 'Darwin', manager: 'brew', uid: '0' });
  assert.notEqual(rootMac.status, 0);
  assert.match(rootMac.stderr, /without sudo/);
  assert.equal(rootMac.log, '', 'root must not invoke brew');
  for (const options of [{ host: 'Darwin', manager: null }, { manager: null }, { host: 'FreeBSD' }, { missing: ['sudo'] }, { missing: ['make'] }, { missing: ['cc'] }, { missing: ['pkg-config'] }, { missing: ['python3'] }, { fail: 'python' }, { fail: 'pkg-config' }, { downloader: null }]) {
    const result = run(options);
    assert.notEqual(result.status, 0, JSON.stringify(options));
    assert.match(result.stderr, /Error:/);
  }
  for (const [host, manager] of [
    ['Linux', 'apt-get'],
    ['Linux', 'apk'],
    ['Darwin', 'brew'],
  ]) {
    const failure = run({ host, manager, fail: 'install' });
    assert.notEqual(failure.status, 0);
    assert.doesNotMatch(failure.log, /\/pkg-config |python3 -c|curl -fL/);
  }
  for (const uid of ['0', '1000']) {
    const refreshFailure = run({ uid, fail: 'update', missing: uid === '0' ? ['sudo'] : [] });
    assert.notEqual(refreshFailure.status, 0);
    assert.match(refreshFailure.stderr, /apt-get.*refresh failed/);
    assert.match(refreshFailure.log, /\/apt-get update\n/);
    assert.equal(refreshFailure.log.includes('/sudo apt-get update'), uid !== '0');
    assert.doesNotMatch(refreshFailure.log, /apt-get install|\/pkg-config |python3 -c|curl -fL/);
  }
  const aptInstallFailure = run({ fail: 'install' });
  assert.match(aptInstallFailure.stderr, /configured.*repositories/);
  const wget = run({ downloader: 'wget' });
  assert.equal(wget.status, 0, wget.stderr);
  assert.match(wget.log, /wget -O archive.tar.gz https:\/\/example.invalid\/archive.tar.gz/);
  const standalone = run({ install: false });
  assert.equal(standalone.status, 0, standalone.stderr);
  assert.doesNotMatch(standalone.log, /apt-get|sudo/);
  console.log('Maintainer host, privilege, toolchain, downloader and fail-fast dispatch pass (closed-PATH stubs; not OS regeneration)');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
