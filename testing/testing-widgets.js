/*!
* TableSorter QUnit Testing - filter widget
*/
/*jshint unused: false */

/*
Filter widget tested parts
========================
OPTIONS:
	filter_defaultAttrib, filter_ignoreCase, filter_startsWith,
	filter_selectSource, filter_functions (set, not functionality)

CLASSES:
	filter-false, filter-match, filter-parsed

METHODS:
	filterReset, search (false), setFilters

EVENTS:
	filterInit, filterEnd

Not yet tested
=========================
OPTIONS:
	filter_childRows, filter_childByColumn, filter_childWithSibs,
	filter_columnFilters, filter_cssFilter, filter_external,
	filter_filteredRow, filter_formatter, filter_hideEmpty,
	filter_hideEmpty, filter_liveSearch, filter_onlyAvail, filter_placeholder,
	filter_reset, filter_saveFilters, filter_searchDelay,
	filter_serversideFiltering, filter_useParsedData

CLASSES:
	filter-select, filter-select-nosort, filter-onlyAvail

METHODS:
	search (array), getFilters, external filters

EVENTS:
	filterStart
*/

jQuery(function($){
	QUnit.module('Widgets', {
		beforeEach: function(assert) {
			this.ts = $.tablesorter;

			// filter widget table
			if ( /\(table2\)/.test(assert.test.testName) ) {
				this.$table = $('#testblock').html('<table class="tablesorter">' +
					'<thead><tr>' +
						'<th class="filter-select">AlphaNumeric</th>' +
						'<th class="filter-select filter-match">Numeric</th>' +
						'<th>Animals</th>' +
						'<th>Sites</th>' +
					'</tr></thead><tbody>' +
						'<tr><td>abc</td><td>1</td><td>Koala</td><td>http://www.google.com</td></tr>' +
						'<tr><td>abc 1</td><td>234</td><td>Ox</td><td>http://www.yahoo.com</td></tr>' +
						'<tr><td>abc 9</td><td>111</td><td>Girafee</td><td>http://www.facebook.com</td></tr>' +
						'<tr><td>zyx 24</td><td>123</td><td>Bison</td><td>http://www.whitehouse.gov/</td></tr>' +
						'<tr><td>abc 11</td><td>3</td><td>Chimp</td><td>http://www.ucla.edu/</td></tr>' +
						'<tr><td>abc 2</td><td>56</td><td>Elephant</td><td>http://www.wikipedia.org/</td></tr>' +
						'<tr><td>abc 9</td><td>155</td><td>Lion</td><td>http://www.nytimes.com/</td></tr>' +
						'<tr><td>ABC 10</td><td>87</td><td>Zebra</td><td>http://www.google.com</td></tr>' +
						'<tr><td>zyx 1</td><td>999</td><td>Koala</td><td>http://www.mit.edu/</td></tr>' +
						'<tr><td>zyx 12</td><td>0</td><td>Llama</td><td>http://www.nasa.gov/</td></tr>' +
					'</tbody></table>').find('table');
			} else {
				this.$table = $('#testblock').html('<table class="tablesorter">' +
					'<thead><tr>' +
						'<th class="rank">Rank</th>' +
						'<th class="first filter-match">First Name</th>' +
						'<th class="last">Last Name</th>' +
						'<th data-value="<20">Age</th>' +
						'<th class="total">Total</th>' +
						'<th>Discount</th>' +
						'<th>Date</th>' +
						'<th class="last2">Last Name2</th>' +
					'</tr></thead><tbody>' +
						'<tr><td>1</td><td>Philip Aaron Wong</td><td>Johnson Sr Esq</td><td>25</td><td>$5.95</td><td>22%</td><td>Jun 26, 2004 7:22 AM</td><td>Johnson Sr Esq</td></tr>' +
						'<tr><td>11</td><td>Aaron</td><td>Hibert</td><td>12</td><td>$2.99</td><td>5%</td><td>Aug 21, 2009 12:21 PM</td><td>Hibert</td></tr>' +
						'<tr><td>12</td><td>Brandon Clark</td><td>Henry Jr</td><td>51</td><td>$42.29</td><td>18%</td><td>Oct 13, 2000 1:15 PM</td><td>Henry Jr</td></tr>' +
						'<tr><td>111</td><td>Peter</td><td>Parker</td><td>28</td><td>$9.99</td><td>20%</td><td>Jul 6, 2006 8:14 AM</td><td>Parker</td></tr>' +
						'<tr><td>21</td><td>John</td><td>Hood</td><td>33</td><td>$19.99</td><td>25%</td><td>Dec 10, 2002 5:14 AM</td><td>Hood</td></tr>' +
						'<tr><td>013</td><td>Clark</td><td>Kent Sr.</td><td>18</td><td>$15.89</td><td>44%</td><td>Jan 12, 2003 11:14 AM</td><td>Kent Sr.</td></tr>' +
						'<tr><td>005</td><td>Bruce</td><td>Almighty Esq</td><td>45</td><td>$153.19</td><td>44%</td><td>Jan 18, 2021 9:12 AM</td><td>Almighty Esq</td></tr>' +
						'<tr><td>10</td><td>Alex</td><td>Dumass</td><td>13</td><td>$5.29</td><td>4%</td><td>Jan 8, 2012 5:11 PM</td><td>Dumass</td></tr>' +
						'<tr><td>16</td><td>Jim</td><td>Franco</td><td>24</td><td>$14.19</td><td>14%</td><td>Jan 14, 2004 11:23 AM</td><td>Franco</td></tr>' +
						'<tr><td>166</td><td>Bruce Lee</td><td>Evans</td><td>22</td><td>$13.19</td><td>11%</td><td>Jan 18, 2007 9:12 AM</td><td>Evans</td></tr>' +
						'<tr><td>100</td><td>Brenda Dexter</td><td>McMasters</td><td>18</td><td>$55.20</td><td>15%</td><td>Feb 12, 2010 7:23 PM</td><td>McMasters</td></tr>' +
						'<tr><td>55</td><td>Dennis</td><td>Bronson</td><td>65</td><td>$123.00</td><td></td><td>Jan 20, 2001 1:12 PM</td><td>Bronson</td></tr>' +
						'<tr><td>9</td><td>Martha</td><td>delFuego</td><td>25</td><td>$22.09</td><td>17%</td><td>Jun 11, 2011 10:55 AM</td><td>delFuego</td></tr>' +
					'</tbody></table>').find('table');
			}

			this.table = this.$table[0];
			this.init = false;

			var self = this;
			var initTablesort = function(){
				self.$table.tablesorter({
					ignoreCase: false,
					widgets: ['zebra', 'filter'],
					headers: {
						'.rank' : { filter: false }
					},
					widgetOptions: {
						filter_functions : {
							'.last2' : true,
							'.rank' : {
								'< 10' : function(e, n) { return n <= 10; },
								'> 10' : function(e, n) { return n > 10; }
							}
						},
						filter_selectSource : {
							// Alphanumeric match (prefix only)
							// added as select2 options (you could also use select2 data option)
							'.last2' : function(table, column) {
								return ['abc', 'def', 'zyx'];
							}
						}
					}
				});
			};

			var onEventCallback = function(){
				self.init = true;
				self.c = self.table.config,
				self.wo = self.c.widgetOptions;
			};

			return QUnit.SequentialRunner().next(
				QUnit.assertOnEvent(
					self.$table,
					'filterInit',
					initTablesort,
					onEventCallback
				)
			).promise();

		},
		afterEach: function(assert) {
			var done = assert.async();
			this.$table.trigger('destroy', [false, done]);
		}
	});


	/************************************************
		Filter widget
	************************************************/
	QUnit.test( 'Filter: init', function(assert) {
		expect(6);

		assert.equal( this.init, true, 'Init event' );
		assert.equal( this.$table.hasClass('hasFilters'), true, '`hasFilters` class applied' );

		assert.equal( this.ts.filter.regex.child.test( this.c.cssChildRow ), true, 'child row regex check' );
		assert.equal( this.ts.filter.regex.filtered.test( this.wo.filter_filteredRow ), true, 'filtered row regex check' );
		// this includes check of headers option & referencing column by class
		assert.equal ( this.c.$table.find('.tablesorter-filter').eq(0).hasClass('disabled'), true, 'filter disabled & headers class name working' );

		assert.cacheCompare( this.table, 3, [ 12, 18, 13, 18 ], 'starting filter value on age column', true );
	});

	QUnit.test( 'Filter column range', function(assert) {
		expect(10);
		var range = $.tablesorter.filter.findRange,
			c = { columns: 10 }; // psuedo table.config

		assert.deepEqual( range( c, '6' ),         [ 6 ], '6' );
		assert.deepEqual( range( c, '5, 6' ),      [ 5,6 ], '5, 6' );
		assert.deepEqual( range( c, '5 - 6' ),     [ 5,6 ], '5 - 6' );
		assert.deepEqual( range( c, '1-3,5-6,8' ), [ 1,2,3,5,6,8 ], '1-3,5-6,8' );
		assert.deepEqual( range( c, '6- 3, 2,4' ), [ 3,4,5,6,2,4 ], '6- 3,2,4 (dupes included)' );
		assert.deepEqual( range( c, '-1-3, 11' ),  [ 1,2,3 ], '-1-3, 11 (negative & out of range ignored)' );
		assert.deepEqual( range( c, '8-12' ),      [ 8,9 ], '8-12 (not out of range)' );
		assert.deepEqual( range( c, 'all' ),       [ 0,1,2,3,4,5,6,7,8,9 ], 'all' );
		assert.deepEqual( range( c, 'any-text' ),  [ 0,1,2,3,4,5,6,7,8,9 ], 'text with dash -> all columns' );
		assert.deepEqual( range( c, 'a-b-c,100' ), [ 0,1,2,3,4,5,6,7,8,9 ], 'text with dashes & commas -> all columns' );
	});

	QUnit.test( 'Filter process filters', function(assert) {
		expect(2);
		var processFilters = this.ts.filter.processFilters,
			filters = [],
			results = [];
		filters[1] = 5, filters[2] = 'test', filters[3] = true, filters[4] = null;
		results[1] = '5', results[2] = 'test', results[3] = 'true', results[4] = null;

		assert.deepEqual( processFilters( filters, true ),         results );
		assert.deepEqual( processFilters( filters, false ),         results );
	});

	QUnit.test( 'Filter searches', function(assert) {
		var ts = this.ts,
			c = this.c,
			wo = this.wo,
			$table = this.$table,
			table = this.table;
		expect(33);

		return QUnit.SequentialRunner(
			function(actions, assertions) {
				return QUnit.assertOnEvent($table, 'filterEnd', actions, assertions);
			}
		).nextTask(
			function(){ ts.setFilters( table, ['', 'e'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Peter', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter', 'Dennis'], 'search regular', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '~bee'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Bruce Lee', 'Brenda Dexter'], 'search fuzzy', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '~piano'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Philip Aaron Wong'], 'search fuzzy2', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'john='], true ); },
			function(){ assert.cacheCompare( table, 1, ['John'], 'search exact', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', 'a?s'], true ); },
			function(){ assert.cacheCompare( table, 2, ['Dumass', 'Evans'], 'search wildcard, one character (?)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', 'a*s'], true ); },
			function(){ assert.cacheCompare( table, 2, ['Dumass', 'Evans', 'McMasters'], 'search wildcard, multiple characters (*)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '/r$/'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Peter', 'Brenda Dexter'], 'search regex', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '>10'], true ); },
			function(){ assert.cacheCompare( table, 4, [42.29, 19.99, 15.89, 153.19, 14.19, 13.19, 55.2, 123, 22.09], 'search operator (>10)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '>100'], true ); },
			function(){ assert.cacheCompare( table, 4, [153.19, 123], 'search operator (>100); ensure search filtered gets cleared', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '', '>=20'], true ); },
			function(){ assert.cacheCompare( table, 5, [22, 20, 25, 44, 44], 'search operator (>=)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '', '<10'], true ); },
			function(){ assert.cacheCompare( table, 5, [5, 4], 'search operator (<10)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '', '<100'], true ); },
			function(){ assert.cacheCompare( table, 5, [22, 5, 18, 20, 25, 44, 44, 4, 14, 11, 15, 17], 'search operator (<100); ensure search filtered gets cleared', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '', '<=20'], true ); },
			function(){ assert.cacheCompare( table, 5, [5, 18, 20, 4, 14, 11, 15, 17], 'search operator (<=)', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '!a'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Peter', 'John', 'Bruce', 'Jim', 'Bruce Lee', 'Dennis'], 'search not match', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '!aa'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark', 'Peter', 'John', 'Clark', 'Bruce', 'Alex', 'Jim', 'Bruce Lee', 'Brenda Dexter', 'Dennis', 'Martha'], 'search not match; ensure search filtered gets cleared', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'br && c'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark', 'Bruce', 'Bruce Lee'], 'search and match', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'br && cl'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark'], 'search and match; ensure search filtered gets cleared', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'c* && l && a'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark', 'Clark'], 'search "c* && l && a"', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'a && !o'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Clark', 'Alex', 'Brenda Dexter', 'Martha'], 'search "a && !o"', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '' , '>20 && <40'], true ); },
			function(){ assert.cacheCompare( table, 3, [25, 28, 33, 24, 22, 25], 'search ">20 && <40"', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '' , '<15 or >40'], true ); },
			function(){ assert.cacheCompare( table, 3, [12, 51, 45, 13, 65], 'search "<15 or >40"', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', 'alex|br*'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter'], 'search OR match', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '/(Alex|Aar'], true ); },
			function(){ assert.cacheCompare( table, 1, [], 'Partial OR match, but invalid regex', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '/(Alex && '], true ); },
			function(){ assert.cacheCompare( table, 1, [], 'Partial AND match, and way messed up regex', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '5 - 10'], true ); },
			function(){ assert.cacheCompare( table, 4, [5.95, 9.99, 5.29], 'search range', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '', '', '', '5 - 100'], true ); },
			function(){ assert.cacheCompare( table, 4, [5.95, 42.29, 9.99, 19.99, 15.89, 5.29, 14.19, 13.19, 55.2, 22.09], 'search range; ensure search filtered gets cleared', true ); }
		).nextTask( // test filter_startsWith (false by default)
			function(){
				wo.filter_startsWith = false;
				ts.setFilters( table, ['', 'aa'], true );
			},
			function(){ assert.cacheCompare( table, 1, ['Philip Aaron Wong', 'Aaron'], 'search - filter_startsWith : false', true ); }
		).nextTask( // test filter_startsWith (false by default)
			function(){
				wo.filter_startsWith = true;
				c.$table.trigger('search', false);
			},
			function(){
				assert.cacheCompare( table, 1, ['Aaron'], 'search - filter_startsWith : true', true );
				wo.filter_startsWith = false;
			}
		).nextTask( // test filter_ignoreCase (true by default)
			function(){
				wo.filter_ignoreCase = false;
				c.$table.trigger('search', false);
			},
			function(){
				assert.cacheCompare( table, 1, [], 'search - filter_ignoreCase : false', true );
				wo.filter_ignoreCase = true;
			}
		).nextTask( // test filter-match class (added in the example code)
			function(){ ts.setFilters( table, ['', 'alex|br*|c'], true ); },
			function(){ assert.cacheCompare( table, 1, ['Brandon Clark', 'Clark', 'Bruce', 'Alex', 'Bruce Lee', 'Brenda Dexter'], 'search - filter-match', true ); }
		).nextTask( // test filter-match class
			function(){
				c.$table.find('.tablesorter-header').eq(1).removeClass('filter-match');
				c.$table.trigger('search', false);
			},
			function(){ assert.cacheCompare( table, 1, ['Bruce', 'Alex'], 'search - filter-match removed', true ); }
		).nextTask( // filter reset
			function(){ c.$table.trigger('filterReset'); },
			function(){ assert.cacheCompare( table, 5, [22, 5, 18, 20, 25, 44, 44, 4, 14, 11, 15, '', 17], 'filterReset', true ); }
		).nextTask( // filter parsed class
			function(){
				wo.filter_startsWith = false;
				ts.setFilters( table, ['', '', '', '', '', '', '< 1/1/2001'], true );
			},
			function(){ assert.cacheCompare( table, 6, [ new Date('Oct 13, 2000 1:15 PM').getTime() ], 'search - filter-parsed', true ); }
		).promise();
	});

	QUnit.test( 'Filter: function & selectSource', function(assert) {
		expect(3);

		var $t, opts = [];
		$t = this.c.$table.find('.tablesorter-filter-row select:last');
		assert.equal ( $t.length !== 0, true, 'filter_functions: true working' );

		this.c.$table.find('.tablesorter-filter-row select:first option').each(function(){
			opts.push( $.trim( $(this).text() ) );
		});
		assert.equal ( 'len=' + opts.length + ',' + opts.join(''), 'len=3,< 10> 10', 'filter_functions set' );

		opts = [];
		$t.find('option').each(function(){
			opts.push( $.trim( $(this).text() ) );
		});
		assert.equal ( 'len=' + opts.length + ',' + opts.join(''), 'len=4,abcdefzyx', 'filter_selectSource set' );
	});

	QUnit.test( 'Filter: select & matching (table2)', function(assert) {
		var self = this,
			ts = this.ts,
			$table = this.$table,
			table = this.table;
		expect(3);

		return QUnit.SequentialRunner(
			function(actions, assertions) {
				return QUnit.assertOnEvent($table, 'filterEnd', actions, assertions);
			}
		).nextTask(
			function(){ ts.setFilters( table, ['abc 1'], true ); },
			function(){ assert.cacheCompare( table, 0, ['abc 1'], 'select exact search', true ); }
		).nextTask(
			function(){
				$table.find( '.filter-select' ).eq(0).addClass( 'filter-match' );
				ts.setFilters( table, [ 'abc 1' ], true ); },
			function(){ assert.cacheCompare( table, 0, ['abc 1', 'abc 11', 'ABC 10'], 'select match search', true ); }
		).nextTask(
			function(){ ts.setFilters( table, ['', '1'], true ); },
			function(){ assert.cacheCompare( table, 1, [ 1, 111, 123, 155], 'select match seach', true ); }
		).promise();
	});

});
