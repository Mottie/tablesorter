tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

See the [full documentation](http://mottie.github.com/tablesorter/docs/)

###Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/)
* More demos can be found in the [documentation](http://mottie.github.com/tablesorter/docs/)
* Demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

###Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.com/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.3+

###Documentation

Included all original [document pages](http://mottie.github.com/tablesorter/docs/index.html) with updates from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html).

###Licensing

* Copyright (c) 2007 Christian Bach
* Main Examples and docs at: [http://tablesorter.com](http://tablesorter.com)
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses:

###Change Log

View the [complete listing here](http://mottie.github.com/tablesorter/changelog.txt).

#### Version 2.0.30.1 (2012-2-20)

* Modified the "filter" widget to disable the input window instead of setting it with display none. Now the input is disabled and a "disabled" class is applied to allow for further styling.

#### Version 2.0.30 (2012-2-20)

* Fixed the total mess I just made with the addWidget init functionality... I need a vacation :P

#### Version 2.0.29 (2012-2-20)

* Fixed a problem with the addWidget init function which apparently was always being called, even if you didn't want it! Fix for [issue #28](https://github.com/Mottie/tablesorter/issues/28). Thanks to thezoggy for helping with troubleshooting!
* Minor cleanup of sorting class names code.

#### Version 2.0.28.1 (2012-2-16)

* Modified the plugin pager to ignore child rows. Fix for [issue #27](https://github.com/Mottie/tablesorter/issues/27).

#### Version 2.0.28 (2012-2-1)

* Added a new function to widgets called "init" which is called upon initialization, before any of the widgets are applied.
  * I added it to allow the "saveSort" widget to get the saved sort data (localStorage or cookie) before the initial sort was applied.
  * The "saveSort" widget is still compatible with the original tablesorter, but the original version will call all of the widgets twice on initialization, if using the "saveSort" widget.
  * New add widget format is as follows:

        ```javascript
        $.tablesorter.addWidget({
          id: 'myWidget',
          init: function(table, allWidgets, thisWidget){
            // widget initialization code - this is only run ONCE
            // but in this example I call the format function because
            // I want to keep it backwards compatible with the original tablesorter
            thisWidget.format(table, true);
          },
          format: function(table, initFlag) {
            // widget code to apply to the table AFTER EACH SORT
            // the initFlag is true when format is called for the first time, but
            // only if it is called from the init function
          }
        });
        ```

#### Version 2.0.27 (2012-1-31)

* Added `sortReset` option
  * Setting this option to `true`, allows you to click on the header a third time to clear the sort
  * Clearing the sort DOES NOT return the table to it's initial unsorted state.
* Added `saveSort` widget
  * This widget will save the last sort to local storage, and will fallback to cookies.
  * The widget does use the `JSON.stringify` function which is [not fully supported](http://caniuse.com/#search=json) (IE7), so if you plan to support it and use this widget, please include this [JSON library](https://github.com/douglascrockford/JSON-js).
* Fixed pager page size not sticking. Fix for [issue #24](https://github.com/Mottie/tablesorter/issues/24).
