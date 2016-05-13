'use strict';

var stylesTask = function (gulp, plugins, config, informer) {
  gulp.task('styles', function () {
    var src = config.paths.src + '/styles/main.{scss,css}';
    var dest = config.paths.dest + '/styles';

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')()
    ];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(informer.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: [config.paths.src + '/bower_components'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.minifyCss({ keepSpecialComments: 1 }))
      .pipe(gulp.dest(dest))
      .pipe(plugins.browserSync.stream());

    return stream;
  });
};

module.exports = stylesTask;
