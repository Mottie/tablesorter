/* Chart widget (beta) for TableSorter 1/27/2015 (v2.19.0)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 */

/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */

;(function($){
"use strict";

var ts = $.tablesorter,

chart = ts.chart = {

	event: 'chartData',

	chartdata: [],
	cols: [],
	headers: [],
	rows: [],

	init: function(c, wo) {
		c.$table
			.off(chart.event)
			.on(chart.event, function() {
				chart.getCols(c, wo);
				chart.getData(c, wo);
			});
	},

	getCols: function(c, wo) {
		chart.cols = [];

		for(var i = 0; i < c.columns; i++) {
			if (wo.chart_useSelector &&
			    $.inArray('columnSelector', c.widgets) !== -1 &&
			    c.selector.auto === false
			) {
				if ((c.selector.states[i] === true && $.inArray(i, wo.chart_ignoreColumns) === -1) ||
				    i == wo.chart_labelCol ||
				    i == wo.chart_sort[0][0]
				) {
					chart.cols.push(i);
				}
			} else {
				if ($.inArray(i, wo.chart_ignoreColumns) === -1 ||
				    i == wo.chart_labelCol ||
				    i == wo.chart_sort[0][0]
				) {
					chart.cols.push(i);
				}
			}
		}
	},

	getData: function(c, wo) {
		chart.getHeaders(c, wo);
		chart.getRows(c, wo);

		chart.chartdata = [
			chart.headers
		];
 
		$.each(chart.rows, function(k, row) {
			chart.chartdata.push(row);
		});
 
		c.chart = {
			data: chart.chartdata
		};
	},

	getHeaders: function(c, wo) {
		chart.headers = [];
		chart.headers.push(c.headerContent[wo.chart_labelCol]);
		$.each(chart.cols, function(k, col) {
			if (col == wo.chart_labelCol) {
				return true;
			}

			chart.headers.push(c.headerContent[col]);
		});
	},
 
	getRows: function(c, wo) {
		var $table = c.$table;
		// the cache may not have a zero index if there are any
		// "info-only" tbodies above the main tbody
		var cache = c.cache[0].normalized;
		var rows = {};
		chart.rows = [];

		$.each(cache, function(k, v) {
			var $tr = v[c.columns].$row;
			var cells = $tr.find('td');
			var row = [];
			if ((wo.chart_incRows == 'visible' && $tr.is(':visible')) ||
			    (wo.chart_incRows == 'filtered' && $tr.hasClass(wo.filter_filteredRow || 'filtered')) ||
			    (wo.chart_incRows != 'visible' && wo.chart_incRows != 'filtered')
			) {
				// Add all cols (don't mess up indx for sorting)
				for(var i = 0; i < c.columns; i++) {
					if ($.inArray(k, wo.chart_parsed) !== -1) {
						row.push(v[i]);
					} else {
						row.push($(cells[i]).text().trim());
					}
				}

				rows[row[wo.chart_sort[0][0]]] = row;
			}
		});

		var order = Object.keys(rows);
		if (wo.chart_sort[0][1] == 1) {
			order.reverse();
		}

		$.each(order, function(kk, rowkey) {
			var row = [];
			var label = rows[rowkey][wo.chart_labelCol];

			row.push(String(label));

			$.each(rows[rowkey], function(k, cell) {
				if (k == wo.chart_labelCol) {
					return true;
				}

				var thiscell = false;

				if (wo.chart_useSelector &&
				    $.inArray('columnSelector', c.widgets) !== -1 &&
				    c.selector.auto === false
				) {
					if (c.selector.states[k] === true &&
					    $.inArray(k, wo.chart_ignoreColumns) === -1
					) {
						thiscell = cell;
					}
				} else {
					if ($.inArray(k, wo.chart_ignoreColumns) === -1) {
						thiscell = cell;
					}
				}

				if (thiscell !== false) {
					if (wo.chart_layout[row.length] == 'string') {
						row.push(String(thiscell));
					} else {
						row.push(parseFloat(thiscell));
					}
				}
			});

			chart.rows.push(row);
		});
	},

	remove: function(c) {
		c.$table.off(chart.event);
	}
};

ts.addWidget({
	id: 'chart',
	options: {
		// all, visible or filtered
		chart_incRows: 'filtered',
		// prefer columnSelector for ignoreColumns
		chart_useSelector: false,
		// columns to ignore [0, 1,... ] (zero-based index)
		chart_ignoreColumns: [],
		// Use parsed data instead of cell.text()
		chart_parsed: [],
		// data output layout, int is default
		chart_layout: {
			// first element is a string, all others will be float
			0: 'string'
		},
		// Set the label column
		chart_labelCol: 0,
		// data sort, shoudl always be first row, might want [[0,1]]
		chart_sort: [[0,0]]
	},

	init: function(table, thisWidget, c, wo) {
		chart.init(c, wo);
	},

	remove: function(table, c, wo) {
		chart.remove(c);
	}
});

})(jQuery);
