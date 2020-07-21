'use strict';

const path = require('path')
const root = path.join(__dirname, '../')
const srcPath = path.join(root, 'src')
const buildPath = path.join(root, 'build')

module.exports = {
  root,
  srcPath,
  buildPath,
  pug2html: {
    beautifyHtml: false
  }
}
