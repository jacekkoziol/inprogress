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
 *  Default task 
 */
gulp.task('default', function () {
  plugins.browserSync.init({
    server: './'
  });
});