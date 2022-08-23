const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./zoneinfo/**/*.ics');
const tz = {};

for (const zone of files) {
  const name = zone.replace('./zoneinfo/', '').replace('.ics', '');
  tz[name] = fs.readFileSync(`./zoneinfo/${name}.ics`, 'utf-8').replace(/\r\n$/, '').replace(/\r\n/g, '<br>').replace(/.ics$/, '').replace(/\.\.\//g, '');
}

const tzlibDBFile = './src/zonesdb.js';
fs.writeFileSync(tzlibDBFile, 'const tzlibZonesDB = {\n');
for (const index in tz) {
  fs.writeFileSync(tzlibDBFile, `'${index}': '${tz[index]}',\n`, {flag: 'a'});
}
fs.writeFileSync(tzlibDBFile, '};\n', {flag: 'a'});