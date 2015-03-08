tablesorter (FORK) is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
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

#### <a name="v2.21.0">Version 2.21.0</a> (3/5/2015)

* Core
  * Plan to manually update vesion number.
  * Optimizations: replace arrays using `$.each` with for loops. Fixes [issue #827](https://github.com/Mottie/tablesorter/issues/827).
  * Add `$.tablesorter.addInstanceMethods` function.
    * This allows one to define config object instance methods ([docs](http://mottie.github.io/tablesorter/docs/#variable-instanceMethods)).
    * Thanks to [prijutme4ty](https://github.com/prijutme4ty) for contributing!
  * Add `config.$headerIndexed` option ([docs](http://mottie.github.io/tablesorter/docs/#variable-header-indexed)).
* Docs
  * Update link in readme.
  * Add contributing information.
  * Update download method information.
* Build/Testing
  * Move jshint to "grunt test" task.
  * Attempt to make nested callbacks more stable.
  * Clean up testing & made more stable, by [prijutme4ty](https://github.com/prijutme4ty).
* ColumnSelector
  * Add more debug logging.
* Filter
  * Add more debug logging.
  * Add `config` parameter to `filter_functions`.
  * Add "widget-filter-type-insideRange.js" filter type; this filter type allows searching for a value that is within a range ([demo](http://mottie.github.io/tablesorter/docs/example-parsers-date-range.html)).
  * External filters can now set initial values; this includes match-any-column inputs.
  * Extend filterFormatter functions - fixes an issue where HTML5 &amp; jQuery ui filterFormatters override the function definitions.
* Output
  * Add `output_includeFooter` option.
* Pager
  * Add more debug logging.
* Scroller
  * Add missing `tfoot` rows. Fixes [issue #825](https://github.com/Mottie/tablesorter/issues/825).
* StickyHeaders
  * Now works properly with a full-height wrapper. Fixes [issue #564](https://github.com/Mottie/tablesorter/issues/564).
  * Add stickyHeader hidden class name & modal demo links. Fixes [issue #832](https://github.com/Mottie/tablesorter/issues/832).

#### <a name="v2.20.1">Version 2.20.1</a> (2/20/2015)

* Filter: Fixed a major issue with the filter widget not working properly.

#### <a name="v2.20.0">Version 2.20.0</a> (2/20/2015)

* Grunt build process
  * Added code to use npm & grunt to build a custom widget file.
  * An `example.json` file has been added as an example of how to set up a custom build file; see the [Customize](https://github.com/Mottie/tablesorter/wiki/Customize) wiki page for more details.
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
