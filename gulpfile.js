var browserSync = require('browser-sync');
var gulp = require('gulp');
var nib = require('nib');
var reload = browserSync.reload;
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
             .pipe(gulp.dest('publish'))
             .pipe(reload({stream: true}));
});

gulp.task('live', ['publish'], function(){
  browserSync({server: {baseDir: 'publish'}});

  gulp.watch('assets/styles/*.styl', ['stylus']);
  gulp.watch('index.html', ['html']);
  gulp.watch(['*.html'], {cwd: 'publish'}, reload);
});

gulp.task('publish', ['html', 'favicon', 'stylus']);
gulp.task('default', ['publish']);
