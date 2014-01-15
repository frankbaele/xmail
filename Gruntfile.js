module.exports = function (grunt) {
  "use strict";
  var neat = require('node-neat').includePaths;
  // Config...
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          // Prevents Grunt to close just after the task (starting the server) completes
          // This will be removed later as `watch` will take care of that
          keepalive: false,
          hostname: '',
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['./index.html']
      },
      pictures: {
        files: ['./img/**/*']
      },
      css: {
        files: ['./sass/**/*.scss'],
        tasks: ['sass']
      }
    },
    nodemailer: {
      options: {
        recipients: [
          {
            email: 'karolien@xio.be',
            name: 'Jane Doe'
          }
        ],
        subject: 'Xio-template'
      },
      src: ['email.html']
    },
    sass: {
      options: {
        includePaths: neat,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          './css/style.css': './sass/style.scss',
        }
      }
    },
    juice: {
      options: {
        // Task-specific options go here.
      },
      prod: {
        files: {
          'email.html': 'index.html',
        }
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-nodemailer');
  grunt.loadNpmTasks('grunt-juice-email');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('serve', [
    'connect',
    'watch'
  ]);
  grunt.registerTask('prod', [
    'sass',
    'juice'
  ]);
  grunt.registerTask('mail', [
    'prod',
    'nodemailer'
  ]);
};
