var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));
var bs = require('browser-sync');

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss').
    pipe(scss())
    .pipe(gulp.dest('src/css'));
});

gulp.task('bs', function () {
  bs({
    server: {
      baseDir: 'src'
    }
  });
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', function () {
    return gulp.src('src/scss/**/*.scss').
      pipe(scss())
      .pipe(gulp.dest('src/css'))
  });

});


