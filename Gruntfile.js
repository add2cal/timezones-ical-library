const initCodeDelimiter = /\/\/ START INIT[\s\S]*?\/\/ END INIT/g;

function prepareExport(content, exportPhrase) {
  return content.replace(initCodeDelimiter, `${exportPhrase} { tzlib_get_ical_block };`);
}

module.exports = function (grunt) {
  // The config.
  grunt.initConfig({
    // update version. Either use via `npm run release -- patch` (default), `npm run release -- minor`, `npm run release -- major`, or `npm run release -- x.x.x` (with x.x.x being the exact version number)
    version: {
      package: {
        src: ['package.json'],
      },
      js: {
        options: {
          prefix: 'Version.=..',
        },
        src: ['tzlib.js'],
      },
    },
    // cleans old built files
    clean: {
      oldBuildFiles: [
        'npm_dist/',
      ],
    },
    // creates the source files for the npm versionm supporting CommonJS and ES Module (https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)
    copy: {
      mjs_dist: {
        src: 'tzlib.js',
        dest: 'npm_dist/mjs/index.js',
        options: { process: (content) => prepareExport(content, 'export') },
      },
      cjs_dist: {
        src: 'tzlib.js',
        dest: 'npm_dist/cjs/index.js',
        options: { process: (content) => prepareExport(content, 'module.exports =') },
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
    },
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-version');

  // Register task(s).
  grunt.registerTask('default', ['clean']);
  grunt.registerTask('npm', ['clean', 'copy', 'file-creator']);
  grunt.registerTask('cleanNpm', ['clean:npmFolder']);
};
