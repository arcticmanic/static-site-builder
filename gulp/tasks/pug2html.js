'use strict';

const { src, dest } = require('gulp')
const { srcPath, buildPath } = require('../config')
const pug = require('gulp-pug')
const fs = require('fs')
const plumber = require('gulp-plumber')
const pugLinter = require('gulp-pug-linter')
const htmlValidator = require('gulp-w3c-html-validator')
const formatHtml = require('gulp-format-html')
const data = require('gulp-data')

module.exports = function pug2html() {
  return src(srcPath + '/pages/*.pug')
    .pipe(plumber())
    .pipe(data(function () {
      return JSON.parse(fs.readFileSync('temp/data.json'))
    }))
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug())
    .pipe(formatHtml(
      {
        'end_with_newline': true,
        'inline': [
          'span'
        ],
        'unformatted': [],
        'content_unformatted': []
      }
    ))
    .pipe(htmlValidator())
    .pipe(dest(buildPath))
}
