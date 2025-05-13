var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var { watch, series } = require('gulp');
var browserSync = require('browser-sync');

function runSCSS() {
  // gulp.task('scss', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
  // });
}

gulp.task('watch', function () {
  watch('src/scss/**/*.scss', runSCSS);
  watch('src/*.html', browserSync.reload);
});