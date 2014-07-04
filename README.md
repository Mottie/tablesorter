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

#### <a name="v2.17.4">Version 2.17.4</a> (7/4/2014)

* Docs
  * Copied the tablesorter `initialized` option from the event section into the configuration; renamed the event appropriately (`tablesorter-initialized` event)
  * Added notes about how to bind to "init" events; they should be bound before initializing tablesorter because in most cases, the events fire before the binding occurs.

* Core
  * Add `$.tablesorter.hasWidget(table, 'widgetId')` function. It returns a boolean value of `true` when the named widget is actively applied to the table.

* Filter
  * Add `filter_searchFiltered` option to allow disabling the search of already filtered rows.
  * The `filter_initialized` flag now gets set appropriately. Fixes [issue #668](https://github.com/Mottie/tablesorter/issues/668).
  * Include any column filter in determination of searching already filtered rows. Fixes [issue #669](https://github.com/Mottie/tablesorter/issues/669).
  * Add internal `config.filteredRows` variable. Provides a value of the number of currently filtered (visible) rows. Fixes [issue #670](https://github.com/Mottie/tablesorter/issues/670).
  * Add internal `config.totalRows` variable. Provides a value of the total number of rows in the current table, not including info-tbody rows.
  * Fix change/search event being ignored for selects &amp; filterFormatter extensions.
  * `filterInit` and `filterEnd` events now pass `config` as a parameter.

* Pager
  * Removed from beta status
  * Filtered rows now equals the total rows when `ajaxProcessing` returns an array. Fixes [issue #667](https://github.com/Mottie/tablesorter/issues/667).
  * Update the `config.filteredRows` when using ajax to match the internal `config.pager.filteredRows`. See [issue #670](https://github.com/Mottie/tablesorter/issues/670).
  * Widget only: ensure `pagerComplete` event fires on initialization.

* Resizable
  * Bind mousemove to document instead of table header. Makes resizable handle use consistent with other resizing libraries, as the user would expect. Fixes [issue #665](https://github.com/Mottie/tablesorter/issues/665).
  * Add `resizable_throttle` option to allow throttling of the mousemove/resize event. Set this option to `true` or a number between 1 and 10 to add a throttling delay. Fixes [issue #662](https://github.com/Mottie/tablesorter/issues/662).

* UITheme: non-existent columns no longer cause a js error. Fixes [issue #672](https://github.com/Mottie/tablesorter/issues/672).

#### <a name="v2.17.3">Version 2.17.3</a> (6/28/2014)

* Docs
  * Added bold notes to the output widget demo about setting the server content-disposition. Fixes [issue #653](https://github.com/Mottie/tablesorter/issues/653).
  * Updated to latest Bootstrap (v3.2.0), jQuery UI (v1.11.0) and Cupertino theme.
  * Embedded gists within the documentation should now work properly.

* Core
  * Add "tablesorter-processing" class name to table during processing. Fixes [issue #655](https://github.com/Mottie/tablesorter/issues/655).

* Filter
  * When `filter_liveSearch` is set to a number, it now searches when pressing enter. Fixes [issue #654](https://github.com/Mottie/tablesorter/issues/654).
  * Modify change event so a select searches the table without requiring a carriage return. Fixes [issue #650](https://github.com/Mottie/tablesorter/issues/650).

* Pager
  * Objects returned by `ajaxProcessing` can now include a `filteredRows` value. Fixes [issue #649](https://github.com/Mottie/tablesorter/issues/649).
  * Fix internal use of `selectorRemove` option, to consistently extract out the class name from the selector string.
  * Previous &amp; Next buttons now disable with zero filtered pages. Fixes [issue #649](https://github.com/Mottie/tablesorter/issues/649).
  * Changed pager widget `goto` page selector option to `gotoPage`, because `goto` is a reserved word. Fixes [issue #657](https://github.com/Mottie/tablesorter/issues/657).

* Scroller
  * Add `scroller_upAfterSort` option to prevent scrolling after clicking a checkbox. Fixes [issue #660](https://github.com/Mottie/tablesorter/issues/660).

* Static Row
  * Static rows are now manipulated witin a detached tbody.
  * Updated demo to allow toggling of static rows using ctrl (or command on Mac) + click.

* Parsers
  * Added new Roman numeral parsers. There are three different parsers to cover three different use cases. Please see the [roman numeral parser demo](http://mottie.github.io/tablesorter/docs/example-parsers-roman.html) for details.

#### <a name="v2.17.2">Version 2.17.2</a> (6/18/2014)

* Docs
  * Added more details about using pager ajax options.

* Core
  * The `clearTableBody` function now detaches rows instead of incorrectly detaching the tbody.

* Editable widget:
  * Corrected document option name typo. Fixes [issue #635](https://github.com/Mottie/tablesorter/issues/635). Thanks [shobute](https://github.com/shobute)!

* Filter widget:
  * The `selectSource` option now correctly handles parsed values that return zero.
  * Filter formatter for jQuery UI datepicker now remembers the correct date.
  * Corrected filter events & prevent table manipulation if filters are empty on initialization. Fixes [issue #645](https://github.com/Mottie/tablesorter/issues/645).

* Pager addon/widget:

  * Specifically target rows to prevent issues with ember scripts. Fixes [issue #638](https://github.com/Mottie/tablesorter/issues/638).
  * Correctly detach and append jQuery rows provided by the `ajaxProcessing` function. Fixes [issue #650](https://github.com/Mottie/tablesorter/issues/650).

* Print
  * jQuery requirement modified to support jQuery v1.2+ (previously it was v1.7+).
  * Popup now automatically closes with print dialog. Fixes [issue #643](https://github.com/Mottie/tablesorter/issues/643).

* Scroller widget:
  * The `thead` width is now set in IE. Fixes [issue #637](https://github.com/Mottie/tablesorter/issues/637).
  * Set column widths are now maintained, including Bootstrap. Fixes issues [#634](https://github.com/Mottie/tablesorter/issues/634) &amp; [#380](https://github.com/Mottie/tablesorter/issues/380).
  * Change default scroll bar width to `18`. Fixes [issue #363](https://github.com/Mottie/tablesorter/issues/363).
  * Scroller now behaves properly with horizontal overflow scroll, column alignments, and hidden cells. Fixes issues [#340](https://github.com/Mottie/tablesorter/issues/340) &amp; [#333](https://github.com/Mottie/tablesorter/issues/333).

* Themes
  * Bootstrap white unsorted icon now shows when the `icon-white` class is added. See [issue #648](https://github.com/Mottie/tablesorter/issues/648).
  * Remove auto height settings from filter elements.

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
