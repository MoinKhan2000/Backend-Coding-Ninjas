module.exports = function (grunt) {
  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: /ninjacoding\.com/g,
              replacement: 'codingninjas.com'
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/index.html'],
            dest: 'build/'
          }
        ]
      }
    }
  });

  // Load the plugin for the replace task
  grunt.loadNpmTasks('grunt-replace');

  // Register the default task to run the replace task
  grunt.registerTask('default', ['replace']);
};
