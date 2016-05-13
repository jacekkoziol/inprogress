'use strict';

var scriptsTask = function (gulp, plugins, config, informer) {
  gulp.task('scripts', function () {
    var dest = config.paths.dest + '/scripts';

    var stream = gulp.src(config.paths.src + '/scripts/main.js')
      .pipe(plugins.plumber(informer.onError))
      .pipe(plugins.browserify())
      .pipe(gulp.dest(dest));

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }))
      .pipe(gulp.dest(dest))
      .on('end', function () {
        plugins.browserSync.reload();

        gulp.src(config.paths.src + '/scripts/**/*.js')
          .pipe(plugins.jshint('.jshintrc'))
          .pipe(plugins.jshint.reporter('default'));
      });

    return stream;
  });
};

module.exports = scriptsTask;
