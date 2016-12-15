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
* CDNJS: https://cdnjs.com/libraries/jquery.tablesorter
* jsDelivr: http://www.jsdelivr.com/?query=tablesorter

### Related Projects

* [Plugin for Rails](https://github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](https://github.com/themilkman).
* [UserFrosting](https://github.com/alexweissman/UserFrosting) (A secure, modern user management system for PHP that uses tablesorter) by [alexweissman](https://github.com/alexweissman).
* [Grav CMS](https://getgrav.org/): `bin/gpm install tablesorter` ([ref](https://github.com/Perlkonig/grav-plugin-tablesorter)).

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

[irc-url]: https://kiwiirc.com/client/irc.freenode.net#tablesorter
[irc-image]: https://img.shields.io/badge/irc-%23tablesorter-yellowgreen.svg
[gitter-url]: https://gitter.im/Mottie/tablesorter
[gitter-image]: https://img.shields.io/badge/GITTER-join%20chat-yellowgreen.svg
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/tablesorter
[stackoverflow-image]: https://img.shields.io/badge/stackoverflow-tablesorter-blue.svg

### Recent Changes

View the [complete change log here](https://github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.28.2">Version 2.28.2</a> (12/15/2016)

* ColumnSelector:
  * Target header column attr. Fixes [issue #1238](https://github.com/Mottie/tablesorter/issues/1238).
  * Include HTML in empty headers, then reverted. Fixes [issue #1335](https://github.com/Mottie/tablesorter/issues/1335).
  * Add `layoutCustomizer` option. Fixes [issue #1335](https://github.com/Mottie/tablesorter/issues/1335).
* Reorder:
  * Add style to `<HEAD>`.
* Resizable:
  * Adding style in `<HEAD>` tag not at the end of file. See [pull #1337](https://github.com/Mottie/tablesorter/pull/1337); thanks [@Frennetix](https://github.com/Frennetix)!
* Scroller:
  * Adding style in `<HEAD>` tag not at the end of file. See [pull #1338](https://github.com/Mottie/tablesorter/pull/1338); thanks [@Frennetix](https://github.com/Frennetix)!
  * Code cleanup. See [pull #1338](https://github.com/Mottie/tablesorter/pull/1338).
* Theme:
  * Convert theme.less to theme.scss. See [pull #1332](https://github.com/Mottie/tablesorter/pull/1332); thanks to [@HongPong](https://github.com/HongPong)!
  * Fix SCSS theme & add demo. See [pull #1332](https://github.com/Mottie/tablesorter/pull/1332)
* Meta:
  * Add jsDelivr CDN link to readme.
  * Add scss to dist folder.

#### <a name="v2.28.1">Version 2.28.1</a> (11/27/2016)

* Core:
  * Update dist files. Fixes [issue #1331](https://github.com/Mottie/tablesorter/issues/1331).
* Filter:
  * Fix searchDelay & minimum character count. See [issue #1299](https://github.com/Mottie/tablesorter/issues/1299).
  * Fix liveSearch ignoring searchDelay. See [issue #1299](https://github.com/Mottie/tablesorter/issues/1299).
* Print
  * Use `hasWidget` function.
* UI-theme:
  * Use `hasWidget` function. Fixes [issue #1327](https://github.com/Mottie/tablesorter/issues/1327).

#### <a name="v2.28.0">Version 2.28.0</a> (11/27/2016)

* Core:
  * Return value from `getColumnData` if not an object.
  * Include extra headers when adding unsorted class. Fixes [issue #1306](https://github.com/Mottie/tablesorter/issues/1306).
  * Add option validator. Fixes [issue #1319](https://github.com/Mottie/tablesorter/issues/1319).
  * Maintain original settings on `resetToLoadState`.
* Docs:
  * Add missing colon in CSS. Fixes [issue #1307](https://github.com/Mottie/tablesorter/issues/1307).
  * Add notes on `sortList` overridding `sortForce` & `sortAppend`. See [issue #1286](https://github.com/Mottie/tablesorter/issues/1286).
  * Update sortTbody widget demo showing new option.
  * Add zebra widget to sort reset demo.
  * Define a triggered "update". Fixes [issue #1317](https://github.com/Mottie/tablesorter/issues/1317).
  * Clarify recalculation update method. Fixes [issue #1317](https://github.com/Mottie/tablesorter/issues/1317).
  * Explain difference between `#` and `0` in the math mask. Fixes [issue #1320](https://github.com/Mottie/tablesorter/issues/1320).
  * Add link to disable thead row example. Fixes [issue #1326](https://github.com/Mottie/tablesorter/issues/1326).
* Filter:
  * Restore `filter_searchDelay` function. Fixes [issue #1299](https://github.com/Mottie/tablesorter/issues/1299).
* Grouping:
  * Fix insertion of group header before child rows. See [pull #1301](https://github.com/Mottie/tablesorter/pull/1301); thanks [@babaevmm](https://github.com/babaevmm)! Also fixes [issue #1325](https://github.com/Mottie/tablesorter/issues/1325).
* Math:
  * Fix prefix/suffix option names & processing. Fixes [issue #1305](https://github.com/Mottie/tablesorter/issues/1305).
  * Remove `math_prefix` content prior to parsing cell values.
* Pager:
  * Set `ariaDisabled` property to stop MS Edge crash. Fixes [issue #1303](https://github.com/Mottie/tablesorter/issues/1303).
  * Restore settings on `resetToLoadState`. Fixes [issue #1311](https://github.com/Mottie/tablesorter/issues/1311).
* Tbodysort:
  * Add `sortTbody_lockHead` option. See [pull #1312](https://github.com/Mottie/tablesorter/pull/1312); thanks [@ChrisM-Rogers](https://github.com/ChrisM-Rogers)!
  * Add `sortTbody_lockHead` to default options.
