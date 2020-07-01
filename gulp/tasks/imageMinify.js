'use strict';

const { src, dest } = require('gulp')
const imageMin = require('gulp-imagemin')
const { srcPath, buildPath } = require('../config')

module.exports = function imageMinify() {
  return src(srcPath + '/img/*')
    .pipe(imageMin([
      imageMin.mozjpeg({
        quality: 70,
        progressive: true
      }),
      imageMin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(dest(buildPath + '/img'))
}
