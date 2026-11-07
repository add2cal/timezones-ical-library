// Nonprivileged integration: no downloads, compiler, system install or real data changes.
/* eslint-disable security/detect-non-literal-fs-filename -- paths are fixed test fixtures under a newly allocated temporary directory */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tz-update-'));
const script = fs.readFileSync('scripts/update-tzdata.sh', 'utf8');
function write(file, text, executable = false) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text, { mode: executable ? 0o755 : 0o644 });
}
try {
  fs.mkdirSync(path.join(root, 'demo/public'), { recursive: true });
  write('scripts/update-tzdata.sh', script);
  write('scripts/generate-coverage.sh', fs.readFileSync('scripts/generate-coverage.sh', 'utf8'));
  write(
    'scripts/certify-offsets.cjs',
    `
const fs = require('node:fs');
const [source, directory, version, output] = process.argv.slice(2);
if (!fs.existsSync(directory + '/tzdata' + version + '.tar.gz') || JSON.parse(fs.readFileSync(source)).version !== version) process.exit(43);
fs.appendFileSync(process.env.UPDATE_LOG, 'certify ' + version + '\\n');
if (process.env.FAIL_CERTIFY === 'true') process.exit(42);
fs.writeFileSync(output, JSON.stringify({tzdataVersion: version}));
`,
  );
  write('scripts/db-generator.js', "require('fs').writeFileSync('db/zones.json', '{}');\n");
  write('src/vzic/vzic', '#!/bin/sh\nmkdir output\ntouch output/zones.h output/zones.tab output/Test.ics\nln -s Test.ics output/Alias.ics\n', true);
  write('bin/sudo', '#!/bin/sh\nif [ "$1" = apt-get ]; then exit 0; fi\nexec "$@"\n', true);
  write('bin/npm', '#!/bin/sh\nexit 0\n', true);
  write('bin/make', '#!/bin/sh\necho "$*" >> "$TOOL_LOG"\nif [ "${2:-}" = -C ]; then cp "$FAKE_ZIC" "$3/zic"; fi\n', true);
  write('bin/zic', '#!/bin/sh\ntest "$1" = -b && test "$2" = fat && test -d "$4"\n', true);
  write('bin/python3', '#!/bin/sh\nprintf \'{"version":"%s","zones":{}}\' "$4" > "$5"\n', true);
  write('bin/wget', '#!/bin/sh\necho "$1" >> "$UPDATE_LOG"\ntouch "${1##*/}"\n', true);
  write('bin/tar', '#!/bin/sh\nprintf "2027a\\n" > version\n', true);
  const env = { ...process.env, PATH: path.join(root, 'bin') + ':' + process.env.PATH, UPDATE_LOG: path.join(root, 'log'), TOOL_LOG: path.join(root, 'tools'), FAKE_ZIC: path.join(root, 'bin/zic'), FAIL_CERTIFY: 'false' };
  write('package.json', '{"version":"2.4.0","tzdataVersion":"2026e"}\n');
  const run = () => spawnSync('sh', ['scripts/update-tzdata.sh', '2027a'], { cwd: root, env, encoding: 'utf8' });
  const result = run();
  assert.equal(result.status, 0, result.stdout + result.stderr);
  const log = fs.readFileSync(env.UPDATE_LOG, 'utf8').trim().split('\n');
  assert.deepEqual(log, ['https://data.iana.org/time-zones/releases/tzdata2027a.tar.gz', 'https://data.iana.org/time-zones/releases/tzcode2027a.tar.gz', 'certify 2027a']);
  assert.match(fs.readFileSync(env.TOOL_LOG, 'utf8'), /PACKRATDATA=backzone PACKRATLIST= tzdata\.zi/);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).tzdataVersion, '2027a');
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).version, '2.4.0');
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'src/db/offset-coverage.json'))).tzdataVersion, '2027a');
  assert.equal(fs.existsSync(path.join(root, 'src/vzic/tzdata')), false);
  assert.equal(fs.lstatSync(path.join(root, 'demo/public/api/Alias.ics')).isSymbolicLink(), false);
  // Failure must stop before cleanup/publication, leaving the previous declaration intact.
  write('package.json', '{"version":"2.4.0","tzdataVersion":"2026e"}\n');
  const previousCoverage = fs.readFileSync(path.join(root, 'src/db/offset-coverage.json'), 'utf8');
  env.FAIL_CERTIFY = 'true';
  const failure = run();
  assert.notEqual(failure.status, 0);
  assert.equal(JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).tzdataVersion, '2026e');
  assert.equal(fs.readFileSync(path.join(root, 'src/db/offset-coverage.json'), 'utf8'), previousCoverage);
  assert.equal(fs.existsSync(path.join(root, 'src/vzic/tzdata/version')), true);
  assert.doesNotMatch(failure.stdout, /Successfully updated/);
  console.log('Selected-release maintainer wiring and failure ordering pass (stubbed tools)');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
