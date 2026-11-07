// Compare exact constant-offset partitions, including all source and bundle
// transition instants. No Intl comparison or calendar-date sampling is used.
const fs = require('node:fs');
const crypto = require('node:crypto');
const vm = require('node:vm');
const esbuild = require('esbuild');
const [sourcePath, archiveDirectory, outputPath] = process.argv.slice(2);
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const db = require('../src/db/zonesdb.json');
const moduleObject = { exports: {} };
vm.runInNewContext(esbuild.buildSync({ entryPoints: ['src/bundled-offset.ts'], bundle: true, write: false, format: 'cjs' }).outputFiles[0].text, { module: moduleObject, exports: moduleObject.exports });
const { bundled_model } = moduleObject.exports;
const expand = (text) => {
  for (const [short, full] of Object.entries({ '<n>': '<br>', '<bs>': 'BEGIN:STANDARD', '<es>': 'END:STANDARD', '<bd>': 'BEGIN:DAYLIGHT', '<ed>': 'END:DAYLIGHT', '<of>': 'TZOFFSETFROM:', '<ot>': 'TZOFFSETTO:', '<s>': 'DTSTART:', '<r>': 'RRULE:', '<tz>': 'TZNAME:' })) text = text.replaceAll(short, full);
  return text;
};
const models = db.details.map((detail) => bundled_model(expand(detail)));
const start = Date.UTC(1800, 0, 1);
const end = Date.UTC(2101, 0, 1);
const day = 86400000;
const groups = new Map();
const unresolved = [];
let certified = 0;
function walk(node, prefix = '') {
  for (const [key, entry] of Object.entries(node)) {
    const name = prefix + key;
    if (!Array.isArray(entry)) {
      walk(entry, name + '/');
      continue;
    }
    const model = models[entry[1]];
    const points = source[name];
    if (points?.some(([, offset]) => Math.abs(offset) >= day)) throw new Error('Source offset exceeds certification margin: ' + name);
    if (!model || !points || points[0][0] !== start) {
      unresolved.push(name);
      continue;
    }
    const bundleEvents = model.transitions(1798, 2101).filter(([when]) => when >= start && when < end);
    const boundaries = [...new Set([start, end, ...points.map(([when]) => when), ...bundleEvents.map(([when]) => when)])].sort((a, b) => a - b);
    let lastMismatchEnd = start;
    let sourceIndex = 0;
    for (let i = 0; i < boundaries.length - 1; i++) {
      const when = boundaries[i];
      while (sourceIndex + 1 < points.length && points[sourceIndex + 1][0] <= when) sourceIndex++;
      if (model.at(when) !== points[sourceIndex][1]) lastMismatchEnd = boundaries[i + 1];
    }
    // Certify only a continuous matching tail. Two days on either side keep
    // wall-time candidates (including gaps/folds and date-line jumps) inside it.
    const lower = Math.ceil((lastMismatchEnd + 2 * day) / day) * day;
    const upper = end - 2 * day;
    if (lower >= upper) {
      unresolved.push(name);
      continue;
    }
    const keyRange = new Date(lower).toISOString().slice(0, 10) + '/' + new Date(upper).toISOString().slice(0, 10);
    if (!groups.has(keyRange)) groups.set(keyRange, []);
    groups.get(keyRange).push(name);
    certified++;
  }
}
walk(db.db);
const digest = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const data = {
  source: 'https://data.iana.org/time-zones/releases/tzdata2026e.tar.gz',
  sourceSha256: digest(archiveDirectory + '/tzdata2026e.tar.gz'),
  code: 'https://data.iana.org/time-zones/releases/tzcode2026e.tar.gz',
  codeSha256: digest(archiveDirectory + '/tzcode2026e.tar.gz'),
  configuration: 'zic 2026e; PACKRATDATA=backzone; PACKRATLIST=; UTC exact-transition partition comparison 1800-01-01/2101-01-01; two-day wall-time margins',
  databaseSha256: digest('src/db/zonesdb.json'),
  evaluatorSha256: digest('src/bundled-offset.ts'),
  ranges: [...groups].sort(([a], [b]) => a.localeCompare(b)).map(([range, names]) => [...range.split('/'), names.sort().join('|')]),
  uncertified: unresolved.sort(),
};
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2) + '\n');
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, '## Source-certified offset coverage\n\n```json\n' + JSON.stringify(data, null, 2) + '\n```\n');
if (process.env.GITHUB_ACTIONS) {
  const text = JSON.stringify(data);
  for (let i = 0; i < text.length; i += 3000) console.log(`::notice title=Coverage metadata part ${i / 3000 + 1}::` + text.slice(i, i + 3000));
}
console.log(JSON.stringify({ certified, uncertified: unresolved.length, ranges: groups.size, bytes: fs.statSync(outputPath).size }));
