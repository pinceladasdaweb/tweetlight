module.exports = function (grunt) {
    "use strict";

    var pkg  = grunt.file.readJSON("package.json");
    var date = new Date();

    grunt.initConfig({
        meta: {
            banner: '/*! ' + pkg.name + ' - ' + pkg.description + ' v' + pkg.version + ' | (c) ' + date.getFullYear() + ' ' + pkg.author + ' | ' + pkg.licenses[0].type + ' License */'
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            target: {
                files: {
                    'build/tweetlight.min.js': ['src/tweetlight.js']
                }
            }
        },
        watch: {
            js: {
                files: ['src/tweetlight.js'],
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'uglify' ]);
};