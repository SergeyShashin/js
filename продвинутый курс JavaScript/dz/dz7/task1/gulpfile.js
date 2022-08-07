var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync')

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src',
    }
  })
})

gulp.task('watch', ['browserSync'], function () {
  gulp.watch('src/scss/**/*.scss', ['scss'])
  gulp.watch('src/*.html', browserSync.reload)
});