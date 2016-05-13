'use strict';

var librariesTask = function (gulp, plugins, config, informer) {
  gulp.task('libraries', function () {
    var dest = config.paths.dest + '/scripts';
console.log('run libraries');
    var stream = gulp.src(config.paths.src + '/scripts/plugins.js')
      .pipe(plugins.plumber(informer.onError))
      .pipe(plugins.include())
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};

module.exports = librariesTask;
