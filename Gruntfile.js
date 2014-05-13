
'use strict';

/**
 * Grunt module
 */
module.exports = function(grunt) {

    /**
     * Dynamically load npm tasks
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * c2is-onetea Grunt config
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Project banner
         * Dynamically appended to CSS/JS files
         * Inherits text from package.json
         */
        tag: {
            banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * @author <%= pkg.author %>\n' +
                ' */\n'
        },

        /**
         * Uglify (minify) JavaScript files
         * https://github.com/gruntjs/grunt-contrib-uglify
         * Compresses and minifies all JavaScript files into one
         */
        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            modernizr: {
                src: 'vendors/modernizr/modernizr.js',
                dest: 'js/min/modernizr.min.js'
            },
            vendors: {
                src: [
                    /*'vendors/flexslider/jquery.flexslider.js',*/
                ],
                dest: 'js/min/vendors.min.js'
            },
            front: {
                src: 'js/front.js',
                dest: 'js/min/front.min.js'
            }
        },

        /**
         * JSHint
         * Validate files with JSHint.
         * https://github.com/gruntjs/grunt-contrib-jshint
         */
        jshint: {
            all: ['js/*'],
            options: { ignores: ['js/min/*'] }
        },

        /**
         * recess
         * LESS/CSS minification
         * https://github.com/sindresorhus/grunt-recess
         */
        recess: {
            compileless: {
                options: {
                    compile: true
                },
                files: {
                    'css/screen.css': [
                        'vendors/normalize-css/normalize.css',
                        'less/screen.less'
                    ]
                }
            },
            compressless: {
                options: {
                    banner: '<%= tag.banner %>',
                    compress: true
                },
                files: {
                    'css/screen.css': ['css/screen.css']
                }
            }
        },

        /**
         * includes
         * For including a file within another file (think php includes).
         * https://github.com/vanetix/grunt-includes
         */
        includes: {
            files: {
                src: ['dev_html/*.html'], // Source files
                dest: 'build', // Destination directory
                flatten: true,
                cwd: '.',
                options: {
                    silent: false
                }
            }
        },

        /**
         * Runs tasks against changed watched files
         * https://github.com/gruntjs/grunt-contrib-watch
         * Watching development files and run concat/compile tasks
         */
        watch: {
            options: {
                atBegin:true,
                livereload:true
            },
            less: {
                files: 'less/*.less',
                tasks: ['compilecss']
            },
            js: {
                files: 'js/*.js',
                tasks: ['minjs']
            },
            html: {
                files: ['dev_html/*.html', 'dev_html/includes/*.html'],
                tasks: ['build']
            }
        },

        /**
         * Autoprefixer
         * Adds vendor prefixes if need automatcily
         * https://github.com/nDmitry/grunt-autoprefixer
         */
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'Explorer 8', 'Firefox ESR', 'Opera 12.1', 'iOS 5', 'Android 3']
            },
            css: {
                files: {
                    'css/screen.css': ['css/screen.css']
                }
            }
        },

        /**
         * svg2png
         * Grunt plugin to rasterize SVG to PNG images using PhantomJS
         * https://github.com/dbushell/grunt-svg2png
         */
        svg2png: {
            all: {
                files: [
                    {src: ['images/common/*.svg']}
                ]
            }
        },


        /**
         * grunt-smushit
         * Grunt plugin to remove unnecessary bytes of PNG and JPG
         * https://github.com/heldr/grunt-smushit
         */
        smushit: {
            mygroup: {
                src: ['images/common/**'],
                dest: 'images/optim'
            }
        }
    });


    /**
     * Registering tasks
     */
    grunt.registerTask('default', ['compilecss','minalljs','build']);
    grunt.registerTask('compilecss', ['recess:compileless', 'autoprefixer']);
    grunt.registerTask('mincss', ['recess:compileless', 'autoprefixer', 'recess:compressless']);
    grunt.registerTask('minalljs',['jshint', 'uglify']);
    grunt.registerTask('minjs', ['jshint','uglify:front']);
    grunt.registerTask('build', ['includes']);
    grunt.registerTask('minimg', ['smushit']);
    grunt.registerTask('svg', ['svg2png']);
};
