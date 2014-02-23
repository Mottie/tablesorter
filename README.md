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

#### <a name="v2.15.5">Version 2.15.5</a> (2/23/2014)

* Pager widget now initializes properly when using ajax. Fixes [issue #510](https://github.com/Mottie/tablesorter/issues/510).

#### <a name="v2.15.4">Version 2.15.4</a> (2/22/2014)

* Add "updateCache" method
  * This method updates the parsers, if undefined, then updates the internal cache.
  * Used by the pager (addon &amp; widget) to update the internal cache after an ajax update.
* Pager (addon &amp; widget)
  * Fixed several undefined variable javascript errors. Fixes [issue #509](https://github.com/Mottie/tablesorter/issues/509).
  * Fixed an issue with recursion in the pager widget - removed several unnecessary "applyWidget" methods.
  * Now uses the "updateCache" method after the table is rendered using ajax.

#### <a name="v2.15.3">Version 2.15.3</a> (2/21/2014)

* Stickyheaders
  * Sorting works again. Fixes [issue #508](https://github.com/Mottie/tablesorter/issues/508).
  * Table no longer scrolls to the top after initializing a sort from the sticky header.

#### <a name="v2.15.2">Version 2.15.2</a> (2/20/2014)

* Filter widget
  * Fix js error on empty tables & multiple rows in thead while managing `c.parsers`. Fixes [issue #507](https://github.com/Mottie/tablesorter/issues/507).
  * `filter-onlyAvail` now updates all selects properly. Fixes [issue #473](https://github.com/Mottie/tablesorter/issues/473).
  * Fix annoying filter search caret jumping to end while typing
* Doc updates
  * Added `delayInit` demo ([pull #504](https://github.com/Mottie/tablesorter/issues/473)) - thanks [Infeligo](https://github.com/Infeligo)!
  * Fixed some markup issues &amp; rearranged some links
  * Updated minified widget file date. Fixes [issue #505](https://github.com/Mottie/tablesorter/issues/505)

#### <a name="v2.15.1">Version 2.15.1</a> (2/19/2014)

* Filter widget
  * Switched method of saving last search times, as cloned table parts would not include saved data
  * Fixes [issue #473](https://github.com/Mottie/tablesorter/issues/473).

#### <a name="v2.15">Version 2.15.0</a> (2/19/2014)

* Core
  * Add accessibility attributes to tablesorter (aria).
  * Make header's `bindEvent` function public to allow easier binding to cloned table headers.
  * Add an unsorted header class name option `cssNone` (empty string by default) and now all unsorted headers will have a class name of `tablesorter-headerUnSorted` applied; updated destroy method to remove header unsorted class name. 
  * Ensure only "updateRow" is triggered within the pager plugin to prevent issues with Proptype.js, see [issue #217](https://github.com/Mottie/tablesorter/issues/217).
  * Clean up all public API functions to accept `table` as either a DOM element or a jQuery table object.
  * The log will now display console errors and/or warnings based on those key words.
  * Consolidated all default class names used by the plugin within `$.tablesorter.css` - these are class names that are not set by the options.

* Docs
  * Organize the examples section to make it easier to find the desired sort demo.
  * Add associated tablesorter option (with link) with the appropriate examples.
  * Add a "Custom parsers" section instead of lumping it in with the widgets.
  * Add a "Work-in-progress" section for some beta demos.
  * Add indicators to show which widgets are contained within the `jquery.tablesorter.widgets.js` file.
  * Add an "API" section which gives details on how to use tablesorters available public variables &amp; functions in both the core and widgets.
  * Colorize the left border of code blocks to differentiate HTML, CSS and javascript.
  * Update &amp; consolidate jQuery UI accordion code.
  * Miscellaneous demo fixes.

* Parsers
  * The "shortDate" parser now works properly with header colspans. Fixes [issue #474](https://github.com/Mottie/tablesorter/issues/474).
  * The "currency" parser will now properly detect currencies which include a plus or minus sign.
  * The "checkbox" parser (contained in the `parser-input-select.js` file) will now toggle a class name of `checked-#` (`#` is the column index) on the row.
  * A new `parsed` parameter has been added to the parser code block.
    * This parameter is set with a boolean value (i.e. `true` or `false`), to signal the filter widget to only search through parsed data when `true`.
    * All parsers within the "parser-input-select.js" file now include a `parsed:true` parameter.
    * The [parsers](http://mottie.github.io/tablesorter/docs/example-parsers.html) and [parsers-advanced](http://mottie.github.io/tablesorter/docs/example-parsers-advanced.html) demos have been updated to reflect this addition.

* css Sticky headers widget:
  * Add `cssStickyHeaders_zIndex` option. Fixes [issue #466](https://github.com/Mottie/tablesorter/issues/466).
  * Browser will now scroll to table top after filtering. Fixes [issue #482](https://github.com/Mottie/tablesorter/issues/482).

* Column selector widget (new!)
  * This widget can make a table responsive. It uses similar parameters as those used by jQuery mobile to set priorities for hiding columns (uses "data-priority" attribute).
  * The column priorities range from 1 to 6, with 1 having the highest priority. As the browser window shrinks, lower priority (higher numbers) columns will be hidden first until all numbered priority columns are hidden.
  * Any named data-priority, other than the numbers 1 - 6, (e.g. "critical" or "persistent") will be treated as a column which *will not be included* in the column selector.
  * With the addition of some basic selector markup and css, this widget will also allow selecting (hiding or showing) table columns.
  * Popups can also be targetted for addition of these selectors; [the demo](http://mottie.github.io/tablesorter/docs/example-widget-column-selector.html) includes a Bootstrap popover sample.
  * Css selectors are used to hide/show columns for optimal speed and therefore will not work in IE8 and older browsers.
  * jQuery version 1.7+ and tablesorter verison 2.8+ are needed for this widget to work properly.
  * Check out the [demo](http://mottie.github.io/tablesorter/docs/example-widget-column-selector.html) with more details on how to setup this widget!

* Editable widget
  * Refresh other widgets after a cell has been edited. Fixes [issue #487](https://github.com/Mottie/tablesorter/issues/487).

* Filter widget:
  * Make operator match higher priority than exact matching. Fixes [issue #465](https://github.com/Mottie/tablesorter/issues/465).
  * Fix " OR " is now matched case insensitive.
  * The `filter_cssFilter` option can now contain an array of class names to be applied to each filter input; added in addition to the "tablesorter-filter" class name.
  * Start filter values are now preserved. Fixes [issue #452](https://github.com/Mottie/tablesorter/issues/452).
  * Filter formatter demo: Update jQuery UI & stylesheet - fixes UI spinner.
  * Fix child rows always visible when filtering.
  * Update beta demo - [select2 external table filters demo](http://mottie.github.io/tablesorter/beta-testing/example-external-filters-using-select2.html), thanks to [mohitmayank](https://github.com/mohitmayank); see [pull request #469](https://github.com/Mottie/tablesorter/pull/469).
  * Add `filter_hideEmpty` option
      * Set this option to false to always show the filter row.
      * By default, the filter row is completely hidden when no rows exist within the tbody (previous behavior)
      * Fixes [issue #450](https://github.com/Mottie/tablesorter/issues/450)
  * Rewrite filter match any column code
      * Removed `filter_anyMatch` option - sorry about not deprecating this first!
      * Added a `filter_external` option which is set to a jQuery selector string of inputs, outside of the table, to be used for searching table content.
      * External inputs must have a `data-column="x"` attribute where `"x"` is the associated column to filter; `"x"` can also be set as `"any"` to match any column.
      * All filters, internal and external, now automatically update and be used with the `$.tablesorter.getFilters` and `$.tablesorter.setFilters` functions.
      * Please refer to the documentation for the [`filter_external` option](http://mottie.github.io/tablesorter/docs/index.html#widget-filter-external) for more details.
      * Also check out the updated [filter widget external option](http://mottie.github.io/tablesorter/docs/example-widget-filter-any-match.html) and [filter widget external inputs](http://mottie.github.io/tablesorter/docs/example-widget-filter-external-inputs.html) demos.
      * This fixes issues [#114](https://github.com/Mottie/tablesorter/issues/114), [#370](https://github.com/Mottie/tablesorter/issues/370), [#471](https://github.com/Mottie/tablesorter/issues/471) and [#490](https://github.com/Mottie/tablesorter/issues/490).
  * Parsers with a `parsed: true` flag will now automatically force the filter widget to only search through parsed data instead of actual table cell data
      * This is needed specifically for parsers of input, textarea and select elements.
      * All parsers within the "parser-input-select.js" file have been updated with this parameter.
      * This flag is essentially does the same thing as adding a class name of `filter-parsed` to the column header, or `filter: "parsed"` setting to the [`headers` option](http://mottie.github.io/tablesorter/docs/#headers).

* Filter Formatter (Filter widget extension):
  * These updated filter widget functions are not completely backward compatible with older versions of the filter widget. Please update both!
  * Added `compare` &amp; `selected` options:
      * These options allow the adding of a comparison operator selector to the cell (e.g. `&gt;`, `&gt;=`, `&lt;`, `&lt;=`, etc).
      * If any `cellText` is included, it is now wrapped in a label with a class name of "compare-select-label" and "compare-select-label#" (where "#" is the column index).
      * The selector has a class name of "compare-select" and "compare-select#" (where "#" is the column index)
      * Whichever type of input that is added to the cell is then wrapped in a div with class "compare-select-wrapper" and "compare-select-wrapper#" (where "#" is the column index).
      * These class names allow styling of an individual filter to keep elements in line, or however you wish to style it.
  * Filter reset now sets these filters to their default values, not an empty string.
  * Updated to now properly restore saved filters.
  * Added `endOfDay` option for jQuery UI Datepicker.
      * When `true` search dates will include all times from the date chosen when a comparison is made of dates "less than" the set date.
      * Example 1: if a table entry has a date of "Jan 14, 2014 11:23 AM" and the filter search is set to `<= 1/14/2014`, the table entry will be included in the search; the default set time would otherwise be "1/14/2014 00:00:00" and not include the entry from "11:23 AM". So, the `endOfDay` option sets the time to "23:59:59".
      * Example 2: if searching for one specific date, this option will now search for all times within that day. For example, searching for `=1/20/2014`, and the results will include dates from 1/20/2014 00:00:00 to 1/20/2014 23:59:59.
      * When comparing dates greater than the set date, the time will be set to midnight; so this option will not be applied.
      * Example 3: in two date inputs, the `endOfDay` time is only applied to the "to" input; search for `1/20/2014 - 1/20/2014`
      * This option is available in both the comparison (one input) and range (two inputs; "to" date input only) date pickers.
  * Fixes [issue #325](https://github.com/Mottie/tablesorter/issues/325) and [issue #430](https://github.com/Mottie/tablesorter/issues/430).

* Group widget:
  * Attempt to fix ajax issue. See [issue #437](https://github.com/Mottie/tablesorter/issues/437).
  * Combining group widget with pager should now work properly. Fixes [isse #437](https://github.com/Mottie/tablesorter/issues/437).
  * The widget will now find the correct header cell when multiple thead rows are present.

* Pager (plugin &amp; widget):
  * Fixed pager issues with empty tables
      * When existing rows are removed from the table, the pager display will no properly update to show zero total rows.
      * When starting from an empty table and content is added, all widgets are refreshed
      * When updating the table via an update method, the filter search will now be applied properly.
      * Fixes issues [#426](https://github.com/Mottie/tablesorter/issues/426) &amp; [#455](https://github.com/Mottie/tablesorter/issues/455)
  * Correct page calculation. Fixes [issue #468](https://github.com/Mottie/tablesorter/issues/468).
  * Added custom storage keys. Thanks to [eire1130](https://github.com/eire1130); see [pull request #480](https://github.com/Mottie/tablesorter/pull/480) & [issue #481](https://github.com/Mottie/tablesorter/issues/481).
  * Added a public show error function `$.tablesorter.showError( table, message );`
      * Pass this function the table DOM element or jQuery object in `table`
      * The message can either be a string with a message ("table refuses to cooperate")
      * or, the message can be an HTML string of an entire table row (`'<tr><td colspan="' + table.config.columns + '">yeah, instead of showing your data... I am taking a nap</td></tr>'`)
      * If the message is blank, all error rows are removed
      * Fulfills [issue #486](https://github.com/Mottie/tablesorter/issues/486)
      * Please note that this function was added to both the pager widget &amp; pager plugin; In the next major release, this function will be separate from both, and can be included in the build.
      * All theme files included a minor update with this change.
  * Added accessibility attributes to the pager.
  * Fix jsHint warnings.

* Resizable widget
  * Fix reported js error.
  * The resizable reset function `$.tablesorter.resizableReset(table);` now accepts jQuery objects.

* Sticky headers widget
  * Select boxes work again within sticky headers. Fixes [issue #473](https://github.com/Mottie/tablesorter/issues/473).
  * Browser will scroll to table top after filtering.
      * This only occurs if the sticky header is active and after a filter is applied.
      * Fixes [issue #482](https://github.com/Mottie/tablesorter/issues/482).
  * Use core's new `bindEvents` public function to bind events to cloned sticky header.
  * Fix sticky header alignment within `attachTo` elements.

* Miscellaneous
  * Update all Bootstrap demos to use the latest version (v3.0.3). Thanks [themilkman](https://github.com/themilkman)!
  * Update all demo pages that use jQuery UI accordion with the newest version. Also added a clickable anchor to each accordion header.
  * Consolidate default class names within `$.tablesorter.css` for the filter, resizer and stickyHeaders widgets.
  * Renamed component.json to bower.json
