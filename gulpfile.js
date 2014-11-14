var gulp = require('gulp');
var nib = require('nib');
var stylus = require('gulp-stylus');

gulp.task('favicon', function(){
  return gulp.src('favicon.ico')
             .pipe(gulp.dest('publish'));
});

gulp.task('html', function(){
  return gulp.src('index.html')
             .pipe(gulp.dest('publish'));
});

gulp.task('stylus', function(){
  return gulp.src('assets/styles/index.styl')
             .pipe(stylus({use: [nib()]}))
             .pipe(gulp.dest('publish'));
});

gulp.task('publish', ['html', 'favicon', 'stylus']);
gulp.task('default', ['publish']);
