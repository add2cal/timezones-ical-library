const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

const entryPoint = path.resolve('src/tzlib.ts');
const versionPlaceholder = /^ \* Version:\s*$/gm;

const injectPackageVersion = {
  name: 'inject-package-version',
  setup(build) {
    build.onLoad({ filter: /tzlib\.ts$/ }, (args) => {
      if (path.resolve(args.path) !== entryPoint) {
        return undefined;
      }

      const source = fs.readFileSync(args.path, 'utf8');
      const placeholders = source.match(versionPlaceholder);

      if (placeholders?.length !== 1) {
        throw new Error('Expected exactly one "* Version:" placeholder in src/tzlib.ts');
      }

      return {
        contents: source.replace(versionPlaceholder, ` * Version: ${version}`),
        loader: 'ts',
      };
    });
  },
};

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
    entryPoints: ['src/tzlib.ts'],
    bundle: true,
    minify: true,
    legalComments: 'inline',
    target: 'es2022',
    plugins: [injectPackageVersion],
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
    const browserConfig = {
      ...universalConfig,
      format: 'iife',
      globalName: globalName,
      footer: {
        js: `if(typeof window !== "undefined"){ for(var k in ${globalName}) window[k] = ${globalName}[k]; }`,
      },
    };

    // 3a. Unminified
    await esbuild.build({
      ...browserConfig,
      outfile: 'dist/tzlib.js',
      minify: false,
    });

    // 3b. Minified
    await esbuild.build({
      ...browserConfig,
      outfile: 'dist/tzlib.min.js',
    });

    console.log('Build finished successfully.');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

build();
