/*! tablesorter Grouping widget - updated 10/26/2014 (v2.18.0)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";
var ts = $.tablesorter;

ts.grouping = {

	types : {
		number : function(c, $column, txt, num){
			var value, word, result;
			if (num > 1 && txt !== '') {
				if ($column.hasClass(ts.css.sortAsc)) {
					result = Math.floor(parseFloat(txt)/num) * num;
				} else {
					result = Math.ceil(parseFloat(txt)/num) * num;
				}
				result += ' - ' + (result + (num - 1) * ($column.hasClass(ts.css.sortAsc) ? 1 : -1));
			} else {
				result = parseFloat(txt) || txt;
			}
			return result;
		},
		separator : function(c, $column, txt, num){
			var word = (txt + '').split(c.widgetOptions.group_separator);
			return $.trim(word[num - 1] || '');
		},
		word : function(c, $column, txt, num){
			var word = (txt + ' ').match(/\w+/g) || [];
			return word[num - 1] || '';
		},
		letter : function(c, $column, txt, num){
			return txt ? (txt + ' ').substring(0, num) : '';
		},
		date : function(c, $column, txt, part){
			var hours, hours12, minutes, ampm,
			    wo = c.widgetOptions,
			    time = new Date(txt || '');
			switch (part) {
				case 'year':	return time.getFullYear();
				case 'month':	return wo.group_months[time.getMonth()];
				case 'monthyear':	return wo.group_months[time.getMonth()] + ' ' + time.getFullYear();
				case 'day':	return wo.group_months[time.getMonth()] + ' ' + time.getDate();
				case 'week':	return wo.group_week[time.getDay()];
				case 'time':
					hours = time.getHours();
					hours12 = ('00' + (hours > 12 ? hours - 12 : (hours === 0 ? hours + 12 : hours))).slice(-2);
					minutes = ('00' + time.getMinutes()).slice(-2);
					ampm = ('00' + wo.group_time[hours >= 12 ? 1 : 0]).slice(-2);
					return hours12 + ':' + minutes + ' ' + ampm;
				default:	return wo.group_dateString(time);
			};
		}
	},

	groupHeaderHTML: function(c, wo, currentGroup) {
		return '<tr class="group-header ' + c.selectorRemove.slice(1) +
						'" unselectable="on"><td colspan="' +
						c.columns + '">' + (wo.group_collapsible ? '<i/>' : '') + '<span class="group-name">' +
						currentGroup + '</span><span class="group-count"></span></td></tr>';
	},

	update : function(table, c, wo){
		if ($.isEmptyObject(c.cache)) { return; }
		var rowIndex, tbodyIndex, currentGroup, $row, groupClass, grouping, norm_rows, saveName, direction, grouper, groupingParameter,
			group = '',
			savedGroup = false,
			column = c.sortList[0] ? c.sortList[0][0] : -1,
			$header = c.$headers.filter('[data-column="' + column + '"]:last');
		c.$table
			.find('tr.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
		if (wo.group_collapsible) {
			// clear pager saved spacer height (in case the rows are collapsed)
			c.$table.data('pagerSavedHeight', 0);
		}
		if (column >= 0 && !$header.hasClass('group-false')) {
			wo.group_currentGroup = ''; // save current groups
			wo.group_collapsedGroups = {};

			// group class finds "group-{word/separator/letter/number/date/false}-{optional:#/year/month/day/week/time}"
			groupClass = ($header.attr('class') || '').match(/(group-\w+(-\w+)?)/g);
			// grouping = [ 'group', '{word/separator/letter/number/date/false}', '{#/year/month/day/week/time}' ]
			grouping = groupClass ? groupClass[0].split('-') : ['group','letter',1]; // default to letter 1
			grouper = this.types[grouping[1]];

			// save current grouping
			if (wo.group_collapsible && wo.group_saveGroups && ts.storage) {
				wo.group_collapsedGroups = ts.storage( table, 'tablesorter-groups' ) || {};
				// include direction when grouping numbers > 1 (reversed direction shows different range values)
				direction = (grouping[1] === 'number' && grouping[2] > 1) ? 'dir' + c.sortList[0][1] : '';
				// combine column, sort direction & grouping as save key
				saveName = wo.group_currentGroup = '' + column + direction + grouping.join('');
				if (!wo.group_collapsedGroups[saveName]) {
					wo.group_collapsedGroups[saveName] = [];
				} else {
					savedGroup = true;
				}
			}
			for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++) {
				norm_rows = c.cache[tbodyIndex].normalized;
				group = ''; // clear grouping across tbodies
				for (rowIndex = 0; rowIndex < norm_rows.length; rowIndex++) {
					$row = norm_rows[rowIndex][c.columns].$row.eq(0);
					if ( $row.is(':visible') ) {
						// fixes #438
						if (grouper) {
							groupingParameter = /date/.test(groupClass) ? grouping[2] : (parseInt(grouping[2] || 1, 10) || 1);
							currentGroup = grouper(c, $header, norm_rows[rowIndex][column], groupingParameter);
							if (group !== currentGroup) {
								group = currentGroup;
								// show range if number > 1
								if ($.isFunction(wo.group_formatter)) {
									currentGroup = wo.group_formatter((currentGroup || '').toString(), column, table, c, wo) || currentGroup;
								}
								$row.before(this.groupHeaderHTML(c, wo, currentGroup));
								if (wo.group_saveGroups && !savedGroup && wo.group_collapsed && wo.group_collapsible) {
									// all groups start collapsed
									wo.group_collapsedGroups[wo.group_currentGroup].push(currentGroup);
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
				if (wo.group_saveGroups && wo.group_collapsedGroups[wo.group_currentGroup].length) {
					name = $row.find('.group-name').text().toLowerCase();
					isHidden = $.inArray( name, wo.group_collapsedGroups[wo.group_currentGroup] ) > -1;
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
			wo.group_collapsedGroups = {};
			// .on() requires jQuery 1.7+
			c.$table.on('click toggleGroup', 'tr.group-header', function(event){
				event.stopPropagation();
				var isCollapsed, $groups, indx,
					$this = $(this),
					name = $this.find('.group-name').text().toLowerCase();
				// use shift-click to toggle ALL groups
				if (event.type === 'click' && event.shiftKey) {
					$this.siblings('.group-header').trigger('toggleGroup');
				}
				$this.toggleClass('collapsed');
				// nextUntil requires jQuery 1.4+
				$this.nextUntil('tr.group-header').toggleClass('group-hidden', $this.hasClass('collapsed') );
				// save collapsed groups
				if (wo.group_saveGroups && ts.storage) {
					$groups = c.$table.find('.group-header');
					isCollapsed = $this.hasClass('collapsed');
					if (!wo.group_collapsedGroups[wo.group_currentGroup]) {
						wo.group_collapsedGroups[wo.group_currentGroup] = [];
					}
					if (isCollapsed && wo.group_currentGroup) {
						wo.group_collapsedGroups[wo.group_currentGroup].push( name );
					} else if (wo.group_currentGroup) {
						indx = $.inArray( name, wo.group_collapsedGroups[wo.group_currentGroup]  );
						if (indx > -1) {
							wo.group_collapsedGroups[wo.group_currentGroup].splice( indx, 1 );
						}
					}
					ts.storage( table, 'tablesorter-groups', wo.group_collapsedGroups );
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
			this.update(table, table.config, table.config.widgetOptions);
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
		group_count       : ' ({num})', // if not false, the "{num}" string is replaced with the number of rows in the group
		group_separator   : '-',  // group name separator; used when group-separator-# class is used.
		group_formatter   : null, // function(txt, column, table, c, wo) { return txt; }
		group_callback    : null, // function($cell, $rows, column, table){}, callback allowing modification of the group header labels
		group_complete    : 'groupingComplete', // event triggered on the table when the grouping widget has finished work

		// change these default date names based on your language preferences
		group_months      : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		group_week        : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		group_time        : [ 'AM', 'PM' ],
		// this function is used when "group-date" is set to create the date string
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
