'use strict';

var informer = function (gulp, plugins, config) {
  return {
    onError: function (error) {
      console.error(error.message + '\n');
      console.error(error.fileName + ':' + error.lineNumber + '\n');

      this.emit('end');
    }
  }
};

module.exports = informer;
