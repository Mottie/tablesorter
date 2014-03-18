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

#### <a name="v2.15.11">Version 2.15.11</a> (3/18/2014)

* Updated Bootstrap to v3.1.1
* Check if cell has parser to catch undefined error. Fixes [issue #546](https://github.com/Mottie/tablesorter/pull/546). Thanks [antila](https://github.com/antila)!
* Column count is now correct with nested tables (with tfoot). Fixes [issue #547](https://github.com/Mottie/tablesorter/issues/547).
* Fix table reset on pagination change. Fixes [issue #548](https://github.com/Mottie/tablesorter/pull/548). Thanks [evanboho](https://github.com/evanboho)!

#### <a name="v2.15.10">Version 2.15.10</a> (3/13/2014)

* Fix `numberSorter` option causing a javascript error &amp; added test.

#### <a name="v2.15.9">Version 2.15.9</a> (3/12/2014)

* jQuery UI Filter formatter scripts work again (broken since adding unique namespaces in v2.15.7).

#### <a name="v2.15.8">Version 2.15.8</a> (3/12/2014)

* Filter widget
  * Search delay is no longer ignored.
  * Fixes issues [#544](https://github.com/Mottie/tablesorter/issues/544) &amp; [#545](https://github.com/Mottie/tablesorter/pull/545)
  * Thanks to [@dturkenk](https://github.com/dturkenk) for this contribution!

* Align Character widget (beta)
  * Added this widget to help align cell content on a character (space, decimal, etc).
  * Check out [the demo](http://mottie.github.io/tablesorter/docs/example-widget-align-character.html)!

#### <a name="v2.15.7">Version 2.15.7</a> (3/9/2014)

* Core
  * Minor natural sort algorithm optimization
  * Added `namespace` which should contain a unique namespace for each table; it is used when binding to event listeners.

* Build table widget
  * Removed inappropriate empty table console message when initializing.
  * [build table widget](http://mottie.github.io/tablesorter/docs/example-widget-build-table.html) documentation update (includes `<head>` scripts &amp; css)
  * Fixed nested accordions

* Column selector widget
  * Setting the `columnSelector_saveColumns` option to `true` now saves the "auto" state. Fixes [issue #517](https://github.com/Mottie/tablesorter/issues/517).

* Filter widget
  * Use the new `namespace` option to use with event listeners. Fixes [issue #535](https://github.com/Mottie/tablesorter/issues/535).

* headerTitles widget
  * Sorry for all of these breaking changes, I should have left this widget in beta.
  * The `headerTitle_prefix`, `headerTitle_text`, `headerTitle_numeric` options has been replaced, in lieu of the new ouput options; sorry for no deprecation notice.
  * Added `headerTitle_useAria`, `headerTitle_tooltip`, `headerTitle_output_sorted`, `headerTitle_output_unsorted`, `headerTitle_output_nosort`, `headerTitle_cur_text`, `headerTitle_cur_numeric`, `headerTitle_nxt_text`, `headerTitle_nxt_numeric`, `headerTitle_type` &amp; `headerTitle_callback` options. See the [headerTitles widget demo](http://mottie.github.io/tablesorter/docs/example-widget-header-titles.html) for more details.
  * Added `"refreshHeaderTitle"` method to force the widget to update.

#### <a name="v2.15.6">Version 2.15.6</a> (3/7/2014)

* Doc
  * Added docs for `$.tablesorter.language` which contains the text used in the `aria-label` for the header
  * Update `isValueInArray` &amp; `sortAppend` docs.

* Core
  * Destroy now unbinds the `updateCache` method properly
  * Update `$.tablesorter.isValueInArray` function &amp; `sortAppend` option. Fixes [issue #523](https://github.com/Mottie/tablesorter/issues/523).
  * All test dates are now time zone & DST independent. Fixes [issue #516](https://github.com/Mottie/tablesorter/issues/516).
  * Added tests for `sortForce`, `sortAppend`, `sortMultiSortKey` and `sortResetKey`.
  * Cache natural sort regex.
  * Date parsers now return the original cell text instead of an empty string when encountering invalid dates. Sort of fixes [issue #531](https://github.com/Mottie/tablesorter/issues/531).
  * Event fixes:
      * Sort events will now only show when the table is being sorted; previously when updating an unsorted table, sort events would fire.
      * The `updateComplete` event now fires after every triggered update (`update`, `updateRows`, `updateAll`, `updateCell` &amp; `addRows`)
      * Updated pager to correctly trigger the `updateComplete` event when using ajax.
      * Added unit tests to ensure these events fire on an empty table.
      * Fixes [issue #532](https://github.com/Mottie/tablesorter/issues/532)

* ColumnSelector widget
  * Make column disable, visible &amp; invisible methods consistent. Fixes [issue #519](https://github.com/Mottie/tablesorter/issues/519)

* Filter widget
  * Preset filter searches (set by `data-value` on the header) work again. Fixes issues [#511](https://github.com/Mottie/tablesorter/issues/511) &amp; [#525](https://github.com/Mottie/tablesorter/issues/525).
  * Add note to docs about adding a placeholder. Fixes [issue #522](https://github.com/Mottie/tablesorter/issues/522).
  * Filter build select function no longer causes a javascript error on empty tables. Fixes [issue #528](https://github.com/Mottie/tablesorter/issues/528).

* Grouping widget
  * The `collapsed` option once again shows the group headers. Fixes issues [#514](https://github.com/Mottie/tablesorter/issues/514) & [533](https://github.com/Mottie/tablesorter/issues/533)
  * Add `group_saveGroups` &amp; `group_saveReset` options:
    * The `group_saveGroups` option (`true` by default) saves the group name of any collapsed groups (requires `group_collapsible` to be `true`)
    * The `group_saveReset` option (`null` by default) contains a jQuery selector string or jQuery object pointing to an element to be used to clear the saved groups.
    * Both of these options require the storage utility script contained within the `jquery.tablesorter.widgets.js` file.
    * Fullfils feature request of [issue #514](https://github.com/Mottie/tablesorter/issues/514).
  * Added details about using regular expressions within the `group_separator` option.

* Header Titles widget (headerTitles)
  * New widget which adds the current sort to the header title attribute.
  * It distinguishes between a text and numeric sort and includes the current sort direction
  * A prefix can be included.
  * By default, an ascending sort shows either "A - Z" or "0 - 9", or "Z - A" or "9 - 0" for descending sorts.
  * Note that date columns will show as numeric
  * Fixes [issue #529](https://github.com/Mottie/tablesorter/issues/529).

* Pager (addon & widget)
  * Ensure empty array `[]` and array of empty strings `['', '', '']` evaluate as the same when checking if the filters have changed. Fixes [issue #202](https://github.com/Mottie/tablesorter/issues/202) (again).
  * Compare `totalRows` vs. `totalPages` when preventing an ajax call.
  * Changes to make the `updateComplete` event fire, but because of the asynchronous nature of ajax, it fires before any `sortEnd` events. It may take some more work to resolve this, if it becomes a concern.
  * Attempted to fix pager row count issue. See [issue #455](https://github.com/Mottie/tablesorter/issues/455).

* Miscellaneous
  * Pager custom controls (beta) now shows no pages on a single page. Fixes [issue #518](https://github.com/Mottie/tablesorter/issues/518)
  * Increase Bootstrap 3 theme css specificity. See [issue #515](https://github.com/Mottie/tablesorter/issues/515)
  * Checkbox parser no longer causes a js error when a checkbox doesn't exist.

#### <a name="v2.15.5">Version 2.15.5</a> (2/23/2014)

* Pager widget now initializes properly when using ajax. Fixes [issue #510](https://github.com/Mottie/tablesorter/issues/510).
