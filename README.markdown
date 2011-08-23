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

View the [complete listing here](http://mottie.github.com/tablesorter/changelog.txt).

#### Version 2.0.15 (2011-08-23)

* Fixed a problem that caused a javascript error when a table header cell doesn't have a class name.

#### Version 2.0.14 (2011-08-22)

* Reverted the changes made in 2.0.13 and added checks to prevent errors.
* Allowed sorting an empty table which would then automatically sort its contents when the table is updated.
* Modified "Update" and "UpdateCell" methods to automatically resort the table using the existing sort.
* Updated the [Initializing tablesorter on an empty table](http://mottie.github.com/tablesorter/docs/example-empty-table.html) demo and [Updating a table cell](http://mottie.github.com/tablesorter/docs/example-update-cell.html).

#### Version 2.0.13 (2011-08-19)

* Fixed a problem where a javascript error would occur when initializing a multi sort on an empty table. Thanks again to Eugene Ivakhiv!

#### Version 2.0.12 (2011-08-19)

* Updated the `textExtraction` functionality
   * The original textExtraction function was only able to be applied to all cells.
   * Apparently the ability to define textExtraction on a per column basis was misinterpreted by me, so now I've added it.
   * Use the option as follows:

   ```javascript
   $("table").tablesorter({
     textExtraction: {
       0: function(node) { return $(node).find(selector1).text(); },
       1: function(node) { return $(node).find(selector2).text(); },
       // etc
     }
   });
   ```

   * Updated the [Dealing with markup inside cells](http://mottie.github.com/tablesorter/docs/example-option-text-extraction.html) demo.
   * Thanks to Eugene Ivakhiv for bringing this issue to my attention in my blog.

#### Version 2.0.11 (2011-08-04)

* Added the ability to set a column parser using a class name
   * When setting the parser, start the class name with "sorter-" followed by the parser name, e.g. "sorter-text" or "sorter-digit"
   * The column can be disabled by setting the class name to "sorter-false"
   * [Demo page](http://mottie.github.com/tablesorter/docs/example-parsers-class-name.html) included.
   * Custom parsers can also be used - see the updated [writing custom parsers demo](http://mottie.github.com/tablesorter/docs/example-parsers.html).

#### Version 2.0.10 (2011-07-31)

* Modified the numeric sort with a new method to deal with non-numeric content:
   * When sorting columns with numeric values, by default any non-numeric or empty cells are treated as if they have a zero value. This puts the text between negative and positive values in a column.
   * Adding `string : "max+"` to the `headers` option will now treat any non-numeric table cells as if they have a maxiumum positive value (a value greater than the maximum positive value in the column).
   * Adding `string : "max-"` to the `headers` option will now treat any non-numeric table cells as if they have a maxiumum negative value (a value greater than the maximum negative value in the column).
   * See the "[Dealing with text strings in numeric sorts](http://mottie.github.com/tablesorter/docs/example-options-headers-digits-strings.html)" demo for a better visual example.
* Changed UI theme widget code to use "ui-widget-header" instead of "ui-widget-default" to better match the themes.
* Renamed changelog.markdown to changelog.txt to prevent downloading when clicking on the link

#### Version 2.0.9 (2011-07-27)

* Added a jQuery UI theme and widget example. To apply the jQuery UI theme:
   * Include any jQuery UI theme on your page.
   * Add the base tablesorter ui theme (located in css/ui directory)
   * Add the jQuery UI theme widget code found on [this example page](http://mottie.github.com/tablesorter/docs/example-ui-theme.html). This demo page includes the UI theme switcher.
* Added a header index to the `onRenderHeader` function to make it easier to target specific header cells for modification. See the [render header example](http://mottie.github.com/tablesorter/docs/example-option-render-header.html) for an example.
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
      * Please see the updated [pager demo](http://mottie.github.com/tablesorter/docs/example-pager.html) to see this working.
