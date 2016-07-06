module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'js/bulletScreen.min.js': ['src/vector2.js', 'src/bulletScreen.js']
                }
            }
        },
        watch: {
            js: {
                files: ['src/*.js', 'src/**/*.js'],
                tasks: ['js'],
                options: {}
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['uglify']);
}
