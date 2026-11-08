// Offline binding of committed coverage to its data, evaluator and IANA release.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function verifyCoverage(root = process.cwd()) {
  const read = (file) => fs.readFileSync(path.join(root, file));
  const coverage = JSON.parse(read('src/db/offset-coverage.json'));
  const { tzdataVersion } = JSON.parse(read('package.json'));
  if (
    typeof tzdataVersion !== 'string' ||
    !/^[0-9]{4}[a-z0-9]{0,2}$/.test(tzdataVersion) ||
    coverage.tzdataVersion !== tzdataVersion ||
    coverage.source !== `https://data.iana.org/time-zones/releases/tzdata${tzdataVersion}.tar.gz` ||
    coverage.code !== `https://data.iana.org/time-zones/releases/tzcode${tzdataVersion}.tar.gz` ||
    !coverage.configuration.startsWith(`zic ${tzdataVersion};`) ||
    !/^[a-f0-9]{64}$/.test(coverage.sourceSha256) ||
    !/^[a-f0-9]{64}$/.test(coverage.codeSha256)
  )
    throw new Error('Offset coverage must be recertified: IANA version/provenance');
  for (const [file, expected] of [
    ['src/db/zonesdb.json', coverage.databaseSha256],
    ['src/bundled-offset.ts', coverage.evaluatorSha256],
  ]) {
    const actual = crypto.createHash('sha256').update(read(file)).digest('hex');
    if (actual !== expected) throw new Error('Offset coverage must be recertified: ' + file);
  }
}
module.exports = { verifyCoverage };
