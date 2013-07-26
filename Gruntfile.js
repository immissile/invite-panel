module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg : grunt.file.readJSON("package.json"),
    transport : {
      options : {
        paths : ['.'],
        alias: '<%= pkg.spm.alias %>',
        parsers : {
          '.js' : [script.jsParser],
          '.css' : [style.css2jsParser],
          '.html' : [text.html2jsParser],
          '.tpl' : [text.html2jsParser]
        },
        debug: false,
      },

      panel : {
        options : {
          idleading : 'dist/app/panel/<%= pkg.version %>/'
        },

        files : [
          {
            cwd : 'app/panel',
            src: [
              '**/*', 
              '!**/*config.js', 
            ],
            filter : 'isFile',
            dest : '.build/app/panel/<%= pkg.version %>'
          }
        ]
      }
    },

    concat : {
      options : {
        paths : ['.'],
        include : 'all',
        alias: '<%= pkg.spm.alias %>',
        banner: '/*! \n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> \n */\n',
      },
      panel : {
        options : {
          css2js: transport.style.css2js,
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: [
              'app/**/*.js', 
              '!app/panel/<%= pkg.version %>/tpl/*.js',
              '!app/panel/<%= pkg.version %>/libs/*.js'
            ],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    uglify : {
      panel : {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['app/panel/<%= pkg.version %>/src/*.js', '!app/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    cssmin: {
      options: {
        banner: '/* Missile-css-minfile. By Missile */\n',
        report: 'gzip'
      },
      panel: {
          expand: true,
          cwd: 'styles/panel/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles/panel/<%= pkg.version %>/',
          ext: '.min.css'
      }
    },

    clean : {
      spm : ['.build']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask(
    'build-panel-js', 
    [
      'transport:panel', 
      'concat:panel', 
      'uglify:panel',
      'clean'
    ]
  );
  grunt.registerTask('build-panel-css', ['cssmin:panel']);
  grunt.registerTask('build-panel', ['build-panel-js','build-panel-css']);
};
