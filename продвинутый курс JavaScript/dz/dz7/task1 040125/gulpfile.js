var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));

// gulp.task('scss', function () {
//   return gulp.src('src/scss/**/*.scss').
//     pipe(scss()).
//     pipe(gulp.dest('src/css/'));
// });

gulp.task('watch', function () {
  var { watch } = require('gulp');

  var watcher = watch(['src/scss/**/*.scss']);

  watcher.on('change', function () {
    gulp.src('src/scss/**/*.scss').
      pipe(scss()).
      pipe(gulp.dest('src/css/'));
  });
});