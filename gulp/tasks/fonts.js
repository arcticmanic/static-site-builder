'use strict';

const { src, dest } = require('gulp')
const { srcPath, buildPath } = require('../config')

module.exports = function fonts() {
  return src(srcPath + '/fonts/*')
    .pipe(dest(buildPath))
}
