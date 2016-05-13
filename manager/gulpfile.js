'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: ['*']});

var config = require('./package.json').config;
var informer = require('./gulp/informer')(gulp, plugins, config);

/**
 * Batch plugins loader
 */
plugins.glob.sync('gulp/tasks/*').forEach(function (path) {
  path = path.replace('gulp/', './gulp/');
  require(path)(gulp, plugins, config, informer);
});

/**
 * Build task
 */
gulp.task('build', function () {
  plugins.del(config.paths.dest).then(function () {
    gulp.start([
      'icons',
      'svgstore',
      'assets',
      'libraries',
      'scripts',
      'styles',
      'modernizr',
      'templates'
    ]);
  });
});

/**
 *  Default task 
 */
gulp.task('default', function () {
  plugins.browserSync.init({
    server: './'
  });
  
  gulp.watch(config.paths.src + '/icons/*.svg', ['icons']);
  gulp.watch(config.paths.src + '/svg/*.svg', ['svgstore']);
  gulp.watch(config.paths.src + '/styles/**/*', ['styles']);
  gulp.watch([config.paths.src + '/scripts/**/*', '!' + config.paths.src + '/scripts/plugins.js'], ['scripts']);
  gulp.watch(config.paths.src + '/scripts/plugins.js', ['libraries']);
  gulp.watch(config.paths.src + '/{images,videos,fonts}/**/*.*', ['assets']);
  gulp.watch([config.paths.src + '/templates/**/*.{twig,html}', config.paths.src + '/data.json'], ['templates']);
});