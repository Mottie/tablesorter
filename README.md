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

#### <a name="v2.9.1">Version 2.9.1</a> (4/13/2013)

* Modified `stickHeaders`:
  * Only visible cells within the sticky header will be adjusted
  * Fixes [issue #278](https://github.com/Mottie/tablesorter/issues/278).
  * Thanks to [Exinaus](https://github.com/Exinaus) for sharing his code!
  * This change doesn't fix the lag on a table with a lot of visible columns; I don't have an exact number where it will start lagging, but the one in issue #278 had 68 columns.

#### <a name="v2.9.0">Version 2.9.0</a> (4/12/2013)

* **Core changes**
  * Added a column sort method.
      * With this method, you can target a header column and trigger a sort:

          ```javascript
          $('table').find('th:eq(2)').trigger('sort');
          ```

      * This method will maintain the sorting order; so, if the column is already sorted in ascending order, this method will act as if you manually clicked on the header.
      * Whatever next sort order is applied is dependent on other option settings such as `initialSortOrder`, `lockedOrder` (set within the `headers`), `sortReset` option, `sortRestart` and will be ignored if the column sort is disabled (`sorter: false`).
      * Triggering a `click` on the header cell will not work as expected.

* **Widgets, general**
  * All of the current widgets within `jquery.tablesorter.widgets.js` and in the `js/widgets` directory use the newest addWidget template, and are **no longer compatible** with tablesorter versions older than 2.8!

* **Added widget priorities**
  * Basically when a widget is added, it can be assigned a priority number and applied in that order from lowest to highest.
  * The priority can be any number and can be thought of as similar to applying a z-index to an element in that multiple widgets can have the same priority.
  * This is needed in case a widget is applied to the table, but is dependent on another widget. For example:
      * The `uitheme` widget is the first to be applied (priority of `10`) because other widgets that copy/clone the table will need the jQuery UI/Bootstrap class names already applied to the table.
      * The sticky headers widget (priority `60`) is applied after the filter widget (priority `50`), so that it knows to update the filters within the sticky header.
  * Priorities are *optional*, and any widget applied without a priority value will automatically be assigned a priority of `10`.
  * Updated the [writing custom widgets](http://mottie.github.com/tablesorter/docs/example-widgets.html) demo to show how to add a widget priority.
  * I was planning on adding this in version 3.0, but the need arose sooner with the additions of all of the new widgets.

* **Updated Filter widget**
  * Fixed a bug that only occurred when using the filter widget with the pager plugin getting ajax data
      * The pager no longers repeatedly tries to get the first page of table content
      * Fixes [issue #270](https://github.com/Mottie/tablesorter/issues/270).
  * Fixed filter widget to correctly target the filter row cells.
  * The current filter row cells (`td`'s) are now saved to `table.config.$filters`.
  * Added a `filter_liveSearch` option:
      * If `true` (default), a search is performed while the user is typing, after a short delay.
      * If `false`, the user will have to press enter on the keyboard to initiate the search
  * Added a filter get method to work with the filter inputs
      * Use `$.tablesorter.getFilters( $('table') );` to get an array of the current filters applied to the table
  * Added a filter set method to work with the filter inputs
      * Use `$.tablesorter.setFilters( $('table'), ['abc', '1'] );` to set the first two filters values to "abc" and "1" respectively; but this does not initiate a search.
      * Use `$.tablesorter.setFilters( $('table'), ['abc', '1'], true );` to set the filters values and initiate a search.
      * The difference between `$.tablesorter.setFilters( $('table'), ['abc', '1'] );` and `$('table').trigger('search', [ ['abc', '1'] ]);` is that the `setFilters` method will update the actual filter inputs with the search query, whereas the triggered search will not.
      * If the `$('table')` does not target a table with a filter widget applied, it will return `false`.

* **Updated Resizable widget**
  * Added `resizable_addLastColumn` option which allows you to make the last column resizable, essentially making a non-full width table resizable.
  * Updated [the resizable demo](http://mottie.github.com/tablesorter/docs/example-widget-resizable.html) to show this option.
  * The resizable demo also now highlights the non-resizable "Age" column to make it more obvious.

* **Updated Sticky headers widget**
  * Added a `stickyHeaders_cloneId` option
      * This option is only used if the table has an ID defined, then the value from this option will be added to the end of the ID of the cloned sticky table.
      * Default value is `-sticky`.
      * Fixes [issue #271](https://github.com/Mottie/tablesorter/issues/271).
  * Fixed an issue with scrolling lag:
      * If the page had a large number of hidden tables (inside tabs), there would be a noticable delay while scrolling up.
      * Only visible tables are now monitored.
      * Fixes [issue #278](https://github.com/Mottie/tablesorter/issues/278).
  * This widget will now include the table caption in the sticky header:
      * Additional css was added to every theme to apply a background color to the caption, otherwise it would be transparent and content could then be seen to scroll behind it.

          ```css
          caption { background: #fff; }
          ```

      * This fullfills the enhancement request in [issue #126](https://github.com/Mottie/tablesorter/issues/126).
  * This widget will now include the filter row in the sticky header:
      * The filter row is duplicated, so searches within either filter row will update the content of the other filter row.
      * This fullfills the enhancement request in [issue #249](https://github.com/Mottie/tablesorter/issues/249).
  * Removed the processing icon from the sticky header (reported via email).

* **Added a content editable widget**
  * Added a widget to enable content editing of the table (using the contenteditable attribute), by column.
  * It has four options, used as follows:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['editable'],
        widgetOptions: {
          editable_columns       : [0,1,2],  // array that points to the columns to make editable (zero-based index)
          editable_enterToAccept : true,     // press enter to accept content, or click outside if false
          editable_autoResort    : false,    // auto resort after the content has changed.
          editable_noEdit        : 'no-edit' // class name of cell that is no editable
        }
      });
      ```

  * Make a table cell uneditable by added the class `no-edit`, set in the `editable_noEdit` option.
  * Added a [content editable widget demo](http://mottie.github.com/tablesorter/docs/example-widget-editable.html).

* **Added Repeat headers widget**
  * This widget has always been the example used in the [Writing custom widgets](http://mottie.github.com/tablesorter/docs/example-widgets.html) demo.
  * It has been updated and now follows the same format as the widget template for tablesorter version 2.9+
  * As written, it will no longer work with tablesorter versions older than 2.8.
  * Only one option for this widget is available:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['zebra', 'scroller'],
        widgetOptions : {
          rowsToSkip : 4 // number of rows to show between the repeated headers
        }
      });
      ```

* **Added Scroller widget**
  * This widget is a modified version of the scroller widget made by Tim Connell ([original demo](http://tconnell.com/samples/scroller/))
  * It has four options, used as follows:

      ```javascript
      $('table.tablesorter').tablesorter({
        widgets: ['zebra', 'scroller'],
        widgetOptions : {
          scroller_height       : 300,  // height of scroll window
          scroller_barWidth     : 17,   // scroll bar width
          scroller_jumpToHeader : true, // header snap to browser top when scrolling the tbody
          scroller_idPrefix     : 's_'  // cloned thead id prefix (random number added to end)
        }
      });
      ```

  * Added a [scroller widget demo](http://mottie.github.com/tablesorter/docs/example-widget-scroller.html).

* **Updated Pager Plugin**
  * Added all pager plugin options within the [widget options table](http://mottie.github.com/tablesorter/docs/index.html#Widget-options) on the main documentation page.
  * Added a better example of how to use the `customAjaxUrl` function.
  * Updated the `{page}` tag used withing the `ajaxUrl` option:
      * Previously `{page}` was replaced with a zero-based index of the targetted page number, now this format can also be used `{page+1}`.
      * A tag of `{page+1}` will be replaced with the targetted page number plus one, making it a one-based index.
      * Actually any number can be added, or subtracted, from the page number using this format: `{page+2}`, `{page-1}`, `{page+10}`, etc.
  * The `List` portion of the `{sortList:col}` and `{filterList:fcol}` tag are now optional:
      * These tags are used within the `ajaxUrl` option.
      * So, `{sort:col}` and `{filter:fcol}` can now be used. It just seems clearer/cleaner to me.
  * The pager's `ajaxProcessing` function is now more flexible
      * When returning the processed ajax data, it was required to return it in this form: `[ total, rows, headers ]`.
      * With this update, you can now also return the data as `[ rows, total, headers ]`.
      * If your database is dynamic and doesn't have a total, then you can just give it a really big number &amp; disable the "last" page button. The only reason the plugin needs the `total` is to calculate the total pages and to know what number to set when the user clicks on the last page button.

* **General documentation cleanup &amp; updates**
  * Grouping widget corrections
  * Updated the [repeat headers widget](http://mottie.github.com/tablesorter/docs/example-widgets.html) to use the newest widget template.

#### <a name="v2.8.2">Version 2.8.2</a> (3/28/2013)

* Updated the "ignore-leads" parser:
  * Renamed the parser to "ignore-articles"
  * Added language support and a few languages
  * Added a method to add custom articles.
  * Please see the [updated demo](http://mottie.github.com/tablesorter/docs/example-parsers-ignore-articles.html) (also renamed)
  * Thanks for [thezoggy](https://github.com/thezoggy) for feedback.
* Fixed a bug in the grouping widget demo:
  * The "priority (letter)" column was incorrectly parsing the data which, for some reason, worked in some browsers.
  * Thanks again to [thezoggy](https://github.com/thezoggy) for reporting [this issue](https://github.com/Mottie/tablesorter/issues/267).

#### <a name="v2.8.1">Version 2.8.1</a> (3/27/2013)

* Added `customAjaxUrl` option to the pager:
  * This function is called after all processing has been applied to the `ajaxUrl` string.
  * Use this function to make any other string modifications, as desired.
  * Thanks to [Cthulhu59](https://github.com/Cthulhu59) for contributing. See [pull request #256](https://github.com/Mottie/tablesorter/pull/256).

#### <a name="v2.8.0">Version 2.8.0</a> (3/27/2013)

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
  * [Ignore leads](http://mottie.github.com/tablesorter/docs/example-parsers-ignore-articles.html) parser (ignores "A", "An" and "The" in titles)
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
