const { execSync, spawnSync } = require('child_process');

const testCases = [
  'CST6CDT',
  'GMT0',
  'Europe/Berlin',
  'America/New_York',
  'America/Argentina/Buenos_Aires',
  'Antarctica/Casey',
  'Africa/Bangui',
];

const apiDir = './demo/public/api'; // relative to root

try {
  execSync('npm run build:lib-only', { stdio: [0, 1, 2] });

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

  const fs = require('fs');
  const dirToDrop = 'dist';
  fs.rm(dirToDrop, { recursive: true }, (error) => {
    if (error) {
      throw error;
    }
    console.log(`... ${dirToDrop} directory deleted again`);
    console.log('\n🎉 All Tests SUCCESSFUL!\n');
  });
  // eslint-disable-next-line no-unused-vars
} catch (error) {
  console.error('\n😭 FAILED: Tests did not pass unfortunately.\n');
}
