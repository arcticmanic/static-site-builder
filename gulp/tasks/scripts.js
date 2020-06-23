'use strict';

const { src, dest } = require('gulp')
const { srcPath, buildPath } = require('../config')
const plumber = require('gulp-plumber')

module.exports = function scripts() {
  return src(srcPath + '/scripts/*.js')
    .pipe(plumber())
    .pipe(dest(buildPath + '/js'))
}
