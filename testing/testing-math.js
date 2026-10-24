/*!
* TableSorter QUnit Testing - math widget
*/
/*global jQuery, QUnit */
jQuery( function( $ ) {
	'use strict';

	QUnit.module( 'Math widget' );

	function sumTable( values, options ) {
		var rows = $.map( values, function( value ) {
			return '<tr><td>' + value + '</td></tr>';
		}).join( '' );
		return $( '<table><thead><tr><th>Amount</th></tr></thead>' +
			'<tfoot><tr><td data-math="col-sum"></td></tr></tfoot>' +
			'<tbody>' + rows + '</tbody></table>' )
			.appendTo( '#qunit-fixture' )
			.tablesorter( $.extend( true, { widgets: [ 'math' ] }, options ) );
	}

	QUnit.test( 'Space-grouped amounts with a custom sorting parser', function( assert ) {
		var calculations = [],
			$table;
		$.tablesorter.addParser({
			id: 'math-space-number',
			is: function() { return false; },
			format: function( str ) { return str.replace( /\s+/g, '' ).replace( /,/g, '.' ); },
			type: 'numeric'
		});
		$table = sumTable( [ '2 084.05', '1 367.60' ], {
			headers: { 0: { sorter: 'math-space-number' } },
			widgetOptions: {
				math_mask: '# ##0.00',
				math_complete: function( $cell, wo, result, value, arry ) {
					calculations.push({ value: value, values: arry });
					return result;
				}
			}
		});
		assert.deepEqual( $.map( $table[0].config.cache[0].normalized, function( row ) {
			return +row[0];
		}), [ 2084.05, 1367.6 ], 'The sorting parser already handles the input' );
		assert.deepEqual( calculations[0].values, [ 2084.05, 1367.6 ], 'Math receives complete amounts' );
		assert.strictEqual( calculations[0].value, 3451.65, 'The full amounts are summed' );
		assert.strictEqual( $table.find( 'tfoot td' ).text(), '3 451.65', 'The grouped sum is displayed' );
		$table.trigger( 'recalculate' );
		assert.strictEqual( $table.find( 'tfoot td' ).text(), '3 451.65', 'Recalculation retains the sum' );
		$table.trigger( 'destroy' );
	});

	QUnit.test( 'Grouping and decimal separator controls', function( assert ) {
		var cases = [
			{ values: [ '2,084.05', '1,367.60' ], us: true, mask: '#,##0.00', expected: '3,451.65' },
			{ values: [ '2084.05', '1367.60' ], us: true, mask: '#,##0.00', expected: '3,451.65' },
			{ values: [ '2 084,05', '1 367,60' ], us: false, mask: '# ##0,00', expected: '3 451,65' },
			{ values: [ '2.084,05', '1.367,60' ], us: false, mask: '#.##0,00', expected: '3.451,65' },
			{ values: [ '2\u00a0084.05', '1\u202f367.60' ], us: true, mask: '# ##0.00', expected: '3 451.65' },
			{ values: [ '(2 084.05)', '1 367.60' ], us: true, mask: '# ##0.00', expected: '-716.45' },
			{ values: [ '-2 084.05', '1 367.60' ], us: true, mask: '# ##0.00', expected: '-716.45' },
			{ values: [ '1 234 567.89', '2 345 678.10' ], us: true, mask: '# ##0.00', expected: '3 580 245.99' },
			{ values: [ ' 0.00 ', '' ], us: true, mask: '# ##0.00', expected: '0.00' }
		];
		$.each( cases, function( index, testCase ) {
			var $table = sumTable( testCase.values, {
				usNumberFormat: testCase.us,
				widgetOptions: { math_mask: testCase.mask }
			});
			assert.strictEqual( $table.find( 'tfoot td' ).text(), testCase.expected, testCase.values.join( ' + ' ) );
			$table.trigger( 'destroy' );
		});
	});

	QUnit.test( 'Grouped math attributes feed row, column, and all totals', function( assert ) {
		var $table = $( '<table><thead><tr><th>A</th><th>B</th><th>Total</th></tr></thead>' +
			'<tfoot><tr><td data-math="col-sum"></td><td data-math="col-sum"></td>' +
			'<td data-math="all-sum"></td></tr></tfoot>' +
			'<tbody><tr><td data-math-value="2 084.05">2.1k</td>' +
			'<td data-math-value="1 367.60">1.4k</td><td data-math="row-sum"></td></tr></tbody></table>' )
			.appendTo( '#qunit-fixture' )
			.tablesorter({
				widgets: [ 'math' ],
				widgetOptions: { math_textAttr: 'data-math-value', math_mask: '# ##0.00' }
			});
		assert.strictEqual( $table.find( 'tbody [data-math]' ).text(), '3 451.65', 'Row sum uses attribute values' );
		assert.deepEqual( $table.find( 'tfoot td' ).map( function() { return $( this ).text(); }).get(),
			[ '2 084.05', '1 367.60', '3 451.65' ], 'Column and all totals use attribute values' );
		$table.trigger( 'recalculate' );
		assert.strictEqual( $table.find( 'tfoot [data-math="all-sum"]' ).text(), '3 451.65', 'Repeated totals remain correct' );
		$table.trigger( 'destroy' );
	});

});
