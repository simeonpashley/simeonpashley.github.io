/*global module:false*/
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: "images/",
            src: "{,*/}*.{png,jpg,jpeg}",
            dest: "images/",
          },
        ],
      },
    },
    // imgcompress: {
    //   dist: {
    //     options: {
    //       optimizationLevel: 7,
    //       progressive: true
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: 'images/',
    //       src: '{,*/}*.{png,jpg,jpeg}',
    //       dest: 'images/'
    //     }]
    //   }
    // },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "_svg/",
            src: "{,*/}*.svg",
            dest: "svg/",
          },
        ],
      },
    },
    svgstore: {
      options: {
        prefix: "icon-",
        cleanup: false,
        svg: {
          style: "display: none;",
        },
      },
      default: {
        files: {
          "_includes/svg-icons.svg": ["svg/*.svg"],
        },
      },
    },
    jekyll: {
      watch: true,
      serve: true,
      options: {
        serve: true,
        watch: true,
        config: "_config.yml,_config.dev.yml",
      },
    },
    compass: {
      dist: {
        options: {
          sassDir: "sass",
          cssDir: "css",
          environment: "production",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-jekyll");
  grunt.loadNpmTasks("grunt-contrib-compass");
  // Load tasks
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  // grunt.loadNpmTasks('grunt-imgcompress');
  grunt.loadNpmTasks("grunt-svgstore");
  grunt.loadNpmTasks("grunt-svgmin");

  // Register tasks
  // grunt.registerTask('images', ['newer:imgcompress', 'newer:svgmin']);
  grunt.registerTask("svg", ["svgstore"]);
  grunt.registerTask("default", "jekyll");
};
