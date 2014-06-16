/*!
	Copyright (C) 2011 T. Connell & Associates, Inc.

	Dual-licensed under the MIT and GPL licenses

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	Resizable scroller widget for the jQuery tablesorter plugin

	Version 2.0 - modified by Rob Garrison 4/12/2013; updated 5/22/2014 (v2.17.0)
	Requires jQuery v1.7+
	Requires the tablesorter plugin, v2.8+, available at http://mottie.github.com/tablesorter/docs/

	Usage:

		$(function() {

			$('table.tablesorter').tablesorter({
				widgets: ['zebra', 'scroller'],
				widgetOptions : {
					scroller_height       : 300,  // height of scroll window
					scroller_barWidth     : 17,   // scroll bar width
					scroller_jumpToHeader : true, // header snap to browser top when scrolling the tbody
					scroller_idPrefix     : 's_'  // cloned thead id prefix (random number added to end)
				}
			});

		});

	Website: www.tconnell.com
*/
/*jshint browser:true, jquery:true, unused:false */
;(function($){
"use strict";

$.fn.hasScrollBar = function(){
	return this.get(0).scrollHeight > this.height();
};
var ts = $.tablesorter;

ts.window_resize = function(){
	if (this.resize_timer) {
		clearTimeout(this.resize_timer); 
	}
	this.resize_timer = setTimeout(function(){
		$(this).trigger('resizeEnd');
	}, 250);
};

// Add extra scroller css
$(function(){
	var s = '<style>' +
		'.tablesorter-scroller-header table.tablesorter { margin-bottom: 0; }' +
		'.tablesorter-scroller-table table.tablesorter { margin-top: 0; } ' + 
		'.tablesorter-scroller-table .tablesorter-filter-row, .tablesorter-scroller-table tfoot { display: none; }' +
		'.tablesorter-scroller-table table.tablesorter thead tr.tablesorter-headerRow * {' +
			'line-height:0;height:0;border:none;background-image:none;padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;overflow:hidden;' +
		'}</style>';
	$(s).appendTo('body');
});

ts.addWidget({
	id: 'scroller',
	priority: 60, // run after the filter widget
	options: {
		scroller_height : 300,
		scroller_barWidth : 17,
		scroller_jumpToHeader: true,
		scroller_idPrefix : 's_'
	},
	init: function(table, thisWidget, c, wo){
		var $win = $(window);
		//Setup window.resizeEnd event
		$win
			.bind('resize', ts.window_resize)
			.bind('resizeEnd', function() {
				// init is run before format, so scroller_resizeWidth
				// won't be defined within the "c" or "wo" parameters
				if (typeof table.config.widgetOptions.scroller_resizeWidth === 'function') {
					//IE calls resize when you modify content, so we have to unbind the resize event
					//so we don't end up with an infinite loop. we can rebind after we're done.
					$win.unbind('resize', ts.window_resize);
					table.config.widgetOptions.scroller_resizeWidth();
					$win.bind('resize', ts.window_resize);
				}
			});
	},
	format: function(table, c, wo) {
		var h, $hdr, id, t, resize, $cells,
			$win = $(window),
			$tbl = c.$table;

		if (!c.isScrolling) {
			h = wo.scroller_height || 300;
			t = $tbl.find('tbody').height();
			if (t !== 0 && h > t) { h = t + 10; }  // Table is less than h px
			id = wo.scroller_id = wo.scroller_idPrefix + Math.floor(Math.random() * 101);

			$hdr = $('<table class="' + $tbl.attr('class') + '" cellpadding=0 cellspacing=0><thead>' + $tbl.find('thead:first').html() + '</thead></table>');
			$tbl
				.wrap('<div id="' + id + '" class="tablesorter-scroller" style="text-align:left;" />')
				.before($hdr)
				.find('.tablesorter-filter-row').addClass('hideme');

			$cells = $hdr
				.wrap('<div class="tablesorter-scroller-header" style="width:' + $tbl.width() + ';" />')
				.find('.' + ts.css.header);

			$tbl.wrap('<div class="tablesorter-scroller-table" style="height:' + h + 'px;width:' + $tbl.width() + ';overflow-y:scroll;" />');

			// make scroller header sortable
			ts.bindEvents(table, $cells);

			// look for filter widget
			if ($tbl.hasClass('hasFilters')) {
				ts.filter.bindSearch( $tbl, $hdr.find('.' + ts.css.filter) );
			}

			resize = function(){
				var d,
					//Hide other scrollers so we can resize
					$div = $('div.scroller[id != "' + id + '"]').hide();

				$tbl.find('thead').show();

				//Reset sizes so parent can resize.
				$hdr
					.width(0)
					.parent().width(0)
					.find('th,td').width(0);

				$tbl
					.width(0)
					.find('thead').find('th,td').width(0);
				d = $tbl.parent();
				d.width(0);

				d.parent().trigger('resize');
				// Shrink a bit to accommodate scrollbar
				d.width( d.parent().innerWidth() - ( d.parent().hasScrollBar() ? wo.scroller_barWidth : 0 ) );

				$tbl.width( d.innerWidth() - ( d.hasScrollBar() ? wo.scroller_barWidth : 0 ) );
				$tbl.find('thead').find('th,td').filter(':visible').each(function(i, c){
					var $th = $(c),
					//Wrap in browser detect??
					w = parseInt( $th.css('min-width').replace('auto', '0').replace(/(px|em)/, ''), 10 );
					if ( $th.width() < w ) {
						$th.width(w);
					} else {
						w = $th.width();
					}
					$hdr.find('th,td').eq(i).width(w);
				});

				$hdr.width($tbl.innerWidth()).parent().width($tbl.innerWidth());
				$div.show();
			};

			//Expose to external calls
			wo.scroller_resizeWidth = resize;

			resize();

			$tbl.find('thead').css('visibility', 'hidden');
			c.isScrolling = true;

			t = $tbl.parent().parent().height();
			// The header will always jump into view if scrolling the table body
			$tbl.parent().bind('scroll', function(){
				if (wo.scroller_jumpToHeader) {
					var pos = $win.scrollTop() - $hdr.offset().top;
					if ($(this).scrollTop() !== 0 && pos < t && pos > 0) {
						$win.scrollTop( $hdr.offset().top );
					}
				}
			});

		}

		//Sorting, so scroll to top
		$tbl.parent().animate({ scrollTop: 0 }, 'fast');

	},
	remove : function(table, c, wo){
		var $table = c.$table;
		$table.closest('.tablesorter-scroller').find('.tablesorter-scroller-header').remove();
		$table
				.unwrap()
				.find('.tablesorter-filter-row').removeClass('hideme').end()
				.find('thead').show().css('visibility', 'visible');
		c.isScrolling = false;
	}
});

})(jQuery);
