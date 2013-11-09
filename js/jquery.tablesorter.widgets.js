/*! tableSorter 2.8+ widgets - updated 11/9/2013
 *
 * Column Styles
 * Column Filters
 * Column Resizing
 * Sticky Header
 * UI Theme (generalized)
 * Save Sort
 * [ "columns", "filter", "resizable", "stickyHeaders", "uitheme", "saveSort" ]
 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false, localStorage: false, navigator: false */
;(function($){
"use strict";
var ts = $.tablesorter = $.tablesorter || {};

ts.themes = {
	"bootstrap" : {
		table      : 'table table-bordered table-striped',
		caption    : 'caption',
		header     : 'bootstrap-header', // give the header a gradient background
		footerRow  : '',
		footerCells: '',
		icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
		sortNone   : 'bootstrap-icon-unsorted',
		sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',
		sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down',
		active     : '', // applied when column is sorted
		hover      : '', // use custom css here - bootstrap class may not override it
		filterRow  : '', // filter row class
		even       : '', // even row zebra striping
		odd        : ''  // odd row zebra striping
	},
	"jui" : {
		table      : 'ui-widget ui-widget-content ui-corner-all', // table classes
		caption    : 'ui-widget-content ui-corner-all',
		header     : 'ui-widget-header ui-corner-all ui-state-default', // header classes
		footerRow  : '',
		footerCells: '',
		icons      : 'ui-icon', // icon class added to the <i> in the header
		sortNone   : 'ui-icon-carat-2-n-s',
		sortAsc    : 'ui-icon-carat-1-n',
		sortDesc   : 'ui-icon-carat-1-s',
		active     : 'ui-state-active', // applied when column is sorted
		hover      : 'ui-state-hover',  // hover class
		filterRow  : '',
		even       : 'ui-widget-content', // even row zebra striping
		odd        : 'ui-state-default'   // odd row zebra striping
	}
};

// *** Store data in local storage, with a cookie fallback ***
/* IE7 needs JSON library for JSON.stringify - (http://caniuse.com/#search=json)
   if you need it, then include https://github.com/douglascrockford/JSON-js

   $.parseJSON is not available is jQuery versions older than 1.4.1, using older
   versions will only allow storing information for one page at a time

   // *** Save data (JSON format only) ***
   // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
   var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
   // $.tablesorter.storage(table, key, val);
   $.tablesorter.storage(table, 'tablesorter-mywidget', val);

   // *** Get data: $.tablesorter.storage(table, key); ***
   v = $.tablesorter.storage(table, 'tablesorter-mywidget');
   // val may be empty, so also check for your data
   val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
   alert(val); // "data1" if saved, or "" if not
*/
ts.storage = function(table, key, val, options){
	var d, k, ls = false, v = {},
	c = table.config,
	id = options && options.id || $(table).attr(options && options.group || 'data-table-group') || table.id || $('.tablesorter').index( $(table) ),
	url = options && options.url || $(table).attr(options && options.page || 'data-table-page') || c && c.fixedUrl || window.location.pathname;
	// https://gist.github.com/paulirish/5558557
	if ("localStorage" in window) {
		try {
			window.localStorage.setItem('_tmptest', 'temp');
			ls = true;
			window.localStorage.removeItem('_tmptest');
		} catch(e) {}
	}
	// *** get val ***
	if ($.parseJSON){
		if (ls){
			v = $.parseJSON(localStorage[key] || '{}');
		} else {
			k = document.cookie.split(/[;\s|=]/); // cookie
			d = $.inArray(key, k) + 1; // add one to get from the key to the value
			v = (d !== 0) ? $.parseJSON(k[d] || '{}') : {};
		}
	}
	// allow val to be an empty string to
	if ((val || val === '') && window.JSON && JSON.hasOwnProperty('stringify')){
		// add unique identifiers = url pathname > table ID/index on page > data
		if (!v[url]) {
			v[url] = {};
		}
		v[url][id] = val;
		// *** set val ***
		if (ls){
			localStorage[key] = JSON.stringify(v);
		} else {
			d = new Date();
			d.setTime(d.getTime() + (31536e+6)); // 365 days
			document.cookie = key + '=' + (JSON.stringify(v)).replace(/\"/g,'\"') + '; expires=' + d.toGMTString() + '; path=/';
		}
	} else {
		return v && v[url] ? v[url][id] : {};
	}
};

// Add a resize event to table headers
// **************************
ts.addHeaderResizeEvent = function(table, disable, options){
	var defaults = {
		timer : 250
	},
	o = $.extend({}, defaults, options),
	c = table.config,
	wo = c.widgetOptions,
	headers,
	checkSizes = function(){
		wo.resize_flag = true;
		headers = [];
		c.$headers.each(function(){
			var d = $.data(this, 'savedSizes') || [0,0], // fixes #394
				w = this.offsetWidth,
				h = this.offsetHeight;
			if (w !== d[0] || h !== d[1]) {
				$.data(this, 'savedSizes', [ w, h ]);
				headers.push(this);
			}
		});
		if (headers.length) { c.$table.trigger('resize', [ headers ]); }
		wo.resize_flag = false;
	};
	c.$headers.each(function(){
		$.data(this, 'savedSizes', [ this.offsetWidth, this.offsetHeight ]);
	});
	clearInterval(wo.resize_timer);
	if (disable) {
		wo.resize_flag = false;
		return false;
	}
	wo.resize_timer = setInterval(function(){
		if (wo.resize_flag) { return; }
		checkSizes();
	}, o.timer);
};

// Widget: General UI theme
// "uitheme" option in "widgetOptions"
// **************************
ts.addWidget({
	id: "uitheme",
	priority: 10,
	options: {
		uitheme : 'jui'
	},
	format: function(table, c, wo){
		var time, klass, $el, $tar,
			t = ts.themes,
			$t = c.$table,
			theme = c.theme !== 'default' ? c.theme : wo.uitheme || 'jui',
			o = t[ t[theme] ? theme : t[wo.uitheme] ? wo.uitheme : 'jui'],
			$h = c.$headers,
			sh = 'tr.' + (wo.stickyHeaders || 'tablesorter-stickyHeader'),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		if (c.debug) { time = new Date(); }
		// initialization code - run once
		if (!$t.hasClass('tablesorter-' + theme) || c.theme === theme || !table.hasInitialized){
			// update zebra stripes
			if (o.even !== '') { wo.zebra[0] += ' ' + o.even; }
			if (o.odd !== '') { wo.zebra[1] += ' ' + o.odd; }
			// add caption style
			$t.find('caption').addClass(o.caption);
			// add table/footer class names
			t = $t
				// remove other selected themes; use widgetOptions.theme_remove
				.removeClass( c.theme === '' ? '' : 'tablesorter-' + c.theme )
				.addClass('tablesorter-' + theme + ' ' + o.table) // add theme widget class name
				.find('tfoot');
			if (t.length) {
				t
				.find('tr').addClass(o.footerRow)
				.children('th, td').addClass(o.footerCells);
			}
			// update header classes
			$h
				.addClass(o.header)
				.filter(':not(.sorter-false)')
				.bind('mouseenter.tsuitheme mouseleave.tsuitheme', function(e){
					// toggleClass with switch added in jQuery 1.3
					$(this)[ e.type === 'mouseenter' ? 'addClass' : 'removeClass' ](o.hover);
				});
			if (!$h.find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the icon/resizer correctly
				$h.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			if (c.cssIcon){
				// if c.cssIcon is '', then no <i> is added to the header
				$h.find('.' + ts.css.icon).addClass(o.icons);
			}
			if ($t.hasClass('hasFilters')){
				$h.find('.tablesorter-filter-row').addClass(o.filterRow);
			}
		}
		$.each($h, function(i){
			$el = $(this);
			$tar = (ts.css.icon) ? $el.find('.' + ts.css.icon) : $el;
			if (this.sortDisabled){
				// no sort arrows for disabled columns!
				$el.removeClass(rmv);
				$tar.removeClass(rmv + ' tablesorter-icon ' + o.icons);
			} else {
				t = ($t.hasClass('hasStickyHeaders')) ? $t.find(sh).find('th').eq(i).add($el) : $el;
				klass = ($el.hasClass(ts.css.sortAsc)) ? o.sortAsc : ($el.hasClass(ts.css.sortDesc)) ? o.sortDesc : $el.hasClass(ts.css.header) ? o.sortNone : '';
				$el[klass === o.sortNone ? 'removeClass' : 'addClass'](o.active);
				$tar.removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug){
			ts.benchmark("Applying " + theme + " theme", time);
		}
	},
	remove: function(table, c, wo){
		var $t = c.$table,
			theme = typeof wo.uitheme === 'object' ? 'jui' : wo.uitheme || 'jui',
			o = typeof wo.uitheme === 'object' ? wo.uitheme : ts.themes[ ts.themes.hasOwnProperty(theme) ? theme : 'jui'],
			$h = $t.children('thead').children(),
			rmv = o.sortNone + ' ' + o.sortDesc + ' ' + o.sortAsc;
		$t
			.removeClass('tablesorter-' + theme + ' ' + o.table)
			.find(ts.css.header).removeClass(o.header);
		$h
			.unbind('mouseenter.tsuitheme mouseleave.tsuitheme') // remove hover
			.removeClass(o.hover + ' ' + rmv + ' ' + o.active)
			.find('.tablesorter-filter-row').removeClass(o.filterRow);
		$h.find('.tablesorter-icon').removeClass(o.icons);
	}
});

// Widget: Column styles
// "columns", "columns_thead" (true) and
// "columns_tfoot" (true) options in "widgetOptions"
// **************************
ts.addWidget({
	id: "columns",
	priority: 30,
	options : {
		columns : [ "primary", "secondary", "tertiary" ]
	},
	format: function(table, c, wo){
		var $tb, $tr, $td, $t, time, last, rmv, i, k, l,
		$tbl = c.$table,
		b = c.$tbodies,
		list = c.sortList,
		len = list.length,
		// keep backwards compatibility, for now
		css = (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) ? c.widgetColumns.css || css :
			(wo && wo.hasOwnProperty('columns')) ? wo.columns || css : css;
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug){
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		for (k = 0; k < b.length; k++ ){
			$tb = ts.processTbody(table, b.eq(k), true); // detach tbody
			$tr = $tb.children('tr');
			l = $tr.length;
			// loop through the visible rows
			$tr.each(function(){
				$t = $(this);
				if (this.style.display !== 'none'){
					// remove all columns class names
					$td = $t.children().removeClass(rmv);
					// add appropriate column class names
					if (list && list[0]){
						// primary sort column class
						$td.eq(list[0][0]).addClass(css[0]);
						if (len > 1){
							for (i = 1; i < len; i++){
								// secondary, tertiary, etc sort column classes
								$td.eq(list[i][0]).addClass( css[i] || css[last] );
							}
						}
					}
				}
			});
			ts.processTbody(table, $tb, false);
		}
		// add classes to thead and tfoot
		$tr = wo.columns_thead !== false ? ['thead tr'] : [];
		if (wo.columns_tfoot !== false) {
			$tr.push('tfoot tr');
		}
		if ($tr.length) {
			$t = $tbl.find($tr.join(',')).children().removeClass(rmv);
			if (len){
				for (i = 0; i < len; i++){
					// add primary. secondary, tertiary, etc sort column classes
					$t.filter('[data-column="' + list[i][0] + '"]').addClass(css[i] || css[last]);
				}
			}
		}
		if (c.debug){
			ts.benchmark("Applying Columns widget", time);
		}
	},
	remove: function(table, c, wo){
		var k, $tb,
			b = c.$tbodies,
			rmv = (wo.columns || [ "primary", "secondary", "tertiary" ]).join(' ');
		c.$headers.removeClass(rmv);
		c.$table.children('tfoot').children('tr').children('th, td').removeClass(rmv);
		for (k = 0; k < b.length; k++ ){
			$tb = ts.processTbody(table, b.eq(k), true); // remove tbody
			$tb.children('tr').each(function(){
				$(this).children().removeClass(rmv);
			});
			ts.processTbody(table, $tb, false); // restore tbody
		}
	}
});

// Widget: filter
// **************************
ts.addWidget({
	id: "filter",
	priority: 50,
	options : {
		filter_anyMatch      : false, // if true overrides default find rows behaviours and if any column matches query it returns that row
		filter_childRows     : false, // if true, filter includes child row content in the search
		filter_columnFilters : true,  // if true, a filter will be added to the top of each table column
		filter_cssFilter     : '',    // css class name added to the filter row & each input in the row (tablesorter-filter is ALWAYS added)
		filter_filteredRow   : 'filtered', // class added to filtered rows; needed by pager plugin
		filter_formatter     : null,  // add custom filter elements to the filter row
		filter_functions     : null,  // add custom filter functions using this option
		filter_hideFilters   : false, // collapse filter row when mouse leaves the area
		filter_ignoreCase    : true,  // if true, make all searches case-insensitive
		filter_liveSearch    : true,  // if true, search column content while the user types (with a delay)
		filter_onlyAvail     : 'filter-onlyAvail', // a header with a select dropdown & this class name will only show available (visible) options within the drop down
		filter_reset         : null,  // jQuery selector string of an element used to reset the filters
		filter_searchDelay   : 300,   // typing delay in milliseconds before starting a search
		filter_startsWith    : false, // if true, filter start from the beginning of the cell contents
		filter_useParsedData : false, // filter all data using parsed content
		filter_serversideFiltering : false, // if true, server-side filtering should be performed because client-side filtering will be disabled, but the ui and events will still be used.
		filter_defaultAttrib : 'data-value' // data attribute in the header cell that contains the default filter value
	},
	format: function(table, c, wo) {
		if (!c.$table.hasClass('hasFilters')) {
			if (c.parsers || !c.parsers && wo.filter_serversideFiltering) {
				ts.filter.init(table, c, wo);
			}
		}
	},
	remove: function(table, c, wo) {
		var tbodyIndex, $tbody,
			$table = c.$table,
			$tbodies = c.$tbodies;
		$table
			.removeClass('hasFilters')
			// add .tsfilter namespace to all BUT search
			.unbind('addRows updateCell update updateComplete appendCache search filterStart filterEnd '.split(' ').join('.tsfilter '))
			.find('.tablesorter-filter-row').remove();
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true); // remove tbody
			$tbody.children().removeClass(wo.filter_filteredRow).show();
			ts.processTbody(table, $tbody, false); // restore tbody
		}
		if (wo.filter_reset) {
			$(document).undelegate(wo.filter_reset, 'click.tsfilter');
		}
	}
});

ts.filter = {

	// regex used in filter "check" functions - not for general use and not documented
	regex: {
		regex     : /^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/, // regex to test for regex
		child     : /tablesorter-childRow/, // child row class name; this gets updated in the script
		filtered  : /filtered/, // filtered (hidden) row class name; updated in the script
		type      : /undefined|number/, // check type
		exact     : /(^[\"|\'|=]+)|([\"|\'|=]+$)/g, // exact match (allow '==')
		nondigit  : /[^\w,. \-()]/g, // replace non-digits (from digit & currency parser)
		operators : /[<>=]/g // replace operators
	},
		// function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed )
		// filter = array of filter input values; iFilter = same array, except lowercase
		// exact = table cell text (or parsed data if column parser enabled)
		// iExact = same as exact, except lowercase
		// cached = table cell text from cache, so it has been parsed
		// index = column index; table = table element (DOM)
		// wo = widget options (table.config.widgetOptions)
		// parsed = array (by column) of boolean values (from filter_useParsedData or "filter-parsed" class)
	types: {
		// Look for regex
		regex: function( filter, iFilter, exact, iExact ) {
			if ( ts.filter.regex.regex.test(iFilter) ) {
				var matches,
					regex = ts.filter.regex.regex.exec(iFilter);
				try {
					matches = new RegExp(regex[1], regex[2]).test( iExact );
				} catch (error) {
					matches = false;
				}
				return matches;
			}
			return null;
		},
		// Look for quotes or equals to get an exact match; ignore type since iExact could be numeric
		exact: function( filter, iFilter, exact, iExact ) {
			/*jshint eqeqeq:false */
			if ( iFilter.replace(ts.filter.regex.exact, '') == iExact ) {
				return true;
			}
			return null;
		},
		// Look for a not match
		notMatch: function( filter, iFilter, exact, iExact, cached, index, table, wo ) {
			if ( /^\!/.test(iFilter) ) {
				iFilter = iFilter.replace('!', '');
				var indx = iExact.search( $.trim(iFilter) );
				return iFilter === '' ? true : !(wo.filter_startsWith ? indx === 0 : indx >= 0);
			}
			return null;
		},
		// Look for operators >, >=, < or <=
		operators: function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( /^[<>]=?/.test(iFilter) ) {
				var cachedValue, result,
					c = table.config,
					query = ts.formatFloat( iFilter.replace(ts.filter.regex.operators, ''), table ),
					parser = c.parsers[index],
					savedSearch = query;
					// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || parser.type === 'numeric') {
					cachedValue = parser.format( '' + iFilter.replace(ts.filter.regex.operators, ''), table, c.$headers.eq(index), index );
					query = ( typeof query === "number" && cachedValue !== '' && !isNaN(cachedValue) ) ? cachedValue : query;
				}
				// iExact may be numeric - see issue #149;
				// check if cached is defined, because sometimes j goes out of range? (numeric columns)
				cachedValue = ( parsed[index] || parser.type === 'numeric' ) && !isNaN(query) && cached ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );
				if ( />/.test(iFilter) ) { result = />=/.test(iFilter) ? cachedValue >= query : cachedValue > query; }
				if ( /</.test(iFilter) ) { result = /<=/.test(iFilter) ? cachedValue <= query : cachedValue < query; }
				// keep showing all rows if nothing follows the operator
				if ( !result && savedSearch === '' ) { result = true; }
				return result;
			}
			return null;
		},
		// Look for an AND or && operator (logical and)
		and : function( filter, iFilter, exact, iExact ) {
			if ( /\s+(AND|&&)\s+/g.test(filter) ) {
				var query = iFilter.split( /(?:\s+(?:and|&&)\s+)/g ),
					result = iExact.search( $.trim(query[0]) ) >= 0,
					indx = query.length - 1;
				while (result && indx) {
					result = result && iExact.search( $.trim(query[indx]) ) >= 0;
					indx--;
				}
				return result;
			}
			return null;
		},
		// Look for a range (using " to " or " - ") - see issue #166; thanks matzhu!
		range : function( filter, iFilter, exact, iExact, cached, index, table, wo, parsed ) {
			if ( /\s+(-|to)\s+/.test(iFilter) ) {
				var result,
					c = table.config,
					query = iFilter.split(/(?: - | to )/), // make sure the dash is for a range and not indicating a negative number
					range1 = ts.formatFloat(query[0].replace(ts.filter.regex.nondigit, ''), table),
					range2 = ts.formatFloat(query[1].replace(ts.filter.regex.nondigit, ''), table);
					// parse filter value in case we're comparing numbers (dates)
				if (parsed[index] || c.parsers[index].type === 'numeric') {
					result = c.parsers[index].format('' + query[0], table, c.$headers.eq(index), index);
					range1 = (result !== '' && !isNaN(result)) ? result : range1;
					result = c.parsers[index].format('' + query[1], table, c.$headers.eq(index), index);
					range2 = (result !== '' && !isNaN(result)) ? result : range2;
				}
				result = ( parsed[index] || c.parsers[index].type === 'numeric' ) && !isNaN(range1) && !isNaN(range2) ? cached :
					isNaN(iExact) ? ts.formatFloat( iExact.replace(ts.filter.regex.nondigit, ''), table) :
					ts.formatFloat( iExact, table );
				if (range1 > range2) { result = range1; range1 = range2; range2 = result; } // swap
				return (result >= range1 && result <= range2) || (range1 === '' || range2 === '');
			}
			return null;
		},
		// Look for wild card: ? = single, * = multiple, or | = logical OR
		wild : function( filter, iFilter, exact, iExact, cached, index, table ) {
			if ( /[\?|\*]/.test(iFilter) || /\s+OR\s+/.test(filter) ) {
				var c = table.config,
					query = iFilter.replace(/\s+OR\s+/gi,"|");
				// look for an exact match with the "or" unless the "filter-match" class is found
				if (!c.$headers.filter('[data-column="' + index + '"]:last').hasClass('filter-match') && /\|/.test(query)) {
					query = '^(' + query + ')$';
				}
				return new RegExp( query.replace(/\?/g, '\\S{1}').replace(/\*/g, '\\S*') ).test(iExact);
			}
			return null;
		},
		// fuzzy text search; modified from https://github.com/mattyork/fuzzy (MIT license)
		fuzzy: function( filter, iFilter, exact, iExact ) {
			if ( /^~/.test(iFilter) ) {
				var indx,
					patternIndx = 0,
					len = iExact.length,
					pattern = iFilter.slice(1);
				for (indx = 0; indx < len; indx++) {
					if (iExact[indx] === pattern[patternIndx]) {
						patternIndx += 1;
					}
				}
				if (patternIndx === pattern.length) {
					return true;
				}
				return false;
			}
			return null;
		}
	},
	init: function(table, c, wo) {
		var options, string, $header, column, filters, time;
		if (c.debug) {
			time = new Date();
		}
		c.$table.addClass('hasFilters');

		ts.filter.regex.child = new RegExp(c.cssChildRow);
		ts.filter.regex.filtered = new RegExp(wo.filter_filteredRow);

		// don't build filter row if columnFilters is false or all columns are set to "filter-false" - issue #156
		if (wo.filter_columnFilters !== false && c.$headers.filter('.filter-false').length !== c.$headers.length) {
			// build filter row
			ts.filter.buildRow(table, c, wo);
		}

		c.$table.bind('addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search '.split(' ').join('.tsfilter '), function(event, filter) {
			if ( !/(search|filterReset|filterEnd)/.test(event.type) ) {
				event.stopPropagation();
				ts.filter.buildDefault(table, true);
			}
			if (event.type === 'filterReset') {
				ts.filter.searching(table, []);
			}
			if (event.type === 'filterEnd') {
				ts.filter.buildDefault(table, true);
			} else {
				// send false argument to force a new search; otherwise if the filter hasn't changed, it will return
				filter = event.type === 'search' ? filter : event.type === 'updateComplete' ? c.$table.data('lastSearch') : '';
				ts.filter.searching(table, filter);
			}
			return false;
		});
		ts.filter.bindSearch( table, c.$table.find('input.tablesorter-filter') );

		// reset button/link
		if (wo.filter_reset) {
			$(document).delegate(wo.filter_reset, 'click.tsfilter', function() {
				ts.filter.searching(table, []);
			});
		}
		if (wo.filter_functions) {
			// column = column # (string)
			for (column in wo.filter_functions) {
				if (wo.filter_functions.hasOwnProperty(column) && typeof column === 'string') {
					$header = c.$headers.filter('[data-column="' + column + '"]:last');
					options = '';
					if (wo.filter_functions[column] === true && !$header.hasClass('filter-false')) {
						ts.filter.buildSelect(column);
					} else if (typeof column === 'string' && !$header.hasClass('filter-false')) {
						// add custom drop down list
						for (string in wo.filter_functions[column]) {
							if (typeof string === 'string') {
								options += options === '' ?
									'<option value="">' + ($header.data('placeholder') || $header.attr('data-placeholder') ||  '') + '</option>' : '';
								options += '<option value="' + string + '">' + string + '</option>';
							}
						}
						c.$table.find('thead').find('select.tablesorter-filter[data-column="' + column + '"]').append(options);
					}
				}
			}
		}
		// not really updating, but if the column has both the "filter-select" class & filter_functions set to true,
		// it would append the same options twice.
		ts.filter.buildDefault(table, true);

		c.$table.find('select.tablesorter-filter').bind('change search', function(event, filter) {
			ts.filter.checkFilters(table, filter);
		});

		if (wo.filter_hideFilters) {
			ts.filter.hideFilters(table, c, wo);
		}

		// show processing icon
		if (c.showProcessing) {
			c.$table.bind('filterStart.tsfilter filterEnd.tsfilter', function(event, columns) {
				// only add processing to certain columns to all columns
				$header = (columns) ? c.$table.find('.' + ts.css.header).filter('[data-column]').filter(function() {
					return columns[$(this).data('column')] !== '';
				}) : '';
				ts.isProcessing(table, event.type === 'filterStart', columns ? $header : '');
			});
		}
		if (c.debug) {
			ts.benchmark("Applying Filter widget", time);
		}
		// add default values
		c.$table.bind('tablesorter-initialized pagerInitialized', function() {
			filters = ts.filter.setDefaults(table, c, wo) || [];
			if (filters.length) {
				ts.setFilters(table, filters, true);
			}
		});
		// filter widget initialized
		wo.filter_Initialized = true;
		c.$table.trigger('filterInit');
		ts.filter.checkFilters(table);
	},
	setDefaults: function(table, c, wo){
		var indx,
			filters = [],
			columns = c.columns;
		for (indx = 0; indx < columns; indx++) {
			filters[indx] = c.$headers.filter('[data-column="' + indx + '"]:last').attr(wo.filter_defaultAttrib) || filters[indx];
		}
		$(table).data('lastSearch', filters);
		return filters;
	},
	buildRow: function(table, c, wo) {
		var column, $header, buildSelect, disabled,
			// c.columns defined in computeThIndexes()
			columns = c.columns,
			buildFilter = '<tr class="tablesorter-filter-row">';
		for (column = 0; column < columns; column++) {
			buildFilter += '<td></td>';
		}
		c.$filters = $(buildFilter += '</tr>').appendTo( c.$table.find('thead').eq(0) ).find('td');
		// build each filter input
		for (column = 0; column < columns; column++) {
			disabled = false;
			// assuming last cell of a column is the main column
			$header = c.$headers.filter('[data-column="' + column + '"]:last');
			buildSelect = (wo.filter_functions && wo.filter_functions[column] && typeof wo.filter_functions[column] !== 'function') ||
				$header.hasClass('filter-select');
			// get data from jQuery data, metadata, headers option or header class name
			if (ts.getData) {
				// get data from jQuery data, metadata, headers option or header class name
				disabled = ts.getData($header[0], c.headers[column], 'filter') === 'false';
			} else {
				// only class names and header options - keep this for compatibility with tablesorter v2.0.5
				disabled = (c.headers[column] && c.headers[column].hasOwnProperty('filter') && c.headers[column].filter === false) ||
					$header.hasClass('filter-false');
			}
			if (buildSelect) {
				buildFilter = $('<select>').appendTo( c.$filters.eq(column) );
			} else {
				if (wo.filter_formatter && $.isFunction(wo.filter_formatter[column])) {
					buildFilter = wo.filter_formatter[column]( c.$filters.eq(column), column );
					// no element returned, so lets go find it
					if (buildFilter && buildFilter.length === 0) {
						buildFilter = c.$filters.eq(column).children('input');
					}
					// element not in DOM, so lets attach it
					if ( buildFilter && (buildFilter.parent().length === 0 ||
						(buildFilter.parent().length && buildFilter.parent()[0] !== c.$filters[column])) ) {
						c.$filters.eq(column).append(buildFilter);
					}
				} else {
					buildFilter = $('<input type="search">').appendTo( c.$filters.eq(column) );
				}
				if (buildFilter) {
					buildFilter.attr('placeholder', $header.data('placeholder') || $header.attr('data-placeholder') || '');
				}
			}
			if (buildFilter) {
				buildFilter.addClass('tablesorter-filter ' + wo.filter_cssFilter).attr('data-column', column);
				if (disabled) {
					buildFilter.addClass('disabled')[0].disabled = true; // disabled!
				}
			}
		}
	},
	bindSearch: function(table, $el) {
		table = $(table)[0];
		var external, wo = table.config.widgetOptions;
		$el.bind('keyup search', function(event, filter) {
			// emulate what webkit does.... escape clears the filter
			if (event.which === 27) {
				this.value = '';
			// liveSearch can contain a min value length; ignore arrow and meta keys, but allow backspace
			} else if ( (typeof wo.filter_liveSearch === 'number' && this.value.length < wo.filter_liveSearch && this.value !== '') ||
				( event.type === 'keyup' && ( (event.which < 32 && event.which !== 8 && wo.filter_liveSearch === true && event.which !== 13) ||
				( event.which >= 37 && event.which <= 40 ) || (event.which !== 13 && wo.filter_liveSearch === false) ) ) ) {
					return;
			}
			// external searches won't have a filter parameter, so grab the value
			external = $(this).hasClass('tablesorter-filter') ? filter : [ $(this).val() ];
			ts.filter.searching(table, filter, external);
		});
	},
	checkFilters: function(table, filter) {
		var c = table.config,
			wo = c.widgetOptions,
			filterArray = $.isArray(filter),
			filters = (filterArray) ? filter : ts.getFilters(table),
			combinedFilters = (filters || []).join(''); // combined filter values
		// add filter array back into inputs
		if (filterArray) {
			ts.setFilters( table, filters );
		}
		if (wo.filter_hideFilters) {
			// show/hide filter row as needed
			c.$table.find('.tablesorter-filter-row').trigger( combinedFilters === '' ? 'mouseleave' : 'mouseenter' );
		}
		// return if the last search is the same; but filter === false when updating the search
		// see example-widget-filter.html filter toggle buttons
		if (c.lastCombinedFilter === combinedFilters && filter !== false) { return; }
		c.$table.trigger('filterStart', [filters]);
		if (c.showProcessing) {
			// give it time for the processing icon to kick in
			setTimeout(function() {
				ts.filter.findRows(table, filters, combinedFilters);
				return false;
			}, 30);
		} else {
			ts.filter.findRows(table, filters, combinedFilters);
			return false;
		}
	},
	hideFilters: function(table, c, wo) {
		var $filterRow, $filterRow2, timer;
		c.$table
			.find('.tablesorter-filter-row')
			.addClass('hideme')
			.bind('mouseenter mouseleave', function(e) {
				// save event object - http://bugs.jquery.com/ticket/12140
				var event = e;
				$filterRow = $(this);
				clearTimeout(timer);
				timer = setTimeout(function() {
					if ( /enter|over/.test(event.type) ) {
						$filterRow.removeClass('hideme');
					} else {
						// don't hide if input has focus
						// $(':focus') needs jQuery 1.6+
						if ( $(document.activeElement).closest('tr')[0] !== $filterRow[0] ) {
							// don't hide row if any filter has a value
							if (ts.getFilters(table).join('') === '') {
								$filterRow.addClass('hideme');
							}
						}
					}
				}, 200);
			})
			.find('input, select').bind('focus blur', function(e) {
				$filterRow2 = $(this).closest('tr');
				clearTimeout(timer);
				var event = e;
				timer = setTimeout(function() {
					// don't hide row if any filter has a value
					if (ts.getFilters(table).join('') === '') {
						$filterRow2[ event.type === 'focus' ? 'removeClass' : 'addClass']('hideme');
					}
				}, 200);
			});
	},
	findRows: function(table, filters, combinedFilters) {
		var cached, len, $rows, rowIndex, tbodyIndex, $tbody, $cells, columnIndex,
			childRow, childRowText, exact, iExact, iFilter, lastSearch, matches, result,
			searchFiltered, filterMatched, showRow, time,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns,
			$tbodies = c.$tbodies,
			// anyMatch really screws up with these types of filters
			anyMatchNotAllowedTypes = [ 'range',  'operators' ],
			// parse columns after formatter, in case the class is added at that point
			parsed = c.$headers.map(function(columnIndex) {
				return (ts.getData) ? 
					ts.getData(c.$headers.filter('[data-column="' + columnIndex + '"]:last'), c.headers[columnIndex], 'filter') === 'parsed' :
					$(this).hasClass('filter-parsed');
			}).get();
		if (c.debug) { time = new Date(); }
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			if ($tbodies.eq(tbodyIndex).hasClass(ts.css.info)) { continue; } // ignore info blocks, issue #264
			$tbody = ts.processTbody(table, $tbodies.eq(tbodyIndex), true);
			$rows = $tbody.children('tr').not('.' + c.cssChildRow);
			len = $rows.length;
			if (combinedFilters === '' || wo.filter_serversideFiltering) {
				$tbody.children().show().removeClass(wo.filter_filteredRow);
			} else {
				// optimize searching only through already filtered rows - see #313
				searchFiltered = true;
				lastSearch = c.lastSearch || c.$table.data('lastSearch') || [];
				$.each(filters, function(indx, val) {
					// check for changes from beginning of filter; but ignore if there is a logical "or" in the string
					searchFiltered = (val || '').indexOf(lastSearch[indx] || '') === 0 && searchFiltered && !/(\s+or\s+|\|)/g.test(val || '');
				});
				// can't search when all rows are hidden - this happens when looking for exact matches
				if (searchFiltered && $rows.filter(':visible').length === 0) { searchFiltered = false; }
				// loop through the rows
				for (rowIndex = 0; rowIndex < len; rowIndex++) {
					childRow = $rows[rowIndex].className;
					// skip child rows & already filtered rows
					if ( ts.filter.regex.child.test(childRow) || (searchFiltered && ts.filter.regex.filtered.test(childRow)) ) { continue; }
					showRow = true;
					// *** nextAll/nextUntil not supported by Zepto! ***
					childRow = $rows.eq(rowIndex).nextUntil('tr:not(.' + c.cssChildRow + ')');
					// so, if "table.config.widgetOptions.filter_childRows" is true and there is
					// a match anywhere in the child row, then it will make the row visible
					// checked here so the option can be changed dynamically
					childRowText = (childRow.length && wo.filter_childRows) ? childRow.text() : '';
					childRowText = wo.filter_ignoreCase ? childRowText.toLocaleLowerCase() : childRowText;
					$cells = $rows.eq(rowIndex).children('td');
					for (columnIndex = 0; columnIndex < columns; columnIndex++) {
						// ignore if filter is empty or disabled
						if (filters[columnIndex] || wo.filter_anyMatch) {
							cached = c.cache[tbodyIndex][rowIndex].normalized[columnIndex];
							// check if column data should be from the cell or from parsed data
							if (wo.filter_useParsedData || parsed[columnIndex]) {
								exact = cached;
							} else {
							// using older or original tablesorter
								exact = $.trim($cells.eq(columnIndex).text());
								exact = c.sortLocaleCompare ? ts.replaceAccents(exact) : exact; // issue #405
							}
							iExact = !ts.filter.regex.type.test(typeof exact) && wo.filter_ignoreCase ? exact.toLocaleLowerCase() : exact;
							result = showRow; // if showRow is true, show that row

							if (typeof filters[columnIndex] === "undefined" || filters[columnIndex] === null) {
								filters[columnIndex] = wo.filter_anyMatch ? combinedFilters : filters[columnIndex];
							}

							// replace accents - see #357
							filters[columnIndex] = c.sortLocaleCompare ? ts.replaceAccents(filters[columnIndex]) : filters[columnIndex];
							// val = case insensitive, filters[columnIndex] = case sensitive
							iFilter = wo.filter_ignoreCase ? filters[columnIndex].toLocaleLowerCase() : filters[columnIndex];
							if (wo.filter_functions && wo.filter_functions[columnIndex]) {
								if (wo.filter_functions[columnIndex] === true) {
									// default selector; no "filter-select" class
									result = (c.$headers.filter('[data-column="' + columnIndex + '"]:last').hasClass('filter-match')) ?
										iExact.search(iFilter) >= 0 : filters[columnIndex] === exact;
								} else if (typeof wo.filter_functions[columnIndex] === 'function') {
									// filter callback( exact cell content, parser normalized content, filter input value, column index, jQuery row object )
									result = wo.filter_functions[columnIndex](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								} else if (typeof wo.filter_functions[columnIndex][filters[columnIndex]] === 'function') {
									// selector option function
									result = wo.filter_functions[columnIndex][filters[columnIndex]](exact, cached, filters[columnIndex], columnIndex, $rows.eq(rowIndex));
								}
							} else {
								filterMatched = null;
								// cycle through the different filters
								// filters return a boolean or null if nothing matches
								$.each(ts.filter.types, function(type, typeFunction) {
									if (!wo.filter_anyMatch || (wo.filter_anyMatch && anyMatchNotAllowedTypes.indexOf(type) < 0)) {
										matches = typeFunction( filters[columnIndex], iFilter, exact, iExact, cached, columnIndex, table, wo, parsed );
										if (matches !== null) {
											filterMatched = matches;
											return false;
										}
									}
								});
								if (filterMatched !== null) {
									result = filterMatched;
								// Look for match, and add child row data for matching
								} else {
									exact = (iExact + childRowText).indexOf(iFilter);
									result = ( (!wo.filter_startsWith && exact >= 0) || (wo.filter_startsWith && exact === 0) );
								}
							}
							if (wo.filter_anyMatch) {
								showRow = result;
								if (showRow){
									break;
								}
							} else {
								showRow = (result) ? showRow : false;
							}
						}
					}
					$rows[rowIndex].style.display = (showRow ? '' : 'none');
					$rows.eq(rowIndex)[showRow ? 'removeClass' : 'addClass'](wo.filter_filteredRow);
					if (childRow.length) {
						if (c.pager && c.pager.countChildRows || wo.pager_countChildRows) {
							childRow[showRow ? 'removeClass' : 'addClass'](wo.filter_filteredRow); // see issue #396
						}
						childRow.toggle(showRow);
					}
				}
			}
			ts.processTbody(table, $tbody, false);
		}
		c.lastCombinedFilter = combinedFilters; // save last search
		c.lastSearch = filters;
		c.$table.data('lastSearch', filters);
		if (c.debug) {
			ts.benchmark("Completed filter widget search", time);
		}
		c.$table.trigger('applyWidgets'); // make sure zebra widget is applied
		c.$table.trigger('filterEnd');
	},
	buildSelect: function(table, column, updating, onlyavail) {
		column = parseInt(column, 10);
		var indx, rowIndex, tbodyIndex, len, currentValue, txt,
			c = table.config,
			wo = c.widgetOptions,
			$tbodies = c.$tbodies,
			arry = [],
			node = c.$headers.filter('[data-column="' + column + '"]:last'),
			// t.data('placeholder') won't work in jQuery older than 1.4.3
			options = '<option value="">' + ( node.data('placeholder') || node.attr('data-placeholder') || '' ) + '</option>';
		for (tbodyIndex = 0; tbodyIndex < $tbodies.length; tbodyIndex++ ) {
			len = c.cache[tbodyIndex].length;
			// loop through the rows
			for (rowIndex = 0; rowIndex < len; rowIndex++) {
				// check if has class filtered
				if (onlyavail && c.cache[tbodyIndex][rowIndex].original[0].className.match(wo.filter_filteredRow)) { continue; }
				// get non-normalized cell content
				if (wo.filter_useParsedData) {
					arry.push( '' + c.cache[tbodyIndex][rowIndex].normalized[column] );
				} else {
					node = c.cache[tbodyIndex][rowIndex].original[0].cells[column];
					if (node) {
						arry.push( $.trim( node.textContent || node.innerText || $(node).text() ) );
					}
				}
			}
		}
		// get unique elements and sort the list
		// if $.tablesorter.sortText exists (not in the original tablesorter),
		// then natural sort the list otherwise use a basic sort
		arry = $.grep(arry, function(value, indx) {
			return $.inArray(value, arry) === indx;
		});
		arry = (ts.sortNatural) ? arry.sort(function(a, b) { return ts.sortNatural(a, b); }) : arry.sort(true);

		// Get curent filter value
		currentValue = c.$table.find('thead').find('select.tablesorter-filter[data-column="' + column + '"]').val();

		// build option list
		for (indx = 0; indx < arry.length; indx++) {
			txt = arry[indx].replace(/\"/g, "&quot;");
			// replace quotes - fixes #242 & ignore empty strings - see http://stackoverflow.com/q/14990971/145346
			options += arry[indx] !== '' ? '<option value="' + txt + '"' + (currentValue === txt ? ' selected="selected"' : '') +
				'>' + arry[indx] + '</option>' : '';
		}
		c.$table.find('thead').find('select.tablesorter-filter[data-column="' + column + '"]')[ updating ? 'html' : 'append' ](options);
	},
	buildDefault: function(table, updating) {
		var columnIndex, $header,
			c = table.config,
			wo = c.widgetOptions,
			columns = c.columns;
		// build default select dropdown
		for (columnIndex = 0; columnIndex < columns; columnIndex++) {
			$header = c.$headers.filter('[data-column="' + columnIndex + '"]:last');
			// look for the filter-select class; build/update it if found
			if (($header.hasClass('filter-select') || wo.filter_functions && wo.filter_functions[columnIndex] === true) &&
				!$header.hasClass('filter-false')) {
				if (!wo.filter_functions) { wo.filter_functions = {}; }
				wo.filter_functions[columnIndex] = true; // make sure this select gets processed by filter_functions
				ts.filter.buildSelect(table, columnIndex, updating, $header.hasClass(wo.filter_onlyAvail));
			}
		}
	},
	searching: function(table, filter, external) {
		if (typeof filter === 'undefined' || filter === true || external) {
			var wo = table.config.widgetOptions;
			// delay filtering
			clearTimeout(wo.searchTimer);
			wo.searchTimer = setTimeout(function() {
				ts.filter.checkFilters(table, external || filter);
			}, wo.filter_liveSearch ? wo.filter_searchDelay : 10);
		} else {
			// skip delay
			ts.filter.checkFilters(table, filter);
		}
	}
};

ts.getFilters = function(table) {
	var c = table ? $(table)[0].config : {};
	if (c && c.widgetOptions && !c.widgetOptions.filter_columnFilters) {
		// no filter row
		return $(table).data('lastSearch');
	}
	return c && c.$filters ? c.$filters.map(function(indx, el) {
		return $(el).find('.tablesorter-filter').val() || '';
	}).get() || [] : false;
};

ts.setFilters = function(table, filter, apply) {
	var $table = $(table),
		c = $table.length ? $table[0].config : {},
		valid = c && c.$filters ? c.$filters.each(function(indx, el) {
			$(el).find('.tablesorter-filter').val(filter[indx] || '');
		}).trigger('change.tsfilter') || false : false;
	if (apply) { $table.trigger('search', [filter, false]); }
	return !!valid;
};

// Widget: Sticky headers
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// and https://github.com/jmosbech/StickyTableHeaders by Jonas Mosbech
// **************************
ts.addWidget({
	id: "stickyHeaders",
	priority: 60,
	options: {
		stickyHeaders : '',       // extra class name added to the sticky header row
		stickyHeaders_offset : 0, // number or jquery selector targeting the position:fixed element
		stickyHeaders_cloneId : '-sticky', // added to table ID, if it exists
		stickyHeaders_addResizeEvent : true, // trigger "resize" event on headers
		stickyHeaders_includeCaption : true, // if false and a caption exist, it won't be included in the sticky header
		stickyHeaders_zIndex : 2 // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
	},
	format: function(table, c, wo){
		if (c.$table.hasClass('hasStickyHeaders')) { return; }
		var $t = c.$table,
			$win = $(window),
			header = $t.children('thead:first'),
			hdrCells = header.children('tr:not(.sticky-false)').children(),
			innr = '.tablesorter-header-inner',
			tfoot = $t.find('tfoot'),
			filterInputs = '.tablesorter-filter',
			$stickyOffset = isNaN(wo.stickyHeaders_offset) ? $(wo.stickyHeaders_offset) : '',
			stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0,
			stickyzIndex = wo.stickyHeaders_zIndex ? wo.stickyHeaders_zIndex : 2,
			$stickyTable = wo.$sticky = $t.clone()
				.addClass('containsStickyHeaders')
				.css({
					position   : 'fixed',
					margin     : 0,
					top        : stickyOffset,
					visibility : 'hidden',
					zIndex     : stickyzIndex
				}),
			stkyHdr = $stickyTable.children('thead:first').addClass('tablesorter-stickyHeader ' + wo.stickyHeaders),
			stkyCells,
			laststate = '',
			spacing = 0,
			flag = false,
			resizeHdr = function(){
				stickyOffset = $stickyOffset.length ? $stickyOffset.height() || 0 : parseInt(wo.stickyHeaders_offset, 10) || 0;
				var bwsr = navigator.userAgent;
				spacing = 0;
				// yes, I dislike browser sniffing, but it really is needed here :(
				// webkit automatically compensates for border spacing
				if ($t.css('border-collapse') !== 'collapse' && !/(webkit|msie)/i.test(bwsr)) {
					// Firefox & Opera use the border-spacing
					// update border-spacing here because of demos that switch themes
					spacing = parseInt(hdrCells.eq(0).css('border-left-width'), 10) * 2;
				}
				$stickyTable.css({
					left : header.offset().left - $win.scrollLeft() - spacing,
					width: $t.width()
				});
				stkyCells.filter(':visible').each(function(i){
					var $h = hdrCells.filter(':visible').eq(i);
					$(this)
						.css({
							width: $h.width() - spacing,
							height: $h.height()
						})
						.find(innr).width( $h.find(innr).width() );
				});
			};
		// fix clone ID, if it exists - fixes #271
		if ($stickyTable.attr('id')) { $stickyTable[0].id += wo.stickyHeaders_cloneId; }
		// clear out cloned table, except for sticky header
		// include caption & filter row (fixes #126 & #249)
		$stickyTable.find('thead:gt(0), tr.sticky-false, tbody, tfoot').remove();
		if (!wo.stickyHeaders_includeCaption) {
			$stickyTable.find('caption').remove();
		}
		// issue #172 - find td/th in sticky header
		stkyCells = stkyHdr.children().children();
		$stickyTable.css({ height:0, width:0, padding:0, margin:0, border:0 });
		// remove resizable block
		stkyCells.find('.tablesorter-resizer').remove();
		// update sticky header class names to match real header after sorting
		$t
		.addClass('hasStickyHeaders')
		.bind('sortEnd.tsSticky', function(){
			hdrCells.filter(':visible').each(function(i){
				var t = stkyCells.filter(':visible').eq(i);
				t
					.attr('class', $(this).attr('class'))
					// remove processing icon
					.removeClass(ts.css.processing + ' ' + c.cssProcessing);
				if (c.cssIcon){
					t
					.find('.' + ts.css.icon)
					.attr('class', $(this).find('.' + ts.css.icon).attr('class'));
				}
			});
		})
		.bind('pagerComplete.tsSticky', function(){
			resizeHdr();
		});
		// http://stackoverflow.com/questions/5312849/jquery-find-self;
		hdrCells.find(c.selectorSort).add( c.$headers.filter(c.selectorSort) ).each(function(i){
			var t = $(this),
			// clicking on sticky will trigger sort
			$cell = stkyHdr.children('tr.tablesorter-headerRow').children().eq(i).bind('mouseup', function(e){
				t.trigger(e, true); // external mouseup flag (click timer is ignored)
			});
			// prevent sticky header text selection
			if (c.cancelSelection) {
				$cell
					.attr('unselectable', 'on')
					.bind('selectstart', false)
					.css({
						'user-select': 'none',
						'MozUserSelect': 'none'
					});
			}
		});
		// add stickyheaders AFTER the table. If the table is selected by ID, the original one (first) will be returned.
		$t.after( $stickyTable );
		// make it sticky!
		$win.bind('scroll.tsSticky resize.tsSticky', function(e){
			if (!$t.is(':visible')) { return; } // fixes #278
			var pre = 'tablesorter-sticky-',
				offset = $t.offset(),
				cap = (wo.stickyHeaders_includeCaption ? 0 : $t.find('caption').outerHeight(true)),
				sTop = $win.scrollTop() + stickyOffset - cap,
				tableHt = $t.height() - ($stickyTable.height() + (tfoot.height() || 0)),
				vis = (sTop > offset.top) && (sTop < offset.top + tableHt) ? 'visible' : 'hidden';
			$stickyTable
			.removeClass(pre + 'visible ' + pre + 'hidden')
			.addClass(pre + vis)
			.css({
				// adjust when scrolling horizontally - fixes issue #143
				left : header.offset().left - $win.scrollLeft() - spacing,
				visibility : vis
			});
			if (vis !== laststate || e.type === 'resize'){
				// make sure the column widths match
				resizeHdr();
				laststate = vis;
			}
		});
		if (wo.stickyHeaders_addResizeEvent) {
			ts.addHeaderResizeEvent(table);
		}

		// look for filter widget
		$t.bind('filterEnd', function(){
			if (flag) { return; }
			stkyHdr.find('.tablesorter-filter-row').children().each(function(i){
				$(this).find(filterInputs).val( c.$filters.find(filterInputs).eq(i).val() );
			});
		});
		stkyCells.find(filterInputs).bind('keyup search change', function(e){
			// ignore arrow and meta keys; allow backspace
			if ((e.which < 32 && e.which !== 8) || (e.which >= 37 && e.which <=40)) { return; }
			flag = true;
			var $f = $(this), col = $f.attr('data-column');
			c.$filters.find(filterInputs).eq(col)
				.val( $f.val() )
				.trigger('search');
			setTimeout(function(){
				flag = false;
			}, wo.filter_searchDelay);
		});
		$t.trigger('stickyHeadersInit');

	},
	remove: function(table, c, wo){
		c.$table
			.removeClass('hasStickyHeaders')
			.unbind('sortEnd.tsSticky pagerComplete.tsSticky')
			.find('.tablesorter-stickyHeader').remove();
		if (wo.$sticky && wo.$sticky.length) { wo.$sticky.remove(); } // remove cloned table
		// don't unbind if any table on the page still has stickyheaders applied
		if (!$('.hasStickyHeaders').length) {
			$(window).unbind('scroll.tsSticky resize.tsSticky');
		}
		ts.addHeaderResizeEvent(table, false);
	}
});

// Add Column resizing widget
// this widget saves the column widths if
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: "resizable",
	priority: 40,
	options: {
		resizable : true,
		resizable_addLastColumn : false
	},
	format: function(table, c, wo){
		if (c.$table.hasClass('hasResizable')) { return; }
		c.$table.addClass('hasResizable');
		var $t, t, i, j, s = {}, $c, $cols, w, tw,
			$tbl = c.$table,
			position = 0,
			$target = null,
			$next = null,
			fullWidth = Math.abs($tbl.parent().width() - $tbl.width()) < 20,
			stopResize = function(){
				if (ts.storage && $target){
					s[$target.index()] = $target.width();
					s[$next.index()] = $next.width();
					$target.width( s[$target.index()] );
					$next.width( s[$next.index()] );
					if (wo.resizable !== false){
						ts.storage(table, 'tablesorter-resizable', s);
					}
				}
				position = 0;
				$target = $next = null;
				$(window).trigger('resize'); // will update stickyHeaders, just in case
			};
		s = (ts.storage && wo.resizable !== false) ? ts.storage(table, 'tablesorter-resizable') : {};
		// process only if table ID or url match
		if (s){
			for (j in s){
				if (!isNaN(j) && j < c.$headers.length){
					c.$headers.eq(j).width(s[j]); // set saved resizable widths
				}
			}
		}
		$t = $tbl.children('thead:first').children('tr');
		// add resizable-false class name to headers (across rows as needed)
		$t.children().each(function(){
			t = $(this);
			i = t.attr('data-column');
			j = ts.getData( t, c.headers[i], 'resizable') === "false";
			$t.children().filter('[data-column="' + i + '"]').toggleClass('resizable-false', j);
		});
		// add wrapper inside each cell to allow for positioning of the resizable target block
		$t.each(function(){
			$c = $(this).children(':not(.resizable-false)');
			if (!$(this).find('.tablesorter-wrapper').length) {
				// Firefox needs this inner div to position the resizer correctly
				$c.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');
			}
			// don't include the last column of the row
			if (!wo.resizable_addLastColumn) { $c = $c.slice(0,-1); }
			$cols = $cols ? $cols.add($c) : $c;
		});
		$cols
		.each(function(){
			$t = $(this);
			j = parseInt($t.css('padding-right'), 10) + 10; // 8 is 1/2 of the 16px wide resizer grip
			t = '<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-' + j +
				'px;top:0;height:100%;width:20px;"></div>';
			$t
				.find('.tablesorter-wrapper')
				.append(t);
		})
		.bind('mousemove.tsresize', function(e){
			// ignore mousemove if no mousedown
			if (position === 0 || !$target) { return; }
			// resize columns
			w = e.pageX - position;
			tw = $target.width();
			$target.width( tw + w );
			if ($target.width() !== tw && fullWidth){
				$next.width( $next.width() - w );
			}
			position = e.pageX;
		})
		.bind('mouseup.tsresize', function(){
			stopResize();
		})
		.find('.tablesorter-resizer,.tablesorter-resizer-grip')
		.bind('mousedown', function(e){
			// save header cell and mouse position; closest() not supported by jQuery v1.2.6
			$target = $(e.target).closest('th');
			t = c.$headers.filter('[data-column="' + $target.attr('data-column') + '"]');
			if (t.length > 1) { $target = $target.add(t); }
			// if table is not as wide as it's parent, then resize the table
			$next = e.shiftKey ? $target.parent().find('th:not(.resizable-false)').filter(':last') : $target.nextAll(':not(.resizable-false)').eq(0);
			position = e.pageX;
		});
		$tbl.find('thead:first')
		.bind('mouseup.tsresize mouseleave.tsresize', function(){
			stopResize();
		})
		// right click to reset columns to default widths
		.bind('contextmenu.tsresize', function(){
				ts.resizableReset(table);
				// $.isEmptyObject() needs jQuery 1.4+
				var rtn = $.isEmptyObject ? $.isEmptyObject(s) : s === {}; // allow right click if already reset
				s = {};
				return rtn;
		});
	},
	remove: function(table, c, wo){
		c.$table
			.removeClass('hasResizable')
			.find('thead')
			.unbind('mouseup.tsresize mouseleave.tsresize contextmenu.tsresize')
			.find('tr').children()
			.unbind('mousemove.tsresize mouseup.tsresize')
			// don't remove "tablesorter-wrapper" as uitheme uses it too
			.find('.tablesorter-resizer,.tablesorter-resizer-grip').remove();
		ts.resizableReset(table);
	}
});
ts.resizableReset = function(table){
	table.config.$headers.filter(':not(.resizable-false)').css('width','');
	if (ts.storage) { ts.storage(table, 'tablesorter-resizable', {}); }
};

// Save table sort widget
// this widget saves the last sort only if the
// saveSort widget option is true AND the
// $.tablesorter.storage function is included
// **************************
ts.addWidget({
	id: 'saveSort',
	priority: 20,
	options: {
		saveSort : true
	},
	init: function(table, thisWidget, c, wo){
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, c, wo, true);
	},
	format: function(table, c, wo, init){
		var sl, time,
			$t = c.$table,
			ss = wo.saveSort !== false, // make saveSort active/inactive; default to true
			sortList = { "sortList" : c.sortList };
		if (c.debug){
			time = new Date();
		}
		if ($t.hasClass('hasSaveSort')){
			if (ss && table.hasInitialized && ts.storage){
				ts.storage( table, 'tablesorter-savesort', sortList );
				if (c.debug){
					ts.benchmark('saveSort widget: Saving last sort: ' + c.sortList, time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			$t.addClass('hasSaveSort');
			sortList = '';
			// get data
			if (ts.storage){
				sl = ts.storage( table, 'tablesorter-savesort' );
				sortList = (sl && sl.hasOwnProperty('sortList') && $.isArray(sl.sortList)) ? sl.sortList : '';
				if (c.debug){
					ts.benchmark('saveSort: Last sort loaded: "' + sortList + '"', time);
				}
				$t.bind('saveSortReset', function(e){
					e.stopPropagation();
					ts.storage( table, 'tablesorter-savesort', '' );
				});
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0){
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0){
				// update sort change
				$t.trigger('sorton', [sortList]);
			}
		}
	},
	remove: function(table){
		// clear storage
		if (ts.storage) { ts.storage( table, 'tablesorter-savesort', '' ); }
	}
});

})(jQuery);
