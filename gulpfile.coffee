browserSync = require 'browser-sync'
gulp = require 'gulp'
nib = require 'nib'
stylus = require 'gulp-stylus'

reload = browserSync.reload

gulp.task 'favicon', ->
  gulp.src 'favicon.ico'
    .pipe gulp.dest 'publish'

gulp.task 'html', ->
  gulp.src 'index.html'
    .pipe gulp.dest 'publish'

gulp.task 'stylus', ->
  gulp.src 'assets/styles/index.styl'
    .pipe stylus use: nib()
    .pipe gulp.dest 'publish'
    .pipe reload stream: true

gulp.task 'live', ['publish'], ->
  browserSync server:
    baseDir: 'publish'

  gulp.watch 'assets/styles/*.styl', ['stylus']
  gulp.watch 'index.html', ['html']
  gulp.watch '*.html', cwd: 'publish', reload

gulp.task 'publish', ['html', 'favicon', 'stylus']

gulp.task 'default', ['publish']
