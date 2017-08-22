const buildDir = 'build';
const demoWebServerPort = 9091;
const liveReloadPort = 35729;

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        browserify: {
            build: {
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]],
                    watch: true,
                    browserifyOptions: {
                        standalone: 'app',
                        debug: true
                    }
                },
                src: ['app.js'],
                dest: `${buildDir}/app.js`
            }
        },

        clean: {
            options: {
                force: true
            },
            build: [buildDir]
        },

        connect: {
            demo: {
                options: {
                    open: true,
                    port: demoWebServerPort,
                    livereload: liveReloadPort,
                    base: buildDir
                }
            }
        },

        copy: {
            index: {
                files: [
                    {
                        src: 'index.html',
                        dest: buildDir,
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        mochaTest: {
            test: {
                options: {
                    bail: true,
                    reporter: 'spec',
                    require: ['babel-core/register']
                },
                src: ['test/**/*.spec.js']
            }
        },

        stylus: {
            build: {
                options: {
                    compress: false
                },
                files: [{
                    src: ['app.styl'],
                    dest: `${buildDir}/app.css`
                }]
            }
        },

        watch: {
            options: {
                livereload: liveReloadPort
            },
            demo: {
                files: ['index.html'],
                tasks: ['copy:index']
            },
            stylus: {
                files: ['app.styl','src/**/*.styl'],
                tasks: ['stylus:build']
            }
        }
    });

    grunt.registerTask('build', [
        'clean:build',
        'copy:index',
        'browserify:build',
        'stylus:build'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:demo',
        'watch'
    ]);

    grunt.registerTask('test', [
        'mochaTest'
    ]);
};