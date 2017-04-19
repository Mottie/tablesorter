tablesorter (FORK) is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes. tablesorter can successfully parse and sort many types of data including linked data in a cell. This forked version adds lots of new enhancements including: alphanumeric sorting, pager callback functons, multiple widgets providing column styling, ui theme application, sticky headers, column filters and resizer, as well as extended documentation with a lot more demos.

[![Bower Version][bower-image]][bower-url] [![NPM Version][npm-image]][npm-url] [![devDependency Status][david-dev-image]][david-dev-url] [![zenhub-image]][zenhub-url]

### Notice!

* Because of the change to the internal cache, the tablesorter v2.16+ core, filter widget and pager (both plugin &amp; widget) will only work with the same version or newer files.

### [Documentation](https://mottie.github.io/tablesorter/docs/)

* See the [full documentation](https://mottie.github.io/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](https://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Changes).

### Questions?

[![irc-image]][irc-url] [![gitter-image]][gitter-url] [![stackoverflow-image]][stackoverflow-url]

* Check the [FAQ](https://github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](https://mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](https://github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](https://stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](https://github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

### Demos

* [Basic alpha-numeric sort Demo](https://mottie.github.io/tablesorter/).
* Links to demo pages can be found within the main [documentation](https://mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting and filtering.
* Multi-tbody sorting - see the [options](https://mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Supports [Bootstrap v2-4](https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v3.html).
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
* [tablesorter-pagercontrols](https://github.com/isg-software/tablesorter-pagercontrols) &ndash; programmatically adds pager controls below a table and applies the pager add-on for large HTML tables by [isg-software](https://github.com/isg-software).

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

#### <a name="v2.28.8">Version 2.28.8</a> (4/18/2017)

* Docs:
  * Update version tags.
* Core:
  * Fixed `updateCell` to work correctly with child rows. Thanks [@andysleigh](https://github.com/andysleigh); see [PR #1381](https://github.com/Mottie/tablesorter/pull/1381).
* Filter:
  * Add `equalFilters` function; for more reliable comparisons.
* Pager:
  * use `equalFilters` function for comparison. See [issue #1384](https://github.com/Mottie/tablesorter/issues/1384).
* Resizable:
  * Add `resizable_includeFooter` option. Fixes [issue #1386](https://github.com/Mottie/tablesorter/issues/1386).
* Scroller:
  * Set max-width to initial. See [issue #1382](https://github.com/Mottie/tablesorter/issues/1382).
  * Fix offset from hidden row. See [issue #1376](https://github.com/Mottie/tablesorter/issues/1376).
  * Fix linting issue.
* Storage:
  * Add options early to prevent validator message.
  * Add `storage_storageType` option & deprecate `storage_useSessionStorage`.
* Meta:
  * Update dependencies x2.

#### <a name="v2.28.7">Version 2.28.7</a> (4/4/2017)

* Editable:
  * Remove "blur" event listeners. See [issue #1360](https://github.com/Mottie/tablesorter/issues/1360).
* Filter:
  * Add "filterAndSortReset" method. See [issue #1361](https://github.com/Mottie/tablesorter/issues/1361).
  * Prevent JS error added from last update. Fixes [issue #1377](https://github.com/Mottie/tablesorter/issues/1377).
* Meta:
  * Fix composer.json license.

#### <a name="v2.28.6">Version 2.28.6</a> (4/2/2017)

* Core:
  * Prevent overwritting default `widgetOptions`. Fixes [issue #1356](https://github.com/Mottie/tablesorter/issues/1356).
  * Fix method of saving default widgetOptions. See [issue #1356](https://github.com/Mottie/tablesorter/issues/1356).
  * Update column count after reset.
  * Add fix it (in Abelt) note for [issue #1362](https://github.com/Mottie/tablesorter/issues/1362).
  * Update widgets after `sortReset`. Fixes [issue #1361](https://github.com/Mottie/tablesorter/issues/1361).
  * The `applyWidget` callback now occurs after "tablesorter-ready" event
* Docs:
  * Update jQuery to v3.2.0.
  * Fix "update" labels from previous version.
  * Add note about Excel & `output_encoding`. See [issue #1353](https://github.com/Mottie/tablesorter/issues/1353).
  * Clarify parser & sorter class name differences.
  * Add note about event binding after build widget completes. See [issue #1370](https://github.com/Mottie/tablesorter/issues/1370).
  * Fixed linting issues.
  * Add some internal links.
* Build:
  * Stop build widget option warnings.
* Filter:
  * Compare last search array (instead of a combined string). Fixes [issue #1363](https://github.com/Mottie/tablesorter/issues/1363).
* Output:
  * Fixed CSV output when colspan &gt;3. See [PR #1373](https://github.com/Mottie/tablesorter/pull/1373); thanks [@ruchir19](https://github.com/ruchir19)!
* Pager:
  * Fix "all" option to not set when the option doesn't exist. See [PR #1364](https://github.com/Mottie/tablesorter/pull/1364); thanks [@simenflatby](https://github.com/simenflatby)!
  * Stop using combined filter values. See [issue #1363](https://github.com/Mottie/tablesorter/issues/1363).
  * Use "all" only when the option exists. Fixes [#1364](https://github.com/Mottie/tablesorter/pull/1364) & [#1366](https://github.com/Mottie/tablesorter/issues/1366).
* Sort2Hash:
  * Stop option warnings. Fixes [issue #1369](https://github.com/Mottie/tablesorter/issues/1369).
* Parsers:
  * Add leading zero parser & [demo](https://mottie.github.io/tablesorter/docs/example-parsers-leading-zeros.html).
* Theme:
  * Add CSS highlight file; copied from [the demo](https://mottie.github.io/tablesorter/docs/example-css-highlighting.html).
* Meta:
  * Add `composer.json` file. Fixes [issue #1355](https://github.com/Mottie/tablesorter/issues/1355).
  * Readme: Move questions section closer to the top.
  * Update dependencies.
  * Fix indentation & remove extra spaces.
  * Remove cdnjs auto-update config - see [CDNJS #9080](https://github.com/cdnjs/cdnjs/pull/9080).
  * Update SPDX license.
