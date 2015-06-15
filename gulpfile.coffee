gulp = require 'gulp'

autoprefixer = require 'gulp-autoprefixer'
minifyCSS = require 'gulp-minify-css'
revAll = require 'gulp-rev-all'
stylus = require 'gulp-stylus'

gulp.task 'build', ->
  gulp.src 'assets/styles/index.styl'
    .pipe stylus
      compress: false
      'include css': true
    .pipe autoprefixer browsers: ['last 4 versions']
    # .pipe minifyCSS()
    .pipe gulp.dest 'build'

  gulp.src 'favicon.ico'
    .pipe gulp.dest 'build'

  gulp.src 'index.html'
    .pipe gulp.dest 'build'

  gulp.src 'assets/fonts/**', base: 'assets'
    .pipe gulp.dest 'build'

gulp.task 'revision', ->
  revAll = new revAll()
  gulp.src 'build/**'
    .pipe revAll.revision()
    .pipe gulp.dest 'cdn'

# gulp.task 'publish', ['fingerprint'], ->
#   manifest = require './tmp/rev-assets'
#   gulp.src 'tmp/index.html'
#     .pipe fingerprint manifest
#     .pipe gulp.dest 'publish'
