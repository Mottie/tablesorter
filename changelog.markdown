###TableSorter Change Log

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

#### Version 2.0.6 (2011-06-22)

* Forked original files and docs from [tablesorter.com](http://tablesorter.com) to GitHub.
* Replaced alphabetical sort with an alphanumeric sort
 * This "slower" sort can be disabled by setting the `sortLocaleCompare` option to `true`
 * The `sortLocaleCompare` option's default was changed to `false`.
 * Added a very basic demo.
* Added `tableClass` option
 * The value is "tablesorter" by default and should no longer be required in the default markup.
 * This class is applied to the table in the script and should match the css styling.
* Each header cell now has its content wrapped with a span.
 * This allows applying the direction icon to the span instead of the entire cell.
 * Although, this might just be extra markup with the advent of multiple background images and gradient backgrounds available in CSS3.
* Reformatted the code to make jSLint "happier".

#### Version 2.0.5b (?)

* General
 * Added "cssChildRow" option - attach a child row to its parent.
 * Added "sortLocaleCompare" to use the native `String.localeCampare` method during text sort.
 * Added "onRenderHeader" function that is called when classes are added to the header cells.
 * Added "selectorHeaders" option to target the the header cells.
 * Changed multisort function

#### Version 2.0.3 (2008-03-17)

* Bug fixes - Missing semicolon, broke the minified version.

#### Version 2.0.2 (2008-03-14)

* General
 * Added support for the new metadata plugin.
 * Added support for jQuery 1.2.3.
 * Added support for decimal numbers and negative and positive digits.
 * Updated documenation and website with new examples.
 * Removed packed version.

* Bug fixes
 * Sort force (Thanks to David Lynch).

#### Version 2.0.1 (2007-09-17)

* General
 * Removed the need for Dimensions plugin when using the pagnation plugin thanks to offset being included in the jQuery 1.2 core.
 * Added support for jQuery 1.2.
 * Added new Minified version of tablesorter.
 * Updated documenation and website with new examples.

* Bug fixes
 * If row values are identical the original order is kept (Thanks to David hull).
 * If thead includes a table $('tbody:first', table) breaks (Thanks to David Hull).

* Speed improvements:
 * appendToTable, setting innerHTML to "" before appending new content to table body.
 * zebra widget. (Thanks to James Dempster).
