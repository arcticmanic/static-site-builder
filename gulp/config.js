'use strict';

const path = require('path')
const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'src')
const buildPath = path.join(root, 'build')
const tempPath = path.join(root, 'temp')

module.exports = {
  root,
  srcPath,
  buildPath,
  tempPath,
  pug2html: {
    beautifyHtml: false
  }
}
