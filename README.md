tablesorter (FORK) is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes. tablesorter can successfully parse and sort many types of data including linked data in a cell. This forked version adds lots of new enhancements including: alphanumeric sorting, pager callback functons, multiple widgets providing column styling, ui theme application, sticky headers, column filters and resizer, as well as extended documentation with a lot more demos.

[![Bower Version][bower-image]][bower-url] [![NPM Version][npm-image]][npm-url] [![devDependency Status][david-dev-image]][david-dev-url] [![zenhub-image]][zenhub-url]

### Notice!

* Because of the change to the internal cache, the tablesorter v2.16+ core, filter widget and pager (both plugin &amp; widget) will only work with the same version or newer files.

### [Documentation](https://mottie.github.io/tablesorter/docs/)

* See the [full documentation](https://mottie.github.io/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](https://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Changes).

### Demos

* [Basic alpha-numeric sort Demo](https://mottie.github.io/tablesorter/).
* Links to demo pages can be found within the main [documentation](https://mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting and filtering.
* Multi-tbody sorting - see the [options](https://mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Supports [Bootstrap v2 and 3](https://mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html).
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](https://mottie.github.io/tablesorter/docs/example-parsers.html).
* Inline editing - see [demo](https://mottie.github.io/tablesorter/docs/example-widget-editable.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](https://mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Small code size, starting at 25K minified.
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ (`$.browser.msie` was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](https://opensource.org/licenses/mit-license.php) or [GPL](https://www.gnu.org/licenses/gpl.html) licenses (pick one).

### Download

* Get all files: [zip](https://github.com/Mottie/tablesorter/archive/master.zip) or [tar.gz](https://github.com/Mottie/tablesorter/archive/master.tar.gz).
* Use [bower](https://bower.io/): `bower install jquery.tablesorter`.
* Use [node.js](https://nodejs.org/): `npm install tablesorter`.
* CDNJS: [https://cdnjs.com/libraries/jquery.tablesorter](https://cdnjs.com/libraries/jquery.tablesorter).

### Related Projects

* [Plugin for Rails](https://github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](https://github.com/themilkman).
* [UserFrosting](https://github.com/alexweissman/UserFrosting) (A secure, modern user management system for PHP that uses tablesorter) by [alexweissman](https://github.com/alexweissman).

### Contributing

If you would like to contribute, please...

1. Fork.
2. Make changes in a branch & add unit tests.
3. Run `grunt test` (if qunit fails, run it again - it's fickle).
4. Create a pull request.

### Special Thanks

* Big shout-out to [Nick Craver](https://github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](https://github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Thanks to [prijutme4ty](https://github.com/prijutme4ty) for numerous contributions!
* Also extra thanks to [christhomas](https://github.com/christhomas) and [Lynesth](https://github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Questions?

[![irc-image]][irc-url] [![gitter-image]][gitter-url] [![stackoverflow-image]][stackoverflow-url]

* Check the [FAQ](https://github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](https://mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](https://github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](https://stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](https://github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

[npm-url]: https://npmjs.org/package/tablesorter
[npm-image]: https://img.shields.io/npm/v/tablesorter.svg
[david-dev-url]: https://david-dm.org/Mottie/tablesorter#info=devDependencies
[david-dev-image]: https://img.shields.io/david/dev/Mottie/tablesorter.svg
[bower-url]: http://bower.io/search/?q=jquery.tablesorter
[bower-image]: https://img.shields.io/bower/v/jquery.tablesorter.svg
[zenhub-url]: https://zenhub.io
[zenhub-image]: https://cdn.rawgit.com/Mottie/tablesorter/master/docs/img/zenhub-badge.svg

[irc-url]: https://www.irccloud.com/#!/ircs://irc.freenode.net:6697/%23tablesorter
[irc-image]: https://img.shields.io/badge/irc-%23tablesorter-yellowgreen.svg
[gitter-url]: https://gitter.im/Mottie/tablesorter
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-yellowgreen.svg
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/tablesorter
[stackoverflow-image]: https://img.shields.io/badge/stackoverflow-tablesorter-blue.svg

### Recent Changes

View the [complete change log here](https://github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.26.6">Version 2.26.6</a> (7/11/2016)

* Global: Fix "updated" date in various widgets & pager.
* Docs:
  * Cleanup links & license. Fixes [issue #1244](https://github.com/Mottie/tablesorter/issues/1244).
  * Add button type to all buttons.
  * Update to jQuery v3.1.0.
* Core: Prevent undefined error in natural sort. See [issue #1151](https://github.com/Mottie/tablesorter/issues/1151).
* Column Selector: Check visibility of cells after colspan. See [issue #1238](https://github.com/Mottie/tablesorter/issues/1238).
* Filter
  * Filter formatter for Select2 v3.4.6 (v4.0+ still not supported)
    * Now adheres to case sensitivity setting. See [issue #1237](https://github.com/Mottie/tablesorter/issues/1237).
    * Update after filter row rebuilt. See [issue #1237](https://github.com/Mottie/tablesorter/issues/1237).
    * Properly remove case-insensitive flag in regex.
    * Properly escaped characters in regex.
  * Use uncached `widgetOptions` after inside events.
  * `filter_hideFilters` option now accepts a function. See [issue #477](https://github.com/Mottie/tablesorter/issues/477).
* Grouping:
  * Fix js error when storage isn't loaded.
  * Fix `group_collapsed` behavior. See [issue #1247](https://github.com/Mottie/tablesorter/issues/1247).
* Pager:
  * Prevent ajax call on init. See [issue #1196](https://github.com/Mottie/tablesorter/issues/1196).
  * Prevent setting "all" value before initialization. See [issue #1196](https://github.com/Mottie/tablesorter/issues/1196).
* Scroller: Save scroll position of window. See [issue #1240](https://github.com/Mottie/tablesorter/issues/1240).
* UITheme: Modify filter row after filterInit.
* View:
  * Update to get the raw text value of a column without the span wrap.
  * Trigger "viewComplete" in the view builder, not in init, otherwise you get no trigger when switching views.
  * Replace all instances, not just the first one.
* Bower: Add license identifiers. See [pull #1239](https://github.com/Mottie/tablesorter/pull/1239); thanks [@bckfnn](https://github.com/bckfnn)!

#### <a name="v2.26.5">Version 2.26.5</a> (6/28/2016)

* Docs:
  * Optimize png images using using zopflipng; see [pull #1230](https://github.com/Mottie/tablesorter/pull/1230) thanks [@PeterDaveHello](https://github.com/PeterDaveHello)!
  * Add [`showProcessing`](https://mottie.github.io/tablesorter/docs/example-option-show-processing.html#display) toggle button.
  * Add demo link for css3 animated `showProcessing` icons that actually works!
  * Update to use jQuery v3.0.0.
* Readme: Update for previous version bump.
* Filter: Do not return altered filters variable. Fixes [issue #1237](https://github.com/Mottie/tablesorter/issues/1237).
* Grouping:
  * Use correct pager row indexing. Fixes [issue #1232](https://github.com/Mottie/tablesorter/issues/1232).
  * Prevent JS error with ajax & filtering. Fixes [issue #1232](https://github.com/Mottie/tablesorter/issues/1232).
  * Fix lint issue.
* Resizable: Adjust handles on pager complete.
* Pager:
  * Fix code alignment.
  * Fix filtered regular expression definition.

#### <a name="v2.26.4">Version 2.26.4</a> (6/15/2016)

* Version bump due to merging issues.
