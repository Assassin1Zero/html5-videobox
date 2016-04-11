var fs = require('fs');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * <%= pkg.title || pkg.name %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * \n' +
            ' * @author <%= pkg.author %> \n' +
            ' * @since <%= grunt.template.today(\"yyyy-mm-dd\") %>\n' +
            ' * @version v<%= pkg.version %>\n' +
            ' */\n',
        // Task configuration.
        clean: {
            pre: {
                src: ['build']
            },
            post: {
                src: ['build/js/main.js']
            }
        },
        copy: {
        	build: {
        		files: [
        			{src: 'template.html', dest: 'build/index.html'},
                    {src: 'css/**', dest: 'build/'},
                    {src: 'js/**', dest: 'build/'},
                    {src: 'images/**', dest: 'build/'},
                    {src: 'media/**', dest: 'build/'},
        		]
        	}
        },
        uglify: {
            build: {
                src: 'build/js/main.js',
                dest: 'build/js/main.min.js'
            }
        },
        browserify: {
            build: {
                files: {
                    'build/js/main.js': ['lib/**/*.js']
                },
                options: {
                    require: ['ad-utils'],
                }
            }
        },
        watch: {
        	files: ['lib/**', 'css/**', 'images/**', 'js/**', 'template.html'],
        	tasks: ['clean:pre', 'browserify', 'uglify','copy', 'clean:post']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['clean:pre', 'browserify', 'uglify','copy', 'clean:post']);
};