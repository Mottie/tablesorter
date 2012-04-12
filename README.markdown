tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### Documentation

* See the [full documentation](http://mottie.github.com/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Change).

### Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](http://mottie.github.com/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.com/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.6+

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### Version 2.1.11 (4/12/2012)

* Added `emptyToBottom` option which tells tablesorter how you want it to sort empty table cells. Enhancement from [issue #]().
  * `true` - sort empty table cells to the bottom.
  * `false` - sort empty table cells to the top.
  * `null` - sort empty table cells as if the cell has the lowest value (less than "a" and "0").

#### Version 2.1.10 (4/2/2012)

* Widget data should now save multiple tables on a single page properly. Fix for [issue #41](https://github.com/Mottie/tablesorter/issues/41).

#### Version 2.1.9 (3/31/2012)

* Empty cells in a numerical column should now sort properly.
* Setting an initial `sortList` should now set the header sort correctly; so, clicking on the header will properly change the sort direction. Fix for [issue #43](https://github.com/Mottie/tablesorter/issues/43).

#### Version 2.1.8 (3/27/2012)

* Modified blue &amp; green themes by lowering css specificity. The arrows weren't being applied to the header.
* Updated Sticky Header widget demo page to include a tablesorter theme switcher.

#### Version 2.1.7 (3/26/2012)

* Changed default css options to use more unique names:
  * `cssHeader` is now `"tablesorter-header"`
  * `cssAsc` is now `"tablesorter-headerSortUp"`
  * `cssDesc` is now `"tablesorter-headerSortDown"`
  * Updated blue &amp; green styles to use the appropriate names.
  * Left the original css definitions to keep the styles backward compatible.
* Table header cell content wrapper modification:
  * Previously the content was wrapped with a `span`, now wrapped with a `div`
  * Content wrapping div now as the class name of `tablesorter-header-inner` applied to it.
* Various widget fixes:
  * The `$.tablesorter.storage` code now loads saved variables before updating. Fix for [issue #41](https://github.com/Mottie/tablesorter/issues/41).
  * Reverted the "filter" widget code to work like it is supposed to. Fix for [issue #40](https://github.com/Mottie/tablesorter/issues/40).
  * Modified the "stickHeaders" widget to now set the width of the content instead of the table cell. It seems to work better. Fix for [issue #37](https://github.com/Mottie/tablesorter/issues/37)
  * Fixed the "uitheme" widget code to update the sorting icon correctly.
