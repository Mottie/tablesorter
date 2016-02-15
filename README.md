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
* Supports [Bootstrap v2 and 3](//mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html).
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](//mottie.github.io/tablesorter/docs/example-parsers.html).
* Inline editing - see [demo](//mottie.github.io/tablesorter/docs/example-widget-editable.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](//mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Small code size, starting at 25K minified.
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ (`$.browser.msie` was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](//tablesorter.com).
* Dual licensed under the [MIT](//www.opensource.org/licenses/mit-license.php) and [GPL](//www.gnu.org/licenses/gpl.html) licenses.

### Download

* Get all files: [zip](//github.com/Mottie/tablesorter/archive/master.zip) or [tar.gz](//github.com/Mottie/tablesorter/archive/master.tar.gz).
* Use [bower](http://bower.io/): `bower install jquery.tablesorter`.
* Use [node.js](http://nodejs.org/): `npm install tablesorter`.
* CDNJS: [https://cdnjs.com/libraries/jquery.tablesorter](https://cdnjs.com/libraries/jquery.tablesorter).

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

#### <a name="v2.25.4">Version 2.25.4</a> (2/15/2016)

* Core:
  * Remove id from widgets option prior to remove function. See [issue #1155](https://github.com/Mottie/tablesorter/issues/1155).
  * `applyWidgetsId` properly accepts jQuery table element.
* ColumnSelector:
  * Clear column container when refreshing. See [pull #1145](https://github.com/Mottie/tablesorter/pull/1145); thanks [eltharin](https://github.com/eltharin)!
  * Prevent refresh error. See [pull #1145](https://github.com/Mottie/tablesorter/pull/1145).
* Editable:
  * Use `execCommand` to select all text, if supported.
* Filter:
  * Select defaults to exact match again. Fixes [issue #1136](https://github.com/Mottie/tablesorter/issues/1136).
  * Fix disable of live search. See [issue #1152](https://github.com/Mottie/tablesorter/issues/1152).
* Grouping:
  * Reapply zebra after collapsed group opens. Fixes [issue #1156](https://github.com/Mottie/tablesorter/issues/1156).
* Pager:
  * Add `initialRows` option; use when `processAjaxOnInit` set to `false`. See [Stackoverflow](See http://stackoverflow.com/q/34972532/145346).
  * Prevent js error on successive removal calls. Fixes [issue #1155](https://github.com/Mottie/tablesorter/issues/1155).
* Docs:
  * Add `ignoreRow` class to pager row.
  * Show actual theme names; to use in the `themes` option.
* Build: Update dependencies.
* Testing: re-align code.

#### <a name="v2.25.3">Version 2.25.3</a> (1/21/2016)

* Filter:
  * Check that filter is not undefined before encoding/decoding it & treat null and undefined filters the same. See [pull #1130](https://github.com/Mottie/tablesorter/pull/1130); thanks [tim-schilling](https://github.com/tim-schilling)!
  * Search delay now works properly. Fixes [issue #1134](https://github.com/Mottie/tablesorter/issues/1134).
* Docs:
  * Add clarification about hiding columns. See [issue #1133](https://github.com/Mottie/tablesorter/issues/1133).
* Build:
  * Update dependencies.

#### <a name="v2.25.2">Version 2.25.2</a> (1/15/2016)

* Docs:
  * Update main demo & test to use jQuery 3.0.0-beta.
* Core:
  * Revert extra header class name updating. See [issue #1116](https://github.com/Mottie/tablesorter/issues/1116).
* Filter:
  * Add `filter_resetOnEsc` option. See [issue #1126](https://github.com/Mottie/tablesorter/issues/1126).
* Output:
  * `output_saveRows` now accpets a [filter callback function](http://api.jquery.com/filter/#filter-function).
* Parsers:
  * checkbox value should no longer change. Fixes [issue #1125](https://github.com/Mottie/tablesorter/issues/1125).
