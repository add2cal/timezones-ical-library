const { execSync, spawnSync } = require('child_process');

const testCases = ['CST6CDT', 'GMT0', 'Europe/Berlin', 'America/New_York', 'America/Argentina/Buenos_Aires', 'Antarctica/Casey', 'Africa/Bangui'];

const apiDir = './demo/public/api'; // relative to root
const packageVersion = require('../package.json').version;
const bundlePaths = ['dist/cjs/index.js', 'dist/mjs/index.js', 'dist/tzlib.js', 'dist/tzlib.min.js'];

try {
  execSync('node test/bundled-offsets.cjs', { stdio: [0, 1, 2] });
  execSync('node test/coverage.cjs && node test/maintainer-env.cjs && node test/update-tzdata.cjs', { stdio: [0, 1, 2] });
  execSync('npm run build:lib-only', { stdio: [0, 1, 2] });

  // The source header stays versionless; the package version is injected into every build artifact.
  const fs = require('fs');
  const expectedVersionLine = ` * Version: ${packageVersion}`;
  bundlePaths.forEach((bundlePath) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const bundle = fs.readFileSync(bundlePath, 'utf8');
    if (!bundle.includes(expectedVersionLine)) {
      throw new Error(`Missing package version in ${bundlePath}`);
    }
  });

  // Run offset assertions in separate processes so host-local Date behavior cannot hide regressions.
  for (const hostZone of ['UTC', 'America/New_York', 'Europe/Berlin', 'Pacific/Auckland']) {
    const result = spawnSync(process.execPath, ['test/offsets.cjs'], { encoding: 'utf8', env: { ...process.env, TZ: hostZone } });
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    if (result.status !== 0) throw new Error(`Offset regressions failed in host TZ=${hostZone}`);
  }

  const testCasesString = JSON.stringify(testCases);

  console.log('\n🏎️  Running Tests...');

  // Test ES Module import
  try {
    const result = spawnSync('node', ['test/load-module.mjs', testCasesString], { encoding: 'utf8' });
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.status !== 0 || (result.stderr && result.stderr.length > 0)) {
      throw new Error('Test script passed with errors');
    }
    console.log('✅ Importing the script as module and running tests\n');
  } catch (error) {
    console.error('❌ Something went wrong with testing the ES Module setup\n');
    throw error;
  }

  // Test CommonJS require
  try {
    const result = spawnSync('node', ['test/load-commonjs.cjs', testCasesString], { encoding: 'utf8' });
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.status !== 0 || (result.stderr && result.stderr.length > 0)) {
      throw new Error('Test script passed with errors');
    }
    console.log('✅ CommonJS init via require and running tests\n');
  } catch (error) {
    console.error('❌ Something went wrong with testing the CommonJS setup\n');
    throw error;
  }

  // Test whether there is an ics file per test case in the api folder
  console.log('\n⚙️  Testing for ics files in the API folder:\n');
  try {
    testCases.forEach((tz) => {
      const fs = require('fs');
      const path = `${apiDir}/${tz}.ics`;
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      if (!fs.existsSync(path)) {
        throw new Error(`🔴 Missing file for time zone ${tz} at API folder`);
      }
      console.log(`🟢 Found ics file for time zone ${tz} at API folder`);
    });
    console.log('✅ All time zones have a corresponding ics file in the API folder\n');
  } catch (error) {
    console.error(error.message);
    console.error('❌ Could not find all ics files in the API folder\n');
    throw error;
  }

  const dirToDrop = 'dist';
  fs.rm(dirToDrop, { recursive: true }, (error) => {
    if (error) {
      throw error;
    }
    console.log(`... ${dirToDrop} directory deleted again`);
    console.log('\n🎉 All Tests SUCCESSFUL!\n');
  });
} catch (_error) {
  console.error('\n😭 FAILED: Tests did not pass unfortunately.\n');
  process.exitCode = 1;
}
