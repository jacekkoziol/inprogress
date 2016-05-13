'use strict';

var modernizrTask = function (gulp, plugins, config, informer) {
  gulp.task('modernizr', function () {
    var src = [config.paths.src + '/scripts/**/*.js', config.paths.src + '/styles/**/*.scss'];
    var dest = config.paths.dest + '/scripts';

    var stream = gulp.src(src)
      .pipe(plugins.modernizr('modernizr.min.js', {
        options : [
          "setClasses",
          "addTest",
          "html5printshiv",
          "testProp",
          "fnBind"
        ],
        tests : [
          "cssfilters",
          "flexbox"
        ]
      }))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(dest));

    return stream;
  });
};

module.exports = modernizrTask;
