'use strict';

const { src, dest } = require('gulp')
const { srcPath, buildPath } = require('../config')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const styleLinter = require('gulp-stylelint')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')
const eol = require('gulp-eol')

module.exports = function styles() {
  if (process.env.NODE_ENV === 'prod') {
    return src(srcPath + '/styles/*.{scss,sass}')
      .pipe(plumber())
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .pipe(autoprefixer(['last 4 versions'], { cascade: true }))
      .pipe(eol())
      .pipe(styleLinter({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ],
        fix: true
      }))
      .pipe(dest(buildPath + '/css'))
  } else {
    return src(srcPath + '/styles/*.{scss,sass}')
      .pipe(plumber())
      .pipe(styleLinter({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true
          }
        ]
      }))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(dest(buildPath + '/css'))
  }
}
