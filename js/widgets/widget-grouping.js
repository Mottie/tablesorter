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
	_columnDirection: function($column){
		if ($column.hasClass(ts.css.sortAsc)) {
			return 0;
		} else if ($column.hasClass(ts.css.sortDesc)) {
			return 1;
		} else {
			return 2;
		}
	},

	grouperConstructors: {

	},

	// grouper is a:
	// {
	// 	grouperId: function(){ return <grouper saving key>; },
	// 	rowGroup: function(normRow){ return <group name>; },
	// }
	//
	// grouperConstructor is a function of arbitrary arguments, returning a grouper.
	// If it has such an arglist: function(c, $column, groupingParameter),
	// then grouper can be instantiated automatically from column by columnGrouper.
	// All you need is to specify header class group-<grouperType>-<groupingPrameter>
	addGrouperConstructor: function(grouperType, grouperConstructor) {
		var grouperHash = {};
		grouperHash[grouperType] = grouperConstructor;
		$.extend(this.grouperConstructors, grouperHash);
	},

	columnGrouper: function(c, $column) {
		// group class finds "group-{word/separator/letter/number/date/false}-{optional:#/year/month/day/week/time}"
		var groupClass = ($column.attr('class') || '').match(/(group-\w+(-\w+)?)/g),
		    // grouping = [ 'group', '{word/separator/letter/number/date/false}', '{#/year/month/day/week/time}' ]
		    grouping = groupClass ? groupClass[0].split('-') : ['group','letter',1], // default to letter 1
		    groupingType = grouping[1],
		    groupingParameter = (groupingType === 'date') ? grouping[2] : (parseInt(grouping[2] || 1, 10) || 1),
		    grouperConstructor = this.grouperConstructors[groupingType];
		return grouperConstructor && grouperConstructor(c, $column, groupingParameter);
	},

	groupHeaderHTML: function(c, wo, currentGroup) {
		return '<tr class="group-header ' + c.selectorRemove.slice(1) +
						'" unselectable="on"><td colspan="' +
						c.columns + '">' + (wo.group_collapsible ? '<i/>' : '') + '<span class="group-name">' +
						currentGroup + '</span><span class="group-count"></span></td></tr>';
	},

	_insertGroupHeaders: function(table, c, wo, grouper, column) {
		var rowIndex, tbodyIndex, currentGroup, $row, norm_rows,
			group = '',
			savedGroup = false;

		wo.group_currentGroup = ''; // save current groups
		wo.group_collapsedGroups = {};

		// save current grouping
		if (wo.group_collapsible && wo.group_saveGroups && ts.storage) {
			wo.group_collapsedGroups = ts.storage( table, 'tablesorter-groups' ) || {};
			// combine column, sort direction & grouping as save key
			wo.group_currentGroup = grouper.grouperId();
			if (!wo.group_collapsedGroups[wo.group_currentGroup]) {
				wo.group_collapsedGroups[wo.group_currentGroup] = [];
			} else {
				savedGroup = true;
			}
		}

		for (tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++) {
			norm_rows = c.cache[tbodyIndex].normalized;
			group = ''; // clear grouping across tbodies
			for (rowIndex = 0; rowIndex < norm_rows.length; rowIndex++) {
				$row = norm_rows[rowIndex][c.columns].$row.eq(0);
				if ( !$row.is(':visible') ) { continue; }

				currentGroup = grouper.rowGroup(norm_rows[rowIndex]);
				if (group !== currentGroup) {
					group = currentGroup;
					if ($.isFunction(wo.group_formatter)) {
						currentGroup = wo.group_formatter((currentGroup || '').toString(), column, table, c, wo) || currentGroup;
					}
					$row.before(this.groupHeaderHTML(c, wo, currentGroup));
					if (wo.group_saveGroups && !savedGroup && wo.group_collapsed && wo.group_collapsible) {
						// all groups start collapsed (when saveGroup is false it is processed in _collapseGroupHeaderIfNecessary separately)
						wo.group_collapsedGroups[wo.group_currentGroup].push(currentGroup);
					}
				}
			}
		}
	},

	_markupGroupHeader: function(table, wo, column, $headerRow, $groupRows) {
		var $label;
		if (wo.group_count || $.isFunction(wo.group_callback)) {
			$label = $headerRow.find('.group-count');
			if ($label.length) {
				if (wo.group_count) {
					$label.html( wo.group_count.replace(/\{num\}/g, $groupRows.length) );
				}
				if ($.isFunction(wo.group_callback)) {
					wo.group_callback($headerRow.find('td'), $groupRows, column, table);
				}
			}
		}
	},
	_collapseGroupHeaderIfNecessary: function(table, wo, $headerRow, $groupRows) {
		var isHidden, name;
		if (wo.group_saveGroups && wo.group_collapsedGroups[wo.group_currentGroup].length) {
			name = $headerRow.find('.group-name').text().toLowerCase();
			isHidden = $.inArray( name, wo.group_collapsedGroups[wo.group_currentGroup] ) > -1;
			$headerRow.toggleClass('collapsed', isHidden);
			$groupRows.toggleClass('group-hidden', isHidden);
		} else if (wo.group_collapsed && wo.group_collapsible) {
			$headerRow.addClass('collapsed');
			$groupRows.addClass('group-hidden');
		}
	},
	_processGroupHeaders: function(table, c, wo, column) {
		c.$table.find('tr.group-header')
		.bind('selectstart', false)
		.each(function(){
			var $headerRow = $(this),
			    $groupRows = $headerRow.nextUntil('tr.group-header').filter(':visible');
			ts.grouping._markupGroupHeader(table, wo, column, $headerRow, $groupRows);
			ts.grouping._collapseGroupHeaderIfNecessary(table, wo, $headerRow, $groupRows);
		});
	},

	update : function(table, c, wo){
		if ($.isEmptyObject(c.cache)) { return; }
		var $header, grouper,
		    column = c.sortList[0] ? c.sortList[0][0] : -1;
		c.$table
			.find('tr.group-hidden').removeClass('group-hidden').end()
			.find('tr.group-header').remove();
		if (wo.group_collapsible) {
			// clear pager saved spacer height (in case the rows are collapsed)
			c.$table.data('pagerSavedHeight', 0);
		}
		if (column < 0) { return; }

		$header = c.$headerIndexed[column];
		grouper = this.columnGrouper(c, $header);

		if (column >= 0 && !$header.hasClass('group-false') && grouper) {
			this._insertGroupHeaders(table, c, wo, grouper, column);
			this._processGroupHeaders(table, c, wo, column);
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
	},
};

ts.grouping.addGrouperConstructor('number', function(c, $column, num){
	var colIndex = $column.data('column');
	num = num || 1;
	if (num == 1) {
		return {
			rowGroup: function(normRow) {
				var txt = normRow[colIndex];
				return parseFloat(txt) || txt;
			},
			grouperId: function() { return '' + colIndex + 'groupnumber1'; },
		};
	} else {
		return {
			rowGroup: function(normRow) {
				var result,
				    txt = normRow[colIndex];
				if (txt === '') { return ''; }
				if ($column.hasClass(ts.css.sortAsc)) {
					result = Math.floor(parseFloat(txt)/num) * num;
				} else {
					result = Math.ceil(parseFloat(txt)/num) * num;
				}
				// show range if number > 1
				return result + ' - ' + (result + (num - 1) * ($column.hasClass(ts.css.sortAsc) ? 1 : -1));
			},
			// include direction in ID when grouping numbers > 1 (so reversed direction shows different range values)
			grouperId: function() { return '' + colIndex + 'dir' + ts.grouping._columnDirection($column) +'groupnumber' + num;	},
		};
	}
});

ts.grouping.addGrouperConstructor('separator', function(c, $column, num){
	var colIndex = $column.data('column');
	num = num || 1;
	return {
		rowGroup: function(normRow) {
			var word = (normRow[colIndex] + '').split(c.widgetOptions.group_separator);
			return $.trim(word[num - 1] || '');
		},
		grouperId: function() { return '' + colIndex + 'groupseparator' + num; }
	};
});

ts.grouping.addGrouperConstructor('text', function(c, $column){
	var colIndex = $column.data('column');
	return {
		rowGroup: function(normRow) { return normRow[colIndex] + ''; },
		grouperId: function() { return '' + colIndex + 'grouptext'; }
	};
});

ts.grouping.addGrouperConstructor('word', function(c, $column, num){
	var colIndex = $column.data('column');
	num = num || 1;
	return {
		rowGroup: function(normRow) {
			var txt = normRow[colIndex],
					word = (txt + ' ').match(/\w+/g) || [];
			return word[num - 1] || '';
		},
		grouperId: function() { return '' + colIndex + 'groupword' + num; }
	};
});

ts.grouping.addGrouperConstructor('letter', function(c, $column, num){
	var colIndex = $column.data('column');
	num = num || 1;
	return {
		rowGroup: function(normRow) {
			var txt = normRow[colIndex];
			return txt ? (txt + ' ').substring(0, num) : '';
		},
		grouperId: function() { return '' + colIndex + 'groupletter' + num; }
	};
});

ts.grouping.addGrouperConstructor('date', function(c, $column, part){
	var wo = c.widgetOptions,
			colIndex = $column.data('column');
	return {
		rowGroup: function(normRow) {
			var hours, hours12, minutes, ampm,
					txt = normRow[colIndex],
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
				default:					return wo.group_dateString(time);
			}
		},
		grouperId: function() { return '' + colIndex + 'groupdate' + part; }
	};
});


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
