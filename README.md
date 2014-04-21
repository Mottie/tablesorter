tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### [Documentation](http://mottie.github.io/tablesorter/docs/)

* See the [full documentation](http://mottie.github.io/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Change).

### Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](http://mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting and filtering.
* Multi-tbody sorting - see the [options](http://mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Supports [Bootstrap v2 and 3](http://mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html)
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.io/tablesorter/docs/example-parsers.html).
* Inline editing - see [demo](http://mottie.github.io/tablesorter/docs/example-widget-editable.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Small code size, starting at 25K minified
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ ($.browser.msie was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Special Thanks

* Big shout-out to [Nick Craver](https://github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](https://github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Also extra thanks to [christhomas](https://github.com/christhomas) and [Lynesth](https://github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### <a name="v2.16.0">Version 2.16.0-beta</a> (4/20/2014)

* Doc & testing updates
  * More version numbers added - when certain variable & functions were added or last updated.
  * Update to use Bootstrap 3.1.1.
  * Update to the latest testing files.
  * Reorganize example section &amp; cleanup.
  * Fix demos that include togglable parsed data.
  * Fix miscellaneous typos.

* Core
  * Make `computeColumnIndex` function public ([get details](http://mottie.github.io/tablesorter/docs/index.html#function-computecolumnindex)).
  * Move cache rows into the normalized data
      * This is a *big change*, as the cache rows no longer exist and did break several widgets.
      * This change allows for the Filter widget to better work with cached data (pager with `removeRows` set to `true`) & makes the sort tbodies widget possible.
      * Updated core tests.
  * Update `textExtraction` option
      * Default option is now `"basic"` and checks for a data-attribute (set by by the new `textAttribute` option).
      * Set this option to any string (besides an empty string) to revert back to the original method; this may be necessary in older versions of IE due to initialization speed issues.
      * Fixes [issue #154](https://github.com/Mottie/tablesorter/issues/154)
  * Add `textAttribute` option
      * It contains the data-attribute name which contains alternative table cell text.
      * This only applies to tbody table cells.
  * Add `sortReset` method callback (e.g. `$("table").trigger("sortReset", [callback]);`)
  * Update `applyWidgets` method to prevent being called numerous consecutive times.
  * Destroy method now clears the table cache & pager rows copy

* Parsers (extract date parsers)
  * "extractUSLongDate" - this parser finds a US long date anywhere in a table cell ([demo](http://jsfiddle.net/abkNM/2293/))
  * "extractMMDDYYYY" - this parser extracts dates in MMDDYYYY format ([demo](http://jsfiddle.net/Mottie/abkNM/2418/))
  * "extractDDMMYYYY" - this parser extracts dates in DDMMYYYY format ([demo](http://jsfiddle.net/Mottie/abkNM/2419/))
  * "extractYYYYMMDD" - this parser extracts dates in MMDDYYYY format ([demo](http://jsfiddle.net/Mottie/abkNM/2420/))

* Filter widget
  * Updated to use the new modified internal cache format.
       * Now usable with the pager with the `removeRows` option set to `true`.
       * Fixes [issue #515](https://github.com/Mottie/tablesorter/issues/515).
  * Add `filter_placeholder` global settings. Fixes [issue #582](https://github.com/Mottie/tablesorter/issues/582).
  * Add `filter_selectSource` option.
       * Allows add filter select options from an alternate source (e.g. ajax), or customizing options from the set column contents.
       * Fixes [issue #328](https://github.com/Mottie/tablesorter/issues/328).
  * Include `th`'s in the tbody.
  * Fix build select tbody indexing.
  * Filter reset (`filter_reset`) now accepts a jQuery object.

* Filter formatter
  * Add to &amp; from date placeholders to date range. Fixes [issue #582](https://github.com/Mottie/tablesorter/issues/582).
  * Fix saved Datepicker range values. Fixes [issue #512](https://github.com/Mottie/tablesorter/issues/512).
  * Add select2 filter formatter code. May fix [issue #534](https://github.com/Mottie/tablesorter/issues/534) - [see demo](http://mottie.github.io/tablesorter/docs/example-widget-filter-formatter-select2.html)

* Math widget
  * New [math widget demo](http://mottie.github.io/tablesorter/docs/example-widget-math.html) Replaces the previous alpha "Column sum widget" demo.
  * This widget adds basic math capabilities; by default the following functions are available: count, sum, max, min, mean, median, mode, range, variance (sample & population), standard deviation (sample & population).
  * Custom math functions can be added
  * Data from cells is gathered from the row, cells "above" the target cell, column, or the entire table.
  * More details are provided on the demo page.
  * Fixes [issue #136](https://github.com/Mottie/tablesorter/issues/136).

* Output widget
  * This widget will output the table data as any of the following data formats:
      * Any separator: comma (csv), tabs (tsv), spaces, etc
      * Javascript array
      * JSON
  * Output the entire table, filtered or visible rows.
  * Works with the filter & pager widgets.
  * See [this demo](http://mottie.github.io/tablesorter/docs/example-widget-output.html) for more details.

* Pager
  * The `ajaxObject` success function will no longer be called twice on initialization. Fixes [issue #540](https://github.com/Mottie/tablesorter/issues/540).
  * Update to work with the filter widget &amp; the modified row cache. Fixes [issue #515](https://github.com/Mottie/tablesorter/issues/515).
  * Destroy method now clears the table cache & pager rows copy.
  * Add `pageReset` option - pager resets to set page after filtering the table. Fixes [issue #565](https://github.com/Mottie/tablesorter/issues/565).

* Reflow & Reflow2 widget
  * These widgets change the layout of the table when a set browser width breakpoint is reached.
  * Each tbody cell will display the header cell text when the table reflows.
  * See [this demo](http://mottie.github.io/tablesorter/docs/example-widget-reflow.html).
  * Fixes [issue #165](https://github.com/Mottie/tablesorter/issues/165).

* Scroller widget
  * Update to work properly with the filter widget. Fixes issues [#584](https://github.com/Mottie/tablesorter/issues/584) &amp; [#370](https://github.com/Mottie/tablesorter/issues/370).
  * Update method to bind table headers.
  * Added remove function so this widget now works properly with the "updateAll" method.

* Static Row widget
  * Modified from the [Tablesorter-Static-Row-Plugin](https://github.com/ascii-soup/Tablesorter-Static-Row-Plugin) by [ascii-soup](https://github.com/ascii-soup).
  * This widget works with multiple tbodies (but not information only tbodies).
  * Dynamically set &amp; update the static row.
  * For more details see [the demo](http://mottie.github.io/tablesorter/docs/example-widget-static-row.html).
  * Fixes issues [#120](https://github.com/Mottie/tablesorter/issues/120) &amp; [#472](https://github.com/Mottie/tablesorter/issues/472).

* StickyHeaders widget - the cloned table (sticky part) tbody &amp; tfoot are now removed instead of hidden.

#### <a name="v2.15.14">Version 2.15.14</a> (4/10/2014)

* Modified `bower.json` to allow "read-components" compatibility. See [PR #573](https://github.com/Mottie/tablesorter/pull/573)
* Corrected docs:
  * Filter-external doc error. Fixes [issue #571](https://github.com/Mottie/tablesorter/issues/571)
  * Added pager `ajaxProcessing` documentation about extra values available for the output. Fixes [issue #576](https://github.com/Mottie/tablesorter/issues/576).
  * Grouping widget demo update (now uses collapsible table for options)
* Core: Destroy method update
  * When including a `false` parameter with the destroy method, class names will be left intact as before. But this now includes the reapplying of the uitheme and zebra widgets.

      ```js
      $("table").trigger("destroy", [false]);
      ```

  * This change will maintain the table's appearance.
  * See this [Stackoverflow question](http://stackoverflow.com/q/22969340/145346) for why this change was made.
* Grouping widget: group name now saves after callback. Fixes [issue #514](https://github.com/Mottie/tablesorter/issues/514).
* Pager `processAjaxOnInit` now works with jQuery objects. Fixes [issue #572](https://github.com/Mottie/tablesorter/issues/572).
* Filter widget: `getFilters` will not cause a js error when it targets a non-tablesorter table.

#### <a name="v2.15.13">Version 2.15.13</a> (4/3/2014)

* Core:
  * Fix widgets not being applied after an update.
  * Ignore child row class name if it is the first table row
* Filter widget ignores info tbodies again. Fixes [issue #568](https://github.com/Mottie/tablesorter/issues/568)
* Docs: show resizable widget update
* Bootstrap theme:
  * Fix zebra highlighting for child rows
  * Thanks to [ilyai](https://github.com/ilyai) - [PR #567](https://github.com/Mottie/tablesorter/pull/567)

#### <a name="v2.15.12">Version 2.15.12</a> (3/31/2014)

* Replaced references to `cell.cellIndex` with `$(cell).index()`
  * Prevents an error in IE8
  * Thanks [sylvain-hamel](https://github.com/sylvain-hamel)!
  * Fixed merge issues, then modified code to minize use of this indexing
  * Cell column property has correct value again.
  * Fixes [issue #554](https://github.com/Mottie/tablesorter/pull/554)
* Fix docs so nested accordions open with hash.
* Child row updates
  * Added <code>tablesorter-hasChildRow</code> class name to all parents of child rows.
  * Added `.tablesorter .filtered { display: none; }` to every included theme; needed to properly hide child rows
  * Fixed pager so that if the last pager row has any child rows, they are now included. Fixes part of [issue #396](https://github.com/Mottie/tablesorter/issues/396).
  * Fixes [issue #556](https://github.com/Mottie/tablesorter/issues/556).
* Add `resizable_widths` option
  * Set the default & reset header widths using this option
  * Fixes [issue #555](https://github.com/Mottie/tablesorter/issues/555).
* I apologize for the last version error... it is set to 2.5.11 instead of 2.15.11 in the git repo tag. It is correct everywhere else.

#### <a name="v2.15.11">Version 2.15.11</a> (3/18/2014)

* Updated Bootstrap to v3.1.1
* Check if cell has parser to catch undefined error. Fixes [issue #546](https://github.com/Mottie/tablesorter/pull/546). Thanks [antila](https://github.com/antila)!
* Column count is now correct with nested tables (with tfoot). Fixes [issue #547](https://github.com/Mottie/tablesorter/issues/547).
* Fix table reset on pagination change. Fixes [issue #548](https://github.com/Mottie/tablesorter/pull/548). Thanks [evanboho](https://github.com/evanboho)!
