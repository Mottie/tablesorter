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

#### <a name="v2.22.1">Version 2.22.1</a> (5/17/2015)

* Filter: fix issue with searches always looking for parsed content in numeric columns.

#### <a name="v2.22.0">Version 2.22.0</a> (5/17/2015)

* Docs
  * Lots of minor version updates, spelling corrections & clarifications in wording.
  * Update box-sizing styles ([ref](http://www.paulirish.com/2012/box-sizing-border-box-ftw/)).
  * Update `characterEquivalents` cross-reference to correctly match the code of the plugin.
  * Add Build table widget example resulting HTML for the json example.
* Grunt build
  * `package.json` files now points to the entire "dist" folder. See [issue #881](https://github.com/Mottie/tablesorter/issues/881).
  * Add `grunt quick` build to only update widget & parser files; it skips updating the dates in the widgets & combined files.
* Core
  * The `isDigit` function now reports `false` on empty strings. See [issue #865](https://github.com/Mottie/tablesorter/issues/865).
  * Add pointer events options (`pointerClick`, `pointerDown` and `pointerUp`). Fixes [issue #885](https://github.com/Mottie/tablesorter/issues/885).
  * Prevent js error when using the `computeColumnIndex` function on empty tables (used by the math widget). Fixes [issue #889](https://github.com/Mottie/tablesorter/issues/889).
  * Prevent js error when `sortList` includes an out-of-bounds column. Fixes [issue #908](https://github.com/Mottie/tablesorter/issues/908).
  * Centralize extractor & parser code; this code is used by the main build cache loop and the "addRows" & "updateCell" methods.
  * Child row content is now properly stored in row data as an array of arrays.
  * Add "o" to `sortLocaleCompare` replacement table & update docs.
  * Replace all instances of using jQuery each with plain javascript. Fixes [issue #827](https://github.com/Mottie/tablesorter/issues/827).
* Editable
  * Modify `trimContent` option & use HTML to modify text. Fixes [issue #886](https://github.com/Mottie/tablesorter/issues/886).
  * Fix `selectAll` & change `tbody` mouseleave to complete editing to `thead` mouseenter. Fixes [issue #848](https://github.com/Mottie/tablesorter/issues/848).
  * Only make table cell child div/span contenteditable. See [issue #900](https://github.com/Mottie/tablesorter/issues/900).
  * Add remove widget code & allow dynamic updating if the "no-edit" class changes. Fixes [issue #900](https://github.com/Mottie/tablesorter/issues/900).
* Filter
  * Regex filter searches now cache the created regex object for each query to optimize speed & a regex search now properly uses case-sensitive content
  * Add `data` parameter to `filter_functions`. This is the same data used by the filter search type functions. See [issue #891](https://github.com/Mottie/tablesorter/issues/891).
  * Any match searches which target specific columns will no longer save each filter to its respective column; see ["AnyMatch Searches"](http://mottie.github.io/tablesorter/docs/example-widget-filter-any-match.html#anymatch_searches) documentation.
  * Operator filter searchs now ignore empty strings (because `"" < 10` is `true`).
  * Clean up `parseFilter` function.
  * Add `filter_childByColumn` option.
    * Setting this to `true` allows searching through the child rows by column.
    * When `false`, the search behaves as before and all child row content is included in the search of every column.
    * See a [demo here](http://mottie.github.io/tablesorter/docs/example-child-rows-filtered.html#child-by-column).
    * Fixes issues [#396](https://github.com/Mottie/tablesorter/issues/396) &amp; [#574](https://github.com/Mottie/tablesorter/issues/574).
  * Code cleanup - added a bunch of whitespace & forced line wraps at around 120.
  * Prevent setFilter function from setting the same filters after an update. Fixes issues [#903](https://github.com/Mottie/tablesorter/issues/903) &amp; [#733](https://github.com/Mottie/tablesorter/issues/733).
* Grouping
  * Add keyboard accessibility to group headers. See [issue #260](https://github.com/Mottie/tablesorter/issues/260).
* Math
  * Fix issues with `isNaN('') // false`. See [issue #873](https://github.com/Mottie/tablesorter/issues/873).
  * Reapply column indexing after updates & prevent js error on empty tables. Fixes [issue #889](https://github.com/Mottie/tablesorter/issues/889).
  * Reduce update time to 20ms. See [issue #898](https://github.com/Mottie/tablesorter/issues/898).
  * Exclude ignored cells even if `math_ignore` is empty. Fixes [issue #896](https://github.com/Mottie/tablesorter/issues/896).
* Output
  * Add BOM back to downloaded file. Fixes [issue #862](https://github.com/Mottie/tablesorter/issues/862).
  * Add `output_hiddenColumns` option. Fixes [issue #869](https://github.com/Mottie/tablesorter/issues/869).
  * Add known issues section about downloading in Safari.
* Pager (addon & widget)
  * Replace all instances of using jQuery each with plain javascript. Fixes [issue #827](https://github.com/Mottie/tablesorter/issues/827).
* Resizable
  * Refreshing the widget will now preserve the storage. See [issue #874](https://github.com/Mottie/tablesorter/issues/874).
* Scroller
  * Set `overflow-x` auto & apply border-box to scroller. See [issue #135](https://github.com/Mottie/tablesorter/issues/135).
  * Remove `pointer-events: none` from fixed column. See [issue #878](https://github.com/Mottie/tablesorter/issues/878).
  * Hide fixed column scrollbar in IE9 & older. See [issue #135](https://github.com/Mottie/tablesorter/issues/135).
  * Update `pointer-events` and tabbing accessibility. See [issue #135](https://github.com/Mottie/tablesorter/issues/135).
  * `setFixedColumnSize` now properly updates with no set size.
  * Add `scroller_addFixedOverlay`
    * When `true`, a fixed column overlay is added for additional styling. See [issue #887](https://github.com/Mottie/tablesorter/issues/887).
    * It includes css [`pointer-events`](http://caniuse.com/#search=pointer-events) set to `none` to allow interaction with elements underneath; make sure your browser supports it!
  * Fix selector issue in the remove function.
  * Properly refresh column size after an update. Fixes the third part of [issue #906](https://github.com/Mottie/tablesorter/issues/906).
* Parsers
  * Add "inputs-numeric" parser. Fixes [issue #888](https://github.com/Mottie/tablesorter/issues/888).
  * Add [jQuery Globalize](https://github.com/jquery/globalize) [date](http://jsfiddle.net/Mottie/0j18Lw8r/) & [number](http://jsfiddle.net/Mottie/0j18Lw8r/) parsers.
  * "namedNumbers" parser: ignores adjacent puncutation. Fixes [issue #890](https://github.com/Mottie/tablesorter/issues/890).
  * input-select parsers:
    * Clean up & add event namespaces.
    * Now return an empty string if the value is empty; previously, it would return the cell text when the value was empty.
  * Network "MAC" parser:
    * Return the original string if the address is grossly invalid. Fixes [issue #895](https://github.com/Mottie/tablesorter/issues/895).
    * No longer auto-detect as iPv6. See [issue #895](https://github.com/Mottie/tablesorter/issues/895).
* Themes
  * Declare font-weight separately. Thanks [nikolas](https://github.com/nikolas) ([pull #866](https://github.com/Mottie/tablesorter/pull/868))!
  * Update Boostrap v2.x theme, and add a [Bootstrap v2.x demo](http://mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme-v2.html).
