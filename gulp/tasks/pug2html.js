var gulp = require('gulp');
var pug = require('gulp-pug');

// gulp.task('pug', () => {
//   return gulp.src(`${pathsSRC.pug}`)
//     .pipe(pug({
//       pretty: true
//     }))
//     .on('error', notify.onError({
//       title: "Error in Pug Partials",
//       message: "Error: <%= error.message %>",
//     }))
//     .pipe(gulp.dest(`${pathsBUILD.html}`));
// });

gulp.task('pug', function() {
  return gulp.src('src/_pages/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('build'));
});
