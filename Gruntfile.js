const fs = require('fs');
const tzDbPlaceholder = /let tzlibZonesDB,(\s)*tzlibZonesDetailsDB = {};/gm;
const exportCodePlaceholder = /\/\/ PLACE EXPORT HERE/g;
const zoneNamesPlaceholder = /\['%%PLACE ZONE NAMES HERE%%'\]/g;
const tzDbContent = fs.readFileSync('./src/zonesdb.js', 'utf-8');
const tzNamesList = fs.readFileSync('./api/zones.json', 'utf-8');

function prepareFinalFile(content, exportPhrase = '') {
  let newContent = content.replace(tzDbPlaceholder, tzDbContent).replace(zoneNamesPlaceholder, tzNamesList);
  if (exportPhrase != '') {
    newContent = newContent.replace(
      exportCodePlaceholder,
      `${exportPhrase} { tzlib_get_ical_block, tzlib_get_offset, tzlib_get_timezones };`
    );
  } else {
    newContent = newContent.replace(exportCodePlaceholder, '');
  }
  return newContent;
}

module.exports = function (grunt) {
  // The config.
  grunt.initConfig({
    // update version. Either use via `npm run release -- patch` (default), `npm run release -- minor`, `npm run release -- major`, or `npm run release -- x.x.x` (with x.x.x being the exact version number)
    version: {
      package: {
        src: ['package.json'],
      },
      demoHtml: {
        options: {
          prefix: '.(tiny-version">v|.?v=)',
        },
        src: ['index.html'],
      },
      generatorJS: {
        options: {
          prefix: 'Version:.',
        },
        src: ['generator.js'],
      },
      mainJS: {
        options: {
          prefix: 'Version.=..',
        },
        src: ['src/tzlib.js'],
      },
    },
    // cleans old built files
    clean: {
      oldBuildFiles: [
        'npm_dist/',
        'dist/',
        'demo_assets/css/*.min.css',
        'demo_assets/css/*.min.css.map',
        'demo_assets/js/*.js.css',
        'demo_assets/js/*.min.js.map',
      ],
    },
    // minifies the css file
    cssmin: {
      options: {
        sourceMap: true,
      },
      minify: {
        files: [
          {
            expand: true,
            cwd: 'demo_assets/css',
            src: ['*.css', '!*.min.css'],
            dest: 'demo_assets/css',
            ext: '.min.css',
          },
        ],
      },
    },
    // creates the source files for the npm versionm supporting CommonJS and ES Module (https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)
    copy: {
      plain_dist: {
        src: 'src/tzlib.js',
        dest: 'dist/tzlib.js',
        options: { process: (content) => prepareFinalFile(content) },
      },
      mjs_dist: {
        src: 'src/tzlib.js',
        dest: 'npm_dist/mjs/index.js',
        options: { process: (content) => prepareFinalFile(content, 'export') },
      },
      cjs_dist: {
        src: 'src/tzlib.js',
        dest: 'npm_dist/cjs/index.js',
        options: { process: (content) => prepareFinalFile(content, 'module.exports =') },
      },
    },
    'file-creator': {
      'package.json ES Module': {
        'npm_dist/mjs/package.json': function (fs, fd, done) {
          fs.writeSync(fd, '{ "type": "module" }');
          done();
        },
      },
      'package.json commonJS': {
        'npm_dist/cjs/package.json': function (fs, fd, done) {
          fs.writeSync(fd, '{ "type": "commonjs" }');
          done();
        },
      },
      '.eslintrc.json commonJS': {
        'npm_dist/cjs/.eslintrc.json': function (fs, fd, done) {
          fs.writeSync(
            fd,
            '{ "extends": "../../.eslintrc.json", "env": { "node": true }, "plugins": ["commonjs"] }'
          );
          done();
        },
      },
    },
    // minifies the main js file
    uglify: {
      options: {
        compress: true,
        mangle: true,
        sourceMap: true,
      },
      newBuild: {
        files: {
          'dist/tzlib.min.js': ['dist/tzlib.js'],
          'demo_assets/js/demopage.min.js': ['demo_assets/js/demopage.js'],
        },
      },
    },
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-version');

  // Register task(s)
  grunt.registerTask('default', ['clean', 'cssmin', 'copy:plain_dist', 'uglify']);
  grunt.registerTask('npm', ['clean', 'cssmin', 'copy', 'file-creator', 'uglify']);
};
