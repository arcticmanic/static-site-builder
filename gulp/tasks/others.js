'use strict';

const { src, dest } = require('gulp')
const { srcPath, buildPath } = require('../config')

module.exports = function others() {
  return src(srcPath + '/static/*')
    .pipe(dest(buildPath))
}
