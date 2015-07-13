/*! Widget: sort2Hash */
;( function( $ ) {
'use strict';
var ts = $.tablesorter || {},
s2h = {
	init : function( c, wo ) {
		var arry, indx, len, column, direction,
			sort = s2h.getSort( c, wo );
		if (sort) {
			arry = sort.split( wo.sort2Hash_separator );
			len = arry.length;
			sort = [];
			for ( indx = 0; indx < len; indx++ ) {
				column = arry[ indx++ ];
				direction = arry[ indx ];
				// ignore unpaired values
				if ( typeof direction !== 'undefined' ) {
					sort.push( [ column, direction ] );
				}
			}
			if ( sort.length ) {
				c.sortList = sort;
			}
		}
		c.$table.on( 'sortEnd.sort2hash', function() {
			s2h.setHash( c, wo );
		});
	},
	getTableId : function( c, wo ) {
		// option > table id > table index on page
		return wo.sort2Hash_tableId ||
			c.table.id ||
			'table' + $( 'table' ).index( c.$table );
	},
	getSort : function( c, wo, clean ) {
		// modified original code from http://www.netlobo.com/url_query_string_javascript.html
		var name = s2h.getTableId( c, wo ).replace( /[\[]/, '\\[' ).replace( /[\]]/, '\\]' ),
			sort = ( new RegExp( '[\\#&]' + name + '=([^&]*)' ) ).exec( window.location.hash );
		if ( sort === null ) {
			return '';
		} else {
			if ( clean ) {
				window.location.hash = window.location.hash.replace( '&' + name + '=' + sort[ 1 ], '' );
			}
			return sort[ 1 ];
		}
	},
	setHash : function( c, wo ) {
		var hash, indx,
			arry = [],
			tableId = s2h.getTableId( c, wo ) + '=',
			sort = c.sortList || [],
			len = sort.length;
		if ( len ) {
			s2h.getSort( c, wo, true ); // remove hash
			window.location.hash += ( window.location.hash.length ? '' : wo.sort2Hash_hash ) +
				 '&' + tableId +
				// flatten array, then join with separator
				[].concat.apply( [], sort ).join( wo.sort2Hash_separator );
		}
	}
};

ts.addWidget({
	id: 'sort2Hash',
	options: {
		sort2Hash_hash      : '#', // hash prefix
		sort2Hash_separator : '-', // don't '#' or '=' here
		sort2Hash_tableId   : null // this option > table ID > table index on page
	},
	init: function(table, thisWidget, c, wo) {
		s2h.init( c, wo );
	},
	remove: function(table, c) {
		c.$table.off( 'sortEnd.sort2hash' );
	}
});

})(jQuery);
