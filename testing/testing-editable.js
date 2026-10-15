/* global QUnit */
jQuery( function( $ ) {
	'use strict';

	QUnit.module( 'Editable widget', {
		beforeEach: function() {
			this.$table = $( '<table><thead><tr><th>Name</th></tr></thead>' +
				'<tbody><tr><td>old</td></tr><tr><td>other</td></tr></tbody></table>' )
				.appendTo( '#qunit-fixture' )
				.tablesorter({
					widgets: [ 'editable' ],
					widgetOptions: { editable_columns: [ 0 ] }
				});
			this.$cell = this.$table.find( '[contenteditable]' ).first();
			this.config = this.$table[0].config;
		},
		afterEach: function() {
			this.$table.trigger( 'destroy' );
		}
	});

	[ false, true ].forEach( function( altKey ) {
		QUnit.test( altKey ? 'Alt+Enter accepts when enterToAccept is disabled' : 'Enter accepts and ends editing', function( assert ) {
			var changes = 0, completed = 0, blurred = 0;
			this.config.widgetOptions.editable_enterToAccept = !altKey;
			this.$cell.on( 'focusout', function() { blurred++; } );
			this.$table.on( 'change', function() { changes++; } )
				.on( 'editComplete', function() { completed++; } );
			this.$cell.focus().html( 'new' ).trigger( $.Event( 'keydown', { which: 13, altKey: altKey } ) );
			assert.notStrictEqual( document.activeElement, this.$cell[0], 'accepted cell loses focus' );
			assert.strictEqual( this.config.cache[0].normalized[0][0], 'new', 'sort cache is updated' );
			assert.strictEqual( changes, 1, 'one change event' );
			assert.strictEqual( completed, 1, 'one completion event' );
			assert.strictEqual( blurred, 1, 'one focusout event' );
			this.$cell.focus().html( 'cancelled' ).trigger( $.Event( 'keydown', { which: 27 } ) );
			assert.strictEqual( this.$cell.text(), 'new', 'a new edit can be cancelled to the accepted value' );
		});
	});

	QUnit.test( 'Validation failure keeps editing active', function( assert ) {
		this.config.widgetOptions.editable_validate = function() { return false; };
		this.$cell.focus().html( 'invalid' ).trigger( $.Event( 'keydown', { which: 13 } ) );
		assert.strictEqual( document.activeElement, this.$cell[0] );
		assert.strictEqual( this.config.cache[0].normalized[0][0], 'old' );
	});

	QUnit.test( 'Shift+Enter does not accept', function( assert ) {
		this.$cell.focus().html( 'new' ).trigger( $.Event( 'keydown', { which: 13, shiftKey: true } ) );
		assert.strictEqual( document.activeElement, this.$cell[0] );
		assert.strictEqual( this.config.cache[0].normalized[0][0], 'old' );
	});

	QUnit.test( 'Validated value survives blur with autoAccept disabled', function( assert ) {
		this.config.widgetOptions.editable_autoAccept = false;
		this.config.widgetOptions.editable_validate = function( text ) { return text.toUpperCase(); };
		this.$cell.focus().html( 'new' ).trigger( $.Event( 'keydown', { which: 13 } ) );
		assert.notStrictEqual( document.activeElement, this.$cell[0] );
		assert.strictEqual( this.$cell.text(), 'NEW' );
		assert.strictEqual( this.config.cache[0].normalized[0][0], 'new' );
	});

	QUnit.test( 'Clicking another cell accepts without blurring that cell', function( assert ) {
		var $next = this.$table.find( '[contenteditable]' ).last();
		this.$cell.focus().html( 'new' );
		$next.focus();
		assert.strictEqual( document.activeElement, $next[0] );
		assert.strictEqual( this.$cell.text(), 'new' );
	});

	QUnit.test( 'Destroy from the change handler is supported', function( assert ) {
		var $table = this.$table;
		$table.on( 'change', function() { $table.trigger( 'destroy' ); } );
		this.$cell.focus().html( 'new' ).trigger( $.Event( 'keydown', { which: 13 } ) );
		assert.notOk( $table[0].hasInitialized );
		assert.strictEqual( this.$cell.text(), 'new' );
	});

	QUnit.test( 'Auto resort restores focus to the edited cell', function( assert ) {
		var done = assert.async(), $cell = this.$cell;
		this.config.widgetOptions.editable_autoResort = true;
		this.$table.trigger( 'sorton', [ [ [ 0, 0 ] ] ] );
		$cell.focus().html( 'zebra' ).trigger( $.Event( 'keydown', { which: 13 } ) );
		setTimeout( function() {
			assert.strictEqual( document.activeElement, $cell[0] );
			assert.strictEqual( $cell.closest( 'tr' ).index(), 1 );
			done();
		}, 200 );
	});
});
