module.exports = function(grunt){
  var pkg = require('./package.json'), //package file
      i;

  grunt.initConfig({
    "pkg": grunt.file.readJSON('package.json'),
    "bump": {
      "options": {
        "files": [
          "package.json",
          "bower.json"
        ],
        "updateConfigs": ["pkg"],
        "commit": true,
        "commitMessage": "Release v%VERSION%",
        "commitFiles": ["-a"],
        "createTag": true,
        "tagName": "v%VERSION%",
        "tagMessage": "Version %VERSION%",
        "push": true,
        "pushTo": "origin"
      }
    },
    "karma": {
      "unit-pre": {
        "configFile": "karma.unit.pre.js",
        "autowatch": false
      },
      "unit-post":{
        "configFile": "karma.unit.post.js",
        "autowatch": false
      }
    },
    concurrent: {
      "environment": {
        "tasks": ["watch","connect:src"],
        "options": {
          "logConcurrentOutput": true
        }
      }
    },
    less: {
      dev: {
        options: {
          dumpLineNumbers: 'mediaquery'
        },
        files: {
          'src/css/core.css': 'src/less/core.less'
        }
      },
      clean: {
        files: {
          'src/css/core.css': 'src/less/core.less'
        }
      }
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        nonew: true,
        plusplus: true,
        quotmark: true,
        sub: true,
        strict: true,
        undef: true,
        unused: true,
        trailing: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          define: false,
          require: false,
          module: false
        },
      },
      all: ["src/js/**/*.js"]
    },
    clean: {
      dist: ["dist"],
      process: ["process"]
    },
    watch:{
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less:dev']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint']
      }
    },
    connect: {
      src: {
        options: {
          port: 8059,
          base: 'src',
          keepalive: true
        }
      },
      dist: {
        options: {
          port: 8059,
          base: 'dist',
          keepalive: true
        }
      }
    },
    bowercopy: {
      libs: {
        options: {
          destPrefix: 'src/lib'
        },
        files: {
          'require.js':  'requirejs/require.js',
          'angular.js':  'angular/angular.js',
          'angular-mocks.js' : 'angular-mocks/angular-mocks.js',
          'normalize.css':  'normalize-css/normalize.css'
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          appDir: 'src/',
          baseUrl: 'js',
          removeCombined: true,
          optimizeCss: 'none',
          mainConfigFile: 'src/js/main.js',
          dir: 'build',
          uglify: {
            max_line_length: 200
          },
          modules: [
            // {
            //   name: 'angular',
            //   include: ['ngstorage', 'ngdialog']
            // },
            {
              name: 'main',
              //exclude: ['angular']
            }
          ]
        }
      }
    },
    // "ngtemplates":{
    //   "{%= sterileName %}":{
    //     "cwd": "src/html/",
    //     "src": ["**/*.html"],
    //     "dest": "process/templates.js",
    //     "options":{
    //       "htmlmin":{
    //         "collapseWhitespace":true
    //       }
    //     }
    //   }
    // },
    "copy":{
      "maps":{
        "files":[
          {
            "cwd": "src/html/",
            "expand": true,
            'src':[
              'index.html',
              'partials/**/*.*',
              'directives/**/*.*'
            ],
            "dest": "dist/",
            "filter": "isFile"
          }
        ]
      }
    }
  });

  for(i in pkg.devDependencies) { //iterate through the development dependencies
      if (pkg.devDependencies.hasOwnProperty(i)) { //avoid iteration over inherited object members
          if (i.substr(0,6) == 'grunt-') { //only load development dependencies that being with "grunt-""
              grunt.loadNpmTasks(i); //load all grunt tasks
          }
      }
  }
  grunt.registerTask('default',["concurrent"]);

  grunt.registerTask('install', ['bowercopy', 'less:clean']);

  grunt.registerTask('test',[ 'clean:dist','jshint','karma:unit-pre','concat','strip','ngtemplates','uglify:app','cssmin',"copy:maps",                  'plato']);
  grunt.registerTask('build',['clean:dist','jshint','karma:unit-pre','concat','strip','ngtemplates','uglify:app','cssmin',"copy:maps",'karma:unit-post','plato']);
  grunt.registerTask('dist',[ 'clean:dist','jshint','karma:unit-pre','concat','strip','ngtemplates','uglify:app','cssmin',"copy:maps",'karma:unit-post','plato','bump']);
};
