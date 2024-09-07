module.exports = function (grunt) {

  // Configure the tasks.
  grunt.initConfig({
    // Specify the tasks.
    uglify: {
      target: {
        files: {
          // "dest/js/main.min.js": ["src/js/input1.js","src/js/input2.js"]
          "dest/js/main.min.js": ["src/js/*.js"] // all the js files
        }
      }
    },

    // Configure minified css.
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: "src/css",
            src: ["*.css", "!*.min.css"],
            dest: "dest/css",
            ext: ".min.css"
          }
        ]
      }
    }
  })

  // Load libraries
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  // Setting up task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
}