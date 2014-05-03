/*!
* TableSorter QUnit Testing
*/
/*jshint unused: false */
/*global QUnit: false, JSHINT: false, ok: false, start: false, deepEqual: false, asyncTest: false */

/************************************************
	QUnit skip testing
	http://stackoverflow.com/q/13748129/145346
************************************************/
QUnit.testSkip = function( testName, callback ) {
	QUnit.test(testName + ' (SKIPPED)', function() {
		if (typeof callback === "function") {
			callback();
		}
		var $li = $('#' + QUnit.config.current.id);
		QUnit.done(function() {
			$li.addClass('skipped');
		});
	});
};

var tester = {

	/************************************************
		JSHint testing
	************************************************/
	jsHintTest : function(name, sourceFile, options) {
		// Chrome & Opera don't allow ajax loading of script files
		if (QUnit.isLocal && /Chrome|Opera/.test(navigator.userAgent)) {
			return QUnit.testSkip(name, function(){
				ok( true, 'test cannot be done locally' );
			});
		}
		function validateFile(source) {
			var i, len, err,
			result = JSHINT(source, options),
			errors = JSHINT.errors;
			ok(result);
			if (result) {
				return;
			}
			for (i = 0, len = errors.length; i < len; i++) {
				err = errors[i];
				if (!err) {
					continue;
				}
				ok(false, err.reason + " on line " + err.line +
					", character " + err.character);
			}
		}
		return asyncTest(name, function() {
			$.ajax({
				url: sourceFile,
				dataType: 'script',
				success: function(source) {
					start();
					validateFile(source);
				}
			});
		});
	},

	/************************************************
		test table data cache
	************************************************/
	cacheCompare : function(table, col, expected, txt, filtered){
		var i, j = 0, k, l,
			c = table.config,
			result = [],
			b = table.tBodies,
			l2 = c.columns;
		for (k = 0; k < b.length; k++){
			l = b[k].rows.length;
			for (j = 0; j < l; j++) {
				if (filtered && c.cache[k].normalized[j][c.columns].$row.hasClass('filtered')) {
					continue;
				}
				if (col === 'all') {
					// return all columns
					for (i = 0; i < l2; i++) {
						result.push( c.cache[k].normalized[j] ? c.cache[k].normalized[j][i] : '' );
					}
				} else {
					// return specific column
					result.push( c.cache[k].normalized[j] ? c.cache[k].normalized[j][col] : '' );
				}
			}
		}
		deepEqual( result, expected, 'testing parser cache: ' + txt);
	}

};

/*
Core plugin tested
========================
OPTIONS:
	cssAsc, cssChildRow, cssDesc, cssHeader, cssHeaderRow, cssInfoBlock, dateFormat, emptyTo, headerList,
	headers, ignoreCase, initialized, parsers, sortList, sortLocaleCompare, sortReset, stringTo, tableClass,
	usNumberFormat, widgets (just zebra), sortAppend, sortForce, sortMultiSortKey, sortResetKey, numberSorter

METHODS:
	addRows, applyWidgets, destroy, sorton, sortReset, update/updateRow, updateAll, updateCell

EVENTS:
	initialized, sortBegin, sortEnd, sortStart, updateComplete

Not yet tested
=========================
OPTIONS:
	cancelSelection, cssIcon, cssProcessing, debug, delayInit, headerTemplate, initWidgets, onRenderHeader,
	onRenderTemplate, selectorHeaders, selectorRemove, selectorSort, serverSideSorting, showProcessing,
	sortInitialOrder, sortRestart, strings,
	textExtraction, textSorter, theme, widthFixed, widgets (also need priority testing)

METHODS:
	appendCache, applyWidgetId, sort, refreshWidgets

EVENTS:
	-
*/

$(function(){

	var ts = $.tablesorter,
		$table1 = $('#table1'),
		$table2 = $('#table2'),
		$table3 = $('#table3'),
		$table4 = $('#table4'),
		$table5 = $('#table5'), // empty table
		table1 = $table1[0],
		table2 = $table2[0],
		table3 = $table3[0],
		table4 = $table4[0],
		th0 = $table1.find('th')[0], // first table header cell
		init = false,
		sortIndx = 0,
		updateIndx = 0,
		updateCallback = 0,
		events = ['sortStart', 'sortBegin', 'sortEnd', ' '],
		returnTime = function(string){
			return new Date(string).getTime();
		},
		undef, c1, c2, c3, c4, e, i, l, t;

	$table1
		.bind('tablesorter-initialized', function(){
			init = true;
		})
		.tablesorter();

	$table2.tablesorter({
		headers: {
			0: { sorter: 'text' },
			1: { sorter: 'text' },
			2: { sorter: false }
		}
	});

	$table3.tablesorter({
		emptyTo: "bottom",
		stringTo: "max", // non-numeric content is treated as a MAX value
		headers: {
			0: { empty : "top" }, // sort empty cells to the top
			2: { string: "min" }, // non-numeric content is treated as a MIN value
			3: { sorter: "digit", empty : "zero", string : "top" }
		}
	});

	$table4.tablesorter({
		sortAppend : [[2,0],[3,0]],
		sortForce : [[0,0],[1,0]],
		initialized: function(table){
			var e, c = table.config;
			// trigger sort on 5th column
			// this method is used because triggering a "sorton" would ignore sortForce/sortAppend
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

	module('JSHint');
	/************************************************
		JSHint testing
	************************************************/
	// Run JSHint on main js files
	tester.jsHintTest('JSHint core', 'js/jquery.tablesorter.js');
	tester.jsHintTest('JSHint pager', 'addons/pager/jquery.tablesorter.pager.js');
	tester.jsHintTest('JSHint widgets', 'js/jquery.tablesorter.widgets.js');
	tester.jsHintTest('JSHint group widget', 'js/widgets/widget-grouping.js');
	tester.jsHintTest('JSHint scroller widget', 'js/widgets/widget-scroller.js');

	module('core');
	/************************************************
		Initialization
	************************************************/
	test( "tablesorter loaded & initialized", function() {
		expect(3);
		equal( typeof ts, 'object', "tablesorter loaded");
		equal( table1.hasInitialized, true, "tablesorter initialized flag");
		equal( init, true, "tablesorter initialized event");
	});

	c1 = table1.config;
	c2 = table2.config;
	c3 = table3.config;
	c4 = table4.config;

	/************************************************
		Test column numbering
	************************************************/
	// later: include a table header with colspan & rowspan
	test( "column numbering", function() {
		expect(2);
		var internalColumn = true,
			dataColumn = true;
		$table4.find('thead th').each(function(i){
			var $this = $(this);
			internalColumn = internalColumn && this.column === i;
			dataColumn = dataColumn && $(this).attr('data-column') == i;
		});
		equal( internalColumn, true, "Correct internal column numbering" );
		equal( dataColumn, true, "Correct data-column attribute numbering" );
	});

	/************************************************
		check isDigit function
	************************************************/
	var d = ts.isDigit;
	test( "isDigit", function() {
		expect(17);
		ok( d('-1'),   "allow negative (-1)");
		ok( d('+1'),   "allow plus (+1)");
		ok( d('(1)'),  "allow parenthesis (1)");
		ok( d('123'),  "string has numbers ('123')");
		ok( d(123),    "has numbers (123)");
		ok( d('1.2'),  "remove decimal (1.2)");
		ok( d('1,234'),"remove commas (1,234)");
		ok( d("11'"),  "remove apostrophe's (11')"); // 11 feet
		ok( d('3\'4"'),"remove quotes (3'4\")"); // 3 foot 4 inches
		ok( d(' 12 '), "remove spaces ( 12 )");
		ok( !d('x'),   "non-digit alphabet");
		ok( !d('1x'),  "digit + alphabet");
		ok( !d('x1'),  "alphabet + digit");
		ok( !d('@'),   "non-digit symbols");
		ok( !d('1-'),  "negative after (1-) not allowed?");
		ok( !d('1+'),  "plus after (1+) not allowed?");
		ok( !d('$2'),  "no money; the currency parser will catch these");
	});

	/************************************************
		check formatFloat function
	************************************************/
	var ff = function(str) {
		return ts.formatFloat(str, table1);
	};
	test( "formatFloat", function() {
		expect(18);
		strictEqual( ff(''), '', 'returns empty string' );
		strictEqual( ff(5), 5, 'returns numerical values');

		c1.usNumberFormat = false;
		strictEqual( ts.formatFloat('1,234,567.89'), 1234567.89, 'use format float without including table - defaults to US number format');

		strictEqual( ff('1 234,56'), 1234.56, 'parse non-U.S. (French) number format');
		strictEqual( ff('1.234,56'), 1234.56, 'parse non-U.S. (German) number format');
		strictEqual( ff('-32,32'), -32.32, 'negative non-U.S. signed numbers');
		strictEqual( ff('-1.234,56'), -1234.56, 'negative non-U.S. signed numbers');
		strictEqual( ff('(32,32)'), -32.32, 'parenthesis wrapped non-U.S. negative number');
		strictEqual( ff('  (32,32) '), -32.32, 'space + parenthesis wrapped non-U.S. negative number');

		c1.usNumberFormat = true;
		strictEqual( ff('1,234.56'), 1234.56, 'parse U.S. number format');
		strictEqual( ff('-32.32'), -32.32, 'negative U.S. signed numbers');
		strictEqual( ff('(32.32)'), -32.32, 'parenthesis wrapped U.S. negative number');
		strictEqual( ff('  (32.32)'), -32.32, 'space + parenthesis wrapped U.S. negative number');

		strictEqual( ff('fred'), 'fred', 'return string if not a number');
		strictEqual( ff('  fred '), 'fred', 'return trimmed string if not a number');
		strictEqual( ff('fred 12'), 'fred 12', 'return string if number not at beginning');
		strictEqual( ff('12fred'), 12, 'parse number + string into number only');
		strictEqual( ff('(fred)'), '(fred)', 'leave parenthesis intact on strings');

	});

	/************************************************
		get data function - jQuery data > meta > headers option > header class name
	************************************************/
	var gd = function(n){
		return ts.getData( c2.$headers[n], c2.headers[n], 'sorter' );
	};

	test( "getData", function() {
		expect(4);
		var txt = [ 'jQuery data', 'meta data', 'headers option', 'header class name' ];
		for (i = 0; i < 4; i++) {
			equal( gd(i), 'false', txt[i]); // all columns have sorter false set
		}
	});

	/************************************************
		character equivalent replacement
	************************************************/
	test( "replace accents", function() {
		expect(6);
		strictEqual( ts.replaceAccents('\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5'), 'aaaaaaaAAAAAAA', "replaced a's");
		strictEqual( ts.replaceAccents('\u00e9\u00e8\u00ea\u00eb\u011b\u0119\u00c9\u00c8\u00ca\u00cb\u011a\u0118'), 'eeeeeeEEEEEE', "replaced e's");
		strictEqual( ts.replaceAccents('\u00ed\u00ec\u0130\u00ee\u00ef\u0131\u00cd\u00cc\u0130\u00ce\u00cf'), 'iiiiiiIIiII', "replaced i's");
		strictEqual( ts.replaceAccents('\u00f3\u00f2\u00f4\u00f5\u00f6\u00d3\u00d2\u00d4\u00d5\u00d6'), 'oooooOOOOO', "replaced o's");
		strictEqual( ts.replaceAccents('\u00fa\u00f9\u00fb\u00fc\u016f\u00da\u00d9\u00db\u00dc\u016e'), 'uuuuuUUUUU', "replaced u's");
		strictEqual( ts.replaceAccents('\u00e7\u0107\u010d\u00c7\u0106\u010c\u00df\u1e9e'), 'cccCCCssSS', "replaced c & s sharp");
	});

	/************************************************
		check all default parsers
	************************************************/
	var p = ts.parsers,
	// test by parser
	parserTests = 85,
	// skipping metadata parser
	sample1 = {
		'text'      : { 'test': 'test', 'TesT': 'test', '\u00e1 test': '\u00e1 test' },
		'currency'  : { '\u00a31': 1, '($2.23)': -2.23, '5\u20ac': 5, '(11\u00a4)': -11, '500\u00a5': 500, '25\u00a2': 25, '$1,000.50': 1000.5 },
		'ipAddress' : { '255.255.255.255': 255255255255, '32.32.32.32': 32032032032, '1.1.1.1': 1001001001 },
		'url'       : { 'http://google.com': 'google.com', 'ftp://fred.com': 'fred.com', 'https://github.com': 'github.com' },
		'isoDate'   : { '2012/12/12': returnTime('2012/12/12'), '2012-12/12': returnTime('2012/12/12'), '2013-1-1': returnTime('2013/1/1'), '2013/1/1 12:34:56 AM': returnTime('2013/1/1 12:34:56 AM') },
		'percent'   : { '100%': 100, '22%': 22, '%2': 2, '2 %': 2, '(4%)': -4, '1,234.56    %': 1234.56 },
		'usLongDate': { 'Feb 23, 1999': returnTime('Feb 23, 1999'), 'Feb 23, 1999 12:34': returnTime('Feb 23, 1999 12:34'), 'Feb 23, 1999 12:34 AM': returnTime('Feb 23, 1999 12:34 AM'), 'Feb 23, 1999 12:34:56 PM': returnTime('Feb 23, 1999 12:34:56 PM'), '01 Jan 2013': returnTime('01 Jan 2013') },
		'shortDate' : { '1/2/2001': returnTime('1/2/2001'), '1 2 2001': returnTime('1/2/2001'), '1.2.2001': returnTime('1/2/2001'), '1-2-2001': returnTime('1/2/2001'), '1/2/2001 12:34 PM' : returnTime('1/2/2001 12:34 PM'), '1.2.2001 13:34' : returnTime('1/2/2001 13:34') },
		'time'      : { '12:34 AM': returnTime('2000/01/01 12:34 AM'), '1:00 pm': returnTime('2000/01/01 1:00 pm') },
		'digit'     : { '12': 12, '$23': 23, '&44^': 44, '#(33)': -33, '1,000': 1000, '12.34': 12.34 }
	},
	// switch ignoreCase, sortLocalCompare & shortDate "ddmmyyyy"
	sample2 = {
		'text'      : { 'TesT': 'TesT', '\u00e1 test': 'a test' },
		'currency'  : { '\u20ac 123 456,78': 123456.78, '\u20ac 123.456,78': 123456.78 },
		'shortDate' : { '2/1/2001': returnTime('1/2/2001'), '2-1-2001': returnTime('1/2/2001'), '2 1,2001': returnTime('1/2/2001') }
	},
	// shortdate to "yyyymmdd"
	sample3 = {
		'shortDate' : { '2001/1/2': returnTime('1/2/2001'), '2001-1/2': returnTime('1/2/2001'), '2001,1.2': returnTime('1/2/2001') }
	},
	report = function(s) {
		for (i = 0; i < p.length; i++) {
			t = p[i].id;
			if (s.hasOwnProperty(t)) {
				$.each(s[t], function(k,v){
					// check "is" and "format" functions
					if (p[i].is(k)) {
						equal( p[i].format(k, table1, th0, 0), v, t + ' parser: "' + k + '" parsed to ' + v );
					} else {
						equal( p[i].format(k, table1, th0, 0), v, t + ' parser **NOT DETECTED**: "' + k + '", but returns ' + v );
					}
				});
				// test for undefined & null - probably overkill
				strictEqual( p[i].format(undef, table1, th0, 0), undef, t + ' parser: will return undefined values properly' );
				strictEqual( p[i].format(null, table1, th0, 0), null, t + ' parser: will return null values properly' );
			}
		}
	};

	test( "testing parsers", function() {
		expect(parserTests);
		report(sample1);

		c1.sortLocaleCompare = true;
		c1.ignoreCase = false;
		c1.usNumberFormat = false;
		th0.dateFormat = c1.dateFormat = "ddmmyyyy";
		report(sample2);

		c1.usNumberFormat = true;
		th0.dateFormat = c1.dateFormat = "yyyymmdd";
		report(sample3);

		// undocumented sortValue
		equal( ts.getParserById('metadata').format(null, table1, th0, 0), 'zzz', 'metadata parser found sortValue');
		c1.parserMetadataName = 'poe';
		equal( ts.getParserById('metadata').format(null, table1, th0, 0), 'nevermore', 'metadata parser found poe');

	});

	test( "textExtraction Method", function() {
		expect(2);

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		tester.cacheCompare( table1, 0, [ 'test1', 'test2', 'test3', '', 'testa', 'testb', 'testc' ], 'from data-attribute' );

		$table3.trigger('sorton', [[[ 0,1 ]]]);
		tester.cacheCompare( table3, 0, [ '', 'a255', 'a102', 'a87', 'a55', 'a43', 'a33', 'a10', 'a02', 'a1' ], 'ignore data-attribute' );

	});

	/************************************************
		test parser cache
	************************************************/
	test( "parser cache; sorton methods; empty & string", function() {
		expect(17);
		$table1.trigger('sortReset');

		// lower case because table was parsed before c1.ignoreCase was changed
		tester.cacheCompare( table1, 'all', [ 'test2', 'x2', 'test1', 'x3', 'test3', 'x1', '', '', 'testb', 'x5', 'testc', 'x4', 'testa', 'x6' ], 'unsorted' );

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		tester.cacheCompare( table1, 'all', [ 'test1', 'x3', 'test2', 'x2', 'test3', 'x1', '', '', 'testa', 'x6', 'testb', 'x5', 'testc', 'x4' ], 'ascending sort' );

		$table1.trigger('sorton', [[[ 0,1 ]]]);
		tester.cacheCompare( table1, 'all', [ 'test3', 'x1', 'test2', 'x2', 'test1', 'x3', '', '', 'testc', 'x4', 'testb', 'x5', 'testa', 'x6' ], 'descending sort' );

		// empty cell position
		$table3.trigger('sorton', [[[ 0,0 ]]]);
		tester.cacheCompare( table3, 0, [ '', 'a1', 'a02', 'a10', 'a33', 'a43', 'a55', 'a87', 'a102', 'a255' ], 'asc sort; empty to top' );

		$table3.trigger('sorton', [[[ 0,1 ]]]);
		tester.cacheCompare( table3, 0, [ '', 'a255', 'a102', 'a87', 'a55', 'a43', 'a33', 'a10', 'a02', 'a1' ], 'desc sort; empty to top' );

		// string position within number column
		$table3.trigger('sorton', [[[ 1,0 ]]]);
		tester.cacheCompare( table3, 1, [ -35, -5, -1, 1, 2, 4, 33, 44, 'nr', '' ], 'asc sort; empty to bottom; string to max' );

		$table3.trigger('sorton', [[[ 1,1 ]]]);
		tester.cacheCompare( table3, 1, [ 'nr', 44, 33, 4, 2, 1, -1, -5, -35, '' ], 'desc sort; empty to bottom; string to max' );

		$table3.trigger('sorton', [[[ 2,0 ]]]);
		tester.cacheCompare( table3, 2, [ 'nr', 'nr', 1, 2, 3, 4, 5, 6, 7, '' ], 'asc sort; empty to bottom; string to min' );

		$table3.trigger('sorton', [[[ 2,1 ]]]);
		tester.cacheCompare( table3, 2, [ 7, 6, 5, 4, 3, 2, 1, 'nr', 'nr', '' ], 'desc sort; empty to bottom; string to min' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		tester.cacheCompare( table3, 3, [ 'n/a #2', 'n/a #1', -8.4, -2.2, -0.1, '', 5.2, 11.4, 23.6, 97.4 ], 'asc sort; empty to zero; string to top' );

		$table3.trigger('sorton', [[[ 3,1 ]]]);
		tester.cacheCompare( table3, 3, [ 'n/a #2', 'n/a #1', 97.4, 23.6, 11.4, 5.2, '', -0.1, -2.2, -8.4 ], 'desc sort; empty to zero; string to top' );

		$table3.find('th:eq(3)').data('string', 'bottom');
		$table3.trigger('update');
		tester.cacheCompare( table3, 3, [ 97.4, 23.6, 11.4, 5.2, '', -0.1, -2.2, -8.4, 'n/a #1', 'n/a #2' ], 'desc sort; empty to zero; string to bottom' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		tester.cacheCompare( table3, 3, [ -8.4, -2.2, -0.1, '', 5.2, 11.4, 23.6, 97.4, 'n/a #1', 'n/a #2' ], 'asc sort; empty to zero; string to bottom' );

		$table3.find('th:eq(3)').data('string', 'none');
		c3.headers[3].empty = "bottom";
		c3.sortList = [[ 3, 1 ]]; // added to test sortList
		$table3.trigger('update');
		tester.cacheCompare( table3, 3, [ 97.4, 23.6, 11.4, 5.2, 'n/a #1', 'n/a #2', -0.1, -2.2, -8.4, '' ], 'desc sort; empty to zero; string to none/zero' );

		$table3.trigger('sorton', [[[ 3,0 ]]]);
		tester.cacheCompare( table3, 3, [ -8.4, -2.2, -0.1, 'n/a #1', 'n/a #2', 5.2, 11.4, 23.6, 97.4, '' ], 'asc sort; empty to zero; string to none/zero' );

		t = [ 'x', 'X', 'y', 'Y', 'z', 'Z', 'a', 'A', 'b', 'B', 'c', 'C' ];
		deepEqual( t.sort($.tablesorter.sortText), [ 'A', 'B', 'C', 'X', 'Y', 'Z', 'a', 'b', 'c', 'x', 'y', 'z' ], 'test sortText function directly' );

		t = [ 'a02', 'a10', 'a43', 'a255', 'a102', 'a33', '', 'a1', 'a55', 'a87' ];
		deepEqual( t.sort($.tablesorter.sortNatural), [ '', 'a1', 'a02', 'a10', 'a33', 'a43', 'a55', 'a87', 'a102', 'a255' ], 'test sortNatural function directly' );

	});

	test( "sort Events", function(){
		expect(1);

		$table1.add($table5).bind( events.join('.testing '), function(e){
			if (e.type === events[sortIndx%3]) {
				sortIndx++;
			}
		});

		$table1.trigger('sorton', [[[ 0,0 ]]]);
		$table1.trigger('sorton', [[[ 1,0 ]]]);

		// ensure all sort events fire on an empty table
		$table5.trigger('sorton', [ [[0,0]] ]);

		$table1.add($table5).unbind( events.join('.testing ') );

		// table1 sorted twice in the above test; sortIndx = 9 then empty table5 x1 (total = 3 events x 3)
		equal( sortIndx, 9, 'sortStart, sortBegin & sortEnd fired in order x2; including empty table' );
	});

	/************************************************
		test update methods
	************************************************/
	test( "parser cache; update methods & callbacks", function() {
		expect(10);
		var oldColMax;
		c1.ignoreCase = true;
		// updateAll
		$table1
			.trigger('sorton', [ [[0,1]] ])
			.bind('updateComplete.testing', function(){ updateIndx++; })
			.find('th:eq(1)').removeAttr('class').html('num').end()
			.find('td:nth-child(2)').html(function(i,h){
				return h.substring(1);
			});
		$table1
		.trigger('updateAll', [false, function(){
			updateCallback++;
			var nw = $table1.find('th:eq(1)')[0],
				hc = c1.headerContent[1] === 'num',
				hd = c1.$headers[1] === nw,
				hl = c1.headerList[1] === nw,
				p1 = c1.parsers[1].id === 'digit';
			equal(hc && hd && hl && p1, true, 'testing header cache: updateAll - thead');
			tester.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3, '', '', 'testc', 4, 'testb', 5, 'testa', 6 ], 'updateAll - tbody' );
		}]);

		// addRows
		t = $('<tr class="temp"><td>testd</td><td>7</td></tr>');
		$table1.find('tbody:last').prepend(t);
		oldColMax = c1.cache[2].colMax[1];
		$table1.trigger('addRows', [t, true, function(){
			updateCallback++;
			equal( oldColMax === 6 && c1.cache[2].colMax[1] === 7, true, 'addRows includes updating colMax value');
			tester.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3, '', '', 'testd', 7, 'testc', 4, 'testb', 5, 'testa', 6 ], 'addRows method' );
		}]);

		// updateCell
		t = $table1.find('td:contains("7")');
		t.html('-8');
		oldColMax = c1.cache[2].colMax[1];
		$table1.trigger('updateCell', [t[0], true, function(){
			updateCallback++;
			equal( oldColMax === 7 && c1.cache[2].colMax[1] === 8, true, 'updateCell includes updating colMax value');
			tester.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3, '', '', 'testd', -8, 'testc', 4, 'testb', 5, 'testa', 6 ], 'updateCell method' );
		}]);

		// update
		$table1.find('tr.temp').remove();
		oldColMax = c1.cache[2].colMax[1];
		$table1.trigger('update', [true, function(){
			updateCallback++;
			equal( oldColMax === 8 && c1.cache[2].colMax[1] === 6, true, 'update includes updating colMax value');
			tester.cacheCompare( table1, 'all', [ 'test3', 1, 'test2', 2, 'test1', 3, '', '', 'testc', 4, 'testb', 5, 'testa', 6 ], 'update method' );
		}]);

		$table5
			.bind('updateComplete.testing', function(){ updateIndx++; })
			.trigger('update', [true, function(){
				updateCallback++;
				tester.cacheCompare( table5, 'all', [], 'update method on empty table' );
			}]);

		$table1.add($table5).unbind('updateComplete.testing');

		// table1 updated 4x in the above test
		// table5 updated 1x
		equal( updateIndx, updateCallback, 'updatedComplete and update callback functions working properly' );

	});

	/************************************************
		test sortForce, sortAppend, sortMultiSortKey and sortResetKey options
	************************************************/
	asyncTest( "sortForce, sortAppend, sortMultiSortKey & sortResetKey; and numberSorter option", function(){
		expect(3);
		var count = 0;
		tester.cacheCompare( table4, 3, [ 2, 1, 7, 6, 5, 3, 4, 8, 9, 10 ], 'force x2 + sorted x2 + append x2, ascending' );
		$table4.on('sortEnd', function(){
			count++;
			if (count === 1) {
				tester.cacheCompare( table4, 3, [ 2, 1, 6, 7, 5, 4, 3, 8, 10, 9 ], 'force x2 + sorted x2 + append x2, descending' );
				c4.sortResetKey = 'shiftKey';
				var e = $.Event('sort');
				e.which = 1;
				e.shiftKey = true; // testing sortResetKey
				c4.$headers.eq(0).trigger(e);
			} else {
				tester.cacheCompare( table4, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], 'sortResetKey' );
				$table4.off('sortEnd');
				start();
			}
		});
		var e = $.Event('sort');
		c4.sortMultiSortKey = 'altKey';
		e.which = 1;
		e.altKey = true; // testing sortMultiSortKey
		c4.$headers.eq(5).trigger(e);
	});

	/************************************************
		check header css
	************************************************/
	test( "testing header css & sortReset method", function(){
		expect(7);
		t = $(th0);
		equal( $table1.hasClass(ts.css.table), true, 'table class applied');
		equal( t.hasClass(ts.css.header), true, 'Header class present' );
		equal( t.parent().hasClass(ts.css.headerRow), true, 'Header row class present' );
		equal( $table1.find('tbody:eq(1)').hasClass(c1.cssInfoBlock), true, 'Tbody info block class present' );
		$table1.trigger('sorton', [[[ 0,1 ]]] );
		equal( t.hasClass(ts.css.sortDesc), true, 'Descending class present' );
		$table1.trigger('sorton', [[[ 0,0 ]]] );
		equal( t.hasClass(ts.css.sortAsc), true, 'Ascending class present' );
		$table1.trigger('sortReset');
		equal( t.hasClass(ts.css.sortAsc) || t.hasClass(ts.css.sortDesc), false, 'Testing sortReset' );
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

	test( "apply zebra widget", function(){
		expect(3);
		equal( zebra(), false, 'zebra not applied' );
		c2.widgets = [ 'zebra' ];
		$table2.trigger('applyWidgets');
		equal( zebra(), true, 'zebra is applied' );
		$table2
			.append('<tr><td>s</td><td>t</td><td>u</td><td>v</td></tr>')
			.trigger('update');
		equal( zebra(), true, 'zebra is applied after update' );
	});

	/************************************************
		check destroy method
	************************************************/
	test("testing destroy method", function(){
		$table2.trigger('sorton', [[[ 0,1 ]]] );
		$table2.trigger('destroy');
		expect(7);
		t = $table2.find('th:first');
		e = jQuery._data(table2, 'events'); // get a list of all bound events
		equal( $.isEmptyObject(e), true, 'no events applied' );
		equal( $table2.data().hasOwnProperty('tablesorter'), false, 'Data removed' );
		equal( $table2.attr('class'), 'tester', 'All table classes removed' );
		equal( $table2.find('tr:first').attr('class'), '', 'Header row class removed' );
		equal( t.attr('class').match('tablesorter'), null, 'Header classes removed' );
		equal( t.children().length, 0, 'Inner wrapper removed' );
		equal( typeof (t.data().column) , 'undefined', 'data-column removed');

		$table2.tablesorter();
	});

	/************************************************
		ipv6 parser testing
	************************************************/
	ipv6tests();

});
