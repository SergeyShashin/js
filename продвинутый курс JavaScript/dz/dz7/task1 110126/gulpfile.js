var gulp = require('gulp');

gulp.task('sayWelcome', function () {
  console.log('Welcome World!)')
});

gulp.task('scss', function(){
  return gulp.src('scss/**/*.scss');
})