var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css/'));
}
);