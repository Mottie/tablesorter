;(function($) {
	'use strict';

	var ts = $.tablesorter || {};
	ts.filterFormatter = ts.filterFormatter || {};

	/************************\
	 Select2 V4 Filter Formatter
	\************************/
	ts.filterFormatter.select2 = function($cell, indx, select2Def) {
		var o = $.extend({
			// select2 filter formatter options
			cellText : '', // Text (wrapped in a label element)
			match : true, // adds 'filter-match' to header
			value : '',
			// include ANY select2 options below
			multiple : true,
			width : '100%'

		}, select2Def );
		var arry, data,
		// add class to $cell since it may point to a removed DOM node
		// after a "refreshWidgets"; see #1237
		c = $cell.addClass('select2col' + indx).closest('table')[0].config,
		wo = c.widgetOptions,
		// Add a hidden input to hold the range values
		$input = $('<input class="filter" type="hidden">')
			.appendTo($cell)
			// hidden filter update namespace trigger by filter widget
			.bind('change' + c.namespace + 'filter', function() {
				var val = convertRegex(this.value);
				c.$table.find('.select2col' + indx + ' .select2').select2().val(val);
				updateSelect2();
			}),
		$header = c.$headerIndexed[indx],
		onlyAvail = $header.hasClass(wo.filter_onlyAvail),
		flags = wo.filter_ignoreCase ? 'i' : '',
		matchPrefix = o.match ? '' : '^', // if match is defined, search the word from start to finish
		matchSuffix = o.match ? '' : '$',
		convertRegex = function(val) {
			// value = '/(^x$|^y$)/' => ['x','y']
			return val
				.replace(/^\/\(\^?/, '')
				.replace(/\$\|\^/g, '|')
				.replace(/\$?\)\/i?$/g, '')
				// unescape special regex characters
				.replace(/\\/g, '')
				.split('|');
		},

		// this function updates the hidden input and adds the current values to the header cell text
		updateSelect2 = function() {
			var arry = false,
				v = c.$table.find('.select2col' + indx + ' .select2').val() || o.value || '';
			if ($.isArray(v)) {
				arry = true;
				v = v.join('\u0000');
			}
			// escape special regex characters (http://stackoverflow.com/a/9310752/145346)
			// v = v.replace(/[-[\]{}()*+?.,/\\^$|#\s]/g, '\\$&');
			// convert string back into an array
			if (arry) {
				v = v.split('\u0000');
			}

			if (!ts.isEmptyObject($cell.find('.select2').data())) {
				$input.val(
					$.isArray(v) && v.length && v.join('') !== '' ?
					'/(' + matchPrefix + (v || []).join(matchSuffix + '|' + matchPrefix) + matchSuffix + ')/' + flags :
					'').trigger('search');

				setTimeout(function() {
					if (v + '' !== '') {
						if (v.indexOf(',') >= 0) {
							v = v.join('\u0000');
							$cell.find('select.select2').select2().val(v.split(','));

						} else {
							$cell.find('select.select2').select2().val(v);
						}
					}
					
				}, 1);
				// update sticky header cell
				if (c.widgetOptions.$sticky) {
					c.widgetOptions.$sticky.find('.select2col' + indx + ' .select2').select2().val(v);
				}
			}
		},

		// get options from table cell content or filter_selectSource (v2.16)
		updateOptions = function() {
			data = [];
			arry = ts.filter.getOptionSource(c.$table[0], indx, onlyAvail) || [];
			// build select2 data option
			$.each(arry, function(i, v) {
				// getOptionSource returns { parsed: "value", text: "value" } in v2.24.4
				data.push({ id: '' + v.text, text: v.text });
			});
			o.data = data;
		};

		// get filter-match class from option
		$header.toggleClass('filter-match', o.match);
		if (o.cellText) {
			$cell.prepend('<label>' + o.cellText + '</label>');
		}

		// don't add default in table options if either ajax or
		// data options are already defined
		if (!(o.ajax && !$.isEmptyObject(o.ajax)) && !o.data) {
			updateOptions();
			c.$table.bind('filterEnd', function() {
				updateOptions();
				c.$table
					.find('.select2col' + indx)
					.add(c.widgetOptions.$sticky && c.widgetOptions.$sticky.find('.select2col' + indx))
					.find('.select2').select2(o);
			});
		}
		
		// add a select2 input!
		$('<select class="select2 select2-' + indx + '" />')
			.appendTo($cell)
			.select2(o)
			.val(o.value)
			.bind('change', function() {
				updateSelect2();
			});

		// update select2 from filter hidden input, in case of saved filters
		c.$table.bind('filterFomatterUpdate', function() {
			// value = '/(^x$|^y$)/' => 'x,y'
			var val = convertRegex(c.$table.data('lastSearch')[indx] || '');
			$cell = c.$table.find('.select2col' + indx);
			val = val + '';
			if (val.indexOf(',') >= 0) {
				// if the hidden val from input is comma separated, add the values to Select2's select as an array
				$cell.find('select.select2').val(val.split(','));
			} else {
				// if the hidden val from input is a single value, just add the value 
				$cell.find('select.select2').val(val);
			}

			$cell.find('select.select2').trigger('change');
			updateSelect2();
			ts.filter.formatterUpdated($cell, indx);
		});
		// has sticky headers?
		c.$table.bind('stickyHeadersInit', function() {
			var $shcell = c.widgetOptions.$sticky.find('.select2col' + indx).empty();
			// add a select2!
			$('<select class="select2 select2-' + indx + '">')
				.appendTo($shcell)
				.select2(o)
				.val(o.value)
				.bind('change', function() {
						c.$table.find('.select2col' + indx)
							.find('.select2')
							.select2().val($(this).val());
						updateSelect2();
					});
			if (o.cellText) {
				$shcell.prepend('<label>' + o.cellText + '</label>');
			}
		});

		// on reset
		c.$table.bind('filterReset', function() {
			c.$table.find('.select2col' + indx).find('.select2').select2().val(o.value);
			setTimeout(function() {
				updateSelect2();
			}, 0);
		});

		updateSelect2();
		return $input;
	};

})(jQuery);
