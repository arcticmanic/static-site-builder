'use strict';

const { series, parallel } = require('gulp')
const tasks = './gulp/tasks/'

const serve = require(tasks + 'serve')
const imageMinify = require(tasks + 'imageMinify')
const clean = require(tasks + 'clean')
const fonts = require(tasks + 'fonts')
const pug2html = require(tasks + 'pug2html')
const pugData = require(tasks + 'pugData')
const others = require(tasks + 'others')
const styles = require(tasks + 'styles')
const scripts = require(tasks + 'scripts')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'prod' : 'dev'
    cb()
  }
}

const dev = parallel(series(pugData, pug2html), styles, scripts, others, fonts, imageMinify)
const build = series(clean, dev)

module.exports.start = series(setMode(), build, serve)
module.exports.build = series(setMode(true), build)
