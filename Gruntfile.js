module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' +
                ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.homepage %>\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under the <%= pkg.license %> license\n' +
                ' */\n',
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
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
