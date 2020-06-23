'use strict';

const { src, dest } = require('gulp')
const { srcPath, tempPath } = require('../config')
const mergeJson = require('gulp-merge-json');
const path = require('path');
const eol = require('gulp-eol')

module.exports = function pugData() {
  return src(srcPath + '/data/**/*.json')
    .pipe(mergeJson({
      jsonSpace: '  ',
      fileName: 'data.json',
      edit: (json, file) => {
        let filename = path.basename(file.path);
        let primaryKey = filename.replace(path.extname(filename), '');
        let data = {};

        data[primaryKey] = json;
        return data;
      }
    }))
    .pipe(eol())
    .pipe(dest(tempPath));
}
