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

#### <a name="v2.17.1">Version 2.17.1</a> (5/28/2014)

* Docs:
  * Add some missing examples &amp; updated some version number comments for the last update
  * Reflow widget: Fix demo to use preset widths &amp; css transitions instead of forcing users to manually resize the examples.
  * Output widget: add note about modifying the `.htaccess` file to enable downloading in both IE &amp; Firefox.

* Core
  * Allow use of select &amp; buttons within header cells. Previously only inputs were allowed. Fixes [issue #625](https://github.com/Mottie/tablesorter/issues/625).
  * Add `parser-false` setting to prevent extracting &amp; parsing of content from set columns. Fixes [issue #629](https://github.com/Mottie/tablesorter/issues/629).

* Filter widget
  * Add a not-exact-match (`!=`) filter type (e.g. `!"Bruce"` or `!Bruce=` will show all rows that don't exactly match `Bruce`). See [issue #628](https://github.com/Mottie/tablesorter/issues/628).

* Math widget
  * Values are now obtained from data-attributes first, then the actual cell content. This will allow making calculations with higher precision values. Fixes [issue #624](https://github.com/Mottie/tablesorter/issues/624).

* Pager (addon &amp; widget)
  * The `ajaxProcessing` function now includes the jqxhr parameter. Thanks [JuarezTurrini](https://github.com/JuarezTurrini)! See [pull #626](https://github.com/Mottie/tablesorter/pull/626)
  * Update the custom controls example to properly work with the pager widget. Fixes [issue #631](https://github.com/Mottie/tablesorter/issues/631).
  * Fix widgets sometimes not being applied after page change.

* Parser
  * input-select parser no longer binds to non-tablesorter tables. Fixes [issue #633](https://github.com/Mottie/tablesorter/issues/633).

#### <a name="v2.17.0">Version 2.17.0</a> (5/22/2014)

* Overall
  * You can now target a column using a jQuery selector targeting the header cell (e.g. a class name, id or column index, as before).
  * This works with the core options: `headers`, `textExtraction`.
  * This also works with the widgets: `filter_formatter`, `filter_functions`, `filter_selectSource` and the `headers` options for `filter` & `resizable`.
  * This change has *not yet been implemented* to the following options: `textSorter`, `sortList`, `sortForce`, `sortAppend` and `numberSorter` (will modify this option to target columns soon).
  * What **won't work** is if you try to target the header using a filtering selector that uses an index, e.g. `"th:eq()"`, `":gt()"`, `":lt()"`, `":first"`, `":last"`, `":even"` or `":odd"`, `":first-child"`, `":last-child"`, `":nth-child()"`, `":nth-last-child()"`, etc.

* Docs
  * Switch from using CDN versions of jQuery, jQuery UI, Bootstrap, Sugar and Select2 instead of using [protocol-relative URLs](http://www.paulirish.com/2010/the-protocol-relative-url/) because they are a pain to use locally.
  * Change style of "Update" tags to be slightly lighter than "New" tags.
  * Updated [reflow widget demo](http://mottie.github.io/tablesorter/docs/example-widget-reflow.html) with demo tables in a resizable iframe, so the browser window no longer needs to be resized.
  * Miscellaneous updates including correcting some version numbers, fixing links &amp; other issues with the demos.

* Themes
  * Fix green theme to properly include a background with the css3 sticky headers widget.

* Core
  * Instead of using empty or clearing rows from the table, the rows are now detached. This also applies to the pager.
  * Added `resetToLoadState` method
    * Using this method will clear out any settings that have changed since the table was initialized (refreshes the entire table); so any sorting or modified widget options will be cleared.
    * However, it will not clear any values that were saved to storage. This method is basically like reloading the page.
  * Refer to columns in the `headers` and/or `textExtraction` option by class name, ID, or column index (as before).

    ```js
    headers : {
        '.first-name' : { sorter: 'text' },
        '.disabled'   : { sorter: false }
    },
    textExtraction : {
        '.styled' : function(node, table, cellIndex) {
            return $(node).find('strong').text();
        }
    }
    ```

  * Added new "sorton" method values: "a" (ascending), "d" (descending), "n" (next), "s" (same) &amp; "o" (opposite).

    ```js
    // column 0: desc sort, column 1: asc sort
    $("#table1").trigger("sorton", [ [[0,"d"],[1,"a"]] ]);
    // column 0: next sort, column 1: opposite of column 0, column 2: same as column 0
    $("#table2").trigger("sorton", [ [[0,"n"],[1,"o"],[2,"s"]] ]);
    ```

    Please refer to the [Sort table using a link outside the table](http://mottie.github.io/tablesorter/docs/example-trigger-sort.html) demo for more details.


* ColumnSelector widget
  * Added a method to refresh the selected columns using `$('table').trigger('refreshColumnSelector');`.
  * Fix a js error when removing the widget.

* Filter widget
  * Fix child row filtering.
  * Fix `filter-match` searches.
  * Set filter parser or disable a filter in the `headers` option by referring to the header class name, ID, or column index (as before)

    ```js
    headers : {
        '.first-name' : { filter : false },
        '.last-name'  : { filter : 'parsed' }
    }
    ```

  * Refer to `filter_functions`, `filter_formatter` and `filter_selectSource` columns by class name, ID, or column index (as before)

    ```js
    filter_functions : {
        ".col-date" : {
            "< 2004" : function (e, n, f, i) {
                return n < Date.UTC(2004, 0, 1); // < Jan 1 2004
            },
            ...
        }
    },
    filter_formatter : {
        ".col-value" : function($cell, indx){
          return $.tablesorter.filterFormatter.uiSpinner( $cell, indx, {
            ...
          });
        }
    },
    filter_selectSource : {
        ".model-number" : [ "abc", "def", "ghi", "xyz" ]
    }
    ```

* Math widget
  * Now works properly with the pager. Fixes [issue #621](https://github.com/Mottie/tablesorter/issues/621).

* Output widget
  * Add `output_ignoreColumns` option. Set the zero-based index of the columns to ignore in this array. Fixes [issue #607](https://github.com/Mottie/tablesorter/issues/607)
  * Add `config` parameter to `output_callback` function. NOTE: this parameter is added before the data parameter, so it may break any already existing custom callback functions.
  * Add `output_duplicateSpans` option. Setting this option to `false` adds blank entries instead of duplicating the colspan or rowspan content. Fixes [issue #619](https://github.com/Mottie/tablesorter/issues/619).

* Pager (addon &amp; widget)
  * Use detach instead of empty on tbody rows. This should save any data associated with the rows.
  * Fix pager updating not showing correct totals.

* Print widget
  * Add `print_callback` option allowing manipulation of the table & stylesheet before printing.
  * Corrected the `print_columns` settings comments.

* Resizable widget
  * Disable a resizable header within the `headers` option by referring to the column class name, ID, or column index (as before)

    ```js
    headers : {
        '.first-name' : { resizable: false }
    }
    ```

  * Added note about using box-sizing &amp; jQuery versions older than 1.8.

* Scroller widget
  * Filter widget works with this widget again. Fixes [issue #620](https://github.com/Mottie/tablesorter/issues/620).

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
