var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync');

gulp.task('sayWelcome', function () {
  console.log('Welcome World!)')
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss').pipe(scss()).pipe(gulp.dest('src/css/')).pipe(browserSync.reload({ stream: true }));
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  })
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series(['scss', 'browserSync']));
});


