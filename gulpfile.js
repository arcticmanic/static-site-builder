'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const styleLinter = require('gulp-stylelint');
const htmlValidator = require('gulp-w3c-html-validator');
const formatHtml = require('gulp-format-html');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const shorthand = require('gulp-shorthand');
const browserSync = require('browser-sync').create();
const eol = require('gulp-eol');
const { series, parallel, dest } = require('gulp');

function pug2html() {
  return gulp.src('src/_pages/*.pug')
    .pipe(plumber())
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(pug())
    .pipe(htmlValidator())
    .pipe(formatHtml(
      {
        "end_with_newline": true,
        "inline": [
          "span"
        ],
        "unformatted": [],
        "content_unformatted": [],

      }
    ))
    .pipe(dest('build'))
}

function cleanHTML() {
  return gulp.src('build/*.html')
    .pipe(clean());
}

function cleanCSS() {
  return gulp.src('build/css/*.css')
    .pipe(clean());
}

function images() {
  return gulp.src('src/_img/*')
    .pipe(imageMin())
    .pipe(gulp.dest('build/img'))
}

function styles() {
  return gulp.src('src/_styles/*.{scss,sass}')
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
    .pipe(shorthand())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
}

function stylesBuild() {
  return gulp.src('src/_styles/*.{scss,sass}')
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
    .pipe(sass())
    .pipe(shorthand())
    .pipe(eol())
    .pipe(gulp.dest('build/css'))
}

function copy() {
  return gulp.src('src/_static/*')
    .pipe(dest('build'))
}

function serve(cb) {
  browserSync.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true
  });


  gulp.watch('src/_pages/**/*.pug', gulp.series(pug2html));
  gulp.watch('build/*.html').on('change', browserSync.reload);
  gulp.watch('src/_styles/**/*.{scss,sass}', gulp.series(styles, cb => gulp.src('build/css').pipe(browserSync.stream()).on('end', cb)))

  return cb();
}

exports.serve = series(
  serve
);
exports.build = series(cleanHTML, cleanCSS, images, pug2html, stylesBuild, copy);
exports.styles = styles;
