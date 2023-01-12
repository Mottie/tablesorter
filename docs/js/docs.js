/*jshint browser:true, jquery:true, unused:false */
/*global prettyPrint:false */
(function($) {
	$(function() {
		var $t, t, v, animating, clicked,

		cleanupCode = function(code) {
			return code.replace(/([<>\"\'\t\n]|&#133;)/g, function(m) { return {
				'<' : '&lt;',
				'>' : '&gt;',
				"'" : '&#39;',
				'"' : '&quot;',
				'\t': '  ',
				'\n': '<br/>', // needed for IE
				'&#133;' : '&amp;#133;' // pager custom controls ellipsis
			}[m];});
		};

		$('a.external').each(function() {this.target = '_new';});

		// get javascript source
		if ($('#js').length) {
			$('#javascript pre').addClass('mod').html( cleanupCode( $('#js').html() ) );
		}
		if ($('#js2').length) {
			$('#javascript2 pre').addClass('mod').html( cleanupCode( $('#js2').html() ) );
		}
		if ($('#css').length) {
			$('pre.lang-css').not('.locked').addClass('mod').html( cleanupCode( $('#css').html() ) );
		}
		if ($('#demo').length && $('#html pre').length) {
			$('#html pre').addClass('mod').html( cleanupCode( $('#demo').html() ) );
		}

		// apply to already pre-formatted blocks to add <br> for IE
		$('pre.prettyprint:not(.mod)').each(function() {
			$t = $(this);
			$t.html( cleanupCode( $t.html() ) );
		});

		// apply prettyprint in several settimeouts
		window['PR_SHOULD_USE_CONTINUATION'] = true;
		if (typeof prettyPrint !== 'undefined') { prettyPrint(); }

		// hide child rows
		$('#root .tablesorter-childRow').hide();
		// toggle child row content, not hiding the row since we are using rowspan
		$('#root .toggle').click(function() {
			$(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').toggle();
			return false;
		});

		animating = false;
		clicked = false;
		$('.collapsible').hide();

		$('a.permalink').click(function() {
			var $el = $(this);
			setTimeout(function() {
				if (!animating && !clicked) {
					animating = true;
					$el.closest('tr').find('.collapsible').slideToggle();
					setTimeout(function() { animating = false; }, 200);
				}
			}, 200);
			return false;
		});
		$('#root .permalink').dblclick(function() {
			clicked = true;
			window.location.hash = '#' + $(this).closest('tr')[0].id;
			showProperty();
			setTimeout(function() { clicked = false; }, 500);
			return false;
		});

		$('.toggleAll, .showAll, .hideAll').click(function() {
			t = $(this).text().trim();
			// use nextAll to ignore any <br> or other elements between this link and the table
			$(this).parent().nextAll('table:first').find('.collapsible')[t]();
			return false;
		});

		// update version number
		$t = $('.current-version');
		if ($t.length) {
			$t.html($.tablesorter.version);
		}

		// add high visibility tags for newest versions
		t = $.tablesorter.version.replace(/(v|version|\+)/g, '').split('.');
		v = [ parseInt(t[0], 10) || 1, parseInt(t[1], 10) || 0, parseInt(t[2], 10) || 0 ];
		$('.version').each(function() {
			var i;
			$t = $(this);
			i = $t.text().replace(/(v|version|\+)/g, '').split('.');
			t = [ parseInt(i[0], 10) || 1, parseInt(i[1], 10) || 0, parseInt(i[2], 10) || 0 ];
			if (t[0] === v[0] && t[1] >= v[1] - 1 ) {
				$t.prepend('<span class="label ' + ( t[0] === v[0] && t[1] < v[1] ? ' label-default' : ' label-success' ) +
					'">'+ ($t.hasClass('updated') ? 'Updated' : 'New') + '</span> ');
				// updates for current version are brighter
				if (t[2] <= v[2] - 1) {
					// new labels for revisions > 1 back are lighter
					$t.addClass('older');
				}
			}
		});

		$t = $('.accordion');
		if ($t.length) {
			var hashId,
				hash = window.location.hash;
			// add accodion ids
			$t.each(function() {
				$(this).children('h3').each(function(i) {
					var txt = $(this).find('a').text().toLowerCase().replace(/[-:()\"]/g,'').replace(/[\s+\/]/g,'_');
					this.id = txt;
					if (hash && txt === hash.slice(1)) {
						hashId = i;
					}
				});
			});
			// set up accordions
			$t.each(function() {
				var $this = $(this);
				$this.accordion({
					active: $this.hasClass('start-closed') ? false : hashId,
					animate: false,
					heightStyle: 'content',
					collapsible: true,
					create: function() {
						$this.children('h3').each(function(i) {
							this.id = $(this).find('a').text().toLowerCase().replace(/[-:()\"]/g,'').replace(/[\s+\/]/g,'_');
							$(this).before('<a class="accordion-link link" data-index="' + i + '" href="#' + this.id + '"></a>');
						});
						$this.find('.accordion-link').click(function() {
							$this.accordion( 'option', 'active', $(this).data('index') );
						});
					},
					activate: function(e, ui) {
						// refresh zebra widget when rows are visible
						ui.newPanel.find('table').trigger('applyWidgets');
						var $opt = ui.newPanel.find('table.options');
						// options tables are hidden, so colgroup won't find any visible columns to get widths
						if ( $opt.length && $opt[0].config ) {
							$.tablesorter.fixColumnWidth( $opt );
						}
					}
				});
				openAccordion( hash, $this );
			});

			$t.find('table.options').not('.tablesorter-jui').tablesorter({
				widthFixed: true,
				widgets: ['stickyHeaders']
			});

			$('.intlink').click(function() {
				openAccordion( $(this).attr('href') );
			});

		}

	});

	function openAccordion( hash, $accordion ) {
		// hash is not a jQuery selector
		if ( /[=,]/.test(hash) ) {
			return false;
		}
		var t, id, $hash;
		if ( !$accordion ) {
			$accordion = $(hash).closest('.accordion');
		}
		$hash = $accordion.find(hash);

		if ( $hash.length ) {
			if ( $hash.hasClass('ui-accordion-header') && !$hash.hasClass('ui-accordion-header-active') ) {
				$hash.click();

			// open parent accordion of nested accordion
			} else if ( !$accordion.children(hash).length ) {
				// div should have an id of ui-accordion-#-panel-#
				id = $(hash).closest('.ui-accordion-content').attr('id').match(/\d+$/);
				if (id && id.length) {
					$accordion.accordion('option', 'active', Number(id[0]) - 1);
				}
			}

			// open table row of nested accordion
			if ( ($accordion.find(hash).closest('tr').attr('id') || '') !== '') {
				t = $accordion.find(hash).closest('tr');
				t.find('.collapsible').show();
				if (t.closest('table').hasClass('hasStickyHeaders')) {
					setTimeout(function() {
						window.scrollTo( 0, t.offset().top - t.parents('table')[0].config.widgetOptions.$sticky.outerHeight() );
					}, 200);
				}
			}

		}
	}

	function showProperty() {
		var prop, $t, wo, stickyHt,
			h = window.location.hash;
		if (h && !/[=,]/.test(h)) {
			prop = $(h);
			if (prop.length && !/h3|a|table/i.test(prop[0].nodeName)) {
				prop.find('.collapsible').show();
				if (h === '#csschildrow') {
					$('#root .tablesorter-childRow').show();
				}
				// move below sticky header; added delay as there could be some lag
				setTimeout(function() {
					$t = prop.closest('table');
					if ($t.length && $t[0].config) {
						wo = $t[0].config.widgetOptions;
						if ( wo.$sticky ) {
							stickyHt = wo.$sticky.outerHeight();
							h = ( wo.$sticky ? wo.$sticky.height() : '' ) || $t.hasClass('hasStickHeaders') ? stickyHt : 0;
							if ($t.hasClass('options') || $t.hasClass('api')) {
								window.scrollTo( 0, prop.offset().top - h );
							}
						}
					}
				}, 200);
			}
		}
	}

	// update stickyHeader when menu closes
	$('#main-nav-check').bind('change', function() {
		setTimeout(function() {
			$(window).scroll();
		}, 350); // transition animation 300ms
	});

	$(window).bind('load', function() {
		if ($('#root').length) {
			$(window).bind('hashchange', function() {
				showProperty();
			});
			showProperty();
		}
	});

	// append hidden parsed value to cell
	// used by feet-inch-fraction & metric parser demos
	window.addParsedValues = function($t, cols, format) {
		var r, val,
			$r = $t.find('tbody tr'),
			c = $t[0].config.cache[0].normalized;
		$r.each(function(i) {
			r = this;
			$.each(cols, function(v,j) {
				val = format ? format(c[i][j]) : c[i][j];
				if (val !== '') {
					r.cells[j].innerHTML += ' <span class="val hidden removeme">(<span class="results">' + val + '</span>)</span>';
				}
			});
		});

		$('.toggleparsedvalue').bind('click', function() {
			$('.val').toggleClass('hidden');
			return false;
		});
	};

})(jQuery);
