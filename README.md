tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### Notice!

* Because of the change to the internal cache, the tablesorter v2.16+ core, filter widget and pager (both plugin &amp; widget) will only work with the same version or newer files.

### [Documentation](//mottie.github.io/tablesorter/docs/)

* See the [full documentation](//mottie.github.io/tablesorter/docs/).
* All of the [original document pages](//tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](//wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](//github.com/Mottie/tablesorter/wiki/Changes).

### Demos

* [Basic alpha-numeric sort Demo](//mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](//mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](//github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting and filtering.
* Multi-tbody sorting - see the [options](//mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Supports [Bootstrap v2 and 3](//mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html)
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](//mottie.github.io/tablesorter/docs/example-parsers.html).
* Inline editing - see [demo](//mottie.github.io/tablesorter/docs/example-widget-editable.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](//mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Small code size, starting at 25K minified
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ ($.browser.msie was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](//tablesorter.com).
* Dual licensed under the [MIT](//www.opensource.org/licenses/mit-license.php) and [GPL](//www.gnu.org/licenses/gpl.html) licenses.

### Related Projects

* [Plugin for Rails](//github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](//github.com/themilkman).
* [Bootsole](//alexweissman.github.io/bootsole/) (OOP templating engine using tablesorter) by [alexweissman](//github.com/alexweissman).

### Special Thanks

* Big shout-out to [Nick Craver](//github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](//github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](//github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Also extra thanks to [christhomas](//github.com/christhomas) and [Lynesth](//github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Questions?

* Check the [FAQ](//github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](//mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](//github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](//stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](//github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

### Recent Changes

View the [complete change log here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.20.1">Version 2.20.1</a> (2/20/2015)

* Filter: Fixed a major issue with the filter widget not working properly.

#### <a name="v2.20.0">Version 2.20.0</a> (2/20/2015)

* Grunt build process
  * Added code to use npm & grunt to build a custom widget file.
  * An `example.json` file has been added as an example of how to set up a custom build file.
  * With each build, the following occurs:
    * `jquery.tablesorter.js` is copied to the `dist/js` folder.
    * All `less` files are copied to the `dist/css/less` folder.
    * All images, including the pager icons, is copied into the `dist/css/images` folder.
    * A `jquery.tablesorter.widgets.js` file is created from the selected widgets into the `dist/js` folder, then copied back to the `js` folder to allow jsFiddle demos to continue working.
    * A `.min.js` file is created for the core & widget file in the `dist/js` folder, then all parsers & widgets are compressed separately in the `dist/js/parsers` and `dist/js/widgets` folder, respectively.
    * A `.min.css` file is created for all themes, dragtable, filter-formatter & pager styles.
    * The black-ice theme within the distribution folder is renamed to `theme.blackice.min.css` (no dash). See [issue #785](https://github.com/Mottie/tablesorter/issues/785).
  * Files - the following changes to files have been made for the Grunt build process (this might break a few jsFiddle demos):
    * `jquery.metadata.js` has been moved into the `js/extras` folder.
    * `jquery.tablesorter.widgets-filter-formatter.js`
      * moved to the `js/widgets` folder
      * Broken into two files, and renamed to `widget-filter-formatter-html5.js` and `widget-filter-formatter-jui.js`.
    * `jquery.tablesorter.widgets-filter-formatter-select2.js`
      * Moved into the `js/widgets` folder.
      * Renamed to `widget-filter-formatter-select2.js`
    * `jquery.tablesorter.widgets.js`
      * Has been broken up into separate widget files: `widget-column.js`, `widget-filter.js`, `widget-resizable.js`, `widget-saveSort.js`, `widget-stickyHeaders.js`, `widget-storage.js` and `widget-uitheme.js`.
      * A default build creates a file of the above widgets combined in the `dist/js` folder.
      * A copy of this newly created combined widget file is then copied back to the `js/` folder to allow external demos (jsFiddle) to still work.
* Resolve jQuery unbinding issue
  * When unbinding events in jQuery versions 1.7 to 1.8, if an event list contains double spaces

    ```js
    $('table').unbind('a  b');
    ```

    all events will be removed from that element (see [this demo](http://jsfiddle.net/Mottie/zL6uory0/3/))!
  * Unbinding of events updated in the Core plugin & pager addon, and the following widgets: cssStickHeaders, editable, filter, formatter, math, staticRow & stickyHeaders.
* Modified `config.cache` to only include non-info only tbodies.
  * This modification effects the core &amp; the following widgets: chart, filter, grouping, pager (widget &amp; addon).
  * Thanks to [prijutme4ty](https://github.com/prijutme4ty) for working on this change.
  * See [pull request #822](https://github.com/Mottie/tablesorter/pull/822) for more details.
* Core
  * Add `cssNoSort` option. Add the class name from that option to any element within a header will prevent a click on that element and any containing elements from causing a sort.
  * Remove `cssAllowClicks` option. It wasn't working as intended and actually prevented sorting. It was replaced by it's opposite, the `cssNoSort` option.
  * Make core work with jQuery v1.2.6, again.
  * Make `getElementText` function public; with a bug fix from [prijutme4ty](https://github.com/prijutme4ty) in [pull](https://github.com/Mottie/tablesorter/pull/823).
* Docs
  * Add a [css column &amp; row highlighting demo](http://mottie.github.io/tablesorter/docs/example-css-highlighting.html).
  * Update jQuery UI & remove "latest" from the file name.
* Filter
  * Prevent javascript error when empty rows (`<tr></tr>`) are included in the tbody. Fixes [issue #819](https://github.com/Mottie/tablesorter/issues/819).
  * Prevent javascript error when performing an "any-match" search triggered on the table without an included external `data-column="all"` input.
  * Ensure that an "any-match" search is a string value.
  * Added "any-match" specific column search by using `#:{query}` where `#` is a one-based column index and `{query}` is the query. Thanks to [MaksimProgr](https://github.com/MaksimProgr) for providing the code in [pull request #817](https://github.com/Mottie/tablesorter/pull/817). This also fixes [issue #747](https://github.com/Mottie/tablesorter/issues/747).
  * Added `filter_columnAnyMatch` option to allow disabling the "any-match" specific column search.
* Pager
  * Fix initial start page default for the widget only.
  * Update pager `ajaxProcessing` code demo to prevent unordered JSON keys from adding content to incorrect columns. Fixes [issue #818](https://github.com/Mottie/tablesorter/issues/818).
* Parsers
  * Fix checkbox parser, in the `parser-input-select.js` file, so that it now properly updates when changed.

#### <a name="v2.19.1">Version 2.19.1</a> (2/9/2015)

* Core
  * Replace all double quote with a single - OCD made me do it!
  * Save raw table cell text (unparsed) into the cache.
* Core/Widgets
  * Fix a problem with event unbinding when using jQuery versions 1.7 &amp; 1.8.
  * When an `unbind` (or `off`) event string contains an untrimmed or central double space, **all** events on the element become unbound.
  * See [jQuery bug](http://bugs.jquery.com/ticket/10705) or [this demo](http://jsfiddle.net/Mottie/zL6uory0/1/).
  * Updated the core, and the cssStickyHeaders, editable, filter, formatter, math, pager (addon & widget), staticRow widgets and stickyHeaders widgets.
* Chart
  * Add more data points.
* Filter
  * Add a [second custom filter search type example](http://mottie.github.io/tablesorter/docs/example-widget-filter-custom-search2.html) which allows finding if the query number is within a range.
* Math
  * Add `math_event` option.
* StaticRow
  * Add `staticRow_event` option.

#### <a name="v2.19.0">Version 2.19.0</a> (2/7/2015)

* Core
  * Add AMD/browserify support; See [pull #786](https://github.com/Mottie/tablesorter/pull/786), thanks to [mwiencek](https://github.com/mwiencek)!
  * Resort variable can now contain a new sort. See [issue #782](https://github.com/Mottie/tablesorter/issues/782).
  * Prevent resort when `serverSideSorting` is `true`. Fixes [issue #764](https://github.com/Mottie/tablesorter/issues/764).
  * Add `resort` option. It is used as the fallback value when no resort parameter is included with the "updateAll", "update", "addRows" and "updateCell" methods.
  * Add `removeWidget` function which calls the widget `remove` function &amp; removes the named widget from the `config.widget` option.
  * A `refreshing` parameter was added to the widget remove function; when `true` it indicates that a `refreshWidgets` method was triggered and that the widget will only be temporarily removed.
  * Make fixColumnWidth a public function (`$.tablesorter.fixColumnWidth`). Calling it will refresh set column widths dynamically. See [issue #680](https://github.com/Mottie/tablesorter/issues/680).
  * The default `textExtraction` function has been optimized - `node.innerText` was completely removed as it is significantly slower in IE.
  * Modified the "updateCell" method to not reapply widgets if the resort parameter is `false`; this may resolve issue with widgets causing elements to lose focus.
  * Updated the `refreshWidgets` to use the `removeWidget` function. Once the widgets have been refreshed a `"refreshComplete"` event will be triggered.
  * Updated `applyWidget` function to allow passing a callback function.
  * Prevent adding multiple icons on refresh.
  * Trim header text added to aria label.
  * The `updateAll` method no longer restores headers since it is only refreshing.
  * Fix parser check while building cache which can cause unresolving parsers in case the first tbody is empty and remaining tbodies have less rows than a number of tbody. See [pull #814](https://github.com/Mottie/tablesorter/pull/814). Thanks [prijutme4ty](https://github.com/prijutme4ty)!
* Docs
  * Specify pager's `pageSet` method requires a one-based index value.
  * Miscellaneous corrections & fixes. Thanks [prijutme4ty](https://github.com/prijutme4ty)!
  * Remove `uitheme` widget option (it was removed in v2.14.0, but not properly documented). Pertinent information on how to modify the uitheme widget class names was moved to the core `theme` documentation.
  * Add a new pager variables section which contains some useful variables within the pager object (`table.config.pager`).
  * Update "jQuery data" demo to show the difference between setting a data-attribute and jQuery data directly.
  * Add api documentation for using the `getColumnData` function.
* Parsers
  * Add countdown parser (hh:mm:ss) - demo included with the [duration parser](http://mottie.github.io/tablesorter/docs/example-parsers-duration.html).
  * Update input-select parser to use the `resort` option.
* Widgets (general)
  * Build widget & storage extension: Pass `"null"` to `$.parseJSON` as a fallback. Fixes [issue #586](https://github.com/Mottie/tablesorter/issues/586).
  * Update `remove` widget function for columnSelector, cssStickyHeaders, math, pager, repeatHeaders, saveSort & stickyHeaders.
  * Widgets removed from beta: alignChar, columnSelector, math, output, print, reflow & staticRow.
* AlignChar:
  * Don't add align character when no content is right of it. Prevents adding a hanging decimal, e.g. `3000.`.
* Chart widget (New; beta):
  * Generic chart widget used to basically extract data from the table and output in multiple formats.
  * Current chart libraries supported: Google charts, Highcharts & FusionCharts.
  * Some additional processing may be required to add extra variables (graph colors, labels, etc).
  * A [demo is available here](http://mottie.github.io/tablesorter/docs/example-widget-chart.html).
  * An example of this widget is also available [here](http://codepen.io/TheSin/pen/GgEeEj).
  * Thanks to [TheSin-](https://github.com/TheSin-) for creating this widget!
* ColumnSelector:
  * Fix column index issue, again.
  * The `refreshColumnSelector` method has been updated to accept a parameter ([get more details](http://mottie.github.io/tablesorter/docs/example-widget-column-selector.html#methods)):
     * If an array of zero-based column indexes is passed by this method, "auto" mode will be disabled &amp; only columns within the array will be shown - critical or disabled columns will always be shown.
     * If a non-array is passed by this method, the "auto" mode will be enabled.
     * Fixes [issue #798](https://github.com/Mottie/tablesorter/issues/798).
  * A change in "auto" checkbox now triggers a "columnUpdate" event.
* Dragtable (New; beta)
  * The [dragtable jQuery UI widget](http://akottr.github.io/dragtable/) adds column reordering to a table.
  * This isn't a tablesorter widget, but a modification made to a jQuery UI widget to better integrate with tablesorter - [demo](http://mottie.github.io/tablesorter/docs/example-dragtable.html).
  * A modified version of dragtable has been included in the "extras" folder; this is a jQuery UI widget, not a tablesorter widget!

    ```js
    $(function () {
      $('table')
        .dragtable({
          dragHandle: '.table-handle',
          excludeFooter: true
        })
        .tablesorter({
          theme: 'blue',
          selectorSort: '.sort',
          widgets: ['zebra', 'filter']
        });
    });
    ```

  * This modified version, so far, allows column reordering to work with the filter &amp; resizable widgets.
  * Additional work will be required to get this jQuery UI widget to work with the scroller, columnSelector &amp stickyHeaders widgets.
  * Fixes issue [#781](https://github.com/Mottie/tablesorter/issues/781), and portions of issue [#215](https://github.com/Mottie/tablesorter/issues/215) and [#186](https://github.com/Mottie/tablesorter/issues/186).
* Editable
  * Update to add a `editable_columnsArray` which is created from the `editable_columns` option. When `editable_columns` contains a string (e.g. `0-3`), this option will contain an array of zero-based column indexes.
  * The dragtable mod widget can then use this option to rearrange and maintain editable columns properly.
* Filter
  * Hide filter row using the `filtered` class name (`table.config.widgetOptions.filter_filteredRow`).
  * Select source, and unparsed filter text now priorities data from the `textAttribute`. Fixes issues with Formatter widget - see [issue #812](https://github.com/Mottie/tablesorter/issues/812).
  * Update select2 filterFormatter code to properly escape regexp characters. Fixes [issue #796](https://github.com/Mottie/tablesorter/issues/796).
  * Normalize `table` parameter for public functions.
* Formatter (New; beta)
  * This new widget allows you to apply formatting to the columns ([demo](http://mottie.github.io/tablesorter/docs/example-widget-formatter.html)).
  * Fixes [issue #812](https://github.com/Mottie/tablesorter/issues/812).
* Output
  * Fix trim spaces for header cells.
* Pager
  * `pageReset` now used while filtering. See [issue #778](https://github.com/Mottie/tablesorter/issues/778).
  * Get most up-to-date filter before setting `pageReset`. Fixes [issue #783](https://github.com/Mottie/tablesorter/issues/783).
  * `filteredRows` now properly calculated when first `tbody` is set with a `cssInfoBlock` class name`.
  * Page size resets to original page setting instead of always 10.
  * Add `pageAndSize` method to set both the page &amp; size.
  * Add `pagerUpdate` method to force a pager update; even if no ajax parameters have changed. Fixes [issue #801](https://github.com/Mottie/tablesorter/issues/801).
  * Add `cachedIndex` variable which is useful if you need to find the currently visible rows within the pager in the internal cache (`table.config.cache`). See the [documentation](http://mottie.github.io/tablesorter/docs/#variable-pager-cache-index) for an example.
  * Update goto selector independently of other elements. Fixes [issue #811](https://github.com/Mottie/tablesorter/issues/811).
  * Modified to apply widgets &amp; fire "pagerComplete" after the cache is built; this specifically applies to ajax tables.
* Print
  * Ignore columnSelector "auto" setting when `columnSelector_mediaquery` option is disabled (`false`). Fixes [issue #808](https://github.com/Mottie/tablesorter/issues/808).
* Reflow
  * Trim stored header text.
* Scroller
  * Resizing &amp; browser zooming should now show proper widths. Fixes issues [#680](https://github.com/Mottie/tablesorter/issues/680) &amp; [#634](https://github.com/Mottie/tablesorter/issues/634).
* UITheme
  * Now updates properly when dynamically changing the `table.config.theme` option.
  * During an update, add inner wrapper to specific columns that are missing it.
  * Add separate sort class names to both the header &amp; icon element; breaks old demos, but falls in-line with the addition of core css icon class settings in v2.18.3.
* Themes
  * Add filter row background color; it appears that Chrome uses the `<tr>` background color when the `hideme` class is added to the row.
  * Updated Bootstrap to 3.3.2.
* Testing
  * Update QUnit.
  * Remove jsHint checks.
