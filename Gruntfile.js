module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: 'bower_components/font-awesome/fonts/**',
        dest: 'fonts/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "dist/style.css": "css/style.less"
        }
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy', 'less']);

};