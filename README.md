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

#### <a name="v2.21.5">Version 2.21.5</a> (4/8/2015)

* Filter
  * Cache main loop variables - speed enhancement.
  * Allow setting `filter_selectSource` along with `filter_functions` ([demo](http://jsfiddle.net/Mottie/856bzzeL/117/)).
* Resizable
  * Integrate with columnSelector. See [issue #859](https://github.com/Mottie/tablesorter/issues/859).
  * Prevent javascript error.
  * Resizable handles now properly align when the table is within a layout with margins. Fixes [issue #864](https://github.com/Mottie/tablesorter/issues/864).
* Scroller
  * Apply on initialization. Fixes [issue #860](https://github.com/Mottie/tablesorter/issues/860).

#### <a name="v2.21.4">Version 2.21.4</a> (3/28/2015)

* Core
  * Add a utility [`$.tablesorter.getColumnText()` function](http://mottie.github.io/tablesorter/docs/#function-getcolumntext).
    * This function will provide a centralized method of obtaining column data (raw & parsed text from cells) and allow processing cells.
    * I plan to update all widgets that need to interact or obtain column data to use this function in v2.22.0.
* Build
  * The build process now includes selected parsers (added `parsers` option to build json).
  * A new `jquery.tablesorter.combined.js` file is created which will contain the core plugin along with all selected widgets & parsers; a default build does not have any selected parsers.
  * This will work around, but not resolve, [issue #855](https://github.com/Mottie/tablesorter/issues/855).
* Extras
  * Update `semver.js` & `semver-mod.js` to v4.3.3.

#### <a name="v2.21.3">Version 2.21.3</a> (3/26/2015)

* Core
  * Fix icon targeting for class names
  * Modified sort initiation method. A "click" event can now be triggered on a header to initiate a sort - [issue #849](https://github.com/Mottie/tablesorter/pull/849). Thanks [johnjameswhitman](https://github.com/johnjameswhitman).
  * General code cleanup; mostly changing `tagName` to `nodeName`.
  * Modified, then removed all references to `config.$extraTables` and `config.$extraHeaders` as it was causing a memory leak.
* Docs
  * Update jQuery to v1.11.2.
  * Update Bootstrap to v3.3.4.
* Grunt Build
  * Add custom build file name. See [issue #829](https://github.com/Mottie/tablesorter/issues/829).
  * The default custom build file name is now "jquery.tablesorter.custom-widgets.js".
  * See the [Customize wiki page](https://github.com/Mottie/tablesorter/wiki/Customize#custom-build) for more details.
* Filter
  * Make "disabled" a modifiable class name - modify it in `$.tablesorter.css.filterDisabled`.
  * Select2 filter formatter now escapes forward slashes.
* Output:
  * Minor code tweak.
* Pager:
  * Make `pagerUpdate` method page parameter optional. It was previously required or the page would reset to `0`.
  * Remove "refreshComplete" bind on destroy. Fixes [issue #854](https://github.com/Mottie/tablesorter/issues/854).
* Resizable:
  * Major overhaul of this widget to now make it compatible with the stickyHeaders widget.
  * Sadly, it still doesn't work properly with the updated scroller widget; it's on my to-do list!
  * Add a `resizable_targetLast` option to automatically target the last column for resize; instead of needing to hold shift while dragging.
* Scroller:
  * Added fixed column support! Fixes issues [#135](https://github.com/Mottie/tablesorter/issues/135), [#689](https://github.com/Mottie/tablesorter/issues/689), [#763](https://github.com/Mottie/tablesorter/issues/763) and [https://github.com/Mottie/tablesorter/issues/804](#804).
  * Check out the third table in the [scroller widget demo](http://mottie.github.io/tablesorter/docs/example-widget-scroller.html#group) - change the slider to adjust the number of fixed columns.
* Storage:
  * Add option (`widgetOptions.storage_useSessionStorage`) to allow switching from local to session storage. Fixes [#851](https://github.com/Mottie/tablesorter/issues/851).
  * Add a bunch of other storage widget options including `storage_tableId`, `storage_group`, `storage_fixedUrl` and `storage_page`. See the [documentation on how they might be useful](http://mottie.github.io/tablesorter/docs/#widget-storage-fixed-url).
  * Deprecated `config.fixedUrl` in favor of the `widgetOptions.storage_fixedUrl` option.
* Themes
  * Add "hover" class to all hover definitions (for the scroller widget mostly).
  * Remove filter element offsetting margins.
  * Target `background-color` instead of `background`. Fixes [issue #853](https://github.com/Mottie/tablesorter/issues/853).
