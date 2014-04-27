tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### Notice!

* Because of the change to the internal cache, the tablesorter v2.16+ core, filter widget and pager (both plugin &amp; widget) will only work with the same version or newer files.

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

### Questions?

* Check the [FAQ](https://github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](http://mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](https://github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](http://stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](https://github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### <a name="v2.16.2">Version 2.16.2</a> (4/27/2014)

* Docs:
  * Added basic setup for output widget.
  * Show various updates.
  * Update readme with more resources.
* Core:
  * update `addRows` method will now accept a string or jQuery object.
  * Sort direction is now counted correctly.
  * Add "emptyMin" &amp; "emptyMax" setting to `emptyTo` option. Fixes [issue #577](https://github.com/Mottie/tablesorter/issues/577).
  * Add internal `config.$extraHeaders` variable.
* Filter widget:
  * Search already filtered rows when not exactly matching content. Fixes [issue #593](https://github.com/Mottie/tablesorter/issues/593).
  * Ensure `filter_functions` option is not `null`. Fixes [issue #593](https://github.com/Mottie/tablesorter/issues/593).
  * Filter formatter: set datepicker to `null`. Fixes [issue #512](https://github.com/Mottie/tablesorter/issues/512).
* Math widget: add `data-math-mask` for each cell.
* StickyHeaders
  * Check for filters before trying to set focus. Fixes [issue #594](https://github.com/Mottie/tablesorter/issues/594).
  * Add `stickyHeaders_filteredToTop` option. Fixes [issue #570](https://github.com/Mottie/tablesorter/issues/570).
* Input select parser: don't update columns with both sorter &amp; filter disabled. See [issue #570](https://github.com/Mottie/tablesorter/issues/570).

#### <a name="v2.16.1">Version 2.16.1</a> (4/24/2014)

* Core: 
  * Fixed an issue where ajax loaded data would cause a javascript error because of improper ignoring of data.
  * Ajax loaded data will now be parsed and cached - so stuff like the grouping widget will work properly.

#### <a name="v2.16.0">Version 2.16.0</a> (4/23/2014)

* Docs
  * Add notice to readme about upgrading to v2.16.
  * Add question section to readme about where to ask questions, including the new IRC channel.
  * Update jQuery UI accordion code to reapply widgets to tables within the section, when open.

* Build widget
  * Now works with HTML in the data
  * Add zebra widget to demos.

* Core
  * Check more than the first tbody when detecting parsers. Fixes [issue #589](https://github.com/Mottie/tablesorter/issues/589).
  * Apply widgets on table initialization after a short delay.

* Filter widget:
  * Fix search already filtered rows
  * Fix `filteredRows` count &amp; cleanup.
  * SetFilters now behaves more like a triggered search. Fixes [issue #588](https://github.com/Mottie/tablesorter/issues/588).
  * Filterformatter - Fix both datepicker scripts to work properly with non-U.S. formats. Fixes [issue #587](https://github.com/Mottie/tablesorter/issues/587).

* Pager: Now stays on the same page after updating. Fixes [issue #590](https://github.com/Mottie/tablesorter/issues/590).
* Testing: Add some preliminary tests for the filter widget.

#### <a name="v2.16.1-beta">Version 2.16.1-beta</a> (4/22/2014)

* Docs:
  * Add note about using buttons in forms (include `type="button"`). Fixes [issue #543](https://github.com/Mottie/tablesorter/issues/543).
  * Add example link to select2 demo for the `filter_selectSource` entry.
* Filter widget: setFilters now supports passing it a jQuery table object
* Static Row widget
  * Add more inline comments
  * Fix issue with not repositioning static row properly within mutliple tbodies.

#### <a name="v2.16.0-beta">Version 2.16.0-beta</a> (4/20/2014)

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
