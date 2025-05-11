var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var { watch, series } = require('gulp');

function runSCSS() {
  gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
      .pipe(scss())
      .pipe(gulp.dest('src/css'));
  });
}

gulp.task('watch', function () {
  watch('src/scss/**/*.scss', runSCSS);
});