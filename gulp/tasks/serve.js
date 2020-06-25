'use strict';

const { watch, series, src } = require('gulp')
const { buildPath } = require('../config')
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
    notify: false,
    open: true,
    cors: true
  })

  watch('src/img/*.{gif,png,jpg,svg,webp}', series(imageMinify, readyReload))
  watch('src/pages/**/*.pug', series(pug2html, readyReload))
  watch('src/scripts/*.js', series(scripts, readyReload))
  watch('src/styles/**/*.{scss,sass}', series(styles, cb => src(buildPath).pipe(server.stream()).on('end', cb)))
  watch('src/data/*.json', series(pugData, pug2html, readyReload))

  return cb()
}
