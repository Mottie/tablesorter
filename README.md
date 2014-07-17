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

#### <a name="v2.17.5">Version 2.17.5</a> (7/17/2014)

* Core
  * Update `config.totalRows` variable before initialization. Fixes [issue #670](https://github.com/Mottie/tablesorter/issues/670).
  * Add `config.table` variable; useful for functions that only pass the `config`.
  * Ensure widget init functions are only called once; and set indicator for all widgets, not just ones with options (for `hasWidget`).

* Docs
  * Add [custom filter widget search types demo](http://mottie.github.io/tablesorter/docs/example-filter-custom-search.html).
  * Add `imgAttr` parser "utility option" instructions.

* Filter
  * Force cache build on initial search when `delayInit` is `true`. Fixes [issue #678](https://github.com/Mottie/tablesorter/issues/678).
  * Make `config.filteredRows` count available within `filterInit` event. Fixes [issue #670](https://github.com/Mottie/tablesorter/issues/670).
  * Selects now obtain parsed data when it is set for a particular column. Fixes [issue #684](https://github.com/Mottie/tablesorter/issues/684).
  * Ignore change event if input value hasn't changed, otherwise it interferes with other events within the table. Fixes [issue #685](https://github.com/Mottie/tablesorter/issues/685).
  * Ensure search query is parsed for both specific filter types and non-filter type searches, if the column is set to use parsed data.
  * Filter initialization ("filterInit") event is now delayed to prevent filterStart &amp; filterEnd event spamming. Fixes [issue #668](https://github.com/Mottie/tablesorter/issues/668).
  * Filter formatter functions are now required to call a function after initialization to delay "filterInit" event. Fixes [issue #668](https://github.com/Mottie/tablesorter/issues/668).

* Output
  * Update download method which allows downloading files without modifying the server htaccess. Fixes [issue #681](https://github.com/Mottie/tablesorter/issues/681).

* Pager
  * Initialize without building cache when `delayInit` is `true`. Fixes [issue #678](https://github.com/Mottie/tablesorter/issues/678).

* Parsers
  * Update input/select element binding
  * Add image alt parser; set `config.imgAttr` with attribute to target (default is `"alt"`).
  * Add `select-text` parser which grabs the currently selected option text instead of the select value.

* Resizable
  * Remove unused grip code

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
