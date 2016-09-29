/*!
 * custom pager controls (beta) for Tablesorter - updated 9/28/2016 (v2.27.8)
  initialize custom pager script BEFORE initializing tablesorter/tablesorter pager
  custom pager looks like this:
  1 | 2 … 5 | 6 | 7 … 99 | 100
    _       _   _        _     adjacentSpacer
        _           _          distanceSpacer
  _____               ________ ends (2 default)
          _________            aroundCurrent (1 default)

 */
/*jshint browser:true, jquery:true, unused:false, loopfunc:true */
/*global jQuery: false */

;(function($) {
'use strict';

$.tablesorter = $.tablesorter || {};

$.tablesorter.customPagerControls = function(settings) {
	var defaults = {
		table          : 'table',
		pager          : '.pager',
		pageSize       : '.left a',
		currentPage    : '.right a',
		ends           : 2,                        // number of pages to show of either end
		aroundCurrent  : 1,                        // number of pages surrounding the current page
		link           : '<a href="#">{page}</a>', // page element; use {page} to include the page number
		currentClass   : 'current',                // current page class name
		adjacentSpacer : '<span> | </span>',       // spacer for page numbers next to each other
		distanceSpacer : '<span> &#133; <span>',   // spacer for page numbers away from each other (ellipsis)
		addKeyboard    : true,                     // use left,right,up,down,pageUp,pageDown,home, or end to change current page
		pageKeyStep    : 10                        // page step to use for pageUp and pageDown
	},
	options = $.extend({}, defaults, settings),
	$table = $(options.table),
	$pager = $(options.pager),
	focusOnPager = false;

	$table
		.on('filterStart', function() {
			focusOnPager = false;
		})
		.on('pagerInitialized pagerComplete', function (e, c) {
			var indx,
				p = c.pager ? c.pager : c, // using widget
				pages = $('<div/>'),
				cur = p.page + 1,
				pageArray = [],
				max = p.filteredPages,
				around = options.aroundCurrent;
			for (indx = -around; indx <= around; indx++) {
				if (cur + indx >= 1 && cur + indx <= max) {
					pageArray.push(cur + indx);
				}
			}
			if (pageArray.length) {
				// include first and last pages (ends) in the pagination
				for (indx = 0; indx < options.ends; indx++) {
					if ((indx + 1 <= max) && $.inArray(indx + 1, pageArray) === -1) {
						pageArray.push(indx + 1);
					}
					if ((max - indx > 0) && $.inArray(max - indx, pageArray) === -1) {
						pageArray.push(max - indx);
					}
				}
				// sort the list
				pageArray = pageArray.sort(function(a, b) { return a - b; });
				// only include unique pages
				pageArray = $.grep(pageArray, function(value, key) {
					return $.inArray(value, pageArray) === key;
				});
				// make links and spacers
				if (pageArray.length) {
					max = pageArray.length - 1;
					$.each(pageArray, function(indx, value) {
						pages
							.append(
								$(options.link.replace(/\{page\}/g, value))
									.toggleClass(options.currentClass, value === cur)
									.attr('data-page', value)
							)
							.append((indx < max && (pageArray[ indx + 1 ] - 1 !== value) ?
								options.distanceSpacer :
								(indx >= max ? '' : options.adjacentSpacer)
							));
					});
				}
			}
			$pager.find('.pagecount').html(pages.html());
			if (focusOnPager) {
				// don't focus on pager when using filter - fixes #1296
				$pager.find('.' + options.currentClass).focus();
			}
		});

	// set up pager controls
	$pager
		.find(options.pageSize)
		.on('click', function () {
			$(this)
			.addClass(options.currentClass)
			.siblings()
			.removeClass(options.currentClass);
			$table.trigger('pageSize', $(this).html());
			return false;
		})
		.end()
		.on('click', options.currentPage, function() {
			focusOnPager = true;
			var $el = $(this);
			$el
				.addClass(options.currentClass)
				.siblings()
				.removeClass(options.currentClass);
			$table.trigger('pageSet', $el.attr('data-page'));
			return false;
		});

	// make right/left arrow keys work
	if (options.addKeyboard) {
		$(document).on('keydown', function(events) {
			// ignore arrows inside form elements
			if (/input|select|textarea/i.test(events.target.nodeName) ||
				!(events.which > 32 && events.which < 41)) {
				focusOnPager = false;
				return;
			}
			// only allow keyboard use if element inside of pager is focused
			if ($(document.activeElement).closest(options.pager).is($pager)) {
				events.preventDefault();
				focusOnPager = true;
				var key = events.which,
					max = $table[0].config.totalRows,
					$el = $pager.find(options.currentPage).filter('.' + options.currentClass),
					page = $el.length ? parseInt($el.attr('data-page'), 10) : null;
				if (page) {
					if (key === 33) { page -= options.pageKeyStep; } // pageUp
					if (key === 34) { page += options.pageKeyStep; } // pageDown
					if (key === 35) { page = max; } // end
					if (key === 36) { page = 1; }   // home
					if (key === 37 || key === 38) { page -= 1; } // left/up
					if (key === 39 || key === 40) { page += 1; } // right/down
					$table.trigger('pageSet', page);
				}
			}
		});
	}
};

})(jQuery);
