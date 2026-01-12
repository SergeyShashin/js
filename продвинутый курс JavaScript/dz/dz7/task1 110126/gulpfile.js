var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));

gulp.task('sayWelcome', function () {
  console.log('Welcome World!)')
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css/'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel(['scss']));
});
