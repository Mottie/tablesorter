/*! Parser: input & select - updated 5/17/2015 (v2.22.0) *//*
 * for jQuery 1.7+ & tablesorter 2.7.11+
 * Demo: http://mottie.github.com/tablesorter/docs/example-widget-grouping.html
 */
/*jshint browser: true, jquery:true, unused:false */
;( function( $ ) {
'use strict';

	var updateServer = function( event, $table, $input ) {
		// do something here to update your server, if needed
		// event = change event object
		// $table = jQuery object of the table that was just updated
		// $input = jQuery object of the input or select that was modified
	};

	// Custom parser for parsing input values
	// updated dynamically using the 'change' function below
	$.tablesorter.addParser({
		id : 'inputs',
		is : function() {
			return false;
		},
		format : function( txt, table, cell ) {
			var $input = $( cell ).find( 'input' );
			return $input.length ? $input.val() : txt;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	$.tablesorter.addParser({
		id : 'inputs-numeric',
		is : function() {
			return false;
		},
		format : function( txt, table, cell ) {
			var $input = $( cell ).find( 'input' );
			var val = $input.length ? $input.val() : txt,
				num = $.tablesorter.formatFloat( ( val || '' ).replace( /[^\w,. \-()]/g, '' ), table );
			return txt && typeof num === 'number' ? num :
				txt ? $.trim( txt && table.config.ignoreCase ? txt.toLocaleLowerCase() : txt ) : txt;
		},
		parsed : true, // filter widget flag
		type : 'numeric'
	});

	// Custom parser for including checkbox status if using the grouping widget
	// updated dynamically using the 'change' function below
	$.tablesorter.addParser({
		id : 'checkbox',
		is : function() {
			return false;
		},
		format : function( txt, table, cell, cellIndex ) {
			var $cell = $( cell ),
				wo = table.config.widgetOptions,
				// returning plain language here because this is what is shown in the
				// group headers - change it as desired
				status = wo.group_checkbox ? wo.group_checkbox : [ 'checked', 'unchecked' ],
				$input = $cell.find( 'input[type="checkbox"]' ),
				isChecked = $input.length ? $input[ 0 ].checked : '';
			// adding class to row, indicating that a checkbox is checked; includes
			// a column index in case more than one checkbox happens to be in a row
			$cell.closest( 'tr' ).toggleClass( 'checked checked-' + cellIndex, isChecked );
			return $input.length ? status[ isChecked ? 0 : 1 ] : txt;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	// Custom parser which returns the currently selected options
	// updated dynamically using the 'change' function below
	$.tablesorter.addParser({
		id : 'select',
		is : function() {
			return false;
		},
		format : function( txt, table, cell ) {
			var $select = $( cell ).find( 'select' );
			return $select.length ? $select.val() : txt;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	// Select parser to get the selected text
	$.tablesorter.addParser({
		id : 'select-text',
		is : function() {
			return false;
		},
		format : function( txt, table, cell ) {
			var $select = $( cell ).find( 'select' );
			return $select.length ? $select.find( 'option:selected' ).text() || '' : txt;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	// Custom parser for parsing textarea values
	// updated dynamically using the 'change' function below
	$.tablesorter.addParser({
		id : 'textarea',
		is : function() {
			return false;
		},
		format : function( txt, table, cell ) {
			var $textarea = $( cell ).find( 'textarea' );
			return $textarea.length ? $textarea.val() : txt;
		},
		parsed : true, // filter widget flag
		type : 'text'
	});

	// update select and all input types in the tablesorter cache when the change event fires.
	// This method only works with jQuery 1.7+
	// you can change it to use delegate (v1.4.3+) or live (v1.3+) as desired
	// if this code interferes somehow, target the specific table $('#mytable'), instead of $('table')
	$( function() {
		$( 'table' ).on( 'tablesorter-initialized updateComplete', function() {
			var namespace = '.parser-forms',
			restoreValue = function( isTbody ) {
				// make sure we restore original values (trigger blur)
				// isTbody is needed to prevent the select from closing in IE
				// see https://connect.microsoft.com/IE/feedbackdetail/view/962618/
				if ( isTbody ) {
					$( ':focus' ).blur();
				}
				return;
			};
			// bind to .tablesorter (default class name)
			$( this ).children( 'tbody' )
			.off( namespace )
			.on( 'mouseleave' + namespace, function( event ) {
				restoreValue( event.target.nodeName === 'TBODY' );
			})
			.on( 'focus' + namespace, 'select, input, textarea', function() {
				$( this ).data( 'ts-original-value', this.value );
			})
			.on( 'blur' + namespace, 'input, textarea', function() {
				// restore input value;
				// 'change' is triggered before 'blur' so this doesn't replace the new update with the original
				this.value = $( this ).data( 'ts-original-value' );
			})
			.on( 'change keyup '.split( ' ' ).join( namespace + ' ' ), 'select, input, textarea', function( event ) {
				if ( event.which === 27 ) {
					// escape: restore original value
					this.value = $( this ).data( 'ts-original-value' );
					return;
				}
				// Update cell cache using... select: change, input: enter or textarea: alt + enter
				if ( event.type === 'change' ||
					( event.type === 'keyup' && event.which === 13 &&
					( event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' && event.altKey ) ) ) {
					var undef,
						$target = $( event.target ),
						$cell = $target.closest( 'td' ),
						$table = $cell.closest( 'table' ),
						indx = $cell[ 0 ].cellIndex,
						c = $table[ 0 ].config || false,
						$hdr = c && c.$headerIndexed && c.$headerIndexed[ indx ] || [],
						val = $target.val();
					// abort if not a tablesorter table, or don't use updateCell if column is set
					// to 'sorter-false' and 'filter-false', or column is set to 'parser-false'
					if ( $hdr.length && ( $hdr.hasClass( 'parser-false' ) ||
						( $hdr.hasClass( 'sorter-false' ) && $hdr.hasClass( 'filter-false' ) ) ) ) {
						return;
					}
					// ignore change event if nothing changed
					if ( val !== $target.data( 'ts-original-value' ) || event.target.type === 'checkbox' ) {
						$target.data( 'ts-original-value', val );
						// pass undefined resort value so it falls back to config.resort setting
						$table.trigger( 'updateCell', [ $cell, undef, function() {
							updateServer( event, $table, $target );
						} ]);
					}
				}
			});
		});
	});

})( jQuery );
