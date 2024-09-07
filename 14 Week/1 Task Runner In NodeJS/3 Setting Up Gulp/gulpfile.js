import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

// Define the 'default' task
gulp.task('default', function () {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dest/images/'));
});
