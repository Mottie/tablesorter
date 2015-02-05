/*! tablesorter Formatter widget - 2/4/2015 (v2.18.5)
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * by Rob Garrison
 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
'use strict';
	var ts = $.tablesorter;

	ts.formatter = {
		init : function( c ) {
			var events = $.trim( c.widgetOptions.formatter_event ) + ' pagerComplete updateComplete '
				.split(' ').join('.tsformatter ');
			c.$table.on( events, function() {
				ts.formatter.setup( c );
			});
			ts.formatter.setup( c );
		},
		setup : function( c ) {
			// do nothing for empty tables
			if ( $.isEmptyObject( c.cache ) ) { return; }
			var $tbody, tbodyIndex, rowIndex, rows, len, column, formatter,
				wo = c.widgetOptions,
				data = { config: c, wo: wo };
			for ( tbodyIndex = 0; tbodyIndex < c.$tbodies.length; tbodyIndex++ ){
				$tbody = ts.processTbody( c.table, c.$tbodies.eq( tbodyIndex ), true ); // detach tbody
				rows = c.cache[ tbodyIndex ];
				len = rows.normalized.length;
				for ( rowIndex = 0; rowIndex < len; rowIndex++ ) {
					data.$row = rows.normalized[ rowIndex ][ c.columns ].$row;
					for ( column = 0; column < c.columns; column++ ) {
						formatter = ts.getColumnData( c.table, wo.formatter_column, column );
						if ( typeof formatter === 'function' ) {
							data.columnIndex = column;
							data.$header = c.$headers.filter('[data-column="' + column + '"]:last');
							data.$cell = data.$row.children( 'th, td' ).eq( column );
							// get text from attribute first, just in case we're updating
							data.text = data.$cell.attr( c.textAttribute ) || data.$cell[0].textContent || data.$cell.text();
							data.$cell.html( formatter( data.text, data ) );
						}
					}
				}
				ts.processTbody( c.table, $tbody, false); // restore tbody
			}
		}
	};

	ts.addWidget({
		id: 'formatter',
		priority: 100,
		options: {
			formatter_column : {},
			formatter_event  : 'applyFormatter'
		},
		init: function( table ) {
			ts.formatter.init( table.config );
		}
	});

})( jQuery );
