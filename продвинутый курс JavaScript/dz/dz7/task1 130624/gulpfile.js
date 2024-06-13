var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync');

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', function () {
    gulp.src('src/scss/**/*.scss').pipe(sass()).pipe(gulp.dest('src/css'))
  });
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });
});

