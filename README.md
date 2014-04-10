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

#### <a name="v2.15.10">Version 2.15.10</a> (3/13/2014)

* Fix `numberSorter` option causing a javascript error &amp; added test.
