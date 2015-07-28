/*! Widget: sort2Hash - updated 7/28/2015 (v2.22.4) */
;( function( $ ) {
	'use strict';
	var ts = $.tablesorter || {},
	s2h = {
		init : function( c, wo ) {
			var hasSaveSort = ts.hasWidget( c.table, 'saveSort' ),
				sort = s2h.getSort( c, wo );
			if ( ( sort && !hasSaveSort ) || ( sort && hasSaveSort && wo.sort2Hash_overrideSaveSort ) ) {
				s2h.processHash( c, wo, sort );
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
			var value,
				name = s2h.getTableId( c, wo ).replace( /[\[]/, '\\[' ).replace( /[\]]/, '\\]' ),
				sort = ( new RegExp( '[\\#&]' + name + '=([^&]*)' ) ).exec( window.location.hash );
			if ( sort === null ) {
				return '';
			} else {
				value = s2h.processSort( c, wo, sort[ 1 ] );
				if ( clean ) {
					window.location.hash = window.location.hash.replace( '&' + name + '=' + sort[ 1 ], '' );
					return value;
				}
				return sort[ 1 ];
			}
		},
		// convert 'first%20name,asc,last%20name,desc' into [[0,0], [1,1]]
		processHash : function( c, wo, sortHash ) {
			var regex, column, direction, temp,
				arry = decodeURI( sortHash || '' ).split( wo.sort2Hash_separator ),
				indx = 0,
				len = arry.length,
				sort = [];
			while ( indx < len ) {
				// column index or text
				column = arry[ indx++ ];
				temp = parseInt( column, 10 );
				// ignore wo.sort2Hash_useHeaderText setting &
				// just see if column contains a number
				if ( isNaN( temp ) || temp > c.columns ) {
					regex = new RegExp( '(' + column + ')', 'i' );
					column = c.$headers.filter( function( index ) {
						return regex.test( c.$headers[ index ].textContent || '' );
					}).attr( 'data-column' );
				}
				direction = arry[ indx++ ];
				// ignore unpaired values
				if ( typeof direction !== 'undefined' ) {
					// convert text to 0, 1
					if ( isNaN( direction ) ) {
						// default to ascending sort
						direction = direction.indexOf( wo.sort2Hash_directionText[ 1 ] ) > -1 ? 1 : 0;
					}
					sort.push( [ column, direction ] );
				}
			}
			if ( sort.length ) {
				c.sortList = sort;
			}
		},

		// convert [[0,0],[1,1]] to 'first%20name,asc,last%20name,desc'
		processSort : function( c, wo ) {
			var index, txt, column, direction,
				sort = [],
				arry = c.sortList || [],
				len = arry.length;
			for ( index = 0; index < len; index++ ) {
				column = arry[ index ][ 0 ];
				if ( wo.sort2Hash_useHeaderText ) {
					txt = $.trim( c.$headerIndexed[ column ].text() );
					if ( typeof wo.sort2Hash_processHeaderText === 'function' ) {
						txt = wo.sort2Hash_processHeaderText( txt, c, column );
					}
					column = txt;
				}
				sort.push( column );
				direction = wo.sort2Hash_directionText[ arry[ index ][ 1 ] ];
				sort.push( direction );

			}
			// join with separator
			return sort.join( wo.sort2Hash_separator );
		},
		setHash : function( c, wo ) {
			var sort = s2h.processSort( c, wo );
			if ( sort.length ) {
				// remove old hash
				s2h.getSort( c, wo, true );
				window.location.hash += ( window.location.hash.length ? '' : wo.sort2Hash_hash ) +
					 '&' + s2h.getTableId( c, wo ) + '=' + encodeURI( sort );
			}
		}
	};

	ts.addWidget({
		id: 'sort2Hash',
		priority: 30, // after saveSort
		options: {
			sort2Hash_hash              : '#',      // hash prefix
			sort2Hash_separator         : '-',      // don't '#' or '=' here
			sort2Hash_tableId           : null,     // this option > table ID > table index on page,
			sort2Hash_useHeaderText     : false,    // use column header text (true) or zero-based column index
			sort2Hash_processHeaderText : null,     // function( text, config, columnIndex ) {},
			sort2Hash_directionText     : [ 0, 1 ], // [ 'asc', 'desc' ],
			sort2Hash_overrideSaveSort  : false     // if true, override saveSort widget if saved sort available
		},
		init: function(table, thisWidget, c, wo) {
			s2h.init( c, wo );
		},
		remove: function(table, c) {
			c.$table.off( 'sortEnd.sort2hash' );
		}
	});

})(jQuery);
