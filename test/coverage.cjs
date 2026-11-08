/* eslint-disable security/detect-non-literal-fs-filename -- paths are fixed test fixtures under a newly allocated temporary directory */
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { verifyCoverage } = require('../scripts/verify-coverage.cjs');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'tz-coverage-'));
try {
  for (const file of ['package.json', 'src/db/zonesdb.json', 'src/db/offset-coverage.json', 'src/bundled-offset.ts']) {
    const destination = path.join(root, file);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(file, destination);
  }
  verifyCoverage(root);
  for (const file of ['src/db/zonesdb.json', 'src/bundled-offset.ts', 'package.json']) {
    const destination = path.join(root, file);
    const original = fs.readFileSync(destination, 'utf8');
    fs.writeFileSync(destination, file === 'package.json' ? JSON.stringify({ ...JSON.parse(original), tzdataVersion: '2027a' }) : original + '\n');
    assert.throws(() => verifyCoverage(root), /Offset coverage must be recertified/);
    // Actual build entry point must fail before compiling, without a download.
    const build = spawnSync(process.execPath, [path.resolve('scripts/build.js')], { cwd: root, encoding: 'utf8' });
    assert.notEqual(build.status, 0);
    assert.match(build.stderr, /Offset coverage must be recertified/);
    fs.writeFileSync(destination, original);
  }
  const source = path.join(root, 'partitions.json');
  const output = path.join(root, 'coverage.json');
  fs.writeFileSync(source, JSON.stringify({ version: '2027a', zones: {} }));
  fs.writeFileSync(path.join(root, 'tzdata2027a.tar.gz'), 'data fixture');
  fs.writeFileSync(path.join(root, 'tzcode2027a.tar.gz'), 'code fixture');
  fs.writeFileSync(path.join(root, 'version'), '2027a\n');
  const certify = (version) => spawnSync(process.execPath, ['scripts/certify-offsets.cjs', source, root, version, output], { encoding: 'utf8' });
  const generated = certify('2027a');
  assert.equal(generated.status, 0, generated.stderr);
  const metadata = JSON.parse(fs.readFileSync(output, 'utf8'));
  assert.equal(metadata.tzdataVersion, '2027a');
  assert.equal(metadata.source, 'https://data.iana.org/time-zones/releases/tzdata2027a.tar.gz');
  assert.equal(metadata.code, 'https://data.iana.org/time-zones/releases/tzcode2027a.tar.gz');
  assert.match(metadata.configuration, /^zic 2027a;/);
  assert.equal(metadata.sourceSha256, crypto.createHash('sha256').update('data fixture').digest('hex'));
  assert.equal(metadata.codeSha256, crypto.createHash('sha256').update('code fixture').digest('hex'));
  assert.notEqual(certify('2027b').status, 0, 'mismatched source version must fail');
  console.log('Offline coverage guards and selected-release provenance pass');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
