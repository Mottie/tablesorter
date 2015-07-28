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

#### <a name="v2.22.3">Version 2.22.3</a> (6/30/2015)

* Scroller: fix javascript error `scroller_$fixedColumns` is undefined.

#### <a name="v2.22.2">Version 2.22.2</a> (6/30/2015)

* Core
  * Only use `preventDefault` in specific jQuery versions (v1.3.2 & older). Fixes [issue #911](https://github.com/Mottie/tablesorter/issues/911).
  * The `"updateCache"` method now accepts a `tbody` object.
  * Make `getParsedText` a public function.
  * Allow empty string in textExtraction data-attribute. Fixes [issue #954](https://github.com/Mottie/tablesorter/issues/954).
* Docs
  * Update trigger sort method documentation.
  * Update information about `cssIgnoreRow`. See [issue #911](https://github.com/Mottie/tablesorter/issues/911).
  * Add requirement to include `.filter { display: none }` in custom themes.
  * Improve Bootstrap example in column selector docs. See [pull #935](https://github.com/Mottie/tablesorter/pull/935), thanks [@Herst](https://github.com/Herst)!
  * Clean up & corrections:
    * Code examples in math & editing demos.
    * Corrected comments in "Skip the parsing of column content" demo.
    * Fix HTML validation issues.
  * Add contributing.md link to [JSCS formatting file](https://gist.github.com/Herst/39263a478046a48f1860) by [@Herst](https://github.com/Herst).
  * Update to Bootstrap v3.3.5.
* Parsers
  * Checkbox: add checkbox parser class name option (`config.checkboxClass`).
  * Metric: Support metric base unit case insensitivity.
* Editable
  * Allow <kbd>Shift</kbd>+<kbd>Enter</kbd> to create a new line (even with `editable_enterToAccept` set as `true`).
  * Update cache without requiring a hover over the `thead`; cache order now properly maintained on touch devices.
* Filter
  * Target last used filter properly. See [issue #920](https://github.com/Mottie/tablesorter/issues/920).
  * `filter_selectSource` now ignores parsers, if none are set (empty or ajax tables). See [issue #934](https://github.com/Mottie/tablesorter/issues/934).
  * Add support for nesting of "AND" & "OR" searches. Fixes issues [#891](https://github.com/Mottie/tablesorter/issues/891) & [#918](https://github.com/Mottie/tablesorter/issues/918).
  * Filter row remains visible after focused when `filter_hideFilters` is set.
  * Remove trailing comma in [pull #948](https://github.com/Mottie/tablesorter/pull/948), thanks [@Herst](https://github.com/Herst)!
* Output
  * Allow empty string data-attributes. See [issue #923](https://github.com/Mottie/tablesorter/issues/923).
  * `output_saveRows` now accepts jQuery filter selectors. See [issue #923](https://github.com/Mottie/tablesorter/issues/923).
  * Fix `hiddenColumns` option causing an empty output. Fixes [issue #923](https://github.com/Mottie/tablesorter/issues/923).
  * Prevent javascript error when no row data is passed. See [issue #923](https://github.com/Mottie/tablesorter/issues/923).
  * Remove `tfoot` clone, instead concat data to the end.
  * Fix `colspan`s and hidden columns.
  * Stop `outputTable` method propagation. Fixes [issue #944](https://github.com/Mottie/tablesorter/issues/944).
* Pager
  * Make `hasWidget` think the pager addon is a widget.
  * Prevent adding a row if ajax returned JSON `totalrows` is zero. See [Stackoverflow](http://stackoverflow.com/q/30875583/145346).
* RepeatHeaders
  * use `selectorRemove` option setting.
* Resizable
  * Replace window resize trigger. See [issue #912](https://github.com/Mottie/tablesorter/issues/912).
  * Resizing now works with overflow wrapped tables. Fixes [issue #953](https://github.com/Mottie/tablesorter/issues/953).
* Scroller
  * Fix added stylesheet error using "," instead of ";".
  * Remove `colgroup` & hidden elements in fixed columns.
  * Fix slow fixed column scrolling in Firefox. See [issue #135](https://github.com/Mottie/tablesorter/issues/135).
  * Multiple `tbody` fix. See issues [#906](https://github.com/Mottie/tablesorter/issues/906) & [#913](https://github.com/Mottie/tablesorter/issues/913).
  * Limit horizontal scrollbar to scrolling section.
  * Removed `widthFixed` requirement.
  * Update RTL support.
  * Fix column alignment. Fixes [issue #913](https://github.com/Mottie/tablesorter/issues/913).
  * Fix filter return zero to few rows.
  * Reduce init lag & correct no fixed column tbody width. See [issue #906](https://github.com/Mottie/tablesorter/issues/906).
  * Fix mousewheel scrolling on fixed columns.
  * Cleanup & old IE fix.
  * Fix column alignment issues [#940](https://github.com/Mottie/tablesorter/issues/940), [#937](https://github.com/Mottie/tablesorter/issues/937), [#931](https://github.com/Mottie/tablesorter/issues/931) & [#927](https://github.com/Mottie/tablesorter/issues/927).
  * Throttle IE scrolling. Partially fixes [issue #928](https://github.com/Mottie/tablesorter/issues/928).
  * Save scroll positioning. Fixes issues [#926](https://github.com/Mottie/tablesorter/issues/926) & [#932](https://github.com/Mottie/tablesorter/issues/932).
  * Integrate with:
    * pager. Fixes [issue #884](https://github.com/Mottie/tablesorter/issues/884).
    * columnSelector. Fixes [issue #905](https://github.com/Mottie/tablesorter/issues/905).
* SortTbodies (beta)
  * Add new widget to allow the sorting of tbodies based on a primary row.
  * Fixes [pull #195](https://github.com/Mottie/tablesorter/pull/195) & [issue #833](https://github.com/Mottie/tablesorter/issues/833).
  * Documentation & demo page added: http://mottie.github.io/tablesorter/docs/example-widget-sort-tbodies.html
* StickyHeaders
  * Replace window resize trigger. See [issue #912](https://github.com/Mottie/tablesorter/issues/912).
  * Fix javascript error. See [issue #920](https://github.com/Mottie/tablesorter/issues/920).
* Zebra
  * Target non-info block tbodies in extra tables.
* Grunt
  * Update grunt modules.
  * Remove moot "version" property from bower.json. See [pull #941](https://github.com/Mottie/tablesorter/pull/941), thanks [@kkirsche](https://github.com/kkirsche)!
  * Don't update bower.json in Gruntfile.js.
  * Check for old IE issue in [pull #949](https://github.com/Mottie/tablesorter/pull/949), thanks [@Herst](https://github.com/Herst)!
