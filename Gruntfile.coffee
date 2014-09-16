module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    stylus:
      compile:
        files:
          'assets/tmp/style.css': ['assets/styles/*.styl']
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

  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-copy-to'
  grunt.loadNpmTasks 'grunt-contrib-clean'

  grunt.registerTask 'default', ['stylus', 'copyto', 'clean']
