/* TableSorter 2.0 Widgets - updated 2/27/2012
 *
 * jQuery UI Theme
 * Column Styles
 * Column Filters
 * Sticky Header
 * Column Resizing
 * Save Sort
 *
 */
(function($){

// Add jQuery UI theme widget
// **************************
$.tablesorter.addWidget({
	id: "uitheme",
	format: function(table) {
		var time, klass, rmv, $t, t, c = table.config, $table = $(table),
		// ["up/down arrow (cssHeaders, unsorted)", "down arrow (cssDesc, descending)", "up arrow (cssAsc, ascending)" ]
		icons = ["ui-icon-arrowthick-2-n-s", "ui-icon-arrowthick-1-s", "ui-icon-arrowthick-1-n"];
		if (c.widgetUitheme && c.widgetUitheme.hasOwnProperty('css')) { icons = c.widgetUitheme.css || icons; }
		rmv = icons.join(' ');
		if (c.debug) {
			time = new Date();
		}
		if (!$table.is('.ui-theme')) {
			$table.addClass('ui-widget ui-widget-content ui-corner-all ui-theme');
			$.each(c.headerList, function(){
				$(this)
				// using "ui-theme" class in case the user adds their own ui-icon using onRenderHeader
				.addClass('ui-widget-header ui-corner-all ui-state-default')
				.append('<span class="ui-icon"/>')
				.wrapInner('<div class="inner"/>')
				.hover(function(){
					$(this).addClass('ui-state-hover');
				}, function(){
					$(this).removeClass('ui-state-hover');
				});
			});
		}
		$.each(c.headerList, function(i){
			$t = $(this);
			if (this.sortDisabled) {
				// no sort arrows for disabled columns!
				$t.find('span.ui-icon').removeClass(rmv + ' ui-icon');
			} else {
				klass = ($t.hasClass(c.cssAsc)) ? icons[1] : ($t.hasClass(c.cssDesc)) ? icons[2] : $t.hasClass(c.cssHeader) ? icons[0] : '';
				t = ($table.hasClass('hasStickyHeaders')) ? $table.find('tr.stickyHeader').find('th').eq(i).add($t) : $t;
				t[klass === icons[0] ? 'removeClass' : 'addClass']('ui-state-active')
					.find('span.ui-icon').removeClass(rmv).addClass(klass);
			}
		});
		if (c.debug) {
			$.tablesorter.benchmark("Applying uitheme widget", time);
		}
	}
});

// Add Column styles widget
// **************************
$.tablesorter.addWidget({
	id: "columns",
	format: function(table) {
		var $td, time, i, last, rmv,
		c = table.config,
		list = c.sortList,
		len = list.length,
		css = [ "primary", "secondary", "tertiary" ];
		if (c.widgetColumns && c.widgetColumns.hasOwnProperty('css')) { css = c.widgetColumns.css || css; }
		last = css.length-1;
		rmv = css.join(' ');
		if (c.debug) {
			time = new Date();
		}
		// check if there is a sort (on initialization there may not be one)
		if (list && list[0]) {
			// loop through the visible rows
			$("tr:visible", table.tBodies[0]).each(function (i) {
				$td = $(this).children().removeClass(rmv);
				// primary sort column class
				$td.eq(list[0][0]).addClass(css[0]);
				if (len > 1) {
					for (i=1; i<len; i++){
						// secondary, tertiary, etc sort column classes
						$td.eq(list[i][0]).addClass( css[i] || css[last] );
					}
				}
			});
		} else {
			// remove all column classes if sort is cleared (sortReset)
			$("td", table.tBodies[0]).removeClass(rmv);
		}
		if (c.debug) {
			$.tablesorter.benchmark("Applying Columns widget", time);
		}
	}
});

// Add Filter widget
// **************************
$.tablesorter.addWidget({
	id: "filter",
	format: function(table) {
		if (!table.config.filtering) {
			var i, v, r, t, cr, icr, $td, c = table.config,
				cols = c.headerList.length,
				tbl = $(table),
				fr = '<tr class="filters">',
				time;
			if (c.debug) {
				time = new Date();
			}
			for (i=0; i < cols; i++){
				fr += '<td><input type="search" data-col="' + i + '" class="filter';
				// use header option - headers: { 1: { filter: false } } OR add class="filter-false"
				fr += ((c.headers[i] && c.headers[i].hasOwnProperty('filter') && c.headers[i].filter === false) || $(c.headerList[i]).is('.filter-false') ) ? ' disabled" disabled' : '"';
				fr += '></td>';
			}
			tbl
				.find('thead').append(fr += '</tr>')
				.find('.filter').bind('keyup search', function(e){
					v = tbl.find('.filter').map(function(){ return ($(this).val() || '').toLowerCase(); }).get();
					if (v.join('') === '') {
						tbl.find('tr').show();
					} else {
						tbl.find('tbody').find('tr:not(.expand-child)').each(function(){
							r = true;
							cr = $(this).nextUntil('tr:not(.expand-child)');
							// so, if icr (table.config.widgetFilterChildRows) is true and there is
							// a match anywhere in the child row, then it will make the row visible
							// checked here so the option can be changed dynamically
							t = (cr.length && (typeof c.widgetFilterChildRows !== 'undefined' ? c.widgetFilterChildRows : true)) ? cr.text() : '';
							$td = $(this).find('td');
							for (i=0; i < cols; i++){
								if (v[i] !== '' && ($td.eq(i).text() + t).toLowerCase().indexOf(v[i]) >= 0) {
									r = (r) ? true : false;
								} else if (v[i] !== '') {
									r = false;
								}
							}
							$(this)[r ? 'show' : 'hide']();
							if (cr.length) { cr[r ? 'show' : 'hide'](); }
						});
					}
					tbl.trigger('applyWidgets'); // make sure zebra widget is applied
				});
			c.filtering = true;
			if (c.debug) {
				$.tablesorter.benchmark("Applying Filter widget", time);
			}
		}
	}
});

// Sticky header widget
// based on this awesome article:
// http://css-tricks.com/13465-persistent-headers/
// **************************
$.tablesorter.addWidget({
	id: "stickyHeaders",
	format: function(table) {
		if ($(table).hasClass('hasStickyHeaders')) { return; }
		var $table = $(table).addClass('hasStickyHeaders'),
			win = $(window),
			header = $(table).find('thead'),
			hdrCells = header.find('tr').children(),
			firstCell = hdrCells.eq(0),
			brdr = parseInt(hdrCells.eq(0).css('border-left-width'),10),
			sticky = header.find('tr:not(.filters)').clone()
				.addClass('stickyHeader')
				.css({
					width      : header.outerWidth() + brdr * 2,
					position   : 'fixed',
					left       : firstCell.offset().left,
					marginLeft : -brdr,
					top        : 0,
					visibility : 'hidden',
					zIndex     : 10
				}),
			stkyCells = sticky.children(),
			laststate;
		// update sticky header class names to match real header
		$table.bind('sortEnd', function(e,t){
			var th = $(t).find('thead tr'),
				sh = th.filter('.stickyHeader').children();
			th.filter(':not(.stickyHeader)').children().each(function(i){
				sh.eq(i).attr('class', $(this).attr('class'));
			});
		}).bind('pagerComplete', function(){
			win.resize(); // trigger window resize to make sure column widths & position are correct
		});
		// set sticky header cell width and link clicks to real header
		hdrCells.each(function(i){
			var t = $(this),
			s = stkyCells.eq(i)
			// set cell widths
			.width( t.width() )
			// clicking on sticky will trigger sort
			.bind('click', function(e){
				t.trigger(e);
			})
			// prevent sticky header text selection
			.bind('mousedown', function(){
				this.onselectstart = function(){ return false; };
				return false;
			});
		});
		header.prepend( sticky );
		// make it sticky!
		win
			.scroll(function(){
				var offset = firstCell.offset(),
					sTop = win.scrollTop(),
					vis = ((sTop > offset.top) && (sTop < offset.top + $table.find('tbody').height())) ? 'visible' : 'hidden';
				sticky.css({
					left : offset.left - win.scrollLeft(),
					visibility : vis
				});
				if (vis !== laststate) {
					// trigger resize to make sure the column widths match
					win.resize();
					laststate = vis;
				}
			})
			.resize(function(){
				sticky.css({
					left : firstCell.offset().left - win.scrollLeft(),
					width: header.outerWidth() + brdr * 2
				});
				stkyCells.each(function(i){
					$(this).width( hdrCells.eq(i).width() );
				});
			});
	}
});

// Add Column resizing widget
// **************************
$.tablesorter.addWidget({
	id: "resizable",
	format: function(table) {
		if (!table.config.resizable) {
			var i, w, c = table.config,
				cols = c.headerList,
				len = cols.length,
				stopResize = function(){
					c.resizable_position = 0;
					c.resizable_target = null;
					$(window).trigger('resize'); // will update stickyHeaders, just in case
				};
			c.resizable_target = null;
			c.resizable_position = 0;
			for (i=1; i < len; i++){
				$(cols[i])
					.append('<div class="resizer" style="cursor:w-resize;position:absolute;height:100%;width:20px;left:-20px;top:0;z-index:1;"></div>')
					.wrapInner('<div style="position:relative;height:100%;width:100%"></div>')
					.find('.resizer')
					.bind('mousedown', function(e){
						// save header cell and mouse position
						c.resizable_target = $(e.target).closest('th');
						c.resizable_position = e.pageX;
					}).end()
					.bind('mousemove', function(e){
						// ignore mousemove if no mousedown
						if (c.resizable_position === 0 || typeof(c.resizable_target) === null) { return; }
						var w = e.pageX - c.resizable_position,
							n = c.resizable_target.closest('th').prev();
						// make sure
						if ( c.resizable_target.width() < -w || ( n && n.width() <= w )) { return; }
						// resize current column
						n.width( n.width() + w );
						c.resizable_position = e.pageX;
					})
					.bind('mouseup', function(){
						stopResize();
						return false;
					});
			}
			$(table).find('thead').bind('mouseup mouseleave', function(){
				stopResize();
			});
			c.resizable = true;
		}
	}
});

// Save table sort widget
// store last sort in local storage, with a cookie fallback
// IE7 needs JSON library for JSON.stringify - see link below
// **************************
$.tablesorter.addWidget({
	id: 'saveSort',
	init: function(table, allWidgets, thisWidget){
		// run widget format before all other widgets are applied to the table
		thisWidget.format(table, true);
	},
	format: function(table, init) {
		var n, d, k, ls, time, c = table.config,
			// older browsers don't support JSON.stringify (http://caniuse.com/#search=json)
			// if you need it, then include https://github.com/douglascrockford/JSON-js
			sortList = '{"sortList":' + JSON.stringify(c.sortList) + '}';
		if (c.debug) {
			time = new Date();
		}
		if (c.widgetsavesort){
			if (table.hasInitialized) {
				n = 'tablesorter' + (c.tableIndex || 0) + table.id;
				// save table sort
				if (c.hasLocalStorage) {
					localStorage[n] = sortList; // local storage
				} else {
					d = new Date();
					d.setTime(d.getTime()+(31536e+6)); // 365 days
					document.cookie = n + '=' + sortList + '; expires=' + d.toGMTString() + '; path=/';
				}
				if (c.debug) {
					$.tablesorter.benchmark('saveSort: Saving sort to "' + n + '" in ' + (c.hasLocalStorage ? 'local storage' : 'a cookie'), time);
				}
			}
		} else {
			// set table sort on initial run of the widget
			c.widgetsavesort = true;
			c.hasLocalStorage = false;
			// check for local storage - from Modernzr
			try { if (localStorage.getItem) { c.hasLocalStorage = true; } } catch(e) {}
			// save table index; in case there is more than one table on the page
			c.tableIndex = $('.tablesorter').index($(table));
			// make sure we use a unique table key; use index in case table.id = ""
			n = 'tablesorter' + (c.tableIndex || 0) + table.id;
			// get data
			if (c.hasLocalStorage) {
				ls = localStorage[n]; // local storage
			} else {
				k = document.cookie.split(/[;\s|=]/); // cookie
				d = $.inArray(n, k) + 1; // add one to get from the key to the value
				ls = (d !== 0) ? k[d] : '';
			}
			// parse data
			try { ls = $.parseJSON(ls); } catch(e) { ls = ''; }
			sortList = (ls && ls.hasOwnProperty('sortList') && $.isArray(ls.sortList)) ? ls.sortList : '';
			if (c.debug) {
				$.tablesorter.benchmark('saveSort: Last sort for "' + n + '" obtained from ' + (c.hasLocalStorage ? 'local storage' : 'a cookie'), time);
			}
			// init is true when widget init is run, this will run this widget before all other widgets have initialized
			// this method allows using this widget in the original tablesorter plugin; but then it will run all widgets twice.
			if (init && sortList && sortList.length > 0) {
				c.sortList = sortList;
			} else if (table.hasInitialized && sortList && sortList.length > 0) {
				// update sort change
				$(table).trigger('sorton', [sortList]);
			}
		}
	}
});

})(jQuery);