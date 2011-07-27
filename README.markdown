tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

See [Alpha-numeric sort Demo](http://mottie.github.com/tablesorter/) &amp; [Full Documentation](http://mottie.github.com/tablesorter/docs/)

###Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats), time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html)
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

View the [complete listing here](changelog.markdown).

#### Version 2.0.9 (2011-07-27)

* Added a jQuery UI theme and widget example. To apply the jQuery UI theme:
   * Include any jQuery UI theme on your page.
   * Add the base tablesorter ui theme (located in css/ui directory)
   * Add the jQuery UI theme widget code found on [this example page](docs/example-option-ui-theme.html). This demo page includes the UI theme switcher.
* Added a header index to the `onRenderHeader` function to make it easier to target specific header cells for modification. See the [render header example](docs/example-option-render-header.html) for an example.
* Pager plugin updates:
   * Removed the `separator` option and added an `output` option which allows you to completely customize the output string.
   * In the `output` string, include any of the following variables:
      * `{page}` is replaced with the current page number.
      * `{totalPages}` is replaced with the total number of pages.
      * `{startRow}` is replaced with the number of the visible start row of the pager.
      * `{endRow}` is replaced with the number of the visible end row of the pager.
      * `{totalRows}` is replaced with the total number of rows.
   * The `cssPageDisplay` option can now target any element; in previous versions, this element was an input of type text.
   * Added a `pagerArrows` and `cssDisabled` options:
      * When `pagerArrows` is true, the first and previous pager arrows have the css class name contained in the `cssDisabled` option applied when the first row is visible.
      * The next and last pager arrows will be have the `cssDisabled` class applied when the last row is visible.
      * Additionally, if the number of table rows is less than the pager size, the pager will get the `cssDisabled` class name applied.
      * If false (the default setting), the pager arrows class names will not change.
      * Please see the updated [pager demo](docs/example-pager.html) to see this working.

#### Version 2.0.8 (2011-07-21)

* Fixed parsers for currency and digits to work with number values separated by commas. Thanks to Josh Renaud for the information!
* Fixed "lockedOrder" header option and added documentation and an example on how to use it.
* Made the sort order "desc" only trigger off of the first letter, so any word/abbreviation starting with "d" will set the descending sort order, all other letters will set the order to ascending (shhh, because I'm a bad speller :P)
* Modified the "sortInitialOrder" option so it can also be set in the headers option.

#### Version 2.0.7 (2011-07-17)

* Added "pagerChange" and "pagerComplete" events to the pager plugin which trigger on the table. See the [pager demo](http://mottie.github.com/tablesorter/docs/example-pager.html) for an example on how to bind to them.
* Added the "sortAppend" since the option was there, but apparently the code wasn't.
* Added missing documentation from [my blog post](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html)
 * This included a few new example pages: apply widgets, child rows, render header, sort append and zebra widget.
 * Added a methods and events table.
* Fixed the minified version. Apparently sorting functions called by the eval were removed by the Google Closure Compiler. Resolved by using "Whitespace only" optimization.
* Fixed syntax highlighting; updated Chili.
