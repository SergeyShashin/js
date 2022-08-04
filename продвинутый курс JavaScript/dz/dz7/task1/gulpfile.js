var gulp = require('gulp');
var saas = require('gulp-saas');

gulp.task('scss', function(){
  return gulp.src('src/scss/**/*.scss')
  .pipe(gulp.dest('src/css/'));
  
  
});
