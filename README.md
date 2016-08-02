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
[david-dev-url]: https://david-dm.org/Mottie/tablesorter?type=dev
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

#### <a name="v2.27.2">Version 2.27.2</a> (8/2/2016)

* Docs: Update versions.
* Core: Allow leading zeros in the time parser. Fixes [issue #1269](https://github.com/Mottie/tablesorter/issues/1269).
* Mark: Actually include options this time! See [issue #1243](https://github.com/Mottie/tablesorter/issues/1243).

#### <a name="v2.27.1">Version 2.27.1</a> (7/31/2016)

* ColumnSelector: Fix undefined variable.
* Mark: Fix linting issues.

#### <a name="v2.27.0">Version 2.27.0</a> (7/31/2016)

* Core:
  * `updateCache` now ignores "remove-me" rows.
  * Add column count to debug log.
  * Tweak internal sortVars & sortReset. Fixes [#1137](https://github.com/Mottie/tablesorter/issues/1137).
* ColumnSelector:
  * Add max/min visible columns settings.
  * Set state to `null` for disabled columns - Fixes JSON issues with not storing `undefined` values.
  * Fix null comparison & incorrect option.
* CurrentSort: Add `currentSort` widget. Fixes [issue #1208](https://github.com/Mottie/tablesorter/issues/1208).
* Filter:
  * `getFilters` will now always return an array. Fixes [issue #1250](https://github.com/Mottie/tablesorter/issues/1250). **API change**
  * Allow ES6 regex flags.
  * Add rowIndex to filter data.
  * Trigger filter formatters after update. See [issue #1237](https://github.com/Mottie/tablesorter/issues/1237).
  * Selected column query works again. Fixes [issue #1267](https://github.com/Mottie/tablesorter/issues/1267); broken since [a6b25ae](https://github.com/Mottie/tablesorter/commit/a6b25ae4c0cc44dcf935568b2f100ae65117ea74).
* Grouping: Prevent js errors on non-string values.
* Mark: Add mark widget. Fixes [issue #1243](https://github.com/Mottie/tablesorter/issues/1243).
* Math:
  * Add `data-math-target` attribute.
  * Add `math-debug` option.
* Output:
  * Automatically ignore widget added rows.
  * Add "url" parameter to output_callback function.
* Scroller: Update when `applyWidgets` is used. See [issue #1261](https://github.com/Mottie/tablesorter/issues/1261).
* StickyHeaders: Add `appendTo` option.
* UITheme: jQuery v1.12.0 renamed "carat" to "caret". Fixes [issue #1257](https://github.com/Mottie/tablesorter/issues/1257).
* Parsers: Url parser now ignores "www" & removed parsed flag. The filter widget finds "http" querys.
* Docs:
  * Fix docs javascript; some demos still using jQuery < 1.7.
  * Add scroller widget RTL details. See [issue #906](https://github.com/Mottie/tablesorter/issues/906).
  * Clarify & expand grouping widget usage.
  * Include ajax type.
  * Add ajax type example to main docs.
  * Update jQuery UI & fix uitheme docs.
  * Remove old syntax highlighter.
  * Update theme switcher.
  * Switch to use jQuery <3.0.0 for Bootstrap demos; later reverted this change after updating to Bootstrap v3.3.7.
  * Add link to `cssIgnoreRow` example.
  * Clarify column selector initial state.
  * Fix HTML issues.
  * Add filter event function parameter examples.
* Themes:
  * Hide icon when column is disabled.
  * Optimize PNGs in data URLs using ZopfliPNG as well.
  * Compress PNG images further. See [pull #1251](https://github.com/Mottie/tablesorter/pull/1251); thanks [@Herst](https://github.com/Herst)!
  * Add Materialize theme style. Fixes [issue #1242](https://github.com/Mottie/tablesorter/issues/1242).
* Meta:
  * Grunt: Fix IIFE jQuery reference. Fixes [issue #1255](https://github.com/Mottie/tablesorter/issues/1255).
  * Grunt: Update dependencies.
  * Testing: Add filter anyMatch queries; Sadly unrelated to [issue #1267](https://github.com/Mottie/tablesorter/issues/1267).
  * Bower: Oust meta warnings. Fixes [issue #1264](https://github.com/Mottie/tablesorter/issues/1264).
  * Bower: Add recommending settings. Fixes [issue #1265](https://github.com/Mottie/tablesorter/issues/1265).
