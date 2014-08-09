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

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.17.7">Version 2.17.7</a> (8/9/2014)

* Core: Do not detach rows before appending to prevent ajax rows from disappearing. Fixes [issue #701](https://github.com/Mottie/tablesorter/issues/701).
* Docs: Fix change log links.
* Filter: attached external select causing javascript errors. Fixes [issue #702](https://github.com/Mottie/tablesorter/issues/702)

#### <a name="v2.17.6">Version 2.17.6</a> (8/1/2014)

* Core
  * Adding a class name of `parser-false` to a column will now automatically set `sorter-false` and `filter-false` behavior.
  * Add extractor type which allows giving a column two parsers, one to extract content from an input/select and the second to parse the extracted text. Thanks to [TheSin-](https://github.com/TheSin-)!
  * Ensure custom parsed data adheres to the `ignoreCase` option.
  * Add a delay to any sort if there is an update in progress. This prevents issues with a sort being applied causing duplicate rows to be added to the table, hopefully.
  * The `widthFixed` option now finds both visible `th` and `td` cells within the first row of the tbody to set column width percentages.
  * Ensure all rows have a set role for screen readers (`role="row"`). Fixes [issue #690](https://github.com/Mottie/tablesorter/issues/690).
  * Redefine `c.$headers` when building headers for new/replaced header cells (not just content). Fixes [issue #683](https://github.com/Mottie/tablesorter/issues/683).
* Docs
  * Fixed lots of minor HTML issues (e.g. missing closing `</li>` &amp; `<p>` tags)
* Parsers
  * Add parser for textareas within the `parser-input-select.js` file.
  * Modify input &amp; textarea parser to only update the table cache when:
      * The user presses enter (input) or alt + enter (textarea) within the element.
      * When the element is blurred.
      * Or, when the mouse leaves the tbody.
* Editable
  * Add two new options:
      * `editable_autoAccept`: accepts any changes made to the table cell automatically (`true` by default)
      * `editable_validate`: a function used to validate the changes; return a valid string (`null` by default)
  * Modify `editable_columns` type check to prevent javascript errors. See [pull #688](https://github.com/Mottie/tablesorter/issues/688). Thanks [scratcher28](https://github.com/scratcher28)!
  * Limit the `editable_columns` array value to columns within the table.
* Filter
  * Make all options show within the current select when the `filter-onlyAvail` class is set on a column.
  * Updated &amp; added docs for `$.tablesorter.filter.buildSelect` function to allow external calls to modify filter select options.
  * Update `filter_selectSource` to accept arrays instead of a function. This was documented as working, but it wasn't coded until now. Sorry!
  * Add `filter_selectSourceSeparator` option:
      * Include a separator within the `filter_selectSource` array (e.g. "a-z|A through Z").
      * The text that is left of the separator is added to the option value, the the text on the right is added to the option text.
      * So `"a-z|A through Z"` becomes `<option value="a-z">A through Z</option>`.
      * Fixes [issue #692](https://github.com/Mottie/tablesorter/issues/692).
  * Add `role="row"` to the filter row. Fixes [issue #697](https://github.com/Mottie/tablesorter/issues/697).
  * Any match inputs now follow the `filter_startsWith` setting. See [this Stackoverflow](http://stackoverflow.com/q/25070448/145346) question.
* Pager
  * The `ouput` option can now include user modifiable `startRow` (`{startRow:input}`) or `page` (`{page:input}`) inputs within the output.
  * Remove selected attribute from page selector options. Fixes [issue #700](https://github.com/Mottie/tablesorter/issues/700).
* Resizable
  * Update `$.tablesorter.addHeaderResizeEvent` function's first parameter `table` to accept table DOM elements as well as jQuery objects. Fixes [issue #687](https://github.com/Mottie/tablesorter/issues/687).

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
