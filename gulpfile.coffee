gulp = require 'gulp'
autoprefixer = require 'gulp-autoprefixer'
browserSync = require 'browser-sync'
fingerprint = require 'gulp-fingerprint'
minifyCSS = require 'gulp-minify-css'
nib = require 'nib'
rev = require 'gulp-rev'
stylus = require 'gulp-stylus'

reload = browserSync.reload

gulp.task 'favicon', ->
  gulp.src 'favicon.ico'
    .pipe gulp.dest 'tmp'

gulp.task 'html', ->
  gulp.src 'index.html'
    .pipe gulp.dest 'tmp'

gulp.task 'stylus', ->
  gulp.src 'assets/styles/index.styl'
    .pipe stylus
      use: nib()
      compress: false
    .pipe autoprefixer browsers: ['last 4 versions']
    .pipe minifyCSS()
    .pipe gulp.dest 'tmp'
    .pipe reload stream: true

gulp.task 'live', ['prepublish'], ->
  browserSync server:
    baseDir: 'tmp'

  gulp.watch 'assets/styles/*.styl', ['stylus']
  gulp.watch 'index.html', ['html']
  gulp.watch '*.html', cwd: 'tmp', reload

gulp.task 'prepublish', ['html', 'favicon', 'stylus']

gulp.task 'prepareFonts', ->
  gulp.src 'assets/fonts/*.woff*', base: 'assets'
    .pipe gulp.dest 'tmp'
    .pipe rev()
    .pipe gulp.dest 'publish'
    .pipe rev.manifest '../tmp/rev-fonts.json'
    .pipe gulp.dest 'tmp'

gulp.task 'fingerprintFonts', ['prepareFonts'], ->
  manifest = require './tmp/rev-fonts'
  gulp.src 'tmp/index.css'
    .pipe fingerprint manifest
    .pipe gulp.dest 'tmp'

gulp.task 'fingerprint', ['prepublish', 'fingerprintFonts'], ->
  gulp.src ['tmp/index.css', 'tmp/favicon.ico']
    .pipe rev()
    .pipe gulp.dest 'publish'
    .pipe rev.manifest 'rev-assets.json'
    .pipe gulp.dest 'tmp'

gulp.task 'publish', ['fingerprint'], ->
  manifest = require './tmp/rev-assets'
  gulp.src 'tmp/index.html'
    .pipe fingerprint manifest
    .pipe gulp.dest 'publish'

gulp.task 'default', ['prepublish']
