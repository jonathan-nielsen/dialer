import gulp from 'gulp';
import sass from 'gulp-sass';

gulp.task('styles', function() {
  return gulp.src('./styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('styles:watch', function() {
  gulp.watch('./styles/**/*.scss', ['styles']);
});

gulp.task('default', function() {
  return gulp.src('./styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});
