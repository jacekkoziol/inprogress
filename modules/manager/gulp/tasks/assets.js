'use strict';

var assetsTask = function (gulp, plugins, config, informer) {
  gulp.task('assets', function () {
    var src = [config.paths.src + '/{images,videos,fonts}/**/*.*', '!**/.keep'];
    var dest = config.paths.dest;

    var stream = gulp.src(src)
      .pipe(plugins.newer(dest))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};

module.exports = assetsTask;