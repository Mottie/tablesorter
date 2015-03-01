/* Pager widget for TableSorter 2/9/2015 (v2.19.1) - requires jQuery 1.7+ */
/*jshint browser:true, jquery:true, unused:false */
;(function($){
"use strict";
var tsp,
	ts = $.tablesorter;

ts.addWidget({
	id: "pager",
	priority: 55, // load pager after filter widget
	options : {
		// output default: '{page}/{totalPages}'
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		pager_output: '{startRow} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'

		// apply disabled classname to the pager arrows when the rows at either extreme is visible
		pager_updateArrows: true,

		// starting page of the pager (zero based index)
		pager_startPage: 0,

		// reset pager after filtering; set to desired page #
		// set to false to not change page at filter start
		pager_pageReset: 0,

		// Number of visible rows
		pager_size: 10,

		// Number of options to include in the pager number selector
		pager_maxOptionSize: 20,

		// Save pager page & size if the storage script is loaded (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
		pager_savePages: true,

		//defines custom storage key
		pager_storageKey: 'tablesorter-pager',

		// if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
		// table row set to a height to compensate; default is false
		pager_fixedHeight: false,

		// count child rows towards the set page size? (set true if it is a visible table row within the pager)
		// if true, child row(s) may not appear to be attached to its parent row, may be split across pages or
		// may distort the table if rowspan or cellspans are included.
		pager_countChildRows: false,

		// remove rows from the table to speed up the sort of large tables.
		// setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
		pager_removeRows: false, // removing rows in larger tables speeds up the sort

		// use this format: "http://mydatabase.com?page={page}&size={size}&{sortList:col}&{filterList:fcol}"
		// where {page} is replaced by the page number, {size} is replaced by the number of records to show,
		// {sortList:col} adds the sortList to the url into a "col" array, and {filterList:fcol} adds
		// the filterList to the url into an "fcol" array.
		// So a sortList = [[2,0],[3,0]] becomes "&col[2]=0&col[3]=0" in the url
		// and a filterList = [[2,Blue],[3,13]] becomes "&fcol[2]=Blue&fcol[3]=13" in the url
		pager_ajaxUrl: null,

		// modify the url after all processing has been applied
		pager_customAjaxUrl: function(table, url) { return url; },

		// modify the $.ajax object to allow complete control over your ajax requests
		pager_ajaxObject: {
			dataType: 'json'
		},

		// set this to false if you want to block ajax loading on init
		pager_processAjaxOnInit: true,

		// process ajax so that the following information is returned:
		// [ total_rows (number), rows (array of arrays), headers (array; optional) ]
		// example:
		// [
		//   100,  // total rows
		//   [
		//     [ "row1cell1", "row1cell2", ... "row1cellN" ],
		//     [ "row2cell1", "row2cell2", ... "row2cellN" ],
		//     ...
		//     [ "rowNcell1", "rowNcell2", ... "rowNcellN" ]
		//   ],
		//   [ "header1", "header2", ... "headerN" ] // optional
		// ]
		pager_ajaxProcessing: function(ajax){ return [ 0, [], null ]; },

		// css class names of pager arrows
		pager_css: {
			container   : 'tablesorter-pager',
			errorRow    : 'tablesorter-errorRow', // error information row (don't include period at beginning)
			disabled    : 'disabled'              // class added to arrows @ extremes (i.e. prev/first arrows "disabled" on first page)
		},

		// jQuery selectors
		pager_selectors: {
			container   : '.pager',       // target the pager markup
			first       : '.first',       // go to first page arrow
			prev        : '.prev',        // previous page arrow
			next        : '.next',        // next page arrow
			last        : '.last',        // go to last page arrow
			gotoPage    : '.gotoPage',    // go to page selector - select dropdown that sets the current page
			pageDisplay : '.pagedisplay', // location of where the "output" is displayed
			pageSize    : '.pagesize'     // page size selector - select dropdown that sets the "size" option
		}
	},
	init: function(table){
		tsp.init(table);
	},
	// only update to complete sorter initialization
	format: function(table, c){
		if (!(c.pager && c.pager.initialized)){
			return tsp.initComplete(table, c);
		}
		tsp.moveToPage(table, c.pager, false);
	},
	remove: function(table, c, wo, refreshing){
		tsp.destroyPager(table, c, refreshing);
	}
});

/* pager widget functions */
tsp = ts.pager = {

	init: function(table) {
		// check if tablesorter has initialized
		if (table.hasInitialized && table.config.pager.initialized) { return; }
		var t,
			c = table.config,
			wo = c.widgetOptions,
			s = wo.pager_selectors,

			// save pager variables
			p = c.pager = $.extend({
				totalPages: 0,
				filteredRows: 0,
				filteredPages: 0,
				currentFilters: [],
				page: wo.pager_startPage,
				startRow: 0,
				endRow: 0,
				ajaxCounter: 0,
				$size: null,
				last: {},
				// save original pager size
				setSize: wo.pager_size,
				setPage: wo.pager_startPage,
				events: 'filterInit filterStart filterEnd sortEnd disable enable destroy updateComplete ' +
					'pageSize pageSet pageAndSize pagerUpdate '
			}, c.pager);

		// pager initializes multiple times before table has completed initialization
		if (p.isInitializing) { return; }

		p.isInitializing = true;
		if (c.debug) {
			ts.log('Pager: Initializing');
		}

		p.size = $.data(table, 'pagerLastSize') || wo.pager_size;
		// added in case the pager is reinitialized after being destroyed.
		p.$container = $(s.container).addClass(wo.pager_css.container).show();
		// goto selector
		p.$goto = p.$container.find(s.gotoPage); // goto is a reserved word #657
		// page size selector
		p.$size = p.$container.find(s.pageSize);
		p.totalRows = c.$tbodies.eq(0).children('tr').not( wo.pager_countChildRows ? '' : '.' + c.cssChildRow ).length;
		p.oldAjaxSuccess = p.oldAjaxSuccess || wo.pager_ajaxObject.success;
		c.appender = tsp.appender;
		p.initializing = true;
		if (wo.pager_savePages && ts.storage) {
			t = ts.storage(table, wo.pager_storageKey) || {}; // fixes #387
			p.page = ( isNaN(t.page) ? p.page : t.page ) || p.setPage || 0;
			p.size = ( isNaN(t.size) ? p.size : t.size ) || p.setSize || 10;
			$.data(table, 'pagerLastSize', p.size);
		}

		// skipped rows
		p.regexRows = new RegExp('(' + (wo.filter_filteredRow || 'filtered') + '|' + c.selectorRemove.slice(1) + '|' + c.cssChildRow + ')');

		// clear initialized flag
		p.initialized = false;
		// before initialization event
		c.$table.trigger('pagerBeforeInitialized', c);

		tsp.enablePager(table, c, false);

		// p must have ajaxObject
		p.ajaxObject = wo.pager_ajaxObject; // $.extend({}, wo.pager_ajaxObject );
		p.ajaxObject.url = wo.pager_ajaxUrl;

		if ( typeof(wo.pager_ajaxUrl) === 'string' ) {
			// ajax pager; interact with database
			p.ajax = true;
			// When filtering with ajax, allow only custom filtering function, disable default filtering since it will be done server side.
			wo.filter_serversideFiltering = true;
			c.serverSideSorting = true;
			tsp.moveToPage(table, p);
		} else {
			p.ajax = false;
			// Regular pager; all rows stored in memory
			c.$table.trigger('appendCache', [{}, true]);
		}

	},

	initComplete: function(table, c){
		var p = c.pager;
		tsp.bindEvents(table, c);
		tsp.setPageSize(table, 0, c); // page size 0 is ignored

		if (!p.ajax) {
			tsp.hideRowsSetup(table, c);
		}

		// pager initialized
		p.initialized = true;
		p.initializing = false;
		p.isInitializing = false;
		if (c.debug) {
			ts.log('Pager: Triggering pagerInitialized');
		}
		c.$table.trigger('pagerInitialized', c);
		// filter widget not initialized; it will update the output display & fire off the pagerComplete event
		if ( !( c.widgetOptions.filter_initialized && ts.hasWidget(table, 'filter') ) ) {
			// if ajax, then don't fire off pagerComplete
			tsp.updatePageDisplay(table, c, !p.ajax);
		}
	},

	bindEvents: function(table, c){
		var ctrls, fxn,
			p = c.pager,
			wo = c.widgetOptions,
			s = wo.pager_selectors;

		c.$table
			.off( $.trim(p.events.split(' ').join('.pager ')) )
			.on('filterInit.pager filterStart.pager', function(e, filters) {
				p.currentFilters = $.isArray(filters) ? filters : c.$table.data('lastSearch');
				// don't change page if filters are the same (pager updating, etc)
				if (e.type === 'filterStart' && wo.pager_pageReset !== false && (c.lastCombinedFilter || '') !== (p.currentFilters || []).join('')) {
					p.page = wo.pager_pageReset; // fixes #456 & #565
				}
			})
			// update pager after filter widget completes
			.on('filterEnd.pager sortEnd.pager', function() {
				p.currentFilters = c.$table.data('lastSearch');
				if (p.initialized || p.initializing) {
					if (c.delayInit && c.rowsCopy && c.rowsCopy.length === 0) {
						// make sure we have a copy of all table rows once the cache has been built
						tsp.updateCache(table);
					}
					tsp.updatePageDisplay(table, c, false);
					// tsp.moveToPage(table, p, false); <-- called when applyWidgets is triggered
					c.$table.trigger('applyWidgets');
				}
			})
			.on('disable.pager', function(e){
				e.stopPropagation();
				tsp.showAllRows(table, c);
			})
			.on('enable.pager', function(e){
				e.stopPropagation();
				tsp.enablePager(table, c, true);
			})
			.on('destroy.pager', function(e, refreshing){
				e.stopPropagation();
				tsp.destroyPager(table, c, refreshing);
			})
			.on('updateComplete.pager', function(e, table, triggered){
				e.stopPropagation();
				// table can be unintentionally undefined in tablesorter v2.17.7 and earlier
				if (!table || triggered) { return; }
				var $rows = c.$tbodies.eq(0).children('tr').not(c.selectorRemove);
				p.totalRows = $rows.length - ( wo.pager_countChildRows ? 0 : $rows.filter('.' + c.cssChildRow).length );
				p.totalPages = Math.ceil( p.totalRows / p.size );
				if ($rows.length && c.rowsCopy && c.rowsCopy.length === 0) {
					// make a copy of all table rows once the cache has been built
					tsp.updateCache(table);
				}
				if ( p.page >= p.totalPages ) {
					tsp.moveToLastPage(table, p);
				}
				tsp.hideRows(table, c);
				tsp.changeHeight(table, c);
				// update without triggering pagerComplete
				tsp.updatePageDisplay(table, c, false);
				// make sure widgets are applied - fixes #450
				c.$table.trigger('applyWidgets');
				tsp.updatePageDisplay(table, c);
			})
			.on('pageSize.pager refreshComplete.pager', function(e,v){
				e.stopPropagation();
				tsp.setPageSize(table, parseInt(v, 10) || p.setSize || 10, c);
				tsp.hideRows(table, c);
				tsp.updatePageDisplay(table, c, false);
			})
			.on('pageSet.pager pagerUpdate.pager', function(e,v){
				e.stopPropagation();
				p.page = (parseInt(v, 10) || 1) - 1;
				// force pager refresh
				if (e.type === 'pagerUpdate') { p.last.page = true; }
				tsp.moveToPage(table, p, true);
				tsp.updatePageDisplay(table, c, false);
			})
			.on('pageAndSize.pager', function(e, page, size){
				e.stopPropagation();
				p.page = (parseInt(page, 10) || 1) - 1;
				tsp.setPageSize(table, parseInt(size, 10) || p.setSize || 10, c);
				tsp.moveToPage(table, p, true);
				tsp.hideRows(table, c);
				tsp.updatePageDisplay(table, c, false);
			});

		// clicked controls
		ctrls = [ s.first, s.prev, s.next, s.last ];
		fxn = [ 'moveToFirstPage', 'moveToPrevPage', 'moveToNextPage', 'moveToLastPage' ];
		if (c.debug && !p.$container.length) {
			ts.log('Pager: >> Container not found');
		}
		p.$container.find(ctrls.join(','))
			.attr("tabindex", 0)
			.off('click.pager')
			.on('click.pager', function(e){
				e.stopPropagation();
				var i,
					$c = $(this),
					l = ctrls.length;
				if ( !$c.hasClass(wo.pager_css.disabled) ) {
					for (i = 0; i < l; i++) {
						if ($c.is(ctrls[i])) {
							tsp[fxn[i]](table, p);
							break;
						}
					}
				}
			});

		if ( p.$goto.length ) {
			p.$goto
				.off('change.pager')
				.on('change.pager', function(){
					p.page = $(this).val() - 1;
					tsp.moveToPage(table, p, true);
					tsp.updatePageDisplay(table, c, false);
				});
		} else if (c.debug) {
			ts.log('Pager: >> Goto selector not found');
		}

		if ( p.$size.length ) {
			// setting an option as selected appears to cause issues with initial page size
			p.$size.find('option').removeAttr('selected');
			p.$size
				.off('change.pager')
				.on('change.pager', function() {
					p.$size.val( $(this).val() ); // in case there are more than one pagers
					if ( !$(this).hasClass(wo.pager_css.disabled) ) {
						tsp.setPageSize(table, parseInt( $(this).val(), 10 ), c);
						tsp.changeHeight(table, c);
					}
					return false;
				});
		} else if (c.debug) {
			ts.log('Pager: >> Size selector not found');
		}

	},

	// hide arrows at extremes
	pagerArrows: function(c, disable) {
		var p = c.pager,
			dis = !!disable,
			first = dis || p.page === 0,
			tp = Math.min( p.totalPages, p.filteredPages ),
			last = dis || p.page === tp - 1 || tp === 0,
			wo = c.widgetOptions,
			s = wo.pager_selectors;
		if ( wo.pager_updateArrows ) {
			p.$container.find(s.first + ',' + s.prev).toggleClass(wo.pager_css.disabled, first).attr('aria-disabled', first);
			p.$container.find(s.next + ',' + s.last).toggleClass(wo.pager_css.disabled, last).attr('aria-disabled', last);
		}
	},

	calcFilters: function(table, c) {
		var normalized, indx, len,
			wo = c.widgetOptions,
			p = c.pager,
			hasFilters = c.$table.hasClass('hasFilters');
		if (hasFilters && !wo.pager_ajaxUrl) {
			if ($.isEmptyObject(c.cache)) {
				// delayInit: true so nothing is in the cache
				p.filteredRows = p.totalRows = c.$tbodies.eq(0).children('tr').not( wo.pager_countChildRows ? '' : '.' + c.cssChildRow ).length;
			} else {
				p.filteredRows = 0;
				normalized = c.cache[0].normalized;
				len = normalized.length;
				for (indx = 0; indx < len; indx++) {
					p.filteredRows += p.regexRows.test(normalized[indx][c.columns].$row[0].className) ? 0 : 1;
				}
			}
		} else if (!hasFilters) {
			p.filteredRows = p.totalRows;
		}
	},

	updatePageDisplay: function(table, c, completed) {
		if ( c.pager.initializing ) { return; }
		var s, t, $out, options, indx, len,
			wo = c.widgetOptions,
			p = c.pager,
			sz = p.size || p.setSize || 10; // don't allow dividing by zero
		if (wo.pager_countChildRows) { t.push(c.cssChildRow); }
		p.$size.add(p.$goto).removeClass(wo.pager_css.disabled).removeAttr('disabled').attr('aria-disabled', 'false');
		p.totalPages = Math.ceil( p.totalRows / sz ); // needed for "pageSize" method
		c.totalRows = p.totalRows;
		tsp.calcFilters(table, c);
		c.filteredRows = p.filteredRows;
		p.filteredPages = Math.ceil( p.filteredRows / sz ) || 0;
		if ( Math.min( p.totalPages, p.filteredPages ) >= 0 ) {
			t = (p.size * p.page > p.filteredRows) && completed;
			p.page = (t) ? wo.pager_pageReset || 0 : p.page;
			p.startRow = (t) ? p.size * p.page + 1 : (p.filteredRows === 0 ? 0 : p.size * p.page + 1);
			p.endRow = Math.min( p.filteredRows, p.totalRows, p.size * ( p.page + 1 ) );
			$out = p.$container.find(wo.pager_selectors.pageDisplay);
			// form the output string (can now get a new output string from the server)
			s = ( p.ajaxData && p.ajaxData.output ? p.ajaxData.output || wo.pager_output : wo.pager_output )
				// {page} = one-based index; {page+#} = zero based index +/- value
				.replace(/\{page([\-+]\d+)?\}/gi, function(m,n){
					return p.totalPages ? p.page + (n ? parseInt(n, 10) : 1) : 0;
				})
				// {totalPages}, {extra}, {extra:0} (array) or {extra : key} (object)
				.replace(/\{\w+(\s*:\s*\w+)?\}/gi, function(m){
					var len, indx,
						str = m.replace(/[{}\s]/g,''),
						extra = str.split(':'),
						data = p.ajaxData,
						// return zero for default page/row numbers
						deflt = /(rows?|pages?)$/i.test(str) ? 0 : '';
					if (/(startRow|page)/.test(extra[0]) && extra[1] === 'input') {
						len = ('' + (extra[0] === 'page' ? p.totalPages : p.totalRows)).length;
						indx = extra[0] === 'page' ? p.page + 1 : p.startRow;
						return '<input type="text" class="ts-' + extra[0] + '" style="max-width:' + len + 'em" value="' + indx + '"/>';
					}
					return extra.length > 1 && data && data[extra[0]] ? data[extra[0]][extra[1]] : p[str] || (data ? data[str] : deflt) || deflt;
				});
			if ( p.$goto.length ) {
				t = '';
				options = tsp.buildPageSelect(p, c);
				len = options.length;
				for (indx = 0; indx < len; indx++) {
					t += '<option value="' + options[indx] + '">' + options[indx] + '</option>';
				}
				// innerHTML doesn't work in IE9 - http://support2.microsoft.com/kb/276228
				p.$goto.html(t).val( p.page + 1 );
			}
			if ($out.length) {
				$out[ ($out[0].tagName === 'INPUT') ? 'val' : 'html' ](s);
				// rebind startRow/page inputs
				$out.find('.ts-startRow, .ts-page').off('change.pager').on('change.pager', function(){
					var v = $(this).val(),
						pg = $(this).hasClass('ts-startRow') ? Math.floor( v/p.size ) + 1 : v;
					c.$table.trigger('pageSet.pager', [ pg ]);
				});
			}
		}
		tsp.pagerArrows(c);
		tsp.fixHeight(table, c);
		if (p.initialized && completed !== false) {
			if (c.debug) {
				ts.log('Pager: Triggering pagerComplete');
			}
			c.$table.trigger('pagerComplete', c);
			// save pager info to storage
			if (wo.pager_savePages && ts.storage) {
				ts.storage(table, wo.pager_storageKey, {
					page : p.page,
					size : p.size
				});
			}
		}
	},

	buildPageSelect: function(p, c) {
		// Filter the options page number link array if it's larger than 'pager_maxOptionSize'
		// as large page set links will slow the browser on large dom inserts
		var i, central_focus_size, focus_option_pages, insert_index, option_length, focus_length,
			wo = c.widgetOptions,
			pg = Math.min( p.totalPages, p.filteredPages ) || 1,
			// make skip set size multiples of 5
			skip_set_size = Math.ceil( ( pg / wo.pager_maxOptionSize ) / 5 ) * 5,
			large_collection = pg > wo.pager_maxOptionSize,
			current_page = p.page + 1,
			start_page = skip_set_size,
			end_page = pg - skip_set_size,
			option_pages = [1],
			// construct default options pages array
			option_pages_start_page = (large_collection) ? skip_set_size : 1;

		for ( i = option_pages_start_page; i <= pg; ) {
			option_pages.push(i);
			i = i + ( large_collection ? skip_set_size : 1 );
		}
		option_pages.push(pg);

		if (large_collection) {
			focus_option_pages = [];
			// don't allow central focus size to be > 5 on either side of current page
			central_focus_size = Math.max( Math.floor( wo.pager_maxOptionSize / skip_set_size ) - 1, 5 );

			start_page = current_page - central_focus_size;
			if (start_page < 1) { start_page = 1; }
			end_page = current_page + central_focus_size;
			if (end_page > pg) { end_page = pg; }
			// construct an array to get a focus set around the current page
			for (i = start_page; i <= end_page ; i++) {
				focus_option_pages.push(i);
			}

			// keep unique values
			option_pages = $.grep(option_pages, function(value, indx) {
				return $.inArray(value, option_pages) === indx;
			});

			option_length = option_pages.length;
			focus_length = focus_option_pages.length;

			// make sure at all option_pages aren't replaced
			if (option_length - focus_length > skip_set_size / 2 && option_length + focus_length > wo.pager_maxOptionSize ) {
				insert_index = Math.floor(option_length / 2) - Math.floor(focus_length / 2);
				Array.prototype.splice.apply(option_pages, [ insert_index, focus_length ]);
			}
			option_pages = option_pages.concat(focus_option_pages);

		}

		// keep unique values again
		option_pages = $.grep(option_pages, function(value, indx) {
			return $.inArray(value, option_pages) === indx;
		})
		.sort(function(a,b) { return a - b; });

		return option_pages;
	},

	fixHeight: function(table, c) {
		var d, h,
			p = c.pager,
			wo = c.widgetOptions,
			$b = c.$tbodies.eq(0);
		$b.find('tr.pagerSavedHeightSpacer').remove();
		if (wo.pager_fixedHeight && !p.isDisabled) {
			h = $.data(table, 'pagerSavedHeight');
			if (h) {
				d = h - $b.height();
				if ( d > 5 && $.data(table, 'pagerLastSize') === p.size && $b.children('tr:visible').length < p.size ) {
					$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '" style="height:' + d + 'px;"></tr>');
				}
			}
		}
	},

	changeHeight: function(table, c) {
		var h, $b = c.$tbodies.eq(0);
		$b.find('tr.pagerSavedHeightSpacer').remove();
		if (!$b.children('tr:visible').length) {
			$b.append('<tr class="pagerSavedHeightSpacer ' + c.selectorRemove.slice(1) + '"><td>&nbsp</td></tr>');
		}
		h = $b.children('tr').eq(0).height() * c.pager.size;
		$.data(table, 'pagerSavedHeight', h);
		tsp.fixHeight(table, c);
		$.data(table, 'pagerLastSize', c.pager.size);
	},

	hideRows: function(table, c){
		if (!c.widgetOptions.pager_ajaxUrl) {
			var i,
				lastIndex = 0,
				p = c.pager,
				wo = c.widgetOptions,
				rows = c.$tbodies.eq(0).children('tr'),
				l = rows.length,
				s = ( p.page * p.size ),
				e =  s + p.size,
				f = wo && wo.filter_filteredRow || 'filtered',
				last = 0, // for cache indexing
				j = 0; // size counter
			p.cacheIndex = [];
			for ( i = 0; i < l; i++ ){
				if ( !rows[i].className.match(f) ) {
					if (j === s && rows[i].className.match(c.cssChildRow)) {
						// hide child rows @ start of pager (if already visible)
						rows[i].style.display = 'none';
					} else {
						rows[i].style.display = ( j >= s && j < e ) ? '' : 'none';
						if ( last !== j && j >= s && j < e ) {
							p.cacheIndex.push(i);
							last = j;
						}
						// don't count child rows
						j += rows[i].className.match(c.cssChildRow + '|' + c.selectorRemove.slice(1)) && !wo.pager_countChildRows ? 0 : 1;
						if ( j === e && rows[i].style.display !== 'none' && rows[i].className.match(ts.css.cssHasChild) ) {
							lastIndex = i;
						}
					}
				}
			}
			// add any attached child rows to last row of pager. Fixes part of issue #396
			if ( lastIndex > 0 && rows[lastIndex].className.match(ts.css.cssHasChild) ) {
				while ( ++lastIndex < l && rows[lastIndex].className.match(c.cssChildRow) ) {
					rows[lastIndex].style.display = '';
				}
			}
		}
	},

	hideRowsSetup: function(table, c){
		var p = c.pager;
		p.size = parseInt( p.$size.val(), 10 ) || p.size || p.setSize || 10;
		$.data(table, 'pagerLastSize', p.size);
		tsp.pagerArrows(c);
		if ( !c.widgetOptions.pager_removeRows ) {
			tsp.hideRows(table, c);
			c.$table.on('sortEnd.pager filterEnd.pager', function(){
				tsp.hideRows(table, c);
			});
		}
	},

	renderAjax: function(data, table, c, xhr, exception){
		var p = c.pager,
			wo = c.widgetOptions;
		// process data
		if ( $.isFunction(wo.pager_ajaxProcessing) ) {
			// ajaxProcessing result: [ total, rows, headers ]
			var i, j, t, hsh, $f, $sh, th, d, l, rr_count,
				$t = c.$table,
				tds = '',
				result = wo.pager_ajaxProcessing(data, table, xhr) || [ 0, [] ],
				hl = $t.find('thead th').length;

			// Clean up any previous error.
			ts.showError(table);

			if ( exception ) {
				if (c.debug) {
					ts.log('Pager: >> Ajax Error', xhr, exception);
				}
				ts.showError(table, exception.message + ' (' + xhr.status + ')');
				c.$tbodies.eq(0).children('tr').detach();
				p.totalRows = 0;
			} else {
				// process ajax object
				if (!$.isArray(result)) {
					p.ajaxData = result;
					c.totalRows = p.totalRows = result.total;
					c.filteredRows = p.filteredRows = typeof result.filteredRows !== 'undefined' ? result.filteredRows : result.total;
					th = result.headers;
					d = result.rows;
				} else {
					// allow [ total, rows, headers ]  or [ rows, total, headers ]
					t = isNaN(result[0]) && !isNaN(result[1]);
					// ensure a zero returned row count doesn't fail the logical ||
					rr_count = result[t ? 1 : 0];
					p.totalRows = isNaN(rr_count) ? p.totalRows || 0 : rr_count;
					// can't set filtered rows when returning an array
					c.totalRows = c.filteredRows = p.filteredRows = p.totalRows;
					d = p.totalRows === 0 ? [""] : result[t ? 0 : 1] || []; // row data
					th = result[2]; // headers
				}
				l = d && d.length;
				if (d instanceof jQuery) {
					if (wo.pager_processAjaxOnInit) {
						// append jQuery object
						c.$tbodies.eq(0).children('tr').detach();
						c.$tbodies.eq(0).append(d);
					}
				} else if (l) {
					// build table from array
					for ( i = 0; i < l; i++ ) {
						tds += '<tr>';
						for ( j = 0; j < d[i].length; j++ ) {
							// build tbody cells; watch for data containing HTML markup - see #434
							tds += /^\s*<td/.test(d[i][j]) ? $.trim(d[i][j]) : '<td>' + d[i][j] + '</td>';
						}
						tds += '</tr>';
					}
					// add rows to first tbody
					if (wo.pager_processAjaxOnInit) {
						c.$tbodies.eq(0).html( tds );
					}
				}
				wo.pager_processAjaxOnInit = true;
				// only add new header text if the length matches
				if ( th && th.length === hl ) {
					hsh = $t.hasClass('hasStickyHeaders');
					$sh = hsh ? wo.$sticky.children('thead:first').children('tr').children() : '';
					$f = $t.find('tfoot tr:first').children();
					// don't change td headers (may contain pager)
					c.$headers.filter('th').each(function(j){
						var $t = $(this), icn;
						// add new test within the first span it finds, or just in the header
						if ( $t.find('.' + ts.css.icon).length ) {
							icn = $t.find('.' + ts.css.icon).clone(true);
							$t.find('.tablesorter-header-inner').html( th[j] ).append(icn);
							if ( hsh && $sh.length ) {
								icn = $sh.eq(j).find('.' + ts.css.icon).clone(true);
								$sh.eq(j).find('.tablesorter-header-inner').html( th[j] ).append(icn);
							}
						} else {
							$t.find('.tablesorter-header-inner').html( th[j] );
							if (hsh && $sh.length) {
								$sh.eq(j).find('.tablesorter-header-inner').html( th[j] );
							}
						}
						$f.eq(j).html( th[j] );
					});
				}
			}
			if (c.showProcessing) {
				ts.isProcessing(table); // remove loading icon
			}
			// make sure last pager settings are saved, prevents multiple server side calls with
			// the same parameters
			p.totalPages = Math.ceil( p.totalRows / ( p.size || p.setSize || 10 ) );
			p.last.totalRows = p.totalRows;
			p.last.currentFilters = p.currentFilters;
			p.last.sortList = (c.sortList || []).join(',');
			p.initializing = false;
			// update display without triggering pager complete... before updating cache
			tsp.updatePageDisplay(table, c, false);
			$t.trigger('updateCache', [function(){
				if (p.initialized) {
					// apply widgets after table has rendered & after a delay to prevent
					// multiple applyWidget blocking code from blocking this trigger
					setTimeout(function(){
						if (c.debug) {
							ts.log('Pager: Triggering pagerChange');
						}
						$t
							.trigger('applyWidgets')
							.trigger('pagerChange', p);
						tsp.updatePageDisplay(table, c);
					}, 0);
				}
			}]);
		}
		if (!p.initialized) {
			c.$table.trigger('applyWidgets');
		}
	},

	getAjax: function(table, c){
		var counter,
			url = tsp.getAjaxUrl(table, c),
			$doc = $(document),
			p = c.pager;
		if ( url !== '' ) {
			if (c.showProcessing) {
				ts.isProcessing(table, true); // show loading icon
			}
			$doc.on('ajaxError.pager', function(e, xhr, settings, exception) {
				tsp.renderAjax(null, table, c, xhr, exception);
				$doc.off('ajaxError.pager');
			});
			counter = ++p.ajaxCounter;
			p.last.ajaxUrl = url; // remember processed url
			p.ajaxObject.url = url; // from the ajaxUrl option and modified by customAjaxUrl
			p.ajaxObject.success = function(data, status, jqxhr) {
				// Refuse to process old ajax commands that were overwritten by new ones - see #443
				if (counter < p.ajaxCounter){
					return;
				}
				tsp.renderAjax(data, table, c, jqxhr);
				$doc.off('ajaxError.pager');
					if (typeof p.oldAjaxSuccess === 'function') {
						p.oldAjaxSuccess(data);
					}
			};
			if (c.debug) {
				ts.log('Pager: Ajax initialized', p.ajaxObject);
			}
			$.ajax(p.ajaxObject);
		}
	},

	getAjaxUrl: function(table, c) {
		var indx, len,
			p = c.pager,
			wo = c.widgetOptions,
			url = (wo.pager_ajaxUrl) ? wo.pager_ajaxUrl
				// allow using "{page+1}" in the url string to switch to a non-zero based index
				.replace(/\{page([\-+]\d+)?\}/, function(s,n){ return p.page + (n ? parseInt(n, 10) : 0); })
				.replace(/\{size\}/g, p.size) : '',
			sortList = c.sortList,
			filterList = p.currentFilters || $(table).data('lastSearch') || [],
			sortCol = url.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),
			filterCol = url.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),
			arry = [];
		if (sortCol) {
			sortCol = sortCol[1];
			len = sortList.length;
			for (indx = 0; indx < len; indx++) {
				arry.push(sortCol + '[' + sortList[indx][0] + ']=' + sortList[indx][1]);
			}
			// if the arry is empty, just add the col parameter... "&{sortList:col}" becomes "&col"
			url = url.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : sortCol );
			arry = [];
		}
		if (filterCol) {
			filterCol = filterCol[1];
			len = filterList.length;
			for (indx = 0; indx < len; indx++) {
				if (filterList[indx]) {
					arry.push(filterCol + '[' + indx + ']=' + encodeURIComponent(filterList[indx]));
				}
			}
			// if the arry is empty, just add the fcol parameter... "&{filterList:fcol}" becomes "&fcol"
			url = url.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : filterCol );
			p.currentFilters = filterList;
		}
		if ( $.isFunction(wo.pager_customAjaxUrl) ) {
			url = wo.pager_customAjaxUrl(table, url);
		}
		if (c.debug) {
			ts.log('Pager: Ajax url = ' + url);
		}
		return url;
	},

	renderTable: function(table, rows) {
		var $tb, index, count, added,
			c = table.config,
			p = c.pager,
			wo = c.widgetOptions,
			f = c.$table.hasClass('hasFilters'),
			l = rows && rows.length || 0, // rows may be undefined
			s = ( p.page * p.size ),
			e = p.size;
		if ( l < 1 ) {
			if (c.debug) {
				ts.log('Pager: >> No rows for pager to render');
			}
			// empty table, abort!
			return;
		}
		if ( p.page >= p.totalPages ) {
			// lets not render the table more than once
			return tsp.moveToLastPage(table, p);
		}
		p.cacheIndex = [];
		p.isDisabled = false; // needed because sorting will change the page and re-enable the pager
		if (p.initialized) {
			if (c.debug) {
				ts.log('Pager: Triggering pagerChange');
			}
			c.$table.trigger('pagerChange', c);
		}
		if ( !wo.pager_removeRows ) {
			tsp.hideRows(table, c);
		} else {
			ts.clearTableBody(table);
			$tb = ts.processTbody(table, c.$tbodies.eq(0), true);
			// not filtered, start from the calculated starting point (s)
			// if filtered, start from zero
			index = f ? 0 : s;
			count = f ? 0 : s;
			added = 0;
			while (added < e && index < rows.length) {
				if (!f || !/filtered/.test(rows[index][0].className)){
					count++;
					if (count > s && added <= e) {
						added++;
						p.cacheIndex.push(index);
						$tb.append(rows[index]);
					}
				}
				index++;
			}
			ts.processTbody(table, $tb, false);
		}
		tsp.updatePageDisplay(table, c);

		wo.pager_startPage = p.page;
		wo.pager_size = p.size;
		if (table.isUpdating) {
			if (c.debug) {
				ts.log('Pager: Triggering updateComplete');
			}
			c.$table.trigger('updateComplete', [ table, true ]);
		}

	},

	showAllRows: function(table, c){
		var p = c.pager,
			wo = c.widgetOptions;
		if ( p.ajax ) {
			tsp.pagerArrows(c, true);
		} else {
			p.isDisabled = true;
			$.data(table, 'pagerLastPage', p.page);
			$.data(table, 'pagerLastSize', p.size);
			p.page = 0;
			p.size = p.totalRows;
			p.totalPages = 1;
			c.$table
				.addClass('pagerDisabled')
				.removeAttr('aria-describedby')
				.find('tr.pagerSavedHeightSpacer').remove();
			tsp.renderTable(table, c.rowsCopy);
			c.$table.trigger('applyWidgets');
			if (c.debug) {
				ts.log('Pager: Disabled');
			}
		}
		// disable size selector
		p.$size.add(p.$goto).each(function(){
			$(this).attr('aria-disabled', 'true').addClass(wo.pager_css.disabled)[0].disabled = true;
		});
	},

	// updateCache if delayInit: true
	// this is normally done by "appendToTable" function in the tablesorter core AFTER a sort
	updateCache: function(table) {
		var c = table.config,
			p = c.pager;
		c.$table.trigger('updateCache', [ function(){
			if ( !$.isEmptyObject(table.config.cache) ) {
				var i,
					rows = [],
					n = table.config.cache[0].normalized;
				p.totalRows = n.length;
				for (i = 0; i < p.totalRows; i++) {
					rows.push(n[i][c.columns].$row);
				}
				c.rowsCopy = rows;
				tsp.moveToPage(table, p, true);
				// clear out last search to force an update
				p.last.currentFilters = [' '];
			}
		} ]);
	},

	moveToPage: function(table, p, pageMoved) {
		if ( p.isDisabled ) { return; }
		if ( pageMoved !== false && p.initialized && $.isEmptyObject(table.config.cache)) {
			return tsp.updateCache(table);
		}
		var pg, c = table.config,
			wo = c.widgetOptions,
			l = p.last;

		// abort page move if the table has filters and has not been initialized
		if (p.ajax && !wo.filter_initialized && ts.hasWidget(table, 'filter')) { return; }

		tsp.calcFilters(table, c);
		pg = Math.min( p.totalPages, p.filteredPages );
		if ( p.page < 0 ) { p.page = 0; }
		if ( p.page > ( pg - 1 ) && pg !== 0 ) { p.page = pg - 1; }

		// fixes issue where one current filter is [] and the other is ['','',''],
		// making the next if comparison think the filters as different. Fixes #202.
		l.currentFilters = (l.currentFilters || []).join('') === '' ? [] : l.currentFilters;
		p.currentFilters = (p.currentFilters || []).join('') === '' ? [] : p.currentFilters;
		// don't allow rendering multiple times on the same page/size/totalRows/filters/sorts
		if ( l.page === p.page && l.size === p.size && l.totalRows === p.totalRows &&
			(l.currentFilters || []).join(',') === (p.currentFilters || []).join(',') &&
			// check for ajax url changes see #730
			(l.ajaxUrl || '') === (p.ajaxObject.url || '') &&
			// & ajax url option changes (dynamically add/remove/rename sort & filter parameters)
			(l.optAjaxUrl || '') === (wo.pager_ajaxUrl || '') &&
			l.sortList === (c.sortList || []).join(',') ) {
				return;
			}
		if (c.debug) {
			ts.log('Pager: Changing to page ' + p.page);
		}
		p.last = {
			page : p.page,
			size : p.size,
			// fixes #408; modify sortList otherwise it auto-updates
			sortList : (c.sortList || []).join(','),
			totalRows : p.totalRows,
			currentFilters : p.currentFilters || [],
			ajaxUrl : p.ajaxObject.url || '',
			optAjaxUrl : wo.pager_ajaxUrl
		};
		if (p.ajax) {
			tsp.getAjax(table, c);
		} else if (!p.ajax) {
			tsp.renderTable(table, c.rowsCopy);
		}
		$.data(table, 'pagerLastPage', p.page);
		if (p.initialized && pageMoved !== false) {
			if (c.debug) {
				ts.log('Pager: Triggering pageMoved');
			}
			c.$table
				.trigger('pageMoved', c)
				.trigger('applyWidgets');
			if (!p.ajax && table.isUpdating) {
				if (c.debug) {
					ts.log('Pager: Triggering updateComplete');
				}
				c.$table.trigger('updateComplete', [ table, true ]);
			}
		}
	},

	setPageSize: function(table, size, c) {
		var p = c.pager;
		p.size = size || p.size || p.setSize || 10;
		p.$size.val(p.size);
		$.data(table, 'pagerLastPage', p.page);
		$.data(table, 'pagerLastSize', p.size);
		p.totalPages = Math.ceil( p.totalRows / p.size );
		p.filteredPages = Math.ceil( p.filteredRows / p.size );
		tsp.moveToPage(table, p, true);
	},

	moveToFirstPage: function(table, p) {
		p.page = 0;
		tsp.moveToPage(table, p, true);
	},

	moveToLastPage: function(table, p) {
		p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
		tsp.moveToPage(table, p, true);
	},

	moveToNextPage: function(table, p) {
		p.page++;
		if ( p.page >= ( Math.min( p.totalPages, p.filteredPages ) - 1 ) ) {
			p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
		}
		tsp.moveToPage(table, p, true);
	},

	moveToPrevPage: function(table, p) {
		p.page--;
		if ( p.page <= 0 ) {
			p.page = 0;
		}
		tsp.moveToPage(table, p, true);
	},

	destroyPager: function(table, c, refreshing){
		var p = c.pager;
		p.initialized = false;
		c.$table.off( $.trim(p.events.split(' ').join('.pager ')) );
		if (refreshing) { return; }
		tsp.showAllRows(table, c);
		p.$container.hide(); // hide pager
		c.appender = null; // remove pager appender function
		delete table.config.rowsCopy;
		if (ts.storage) {
			ts.storage(table, c.widgetOptions.pager_storageKey, '');
		}
	},

	enablePager: function(table, c, triggered){
		var info, p = c.pager;
		p.isDisabled = false;
		p.page = $.data(table, 'pagerLastPage') || p.page || 0;
		p.size = $.data(table, 'pagerLastSize') || parseInt(p.$size.find('option[selected]').val(), 10) || p.size || p.setSize || 10;
		p.$size.val(p.size); // set page size
		p.totalPages = Math.ceil( Math.min( p.totalRows, p.filteredRows ) / p.size );
		c.$table.removeClass('pagerDisabled');
		// if table id exists, include page display with aria info
		if ( table.id ) {
			info = table.id + '_pager_info';
			p.$container.find(c.widgetOptions.pager_selectors.pageDisplay).attr('id', info);
			c.$table.attr('aria-describedby', info);
		}
		tsp.changeHeight(table, c);
		if ( triggered ) {
			c.$table.trigger('updateRows');
			tsp.setPageSize(table, p.size, c);
			tsp.hideRowsSetup(table, c);
			if (c.debug) {
				ts.log('Pager: Enabled');
			}
		}
	},

	appender: function(table, rows) {
		var c = table.config,
			wo = c.widgetOptions,
			p = c.pager;
		if ( !p.ajax ) {
			c.rowsCopy = rows;
			p.totalRows = wo.pager_countChildRows ? c.$tbodies.eq(0).children('tr').length : rows.length;
			p.size = $.data(table, 'pagerLastSize') || p.size || wo.pager_size || p.setSize || 10;
			p.totalPages = Math.ceil( p.totalRows / p.size );
			tsp.moveToPage(table, p);
			// update display here in case all rows are removed
			tsp.updatePageDisplay(table, c, false);
		} else {
			tsp.moveToPage(table, p, true);
		}
	}

};

// see #486
ts.showError = function(table, message){
	$(table).each(function(){
		var $row,
			c = this.config,
			wo = c.widgetOptions,
			errorRow = c.pager && c.pager.cssErrorRow || wo.pager_css && wo.pager_css.errorRow || 'tablesorter-errorRow';
		if (c) {
			if (typeof message === 'undefined') {
				c.$table.find('thead').find(c.selectorRemove).remove();
			} else {
				$row = ( /tr\>/.test(message) ? $(message) : $('<tr><td colspan="' + c.columns + '">' + message + '</td></tr>') )
					.click(function(){
						$(this).remove();
					})
					// add error row to thead instead of tbody, or clicking on the header will result in a parser error
					.appendTo( c.$table.find('thead:first') )
					.addClass( errorRow + ' ' + c.selectorRemove.slice(1) )
					.attr({
						role : 'alert',
						'aria-live' : 'assertive'
					});
			}
		}
	});
};

})(jQuery);
