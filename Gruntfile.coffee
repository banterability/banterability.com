module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    stylus:
      compile:
        files:
          'assets/tmp/style.css': ['assets/styles/index.styl']
    copyto:
      assets:
        files: [
          cwd: 'assets/tmp'
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
    watch:
      scripts:
        files: ['assets/styles/*.styl', 'index.html']
        tasks: 'default'

  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-copy-to'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['stylus', 'copyto', 'clean']
