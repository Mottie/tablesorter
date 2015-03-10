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

#### <a name="v2.21.1">Version 2.21.1</a> (3/10/2015)

* Core:
  * Optimize `getColumnData` function.
  * Use `:last` instead of `.last()` to maintain jQuery v1.2.6 compatibility.
  * Allow multiple icon class names in the `cssIcon` definition.
* Docs
  * Remove initial sort on first table to avoid confusion.
  * Miscellaneous tweaks.
* Build
  * Add UMD wrapper to built "jquery.tablesorter.widgets.js" file. Thanks to [nburlett](https://github.com/nburlett) ([pull #837](https://github.com/Mottie/tablesorter/pull/837))!
* Scroller
  * Properly adjust column widths; fixes [issue #836](https://github.com/Mottie/tablesorter/issues/836).

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
