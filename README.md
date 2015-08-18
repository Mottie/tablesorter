tablesorter (FORK) is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell. This forked version adds lots of new enhancements including: alphanumeric sorting, pager callback functons, multiple widgets providing column styling, ui theme application, sticky headers, column filters and resizer, as well as extended documentation with a lot more demos.

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

### Download

* Get [all files](https://github.com/Mottie/tablesorter/archive/master.zip)
* Use [bower](http://bower.io/): `bower install jquery.tablesorter`
* Use [node.js](http://nodejs.org/): `npm install tablesorter`
* CDNJS: [https://cdnjs.com/libraries/jquery.tablesorter](https://cdnjs.com/libraries/jquery.tablesorter)

### Related Projects

* [Plugin for Rails](//github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](//github.com/themilkman).
* [Bootsole](//alexweissman.github.io/bootsole/) (OOP templating engine using tablesorter) by [alexweissman](//github.com/alexweissman).

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

### Recent Changes

View the [complete change log here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.23.0">Version 2.23.0</a> (8/17/2015)

* Core:
  * Prevent `addRows` error. See [issue #979](https://github.com/Mottie/tablesorter/issues/979).
  * Make all updating methods public
    * Call a function instead of triggering an event on the table. Changes include:
      * `$.tablesorter.addRows` - called by `addRows` method.
      * `$.tablesorter.appendCache` - renamed from `appendToTable`; appends cache
          to DOM, called by `appendCache` method.
      * `$.tablesorter.isEmptyObject` - clone of `$.isEmptyObject` (jQuery v1.4).
      * `$.tablesorter.sortOn` - called by `sortOn` method.
      * `$.tablesorter.sortReset` - called by `sortReset` method.
      * `$.tablesorter.updateAll` - called by `updateAll` method.
      * `$.tablesorter.updateCache` - called by `updateCache` method.
      * `$.tablesorter.updateCell` - called by `updateCell` method.
      * `$.tablesorter.update` - called by `update` and `updateRows` method.
  * `addRows` now accepts a row string *if only one tbody exists* in the table.
    * The one tbody does not include information only tbodies (which have a class name from `cssInfoBlock`).
    * Previously, you had to make a jQuery object, append it to the table, then pass a reference containing the new rows.
    * This method doesn't work if a table has multiple tbodies, because the plugin doesn't know where you want to add the rows.
    * Also, updated the debug message for this method.
  * Use header cells instead of references to prevent IE8 error. Fixes [issue #987](https://github.com/Mottie/tablesorter/issues/987).
  * Fix above header cell targetting causing a javascript error in jQuery v1.2.6. Fixes [issue #995](https://github.com/Mottie/tablesorter/issues/995).
  * Add `updateHeaders` method
    * Triggered event & public api function.
    * `$.tablesorter.updateHeaders` - called by `updateHeaders` method.
    * Fixes [issue #989](https://github.com/Mottie/tablesorter/issues/989).
* Docs:
  * Update jQuery UI theme switcher URLs.
* ColumnSelector:
  * Modify `refreshColumnSelector` method so it also updates the contents of the container in case of changes to the header text, column priorities, etc.
  * See examples of these changes in the column selector [methods section](http://mottie.github.io/tablesorter/docs/example-widget-column-selector.html#methods).
  * Fixes [issue #985](https://github.com/Mottie/tablesorter/issues/985).
* Editable:
  * Improve column option parsing. Fixes issues [#982](https://github.com/Mottie/tablesorter/issues/982) & [#979](https://github.com/Mottie/tablesorter/issues/979).
* Filter:
  * Fix js error caused when limiting search columns - external "any" filter targeting specific columns; see [Stackoverflow](http://stackoverflow.com/q/32052986/145346).
* Pager:
  * Widget only: No more javascript error in widget ajax error message.
  * Addon only: replace use of `$.isEmptyObject` which was not available in jQuery v1.2.6.
  * Change enable, disable & destroy trigger methods.
    * Previously, these methods had to include a `.pager` namespace: `enable.pager`, `disable.pager` & `destroy.pager`.
    * These methods stopped working when unique pager namespaces were added.
    * New trigger methods are named as follows: `enablePager`, `disablePager` & `destroyPager`.
    * Fixes [issue #980](https://github.com/Mottie/tablesorter/issues/980).
  * Unbind pager controls on destroy. Fixes [issue #981](https://github.com/Mottie/tablesorter/issues/981).
  * Add `ajaxError` callback function. Fixes [issue #992](https://github.com/Mottie/tablesorter/issues/992).
* Parsers:
  * parser-input-select: fix javascript error when no rows returned.
* Misc & Testing
  * Miscellaneous cleanup of testing code.
  * Add empty `ignore` entry to bower.json. Fixes [issue #991](https://github.com/Mottie/tablesorter/issues/991).
  * Fix license in package.json to match the new spdx license expression syntax.

#### <a name="v2.22.5">Version 2.22.5</a> (7/28/2015)

* Overall:
 * Set JSHint "undef" & "unused" options. Fixed issues.
 * The math widget was throwing a javascript error after missing a changed variable name & JSHint wasn't catching it, until now.

#### <a name="v2.22.4">Version 2.22.4</a> (7/28/2015)

* Overall
  * update debug logging. `console` is now called directly & includes grouping, tables, warning & errors.
* Core
  * Replace `tbody` placeholder use of a `<span>` with a `<colgroup>`. Attempt to resolve IE error reported in [issue #938](https://github.com/Mottie/tablesorter/issues/938).
  * Fix `$.tablesorter.hasWidget` error introduced when fixing jscs issues.
  * Fix `$.tablesorter.isProcessing` error introduced when fixing jscs issues.
  * Update `isValueInArray` function to prevent js errors with invalid input.
* Docs
  * Remove duplicate section in math widget docs.
  * Add resizable widget note about leaving `widthFixed` set to `false`. See [issue #958](https://github.com/Mottie/tablesorter/issues/958).
  * Update to use jQuery v1.11.3.
  * Change deprecated window load function.
  * Improve [two-digit year parser demo](http://mottie.github.io/tablesorter/docs/example-parsers-dates.html).
  * Minor updates.
* Filter
  * Prevent invalid RegExp errors which occur while typing in an incomplete query.
* Math
  * Ignored rows are now properly ignored in columns. Fixes [issue #976](https://github.com/Mottie/tablesorter/issues/976).
* Output
  * Add `output_formatContent` callback - see [Stackoverflow](http://stackoverflow.com/q/31457323/145346).
  * Make compatible with the scroller widget when it hides columns. See [pull #970](https://github.com/Mottie/tablesorter/pull/970), thanks [VictorT83](https://github.com/VictorT83)!
* Pager
  * Bind using unique event namespace. See [issue #961](https://github.com/Mottie/tablesorter/issues/961).
* Scroller
  * Prevent error on destroy when not applied. See [issue #965](https://github.com/Mottie/tablesorter/issues/965).
  * Fix js error in old IE.
  * Delay resize after updateAll.
  * Include `sortEnd` in fixed column updates. See [issue #977](https://github.com/Mottie/tablesorter/issues/977).
* Sort2Hash
  * This widget updates the location hash based on the table sort, and sets the table sort on initialization. [demo](http://mottie.github.io/tablesorter/docs/example-widget-sort-to-hash.html).
  * A user can share a link with others and have the table in the same sorted order.
  * The hash can be set to use header text and any text to indicate an ascending or descending sort.
  * Add text & saveSort override options. Fixes [issue #962](https://github.com/Mottie/tablesorter/issues/962).
  * Other minor revisions.
* Parsers
  * Checkbox in multiple columns now toggles the row class correctly.
* Grunt build: Add jscs checking & fix reported style issues.
* Testing
  * Update QUnit to 1.18.0.
  * Add `removeWidget` test.
  * Add `isValueInArray` tests.
  * Add `isProcessing` tests.
* Extras - dropping support for [quicksearch](https://github.com/riklomas/quicksearch) plugin.
