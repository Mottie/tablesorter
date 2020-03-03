/*!
* TableSorter QUnit Testing
*/
/*jshint unused: false */
/*global QUnit: false, jQuery: false, ipv6tests: false */

// Accepts a function with a single argument -- deferred object, which should be resolved at some point in a function.
// Returns a promise, wrapping this function call.
QUnit.deferredCallback = function(func) {
	return function(){
		var defer = $.Deferred();
		func(defer);
		return defer.promise();
	};
};

// SequentialRunner is an object to build and run a list of asynchronous calls in a sequential way.
// It wraps a deferred object; initially it's resolved, but .next and .nextTask calls add runners to be invoked.
// Underlying promise can be obtained by .promise() call.
// Each runner should accept deferred object and resolve it at some point when it's safe to invoke the next runner.
//
// Its constructor has an optional argument runnerCreator -- function which accepts task arguments
// and returns a runner (i.e. another function). If runnerCreator supplied, SequentialRunner object gets
// an additional method #nextTask(<task arguments>...) that is useful when you run lots of similar tasks.
//
// Example:
//
// QUnit.SequentialRunner(function(buttonSelector){
//   return function(defer){ // each task is to wait until specified button is clicked
//     $(buttonSelector).click(function(){
//       defer.resolve()
//     })
//   };
// })
// .nextTask('#login').nextTask('#demo').nextTask('button')
// .promise()
// .then(function(){ console.log('Login, demo and any other button were clicked in that order.') });
//
QUnit.SequentialRunner = function(runnerCreator){
	var result = {
		defer: $.Deferred().resolve(),
		promise: function(){
			return this.defer.promise();
		},
		next: function(runner) {
			this.defer = this.defer.then( QUnit.deferredCallback(runner) );
			return this;
		}
	};
	if (runnerCreator) {
		result.nextTask = function(args) { // any argument list
			var deferredRunner = QUnit.deferredCallback( runnerCreator.apply(this, arguments) );
			this.defer = this.defer.then(deferredRunner);
			return this;
		};
	}
	return result;
};

// Returns an runner which runs some actions and wait for an event to be triggered.
// When an event is triggered assertions block is called and defer is resolved (independent on assertion result).
// This runner is useful when you want to check some conditions which should be met after an event was triggered.
//
// Example:
// QUnit.test('tablesorter initialization', function(assert){
//   return QUnit.SequentialRunner()
//   .next(
//     QUnit.assertOnEvent(
//       $('table'),
//       'tablesorter-initialized',
//       function() {
//         $('table').tablesorter( {sortList: [[0,0]]} );
//       },
//       function() {
//         QUnit.assert.deepEqual($('table')[0].config.sortList, [[0,0]], 'sortList should be present in config');
//       }
//     )
//   ).promise();
// });
//
QUnit.assertOnEvent = function($element, eventType, actions, assertions) {
	return function(defer){
		$element
		.off(eventType)
		.on(eventType, function() {
			$element.off(eventType);
			assertions();
			defer && defer.resolve();
		});
		actions();
	};
};

QUnit.extend(QUnit.assert, {
	/************************************************
		test table data cache
	************************************************/
	cacheCompare : function(table, col, expected, txt, filtered){
		var flat = [],
		result = $.tablesorter.getColumnText( table, col, function( data ){
			return !( filtered && data.$row.hasClass( table.config.widgetOptions.filter_filteredRow ) );
		});
		// flatten array
		flat = flat.concat.apply( flat, result.parsed );
		QUnit.assert.deepEqual( flat, expected, 'Comparing parser cache: ' + txt);
	}
});

/*
Core plugin tested
========================
OPTIONS:
	cssAsc, cssChildRow, cssDesc, cssHeader, cssHeaderRow, cssInfoBlock, dateFormat, emptyTo, headerList,
	headers, ignoreCase, initialized, parsers, sortList, sortLocaleCompare, sortReset, sortRestart, stringTo, tableClass,
	usNumberFormat, widgets (just zebra), sortAppend, sortForce, sortMultiSortKey, sortResetKey, numberSorter,
	cssIconAsc, cssIconDesc, cssIconNone, cssIconDisabled

METHODS:
	addRows, applyWidgets, destroy, sorton, sortReset, update/updateRow, updateAll, updateCell

EVENTS:
	initialized, sortBegin, sortEnd, sortStart, updateComplete

Not yet tested
=========================
OPTIONS:
	cancelSelection, cssProcessing, debug, delayInit, headerTemplate, initWidgets, onRenderHeader,
	onRenderTemplate, selectorHeaders, selectorRemove, selectorSort, serverSideSorting, showProcessing,
	sortInitialOrder, strings,
	textExtraction, textSorter, theme, widthFixed, widgets (also need priority testing)

METHODS:
	appendCache, applyWidgetId, sort, refreshWidgets

EVENTS:
	-
*/

jQuery(function($){

	var ts = $.tablesorter,
		$table1 = $('#table1'),
		$table2 = $('#table2'),
		$table3 = $('#table3'),
		$table4 = $('#table4'),
		$table5 = $('#table5'), // empty table
		$table6 = $('#table6'), // colspan table
		table1 = $table1[0],
		table2 = $table2[0],
		table3 = $table3[0],
		table4 = $table4[0],
		table5 = $table5[0],
		table6 = $table6[0],
		th0 = $table1.find('th')[0], // first table header cell
		init = false,
		sortIndx = 0,
		updateIndx = 0,
		updateCallback = 0,
		events = ['sortStart', 'sortBegin', 'sortEnd', ' '],
		returnTime = function(string){
			return new Date(string).getTime();
		},
		undef, c1, c2, c3, c4, e, i, t;

	/* test widget */
	ts.addWidget({
		id : 'test',
		options: {
			'test': []
		},
		format: function() {}
	});

	$table1
		.on('tablesorter-initialized', function(){
			init = true;
		})
		.tablesorter({
			widgets: ['test'],
			widgetOptions: {
				// check widget option defaults across tables
				test: [0,1]
			}
		});

	$table2.tablesorter({
		headers: {
			0: { sorter: 'text' },
			1: { sorter: 'text' },
			2: { sorter: false }
		},
		widgets: ['test'],
		widgetOptions: {
			// check widget option defaults across tables
			test: [0]
		}
	});

	$table3.tablesorter({
		emptyTo: 'bottom',
		stringTo: 'max', // non-numeric content is treated as a MAX value
		headers: {
			0: { empty : 'top' }, // sort empty cells to the top
			2: { string: 'min' }, // non-numeric content is treated as a MIN value
			3: { sorter: 'digit', empty : 'zero', string : 'top' }
		},
		// check widget option defaults across tables
		widgets: ['test']
	});

	$table4.tablesorter({
		sortAppend : [[2,0],[3,0]],
		sortForce : [[0,0],[1,0]],
		textExtraction : {
			'.te-test' : function(node){
				return $(node).find('span').text();
			},
			2 : function(node){
				return $(node).find('span').text();
			}
		},
		initialized: function(table){
			var e, c = table.config;
			// trigger sort on 5th column
			// this method is used because triggering a 'sorton' would ignore sortForce/sortAppend
			c.$headers.eq(4).trigger('sort');
			e = $.Event('sort');
			e.which = 1;
			e.shiftKey = true;
			c.$headers.eq(5).trigger(e);
		},
		numberSorter: function(a, b, dir){
			return dir ? a-b : b-a;
		}
	});

	$table5.tablesorter();
	$table6.tablesorter();

	QUnit.module('core');
	/************************************************
		Initialization
	************************************************/
	QUnit.test( 'tablesorter loaded & initialized', function(assert) {
		assert.expect(3);
		assert.equal( typeof ts, 'object', 'tablesorter loaded');
		assert.equal( table1.hasInitialized, true, 'tablesorter initialized flag');
		assert.equal( init, true, 'tablesorter initialized event');
	});

	c1 = table1.config;
	c2 = table2.config;
	c3 = table3.config;
	c4 = table4.config;

	/************************************************
		Test column numbering
	************************************************/
	// later: include a table header with colspan & rowspan
	QUnit.test( 'column numbering', function(assert) {
		assert.expect(2);
		var internalColumn = true,
			dataColumn = true;
		$table4.find('thead th').each(function(i){
			internalColumn = internalColumn && this.column === i;
			dataColumn = dataColumn && $(this).attr('data-column') == i;
		});
		assert.equal( internalColumn, true, 'Correct internal column numbering' );
		assert.equal( dataColumn, true, 'Correct data-column attribute numbering' );
	});

	/************************************************
		check isDigit function
	************************************************/
	var d = ts.isDigit;
	QUnit.test( 'isDigit', function(assert) {
		assert.expect(18);
		assert.ok( d('-1'),   'allow negative (-1)');
		assert.ok( d('+1'),   'allow plus (+1)');
		assert.ok( d('(1)'),  'allow parenthesis (1)');
		assert.ok( d('123'),  "string has numbers ('123')");
		assert.ok( d(123),    'has numbers (123)');
		assert.ok( d('1.2'),  'remove decimal (1.2)');
		assert.ok( d('1,234'),'remove commas (1,234)');
		assert.ok( d("11'"),  "remove apostrophe's (11')"); // 11 feet
		assert.ok( d('3\'4"'),"remove quotes (3'4\")"); // 3 foot 4 inches
		assert.ok( d(' 12 '), 'remove spaces ( 12 )');
		assert.ok( !d('x'),   'non-digit alphabet');
		assert.ok( !d('1x'),  'digit + alphabet');
		assert.ok( !d('x1'),  'alphabet + digit');
		assert.ok( !d('@'),   'non-digit symbols');
		assert.ok( !d('1-'),  'negative after (1-) not allowed?');
		assert.ok( !d('1+'),  'plus after (1+) not allowed?');
		assert.ok( !d('$2'),  'no money; the currency parser will catch these');
		assert.ok( !d(''),    "empty string ('')");
	});

	/************************************************
		check formatFloat function
	************************************************/
	var ff = function(str) {
		return ts.formatFloat(str, table1);
	};
	QUnit.test( 'formatFloat', function(assert) {
		assert.expect(18);
		assert.strictEqual( ff(''), '', 'returns empty string' );
		assert.strictEqual( ff(5), 5, 'returns numerical values');

		c1.usNumberFormat = false;
		assert.strictEqual( ts.formatFloat('1,234,567.89'), 1234567.89, 'use format float without including table - defaults to US number format');

		assert.strictEqual( ff('1 234,56'), 1234.56, 'parse non-U.S. (French) number format');
		assert.strictEqual( ff('1.234,56'), 1234.56, 'parse non-U.S. (German) number format');
		assert.strictEqual( ff('-32,32'), -32.32, 'negative non-U.S. signed numbers');
		assert.strictEqual( ff('-1.234,56'), -1234.56, 'negative non-U.S. signed numbers');
		assert.strictEqual( ff('(32,32)'), -32.32, 'parenthesis wrapped non-U.S. negative number');
		assert.strictEqual( ff('  (32,32) '), -32.32, 'space + parenthesis wrapped non-U.S. negative number');

		c1.usNumberFormat = true;
		assert.strictEqual( ff('1,234.56'), 1234.56, 'parse U.S. number format');
		assert.strictEqual( ff('-32.32'), -32.32, 'negative U.S. signed numbers');
		assert.strictEqual( ff('(32.32)'), -32.32, 'parenthesis wrapped U.S. negative number');
		assert.strictEqual( ff('  (32.32)'), -32.32, 'space + parenthesis wrapped U.S. negative number');

		assert.strictEqual( ff('fred'), 'fred', 'return string if not a number');
		assert.strictEqual( ff('  fred '), 'fred', 'return trimmed string if not a number');
		assert.strictEqual( ff('fred 12'), 'fred 12', 'return string if number not at beginning');
		assert.strictEqual( ff('12fred'), 12, 'parse number + string into number only');
		assert.strictEqual( ff('(fred)'), '(fred)', 'leave parenthesis intact on strings');

	});

	/************************************************
		get data function - jQuery data > meta > headers option > header class name
	************************************************/
	var gd = function(n){
		return ts.getData( c2.$headers[n], c2.headers[n], 'sorter' );
	};

	QUnit.test( 'getData', function(assert) {
		assert.expect(4);
		var txt = [ 'jQuery data', 'meta data', 'headers option', 'header class name' ];
		for (i = 0; i < 4; i++) {
			assert.equal( gd(i), 'false', txt[i]); // all columns have sorter false set
		}
	});

	/************************************************
		isValueInArray
	************************************************/

	QUnit.test( 'isValueInArray', function(assert) {
		var v = ts.isValueInArray;
		assert.expect(6);
		assert.ok( v( 0, null ) < 0, 'null' );
		assert.ok( v( 0, [] ) < 0, 'Empty array' );
		assert.ok( v( 1, [[ 1,0 ], [ 0,0 ]] ) === 0, 'Column found (first array)' );
		assert.ok( v( 1, [[ 0,0 ], [ 1,0 ]] ) === 1, 'Column found (second array)' );
		assert.ok( v( 4, [[ 0,0 ], [ 1,0 ], [ 4,0 ]] ) === 2, 'Column found (third array)' );
		assert.ok( v( 3, [[ 0,0 ], [ 1,0 ], [ 4,0 ]] ) < 0 , 'Column not found' );
	});

	/************************************************
		isProcessing
	************************************************/
	QUnit.test( 'isProcessing', function(assert) {
		$table3.trigger('sortReset');
		assert.expect(5);
		var p = ts.isProcessing,
			findClasses = function( applied, columns ) {
				var i, tmp,
					headers = 0,
					len = columns.length,
					headers = 0,
					// if processing applied, class is added to the table
					result = applied && $table3.hasClass( ts.css.processing );
				if ( len === 1 && columns[ 0 ] < 0 ) {
					// processing class should not be found on headers
					return ( !result || applied && result ) && c3.$headers.find( '.' + ts.css.processing ).length === 0;
				}
				for ( i = 0; i < len; i++ ) {
					tmp = c3.$headers.eq( columns[ i ] ).hasClass( ts.css.processing );
					if ( tmp ) { headers++; }
					result = result && tmp;
				}
				return result && headers === len;
			};
		$table3.trigger('sorton', [[[0,0], [1,0]]]);
		p( $table3, true );
		assert.ok( findClasses( true, [ 0, 1 ] ), 'Processing 2 columns' );
		p( $table3, false );
		assert.ok( findClasses( false, [ -1 ] ), 'No sort' );
		p( $table3, true, c3.$headers.eq(4) );
		assert.ok( findClasses( true, [ -1 ] ), 'Processing specified column not in sortList' );
		p( $table3, true, c3.$headers.eq(1) );
		assert.ok( findClasses( true, [ 1 ] ), 'Processing specified column in sortList' );
		$table3.trigger('sortReset');
		assert.ok( findClasses( false, [ -1 ] ), 'No sort' );
	});

	/************************************************
		character equivalent replacement
	************************************************/
	QUnit.test( 'replace accents', function(assert) {
		assert.expect(6);
		assert.strictEqual( ts.replaceAccents('\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5'), 'aaaaaaaAAAAAAA', "replaced a's");
		assert.strictEqual( ts.replaceAccents('\u00e9\u00e8\u00ea\u00eb\u011b\u0119\u00c9\u00c8\u00ca\u00cb\u011a\u0118'), 'eeeeeeEEEEEE', "replaced e's");
		assert.strictEqual( ts.replaceAccents('\u00ed\u00ec\u0130\u00ee\u00ef\u0131\u00cd\u00cc\u0130\u00ce\u00cf'), 'iiiiiiIIiII', "replaced i's");
		assert.strictEqual( ts.replaceAccents('\u00f3\u00f2\u00f4\u00f5\u00f6\u00d3\u00d2\u00d4\u00d5\u00d6'), 'oooooOOOOO', "replaced o's");
		assert.strictEqual( ts.replaceAccents('\u00fa\u00f9\u00fb\u00fc\u016f\u00da\u00d9\u00db\u00dc\u016e'), 'uuuuuUUUUU', "replaced u's");
		assert.strictEqual( ts.replaceAccents('\u00e7\u0107\u010d\u00c7\u0106\u010c\u00df\u1e9e'), 'cccCCCssSS', 'replaced c & s sharp');
	});

	/************************************************
		detect parsers
	************************************************/
	QUnit.test( 'detect parsers', function(assert) {
		var done = assert.async();
		assert.expect(2);
		$('#testblock2').html('<table class="tablesorter"><thead>' +
			'<tr><th class="col-off" colspan="2">Info</th><th class="col-off" colspan="4">Details</th></tr>' +
			'<tr>' +
				'<th class="col-first">First Name</th>' +
				'<th class="col-last">Last Name</th>' +
				'<th class="col-age" id="age">Age</th>' +
				'<th class="col-total">Total</th>' +
				'<th class="col-discount">Discount</th>' +
				'<th class="col-date">Date</th>' +
			'</tr></thead>' +
			'<tbody>' +
				'<tr><td>Peter</td><td>Parker</td><td>28</td><td>$9.99</td><td>20%</td><td>Jul 6, 2006 8:14 AM</td></tr>' +
				'<tr><td>John</td><td>Hood</td><td>33</td><td>$19.99</td><td>25%</td><td>Dec 10, 2002 5:14 AM</td></tr>' +
				'<tr><td>Clark</td><td>Kent</td><td>18</td><td>$15.89</td><td>44%</td><td>Jan 12, 2003 11:14 AM</td></tr>' +
				'<tr><td>Bruce</td><td>Almighty</td><td>45</td><td>$153.19</td><td>44%</td><td>Jan 18, 2001 9:12 AM</td></tr>' +
				'<tr><td>Bruce</td><td>Evans</td><td>22</td><td>$13.19</td><td>11%</td><td>Jan 18, 2007 9:12 AM</td></tr>' +
			'</tbody></table>')
		.find('table')
		.tablesorter({
			headers : {
				0 : { sorter: false },
				1 : { sorter: false },
				3 : { sorter: 'digit' } // 3 sets the 4th column, not the 3rd header cell now
			},
			initialized: function(table){
				var i,
					result = true,
					parsers = [ 'text', 'digit', 'digit', 'currency', 'percent', 'usLongDate' ],
					c = table.config;
				for (i = 0; i < c.columns; i++){
					result = result && c.parsers[i].id === parsers[i];
				}
				assert.equal( result, true, 'detect parsers by header index' );
				// table inception!
				$(table)
					.trigger('destroy')
					.tablesorter({
						headers : {
							'.col-first' : { sorter: 'url' },
							'.col-off'  : { sorter: false },
							'.col-total' : { sorter : 'percent' },
							'#age, .col-last' : { sorter: 'currency' },
							'.col-date' : { sorter : 'time' },
							'.col-discount' : { sorter: 'digit' }
						},
						initialized: function(table){
							var i,
								result = true,
								parsers = [ 'url', 'currency', 'currency', 'percent', 'digit', 'time' ],
								c = table.config;
							for (i = 0; i < c.columns; i++){
								result = result && c.parsers[i].id === parsers[i];
							}
							assert.equal( result, true, 'detect parsers by class/id' );
							done();
						}
					});
			}
		});

	});

	/************************************************
		check all default parsers
	************************************************/
	var p = ts.parsers,
	// test by parser
	parserTests = 86,
	// skipping metadata parser
	sample1 = {
		'text'      : { 'test': 'test', 'TesT': 'test', '\u00e1 test': '\u00e1 test' },
		'currency'  : { '\u00a31': 1, '($2.23)': -2.23, '5\u20ac': 5, '(11\u00a4)': -11, '500\u00a5': 500, '25\u00a2': 25, '$1,000.50': 1000.5 },
		'ipAddress' : { '255.255.255.255': '255.255.255.255', '32.32.32.32': '032.032.032.032', '1.1.1.1': '001.001.001.001' },
		'url'       : { 'http://google.com': 'google.com', 'ftp://fred.com': 'fred.com', 'https://github.com': 'github.com' },
		'isoDate'   : { '2012/12/12': returnTime('2012/12/12'), '2012-12/12': returnTime('2012/12/12'), '2013-1-1': returnTime('2013/1/1'), '2013/1/1 12:34:56 AM': returnTime('2013/1/1 12:34:56 AM') },
		'percent'   : { '100%': 100, '22%': 22, '%2': 2, '2 %': 2, '(4%)': -4, '1,234.56    %': 1234.56 },
		'usLongDate': { 'Feb 23, 1999': returnTime('Feb 23, 1999'), 'Feb 23, 1999 12:34': returnTime('Feb 23, 1999 12:34'), 'Feb 23, 1999 12:34 AM': returnTime('Feb 23, 1999 12:34 AM'), 'Feb 23, 1999 12:34:56 PM': returnTime('Feb 23, 1999 12:34:56 PM'), '01 Jan 2013': returnTime('01 Jan 2013') },
		'shortDate' : { '1/2/2001': returnTime('1/2/2001'), '1 2 2001': returnTime('1/2/2001'), '1.2.2001': returnTime('1/2/2001'), '1-2-2001': returnTime('1/2/2001'), '1/2/2001 12:34 PM' : returnTime('1/2/2001 12:34 PM'), '1.2.2001 13:34' : returnTime('1/2/2001 13:34') },
		'time'      : { '12:34 AM': returnTime('2000/01/01 12:34 AM'), '1:00 pm': returnTime('2000/01/01 1:00 pm'), '09:54 PM': returnTime('2000/01/01 9:54 PM') },
		'digit'     : { '12': 12, '$23': 23, '&44^': 44, '#(33)': -33, '1,000': 1000, '12.34': 12.34 }
	},
	// switch ignoreCase, sortLocalCompare & shortDate 'ddmmyyyy'
	sample2 = {
		'text'      : { 'TesT': 'TesT', '\u00e1 test': 'a test' },
		'currency'  : { '\u20ac 123 456,78': 123456.78, '\u20ac 123.456,78': 123456.78 },
		'shortDate' : { '2/1/2001': returnTime('1/2/2001'), '2-1-2001': returnTime('1/2/2001'), '2 1,2001': returnTime('1/2/2001') }
	},
	// shortdate to 'yyyymmdd'
	sample3 = {
		'shortDate' : { '2001/1/2': returnTime('1/2/2001'), '2001-1/2': returnTime('1/2/2001'), '2001,1.2': returnTime('1/2/2001') }
	},
	report = function(assert, s) {
		for (i = 0; i < p.length; i++) {
			t = p[i].id;
			if (s.hasOwnProperty(t)) {
				/*jshint loopfunc:true */
				$.each(s[t], function(k,v){
					// check 'is' and 'format' functions
					if (p[i].is(k)) {
						assert.equal( p[i].format(k, table1, th0, 0), v, t + ' parser: "' + k + '" parsed to ' + v );
					} else {
						assert.equal( p[i].format(k, table1, th0, 0), v, t + ' parser **NOT DETECTED**: "' + k + '", but returns ' + v );
					}
				});
				// test for undefined & null - probably overkill
				assert.strictEqual( p[i].format(undef, table1, th0, 0), undef, t + ' parser: will return undefined values properly' );
				assert.strictEqual( p[i].format(null, table1, th0, 0), null, t + ' parser: will return null values properly' );
			}
		}
	};

	QUnit.test( 'testing parsers', function(assert) {
		assert.expect(parserTests);
		report(assert, sample1);
		var $t = $(th0);

		c1.sortLocaleCompare = true;
		c1.ignoreCase = false;
		c1.usNumberFormat = false;
		$t.data('dateFormat', 'ddmmyyyy');
		report(assert, sample2);

		c1.usNumberFormat = true;
		$t.data('dateFormat', 'yyyymmdd');
		report(assert, sample3);

		// undocumented sortValue
		assert.equal( ts.getParserById('metadata').format(null, table1, th0, 0), 'zzz', 'metadata parser found sortValue');
		c1.parserMetadataName = 'poe';
		assert.equal( ts.getParserById('metadata').format(null, table1, th0, 0), 'nevermore', 'metadata parser found poe');
	});

	QUnit.test( 'textExtraction Method', function(assert) {
		assert.expect(4);

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		assert.cacheCompare( table1, 0, [ 'test1', 'test2', 'test3',
		                                  'testa', 'testb', 'testc', '' ], 'from data-attribute' );

		$table3.trigger('sorton', [[[ 0,1 ]]]);
		assert.cacheCompare( table3, 0, [ '', 'a255', 'a102', 'a87', 'a55', 'a43', 'a33', 'a10', 'a02', 'a1' ], 'ignore data-attribute' );

		assert.cacheCompare( table4, 1, [ 'f11', 'f11', 'f12', 'f12', 'f12', 'f12', 'f12', 'f13', 'f13', 'f13' ], 'extract using class name' );

		assert.cacheCompare( table4, 2, [ 'a21', 'a21', 'a23', 'a23', 'a23', 'a22', 'a22', 'a23', 'a24', 'a24' ], 'extract using column index' );

	});

	/************************************************
		test parser cache
	************************************************/
	QUnit.test( 'parser cache; sorton methods; empty & string', function(assert) {
		assert.expect(18);
		$table1.trigger('sortReset');

		// lower case because table was parsed before c1.ignoreCase was changed
		assert.cacheCompare( table1, 'all', [ 'test2', 'x2', 'test1', 'x3', 'test3', 'x1',
		                            '', 'x0', 'testb', 'x5', 'testc', 'x4', 'testa', 'x6' ], 'unsorted' );

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		assert.cacheCompare( table1, 'all', [ 'test1', 'x3', 'test2', 'x2', 'test3', 'x1',
		                                      'testa', 'x6', 'testb', 'x5', 'testc', 'x4', '', 'x0' ], 'ascending sort' );

		$table1.trigger('sorton', [[[ 0,1 ]]]);
		assert.cacheCompare( table1, 'all', [ 'test3', 'x1', 'test2', 'x2', 'test1', 'x3',
		                                      'testc', 'x4', 'testb', 'x5', 'testa', 'x6', '', 'x0' ], 'descending sort' );

		// empty cell position
		$table3.trigger('sorton', [[[ 0,0 ]]]);
		assert.cacheCompare( table3, 0, [ '', 'a1', 'a02', 'a10', 'a33', 'a43', 'a55', 'a87', 'a102', 'a255' ], 'asc sort; empty to top' );

		$table3.trigger('sorton', [[[ 0,1 ]]]);
		assert.cacheCompare( table3, 0, [ '', 'a255', 'a102', 'a87', 'a55', 'a43', 'a33', 'a10', 'a02', 'a1' ], 'desc sort; empty to top' );

		// string position within number column
		$table3.trigger('sorton', [[[ 1,0 ]]]);
		assert.cacheCompare( table3, 1, [ -35, -5, -1, 1, 2, 4, 33, 44, 'nr', '' ], 'asc sort; empty to bottom; string to max' );

		$table3.trigger('sorton', [[[ 1,1 ]]]);
		assert.cacheCompare( table3, 1, [ 'nr', 44, 33, 4, 2, 1, -1, -5, -35, '' ], 'desc sort; empty to bottom; string to max' );

		$table3.trigger('sorton', [[[ 2,0 ]]]);
		assert.cacheCompare( table3, 2, [ 'nr', 'nr', 1, 2, 3, 4, 5, 6, 7, '' ], 'asc sort; empty to bottom; string to min' );

		$table3.trigger('sorton', [[[ 2,1 ]]]);
		assert.cacheCompare( table3, 2, [ 7, 6, 5, 4, 3, 2, 1, 'nr', 'nr', '' ], 'desc sort; empty to bottom; string to min' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		assert.cacheCompare( table3, 3, [ 'n/a #2', 'n/a #1', -8.4, -2.2, -0.1, '', 5.2, 11.4, 23.6, 97.4 ], 'asc sort; empty to zero; string to top' );

		$table3.trigger('sorton', [[[ 3,1 ]]]);
		assert.cacheCompare( table3, 3, [ 'n/a #2', 'n/a #1', 97.4, 23.6, 11.4, 5.2, '', -0.1, -2.2, -8.4 ], 'desc sort; empty to zero; string to top' );

		$table3.find('th:eq(3)').data('string', 'bottom');
		$table3.trigger('update');
		assert.cacheCompare( table3, 3, [ 97.4, 23.6, 11.4, 5.2, '', -0.1, -2.2, -8.4, 'n/a #1', 'n/a #2' ], 'desc sort; empty to zero; string to bottom' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		assert.cacheCompare( table3, 3, [ -8.4, -2.2, -0.1, '', 5.2, 11.4, 23.6, 97.4, 'n/a #1', 'n/a #2' ], 'asc sort; empty to zero; string to bottom' );

		$table3.find('th:eq(3)').data('string', 'none');
		c3.headers[3].empty = 'bottom';
		c3.sortList = [[ 3, 1 ]]; // added to test sortList
		$table3.trigger('update');
		assert.cacheCompare( table3, 3, [ 97.4, 23.6, 11.4, 5.2, 'n/a #1', 'n/a #2', -0.1, -2.2, -8.4, '' ], 'desc sort; empty to zero; string to none/zero' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		assert.cacheCompare( table3, 3, [ -8.4, -2.2, -0.1, 'n/a #1', 'n/a #2', 5.2, 11.4, 23.6, 97.4, '' ], 'asc sort; empty to zero; string to none/zero' );

		t = [ 'x', 'X', 'y', 'Y', 'z', 'Z', 'a', 'A', 'b', 'B', 'c', 'C' ];
		assert.deepEqual( t.sort($.tablesorter.sortText), [ 'A', 'B', 'C', 'X', 'Y', 'Z', 'a', 'b', 'c', 'x', 'y', 'z' ], 'test sortText function directly' );

		t = [ 'a02', 'a10', 'a43', 'a255', 'a102', 'a33', '', 'a1', 'a55', 'a87' ];
		assert.deepEqual( t.sort($.tablesorter.sortNatural), [ '', 'a1', 'a02', 'a10', 'a33', 'a43', 'a55', 'a87', 'a102', 'a255' ], 'test sortNatural function directly' );

		assert.cacheCompare( table4, 6, [ '', '', '', '', '', '', '', '', '', '' ], 'parser-false does not extract text' );

	});

	QUnit.test( 'colspan parsing', function(assert) {
		assert.expect(3);
		// parsed colspan values (not raw)
		t = [
			'g1', '6', 'a9', 155, 'l', 'nytimes',
			'g1', '2', 'z1 957 k mit', 'z1 957 k mit', 'z1 957 k mit', 'z1 957 k mit', // colspan 4
			'g3', '0', 'a13', 17, 17, 'google',
			'g2', '8', 'z9', 10, 'g', 'facebook',
			'g1', '3', 'z24 67', 'z24 67', 'b', 'whitehouse',
			'g4', '7 a10', '7 a10', 87, 'z', 'google',
			'g3', '9', 'z12', 0, 'k nasa', 'k nasa'
		];
		assert.cacheCompare( table6,'all', t, 'colspans in tbody (duplicateSpan:true)' );

		$('#testblock').html('<table class="tablesorter">' +
			'<thead><tr><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>' +
			'<tbody>' +
				'<tr><td>1</td><td colspan="2">2</td><td>3</td></tr>' +
				'<tr><td colspan="3">y</td><td>z</td></tr>' +
				'<tr><td>a</td><td>b</td><td colspan="2">c</td></tr>' +
			'</tbody></table>')
			.find('table')
			.tablesorter({
				headers : { '*' : { sorter: 'text' } },
				duplicateSpan: false
			});
		t = [
			'1', '2', '',  '3',
			'y', '',  '',  'z',
			'a', 'b', 'c', ''
		];
		assert.cacheCompare( $('#testblock table')[0], 'all', t, 'colspans not duplicated in cache (duplicateSpan:false)' );

		// See http://stackoverflow.com/q/36449711/145346
		$('#testblock').html('<table class="tablesorter">' +
			'<thead><tr><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>' +
			'<tbody>' +
				'<tr><td>1</td><td colspan="2">2</td><td>3</td></tr>' +
				'<tr><td colspan="3"><span class="col0">y0</span><span class="col1">y1</span><span class="col2">y2</span></td><td>z</td></tr>' +
				'<tr><td>a</td><td>b</td><td colspan="2"><span class="col2">c1</span><span class="col3">c2</span></td></tr>' +
			'</tbody></table>')
			.find('table')
			.tablesorter({
				headers : { '*' : { sorter: 'text' } },
				textExtraction: function(node, table, cellIndex) {
					var $span = $(node).find('.col' + cellIndex);
					if ($span.length) {
						return $span.text();
					}
					return node.textContent;
				},
				duplicateSpan: false
			});
		t = [
			'1', '2', '2',  '3',
			'y0', 'y1',  'y2',  'z',
			'a', 'b', 'c1', 'c2'
		];
		assert.cacheCompare( $('#testblock table')[0], 'all', t, 'colspans not duplicated but textExtraction defined' );
	});

	QUnit.test( 'sorton methods', function(assert) {
		assert.expect(6);

		$table3.trigger('sorton', [[[ 0,'d' ]]]);
		assert.equal( c3.sortList + '', '0,1', 'sorton desc [0,"d"]' );

		$table3.trigger('sorton', [[[ 0,'a' ]]]);
		assert.equal( c3.sortList + '', '0,0', 'sorton asc [0,"a"]' );

		$table3.trigger('sorton', [[[ 0,'n' ]]]);
		assert.equal( c3.sortList + '', '0,1', 'sorton next [0,"n"]' );
		$table3.trigger('sorton', [[[ 0,'n' ]]]);
		assert.equal( c3.sortList + '', '0,0', 'sorton next [0,"n"]' );

		$table3.trigger('sorton', [[ [ 0,'n'], [1,'o'], [2,'s'] ]]);
		assert.equal( c3.sortList + '', '0,1,1,0,2,1', 'sorton next/opposite/same [0,"n"],[1,"o"],[2,"s"]' );

		$table3.trigger('sorton', [[ [ 0,'n'], [1,'o'], [2,'s'] ]]);
		assert.equal( c3.sortList + '', '0,0,1,1,2,0', 'sorton next/opposite/same [0,"n"],[1,"o"],[2,"s"]' );

	});
/*
	QUnit.test( 'sort Restart', function(assert) {
		assert.expect(1);
		var done = assert.async();
		c1.sortRestart = true;
		QUnit.start();
		$.tablesorter.sortReset( c1, function(){
			// 1) click on header one
			$table1.one('sortEnd', function(){
				// 2) click on header zero
				$table1.one('sortEnd', function(){
					// 3) click on header one, sortRestart should have set it back to ascending sort
					// see #1072
					$table1.one('sortEnd', function(){
						assert.equal( c1.$headers[1].className.indexOf( ts.css.sortAsc ) > -1, true );
						c1.sortRestart = false;
						done();
					});
					c1.$headers.eq(1).click();
				});
				c1.$headers.eq(0).click();
			});
			c1.$headers.eq(1).click();
		});
	});
*/
	QUnit.test( 'sort Events', function(assert) {
		assert.expect(1);

		$table1.add($table5).on( events.join('.testing '), function(e){
			if (e.type === events[sortIndx%3]) {
				sortIndx++;
			}
		});

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		$table1.trigger('sorton', [[[ 1,0 ]]]);

		// ensure all sort events fire on an empty table
		$table5.trigger('sorton', [ [[0,0]] ]);

		$table1.add($table5).off( events.join('.testing ') );

		// table1 sorted twice in the above test; sortIndx = 9 then empty table5 x1 (total = 3 events x 3)
		assert.equal( sortIndx, 9, 'sortStart, sortBegin & sortEnd fired in order x2; including empty table' );
	});

	/************************************************
		test update methods
	************************************************/
	QUnit.test( 'parser cache; update methods & callbacks', function(assert) {
		assert.expect(12);
		var oldColMax;
		c1.ignoreCase = true;
		// updateAll
		$table1
			.trigger('sorton', [ [[0,1]] ])
			.on('updateComplete.testing', function(){ updateIndx++; })
			.find('th:eq(1)').removeAttr('class').html('num').end()
			.find('td:nth-child(2)').html(function(i,h){
				return h.substring(1);
			});
		$table1
		.trigger('updateAll', [false, function(){
			updateCallback++;
			var nw = $table1.find('th:eq(1)')[0],
				ht = c1.$headers.eq(1).text() === 'num'
				hc = c1.headerContent[1] === 'num',
				hd = c1.$headers[1] === nw,
				hl = c1.headerList[1] === nw,
				p1 = c1.parsers[1].id === 'digit';
			assert.equal(ht && hc && hd && hl && p1, true, 'testing header cache: updateAll - thead');
			assert.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3,
			                                      'testc', 4, 'testb', 5, 'testa', 6, '', 0 ], 'updateAll - tbody' );
		}]);

		// updateHeader v2.23.0
		$table1
			.find('th:eq(1)').html('x-num').end()
			.trigger('updateHeaders', function(){
				updateCallback++;
				var nw = $table1.find('th:eq(1)')[0],
					ht = c1.$headers.eq(1).text() === 'x-num',
					hc = c1.headerContent[1] === 'x-num',
					hd = c1.$headers[1] === nw,
					hl = c1.headerList[1] === nw;
				assert.equal(ht && hc && hd && hl, true, 'testing header cache: updateHeaders');
			});

		// addRows
		t = $('<tr class="temp"><td>testd</td><td>7</td></tr>');
		$table1.find('tbody:last').prepend(t);
		oldColMax = c1.cache[1].colMax[1];
		$table1.trigger('addRows', [t, true, function(){
			updateCallback++;
			assert.equal( oldColMax === 6 && c1.cache[1].colMax[1] === 7, true, 'addRows includes updating colMax value');
			assert.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3,
			                                      'testd', 7, 'testc', 4, 'testb', 5, 'testa', 6, '', 0 ], 'addRows method' );
		}]);
		// the next two methods shouldn't do anything; especially not cause a javascript error!
		$table1.trigger('addRows', [null, true]);
		$table1.trigger('addRows', [$('<tr>'), true]);

		// addRows as string to table with only one tbody
		t = '<tr class="temp"><td>g</td><td>h</td><td>i</td><td>j</td></tr>';
		$table2.trigger('addRows', [t, true, function(){
			assert.cacheCompare( table2, 'all', [ 'a', 'b', 'c', 'd',
			                                      'z', 'y', 'x', 'w',
			                                      'g', 'h', 'i', 'j' ], 'addRows as string method' );
		}]);
		$table2.find('tr.temp').remove();

		// updateCell
		t = $table1.find('td:contains("7")');
		t.html('-8');
		oldColMax = c1.cache[1].colMax[1];
		$table1.trigger('updateCell', [t[0], true, function(){
			updateCallback++;
			assert.equal( oldColMax === 7 && c1.cache[1].colMax[1] === 8, true, 'updateCell includes updating colMax value');
			assert.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3,
			                                      'testd', -8, 'testc', 4, 'testb', 5, 'testa', 6, '', 0 ], 'updateCell method' );
		}]);

		// update
		$table1.find('tr.temp').remove();
		oldColMax = c1.cache[1].colMax[1];
		$table1.trigger('update', [true, function(){
			updateCallback++;
			assert.equal( oldColMax === 8 && c1.cache[1].colMax[1] === 6, true, 'update includes updating colMax value');
			assert.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3,
			                                      'testc', 4, 'testb', 5, 'testa', 6, '', 0 ], 'update method' );
		}]);

		$table5
			.on('updateComplete.testing', function(){ updateIndx++; })
			.trigger('update', [true, function(){
				updateCallback++;
				assert.cacheCompare( table5, 'all', [], 'update method on empty table' );
			}]);

		$table1.add($table5).off('updateComplete.testing');

		// table1 updated 4x in the above test
		// table5 updated 1x
		assert.equal( updateIndx, updateCallback, 'updatedComplete and update callback functions working properly' );

	});

	/************************************************
		test sortForce, sortAppend, sortMultiSortKey and sortResetKey options
	************************************************/
	QUnit.test( 'sortForce, sortAppend, sortMultiSortKey & sortResetKey; and numberSorter option', function(assert){
		assert.expect(3);

		assert.cacheCompare( table4, 3, [ 2, 1, 7, 6, 5, 3, 4, 8, 9, 10 ], 'force x2 + sorted x2 + append x2, ascending' );

		return QUnit.SequentialRunner(
			function(actions, assertions){
				return QUnit.assertOnEvent($table4, 'sortEnd', actions, assertions);
			}
		).nextTask(
			function(){
				c4.sortMultiSortKey = 'altKey';
				c4.$headers.eq(5).trigger( $.Event('sort', { which: 1, altKey: true }) );
			},
			function(){
				assert.cacheCompare( table4, 3, [ 2, 1, 6, 7, 5, 4, 3, 8, 10, 9 ], 'force x2 + sorted x2 + append x2, descending' );
			}
		).nextTask(
			function() {
				c4.sortResetKey = 'shiftKey';
				c4.$headers.eq(0).trigger( $.Event('sort', {which: 1, shiftKey: true}) );
			},
			function() {
				assert.cacheCompare( table4, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], 'sortResetKey' );
			}
		).promise();
	});

	/************************************************
		check header css
	************************************************/
	QUnit.test( 'testing header css & sortReset method', function(assert) {
		assert.expect(7);
		t = $(th0);
		assert.equal( $table1.hasClass(ts.css.table), true, 'table class applied');
		assert.equal( t.hasClass(ts.css.header), true, 'Header class present' );
		assert.equal( t.parent().hasClass(ts.css.headerRow), true, 'Header row class present' );
		assert.equal( $table1.find('tbody:eq(1)').hasClass(c1.cssInfoBlock), true, 'Tbody info block class present' );
		$table1.trigger('sorton', [[[ 0,1 ]]] );
		assert.equal( t.hasClass(ts.css.sortDesc), true, 'Descending class present' );
		$table1.trigger('sorton', [[[ 0,0 ]]] );
		assert.equal( t.hasClass(ts.css.sortAsc), true, 'Ascending class present' );
		$table1.trigger('sortReset');
		assert.equal( t.hasClass(ts.css.sortAsc) || t.hasClass(ts.css.sortDesc), false, 'Testing sortReset' );
	});

	QUnit.test( 'testing header css icons', function(assert) {
		var done = assert.async();
		assert.expect(1);
		$('#testblock2').html('<table class="tablesorter"><thead><tr>' +
				'<th>A</th>' +
				'<th>B</th>' +
				'<th>C</th>' +
				'<th class="sorter-false">D</th>' +
			'</tr></thead><tbody></tbody></table>')
		.find('table')
		.tablesorter({
			sortList: [[0,0], [1,1]],
			headerTemplate:'{content} {icon}',
			cssIconAsc: 'asc',
			cssIconDesc: 'desc',
			cssIconNone: 'none',
			cssIconDisabled: 'disabled',
			initialized: function(table){
				var i,
					results = [],
					expected = ['asc', 'desc', 'none', 'disabled'],
					c = table.config;
				for (i = 0; i < c.columns; i++){
					results[i] = c.$headers.eq(i).find('.' + ts.css.icon).hasClass(expected[i]);
				}
				assert.deepEqual( results, [true, true, true, true], 'applies correct cssIcon classes' );
				done();
			}
		});
	});

	/************************************************
		test apply widgets function using zebra widget
	************************************************/
	var zebra = function(){
		t = true;
		var classes = ['odd','even'];
		$table2.find('tbody tr').each(function(i){
			t = t ? $(this).hasClass( classes[i%2] ) : false;
		});
		return t;
	};

	QUnit.test( 'check widgetOption defaults across tables', function(assert) {
		assert.expect(4);
		assert.deepEqual(c1.widgetOptions.test, [0,1], 'widget option properly set');
		assert.deepEqual(c2.widgetOptions.test, [0], 'widget option properly set');
		assert.deepEqual(c3.widgetOptions.test, [], 'default widget option set on table');
		assert.deepEqual(ts.defaults.widgetOptions.test, [], 'default widget option set in core');
	});

	QUnit.test( 'apply zebra widget', function(assert) {
		assert.expect(3);
		assert.equal( zebra(), false, 'zebra not applied' );
		c2.widgets = [ 'zebra' ];
		$table2.trigger('applyWidgets');
		assert.equal( zebra(), true, 'zebra is applied' );
		$table2
			.append('<tr><td>s</td><td>t</td><td>u</td><td>v</td></tr>')
			.trigger('update');
		assert.equal( zebra(), true, 'zebra is applied after update' );
	});

	/************************************************
		test has widget function
	************************************************/
	QUnit.test( 'has & remove zebra widget', function(assert) {
		var done = assert.async();
		assert.expect(4);
		c2.widgets = [ 'zebra' ];
		$table2.trigger('applyWidgets', function() {
			assert.equal( ts.hasWidget(  table2, 'zebra'), true, 'table has zebra widget (using table element object)' );
			assert.equal( ts.hasWidget( $table2, 'zebra'), true, 'table has zebra widget (using jQuery table object)' );
			$table2.one( 'widgetRemoveEnd', function() {
				assert.ok( true, 'widgetRemoveEnd fired');
				assert.equal( zebra() && c2.widgets.length === 0, false, 'zebra removed' );
				done();
			});
			ts.removeWidget( table2, 'zebra' );
		});
	});

	/************************************************
		check destroy method
	************************************************/
	QUnit.test('testing destroy method', function(assert) {
		$table2.trigger('sorton', [[[ 0,1 ]]] );
		$table2.trigger('destroy');
		assert.expect(7);
		t = $table2.find('th:first');
		e = jQuery._data(table2, 'events'); // get a list of all bound events
		assert.equal( $.isEmptyObject(e), true, 'no events applied' );
		assert.equal( $table2.data().hasOwnProperty('tablesorter'), false, 'Data removed' );
		assert.equal( $table2.attr('class'), 'tester', 'All table classes removed' );
		assert.equal( $table2.find('tr:first').attr('class'), '', 'Header row class removed' );
		assert.equal( t.attr('class').match('tablesorter'), null, 'Header classes removed' );
		assert.equal( t.children().length, 0, 'Inner wrapper removed' );
		assert.equal( typeof (t.data().column) , 'undefined', 'data-column removed');

		$table2.tablesorter();
	});

	/************************************************
		extract widgets from table class
	************************************************/
	QUnit.test('extract widget names from table class', function(assert) {
		assert.expect(2);
		var widgets,
		t = {
			className: 'widget-filter widget-stickyHeaders ui-widget-content widget-test-2',
			config: {
				widgetClass: 'widget-{name}',
				widgets: []
			}
		};
		ts.addWidgetFromClass( t );
		assert.deepEqual( t.config.widgets, [ 'filter', 'stickyHeaders', 'test-2' ], 'Ignored "ui-widget-content"' );

		t.className = 'stickyHeaders-widgey ui-widgey-content filter-widgey test-2-widgey';
		t.config.widgetClass = '{name}-widgey';
		t.config.widgets = [];
		ts.addWidgetFromClass( t );
		assert.deepEqual( t.config.widgets, [ 'stickyHeaders', 'filter', 'test-2' ], 'Modified widgetClass option' );

	});


	/************************************************
		ipv6 parser testing
	************************************************/
	ipv6tests();

});
