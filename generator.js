const fs = require('fs');
const glob = require('glob');

const files = glob.sync('./zoneinfo/**/*.ics');
const zones = {};

for (const zone of files) {
  const name = zone.replace('./zoneinfo/', '').replace('.ics', '');

  zones[name] = `${name}.ics`;

  if (name.match(/^Etc\/*/)) {
    const match = name.match(/^Etc\/(.*)/);
    zones[match[1]] = zones[name];
  }

  if (name.includes('_')) {
    zones[name.replace('_', ' ')] = zones[name];
  }
}

fs.writeFileSync('./zoneinfo.js', 'module.exports = {\n');

// eslint-disable-next-line guard-for-in
for (const index in zones) {
  fs.writeFileSync('./zoneinfo.js', `  '${index}': '${zones[index]}',\n`, {flag: 'a'});
}

fs.writeFileSync('./zoneinfo.js', '};\n', {flag: 'a'});