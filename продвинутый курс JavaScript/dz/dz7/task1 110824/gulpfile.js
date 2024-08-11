var gulp = require('gulp');
var scss = require('gulp-sass')(require('sass'));

gulp.task("privet", function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('src/css'))
});


gulp.task('watch', function () {
  const watcher = gulp.watch(['src/scss/**/*.scss']);
  watcher.on('privet', function (privet) {
    privet();
  });

})
