/*!
* TableSorter 2.10.0 - Client-side table sorting with ease!
* @requires jQuery v1.2.6+
*
* Copyright (c) 2007 Christian Bach
* Examples and docs at: http://tablesorter.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* @type jQuery
* @name tablesorter
* @cat Plugins/Tablesorter
* @author Christian Bach/christian.bach@polyester.se
* @contributor Rob Garrison/https://github.com/Mottie/tablesorter
*/
/*jshint browser:true, jquery:true, unused:false, expr: true */
/*global console:false, alert:false */

!(function($) {
	"use strict";
	$.extend({
		/*jshint supernew:true */
		tablesorter: new function() {

			var ts = this;

			ts.version = "2.10.0";

			ts.parsers = [];
			ts.widgets = [];
			ts.defaults = {

				// *** appearance
				theme            : 'default',  // adds tablesorter-{theme} to the table for styling
				widthFixed       : false,      // adds colgroup to fix widths of columns
				showProcessing   : false,      // show an indeterminate timer icon in the header when the table is sorted or filtered.

				headerTemplate   : '{content}',// header layout template (HTML ok); {content} = innerHTML, {icon} = <i/> (class from cssIcon)
				onRenderTemplate : null,       // function(index, template){ return template; }, (template is a string)
				onRenderHeader   : null,       // function(index){}, (nothing to return)

				// *** functionality
				cancelSelection  : true,       // prevent text selection in the header
				dateFormat       : 'mmddyyyy', // other options: "ddmmyyy" or "yyyymmdd"
				sortMultiSortKey : 'shiftKey', // key used to select additional columns
				sortResetKey     : 'ctrlKey',  // key used to remove sorting on a column
				usNumberFormat   : true,       // false for German "1.234.567,89" or French "1 234 567,89"
				delayInit        : false,      // if false, the parsed table contents will not update until the first sort
				serverSideSorting: false,      // if true, server-side sorting should be performed because client-side sorting will be disabled, but the ui and events will still be used.

				// *** sort options
				headers          : {},         // set sorter, string, empty, locked order, sortInitialOrder, filter, etc.
				ignoreCase       : true,       // ignore case while sorting
				sortForce        : null,       // column(s) first sorted; always applied
				sortList         : [],         // Initial sort order; applied initially; updated when manually sorted
				sortAppend       : null,       // column(s) sorted last; always applied

				sortInitialOrder : 'asc',      // sort direction on first click
				sortLocaleCompare: false,      // replace equivalent character (accented characters)
				sortReset        : false,      // third click on the header will reset column to default - unsorted
				sortRestart      : false,      // restart sort to "sortInitialOrder" when clicking on previously unsorted columns

				emptyTo          : 'bottom',   // sort empty cell to bottom, top, none, zero
				stringTo         : 'max',      // sort strings in numerical column as max, min, top, bottom, zero
				textExtraction   : 'simple',   // text extraction method/function - function(node, table, cellIndex){}
				textSorter       : null,       // use custom text sorter - function(a,b){ return a.sort(b); } // basic sort

				// *** widget options
				widgets: [],                   // method to add widgets, e.g. widgets: ['zebra']
				widgetOptions    : {
					zebra : [ 'even', 'odd' ]    // zebra widget alternating row class names
				},
				initWidgets      : true,       // apply widgets on tablesorter initialization

				// *** callbacks
				initialized      : null,       // function(table){},

				// *** css class names
				tableClass       : 'tablesorter',
				cssAsc           : 'tablesorter-headerAsc',
				cssChildRow      : 'tablesorter-childRow', // previously "expand-child"
				cssDesc          : 'tablesorter-headerDesc',
				cssHeader        : 'tablesorter-header',
				cssHeaderRow     : 'tablesorter-headerRow',
				cssIcon          : 'tablesorter-icon', //  if this class exists, a <i> will be added to the header automatically
				cssInfoBlock     : 'tablesorter-infoOnly', // don't sort tbody with this class name
				cssProcessing    : 'tablesorter-processing', // processing icon applied to header during sort/filter

				// *** selectors
				selectorHeaders  : '> thead th, > thead td',
				selectorSort     : 'th, td',   // jQuery selector of content within selectorHeaders that is clickable to trigger a sort
				selectorRemove   : '.remove-me',

				// *** advanced
				debug            : false,

				// *** Internal variables
				headerList: [],
				empties: {},
				strings: {},
				parsers: []

				// deprecated; but retained for backwards compatibility
				// widgetZebra: { css: ["even", "odd"] }

			};

			/* debuging utils */
			function log(s) {
				if (typeof console !== "undefined" && typeof console.log !== "undefined") {
					console.log(s);
				} else {
					alert(s);
				}
			}

			function benchmark(s, d) {
				log(s + " (" + (new Date().getTime() - d.getTime()) + "ms)");
			}

			ts.benchmark = benchmark;

			function getElementText(table, node, cellIndex) {
				if (!node) { return ""; }
				var c = table.config,
					t = c.textExtraction, text = "";
				if (t === "simple") {
					if (c.supportsTextContent) {
						text = node.textContent; // newer browsers support this
					} else {
						text = $(node).text();
					}
				} else {
					if (typeof t === "function") {
						text = t(node, table, cellIndex);
					} else if (typeof t === "object" && t.hasOwnProperty(cellIndex)) {
						text = t[cellIndex](node, table, cellIndex);
					} else {
						text = c.supportsTextContent ? node.textContent : $(node).text();
					}
				}
				return $.trim(text);
			}

			function detectParserForColumn(table, rows, rowIndex, cellIndex) {
				var cur,
				i = ts.parsers.length,
				node = false,
				nodeValue = '',
				keepLooking = true;
				while (nodeValue === '' && keepLooking) {
					rowIndex++;
					if (rows[rowIndex]) {
						node = rows[rowIndex].cells[cellIndex];
						nodeValue = getElementText(table, node, cellIndex);
						if (table.config.debug) {
							log('Checking if value was empty on row ' + rowIndex + ', column: ' + cellIndex + ': "' + nodeValue + '"');
						}
					} else {
						keepLooking = false;
					}
				}
				while (--i >= 0) {
					cur = ts.parsers[i];
					// ignore the default text parser because it will always be true
					if (cur && cur.id !== 'text' && cur.is && cur.is(nodeValue, table, node)) {
						return cur;
					}
				}
				// nothing found, return the generic parser (text)
				return ts.getParserById('text');
			}

			function buildParserCache(table) {
				var c = table.config,
					// update table bodies in case we start with an empty table
					tb = c.$tbodies = c.$table.children('tbody:not(.' + c.cssInfoBlock + ')'),
					rows, list, l, i, h, ch, p, parsersDebug = "";
				if ( tb.length === 0) {
					return c.debug ? log('*Empty table!* Not building a parser cache') : '';
				}
				rows = tb[0].rows;
				if (rows[0]) {
					list = [];
					l = rows[0].cells.length;
					for (i = 0; i < l; i++) {
						// tons of thanks to AnthonyM1229 for working out the following selector (issue #74) to make this work in IE8!
						// More fixes to this selector to work properly in iOS and jQuery 1.8+ (issue #132 & #174)
						h = c.$headers.filter(':not([colspan])');
						h = h.add( c.$headers.filter('[colspan="1"]') ) // ie8 fix
							.filter('[data-column="' + i + '"]:last');
						ch = c.headers[i];
						// get column parser
						p = ts.getParserById( ts.getData(h, ch, 'sorter') );
						// empty cells behaviour - keeping emptyToBottom for backwards compatibility
						c.empties[i] = ts.getData(h, ch, 'empty') || c.emptyTo || (c.emptyToBottom ? 'bottom' : 'top' );
						// text strings behaviour in numerical sorts
						c.strings[i] = ts.getData(h, ch, 'string') || c.stringTo || 'max';
						if (!p) {
							p = detectParserForColumn(table, rows, -1, i);
						}
						if (c.debug) {
							parsersDebug += "column:" + i + "; parser:" + p.id + "; string:" + c.strings[i] + '; empty: ' + c.empties[i] + "\n";
						}
						list.push(p);
					}
				}
				if (c.debug) {
					log(parsersDebug);
				}
				c.parsers = list;
			}

			/* utils */
			function buildCache(table) {
				var b = table.tBodies,
				tc = table.config,
				totalRows,
				totalCells,
				parsers = tc.parsers,
				t, v, i, j, k, c, cols, cacheTime, colMax = [];
				tc.cache = {};
				// if no parsers found, return - it's an empty table.
				if (!parsers) {
					return tc.debug ? log('*Empty table!* Not building a cache') : '';
				}
				if (tc.debug) {
					cacheTime = new Date();
				}
				// processing icon
				if (tc.showProcessing) {
					ts.isProcessing(table, true);
				}
				for (k = 0; k < b.length; k++) {
					tc.cache[k] = { row: [], normalized: [] };
					// ignore tbodies with class name from css.cssInfoBlock
					if (!$(b[k]).hasClass(tc.cssInfoBlock)) {
						totalRows = (b[k] && b[k].rows.length) || 0;
						totalCells = (b[k].rows[0] && b[k].rows[0].cells.length) || 0;
						for (i = 0; i < totalRows; ++i) {
							/** Add the table data to main data array */
							c = $(b[k].rows[i]);
							cols = [];
							// if this is a child row, add it to the last row's children and continue to the next row
							if (c.hasClass(tc.cssChildRow)) {
								tc.cache[k].row[tc.cache[k].row.length - 1] = tc.cache[k].row[tc.cache[k].row.length - 1].add(c);
								// go to the next for loop
								continue;
							}
							tc.cache[k].row.push(c);
							for (j = 0; j < totalCells; ++j) {
								t = getElementText(table, c[0].cells[j], j);
								// allow parsing if the string is empty, previously parsing would change it to zero,
								// in case the parser needs to extract data from the table cell attributes
								v = parsers[j].format(t, table, c[0].cells[j], j);
								cols.push(v);
								if ((parsers[j].type || '').toLowerCase() === "numeric") {
									colMax[j] = Math.max(Math.abs(v) || 0, colMax[j] || 0); // determine column max value (ignore sign)
								}
							}
							cols.push(tc.cache[k].normalized.length); // add position for rowCache
							tc.cache[k].normalized.push(cols);
						}
						tc.cache[k].colMax = colMax;
					}
				}
				if (tc.showProcessing) {
					ts.isProcessing(table); // remove processing icon
				}
				if (tc.debug) {
					benchmark("Building cache for " + totalRows + " rows", cacheTime);
				}
			}

			// init flag (true) used by pager plugin to prevent widget application
			function appendToTable(table, init) {
				var c = table.config,
				b = table.tBodies,
				rows = [],
				c2 = c.cache,
				r, n, totalRows, checkCell, $bk, $tb,
				i, j, k, l, pos, appendTime;
				if (!c2[0]) { return; } // empty table - fixes #206
				if (c.debug) {
					appendTime = new Date();
				}
				for (k = 0; k < b.length; k++) {
					$bk = $(b[k]);
					if ($bk.length && !$bk.hasClass(c.cssInfoBlock)) {
						// get tbody
						$tb = ts.processTbody(table, $bk, true);
						r = c2[k].row;
						n = c2[k].normalized;
						totalRows = n.length;
						checkCell = totalRows ? (n[0].length - 1) : 0;
						for (i = 0; i < totalRows; i++) {
							pos = n[i][checkCell];
							rows.push(r[pos]);
							// removeRows used by the pager plugin
							if (!c.appender || !c.removeRows) {
								l = r[pos].length;
								for (j = 0; j < l; j++) {
									$tb.append(r[pos][j]);
								}
							}
						}
						// restore tbody
						ts.processTbody(table, $tb, false);
					}
				}
				if (c.appender) {
					c.appender(table, rows);
				}
				if (c.debug) {
					benchmark("Rebuilt table", appendTime);
				}
				// apply table widgets
				if (!init) { ts.applyWidget(table); }
				// trigger sortend
				$(table).trigger("sortEnd", table);
			}

			// computeTableHeaderCellIndexes from:
			// http://www.javascripttoolbox.com/lib/table/examples.php
			// http://www.javascripttoolbox.com/temp/table_cellindex.html
			function computeThIndexes(t) {
				var matrix = [],
				lookup = {},
				cols = 0, // determine the number of columns
				trs = $(t).find('thead:eq(0), tfoot').children('tr'), // children tr in tfoot - see issue #196
				i, j, k, l, c, cells, rowIndex, cellId, rowSpan, colSpan, firstAvailCol, matrixrow;
				for (i = 0; i < trs.length; i++) {
					cells = trs[i].cells;
					for (j = 0; j < cells.length; j++) {
						c = cells[j];
						rowIndex = c.parentNode.rowIndex;
						cellId = rowIndex + "-" + c.cellIndex;
						rowSpan = c.rowSpan || 1;
						colSpan = c.colSpan || 1;
						if (typeof(matrix[rowIndex]) === "undefined") {
							matrix[rowIndex] = [];
						}
						// Find first available column in the first row
						for (k = 0; k < matrix[rowIndex].length + 1; k++) {
							if (typeof(matrix[rowIndex][k]) === "undefined") {
								firstAvailCol = k;
								break;
							}
						}
						lookup[cellId] = firstAvailCol;
						cols = Math.max(firstAvailCol, cols);
						// add data-column
						$(c).attr({ 'data-column' : firstAvailCol }); // 'data-row' : rowIndex
						for (k = rowIndex; k < rowIndex + rowSpan; k++) {
							if (typeof(matrix[k]) === "undefined") {
								matrix[k] = [];
							}
							matrixrow = matrix[k];
							for (l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
								matrixrow[l] = "x";
							}
						}
					}
				}
				t.config.columns = cols; // may not be accurate if # header columns !== # tbody columns
				return lookup;
			}

			function formatSortingOrder(v) {
				// look for "d" in "desc" order; return true
				return (/^d/i.test(v) || v === 1);
			}

			function buildHeaders(table) {
				var header_index = computeThIndexes(table), ch, $t,
					h, i, t, lock, time, c = table.config;
				c.headerList = [];
				c.headerContent = [];
				if (c.debug) {
					time = new Date();
				}
				i = c.cssIcon ? '<i class="' + c.cssIcon + '"></i>' : ''; // add icon if cssIcon option exists
				c.$headers = $(table).find(c.selectorHeaders).each(function(index) {
					$t = $(this);
					ch = c.headers[index];
					c.headerContent[index] = this.innerHTML; // save original header content
					// set up header template
					t = c.headerTemplate.replace(/\{content\}/g, this.innerHTML).replace(/\{icon\}/g, i);
					if (c.onRenderTemplate) {
						h = c.onRenderTemplate.apply($t, [index, t]);
						if (h && typeof h === 'string') { t = h; } // only change t if something is returned
					}
					this.innerHTML = '<div class="tablesorter-header-inner">' + t + '</div>'; // faster than wrapInner

					if (c.onRenderHeader) { c.onRenderHeader.apply($t, [index]); }

					this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
					this.order = formatSortingOrder( ts.getData($t, ch, 'sortInitialOrder') || c.sortInitialOrder ) ? [1,0,2] : [0,1,2];
					this.count = -1; // set to -1 because clicking on the header automatically adds one
					this.lockedOrder = false;
					lock = ts.getData($t, ch, 'lockedOrder') || false;
					if (typeof lock !== 'undefined' && lock !== false) {
						this.order = this.lockedOrder = formatSortingOrder(lock) ? [1,1,1] : [0,0,0];
					}
					$t.addClass(c.cssHeader);
					// add cell to headerList
					c.headerList[index] = this;
					// add to parent in case there are multiple rows
					$t.parent().addClass(c.cssHeaderRow);
					// allow keyboard cursor to focus on element
					$t.attr("tabindex", 0);
				});
				// enable/disable sorting
				updateHeader(table);
				if (c.debug) {
					benchmark("Built headers:", time);
					log(c.$headers);
				}
			}

			function commonUpdate(table, resort, callback) {
				var $t = $(table),
					c = table.config;
				// remove rows/elements before update
				$t.find(c.selectorRemove).remove();
				// rebuild parsers
				buildParserCache(table);
				// rebuild the cache map
				buildCache(table);
				checkResort($t, resort, callback);
			}

			function updateHeader(table) {
				var s, c = table.config;
				c.$headers.each(function(index, th){
					s = ts.getData( th, c.headers[index], 'sorter' ) === 'false';
					th.sortDisabled = s;
					$(th)[ s ? 'addClass' : 'removeClass' ]('sorter-false');
				});
			}

			function setHeadersCss(table) {
				var f, i, j, l,
					c = table.config,
					list = c.sortList,
					css = [c.cssAsc, c.cssDesc],
					// find the footer
					$t = $(table).find('tfoot tr').children().removeClass(css.join(' '));
				// remove all header information
				c.$headers.removeClass(css.join(' '));
				l = list.length;
				for (i = 0; i < l; i++) {
					// direction = 2 means reset!
					if (list[i][1] !== 2) {
						// multicolumn sorting updating - choose the :last in case there are nested columns
						f = c.$headers.not('.sorter-false').filter('[data-column="' + list[i][0] + '"]' + (l === 1 ? ':last' : '') );
						if (f.length) {
							for (j = 0; j < f.length; j++) {
								if (!f[j].sortDisabled) {
									f.eq(j).addClass(css[list[i][1]]);
									// add sorted class to footer, if it exists
									if ($t.length) {
										$t.filter('[data-column="' + list[i][0] + '"]').eq(j).addClass(css[list[i][1]]);
									}
								}
							}
						}
					}
				}
			}

			// automatically add col group, and column sizes if set
			function fixColumnWidth(table) {
				if (table.config.widthFixed && $(table).find('colgroup').length === 0) {
					var colgroup = $('<colgroup>'),
						overallWidth = $(table).width();
					$(table.tBodies[0]).find("tr:first").children("td").each(function() {
						colgroup.append($('<col>').css('width', parseInt(($(this).width()/overallWidth)*1000, 10)/10 + '%'));
					});
					$(table).prepend(colgroup);
				}
			}

			function updateHeaderSortCount(table, list) {
				var s, t, o, c = table.config,
					sl = list || c.sortList;
				c.sortList = [];
				$.each(sl, function(i,v){
					// ensure all sortList values are numeric - fixes #127
					s = [ parseInt(v[0], 10), parseInt(v[1], 10) ];
					// make sure header exists
					o = c.headerList[s[0]];
					if (o) { // prevents error if sorton array is wrong
						c.sortList.push(s);
						t = $.inArray(s[1], o.order); // fixes issue #167
						o.count = t >= 0 ? t : s[1] % (c.sortReset ? 3 : 2);
					}
				});
			}

			function getCachedSortType(parsers, i) {
				return (parsers && parsers[i]) ? parsers[i].type || '' : '';
			}

			function initSort(table, cell, e){
				var a, i, j, o, s,
					c = table.config,
					k = !e[c.sortMultiSortKey],
					$this = $(table);
				// Only call sortStart if sorting is enabled
				$this.trigger("sortStart", table);
				// get current column sort order
				cell.count = e[c.sortResetKey] ? 2 : (cell.count + 1) % (c.sortReset ? 3 : 2);
				// reset all sorts on non-current column - issue #30
				if (c.sortRestart) {
					i = cell;
					c.$headers.each(function() {
						// only reset counts on columns that weren't just clicked on and if not included in a multisort
						if (this !== i && (k || !$(this).is('.' + c.cssDesc + ',.' + c.cssAsc))) {
							this.count = -1;
						}
					});
				}
				// get current column index
				i = cell.column;
				// user only wants to sort on one column
				if (k) {
					// flush the sort list
					c.sortList = [];
					if (c.sortForce !== null) {
						a = c.sortForce;
						for (j = 0; j < a.length; j++) {
							if (a[j][0] !== i) {
								c.sortList.push(a[j]);
							}
						}
					}
					// add column to sort list
					o = cell.order[cell.count];
					if (o < 2) {
						c.sortList.push([i, o]);
						// add other columns if header spans across multiple
						if (cell.colSpan > 1) {
							for (j = 1; j < cell.colSpan; j++) {
								c.sortList.push([i + j, o]);
							}
						}
					}
					// multi column sorting
				} else {
					// get rid of the sortAppend before adding more - fixes issue #115
					if (c.sortAppend && c.sortList.length > 1) {
						if (ts.isValueInArray(c.sortAppend[0][0], c.sortList)) {
							c.sortList.pop();
						}
					}
					// the user has clicked on an already sorted column
					if (ts.isValueInArray(i, c.sortList)) {
						// reverse the sorting direction for all tables
						for (j = 0; j < c.sortList.length; j++) {
							s = c.sortList[j];
							o = c.headerList[s[0]];
							if (s[0] === i) {
								s[1] = o.order[o.count];
								if (s[1] === 2) {
									c.sortList.splice(j,1);
									o.count = -1;
								}
							}
						}
					} else {
						// add column to sort list array
						o = cell.order[cell.count];
						if (o < 2) {
							c.sortList.push([i, o]);
							// add other columns if header spans across multiple
							if (cell.colSpan > 1) {
								for (j = 1; j < cell.colSpan; j++) {
									c.sortList.push([i + j, o]);
								}
							}
						}
					}
				}
				if (c.sortAppend !== null) {
					a = c.sortAppend;
					for (j = 0; j < a.length; j++) {
						if (a[j][0] !== i) {
							c.sortList.push(a[j]);
						}
					}
				}
				// sortBegin event triggered immediately before the sort
				$this.trigger("sortBegin", table);
				// setTimeout needed so the processing icon shows up
				setTimeout(function(){
					// set css for headers
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
				}, 1);
			}

			// sort multiple columns
			function multisort(table) { /*jshint loopfunc:true */
				var dir = 0, tc = table.config,
				sortList = tc.sortList, l = sortList.length, bl = table.tBodies.length,
				sortTime, i, k, c, colMax, cache, lc, s, order, orgOrderCol;
				if (tc.serverSideSorting || !tc.cache[0]) { // empty table - fixes #206
					return;
				}
				if (tc.debug) { sortTime = new Date(); }
				for (k = 0; k < bl; k++) {
					colMax = tc.cache[k].colMax;
					cache = tc.cache[k].normalized;
					lc = cache.length;
					orgOrderCol = (cache && cache[0]) ? cache[0].length - 1 : 0;
					cache.sort(function(a, b) {
						// cache is undefined here in IE, so don't use it!
						for (i = 0; i < l; i++) {
							c = sortList[i][0];
							order = sortList[i][1];
							// fallback to natural sort since it is more robust
							s = /n/i.test(getCachedSortType(tc.parsers, c)) ? "Numeric" : "Text";
							s += order === 0 ? "" : "Desc";
							if (/Numeric/.test(s) && tc.strings[c]) {
								// sort strings in numerical columns
								if (typeof (tc.string[tc.strings[c]]) === 'boolean') {
									dir = (order === 0 ? 1 : -1) * (tc.string[tc.strings[c]] ? -1 : 1);
								} else {
									dir = (tc.strings[c]) ? tc.string[tc.strings[c]] || 0 : 0;
								}
							}
							var sort = $.tablesorter["sort" + s](table, a[c], b[c], c, colMax[c], dir);
							if (sort) { return sort; }
						}
						return a[orgOrderCol] - b[orgOrderCol];
					});
				}
				if (tc.debug) { benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time", sortTime); }
			}

			function resortComplete($table, callback){
				$table.trigger('updateComplete');
				if (typeof callback === "function") {
					callback($table[0]);
				}
			}

			function checkResort($table, flag, callback) {
				// don't try to resort if the table is still processing
				// this will catch spamming of the updateCell method
				if (flag !== false && !$table[0].isProcessing) {
					$table.trigger("sorton", [$table[0].config.sortList, function(){
						resortComplete($table, callback);
					}]);
				} else {
					resortComplete($table, callback);
				}
			}

			function bindEvents(table){
				var c = table.config,
					$this = c.$table,
					j, downTime;
				// apply event handling to headers
				c.$headers
				// http://stackoverflow.com/questions/5312849/jquery-find-self;
				.find(c.selectorSort).add( c.$headers.filter(c.selectorSort) )
				.unbind('mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter')
				.bind('mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter', function(e, external) {
					if (e.keyCode && e.keyCode !== 13) { return; }
					// jQuery v1.2.6 doesn't have closest()
					var $cell = /TH|TD/.test(this.tagName) ? $(this) : $(this).parents('th, td').filter(':last'), cell = $cell[0];
					// only recognize left clicks or enter
					if (e.keyCode) {
						if (e.keyCode !== 13) { return false; }
					}
					else if ( (e.which || e.button) !== 1 && e.type !== 'sort') {
						return false;
					}
					// set timer on mousedown
					if (e.type === 'mousedown') {
						downTime = new Date().getTime();
						return e.target.tagName === "INPUT" ? '' : !c.cancelSelection;
					}
					// ignore long clicks (prevents resizable widget from initializing a sort)
					if (e.type === 'mouseup' && external !== true && (new Date().getTime() - downTime > 250)) { return false; }
					if (c.delayInit && !c.cache) { buildCache(table); }
					if (!cell.sortDisabled) {
						initSort(table, cell, e);
					}
				});
				if (c.cancelSelection) {
					// cancel selection
					c.$headers
						.attr('unselectable', 'on')
						.bind('selectstart', false)
						.css({
							'user-select': 'none',
							'MozUserSelect': 'none' // not needed for jQuery 1.8+
						});
				}
				// apply easy methods that trigger bound events
				$this
				.unbind('sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave '.split(' ').join('.tablesorter '))
				.bind("sortReset.tablesorter", function(e){
					e.stopPropagation();
					c.sortList = [];
					setHeadersCss(table);
					multisort(table);
					appendToTable(table);
				})
				.bind("updateAll.tablesorter", function(e, resort, callback){
					e.stopPropagation();
					ts.restoreHeaders(table);
					buildHeaders(table);
					bindEvents(table);
					commonUpdate(table, resort, callback);
				})
				.bind("update.tablesorter updateRows.tablesorter", function(e, resort, callback) {
					e.stopPropagation();
					// update sorting (if enabled/disabled)
					updateHeader(table);
					commonUpdate(table, resort, callback);
				})
				.bind("updateCell.tablesorter", function(e, cell, resort, callback) {
					e.stopPropagation();
					$this.find(c.selectorRemove).remove();
					// get position from the dom
					var l, row, icell,
					$tb = $this.find('tbody'),
					// update cache - format: function(s, table, cell, cellIndex)
					// no closest in jQuery v1.2.6 - tbdy = $tb.index( $(cell).closest('tbody') ),$row = $(cell).closest('tr');
					tbdy = $tb.index( $(cell).parents('tbody').filter(':last') ),
					$row = $(cell).parents('tr').filter(':last');
					cell = $(cell)[0]; // in case cell is a jQuery object
					// tbody may not exist if update is initialized while tbody is removed for processing
					if ($tb.length && tbdy >= 0) {
						row = $tb.eq(tbdy).find('tr').index( $row );
						icell = cell.cellIndex;
						l = c.cache[tbdy].normalized[row].length - 1;
						c.cache[tbdy].row[table.config.cache[tbdy].normalized[row][l]] = $row;
						c.cache[tbdy].normalized[row][icell] = c.parsers[icell].format( getElementText(table, cell, icell), table, cell, icell );
						checkResort($this, resort, callback);
					}
				})
				.bind("addRows.tablesorter", function(e, $row, resort, callback) {
					e.stopPropagation();
					var i, rows = $row.filter('tr').length,
					dat = [], l = $row[0].cells.length,
					tbdy = $this.find('tbody').index( $row.closest('tbody') );
					// fixes adding rows to an empty table - see issue #179
					if (!c.parsers) {
						buildParserCache(table);
					}
					// add each row
					for (i = 0; i < rows; i++) {
						// add each cell
						for (j = 0; j < l; j++) {
							dat[j] = c.parsers[j].format( getElementText(table, $row[i].cells[j], j), table, $row[i].cells[j], j );
						}
						// add the row index to the end
						dat.push(c.cache[tbdy].row.length);
						// update cache
						c.cache[tbdy].row.push([$row[i]]);
						c.cache[tbdy].normalized.push(dat);
						dat = [];
					}
					// resort using current settings
					checkResort($this, resort, callback);
				})
				.bind("sorton.tablesorter", function(e, list, callback, init) {
					e.stopPropagation();
					$this.trigger("sortStart", this);
					// update header count index
					updateHeaderSortCount(table, list);
					// set css for headers
					setHeadersCss(table);
					$this.trigger("sortBegin", this);
					// sort the table and append it to the dom
					multisort(table);
					appendToTable(table, init);
					if (typeof callback === "function") {
						callback(table);
					}
				})
				.bind("appendCache.tablesorter", function(e, callback, init) {
					e.stopPropagation();
					appendToTable(table, init);
					if (typeof callback === "function") {
						callback(table);
					}
				})
				.bind("applyWidgetId.tablesorter", function(e, id) {
					e.stopPropagation();
					ts.getWidgetById(id).format(table, c, c.widgetOptions);
				})
				.bind("applyWidgets.tablesorter", function(e, init) {
					e.stopPropagation();
					// apply widgets
					ts.applyWidget(table, init);
				})
				.bind("refreshWidgets.tablesorter", function(e, all, dontapply){
					e.stopPropagation();
					ts.refreshWidgets(table, all, dontapply);
				})
				.bind("destroy.tablesorter", function(e, c, cb){
					e.stopPropagation();
					ts.destroy(table, c, cb);
				});
			}

			/* public methods */
			ts.construct = function(settings) {
				return this.each(function() {
					// if no thead or tbody, or tablesorter is already present, quit
					if (!this.tHead || this.tBodies.length === 0 || this.hasInitialized === true) {
						return (this.config && this.config.debug) ? log('stopping initialization! No thead, tbody or tablesorter has already been initialized') : '';
					}
					// declare
					var $this = $(this), table = this,
						c, k = '',
						m = $.metadata;
					// initialization flag
					table.hasInitialized = false;
					// table is being processed flag
					table.isProcessing = true;
					// new blank config object
					table.config = {};
					// merge and extend
					c = $.extend(true, table.config, ts.defaults, settings);
					// save the settings where they read
					$.data(table, "tablesorter", c);
					if (c.debug) { $.data( table, 'startoveralltimer', new Date()); }
					// constants
					c.supportsTextContent = $('<span>x</span>')[0].textContent === 'x';
					c.supportsDataObject = parseFloat($.fn.jquery) >= 1.4;
					// digit sort text location; keeping max+/- for backwards compatibility
					c.string = { 'max': 1, 'min': -1, 'max+': 1, 'max-': -1, 'zero': 0, 'none': 0, 'null': 0, 'top': true, 'bottom': false };
					// add table theme class only if there isn't already one there
					if (!/tablesorter\-/.test($this.attr('class'))) {
						k = (c.theme !== '' ? ' tablesorter-' + c.theme : '');
					}
					c.$table = $this.addClass(c.tableClass + k);
					c.$tbodies = $this.children('tbody:not(.' + c.cssInfoBlock + ')');
					// build headers
					buildHeaders(table);
					// fixate columns if the users supplies the fixedWidth option
					// do this after theme has been applied
					fixColumnWidth(table);
					// try to auto detect column type, and store in tables config
					buildParserCache(table);
					// build the cache for the tbody cells
					// delayInit will delay building the cache until the user starts a sort
					if (!c.delayInit) { buildCache(table); }
					// bind all header events and methods
					bindEvents(table);
					// get sort list from jQuery data or metadata
					// in jQuery < 1.4, an error occurs when calling $this.data()
					if (c.supportsDataObject && typeof $this.data().sortlist !== 'undefined') {
						c.sortList = $this.data().sortlist;
					} else if (m && ($this.metadata() && $this.metadata().sortlist)) {
						c.sortList = $this.metadata().sortlist;
					}
					// apply widget init code
					ts.applyWidget(table, true);
					// if user has supplied a sort list to constructor
					if (c.sortList.length > 0) {
						$this.trigger("sorton", [c.sortList, {}, !c.initWidgets]);
					} else if (c.initWidgets) {
						// apply widget format
						ts.applyWidget(table);
					}

					// show processesing icon
					if (c.showProcessing) {
						$this
						.unbind('sortBegin.tablesorter sortEnd.tablesorter')
						.bind('sortBegin.tablesorter sortEnd.tablesorter', function(e) {
							ts.isProcessing(table, e.type === 'sortBegin');
						});
					}

					// initialized
					table.hasInitialized = true;
					table.isProcessing = false;
					if (c.debug) {
						ts.benchmark("Overall initialization time", $.data( table, 'startoveralltimer'));
					}
					$this.trigger('tablesorter-initialized', table);
					if (typeof c.initialized === 'function') { c.initialized(table); }
				});
			};

			// *** Process table ***
			// add processing indicator
			ts.isProcessing = function(table, toggle, $ths) {
				table = $(table);
				var c = table[0].config,
					// default to all headers
					$h = $ths || table.find('.' + c.cssHeader);
				if (toggle) {
					if (c.sortList.length > 0) {
						// get headers from the sortList
						$h = $h.filter(function(){
							// get data-column from attr to keep  compatibility with jQuery 1.2.6
							return this.sortDisabled ? false : ts.isValueInArray( parseFloat($(this).attr('data-column')), c.sortList);
						});
					}
					$h.addClass(c.cssProcessing);
				} else {
					$h.removeClass(c.cssProcessing);
				}
			};

			// detach tbody but save the position
			// don't use tbody because there are portions that look for a tbody index (updateCell)
			ts.processTbody = function(table, $tb, getIt){
				var holdr;
				if (getIt) {
					table.isProcessing = true;
					$tb.before('<span class="tablesorter-savemyplace"/>');
					holdr = ($.fn.detach) ? $tb.detach() : $tb.remove();
					return holdr;
				}
				holdr = $(table).find('span.tablesorter-savemyplace');
				$tb.insertAfter( holdr );
				holdr.remove();
				table.isProcessing = false;
			};

			ts.clearTableBody = function(table) {
				$(table)[0].config.$tbodies.empty();
			};

			// restore headers
			ts.restoreHeaders = function(table){
				var c = table.config;
				c.$headers.each(function(i){
					// only restore header cells if it is wrapped
					// because this is also used by the updateAll method
					if ($(this).find('.tablesorter-header-inner').length){
						$(this).html( c.headerContent[i] );
					}
				});
			};

			ts.destroy = function(table, removeClasses, callback){
				table = $(table)[0];
				if (!table.hasInitialized) { return; }
				// remove all widgets
				ts.refreshWidgets(table, true, true);
				var $t = $(table), c = table.config,
				$h = $t.find('thead:first'),
				$r = $h.find('tr.' + c.cssHeaderRow).removeClass(c.cssHeaderRow),
				$f = $t.find('tfoot:first > tr').children('th, td');
				// remove widget added rows, just in case
				$h.find('tr').not($r).remove();
				// disable tablesorter
				$t
					.removeData('tablesorter')
					.unbind('sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd '.split(' ').join('.tablesorter '));
				c.$headers.add($f)
					.removeClass(c.cssHeader + ' ' + c.cssAsc + ' ' + c.cssDesc)
					.removeAttr('data-column');
				$r.find(c.selectorSort).unbind('mousedown.tablesorter mouseup.tablesorter keypress.tablesorter');
				ts.restoreHeaders(table);
				if (removeClasses !== false) {
					$t.removeClass(c.tableClass + ' tablesorter-' + c.theme);
				}
				// clear flag in case the plugin is initialized again
				table.hasInitialized = false;
				if (typeof callback === 'function') {
					callback(table);
				}
			};

			// *** sort functions ***
			// regex used in natural sort
			ts.regex = [
				/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, // chunk/tokenize numbers & letters
				/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, //date
				/^0x[0-9a-f]+$/i // hex
			];

			// Natural sort - https://github.com/overset/javascript-natural-sort
			ts.sortText = function(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ],
					r = ts.regex, xN, xD, yN, yD, xF, yF, i, mx;
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : e || 1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(a, b, table, col); }
				// chunk/tokenize
				xN = a.replace(r[0], '\\0$1\\0').replace(/\\0$/, '').replace(/^\\0/, '').split('\\0');
				yN = b.replace(r[0], '\\0$1\\0').replace(/\\0$/, '').replace(/^\\0/, '').split('\\0');
				// numeric, hex or date detection
				xD = parseInt(a.match(r[2]),16) || (xN.length !== 1 && a.match(r[1]) && Date.parse(a));
				yD = parseInt(b.match(r[2]),16) || (xD && b.match(r[1]) && Date.parse(b)) || null;
				// first try and sort Hex codes or Dates
				if (yD) {
					if ( xD < yD ) { return -1; }
					if ( xD > yD ) { return 1; }
				}
				mx = Math.max(xN.length, yN.length);
				// natural sorting through split numeric strings and default strings
				for (i = 0; i < mx; i++) {
					// find floats not starting with '0', string or 0 if not defined
					xF = isNaN(xN[i]) ? xN[i] || 0 : parseFloat(xN[i]) || 0;
					yF = isNaN(yN[i]) ? yN[i] || 0 : parseFloat(yN[i]) || 0;
					// handle numeric vs string comparison - number < string - (Kyle Adams)
					if (isNaN(xF) !== isNaN(yF)) { return (isNaN(xF)) ? 1 : -1; }
					// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
					if (typeof xF !== typeof yF) {
						xF += '';
						yF += '';
					}
					if (xF < yF) { return -1; }
					if (xF > yF) { return 1; }
				}
				return 0;
			};

			ts.sortTextDesc = function(table, a, b, col) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : -e || -1; }
				if (typeof c.textSorter === 'function') { return c.textSorter(b, a, table, col); }
				return ts.sortText(table, b, a);
			};

			// return text string value by adding up ascii value
			// so the text is somewhat sorted when using a digital sort
			// this is NOT an alphanumeric sort
			ts.getTextValue = function(a, mx, d) {
				if (mx) {
					// make sure the text value is greater than the max numerical value (mx)
					var i, l = a ? a.length : 0, n = mx + d;
					for (i = 0; i < l; i++) {
						n += a.charCodeAt(i);
					}
					return d * n;
				}
				return 0;
			};

			ts.sortNumeric = function(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : -e || -1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : e || 1; }
				if (isNaN(a)) { a = ts.getTextValue(a, mx, d); }
				if (isNaN(b)) { b = ts.getTextValue(b, mx, d); }
				return a - b;
			};

			ts.sortNumericDesc = function(table, a, b, col, mx, d) {
				if (a === b) { return 0; }
				var c = table.config, e = c.string[ (c.empties[col] || c.emptyTo ) ];
				if (a === '' && e !== 0) { return typeof e === 'boolean' ? (e ? -1 : 1) : e || 1; }
				if (b === '' && e !== 0) { return typeof e === 'boolean' ? (e ? 1 : -1) : -e || -1; }
				if (isNaN(a)) { a = ts.getTextValue(a, mx, d); }
				if (isNaN(b)) { b = ts.getTextValue(b, mx, d); }
				return b - a;
			};

			// used when replacing accented characters during sorting
			ts.characterEquivalents = {
				"a" : "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", // áàâãäąå
				"A" : "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5", // ÁÀÂÃÄĄÅ
				"c" : "\u00e7\u0107\u010d", // çćč
				"C" : "\u00c7\u0106\u010c", // ÇĆČ
				"e" : "\u00e9\u00e8\u00ea\u00eb\u011b\u0119", // éèêëěę
				"E" : "\u00c9\u00c8\u00ca\u00cb\u011a\u0118", // ÉÈÊËĚĘ
				"i" : "\u00ed\u00ec\u0130\u00ee\u00ef\u0131", // íìİîïı
				"I" : "\u00cd\u00cc\u0130\u00ce\u00cf", // ÍÌİÎÏ
				"o" : "\u00f3\u00f2\u00f4\u00f5\u00f6", // óòôõö
				"O" : "\u00d3\u00d2\u00d4\u00d5\u00d6", // ÓÒÔÕÖ
				"ss": "\u00df", // ß (s sharp)
				"SS": "\u1e9e", // ẞ (Capital sharp s)
				"u" : "\u00fa\u00f9\u00fb\u00fc\u016f", // úùûüů
				"U" : "\u00da\u00d9\u00db\u00dc\u016e" // ÚÙÛÜŮ
			};
			ts.replaceAccents = function(s) {
				var a, acc = '[', eq = ts.characterEquivalents;
				if (!ts.characterRegex) {
					ts.characterRegexArray = {};
					for (a in eq) {
						if (typeof a === 'string') {
							acc += eq[a];
							ts.characterRegexArray[a] = new RegExp('[' + eq[a] + ']', 'g');
						}
					}
					ts.characterRegex = new RegExp(acc + ']');
				}
				if (ts.characterRegex.test(s)) {
					for (a in eq) {
						if (typeof a === 'string') {
							s = s.replace( ts.characterRegexArray[a], a );
						}
					}
				}
				return s;
			};

			// *** utilities ***
			ts.isValueInArray = function(v, a) {
				var i, l = a.length;
				for (i = 0; i < l; i++) {
					if (a[i][0] === v) {
						return true;
					}
				}
				return false;
			};

			ts.addParser = function(parser) {
				var i, l = ts.parsers.length, a = true;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === parser.id.toLowerCase()) {
						a = false;
					}
				}
				if (a) {
					ts.parsers.push(parser);
				}
			};

			ts.getParserById = function(name) {
				var i, l = ts.parsers.length;
				for (i = 0; i < l; i++) {
					if (ts.parsers[i].id.toLowerCase() === (name.toString()).toLowerCase()) {
						return ts.parsers[i];
					}
				}
				return false;
			};

			ts.addWidget = function(widget) {
				ts.widgets.push(widget);
			};

			ts.getWidgetById = function(name) {
				var i, w, l = ts.widgets.length;
				for (i = 0; i < l; i++) {
					w = ts.widgets[i];
					if (w && w.hasOwnProperty('id') && w.id.toLowerCase() === name.toLowerCase()) {
						return w;
					}
				}
			};

			ts.applyWidget = function(table, init) {
				table = $(table)[0]; // in case this is called externally
				var c = table.config,
					wo = c.widgetOptions,
					widgets = [],
					time, i, w, wd;
				if (c.debug) { time = new Date(); }
				if (c.widgets.length) {
					// ensure unique widget ids
					c.widgets = $.grep(c.widgets, function(v, k){
						return $.inArray(v, c.widgets) === k;
					});
					// build widget array & add priority as needed
					$.each(c.widgets || [], function(i,n){
						wd = ts.getWidgetById(n);
						if (wd && wd.id) {
							// set priority to 10 if not defined
							if (!wd.priority) { wd.priority = 10; }
							widgets[i] = wd;
						}
					});
					// sort widgets by priority
					widgets.sort(function(a, b){
						return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
					});

					// add/update selected widgets
					$.each(widgets, function(i,w){
						if (w) {
							if (init) {
								if (w.hasOwnProperty('options')) {
									wo = table.config.widgetOptions = $.extend( true, {}, w.options, wo );
								}
								if (w.hasOwnProperty('init')) {
									w.init(table, w, c, wo);
								}
							} else if (!init && w.hasOwnProperty('format')) {
								w.format(table, c, wo, false);
							}
						}
					});
				}
				if (c.debug) {
					w = c.widgets.length;
					benchmark("Completed " + (init === true ? "initializing " : "applying ") + w + " widget" + (w !== 1 ? "s" : ""), time);
				}
			};

			ts.refreshWidgets = function(table, doAll, dontapply) {
				table = $(table)[0]; // see issue #243
				var i, c = table.config,
					cw = c.widgets,
					w = ts.widgets, l = w.length;
				// remove previous widgets
				for (i = 0; i < l; i++){
					if ( w[i] && w[i].id && (doAll || $.inArray( w[i].id, cw ) < 0) ) {
						if (c.debug) { log( 'Refeshing widgets: Removing ' + w[i].id  ); }
						if (w[i].hasOwnProperty('remove')) { w[i].remove(table, c, c.widgetOptions); }
					}
				}
				if (dontapply !== true) {
					ts.applyWidget(table, doAll);
				}
			};

			// get sorter, string, empty, etc options for each column from
			// jQuery data, metadata, header option or header class name ("sorter-false")
			// priority = jQuery data > meta > headers option > header class name
			ts.getData = function(h, ch, key) {
				var val = '', $h = $(h), m, cl;
				if (!$h.length) { return ''; }
				m = $.metadata ? $h.metadata() : false;
				cl = ' ' + ($h.attr('class') || '');
				if (typeof $h.data(key) !== 'undefined' || typeof $h.data(key.toLowerCase()) !== 'undefined'){
					// "data-lockedOrder" is assigned to "lockedorder"; but "data-locked-order" is assigned to "lockedOrder"
					// "data-sort-initial-order" is assigned to "sortInitialOrder"
					val += $h.data(key) || $h.data(key.toLowerCase());
				} else if (m && typeof m[key] !== 'undefined') {
					val += m[key];
				} else if (ch && typeof ch[key] !== 'undefined') {
					val += ch[key];
				} else if (cl !== ' ' && cl.match(' ' + key + '-')) {
					// include sorter class name "sorter-text", etc; now works with "sorter-my-custom-parser"
					val = cl.match( new RegExp('\\s' + key + '-([\\w-]+)') )[1] || '';
				}
				return $.trim(val);
			};

			ts.formatFloat = function(s, table) {
				if (typeof s !== 'string' || s === '') { return s; }
				// allow using formatFloat without a table; defaults to US number format
				var i,
					t = table && table.config ? table.config.usNumberFormat !== false :
						typeof table !== "undefined" ? table : true;
				if (t) {
					// US Format - 1,234,567.89 -> 1234567.89
					s = s.replace(/,/g,'');
				} else {
					// German Format = 1.234.567,89 -> 1234567.89
					// French Format = 1 234 567,89 -> 1234567.89
					s = s.replace(/[\s|\.]/g,'').replace(/,/g,'.');
				}
				if(/^\s*\([.\d]+\)/.test(s)) {
					// make (#) into a negative number -> (10) = -10
					s = s.replace(/^\s*\(/,'-').replace(/\)/,'');
				}
				i = parseFloat(s);
				// return the text instead of zero
				return isNaN(i) ? $.trim(s) : i;
			};

			ts.isDigit = function(s) {
				// replace all unwanted chars and match
				return isNaN(s) ? (/^[\-+(]?\d+[)]?$/).test(s.toString().replace(/[,.'"\s]/g, '')) : true;
			};

		}()
	});

	// make shortcut
	var ts = $.tablesorter;

	// extend plugin scope
	$.fn.extend({
		tablesorter: ts.construct
	});

	// add default parsers
	ts.addParser({
		id: "text",
		is: function() {
			return true;
		},
		format: function(s, table) {
			var c = table.config;
			if (s) {
				s = $.trim( c.ignoreCase ? s.toLocaleLowerCase() : s );
				s = c.sortLocaleCompare ? ts.replaceAccents(s) : s;
			}
			return s;
		},
		type: "text"
	});

	ts.addParser({
		id: "digit",
		is: function(s) {
			return ts.isDigit(s);
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "currency",
		is: function(s) {
			return (/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/).test((s || '').replace(/[,. ]/g,'')); // £$€¤¥¢
		},
		format: function(s, table) {
			var n = ts.formatFloat((s || '').replace(/[^\w,. \-()]/g, ""), table);
			return s && typeof n === 'number' ? n : s ? $.trim( s && table.config.ignoreCase ? s.toLocaleLowerCase() : s ) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "ipAddress",
		is: function(s) {
			return (/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/).test(s);
		},
		format: function(s, table) {
			var i, a = s ? s.split(".") : '',
			r = "",
			l = a.length;
			for (i = 0; i < l; i++) {
				r += ("00" + a[i]).slice(-3);
			}
			return s ? ts.formatFloat(r, table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "url",
		is: function(s) {
			return (/^(https?|ftp|file):\/\//).test(s);
		},
		format: function(s) {
			return s ? $.trim(s.replace(/(https?|ftp|file):\/\//, '')) : s;
		},
		type: "text"
	});

	ts.addParser({
		id: "isoDate",
		is: function(s) {
			return (/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat((s !== "") ? (new Date(s.replace(/-/g, "/")).getTime() || "") : "", table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "percent",
		is: function(s) {
			return (/(\d\s?%|%\s?\d)/).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat(s.replace(/%/g, ""), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "usLongDate",
		is: function(s) {
			// two digit years are not allowed cross-browser
			// Jan 01, 2013 12:34:56 PM or 01 Jan 2013
			return (/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i).test(s) || (/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat( (new Date(s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || ''), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "shortDate", // "mmddyyyy", "ddmmyyyy" or "yyyymmdd"
		is: function(s) {
			// testing for ##-##-#### or ####-##-##, so it's not perfect; time can be included
			return (/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/).test((s || '').replace(/\s+/g," ").replace(/[\-.,]/g, "/"));
		},
		format: function(s, table, cell, cellIndex) {
			if (s) {
				var c = table.config, ci = c.headerList[cellIndex],
				format = ci.shortDateFormat;
				if (typeof format === 'undefined') {
					// cache header formatting so it doesn't getData for every cell in the column
					format = ci.shortDateFormat = ts.getData( ci, c.headers[cellIndex], 'dateFormat') || c.dateFormat;
				}
				s = s.replace(/\s+/g," ").replace(/[\-.,]/g, "/"); // escaped - because JSHint in Firefox was showing it as an error
				if (format === "mmddyyyy") {
					s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2");
				} else if (format === "ddmmyyyy") {
					s = s.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1");
				} else if (format === "yyyymmdd") {
					s = s.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3");
				}
			}
			return s ? ts.formatFloat( (new Date(s).getTime() || ''), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "time",
		is: function(s) {
			return (/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i).test(s);
		},
		format: function(s, table) {
			return s ? ts.formatFloat( (new Date("2000/01/01 " + s.replace(/(\S)([AP]M)$/i, "$1 $2")).getTime() || ""), table) : s;
		},
		type: "numeric"
	});

	ts.addParser({
		id: "metadata",
		is: function() {
			return false;
		},
		format: function(s, table, cell) {
			var c = table.config,
			p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
			return $(cell).metadata()[p];
		},
		type: "numeric"
	});

	// add default widgets
	ts.addWidget({
		id: "zebra",
		priority: 90,
		format: function(table, c, wo) {
			var $tb, $tv, $tr, row, even, time, k, l,
			child = new RegExp(c.cssChildRow, 'i'),
			b = c.$tbodies;
			if (c.debug) {
				time = new Date();
			}
			for (k = 0; k < b.length; k++ ) {
				// loop through the visible rows
				$tb = b.eq(k);
				l = $tb.children('tr').length;
				if (l > 1) {
					row = 0;
					$tv = $tb.children('tr:visible');
					// revered back to using jQuery each - strangely it's the fastest method
					/*jshint loopfunc:true */
					$tv.each(function(){
						$tr = $(this);
						// style children rows the same way the parent row was styled
						if (!child.test(this.className)) { row++; }
						even = (row % 2 === 0);
						$tr.removeClass(wo.zebra[even ? 1 : 0]).addClass(wo.zebra[even ? 0 : 1]);
					});
				}
			}
			if (c.debug) {
				ts.benchmark("Applying Zebra widget", time);
			}
		},
		remove: function(table, c, wo){
			var k, $tb,
				b = c.$tbodies,
				rmv = (wo.zebra || [ "even", "odd" ]).join(' ');
			for (k = 0; k < b.length; k++ ){
				$tb = $.tablesorter.processTbody(table, b.eq(k), true); // remove tbody
				$tb.children().removeClass(rmv);
				$.tablesorter.processTbody(table, $tb, false); // restore tbody
			}
		}
	});

})(jQuery);
