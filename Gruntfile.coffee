module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    stylus:
      compile:
        options:
          compress: false
          paths: ['assets/styles/includes']
          import: ['_mixins', '_variables']
        files:
          'assets/tmp/stylus.css': ['assets/styles/*.styl']
    cssmin:
      combine:
        files:
          'assets/tmp/build/app.css': ['assets/styles/vendor/normalize.css', 'assets/tmp/stylus.css']
    copyto:
      assets:
        files: [
          cwd: 'assets/tmp/build'
          src: ['*']
          dest: 'publish/'
        ]
      root:
        files: [
          cwd: '.'
          src: ['index.html', 'favicon.ico']
          dest: 'publish/'
        ]
    clean: ['assets/tmp']

  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-copy-to'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'default', ['stylus', 'cssmin', 'copyto', 'clean']
