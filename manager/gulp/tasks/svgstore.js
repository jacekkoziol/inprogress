'use strict';

var svgstoreTask = function (gulp, plugins, config, informer) {
  gulp.task('svgstore', function () {
    var src = config.paths.src + '/svg/*.svg';
    var dest = config.paths.dest + '/svg';
    var path = require('path');
    
    var stream = gulp.src(src)
      .pipe(plugins.plumber(informer.onError))
      .pipe(plugins.svgmin(function (file) {
        console.log();
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
      }))
      .pipe(plugins.svgstore())
      .pipe(plugins.rename({ basename: 'svgstore' }))
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);
      
    return stream;
  });
};

module.exports = svgstoreTask;