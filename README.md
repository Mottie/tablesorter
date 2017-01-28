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

#### <a name="v2.28.5">Version 2.28.5</a> (1/28/2017)

* Docs: Fix "update" labels.
* Output:
  * Prevent multiple popups/download with dblClick (i.e. triggering "outputTable" multiple times).
  * Remove extraneous console log.
* Resizable:
  * Add "resizableUpdate" & "resizableReset" methods.
* Scroller:
  * Add `scrollerComplete` event. Fixes [issue #1351](https://github.com/Mottie/tablesorter/issues/1351).
* Readme: Add related project, tablesorter-pagercontrols

#### <a name="v2.28.4">Version 2.28.4</a> (1/6/2017)

* Docs:
  * Add more notes about moving "ipAddress" parser into an external file. See [issue #1344](https://github.com/Mottie/tablesorter/issues/1344).
  * Load storage widget in grouping widget demo. Fixes [issue #1346](https://github.com/Mottie/tablesorter/issues/1346).
  * Add page header section to grouping child demo. See [issue #1346](https://github.com/Mottie/tablesorter/issues/1346).
  * Include jQuery in page header section in various demos.
  * Add page header to output demo. See [issue #1349](https://github.com/Mottie/tablesorter/issues/1349).
  * Add comma to broken output demo.
  * Add info on output to Excel in output widget demo. See [issue #1349](https://github.com/Mottie/tablesorter/issues/1349).
  * Renamed [Bootstrap v2.x demo](https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v2.html).
  * Renamed [Bootstrap v3.x demo](https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v3.html).
  * Created [Bootstrap v4.x demo](https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v4.html).
  * Update all Bootstrap links to point to Bootstrap v3.x demo.
  * Maintain minimal original [Bootstrap demo](https://mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html).
* Output:
  * Prevent error on output to an already open popup.
  * Add `output_savePlugin` option &amp; update download code.
  * Add `output_includeHeader` option &amp; docs. Fixes [issue #1349](https://github.com/Mottie/tablesorter/issues/1349).
* Pager:
  * (widget only) make compatible with stickyHeaders. [Fixes #1313](https://github.com/Mottie/tablesorter/issues/1313):
    * Removed all references to stored `pager.$goto` and `pager.$size`
    * Removed check if header text matches header length - this breaks when a header row has a "tablesorter-ignoreRow" class name.
    * Add stickyHeader container to `pager.$container` in case the pager controls are inside the thead.
  * Fix rendering of sticky headers after ajax.
  * Use option to target inner header.
  * Restore check for new headers. [Fixes #1343](https://github.com/Mottie/tablesorter/issues/1343).
  * Add `data-attribute` override on output. See [issue #1348](https://github.com/Mottie/tablesorter/issues/1348).
* StickHeaders:
  * Reduce widget priority below the pager widget priority.
* Theme:
  * Add group widget css file. See [issue #1346](https://github.com/Mottie/tablesorter/issues/1346).
  * Add column widget support to Bootstrap. See [issue #1347](https://github.com/Mottie/tablesorter/issues/1347).
  * Update high-specificity blue theme - [demo](https://jsfiddle.net/Mottie/k9uasLc7/); see [Stack Overflow](http://stackoverflow.com/q/41472634/145346).
  * Add `theme.bootstrap_4.css` file ([demo](https://mottie.github.io/tablesorter/docs/example-option-theme-bootstrap-v4.html); Bootstrap v4-alpha - do not use in production!).
  * Duplicated `theme.bootstrap_3.css` from `theme.bootstrap.css` (maintaining this non-versioned file name until Bootstrap v4-stable has been available for about 6 months).
* Readme:
  * Update log for v2.28.3.

#### <a name="v2.28.3">Version 2.28.3</a> (12/16/2016)

* Core: Fix internal version numbering.
* Grunt: add version check.
