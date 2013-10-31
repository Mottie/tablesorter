/* Pager widget (beta) for TableSorter 10/30/2013 */
/*jshint browser:true, jquery:true, unused:false */
;(function($){
"use strict";
var tsp,
	ts = $.tablesorter;

ts.addWidget({
	id: "pager",
	priority: 5,
	options : {
		// output default: '{page}/{totalPages}'
		// possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
		pager_output: '{startRow} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'

		// apply disabled classname to the pager arrows when the rows at either extreme is visible
		pager_updateArrows: true,

		// starting page of the pager (zero based index)
		pager_startPage: 0,

		// Number of visible rows
		pager_size: 10,

		// Save pager page & size if the storage script is loaded (requires $.tablesorter.storage in jquery.tablesorter.widgets.js)
		pager_savePages: true,

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
			goto        : '.gotoPage',    // go to page selector - select dropdown that sets the current page
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
	remove: function(table, c, wo){
		tsp.destroyPager(table, c);
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
				size: wo.pager_size,
				startRow: 0,
				endRow: 0,
				$size: null,
				last: {}
			}, c.pager);

		// added in case the pager is reinitialized after being destroyed.
		p.$container = $(s.container).addClass(wo.pager_css.container).show();
		// goto selector
		p.$goto = p.$container.find(s.goto);
		// page size selector
		p.$size = p.$container.find(s.pageSize);

		p.totalRows = c.$tbodies.eq(0).children().length;

		p.oldAjaxSuccess = p.oldAjaxSuccess || wo.pager_ajaxObject.success;
		c.appender = tsp.appender;

		if (wo.pager_savePages && ts.storage) {
			t = ts.storage(table, 'tablesorter-pager') || {}; // fixes #387
			p.page = isNaN(t.page) ? p.page : t.page;
			p.size = ( isNaN(t.size) ? p.size : t.size ) || 10;
		}

		// clear initialized flag
		p.initialized = false;
		// before initialization event
		c.$table.trigger('pagerBeforeInitialized', c);

		tsp.enablePager(table, c, false);

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
			c.$table.trigger("appendCache", true);
			tsp.hideRowsSetup(table, c);
		}

	},

	initComplete: function(table, c){
		var p = c.pager;
		tsp.changeHeight(table, c);

		tsp.bindEvents(table, c);

		// pager initialized
		if (!p.ajax) {
			p.initialized = true;
			tsp.setPageSize(table, 0, c); // page size 0 is ignored
			c.$table.trigger('pagerInitialized', c);
		}

	},

	bindEvents: function(table, c){
		var ctrls, fxn,
			p = c.pager,
			wo = c.widgetOptions,
			s = wo.pager_selectors;

		c.$table
			.unbind('filterStart filterEnd sortEnd disable enable destroy update pageSize '.split(' ').join('.pager '))
			.bind('filterStart.pager', function(e, filters) {
				$.data(table, 'pagerUpdateTriggered', false);
				p.currentFilters = filters;
			})
			// update pager after filter widget completes
			.bind('filterEnd.pager sortEnd.pager', function(e) {
				//Prevent infinite event loops from occuring by setting this in all moveToPage calls and catching it here.
				if ($.data(table, 'pagerUpdateTriggered')) {
					$.data(table, 'pagerUpdateTriggered', false);
					return;
				}
				//only run the server side sorting if it has been enabled
				if (e.type === "filterEnd" || (e.type === "sortEnd" && c.serverSideSorting)) {
					tsp.moveToPage(table, p, false);
				}
				tsp.updatePageDisplay(table, c, false);
				tsp.fixHeight(table, c);
			})
			.bind('disable.pager', function(e){
				e.stopPropagation();
				tsp.showAllRows(table, c);
			})
			.on('enable.pager', function(e){
				e.stopPropagation();
				tsp.enablePager(table, c, true);
			})
			.on('destroy.pager', function(e){
				e.stopPropagation();
				tsp.destroyPager(table, c);
			})
			.on('update.pager', function(e){
				e.stopPropagation();
				tsp.hideRows(table, c);
			})
			.on('pageSize.pager', function(e,v){
				e.stopPropagation();
				tsp.setPageSize(table, parseInt(v, 10) || 10, c);
				tsp.hideRows(table, c);
				tsp.updatePageDisplay(table, c, false);
				if (p.$size.length) { p.$size.val(p.size); } // twice?
			})
			.on('pageSet.pager', function(e,v){
				e.stopPropagation();
				p.page = (parseInt(v, 10) || 1) - 1;
				if (p.$goto.length) { p.$goto.val(c.size); } // twice?
				tsp.moveToPage(table, p);
				tsp.updatePageDisplay(table, c, false);
			});

		// clicked controls
		ctrls = [ s.first, s.prev, s.next, s.last ];
		fxn = [ 'moveToFirstPage', 'moveToPrevPage', 'moveToNextPage', 'moveToLastPage' ];
		p.$container.find(ctrls.join(','))
			.unbind('click.pager')
			.bind('click.pager', function(){
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
				return false;
			});

		if ( p.$goto.length ) {
			p.$goto
				.unbind('change')
				.bind('change', function(){
					p.page = $(this).val() - 1;
					tsp.moveToPage(table, p);
					tsp.updatePageDisplay(table, c, false);
				});
		}

		if ( p.$size.length ) {
			p.$size
				.unbind('change.pager')
				.bind('change.pager', function() {
					p.$size.val( $(this).val() ); // in case there are more than one pagers
					if ( !$(this).hasClass(wo.pager_css.disabled) ) {
						tsp.setPageSize(table, parseInt( $(this).val(), 10 ), c);
						tsp.changeHeight(table, c);
					}
					return false;
				});
		}

	},

	// hide arrows at extremes
	pagerArrows: function(c, disable) {
		var p = c.pager,
			dis = !!disable,
			wo = c.widgetOptions,
			s = wo.pager_selectors,
			tp = Math.min( p.totalPages, p.filteredPages );
		if ( wo.pager_updateArrows ) {
			p.$container.find(s.first + ',' + s.prev).toggleClass(wo.pager_css.disabled, dis || p.page === 0);
			p.$container.find(s.next + ',' + s.last).toggleClass(wo.pager_css.disabled, dis || p.page === tp - 1);
		}
	},

	updatePageDisplay: function(table, c, flag) {
		var i, pg, s, t, out,
			wo = c.widgetOptions,
			p = c.pager,
			f = c.$table.hasClass('hasFilters') && !wo.pager_ajaxUrl,
			t = (c.widgetOptions && c.widgetOptions.filter_filteredRow || 'filtered') + ',' + c.selectorRemove,
			sz = p.size || 10; // don't allow dividing by zero
		p.$size.removeClass(wo.pager_css.disabled).removeAttr('disabled');
		p.$goto.removeClass(wo.pager_css.disabled).removeAttr('disabled');
		p.totalPages = Math.ceil( p.totalRows / sz ); // needed for "pageSize" method
		p.filteredRows = (f) ? c.$tbodies.eq(0).children('tr:not(.' + t + ')').length : p.totalRows;
		p.filteredPages = (f) ? Math.ceil( p.filteredRows / sz ) || 1 : p.totalPages;
		if ( Math.min( p.totalPages, p.filteredPages ) >= 0 ) {
			t = (p.size * p.page > p.filteredRows);
			p.startRow = (t) ? 1 : (p.filteredRows === 0 ? 0 : p.size * p.page + 1);
			p.page = (t) ? 0 : p.page;
			p.endRow = Math.min( p.filteredRows, p.totalRows, p.size * ( p.page + 1 ) );
			out = p.$container.find(wo.pager_selectors.pageDisplay);
			// form the output string (can now get a new output string from the server)
			s = ( p.ajaxData && p.ajaxData.output ? p.ajaxData.output || wo.pager_output : wo.pager_output )
				// {page} = one-based index; {page+#} = zero based index +/- value
				.replace(/\{page([\-+]\d+)?\}/gi, function(m,n){
					return p.page + (n ? parseInt(n, 10) : 1);
				})
				// {totalPages}, {extra}, {extra:0} (array) or {extra : key} (object)
				.replace(/\{\w+(\s*:\s*\w+)?\}/gi, function(m){
					var t = m.replace(/[{}\s]/g,''), a = t.split(':'), d = p.ajaxData;
					return a.length > 1 && d && d[a[0]] ? d[a[0]][a[1]] : p[t] || (d ? d[t] : '') || '';
				});
			if (out.length) {
				out[ (out[0].tagName === 'INPUT') ? 'val' : 'html' ](s);
				if ( p.$goto.length ) {
					t = '';
					pg = Math.min( p.totalPages, p.filteredPages );
					for ( i = 1; i <= pg; i++ ) {
						t += '<option>' + i + '</option>';
					}
					p.$goto.html(t).val( p.page + 1 );
				}
			}
		}
		tsp.pagerArrows(c);
		if (p.initialized && flag !== false) {
			c.$table.trigger('pagerComplete', c);
			// save pager info to storage
			if (wo.pager_savePages && ts.storage) {
				ts.storage(table, 'tablesorter-pager', {
					page : p.page,
					size : p.size
				});
			}
		}
	},

	fixHeight: function(table, c) {
		var d, h,
			p = c.pager,
			wo = c.widgetOptions,
			$b = c.$tbodies.eq(0);
		if (wo.pager_fixedHeight) {
			$b.find('tr.pagerSavedHeightSpacer').remove();
			h = $.data(table, 'pagerSavedHeight');
			if (h) {
				d = h - $b.height();
				if ( d > 5 && $.data(table, 'pagerLastSize') === p.size && $b.children('tr:visible').length < p.size ) {
					$b.append('<tr class="pagerSavedHeightSpacer ' + wo.pager_selectors.remove.replace(/(tr)?\./g,'') + '" style="height:' + d + 'px;"></tr>');
				}
			}
		}
	},

	changeHeight: function(table, c) {
		var $b = c.$tbodies.eq(0);
		$b.find('tr.pagerSavedHeightSpacer').remove();
		$.data(table, 'pagerSavedHeight', $b.height());
		tsp.fixHeight(table, c);
		$.data(table, 'pagerLastSize', c.pager.size);
	},

	hideRows: function(table, c){
		if (!c.widgetOptions.pager_ajaxUrl) {
			var i,
				p = c.pager,
				wo = c.widgetOptions,
				rows = c.$tbodies.eq(0).children(),
				l = rows.length,
				s = ( p.page * p.size ),
				e =  s + p.size,
				f = wo && wo.filter_filteredRow || 'filtered',
				j = 0; // size counter
			for ( i = 0; i < l; i++ ){
				if ( !rows[i].className.match(f) ) {
					rows[i].style.display = ( j >= s && j < e ) ? '' : 'none';
					// don't count child rows
					j += rows[i].className.match(c.cssChildRow + '|' + c.selectorRemove.slice(1)) && !wo.pager_countChildRows ? 0 : 1;
				}
			}
		}
	},

	hideRowsSetup: function(table, c){
		var p = c.pager;
		p.size = parseInt( p.$size.val(), 10 ) || p.size;
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
			var i, j, t, hsh, $f, $sh, th, d, l, $err, rr_count,
				$t = c.$table,
				tds = '',
				result = wo.pager_ajaxProcessing(data, table) || [ 0, [] ],
				hl = $t.find('thead th').length;

			$t.find('thead tr.' + wo.pager_css.errorRow).remove(); // Clean up any previous error.

			if ( exception ) {
				$err = $('<tr class="' + wo.pager_css.errorRow + '"><td style="text-align:center;" colspan="' +
					hl + '">' + exception.message + ' (' + xhr.status + ')</td></tr>')
				.click(function(){
					$(this).remove();
				})
				// add error row to thead instead of tbody, or clicking on the header will result in a parser error
				.appendTo( $t.find('thead:first') );
				c.$tbodies.eq(0).empty();
				if (c.debug) { ts.log({ 'exception' : exception, 'jqxhr' : xhr }); }
			} else {
				// process ajax object
				if (!$.isArray(result)) {
					p.ajaxData = result;
					p.totalRows = result.total;
					th = result.headers;
					d = result.rows;
				} else {
					// allow [ total, rows, headers ]  or [ rows, total, headers ]
					t = isNaN(result[0]) && !isNaN(result[1]);
					//ensure a zero returned row count doesn't fail the logical ||
					rr_count = result[t ? 1 : 0];
					p.totalRows = isNaN(rr_count) ? p.totalRows || 0 : rr_count;
					d = result[t ? 0 : 1] || []; // row data
					th = result[2]; // headers
				}
				l = d.length;
				if (d instanceof jQuery) {
					// append jQuery object
					c.$tbodies.eq(0).empty().append(d);
				} else if (d.length) {
					// build table from array
					if ( l > 0 ) {
						for ( i = 0; i < l; i++ ) {
							tds += '<tr>';
							for ( j = 0; j < d[i].length; j++ ) {
								// build tbody cells
								tds += '<td>' + d[i][j] + '</td>';
							}
							tds += '</tr>';
						}
					}
					// add rows to first tbody
					c.$tbodies.eq(0).html( tds );
				}
				// only add new header text if the length matches
				if ( th && th.length === hl ) {
					hsh = $t.hasClass('hasStickyHeaders');
					$sh = hsh ? c.$sticky.children('thead:first').children().children() : '';
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
			p.totalPages = Math.ceil( p.totalRows / ( p.size || 10 ) );
			tsp.updatePageDisplay(table, c);
			tsp.fixHeight(table, c);
			if (p.initialized) {
				$t.trigger('pagerChange', c);
				$t.trigger('updateComplete');
			} else {
				$t.trigger('update');
			}
		}
		if (!p.initialized) {
			p.initialized = true;
			c.$table.trigger('pagerInitialized', c);
		}
	},

	getAjax: function(table, c){
		var url = tsp.getAjaxUrl(table, c),
		$doc = $(document),
		wo = c.widgetOptions,
		p = c.pager;
		if ( url !== '' ) {
			if (c.showProcessing) {
				ts.isProcessing(table, true); // show loading icon
			}
			$doc.on('ajaxError.pager', function(e, xhr, settings, exception) {
				tsp.renderAjax(null, table, c, xhr, exception);
				$doc.unbind('ajaxError.pager');
			});
			wo.pager_ajaxObject.url = url; // from the ajaxUrl option and modified by customAjaxUrl
			wo.pager_ajaxObject.success = function(data) {
				tsp.renderAjax(data, table, c);
				$doc.unbind('ajaxError.pager');
				if (typeof p.oldAjaxSuccess === 'function') {
					p.oldAjaxSuccess(data);
				}
			};
			$.ajax(wo.pager_ajaxObject);
		}
	},

	getAjaxUrl: function(table, c) {
		var p = c.pager,
			wo = c.widgetOptions,
			url = (wo.pager_ajaxUrl) ? wo.pager_ajaxUrl
				// allow using "{page+1}" in the url string to switch to a non-zero based index
				.replace(/\{page([\-+]\d+)?\}/, function(s,n){ return p.page + (n ? parseInt(n, 10) : 0); })
				.replace(/\{size\}/g, p.size) : '',
			sl = c.sortList,
			fl = p.currentFilters || [],
			sortCol = url.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),
			filterCol = url.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),
			arry = [];
		if (sortCol) {
			sortCol = sortCol[1];
			$.each(sl, function(i,v){
				arry.push(sortCol + '[' + v[0] + ']=' + v[1]);
			});
			// if the arry is empty, just add the col parameter... "&{sortList:col}" becomes "&col"
			url = url.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : sortCol );
			arry = [];
		}
		if (filterCol) {
			filterCol = filterCol[1];
			$.each(fl, function(i,v){
				if (v) {
					arry.push(filterCol + '[' + i + ']=' + encodeURIComponent(v));
				}
			});
			// if the arry is empty, just add the fcol parameter... "&{filterList:fcol}" becomes "&fcol"
			url = url.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g, arry.length ? arry.join('&') : filterCol );
		}
		if ( $.isFunction(wo.pager_customAjaxUrl) ) {
			url = wo.pager_customAjaxUrl(table, url);
		}
		return url;
	},

	renderTable: function(table, rows) {
		var i, $tb,
			c = table.config,
			p = c.pager,
			wo = c.widgetOptions,
			l = rows && rows.length || 0, // rows may be undefined
			s = ( p.page * p.size ),
			e = ( s + p.size );
		if ( l < 1 ) { return; } // empty table, abort!
		if ( p.page >= p.totalPages ) {
			// lets not render the table more than once
			return tsp.moveToLastPage(table, p);
		}
		p.isDisabled = false; // needed because sorting will change the page and re-enable the pager
		if (p.initialized) { c.$table.trigger('pagerChange', c); }

		if ( !wo.pager_removeRows ) {
			tsp.hideRows(table, c);
		} else {
			if ( e > rows.length ) {
				e = rows.length;
			}
			ts.clearTableBody(table);
			$tb = ts.processTbody(table, c.$tbodies.eq(0), true);
			for ( i = s; i < e; i++ ) {
				$tb.append(rows[i]);
			}
			ts.processTbody(table, $tb, false);
		}

		tsp.updatePageDisplay(table, c);
		if ( !p.isDisabled ) { tsp.fixHeight(table, c); }

		wo.pager_startPage = p.page;
		wo.pager_size = p.size;

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
			c.$table.addClass('pagerDisabled').find('tr.pagerSavedHeightSpacer').remove();
			tsp.renderTable(table, c.rowsCopy);
		}
		// disable size selector
		p.$size.add(p.$goto).each(function(){
			$(this).addClass(wo.pager_css.disabled).attr('disabled', 'disabled');
		});
		c.$table.trigger('applyWidgets');
	},

	moveToPage: function(table, p, flag) {
		if ( p.isDisabled ) { return; }
		var c = table.config,
			l = p.last,
			pg = Math.min( p.totalPages, p.filteredPages );
		if ( p.page < 0 ) { p.page = 0; }
		if ( p.page > ( pg - 1 ) && pg !== 0 ) { p.page = pg - 1; }
		// don't allow rendering multiple times on the same page/size/totalpages/filters
		if (l.page === p.page && l.size === p.size && l.total === p.totalPages && l.filters === p.currentFilters ) { return; }
		p.last = {
			page : p.page,
			size : p.size,
			totalPages : p.totalPages,
			currentFilters : p.currentFilters
		};
		if (p.ajax) {
			tsp.getAjax(table, c);
		} else if (!p.ajax) {
			tsp.renderTable(table, c.rowsCopy);
		}
		$.data(table, 'pagerLastPage', p.page);
		$.data(table, 'pagerUpdateTriggered', true);
		if (p.initialized && flag !== false) {
			c.$table.trigger('pageMoved', c);
			c.$table.trigger('applyWidgets');
		}
	},

	setPageSize: function(table, size, c) {
		var p = c.pager;
		p.size = size;
		p.$size.val(size);
		$.data(table, 'pagerLastPage', p.page);
		$.data(table, 'pagerLastSize', p.size);
		p.totalPages = Math.ceil( p.totalRows / ( p.size || 10 ) );
		tsp.moveToPage(table, p);
	},

	moveToFirstPage: function(table, p) {
		p.page = 0;
		tsp.moveToPage(table, p);
	},

	moveToLastPage: function(table, p) {
		p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
		tsp.moveToPage(table, p);
	},

	moveToNextPage: function(table, p) {
		p.page++;
		if ( p.page >= ( Math.min( p.totalPages, p.filteredPages ) - 1 ) ) {
			p.page = ( Math.min( p.totalPages, p.filteredPages ) - 1 );
		}
		tsp.moveToPage(table, p);
	},

	moveToPrevPage: function(table, p) {
		p.page--;
		if ( p.page <= 0 ) {
			p.page = 0;
		}
		tsp.moveToPage(table, p);
	},

	destroyPager: function(table, c){
		var p = c.pager;
		tsp.showAllRows(table, c);
		p.$container.hide(); // hide pager
		c.appender = null; // remove pager appender function
		p.initialized = false;
		c.$table.unbind('destroy.pager sortEnd.pager filterEnd.pager enable.pager disable.pager');
		if (ts.storage) {
			ts.storage(table, 'tablesorter-pager', '');
		}
	},

	enablePager: function(table, c, triggered){
		var p = c.pager,
			wo = c.widgetOptions;
		p.isDisabled = false;
		p.page = $.data(table, 'pagerLastPage') || p.page || 0;
		p.size = $.data(table, 'pagerLastSize') || parseInt(p.$size.find('option[selected]').val(), 10) || p.size;
		p.$size.val(p.size); // set page size
		p.totalPages = Math.ceil( Math.min( p.totalPages, p.filteredPages ) / ( p.size || 10 ) );
		c.$table.removeClass('pagerDisabled');
		if ( triggered ) {
			c.$table.trigger('update');
			tsp.setPageSize(table, p.size, c);
			tsp.hideRowsSetup(table, c);
			tsp.fixHeight(table, c);
		}
	},

	appender: function(table, rows) {
		var p = table.config.pager;
		if ( !p.ajax ) {
			table.config.rowsCopy = rows;
			p.totalRows = rows.length;
			p.size = $.data(table, 'pagerLastSize') || p.size;
			p.totalPages = Math.ceil( p.totalRows / ( p.size || 10 ) );
			tsp.moveToPage(table, p);
			// tsp.renderTable(table, rows);
		}
	}

};

})(jQuery);
