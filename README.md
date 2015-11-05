tablesorter (FORK) is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes. tablesorter can successfully parse and sort many types of data including linked data in a cell. This forked version adds lots of new enhancements including: alphanumeric sorting, pager callback functons, multiple widgets providing column styling, ui theme application, sticky headers, column filters and resizer, as well as extended documentation with a lot more demos.

[![Bower Version][bower-image]][bower-url] [![NPM Version][npm-image]][npm-url] [![devDependency Status][david-dev-image]][david-dev-url] [![zenhub-image]][zenhub-url]

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
* Works with jQuery 1.9+ (`$.browser.msie` was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](//tablesorter.com).
* Dual licensed under the [MIT](//www.opensource.org/licenses/mit-license.php) and [GPL](//www.gnu.org/licenses/gpl.html) licenses.

### Download

* Get all files: [zip](//github.com/Mottie/tablesorter/archive/master.zip) or [tar.gz](//github.com/Mottie/tablesorter/archive/master.tar.gz)
* Use [bower](http://bower.io/): `bower install jquery.tablesorter`
* Use [node.js](http://nodejs.org/): `npm install tablesorter`
* CDNJS: [https://cdnjs.com/libraries/jquery.tablesorter](https://cdnjs.com/libraries/jquery.tablesorter)

### Related Projects

* [Plugin for Rails](//github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](//github.com/themilkman).
* [UserFrosting](//github.com/alexweissman/UserFrosting) (A secure, modern user management system for PHP that uses tablesorter) by [alexweissman](//github.com/alexweissman).

### Contributing

If you would like to contribute, please...

1. Fork.
2. Make changes in a branch & add unit tests.
3. Run `grunt test` (if qunit fails, run it again - it's fickle).
4. Create a pull request.

### Special Thanks

* Big shout-out to [Nick Craver](//github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](//github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](//github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Thanks to [prijutme4ty](https://github.com/prijutme4ty) for numerous contributions!
* Also extra thanks to [christhomas](//github.com/christhomas) and [Lynesth](//github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Questions?

* Check the [FAQ](//github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](//mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](//github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](//stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](//github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

[npm-url]: https://npmjs.org/package/tablesorter
[npm-image]: https://img.shields.io/npm/v/tablesorter.svg
[david-dev-url]: https://david-dm.org/Mottie/tablesorter#info=devDependencies
[david-dev-image]: https://img.shields.io/david/dev/Mottie/tablesorter.svg
[bower-url]: http://bower.io/search/?q=jquery.tablesorter
[bower-image]: https://img.shields.io/bower/v/jquery.tablesorter.svg
[zenhub-url]: https://zenhub.io
[zenhub-image]: https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png

### Recent Changes

View the [complete change log here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.24.3">Version 2.24.3</a> (11/4/2015)

* Core
  * jQuery filter element parameter not defined in v1.2.6.
  * Fix `sortRestart` preventing sort. Fixes [issue #1072](https://github.com/Mottie/tablesorter/issues/1072).
* Filter
  * Convert filter array to include all strings. Fixes [issue #1070](https://github.com/Mottie/tablesorter/issues/1070).
  * `setFilter` "apply" parameter now defaults to `true`. See [issue #1071](https://github.com/Mottie/tablesorter/issues/1071).
* Resizable
  * Fix widget bindings after tablesorter "updateAll" event. See [pull #1073](https://github.com/Mottie/tablesorter/pull/1073); thanks [scr34m](https://github.com/scr34m)!
* Misc
  * One more attempt at setting `ignore` in bower.json. See [pull #1063](https://github.com/Mottie/tablesorter/pull/1063).

#### <a name="v2.24.2">Version 2.24.2</a> (11/2/2015)

* Misc
  * Restory empty bower.json ignore setting... bower is installing an empty dist folder.

#### <a name="v2.24.1">Version 2.24.1</a> (11/2/2015)

* Core
  * Cache "shortDate" parser & time parser now extracts the time.
* Group
  * Add optimizations from [pull #830](https://github.com/Mottie/tablesorter/pull/830); thanks to [VorontsovIE](https://github.com/VorontsovIE)!
  * Update [demo](http://mottie.github.io/tablesorter/docs/example-widget-grouping.html) to use new "weekday-index" parser when "group-date-week" is set, and updated "time" parser when "group-date-time" is set.
* Print
  * Rows option now accepts custom css selectors.
* Sort2Hash
  * Remove history push state as it ignored other tables on the page.
* Parsers
  * Globalization parser now caches the `Globalize` object in a same named option.
  * Convert month & weekday parsers to utilize globalization data.
  * Add "weekday-index" parser - this parser ignores the actual date but saves the weekday from a date object
* Misc
  * Revert bower.json changes in [pull #1063](https://github.com/Mottie/tablesorter/pull/1063); Fixes [issue #1068](https://github.com/Mottie/tablesorter/issues/1068).

#### <a name="v2.24.0">Version 2.24.0</a> (10/31/2015)

* Docs
  * Fix mixed content using GitHub buttons on main page. See [pull #1029](https://github.com/Mottie/tablesorter/pull/1029); thanks [OmgImAlexis](https://github.com/OmgImAlexis)!
  * Clarify use of pager `ajaxUrl` option.
  * Add theme class to tables to prevent FOUC.
  * Fix left menu push. The body no longer squeezes the content.
  * Update stickyHeaders after menu close.
  * Include horizontal scroll while jumping to search result.
  * Add some examples (`filter_cssFilter`).
* Global
  * Call internal functions directly; stop using triggered events.
* Core
  * Use plain javascript to set index attribute & remove unused variable. See [issue #1048](https://github.com/Mottie/tablesorter/issues/1048).
  * Add "entire column `colspan`" support. See issues [#485](https://github.com/Mottie/tablesorter/issues/485), [#746](https://github.com/Mottie/tablesorter/issues/746) & [#1047](https://github.com/Mottie/tablesorter/issues/1047).
  * Fix parser detect & sortVars on columns that don't exist due to colspan. See issues [#485](https://github.com/Mottie/tablesorter/issues/485), [#746](https://github.com/Mottie/tablesorter/issues/746) & [#1047](https://github.com/Mottie/tablesorter/issues/1047).
  * Reformat structure & expand variable names.
  * Add `rowFilter` parameter to `getColumnText` function.
  * Fix multisort indicators. Fixes [issue #1005](https://github.com/Mottie/tablesorter/issues/1005), again.
  * `sortAppend` now accepts an object of column references; see [Stackoverflow](http://stackoverflow.com/q/33177910/145346).
  * Internalize sort counter & fix spanned sorts.
  * Add `"tablesorter-ready"` event.
  * Add widget from class before adding widget options.
  * Maintaining support for IE7-8 until 1/12/16.
* Chart
  * Fix `chart_layout` column indexing.
* ColumnSelector
  * Add `mediaqueryHidden` option. Resolves [issue #964](https://github.com/Mottie/tablesorter/issues/964).
  * Extra rows & colspans now supported in `thead` & `tfoot`. Fixes [issue #501](https://github.com/Mottie/tablesorter/issues/501).
  * Fix jscs reported issues.
* Filter
  * Encode/decode filters in case they end up in cookies. See [issue #1026](https://github.com/Mottie/tablesorter/issues/1026).
  * Add "entire column `colspan`" support. See issues [#485](https://github.com/Mottie/tablesorter/issues/485), [#746](https://github.com/Mottie/tablesorter/issues/746) & [#1047](https://github.com/Mottie/tablesorter/issues/1047).
  * `hideFilters` applies to stickyHeaders again. Fixes [issue #1050](https://github.com/Mottie/tablesorter/issues/1050).
  * Prevent error in `formatterUpdated`. Fixes [issue #1056](https://github.com/Mottie/tablesorter/issues/1056).
* Grouping
  * Prevent error if `group_forceColumn` is improperly defined. See [issue #1030](https://github.com/Mottie/tablesorter/issues/1030).
  * Improve compatibility with [jQuery Globalize](https://github.com/jquery/globalize); Find [more details here](http://mottie.github.io/tablesorter/docs/example-widget-grouping.html#globalization).
  * Update header in pager with `removeRows:true`. Fixes [issue #1035](https://github.com/Mottie/tablesorter/issues/1035).
* HeaderTitles
  * Switch to use internalized sort counter.
* Lazyload
  * Add new widget. [Demo](http://mottie.github.io/tablesorter/docs/example-widget-lazyload.html)
* Math
  * Created new calculation type "below". It works just like "above" except in other direction starting from top to bottom. See [pull #1027](https://github.com/Mottie/tablesorter/pull/1027); thanks [LvLynx](https://github.com/LvLynx)!
  * Tweak changes & more tweaks for better compression.
  * Detach table prior to indexing all cells. See [issue #1048](https://github.com/Mottie/tablesorter/issues/1048).
  * Add `math_none` option.
  * Include `config` parameter in math equations - needed for `math_none` option.
* Output
  * Correct `formatContent` function comment (missing widgetOptions variable)
  * Do not include nested table headers with parent. Fixes [issue #1040](https://github.com/Mottie/tablesorter/issues/1040).
* Pager
  * Clear tbody if no data returned by ajax. See [issue #1032](https://github.com/Mottie/tablesorter/issues/1032).
  * Add "all" setting for page size methods; includes select option & all methods. See [issue #1055](https://github.com/Mottie/tablesorter/issues/1055).
  * Fix pager widget demo destroy method.
  * destroyPager again reveals all rows. Fixes [issue #1055](https://github.com/Mottie/tablesorter/issues/1055).
  * Parse page numbers to prevent user seeing `NaN`.
  * Parse page size updates.
* Print
  * Internal variable tweaks.
  * Include css to hide filter rows. Fixes [issue #1046](https://github.com/Mottie/tablesorter/issues/1046).
  * Add print delay; allows browsers to render print preview.
* Scroller
  * Fix `scroller_barWidth` issue in iOS. See [pull #1062](https://github.com/Mottie/tablesorter/pull/1062); thanks [fire-wally](https://github.com/fire-wally)!
* Sort2Hash
  * Update to include pager (page & size) and filter parameters.
* SortTbodies
  * Moved config string defaults to `$.tablesorter.strings` to match core reformatting.
* StickyHeaders
  * `hideFilters` applies to stickyHeaders again. Fixes [issue #1050](https://github.com/Mottie/tablesorter/issues/1050).
* View
  * Add new widget. [Demo](http://mottie.github.io/tablesorter/docs/example-widget-view.html).
  * Fix jscs reported issues.
* Parsers
  * Globalize parser now allows a different language per column.
  * Fix jscs reported issues.
* Misc
  * Bower: use correct theme name. Fixes [issue #1028](https://github.com/Mottie/tablesorter/issues/1028).
  * Readme: Add link to [UserFrosting](https://github.com/alexweissman/UserFrosting) by [alexweissman](https://github.com/alexweissman)
  * Updated build dependencies x2.
  * Added development files & directories to bower ignore. See [pull #1063](https://github.com/Mottie/tablesorter/pull/1063); thanks [jdufresne](https://github.com/jdufresne)!
