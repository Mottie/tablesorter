/*! Parser: jQuery Globalize - updated 5/17/2015 (v2.22.0) */
/* Extract localized data using jQuery's Globalize parsers; set
 Globalize.locale( 'xx' ) prior to initializing tablesorter! */
/*jshint jquery:true */
;( function( $ ) {
'use strict';

	/*! jQuery Globalize date parser (https://github.com/jquery/globalize#date-module) */
	/* demo: http://jsfiddle.net/Mottie/0j18Lw8r/ */
	$.tablesorter.addParser({
		id: 'globalize-date',
		is: function () {
			return false;
		},
		format: function ( str, table, cell, cellIndex ) {
			var c = table.config,
			// add options to 'config.globalize' for all columns --> globalize : { skeleton: 'GyMMMd' }
			// or per column by using the column index --> globalize : { 0 : { datetime: 'medium' } }
			options = c.globalize && ( c.globalize[ cellIndex ] || c.globalize ) || {},
			date = Globalize && Globalize.dateParser ? Globalize.dateParser( options )( str ) :
				str ? new Date( str ) : str;
			return date instanceof Date && isFinite( date ) ? date.getTime() : str;
		},
		type: 'numeric'
	});

	/*! jQuery Globalize number parser (https://github.com/jquery/globalize#number-module) */
	/* demo: http://jsfiddle.net/Mottie/0j18Lw8r/ */
	$.tablesorter.addParser({
		id: 'globalize-number',
		is: function () {
			return false;
		},
		format: function ( str, table, cell, cellIndex ) {
			var c = table.config,
			// add options to 'config.globalize' for all columns --> globalize : { skeleton: 'GyMMMd' }
			// or per column by using the column index --> globalize : { 0 : { datetime: 'medium' } }
			options = c.globalize && ( c.globalize[ cellIndex ] || c.globalize ) || {},
			num = Globalize && Globalize.numberParser ? Globalize.numberParser( options )( str ) :
				str ? $.tablesorter.formatFloat( ( str || '' ).replace( /[^\w,. \-()]/g, '' ), table ) : str;
			return str && typeof num === 'number' ? num : str;
		},
		type: 'numeric'
	});

})( jQuery );
