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
* Works with jQuery 1.9+ ($.browser.msie was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Special Thanks

* Big shout-out to [Nick Craver](https://github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Also big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* And, thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### Version 2.8 (3/27/2013)

* Added an `updateAll` method
  * This method allows you to update the cache with data from both the `thead` and `tbody` of the table.
  * The `update` method only updates the cache from the `tbody`.
  * This fixes [issue #262](https://github.com/Mottie/tablesorter/issues/262).

* Added a grouping rows widget:
  * It only works in tablesorter 2.8+ and jQuery v1.7+.
  * This widget was added to a subfolder named `widgets` within the `js` directory.
  * A group header is added, after sorting a column, which groups rows that match the selector.
  * Selectors include whole words, letters, numbers and dates (year, month, day, weekday and time).
  * Check out [the demo](http://mottie.github.com/tablesorter/docs/example-widget-grouping.html) and get more details on how to use the widget there.
  * Thanks to [Brian Ghidinelli](http://www.ghidinelli.com/) for sharing his custom widget code.

* Added multiple parsers
  * [Month](http://mottie.github.com/tablesorter/docs/example-parsers-dates.html)
  * [Two digit year](http://mottie.github.com/tablesorter/docs/example-parsers-dates.html) (mmddyy, ddmmyy and yymmdd)
  * [Weekday](http://mottie.github.com/tablesorter/docs/example-parsers-dates.html)
  * [Date library](http://mottie.github.com/tablesorter/docs/example-parsers-dates.html) (sugar &amp; datejs)
  * ISO 8601 date by [Sean Ellingham](https://github.com/seanellingham) (no demo, yet)
  * [Metric prefixes](http://mottie.github.com/tablesorter/docs/example-parsers-metric.html)
  * [Ignore leads](example-parsers-ignore-leads.html) parser (ignores "A", "An" and "The" in titles)
  * [Inputs, checkbox and select parsers](http://mottie.github.com/tablesorter/docs/example-widget-grouping.html). These parsers automatically update on element changes, but requires jQuery 1.7+.

* Tablesorter's "update" method now checks if a column sort has been enabled or disabled:
  * Please note that the sorter precendence (order of priority) is still inforced ([reference](http://mottie.github.com/tablesorter/docs/example-options-headers.html)).
  * So, for example, if you add a "sorter-false" class name to the header, it will disable the column sort if **no** jQuery data, metadata, headers option or other `"sorter-{some parser}" class name is already in place.
  * To make sure a column becomes disabled, set it's jQuery data, then update:

    ```javascript
    $('th:eq(0)').data('sorter', false);
    $('table').trigger('update');
    ```

  * Thanks to dibs76 for asking about this on [StackOverflow](http://stackoverflow.com/questions/15222170/jquery-tablesorter-addclasssorter-false-not-disabling-sort).
  * This is also related to [issue #262](https://github.com/Mottie/tablesorter/issues/262).

* Custom parsers detection now has higher priority over default parsers:
  * If your custom parser just has an `is()` check that only returns false, nothing will change. You can still set the parser using jQuery data, metadata, the `headers` option or header class name as usual (in this [order of priority](http://mottie.github.com/tablesorter/docs/example-parsers-class-name.html)).
  * What this means is that if you wrote a custom parser with an `is()` check (which tests the string and returns a boolean where `true` shows a match for your parser), it would have previously been checked after all of the default parsers were checked.
  * Now the automatic parser detection works in reverse, from newest (custom parsers) to oldest (default parsers). So the default text and digit parsers will always be checked last.

* The `addWidget` method will now extend an included `options` object into the widget options (`table.config.widgetOptions`).
  * Default widgets will not use this functionality until version 3.0, to keep them backwards compatible.
  * Include any widget options, when writing a new widget, as follows:

    ```javascript
    // *******************
    // parameters:
    // table = table object (DOM)
    // c = config object (from table.config)
    // wo = all widget options (from table.config.widgetOptions)
    $.tablesorter.addWidget({
      id: 'myWidget',
      // widget options (added v2.8) - added to table.config.widgetOptions
      options: {
        myWidget_option1 : 'setting1',
        myWidget_option2 : 'setting2'
      },
      // The init function (added v2.0.28) is called only after tablesorter has
      // initialized, but before initial sort & before any of the widgets are applied.
      init: function(table, thisWidget, c, wo){
        // widget initialization code - this is only *RUN ONCE*
        // but in this example, only the format function is called to from here
        // to keep the widget backwards compatible with the original tablesorter
        thisWidget.format(table, config, widgetOptions, true);
      },
      format: function(table, c, wo, initFlag) {
        // widget code to apply to the table *AFTER EACH SORT*
        // the initFlag is true when this format is called from the init
        // function above otherwise initFlag is undefined
        // * see the saveSort widget for a full example *
        // access the widget options as follows:
        if (wo.myWidget_option1 === 'setting1') {
          alert('YAY');
        }
      },
      remove: function(table, c, wo){
        // do what ever needs to be done to remove stuff added by your widget
        // unbind events, restore hidden content, etc.
      }
    });
    ```

  * Updated the demo showing how you can write your own widget

* Updated all methods to stop event propagation past the table. This prevents sorted inner tables from also sorting the outer table. Fixes [issue #263](https://github.com/Mottie/tablesorter/issues/263).
* Updated filter widget to restore previous search after an update. Fixes [issue #253](https://github.com/Mottie/tablesorter/issues/253).
* Updated bower manifest file, thanks to [joyvuu-dave](https://github.com/joyvuu-dave) for the [pull request #252](https://github.com/Mottie/tablesorter/pull/252).
* Updated several public methods that require a table element:
  * These methods will now accept either a <em>table DOM element</em> or a <em>jQuery object</em>; previously it would only accept a DOM element.
  * Modified these `$.tablesorter` functions: `isProcessing`, `clearTableBody`, `destroy`, `applyWidget` and `refreshWidgets`.
  * Example: `$.tablesorter.destroy( document.getElementById('myTable') );` or `$.tablesorter.destroy( $('#myTable') );`
  * See [issue #243](https://github.com/Mottie/tablesorter/issues/243).
* Updated Bootstrap from version 2.1.1 to 2.3.1.
* Fixed issue with bootstrap demo not working in IE7. It was a silly trailing comma. Fixes [issue #265](https://github.com/Mottie/tablesorter/issues/265).
* Fixed the filter widget to work properly across tbodies. It now leaves non-sortable tbodies intact. Fixes [issue #264](https://github.com/Mottie/tablesorter/issues/264).
* Fixed the `updateCell` method which would cause a javascript error when spammed. It would try to resort the table while the tbody was detached.
* Fixed `shortDate` parser so that it no longer detects semantic version numbers (e.g. "1.0.0").
* Fixed the internal `getData()` function to properly get dashed class names; e.g. `"sorter-my-custom-parser"` will look for a parser with an id of `"my-custom-parser"`.
* Fixed IE code examples all appearing in line.
* Did some general code cleanup and rearranging.

#### Version 2.7.12 (3/1/2013)

* Fixed hiding filter rows when using filter_formatter elements. See [issue #250](https://github.com/Mottie/tablesorter/issues/250).
* Fixed an issue with `updateCell` method not removing extra table rows before computing the row index of the cell that was just updated.
* Added an `exactMatch` option to the html5color filter_formatter function.
* Added missing documentation for the `updateCell` callback method. It's been there for a while!

#### Version 2.7.11 (2/24/2013)

* Fixed several javascript errors:
  * Empty cells in a numeric column should no longer cause an error - fixes [issue #246](https://github.com/Mottie/tablesorter/issues/246).
  * The tablesorter storage function should no longer cause an error when provided an undefined key - fixes [issue #244](https://github.com/Mottie/tablesorter/issues/244).
* Added `saveSortReset` method to clear any saved sorts for a specific table. Use it as follows:

    ```javascript
    $('table').trigger('saveSortReset');
    ```

* Added `delayed` options to several filter formatter functions.
  * Selectors that can be changed quickly - uiSlider, uiRange, uiSpinner, html5Range and html5Number - will now execute the filter query after a short delay.
  * The filter delay time is set in the filter function option `filter_searchDelay`. The default delay is 300 milliseconds.

#### Version 2.7.10 (2/22/2013)

* Updated widget storage function to ensure no invalid strings are passed to the `$.parseJSON` function.
  * Thanks to [andriijas](https://github.com/andriijas) for the code suggestion :)
  * Fixes [issue #240](https://github.com/Mottie/tablesorter/issues/240) &amp; [issue #244](https://github.com/Mottie/tablesorter/issues/244).
* Updated filter widget:
  * When cell content contains quotes and the filter select is added, the quotes are now properly processed to be included within the options. Fixes [issue #242](https://github.com/Mottie/tablesorter/issues/242).
  * Empty cells are no longer added to the options. If you want to include empty cells, add the following (see [this StackOverflow question](http://stackoverflow.com/q/14990971/145346)):

    ```html
    <span style="display:none">{empty}</span>
    ```

    Then you'll get a select dropdown showing `{empty}` allowing you to select empty content.

#### Version 2.7.9 (2/20/2013)

* Fixed an issue with the pager targetting an incorrect page when the table starts out empty.
* Get the correct number of columns when `widthFixed` is `true` and the first row contains a table. See [issue #238](https://github.com/Mottie/tablesorter/issues/238).
