const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  console.log('Building...');

  // Clean dist
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist');
  fs.mkdirSync('dist/cjs', { recursive: true });
  fs.mkdirSync('dist/mjs', { recursive: true });

  const universalConfig = {
    entryPoints: ['src/tzlib.js'],
    bundle: true,
    minify: true,
    legalComments: 'inline',
    target: 'es2020',
    loader: {
      '.json': 'json',
    },
  };

  try {
    // 1. CommonJS (Node)
    await esbuild.build({
      ...universalConfig,
      outfile: 'dist/cjs/index.js',
      format: 'cjs',
    });
    fs.writeFileSync('dist/cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2));

    // 2. ESM (Node/Bundlers)
    await esbuild.build({
      ...universalConfig,
      outfile: 'dist/mjs/index.js',
      format: 'esm',
    });
    fs.writeFileSync('dist/mjs/package.json', JSON.stringify({ type: 'module' }, null, 2));

    // 3. Browser (IIFE + Global attach)
    const globalName = 'tzlib_tmp_scope';
    await esbuild.build({
      ...universalConfig,
      outfile: 'dist/tzlib.js',
      format: 'iife',
      globalName: globalName,
      footer: {
        js: `if(typeof window !== "undefined"){ for(var k in ${globalName}) window[k] = ${globalName}[k]; }`,
      },
    });

    console.log('Build finished successfully.');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

build();
