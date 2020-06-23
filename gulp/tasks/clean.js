'use strict';

const del = require('del')
const { buildPath } = require('../config');

module.exports = function clean(cb) {
  return del(buildPath).then(() => {
    cb()
  })
}
