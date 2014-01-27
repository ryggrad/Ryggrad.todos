module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    meta:
      file: 'RyggradTodos'
      endpoint: 'package',
      banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
              '   <%= pkg.homepage %>\n' +
              '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
              ' - Licensed under <%= pkg.license %> */\n'

    browserify:
      debug:
        files:
          'dist/<%= meta.file %>-debug.js': ['index.js']
        options:
          debug: true
          standalone: 'RyggradTodos'
      full:
        files:
          'dist/<%= meta.file %>-full.js': ['index.js']
        options:
          debug: false
          standalone: 'RyggradTodos'
      dist:
        files:
          'dist/<%= meta.file %>.js': ['index.js']
        options:
          standalone: 'RyggradTodos'
          external: [require.resolve('jquery'), require.resolve('underscore')]

    coffee:
      node:
        src: ['**/*.coffee']
        cwd: 'src'
        dest: 'lib/'
        expand: true
        ext: '.js'
        options:
          bare: true

    uglify:
      options:
        compress: false
        banner: '<%= meta.banner %>'
      endpoint:
        files: 'dist/<%=meta.file%>.min.js':  'dist/<%= meta.file %>.js'

    watch:
      src:
        files: '<%= resources.src %>'
        tasks: ['coffee:src', 'uglify']

    stylus:
      compile:
        options:
          compress: true
        files:
          'dist/RyggradTodos.css': ['src/css/*.styl'] 

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-stylus'

  grunt.registerTask 'browser', ['coffee:node', 'browserify:debug', 'browserify:full', 'browserify:dist']
  grunt.registerTask 'dist',    ['browser', 'uglify']
  grunt.registerTask 'default', ['stylus:compile', 'dist']
