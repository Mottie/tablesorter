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
				// 'zebra' // included in core
			],
			standardWidgetFileName: 'jquery.tablesorter.widgets.js',
			wrappers : {
				widgetPrefix: 'js/widgets/widget-',
				widgetSuffix: '.js',
				parserPrefix: 'js/parsers/parser-',
				parserSuffix: '.js'
			},
			wrapperUMD: {
				// tablesorter core
				coreBanner: '(function(factory) {\n' +
					"	if (typeof define === 'function' && define.amd) {\n" +
					"		define(['jquery'], factory);\n" +
					"	} else if (typeof module === 'object' && typeof module.exports === 'object') {\n" +
					"		module.exports = factory(require('jquery'));\n" +
					'	} else {\n' +
					'		factory(jQuery);\n' +
					'	}\n' +
					'}(function(jQuery) {\n\n',
				// widgets wrapper & combined wrapper - may need a separate entry when this wrapper is redefined to make
				// widgets a dependency of the core (see https://github.com/Mottie/tablesorter/issues/855)
				banner: '<%= pkg.banner %>/* Includes widgets ( <%= pkg.selectedWidgets %> <%= pkg.selectedParsers %>) */\n' +
					'(function(factory) {\n' +
					"	if (typeof define === 'function' && define.amd) {\n" +
					"		define(['jquery'], factory);\n" +
					"	} else if (typeof module === 'object' && typeof module.exports === 'object') {\n" +
					"		module.exports = factory(require('jquery'));\n" +
					'	} else {\n' +
					'		factory(jQuery);\n' +
					'	}\n' +
					'}(function(jQuery) {\n\n',
				footer: '\nreturn jQuery.tablesorter;\n}));\n'
			},
			noModBanner: '/*** This file is dynamically generated ***\n' +
				'█████▄ ▄████▄   █████▄ ▄████▄ ██████   ███████▄ ▄████▄ █████▄ ██ ██████ ██  ██\n' +
				'██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██▄▄   ██▄▄██\n' +
				'██  ██ ██  ██   ██  ██ ██  ██   ██     ██ ██ ██ ██  ██ ██  ██ ██ ██▀▀    ▀▀▀██\n' +
				'█████▀ ▀████▀   ██  ██ ▀████▀   ██     ██ ██ ██ ▀████▀ █████▀ ██ ██     █████▀\n*/\n'
		},

		// example widgets = [ 'pager', 'column', 'filter', 'stickyHeaders' ];
		addWidgetDependencies = function( widgets ) {
			var indx, dep,
				maxDeps = 40, // just in case (there are currently 27 widgets)
				len = widgets.length,
				deps = defaults.dependencies.widgets;
			for ( dep in deps ) {
				if ( typeof dep === 'string' ) {
					for ( indx = 0; indx < len; indx++ ) {
						// make sure indexOf is not matching 'column' instead of 'columnSelector' with surrounding spaces
						if ( ( ' ' + dep + ' ' ).indexOf( ' ' + widgets[indx] + ' ' ) >= 0 && widgets.indexOf( deps[ dep ] ) < 0 ) {
							widgets.push( deps[ dep ] );
							// keep checking newly added widgets, in case 'filter' is added and 'storage' hasn't been
							if ( len < maxDeps ) { len++; }
							continue;
						}
					}
				}
			}
			return widgets;
		},
		formFileNames = function() {
			var wrap = defaults.wrappers;
			// add widget path & file extension
			pkg.processedWidgets = ( wrap.widgetPrefix +
				pkg.selectedWidgets.join( wrap.widgetSuffix + ',' + wrap.widgetPrefix ) +
				wrap.widgetSuffix ).split( ',' );
			console.info( 'Creating a widgets file with: ' + pkg.selectedWidgets.join(', ') );

			if ( pkg.selectedParsers ) {
				// parser path & file extension
				pkg.processedParsers = ( wrap.parserPrefix +
					pkg.selectedParsers.join( wrap.parserSuffix + ',' + wrap.parserPrefix ) +
					wrap.parserSuffix ).split( ',' );
				console.info( 'Creating a combined file with selected widgets & these parsers: ' + pkg.selectedParsers.join(', ') );
				// make this look nice for the banner
				pkg.selectedParsers = ') & parsers ( ' + pkg.selectedParsers + ' ';
			}
			console.info( pkg.processedParsers );
		};

	// minified banner template - updated ##/##/20## (v2.##.##)
	pkg.banner = '/*! <%= pkg.name %> (FORK) - updated ' +
		'<%= grunt.template.today("mm-dd-yyyy") %> (v<%= pkg.version %>)*/\n';

	pkg.buildWidget = defaults.standardWidgetFileName;
	pkg.buildCombined = 'jquery.tablesorter.combined.js';
	pkg.processedParsers = '!js/parsers/*.js';

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
			css: {
				files : [{
					expand: true,
					dot: true,
					flatten: true,
					src: [ 'css/*.css', 'addons/pager/*.css' ],
					dest: 'dist/css/',
					rename: function( dest, src ) {
						if ( /black-ice/.test( src ) ) {
							src = src.replace( /-/, '' );
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
			main: {
				options: {
					banner: defaults.wrapperUMD.coreBanner,
					footer: defaults.wrapperUMD.footer
				},
				src: [ 'js/jquery.tablesorter.js' ],
				dest: 'dist/js/jquery.tablesorter.js'
			},
			widgets: {
				options: {
					banner: defaults.wrapperUMD.banner,
					footer: defaults.wrapperUMD.footer
				},
				src: [
					'<%= pkg.processedWidgets %>',
					'!js/widgets/_test-*.js',
					'!js/widgets/*.min.js'
				],
				dest: 'dist/js/<%= pkg.buildWidget %>'
			},
			everything: {
				options: {
					banner: defaults.wrapperUMD.banner,
					footer: defaults.wrapperUMD.footer
				},
				src: [
					'js/jquery.tablesorter.js',
					'<%= pkg.processedWidgets %>',
					'<%= pkg.processedParsers %>',
					'!js/widgets/_test-*.js',
					'!js/widgets/*.min.js'
				],
				dest: 'dist/js/<%= pkg.buildCombined %>'
			},
			// keep all the existing jsFiddle demos from breaking
			copybackWidgets: {
				options: {
					banner: defaults.noModBanner
				},
				src : ['dist/js/<%= pkg.buildWidget %>'],
				dest: 'js/<%= pkg.buildWidget %>'
			},
			copybackCombined: {
				options: {
					banner: defaults.noModBanner
				},
				src : ['dist/js/<%= pkg.buildCombined %>'],
				dest: 'js/<%= pkg.buildCombined %>'
			}
		},

		jscs: {
			src: [
				'addons/pager/*.js',
				'!addons/pager/*.min.js',
				'js/jquery.*.js',
				'js/**/*.js',
				'!js/_test-*.js',
				'!js/jquery.tablesorter.combined.js',
				'!js/jquery.tablesorter.widgets.js',
				'!js/extras/jquery.dragtable.mod.js', // indents with spaces; keeping original formatting to make diffs easier
				'!js/extras/jquery.metadata.js', // phasing this one out anyway
				'!js/**/_test-*.js',
				'!js/*.min.js',
				'!js/**/semver*.js'
			],
			options: {
				config: '.jscsrc'
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
					'JSON': false,
					'localStorage': false,
					'navigator': false,
					'console': false,
					'require': false,
					'define': false,
					'module': false
				},
				'loopfunc': true,
				'jquery': true,
				'browser': true,
				'es3': true,
				'unused': true,
				'undef': true
			}
		},

		htmlhint: {
			html1: {
				options: {
					'tag-pair': true
				},
				src: ['docs/*.html', 'beta-testing/*.html']
			}
		},

		uglify: {
			options: {
				preserveComments: function( node, comment ){
					return /^!/.test( comment.value );
				},
				report: 'gzip'
			},
			allFiles: {
				files: [{
					expand: true,
					cwd: './js/', // Src matches are relative to this path.
					src: [
						'**/*.js',
						'!jquery.tablesorter.js',
						'!_test-*.js',
						'!**/_test-*.js',
						'!*.min.js',
						'!**/semver.js'
					],
					dest: 'dist/js/',
					ext: '.min.js', // Dist files will have this extension.
					extDot: 'last'  // Extensions in filenames begin after this dot
				}]
			},
			// jquery.tablesorter.min.js is being minified from js/jquery.tablesorter.js
			// so it doesn't include the UMD wrapper! Point to the dist/js/ version
			main: {
				files : [{
					expand: true,
					cwd: './dist/js/',
					src: [ 'jquery.tablesorter.js' ],
					dest: 'dist/js/',
					ext: '.min.js', // Dist files will have this extension.
					extDot: 'last'  // Extensions in filenames begin after this dot
				}]
			},
			pageraddon: {
				files: {
					'dist/js/extras/jquery.tablesorter.pager.min.js': [ 'addons/pager/*.js' ]
				}
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					flatten: true,
					cwd: 'dist/css',
					src: ['*.css', '!_test-*.css'],
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
	grunt.loadNpmTasks( 'grunt-htmlhint' );
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-jscs' );

	grunt.registerTask( 'test', [ 'jscs', 'jshint', 'htmlhint', 'qunit' ] );

	tasks = [
		'clean:build',
		'copy',
		'concat',
		'uglify',
		'cssmin',
		'clean:css',
		'updateManifest'
	];

	// basic = same as before: core, widgets, filterformatter all separate
	grunt.registerTask( 'default', 'Default build', function() {
		pkg.selectedWidgets = addWidgetDependencies( defaults.standardWidgets );
		formFileNames();
		grunt.task.run(tasks);
	});

	// quick build to just minify files for pushes between updates
	grunt.registerTask( 'quick', [ 'copy', 'uglify', 'clean:css' ] );

	// enter 'grunt custom:{filename}' (not including the '.json')
	// to load in a custom json file
	// the expected JSON format is (with custom widgets in a string):
	// { "widgets" : "columnHighlight filter resizable saveSort stickyHeaders uitheme" }
	grunt.registerTask( 'custom', 'Custom build', function(file) {
		var temp, widgets,
			parsers = '',
			deps = true;

		/* Allow developer to set up a custom widget build (json file will have settings)*/
		try {
			temp = grunt.file.readJSON( file );
			if ( temp ) {
				parsers = temp.parsers;
				// include dependencies?
				deps = ('includeDependencies' in temp) ? temp.includeDependencies : true;
				// custom file name?
				pkg.buildWidget = ('destFileName' in temp) ? temp.destFileName : 'jquery.tablesorter.custom-widgets.js';
				// widgets to include
				widgets = (temp.widgets || '');
				if (widgets.replace(/\s+/g,'') === '') {
					grunt.log.error('No widgets found in custom build file.');
					console.info('Continuing build with default widgets...');
					temp = defaults.standardWidgets;
					pkg.buildWidget = defaults.standardWidgetFileName;
				} else {
					temp = widgets.split(/\s+/);
				}
			}
		} catch (err) {
			grunt.log.error('Custom build json not found - Use "grunt custom:{filename}"');
			console.info('Continuing build with default settings');
			temp = defaults.standardWidgets;
		}
		// add dependencies
		pkg.selectedWidgets = deps ? addWidgetDependencies( temp ) : temp;
		pkg.selectedParsers = parsers.split( /\s+/ );
		formFileNames();
		grunt.task.run(tasks);
	});

	// update tablesorter.jquery.json file version numbers to match the package.json version
	grunt.registerTask( 'updateManifest', function() {
		var i, project,
			projectFile = [ 'tablesorter.jquery.json' ],
			len = projectFile.length;
		for ( i = 0; i < len; i++ ) {
			if ( !grunt.file.exists( projectFile[ i ] ) ) {
				grunt.log.error( 'file ' + projectFile[ i ] + ' not found' );
				return true; // return false to abort the execution
			}
			project = grunt.file.readJSON( projectFile[ i ] ); // get file as json object
			project.version = pkg.version;
			grunt.file.write( projectFile[i], JSON.stringify( project, null, 2 ) ); // serialize it back to file
		}
	});

};
