tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

See the [full documentation](http://mottie.github.com/tablesorter/docs/)

###Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/)
* More demos can be found in the [documentation](http://mottie.github.com/tablesorter/docs/)
* Demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

###Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.com/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.3+

###Documentation

Included all original [document pages](http://mottie.github.com/tablesorter/docs/index.html) with updates from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html).

###Licensing

* Copyright (c) 2007 Christian Bach
* Main Examples and docs at: [http://tablesorter.com](http://tablesorter.com)
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses:

###Change Log

View the [complete listing here](http://mottie.github.com/tablesorter/changelog.txt).

####Version 2.0.27 (2012-1-31)

* Added `sortReset` option
  * Setting this option to `true`, allows you to click on the header a third time to clear the sort
  * Clearing the sort DOES NOT return the table to it's initial unsorted state.
* Added `saveSort` widget
  * This widget will save the last sort to local storage, and will fallback to cookies.
  * The widget does use the `JSON.stringify` function which is [not fully supported](http://caniuse.com/#search=json) (IE7), so if you plan to support it and use this widget, please include this [JSON library](https://github.com/douglascrockford/JSON-js).
* Fixed pager page size not sticking. Fix for [issue #24](https://github.com/Mottie/tablesorter/issues/24).

####Version 2.0.26 (2012-1-30)

* Widgets should no longer be applied twice when an initial sort direction is added. Fix for [issue #21](https://github.com/Mottie/tablesorter/issues/21).
* Modified Green theme:
  * The Green theme sort direction icon is now applied to only the first span it encounters inside the header. The UI theme adds a second span for it's icon.
  * Essentially to fix [this demo](http://mottie.github.com/tablesorter/docs/example-widget-ui-theme.html) which allows switching between all of the themes.
* Modified the UI theme to now add a div that wraps all of the header cell content to allow positioning of the sort direction icon.

####Version 2.0.25.2 (2012-1-27)

* Changed Blue theme to vertically align arrows. Fix for [issue #12](https://github.com/Mottie/tablesorter/issues/12).
* Fixed sticky header widget so varing width columns now update when the pager plugin changes pages. Thanks to locationRoura for reporting this issue.

####Version 2.0.25.1 (2011-12-15)

* Fixed disabled column style for the ui theme widget. Thanks to [bbbco](https://github.com/bbbco) for the fix in [issue #17](https://github.com/Mottie/tablesorter/issues/17).

####Version 2.0.25 (2011-12-14)

* The ui theme and sticky header widgets now work together and update the arrow direction. Fix for [issue #15](https://github.com/Mottie/tablesorter/issues/15).
* Empty cells with only a tab or space will now sort at the bottom. Thanks to [pursual](https://github.com/pursual) for the fix for [issue #16](https://github.com/Mottie/tablesorter/issues/16).

####Version 2.0.24 (2011-12-12)

* Modified empty cell sorting to always sort at the bottom. Fix for [issue #14](https://github.com/Mottie/tablesorter/issues/14).
* Updated the sticky header widget to line up properly with the UI theme. Fix for [issue #13](https://github.com/Mottie/tablesorter/issues/13).

####Version 2.0.23.5 (2011-12-6)

* Updated the sticky header widget again to not interfere with the filter widget. Fix for [issue #10](https://github.com/Mottie/tablesorter/issues/10).

####Version 2.0.23.4 (2011-12-6)

* Updated the sticky header widget to reposition the sticky header when scrolling left. Fix for [issue #9](https://github.com/Mottie/tablesorter/issues/9).

#### Version 2.0.23.3 (2011-11-7)

* Updated the filter widget:
  * Changed filter input from visibility hidden to display none. Fix/enhancement from [issue #7](https://github.com/Mottie/tablesorter/issues/7).
  * Modified the widget to better work with child rows. Added the `widgetFilterChildRows` option. Fix for [issue #8](https://github.com/Mottie/tablesorter/issues/8).
  * When `widgetFilterChildRows` is true, all child row content is included in the row filtering; if false, the child row content is ignored.
* Added `tableClass` to the documents. Apparently I forgot to add it before.
* Added a note to the filter demo bringing up [issue #6](https://github.com/Mottie/tablesorter/issues/6).
* Miscellaneous updates to the documents.

#### Version 2.0.23.2 (2011-10-28)

* Fixed pager size & total pages not being retained after destroying, then restoring the pager. Thanks to crush123 for reporting the problem!

#### Version 2.0.23.1 (2011-10-26)

* Fixed the pager plugin to prevent errors when initialized on an empty table. Fix for [issue #5](https://github.com/Mottie/tablesorter/issues/5).
* Added a Resizable Column widget
  * At this time, this widget allows resizing the column widths from the header.
  * The column widths are not saved, but if I did consider saving the widths to local storage. I just didn't get around to doing it.
  * [Demo page](http://mottie.github.com/tablesorter/docs/example-widget-resizable.html) added.
* Reorganized the next demo links, located at the bottom of every demo page, to match the order on the main document page.
