/*! Widget: grouping - updated 10/31/2015 (v2.24.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
	'use strict';
	var ts = $.tablesorter;

	ts.grouping = {

		types : {
			number : function(c, $column, txt, num, group){
				var value, word;
				if (num > 1 && txt !== '') {
					if ($column.hasClass(ts.css.sortAsc)) {
						value = Math.floor(parseFloat(txt) / num) * num;
						return value > parseFloat(group || 0) ? value : parseFloat(group || 0);
					} else {
						value = Math.ceil(parseFloat(txt) / num) * num;
						return value < parseFloat(group || num) - value ? parseFloat(group || num) - value : value;
					}
				} else {
					word = (txt + '').match(/\d+/g);
					return word && word.length >= num ? word[num - 1] : txt || '';
				}
			},
			separator : function(c, $column, txt, num){
				var word = (txt + '').split(c.widgetOptions.group_separator);
				return $.trim(word && num > 0 && word.length >= num ? word[(num || 1) - 1] : '');
			},
			word : function(c, $column, txt, num){
				var word = (txt + ' ').match(/\w+/g);
				return word && word.length >= num ? word[num - 1] : txt || '';
			},
			letter : function(c, $column, txt, num){
				return txt ? (txt + ' ').substring(0, num) : '';
			},
			date : function(c, $column, txt, part, group){
				var year, month,
					wo = c.widgetOptions,
					time = new Date(txt || '');

				// check for valid date
				if ( time instanceof Date && isFinite( time ) ) {
					year = time.getFullYear();
					month = ts.grouping.findMonth( wo, time.getMonth() );
					return part === 'year' ? year :
						part === 'month' ? month :
						part === 'monthyear' ?  month + ' ' + year :
						part === 'day' ? month + ' ' + time.getDate() :
						part === 'week' ? ts.grouping.findWeek( wo, time.getDay() ) :
						part === 'time' ? ts.grouping.findTime( wo, time ) :
						wo.group_dateString( time, c, $column );
				} else {
					return wo.group_dateInvalid;
				}
			}
		},

		// group date type functions to allow using this widget with Globalize
		findMonth : function( wo, month ) {
			// CLDR returns an object { 1: "Jan", 2: "Feb", 3: "Mar", ..., 12: "Dec" }
			return wo.group_months[ month + ( ( wo.group_months[0] || '' ) === '' ? 1 : 0 ) ];
		},
		findWeek : function( wo, day ) {
			if ( $.isArray( wo.group_week ) ) {
				return wo.group_week[ day ];
			} else if ( !$.isEmptyObject( wo.group_week ) ) {
				// CLDR returns { sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", ... }
				var cldrWeek = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
				return wo.group_week[ cldrWeek[ day ] ];
			}
		},
		findTime : function( wo, time ) {
			var suffix,
				h = time.getHours(),
				period = h >= 12 ? 1 : 0,
				// CLDR returns { am: "AM", pm: "PM", ... }
				isObj = wo.group_time.am && wo.group_time.pm,
				hours = ( '00' + ( wo.group_time24Hour && h > 12 ? h - 12 : wo.group_time24Hour && h === 0 ? h + 12 : h ) ).slice(-2),
				min = ( '00' + time.getMinutes() ).slice(-2);
			suffix = wo.group_time[ isObj ? [ 'am', 'pm' ][ period ] : period ];
			return hours + ':' + min + ( wo.group_time24Hour ? '' : ' ' + ( suffix || '' ) );
		},

		update : function(table, c, wo){
			if ($.isEmptyObject(c.cache)) { return; }
			var rowIndex, tbodyIndex, currentGroup, $row, groupClass, grouping, norm_rows, saveName, direction, end,
				hasPager = ts.hasWidget( table, 'pager' ),
				hasSort = typeof c.sortList[0] !== 'undefined',
				group = '',
				groupIndex = 0,
				savedGroup = false,
				column = $.isArray( wo.group_forceColumn ) && typeof wo.group_forceColumn[0] !== 'undefined' ?
					( wo.group_enforceSort && !hasSort ? -1 : wo.group_forceColumn[0] ) :
					( hasSort ? c.sortList[0][0] : -1 );
			c.$table
				.find('tr.group-hidden').removeClass('group-hidden').end()
				.find('tr.group-header').remove();
			if (wo.group_collapsible) {
				// clear pager saved spacer height (in case the rows are collapsed)
				c.$table.data('pagerSavedHeight', 0);
			}
			if (column >= 0 && column < c.columns && !c.$headerIndexed[column].hasClass('group-false')) {
				wo.group_currentGroup = ''; // save current groups
				wo.group_currentGroups = {};

				// group class finds 'group-{word/separator/letter/number/date/false}-{optional:#/year/month/day/week/time}'
				groupClass = (c.$headerIndexed[column].attr('class') || '').match(/(group-\w+(-\w+)?)/g);
				// grouping = [ 'group', '{word/separator/letter/number/date/false}', '{#/year/month/day/week/time}' ]
				grouping = groupClass ? groupClass[0].split('-') : [ 'group', 'letter', 1 ]; // default to letter 1

				// save current grouping
				if (wo.group_collapsible && wo.group_saveGroups && ts.storage) {
					wo.group_currentGroups = ts.storage( table, 'tablesorter-groups' ) || {};
					// include direction when saving groups (reversed numbers shows different range values)
					direction = 'dir' + c.sortList[0][1];
					// combine column, sort direction & grouping as save key
					saveName = wo.group_currentGroup = '' + c.sortList[0][0] + direction + grouping.join('');
					if (!wo.group_currentGroups[saveName]) {
						wo.group_currentGroups[saveName] = [];
					} else {
						savedGroup = true;
					}
				}
				for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++) {
					norm_rows = c.cache[tbodyIndex].normalized;
					group = ''; // clear grouping across tbodies
					rowIndex = hasPager ? c.pager.startRow - 1 : 0;
					end = hasPager ? c.pager.endRow : norm_rows.length;
					for ( ; rowIndex < end; rowIndex++ ) {
						$row = norm_rows[ rowIndex ][ c.columns ].$row;
						if ( $row.is(':visible') ) {
							// fixes #438
							if (ts.grouping.types[grouping[1]]) {
								currentGroup = norm_rows[rowIndex] ?
									ts.grouping.types[grouping[1]]( c, c.$headerIndexed[column], norm_rows[rowIndex][column], /date/.test(groupClass) ?
									grouping[2] : parseInt(grouping[2] || 1, 10) || 1, group ) : currentGroup;
								if (group !== currentGroup) {
									group = currentGroup;
									// show range if number > 1
									if (grouping[1] === 'number' && grouping[2] > 1 && currentGroup !== '') {
										currentGroup += ' - ' + (parseInt(currentGroup, 10) +
											((parseInt(grouping[2], 10) - 1) * (c.$headerIndexed[column].hasClass(ts.css.sortAsc) ? 1 : -1)));
									}
									if ($.isFunction(wo.group_formatter)) {
										currentGroup = wo.group_formatter((currentGroup || '').toString(), column, table, c, wo) || currentGroup;
									}
									$row.before('<tr class="group-header ' + c.selectorRemove.slice(1) +
										'" unselectable="on" ' + ( c.tabIndex ? 'tabindex="0" ' : '' ) + 'data-group-index="' +
										( groupIndex++ ) + '"><td colspan="' + c.columns + '">' +
										( wo.group_collapsible ? '<i/>' : '' ) +
										'<span class="group-name">' + currentGroup + '</span>' +
										'<span class="group-count"></span></td></tr>');
									if (wo.group_saveGroups && !savedGroup && wo.group_collapsed && wo.group_collapsible) {
										// all groups start collapsed
										wo.group_currentGroups[wo.group_currentGroup].push(currentGroup);
									}
								}
							}
						}
					}
				}
				c.$table.find('tr.group-header')
				.bind('selectstart', false)
				.each(function(){
					var isHidden, $label, name,
						$row = $(this),
						$rows = $row.nextUntil('tr.group-header').filter(':visible');
					if (wo.group_count || $.isFunction(wo.group_callback)) {
						$label = $row.find('.group-count');
						if ($label.length) {
							if (wo.group_count) {
								$label.html( wo.group_count.replace(/\{num\}/g, $rows.length) );
							}
							if ($.isFunction(wo.group_callback)) {
								wo.group_callback($row.find('td'), $rows, column, table);
							}
						}
					}
					if (wo.group_saveGroups && !$.isEmptyObject(wo.group_currentGroups) && wo.group_currentGroups[wo.group_currentGroup].length) {
						name = $row.find('.group-name').text().toLowerCase() + $row.attr('data-group-index');
						isHidden = $.inArray( name, wo.group_currentGroups[wo.group_currentGroup] ) > -1;
						$row.toggleClass('collapsed', isHidden);
						$rows.toggleClass('group-hidden', isHidden);
					} else if (wo.group_collapsed && wo.group_collapsible) {
						$row.addClass('collapsed');
						$rows.addClass('group-hidden');
					}
				});
				c.$table.trigger(wo.group_complete);
			}
		},

		bindEvents : function(table, c, wo){
			if (wo.group_collapsible) {
				wo.group_currentGroups = [];
				// .on() requires jQuery 1.7+
				c.$table.on('click toggleGroup keyup', 'tr.group-header', function(event){
					event.stopPropagation();
					// pressing enter will toggle the group
					if (event.type === 'keyup' && event.which !== 13) { return; }
					var isCollapsed, $groups, indx,
						$this = $(this),
						name = $this.find('.group-name').text().toLowerCase() + $this.attr('data-group-index');
					// use shift-click to toggle ALL groups
					if (event.shiftKey && (event.type === 'click' || event.type === 'keyup')) {
						$this.siblings('.group-header').trigger('toggleGroup');
					}
					$this.toggleClass('collapsed');
					// nextUntil requires jQuery 1.4+
					$this.nextUntil('tr.group-header').toggleClass('group-hidden', $this.hasClass('collapsed') );
					// save collapsed groups
					if (wo.group_saveGroups && ts.storage) {
						$groups = c.$table.find('.group-header');
						isCollapsed = $this.hasClass('collapsed');
						if (!wo.group_currentGroups[wo.group_currentGroup]) {
							wo.group_currentGroups[wo.group_currentGroup] = [];
						}
						if (isCollapsed && wo.group_currentGroup) {
							wo.group_currentGroups[wo.group_currentGroup].push( name );
						} else if (wo.group_currentGroup) {
							indx = $.inArray( name, wo.group_currentGroups[wo.group_currentGroup]  );
							if (indx > -1) {
								wo.group_currentGroups[wo.group_currentGroup].splice( indx, 1 );
							}
						}
						ts.storage( table, 'tablesorter-groups', wo.group_currentGroups );
					}
				});
			}
			$(wo.group_saveReset).on('click', function(){
				ts.grouping.clearSavedGroups(table);
			});
			c.$table.on('pagerChange.tsgrouping', function(){
				ts.grouping.update(table, c, wo);
			});
		},

		clearSavedGroups: function(table){
			if (table && ts.storage) {
				ts.storage(table, 'tablesorter-groups', '');
				ts.grouping.update(table, table.config, table.config.widgetOptions);
			}
		}

	};

	ts.addWidget({
		id: 'group',
		priority: 100,
		options: {
			group_collapsible : true, // make the group header clickable and collapse the rows below it.
			group_collapsed   : false, // start with all groups collapsed
			group_saveGroups  : true, // remember collapsed groups
			group_saveReset   : null, // element to clear saved collapsed groups
			group_count       : ' ({num})', // if not false, the '{num}' string is replaced with the number of rows in the group
			group_separator   : '-',  // group name separator; used when group-separator-# class is used.
			group_formatter   : null, // function(txt, column, table, c, wo) { return txt; }
			group_callback    : null, // function($cell, $rows, column, table){}, callback allowing modification of the group header labels
			group_complete    : 'groupingComplete', // event triggered on the table when the grouping widget has finished work

			// apply the grouping widget only to selected column
			group_forceColumn : [],   // only the first value is used; set as an array for future expansion
			group_enforceSort : true, // only apply group_forceColumn when a sort is applied to the table

			// checkbox parser text used for checked/unchecked values
			group_checkbox    : [ 'checked', 'unchecked' ],
			// change these default date names based on your language preferences
			group_months      : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
			group_week        : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
			group_time        : [ 'AM', 'PM' ],

			// use 12 vs 24 hour time
			group_time24Hour  : false,
			// group header text added for invalid dates
			group_dateInvalid : 'Invalid Date',

			// this function is used when 'group-date' is set to create the date string
			// you can just return date, date.toLocaleString(), date.toLocaleDateString() or d.toLocaleTimeString()
			// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Conversion_getter
			group_dateString  : function(date) { return date.toLocaleString(); }
		},
		init: function(table, thisWidget, c, wo){
			ts.grouping.bindEvents(table, c, wo);
		},
		format: function(table, c, wo) {
			ts.grouping.update(table, c, wo);
		},
		remove : function(table, c, wo){
			c.$table
				.off('click', 'tr.group-header')
				.off('pagerChange.tsgrouping')
				.find('.group-hidden').removeClass('group-hidden').end()
				.find('tr.group-header').remove();
		}
	});

})(jQuery);
