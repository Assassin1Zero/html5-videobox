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
                src: ['build/main.js', 'build/main.min.js']
            }
        },
        copy: {
            build_eursport: {
                files: [{
                    src: 'template.html',
                    dest: 'build/eurosport-videobox/index.html'
                }, {
                    expand: true,
                    src: 'css/**',
                    dest: 'build/eurosport-videobox/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'js/**',
                    dest: 'build/eurosport-videobox/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    src: 'build/main.js',
                    dest: 'build/eurosport-videobox/main.min.js'
                }, {
                    expand: true,
                    src: 'images/**',
                    dest: 'build/eurosport-videobox/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    src: 'media/**',
                    dest: 'build/eurosport-videobox/',
                    flatten: true,
                    filter: 'isFile'
                }],
                options: {
                    noProcess: [
                        '**/*.{png,mp4,jpg}'
                    ],
                    process: function(content, source) {

                        if (/template.html/.test(source)) {
                            content = content.replace('autoplay: true', 'autoplay: true,\n        clickUrl: \'[CLICK MACRO HERE]\'');
                            //content = content.replace(/<(\/?|\!?)(DOCTYPE html|html.*|head|body|meta.*|title.*)>/gm, '');
                            content = content.replace(/<(\/?|\!?)(DOCTYPE html|html.*|head|body|meta.*|title.*)>(\n|\t)/gm, '');
                            content = content.replace('css/styles.css', 'styles.css');
                            content = content.replace('js/main.min.js', 'main.min.js');
                            content = content.replace(/media\//gm, '');
                        }

                        if (/styles.css/.test(source)) {
                            content = content.replace('background-image: url(../images/spritesheet.png)',
                                'background-image: url(spritesheet.png)');
                        }
                        return content;
                    }
                }
            },
            build_dni: {
                files: [{
                    src: 'template.html',
                    dest: 'build/dni-videobox/index.html'
                }, {
                    src: 'css/**',
                    dest: 'build/dni-videobox/'
                }, {
                    src: 'js/**',
                    dest: 'build/dni-videobox/'
                }, {
                    src: 'build/main.min.js',
                    dest: 'build/dni-videobox/js/main.min.js'
                }, {
                    src: 'images/**',
                    dest: 'build/dni-videobox/'
                }, {
                    src: 'media/**',
                    dest: 'build/dni-videobox/'
                }, ]
            }
        },
        uglify: {
            build: {
                src: 'build/main.js',
                dest: 'build/main.min.js'
            }
        },
        browserify: {
            build: {
                files: {
                    'build/main.js': ['lib/**/*.js']
                },
                options: {
                    require: ['ad-utils'],
                }
            }
        },
        watch: {
            files: ['lib/**', 'css/**', 'images/**', 'js/**', 'template.html'],
            tasks: ['clean:pre', 'browserify', 'uglify', 'copy', 'clean:post']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // Default task.
    grunt.registerTask('default', ['clean:pre', 'browserify', 'uglify', 'copy', 'clean:post']);
};
