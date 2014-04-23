/*!
* TableSorter QUnit Testing
*/
/*jshint unused: false */
/*global QUnit: false, JSHINT: false, ok: false, start: false, deepEqual: false, asyncTest: false */


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

		test( "Filter widget", function() {
			expect(5);

			equal( init, true, "Init event" );
			equal( $table.hasClass('hasFilters'), true, '"hasFilters" class applied' );

			equal( ts.filter.regex.child.test( c.cssChildRow ), true, "child row regex check" );
			equal( ts.filter.regex.filtered.test( wo.filter_filteredRow ), true, "filtered row regex check" );

			tester.cacheCompare( table, 3, [ 12, 18, 13, 18 ], "starting filter value on age column", true );

		});



	};

	$table
		.on('filterInit', function(){
			init = true;
		})
		.on('filterEnd', function(){
			if (!runOnce) {
				runOnce = true;
				console.log('ok', $table.find('tr'));
				runFilterTests();
			}
		})
		.tablesorter({
			widgets: ["zebra", "filter"],
			initialized: function(){
				
			}
		});




});
