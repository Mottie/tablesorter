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

#### <a name="v2.16.4">Version 2.16.4</a> (5/5/2014)

* Docs
  * Fix stickyHeaders scroll position adjustment.
  * Update [sticky headers widget demo](http://mottie.github.io/tablesorter/docs/example-widget-sticky-header.html) to include the `stickyHeaders_filteredToTop` option

* ColumnSelector widget: updated css to include print media for the new print widget.

* cssStickyHeaders widget: add `cssStickyHeaders_filteredToTop` option.

* Filter widget
  * Search operators (`< <= >= >`) now properly uses the parser.
  * Range, not matches (`!`) &amp; search operators now search all rows as needed.
  * Add filter language option, set the lanuage of `to`, `or` and `and`. Fixes [issue #602](https://github.com/Mottie/tablesorter/issues/602).
  * Prevent form submission when pressing enter within the filter.
  * Prevent javascript error if `delayInit` is set to `true`.
  * Add a bunch of filter tests.

* Math widget
  * Add `math_prefix` and `math_suffix` options.
  * The demo now includes a bunch of mask examples and an interactive example.

* Output widget
  * Add `output_encoding` option to allow setting the encoding to support accented characters in Excel.
  * See [the demo page](http://mottie.github.io/tablesorter/docs/example-widget-output.html) for more details.
  * See [this Stackoverflow question](http://stackoverflow.com/q/23388490/145346) & [issue #606](https://github.com/Mottie/tablesorter/issues/606).

* Pager:
  * Updated custom pager controls code to show the correct number of pages when the table is filtered.
  * Fixes [issue #605](https://github.com/Mottie/tablesorter/issues/605).

* Print widget (new)
  * The user can print all, visible or filtered rows. And, choose to print all, visible or selected columns (using the columnSelector widget).
  * By default, the widget is set to only print filtered rows &amp; visible columns.
  * Note this required an update to the columnSelector widget to include print media.
  * Try out the [print widget demo](http://mottie.github.io/tablesorter/docs/example-widget-print.html).

* Miscellaneous
  * Add Metro dark theme css file &amp; [demo](http://mottie.github.io/tablesorter/docs/example-option-theme-metro-style.html)
  * Add Metro LESS file - see this [interactive demo](http://codepen.io/Mottie/pen/gCslk).
  * Add Bootstrap LESS file - see this [interactive demo](http://codepen.io/Mottie/pen/Ltzpi).
  * Metro style includes encoded images. The images & psd have also been included.

#### <a name="v2.16.3">Version 2.16.3</a> (4/30/2014)

* Docs:
  * Clean up of docs for the following widgets:
      * [Column selector widget](http://mottie.github.io/tablesorter/docs/example-widget-column-selector.html)
      * [Editable widget](http://mottie.github.io/tablesorter/docs/example-widget-editable.html)
      * [Grouping widget](http://mottie.github.io/tablesorter/docs/example-widget-grouping.html)
      * [Math widget](http://mottie.github.io/tablesorter/docs/example-widget-math.html)
      * [Select2 filterFormatter](http://mottie.github.io/tablesorter/docs/example-widget-filter-formatter-select2.html)
  * Update [`textSorter` option demo](http://mottie.github.io/tablesorter/docs/example-option-custom-sort.html) - the sorting the Icelandic alphabet using sugar's array sort now works properly.

* Core:
  * Fix `headers` option indexing of cells in multiple header rows
      * Setting an index in the multiple row header will now correctly set the column parser.
      * See [this demo](http://jsfiddle.net/Mottie/abkNM/2645/) - the 10th cell (zero-based index) in the header has the sorter set to "month".
  * Set processing icon to only show after 500ms, it will not show at all if the sort ends before then.
  * Check for jQuery's `closest` function and use it, or fall back to equivalent code (maintaining support for jQuery 1.2.6+). Fixes [issue #597](https://github.com/Mottie/tablesorter/issues/597).
  * Remove widget init delay added in v2.16.1-beta.

* Filter:
  * Remove old cached indexing:
      * It was causing already filtered rows to return an incorrect cached row value.
      * Fixes [issue #600](https://github.com/Mottie/tablesorter/issues/600) &amp; see this [Stackoverflow question](http://stackoverflow.com/q/23384787/145346).
  * Update check for "filter-parsed" class, because the `getData` function will only return the first class name starting with "filter-".
  * Filter select updates:
      * Add `filter-select-nosort` header class name to prevent select option sorting.
      * Filter select option sort now uses the assigned column parser to parse &amp; sort the options.
      * Filter select options are now sorted using the `textSorter` function, if set, and if not set, it falls back to natural sorting.
      * Fixes [issue #599](https://github.com/Mottie/tablesorter/issues/599).
      * Add note to ensure textSorter receives strings, or a javascript error occurs.
  * Select2 filterFormatter now allows setting of initial settings. Fixes [issue #598](https://github.com/Mottie/tablesorter/issues/598).

* Sticky Headers
  * Add support for `filter_hideFilters` set to `true`. See this [Stackoverflow question](http://stackoverflow.com/q/23342215/145346).

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
