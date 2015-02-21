/*global module:false*/
module.exports = function( grunt ) {
	'use strict';

	var pkg = grunt.file.readJSON( 'package.json' ),
		tasks,
		widgetFilePrefix,
		widgetFileSuffix,

		defaults = {
			dependencies : {
				widgets: {
					'saveSort resizable pager filter columnSelector' : 'storage',
					'filter-formatter-html5 filter-formatter-jui filter-formatter-select2' : 'filter'
					// 'stickyHeaders' : 'addResizeEvent' // included with stickyHeaders widget (for now)
				}
			},
			standardWidgets: [
				'storage', // req by saveSort; optional in others
				'uitheme',
				'columns',
				'filter',
				'stickyHeaders',
				'resizable',
				'saveSort'
				// 'addResizeEvent', // included with stickyHeaders widget
				// 'zeba' // included in core
			]
		},

		// example widgets = [ 'pager','column', 'filter', 'stickyHeaders' ];
		addWidgetDependencies = function(widgets) {
			var indx, dep,
				maxDeps = 40, // just in case (there are currently 27 widgets)
				len = widgets.length,
				deps = defaults.dependencies.widgets;
			for ( dep in deps ) {
				if ( typeof dep === 'string' ) {
					for ( indx = 0; indx < len; indx++ ) {
						// make sure indexOf is not matching "column" instead of "columnSelector" with surrounding spaces
						if ( (' ' + dep + ' ').indexOf(' ' + widgets[indx] + ' ') >= 0 && widgets.indexOf( deps[dep] ) < 0 ) {
							widgets.push( deps[dep] );
							// keep checking newly added widgets, in case "filter" is added and "storage" hasn't been
							if (len < maxDeps) { len++; }
							continue;
						}
					}
				}
			}
			return widgets;
		},
		formFileNames = function(){
			// add widget path & file extension
			pkg.processedWidgets = ( widgetFilePrefix +
				pkg.selectedWidgets.join( widgetFileSuffix + ',' + widgetFilePrefix ) +
				widgetFileSuffix ).split( ',' );
			console.info( 'Creating a widgets file with: ' + pkg.selectedWidgets.join(', ') );
		};

	// minified banner template - updated ##/##/20## (v2.##.##)
	pkg.banner = '/*! <%= pkg.name %> (FORK) widgets - updated ' +
		'<%= grunt.template.today("mm-dd-yyyy") %> (v<%= pkg.version %>)*/\n';

	widgetFilePrefix = 'js/widgets/widget-';
	widgetFileSuffix = '.js';

	pkg.buildWidget = 'dist/js/jquery.tablesorter.widgets.js';

	// Project configuration.
	grunt.initConfig({
		pkg: pkg,

		clean: {
			build: {
				src: [ 'dist/**/**/**/*', 'dist/**/**/*', 'dist/**/*', 'dist' ]
			},
			css: {
				src: [ 'dist/css/*.css', '!dist/css/*.min.css' ]
			}
		},

		copy: {
			main: {
				expand: true,
				src: [
					'js/jquery.*.js',
					'!js/_test-*.js',
					'!js/*.min.js',
				],
				dest: 'dist/',
				filter: 'isFile'
			},
			css: {
				files : [{
					expand: true,
					dot: true,
					flatten: true,
					src: ['css/*.css', 'addons/pager/*.css'],
					dest: 'dist/css/',
					rename: function(dest, src) {
						if (/black-ice/.test(src)) {
							src = src.replace(/-/, '');
						}
						return dest + src;
					}
				}]
			},
			less: {
				expand: true,
				flatten: true,
				src:  'css/*.less',
				dest: 'dist/css/less/'
			},
			images: {
				expand: true,
				flatten: true,
				src:  [ 'addons/pager/icons/*', 'css/images/*' ],
				dest: 'dist/css/images/'
			}
		},

		concat: {
			widgets: {
				options: {
					banner: '<%= pkg.banner %>/* Includes: <%= pkg.selectedWidgets %> */\n'
				},
				src: [
					'<%= pkg.processedWidgets %>',
					'!js/widgets/_test-*.js',
					'!js/widgets/*.min.js'
				],
				dest: '<%= pkg.buildWidget %>'
			},
			// keep all the existing jsFiddle demos from breaking
			copyback: {
				options: {
					banner: '/*** This file is dynamically generated ***\n' +
					'█████▄ ▄████▄   █████▄ ▄████▄ ██████   ███████▄ ▄████▄ █████▄ ██ ██████ ██  ██\n' +
					'██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██     ██  ██\n' +
					'██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██▀▀   ▀▀▀▀██\n' +
					'█████▀ ▀████▀   ██  ██ ▀████▀   ██     ██ ██ ██ ▀████▀ █████▀ ██ ██     █████▀\n*/\n'
				},
				src : ['<%= pkg.buildWidget %>'],
				dest: 'js/jquery.tablesorter.widgets.js'
			}
		},

		jshint: {
			files: {
				src: [
				'addons/pager/*.js',
				'!addons/pager/*.min.js',
				'js/jquery.*.js',
				'js/**/*.js',
				'!js/_test-*.js',
				'!js/**/_test-*.js',
				'!js/*.min.js',
				'!js/**/semver*.js'
				]
			},
			options: {
				globals: {
					"localStorage": false,
					"navigator": false,
					"console": false,
					"alert": false
				},
				"loopfunc": true,
				"jquery": true,
				"browser": true
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				report: 'gzip'
			},
			allFiles: {
				files: [{
					expand: true,
					cwd: './js/', // Src matches are relative to this path.
					src: [
						'*.js',
						'**/*.js',
						'!_test-*.js',
						'!**/_test-*.js',
						'!*.min.js',
						'!**/semver.js'
					],
					dest: 'dist/js/',
					ext: '.min.js', // Dist files will have this extension.
					extDot: 'last'  // Extensions in filenames begin after the first dot
				}]
			},
			pageraddon: {
				files: {
					'dist/js/extras/jquery.tablesorter.pager.min.js': [ 'addons/pager/*.js' ]
				}
			}
		},

		'string-replace': {
			dist: {
				files: {
					'dist/js/': ['dist/js/*.js']
				},
				options: {
					replacements: [{
						pattern: /\{\{version\}\}/ig,
						replacement: '<%= pkg.version %>'
					}]
				}
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					flatten: true,
					cwd: 'dist/css',
					src: ['*.css'],
					dest: 'dist/css',
					ext: '.min.css',
					extDot: 'last'
				}]
			}
		},

		qunit: {
			files: [ 'test.html' ]
		},

		watch: {
			scripts: {
				files: [
					'js/*.js',
					'js/**/*.js',
					'!js/_test-*.js',
					'!js/*.min.js'
				],
				tasks: [ 'build' ]
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks('grunt-string-replace');

	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

	tasks = [
		'clean:build',
		'copy',
		'concat',
		'jshint',
		'uglify',
		'cssmin',
		'clean:css',
		'string-replace',
		'updateManifest'
	];

	// basic = same as before: core, widgets, filterformatter all separate
	grunt.registerTask( 'default', 'Default build', function(){
		pkg.selectedWidgets = addWidgetDependencies( defaults.standardWidgets );
		formFileNames();
		grunt.task.run(tasks);
	});

	// enter "grunt custom:{filename}" (not including the ".json")
	// to load in a custom json file
	// the expected JSON format is (with custom widgets in a string):
	// { "widgets" : "columnHighlight filter resizable saveSort stickyHeaders uitheme" }
	grunt.registerTask( 'custom', 'Custom build', function(file){
		var temp, deps = true;

		/* Allow developer to set up a custom widget build (json file will have settings)*/
		try {
			temp = grunt.file.readJSON( file );
			if (temp) {
				deps = ('includeDependencies' in temp) ? temp.includeDependencies : true;
				temp = temp.widgets.split(/\s+/);
			}
		} catch (err) {
			grunt.log.error('Custom build json not found - Use "grunt custom:{filename}"');
			temp = defaults.standardWidgets;
		}

		// add dependencies
		pkg.selectedWidgets = deps ? addWidgetDependencies( temp ) : temp;
		formFileNames();
		grunt.task.run(tasks);
	});

	// update bower.json & tablesorter.jquery.json file version numbers to match the package.json version
	grunt.registerTask( 'updateManifest', function() {
		var i, project,
			projectFile = [ 'tablesorter.jquery.json', 'bower.json' ],
			len = projectFile.length;
		for ( i = 0; i < len; i++ ) {
			if ( !grunt.file.exists( projectFile[ i ] ) ) {
				grunt.log.error( "file " + projectFile[ i ] + " not found" );
				return true; // return false to abort the execution
			}
			project = grunt.file.readJSON( projectFile[ i ] ); // get file as json object
			project.version = pkg.version;
			grunt.file.write( projectFile[i], JSON.stringify( project, null, 2 ) ); // serialize it back to file
		}
	});

};
