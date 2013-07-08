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
          'build/app.css': ['assets/styles/vendor/normalize.css', 'assets/tmp/stylus.css']

  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  grunt.registerTask 'default', ['stylus', 'cssmin']
