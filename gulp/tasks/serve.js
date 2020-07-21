'use strict';

const { watch, series, src } = require('gulp')
const { srcPath, buildPath } = require('../config')
const imageMinify = require('./imageMinify')
const styles = require('./styles')
const pug2html = require('./pug2html')
const scripts = require('./scripts')
const pugData = require('./pugData')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
  server.init({
    server: 'build',
    notify: true,
    open: false,
    cors: true
  })

  watch(srcPath + '/img/*.{gif,png,jpg,svg,webp}', series(imageMinify, readyReload))
  watch(srcPath + '/pages/**/*.pug', series(pug2html, readyReload))
  watch(srcPath + '/scripts/*.js', series(scripts, readyReload))
  watch(srcPath + '/styles/**/*.{scss,sass}', series(styles, cb => src(buildPath).pipe(server.stream()).on('end', cb)))
  watch(srcPath + '/data/modules/*.json', series(pugData, readyReload))

  return cb()
}
