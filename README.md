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

[![irc-image]][irc-url] [![gitter-image]][gitter-url] [![stackoverflow-image]][stackoverflow-url]

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

[irc-url]: https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23tablesorter
[irc-image]: https://img.shields.io/badge/irc-%23tablesorter-yellowgreen.svg
[gitter-url]: https://gitter.im/Mottie/tablesorter
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-yellowgreen.svg
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/tablesorter
[stackoverflow-image]: https://img.shields.io/badge/stackoverflow-tablesorter-blue.svg

### Recent Changes

View the [complete change log here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.25.9">Version 2.25.9</a> (4/29/2016)

* Docs:
  * Fix search for next/previous result positioning.
  * Add `sortMultiSortKey` alternative settings. See [issue #1200](https://github.com/Mottie/tablesorter/issues/1200).
* ColumnSelector:
  * Refresh method properly saves changes. Fixes [issue #1198](https://github.com/Mottie/tablesorter/issues/1198).
  * Fix missing class name; fallback to "filtered" when the `filter_filteredRows` widget option is undefined.
  * Add `columnSelector_maxPriorities`. Fixes [issue #1204](https://github.com/Mottie/tablesorter/issues/1204).
* Filter:
  * Include milliseconds in formatter date comparison. See [issue #1191](https://github.com/Mottie/tablesorter/issues/1191).
  * Properly initialize after using `applyWidgetId`. Fixes [issue #1197](https://github.com/Mottie/tablesorter/issues/1197).
* Scroller:
  * Add multi-line caption height support in fixed column. Fixes [issue #1202](https://github.com/Mottie/tablesorter/issues/1202).
* Parser (checkbox):
  * Header checkbox properly updates row class names.
  * Fix indeterminate checkbox issue in IE.
  * Fix indeterminate checkbox state checked state in IE.
  * See [issue #1199](https://github.com/Mottie/tablesorter/issues/1199).

#### <a name="v2.25.8">Version 2.25.8</a> (4/11/2016)

* Core: `duplicateSpan` set to `false` now uses `textExtraction` instead of setting the data to an empty string; see [Stackoverflow](See http://stackoverflow.com/q/36449711/145346).
* Docs:
  * Update jQuery.
  * Various fixes.
* Theme: Bootstrap: default cursor for sorter-false. Fixes [issue #1189](https://github.com/Mottie/tablesorter/issues/1189).
* Print: Process lazyload images before printing. See [issue #1169](https://github.com/Mottie/tablesorter/issues/1169).
* Grunt:
  * Update dependencies.
  * Update Qunit.

#### <a name="v2.25.7">Version 2.25.7</a> (4/1/2016)

* Filter: Check match on both internal & external filters. See [issue #1177](https://github.com/Mottie/tablesorter/issues/1177).
* Lazyload: Trigger window scroll after update. See [issue #1169](https://github.com/Mottie/tablesorter/issues/1169).
* Scroller: Throttle scroll event. Fixes [issue #1186](https://github.com/Mottie/tablesorter/issues/1186).
* StickyHeaders: Update on table resize for Firefox. Fixes [issue #1183](https://github.com/Mottie/tablesorter/issues/1183).
* Grunt: Update dependencies.
