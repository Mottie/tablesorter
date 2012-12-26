tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### [Documentation](http://mottie.github.com/tablesorter/docs/)

* See the [full documentation](http://mottie.github.com/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Change).

### Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](http://mottie.github.com/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting.
* Multi-tbody sorting - see the [options](http://mottie.github.com/tablesorter/docs/index.html#options) table on the main document page.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.com/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### Version 2.7 (12/26/2012)

* Added `headerTemplate` option:
 * `headerTemplate` is a template string which allows adding additional content to the header while it is being built.
 * This template string has two default tags: `{content}` and `{icon}`.
 * `{content}` will be replaced by the current header HTML content.
 * `{icon}` will be replaced by `<i class="tablesorter-icon"></i>`, but only if a class name is defined in the `cssIcon` option.
 * Everything within this template string will be wrapped in a div with class `tablesorter-header-inner`.
 * The default template is `{content}`.
 * The following themes DO NEED the icon (`{icon}`) included in the template: Bootstrap, jQuery UI, Grey and Dropbox.
* Added `onRenderTemplate` option:
 * This is a function that is called after the template string has been built, but before the template string is applied to the header and before the onRenderHeader function is called.
 * The onRenderTemplate function receives a column index and template string parameters. The template string, from the headerTemplate option, will already have the {icon} and {content} tags replaced; it's just a string of formatted HTML. When done manipulating this string, return it.
 * Check out the [demo here](http://mottie.github.com/tablesorter/docs/example-option-render-template.html).
* Updated `uitheme` widget
  * The `uitheme` setting is no longer required, use the `theme` option instead.
  * When using the `bootstrap` or `jui` theme, just add the name to the `theme` option: e.g. `theme: "bootstrap"`.
  * The `uitheme` widget option will still work, but if the theme name exists within `$.tablesorter.themes` it will override the `uitheme` option.
  * Look at the [theme demo](http://mottie.github.com/tablesorter/docs/themes.html) source for a better example.
* Fixed `sortReset` bug - see [issue #167](https://github.com/Mottie/tablesorter/issues/167).
* Fixed an issue with the pager resetting to the first page after every sort.
* Fixed javascript errors popping up when initializing the plugin on an empty table. Fixes [issue #206](https://github.com/Mottie/tablesorter/issues/206).
* 

#### Version 2.6.2 (12/20/2012)

* Fixed sort breaking when `tfoot` contained a table. Fixes problem mentioned in [issue #196](https://github.com/Mottie/tablesorter/issues/196).
* Fixed javascript error due to using `hasOwnProperty` inside of the formatFloat function in IE8. Fixes [issue #200](https://github.com/Mottie/tablesorter/issues/200).
* Fixed the reformatted minified widget file. Fixes [issue #201](https://github.com/Mottie/tablesorter/issues/201).
* Fixed pager ajax. It no longer load the initial page twice. Fixes [issue #202](https://github.com/Mottie/tablesorter/issues/202).

#### Version 2.6.1 (12/19/2012)

* Updated the pager
  * Added an event named `pagerBeforeInitialized` which is triggered after all of the controls have been set up, but before rendering of the table or ajax data is obtained.
  * Cleaned up pager code.
* Modifed the `formatFloat` function
  * Previously you had to call the formatFloat function with a table so it could get the number format configuration

    ```javascript
    $.tablesorter.formatFloat('1,234,567.89', table); // result if usNumberFormat true = 1234567.89
    ```

  * Now you can either pass the table or a boolean to indicate the format:

    ```javascript
    var usNumberFormat = true;
    $.tablesorter.formatFloat('1,234', usNumberFormat); // result = 1234
    $.tablesorter.formatFloat('1,234', false); // non-U.S. format result = 1.234
    ```

* Fixed pager size result incorrect with nested tables. Fixes [issue #196](https://github.com/Mottie/tablesorter/issues/196).
* Fixed parser javascript error when clearing tr's from table. Fixes [issue #199](https://github.com/Mottie/tablesorter/issues/199).
* Fixed themes so that the `sorter-false` class now restores the header padding. Mentioned in [issue #](188).

#### Version 2.6 (12/18/2012)

* Added `sortResetKey`:
  * By default, holding down the ctrl key while clicking on a header cell will reset that column's sort.
  * When sorting multiple columns, holding shift+ctrl will maintain the previous sorts and reset the selected column.
  * Thanks to [emmerich](https://github.com/emmerich) for sharing [this code](https://github.com/Mottie/tablesorter/pull/194)!
* Added basic unit testing:
  * JSHint checks of core, widgets and pager addon.
  * Checks of various public functions, parsers and methods.
  * This is a work-in-progress, so many more tests still need to be added.
  * See the [basic test results here](http://mottie.github.com/tablesorter/test.html).
* Sorting arrows no longer show when a header column is disabled. Fixes [issue #188](https://github.com/Mottie/tablesorter/issues/188).
* Improved pager AJAX support:
  * Added `serverSideSorting` option (default is `false`) to the plugin core which when `true` will disable client-side sorting.
  * Added `filter_serversideFiltering` filter widget option (default is `false`) which when `true` will disable client-side filter widget processing.
  * Added a `filterList` (`{filterList:fcol}`) ajax parameter to the pager's `ajaxUrl` option.
  * Added `cssErrorRow` option to the pager options, allowing you to style the ajax error row which only appears with ajax errors.
  * This update also fixes an issue with page size changing. See [issue #198](https://github.com/Mottie/tablesorter/issues/198).
  * Thanks to [dhamma](https://github.com/dhamma) for [this enhancement](https://github.com/Mottie/tablesorter/pull/183)!
* Added `footerRow` and `footerCells` to the tablesorter themes (`$.tablesorter.themes`):
  * This allows styling of the footer in the bootstrap and jQuery UI themes.
  * Used by the `uitheme` widget.

#### Version 2.5.2 (11/27/2012)

* Fixed an issue with the pager making recursive ajax calls. Fixes [issue #182](https://github.com/Mottie/tablesorter/issues/182).

#### Version 2.5.1 (11/26/2012)

* Fixed a serious bug which occurrs in IE:
 * This bug is related to the multi-column sorting changes made in v2.5 - I swear I'll add unit testing soon!
 * This problem appeared to occur in all versions of IE.
 * See [issue #181](https://github.com/Mottie/tablesorter/issues/181) for details.
* Updated the grey and bootstrap themes:
 * The w3c recommendations for linear gradients are now being followed ([ref](http://dev.w3.org/csswg/css3-images/#linear-gradients)) - added a "to" to the position.
 * Fixed the older IE filter for gradients. Apparently `startColorstr='#555'` is a different color than `startColorstr='#555555'`.

#### Version 2.5 (11/22/2012)

* Improved multi-column sorting
  * Huge thanks to [Nick Craver](https://github.com/NickCraver) for making multicolumn sorting no longer uses an `eval()` during the sort!
  * This change improves performance of the sort across all browsers.
  * It also allows use of numerous minifier scripts.
  * See [pull request #177](https://github.com/Mottie/tablesorter/pull/177) for more details.
* Fixed using `addRows` on an empty table, [issue #179](https://github.com/Mottie/tablesorter/issues/179).
* Fixed inconsistencies in the usage of sort up (ascending) and sort down (descending) in the javascript and css.
  * Updated the `cssAsc` default value to `tablesorter-headerAsc`.
  * Updated the `cssDesc` default value to `tablesorter-headerDesc`.
  * All css themes now include these new class names. References to older class names were not removed, but they will be removed in version 3.
  * Renamed image files and switched data URIs to match these changes.
  * This fixes [issue #173](https://github.com/Mottie/tablesorter/issues/173). Thanks [bitti](https://github.com/bitti)!
* Updated all theme css files to use image data URIs instead of the images.
  * The images are all still contained in the `css/images` directory.
  * References to the image files have been commented out instead of removed.
