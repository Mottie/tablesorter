/*!
* TableSorter QUnit Testing
*/
/*jshint unused: false */
/*global QUnit: false, JSHINT: false, ok: false, start: false, deepEqual: false, asyncTest: false */

/*
Filter widget tested parts
========================
OPTIONS:
	filter_defaultAttrib, filter_ignoreCase, filter_startsWith

CLASSES:
	filter-false, filter-match, filter-parsed

METHODS:
	filterReset, search (false), setFilters

EVENTS:
	filterInit, filterEnd

Not yet tested
=========================
OPTIONS:
	filter_childRows, filter_columnFilters, filter_cssFilter, filter_external,
	filter_filteredRow, filter_formatter, filter_functions, filter_hideEmpty,
	filter_hideEmpty, filter_liveSearch, filter_onlyAvail, filter_placeholder,
	filter_reset, filter_saveFilters, filter_searchDelay, filter_selectSource,
	filter_serversideFiltering, filter_useParsedData

CLASSES:
	filter-select, filter-select-nosort, filter-onlyAvail

METHODS:
	search (array), getFilters, external filters

EVENTS:
	filterStart
*/

$(function(){
	module('Widgets');

	var ts = $.tablesorter,
	callback = {},
	callbackName = 'init',

	// filter widget table
	$table = $('#testblock').html('<table class="tablesorter">' +
		'<thead><tr>' +
			'<th class="filter-false">Rank</th>' +
			'<th class="filter-match">First Name</th>' +
			'<th>Last Name</th>' +
			'<th data-value="<20">Age</th>' +
			'<th>Total</th>' +
			'<th>Discount</th>' +
			'<th>Date</th>' +
		'</tr></thead><tbody>' +
			'<tr><td>1</td><td>Philip Aaron Wong</td><td>Johnson Sr Esq</td><td>25</td><td>$5.95</td><td>22%</td><td>Jun 26, 2004 7:22 AM</td></tr>' +
			'<tr><td>11</td><td>Aaron</td><td>Hibert</td><td>12</td><td>$2.99</td><td>5%</td><td>Aug 21, 2009 12:21 PM</td></tr>' +
			'<tr><td>12</td><td>Brandon Clark</td><td>Henry Jr</td><td>51</td><td>$42.29</td><td>18%</td><td>Oct 13, 2000 1:15 PM</td></tr>' +
			'<tr><td>111</td><td>Peter</td><td>Parker</td><td>28</td><td>$9.99</td><td>20%</td><td>Jul 6, 2006 8:14 AM</td></tr>' +
			'<tr><td>21</td><td>John</td><td>Hood</td><td>33</td><td>$19.99</td><td>25%</td><td>Dec 10, 2002 5:14 AM</td></tr>' +
			'<tr><td>013</td><td>Clark</td><td>Kent Sr.</td><td>18</td><td>$15.89</td><td>44%</td><td>Jan 12, 2003 11:14 AM</td></tr>' +
			'<tr><td>005</td><td>Bruce</td><td>Almighty Esq</td><td>45</td><td>$153.19</td><td>44%</td><td>Jan 18, 2021 9:12 AM</td></tr>' +
			'<tr><td>10</td><td>Alex</td><td>Dumass</td><td>13</td><td>$5.29</td><td>4%</td><td>Jan 8, 2012 5:11 PM</td></tr>' +
			'<tr><td>16</td><td>Jim</td><td>Franco</td><td>24</td><td>$14.19</td><td>14%</td><td>Jan 14, 2004 11:23 AM</td></tr>' +
			'<tr><td>166</td><td>Bruce Lee</td><td>Evans</td><td>22</td><td>$13.19</td><td>11%</td><td>Jan 18, 2007 9:12 AM</td></tr>' +
			'<tr><td>100</td><td>Brenda Dexter</td><td>McMasters</td><td>18</td><td>$55.20</td><td>15%</td><td>Feb 12, 2010 7:23 PM</td></tr>' +
			'<tr><td>55</td><td>Dennis</td><td>Bronson</td><td>65</td><td>$123.00</td><td>32%</td><td>Jan 20, 2001 1:12 PM</td></tr>' +
			'<tr><td>9</td><td>Martha</td><td>delFuego</td><td>25</td><td>$22.09</td><td>17%</td><td>Jun 11, 2011 10:55 AM</td></tr>' +
		'</tbody></table>').find('table'),
	table = $table[0],

	/************************************************
		Filter widget
	************************************************/
	init = false,
	runOnce = false,

	runFilterTests = function(){

		var c = table.config,
			wo = c.widgetOptions;

		test( 'Filter: init', function() {
			expect(6);

			equal( init, true, 'Init event' );
			equal( $table.hasClass('hasFilters'), true, '`hasFilters` class applied' );

			equal( ts.filter.regex.child.test( c.cssChildRow ), true, 'child row regex check' );
			equal( ts.filter.regex.filtered.test( wo.filter_filteredRow ), true, 'filtered row regex check' );
			equal ( c.$table.find('.tablesorter-filter').eq(0).hasClass('disabled'), true, 'filter disabled' );

			tester.cacheCompare( table, 3, [ 12, 18, 13, 18 ], 'starting filter value on age column', true );
		});

		asyncTest( 'Filter searches', function() {
			expect(27);

			callbackName = 'regular';
			callback['regular'] = function(){
				tester.cacheCompare( table, 1, ['Peter', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter', 'Dennis'], 'search regular', true );
			}
			ts.setFilters( table, ['', 'e'], true );
			stop();

			callbackName = 'fuzzy1';
			callback['fuzzy1'] = function(){
				tester.cacheCompare( table, 1, ['Bruce Lee', 'Brenda Dexter'], 'search fuzzy', true );
			}
			ts.setFilters( table, ['', '~bee'], true );
			stop();

			callbackName = 'fuzzy2';
			callback['fuzzy2'] = function(){
				tester.cacheCompare( table, 1, ['Philip Aaron Wong'], 'search fuzzy2', true );
			}
			ts.setFilters( table, ['', '~piano'], true );
			stop();

			callbackName = 'exact';
			callback['exact'] = function(){
				tester.cacheCompare( table, 1, ['John'], 'search exact', true );
			}
			ts.setFilters( table, ['', 'john='], true );
			stop();

			callbackName = 'wildcard1';
			callback['wildcard1'] = function(){
				tester.cacheCompare( table, 2, ['Dumass', 'Evans'], 'search wildcard, one character (?)', true );
			}
			ts.setFilters( table, ['', '', 'a?s'], true );
			stop();

			callbackName = 'wildcard2';
			callback['wildcard2'] = function(){
				tester.cacheCompare( table, 2, ['Dumass', 'Evans', 'McMasters'], 'search wildcard, multiple characters (*)', true );
			}
			ts.setFilters( table, ['', '', 'a*s'], true );
			stop();

			callbackName = 'regex';
			callback['regex'] = function(){
				tester.cacheCompare( table, 1, ['Peter', 'Brenda Dexter'], 'search regex', true );
			}
			ts.setFilters( table, ['', '/r$/'], true );
			stop();

			callbackName = 'operator';
			callback['operator'] = function(){
				tester.cacheCompare( table, 4, [42.29, 19.99, 15.89, 153.19, 14.19, 13.19, 55.2, 123, 22.09], 'search operator (>10)', true );
			}
			ts.setFilters( table, ['', '', '', '', '>10'], true );
			stop();

			callbackName = 'operator1';
			callback['operator1'] = function(){
				tester.cacheCompare( table, 4, [153.19, 123], 'search operator (>100); ensure search filtered gets cleared', true );
			}
			ts.setFilters( table, ['', '', '', '', '>100'], true );
			stop();

			callbackName = 'operator2';
			callback['operator2'] = function(){
				tester.cacheCompare( table, 5, [22, 20, 25, 44, 44, 32], 'search operator (>=)', true );
			}
			ts.setFilters( table, ['', '', '', '', '', '>=20'], true );
			stop();

			callbackName = 'operator3';
			callback['operator3'] = function(){
				tester.cacheCompare( table, 5, [5, 4], 'search operator (<10)', true );
			}
			ts.setFilters( table, ['', '', '', '', '', '<10'], true );
			stop();

			callbackName = 'operator4';
			callback['operator4'] = function(){
				tester.cacheCompare( table, 5, [22, 5, 18, 20, 25, 44, 44, 4, 14, 11, 15, 32, 17], 'search operator (<100); ensure search filtered gets cleared', true );
			}
			ts.setFilters( table, ['', '', '', '', '', '<100'], true );
			stop();

			callbackName = 'operator5';
			callback['operator5'] = function(){
				tester.cacheCompare( table, 5, [5, 18, 20, 4, 14, 11, 15, 17], 'search operator (<=)', true );
			}
			ts.setFilters( table, ['', '', '', '', '', '<=20'], true );
			stop();

			callbackName = 'operator6';
			callback['operator6'] = function(){
				tester.cacheCompare( table, 1, ['Peter', 'John', 'Bruce', 'Jim', 'Bruce Lee', 'Dennis'], 'search not match', true );
			}
			ts.setFilters( table, ['', '!a'], true );
			stop();

			callbackName = 'operator7';
			callback['operator7'] = function(){
				tester.cacheCompare( table, 1, ['Brandon Clark', 'Peter', 'John', 'Clark', 'Bruce', 'Alex', 'Jim', 'Bruce Lee', 'Brenda Dexter', 'Dennis', 'Martha'], 'search not match; ensure search filtered gets cleared', true );
			}
			ts.setFilters( table, ['', '!aa'], true );
			stop();

			callbackName = 'operator8';
			callback['operator8'] = function(){
				tester.cacheCompare( table, 1, ['Brandon Clark', 'Bruce', 'Bruce Lee'], 'search and match', true );
			}
			ts.setFilters( table, ['', 'br && c'], true );
			stop();

			callbackName = 'operator9';
			callback['operator9'] = function(){
				tester.cacheCompare( table, 1, ['Brandon Clark'], 'search and match; ensure search filtered gets cleared', true );
			}
			ts.setFilters( table, ['', 'br && cl'], true );
			stop();

			callbackName = 'operator10';
			callback['operator10'] = function(){
				tester.cacheCompare( table, 1, ['Brandon Clark', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter'], 'search OR match', true );
			}
			ts.setFilters( table, ['', 'alex|br*'], true );
			stop();

			callbackName = 'operator11';
			callback['operator11'] = function(){
				tester.cacheCompare( table, 4, [5.95, 9.99, 5.29], 'search range', true );
			}
			ts.setFilters( table, ['', '', '', '', '5 - 10'], true );
			stop();

			callbackName = 'operator12';
			callback['operator12'] = function(){
				tester.cacheCompare( table, 4, [5.95, 42.29, 9.99, 19.99, 15.89, 5.29, 14.19, 13.19, 55.2, 22.09], 'search range; ensure search filtered gets cleared', true );
			}
			ts.setFilters( table, ['', '', '', '', '5 - 100'], true );
			stop();

			// test filter_startsWith (false by default)
			wo.filter_startsWith = false;
			callbackName = 'startsWith';
			callback['startsWith'] = function(){
				tester.cacheCompare( table, 1, ['Philip Aaron Wong', 'Aaron'], 'search - filter_startsWith : false', true );
			}
			ts.setFilters( table, ['', 'aa'], true );
			stop();

			// test filter_startsWith (false by default)
			wo.filter_startsWith = true;
			callbackName = 'startsWith2';
			callback['startsWith2'] = function(){
				tester.cacheCompare( table, 1, ['Aaron'], 'search - filter_startsWith : true', true );
				wo.filter_startsWith = false;
			}
			c.$table.trigger('search', false);
			stop();

			// test filter_ignoreCase (true by default)
			wo.filter_ignoreCase = false;
			callbackName = 'ignoreCase';
			callback['ignoreCase'] = function(){
				tester.cacheCompare( table, 1, [], 'search - filter_ignoreCase : false', true );
				wo.filter_ignoreCase = true;
			}
			c.$table.trigger('search', false);
			stop();

			// test filter-match class (added in the example code)
			callbackName = 'filterMatch';
			callback['filterMatch'] = function(){
				tester.cacheCompare( table, 1, ['Brandon Clark', 'Clark', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter'], 'search - filter-match', true );
			}
			ts.setFilters( table, ['', 'alex|br*|c'], true );
			stop();

			// test filter-match class
			c.$table.find('.tablesorter-header').eq(1).removeClass('filter-match');
			callbackName = 'notFilterMatch';
			callback['notFilterMatch'] = function(){
				tester.cacheCompare( table, 1, ['Bruce', 'Alex'], 'search - filter-match removed', true );
			}
			c.$table.trigger('search', false);
			stop();

			// filter reset
			callbackName = 'filterReset';
			callback['filterReset'] = function(){
				tester.cacheCompare( table, 5, [22, 5, 18, 20, 25, 44, 44, 4, 14, 11, 15, 32, 17], 'filterReset', true );
			}
			c.$table.trigger('filterReset');
			stop();

			// filter parsed class
			wo.filter_startsWith = false;
			callbackName = 'filterParsed';
			callback['filterParsed'] = function(){
				tester.cacheCompare( table, 6, [ new Date('Oct 13, 2000 1:15 PM').getTime() ], 'search - filter-parsed', true );
			}
			ts.setFilters( table, ['', '', '', '', '', '', '< 1/1/2001'], true );

		});

		$table.on('filterEnd', function(e){
			start();
			if (callbackName !== '' && callback[callbackName]) {
				callback[callbackName]();
			}
			callbackName = '';
		});

	};

	$table
		.on('filterInit', function(){
			init = true;
		})
		.on('filterEnd.init', function(){
			runFilterTests();
			$table.off('filterEnd.init');
		})
		.tablesorter({
			ignoreCase: false,
			widgets: ['zebra', 'filter']
		});

});
