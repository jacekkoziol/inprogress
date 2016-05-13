'use strict';

var templatesTask = function (gulp, plugins, config, informer) {
  gulp.task('templates', function () {
    var src = [config.paths.src + '/templates/*.{twig,html}'];
    var dest = config.paths.dest;

    var stream = gulp.src(src)
      .pipe(plugins.plumber(informer.onError))
      .pipe(plugins.data(function () {
        return require('../../' + config.paths.src + '/data.json');
      }))
      .pipe(plugins.twig({ errorLogToConsole: true, cache: false }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true, extra_liners: [] }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};

module.exports = templatesTask;
