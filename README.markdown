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

#### Version 2.1.2 (3/11/2012)

* Added `table` and `cellIndex` variables to the `textExtraction` function to allow using a more general function for text extraction.
* Empty cells will no longer skip the parser allowing extracting data attributes.
 * This was only an issue on table cells with no text.
 * Added a demo to the [demos wiki page](https://github.com/Mottie/tablesorter/wiki) whichs allows [dynamic sorting of checkboxes](http://jsfiddle.net/Mottie/vCTHw/18/).

#### Version 2.1.1 (3/8/2012)

* Renamed `filter_fromStart` to `filter_startsWith`.
* Fixed an issue with `sortRestart` not working properly.
  * In turn, `sortReset`, `lockOrder` and `sortInitialOrder` were modified with this change and were made sure to all work properly.
  * The `sortInitialOrder` will work in either the main options or specifically within the headers option when a particular column needs a different initial sort order.
  * Added a [sortReset/sortRestart](http://mottie.github.com/tablesorter/docs/example-option-sortreset-sortrestart.html) demo.
  * Resolves [issue #30](https://github.com/Mottie/tablesorter/issues/29).
* Updated pager plugin to better work with the sticky header widget.

#### Version 2.1 (3/7/2012)

* Added `selectorRemove` option
 * Any table row with this css class will be removed from the table prior to updating the table contents.
 * The reason this was added was in case a widget or some other script adds rows to the table for styling, or something else. If a table update is triggered (`$(table).trigger('update');`), all rows in the table will be included in the update.
 * The [writing custom widgets](http://mottie.github.com/tablesorter/docs/example-widgets.html) demo has been updated to include this class name.
 * The pager plugin update also uses this to remove the row added by the new `fixedHeight` option.
 * It's default value is `tr.remove-me`, so it can be modified to remove more than just rows.

* Fixed a bug that broke the plugin if you set `sorter: true` in the header options.

* Pager plugin update
  * Ajax
    * The pager plugin will now interact with a database via JSON. See [demo here](http://mottie.github.com/tablesorter/docs/example-pager-ajax.html).
    * Added `ajaxUrl` option which contains the variables `{page}` and `{size}` which will be replaced by the plugin to obtain that data.

        ```javascript
        ajaxUrl : "http:/mydatabase.com?page={page}&size={size}"
        ```

    * Another option named `ajaxProcessing` was included to process the data before returning it to the pager plugin. Basically the JSON needs to contain the data to match the example below. An additional required variable is the total number of records or rows needs to be returned.

        ```javascript
        // process ajax so that the data object is returned along with the total number of rows
        // example: { "data" : [{ "ID": 1, "Name": "Foo", "Last": "Bar" }], "total_rows" : 100 }
        ajaxProcessing: function(ajax){
          if (ajax && ajax.hasOwnProperty('data')) {
            // return [ "data", "total_rows" ];
            return [ ajax.data, ajax.total_rows ];
          }
        }
        ```

    * I tried to make the plugin interact with a database as flexible as possible, but I'm sure I haven't covered every situation. So any and all feedback is welcome!
    * Also, much thanks to [kachar](https://github.com/kachar) for the [enhancement request](https://github.com/Mottie/tablesorter/issues/31) and willingness to help test it!

  * Removed `positionFixed` and `offset` options.
  * Added `fixedHeight` option which replaces the `positionFixed` and `offset` options by maintaining the height of the table no matter how few rows are showing. During testing, it displayed some odd behaviour after adding or deleting rows, but it should have been fixed... just please keep an eye out ;).
  * The pager now adds all of its options to the table configuration options within an object named "pager". Basically what this means is that instead of add all of the pager options to be mixed in with the tablesorter options, the pager options have been isolated and can be found by typing this into the browser console: `$('table')[0].config.pager`.

* **Storage** function added named `$.tablesorter.storage` for use in widgets
 * It is used by various widgets to save data to either local storage (if available) or cookies.
 * This function needs to use `JSON.stringify()` which is [not supported by IE7](http://caniuse.com/#search=json). If you need to support IE7, then include this library: [JSON-js](https://github.com/douglascrockford/JSON-js).
 * Use the function with your own custom widgets as follows:

        ```javascript
        // *** Save data (JSON format only) ***
        // val must be valid JSON... use http://jsonlint.com/ to ensure it is valid
        var val = { "mywidget" : "data1" }; // valid JSON uses double quotes
        // $.tablesorter.storage(table, key, val);
        $.tablesorter.storage(table, 'tablesorter-mywidget', val);
    
        // *** Get data: $.tablesorter.storage(table, key); ***
        v = $.tablesorter.storage(table, 'tablesorter-mywidget');
        // val may be empty, so also check for your data
        val = (v && v.hasOwnProperty('mywidget')) ? v.mywidget : '';
        alert(val); // "data1" if saved, or "" if not
        ```

* Added an option named `widgetOptions`:
 * This is a move to store all widget specific options in one place so as not to polute the main table options.
 * All current widgets have been modified to use this new option.
 * Only one widget option, `widgetZebra` will be retained for backwards compatibility with the original plugin.
 * More details for each widget are explained below.

* **Zebra** widget:
 * Added `zebra` options to the new `widgetOptions`.

    ```javascript
    widgetOptions : {
      zebra : [ "even", "odd" ]
    }
    ```

 * This replaces `widgetZebra: { css: [ "even", "odd" ] }`, but if the `widgetZebra` option exists, it will over-ride this newer `widgetOptions.zebra` option in order to maintain backwards compatibility.

* **UI Theme** widget:
 * Changed css class of div wrapping the contents of each header cell from "inner" to "tablesorter-inner".
 * Added "ui-state-default" to the table head columns. Thanks to [Raigen](https://github.com/Raigen) for [sharing the code](https://github.com/Mottie/tablesorter/pull/33)!
 * Moved `widgetUitheme` option into the new `widgetOptions`.

    ```javascript
    widgetOptions : {
      // adding zebra striping, using content and default styles - the ui css removes the background from default
      // even and odd class names included for this demo to allow switching themes
      zebra   : ["ui-widget-content even", "ui-state-default odd"],

      // change default uitheme icons - find the full list of icons here: http://jqueryui.com/themeroller/ (hover over them for their name)
      // default icons: ["ui-icon-arrowthick-2-n-s", "ui-icon-arrowthick-1-s", "ui-icon-arrowthick-1-n"]
      // ["up/down arrow (cssHeaders/unsorted)", "down arrow (cssDesc/descending)", "up arrow (cssAsc/ascending)" ]
      uitheme : ["ui-icon-carat-2-n-s", "ui-icon-carat-1-s", "ui-icon-carat-1-n"]
    }
    ```

* **Filter** widget changes:
 * Added a new filter widget specific option `widgetOptions.filter_fromStart` which makes the filter only work from the first letter.
 * Added a `widgetOptions.filter_cssFilter` option which now contains the class name added to the filter row and each input within it. Previously the class name used was "filters" for the row and "filter" for the input, now both are "tablesorter-filter". Thanks to [cr125rider](https://github.com/cr125rider) for [sharing a code fix](https://github.com/Mottie/tablesorter/issues/32)!
 * Added css3 box sizing to allow a better fitting filter box. Thanks to [thezoggy](https://github.com/thezoggy) for sharing the code!
 * The css changes were also added to the blue, green and UI style sheets.
 * Updated the filter widget demo with the available options described above; this includes the `widgetOptions.filter_childRows` option which was previously undocumented, recently renamed.

* **Resizable Columns** Widget changes:
 * The resized column width is now saved using the `$.tablesorter.storage()` function (optional)
 * If the storage function doesn't exist, the widget will still function, but just not save the column width.

* **Save Sort** Widget changes:
 * Modified to now use the `$.tablesorter.storage()` function (required)
 * The storage function is required for this widget to work properly.
 * Previous saved data is not compatible with the changes made and will be ignored.

* Updated all docs demos to use jQuery 1.7+.

#### Version 2.0.31 (2012-2-27)

* Added `sortRestart` option:
  * When `true`, this option resets the sort direction so that clicking on an unsorted column will now sort in the `sortInitialOrder` direction.
  * Clicking on a single column to cancel a multi-sorted table may not initially sort as expected.
  * Requested by severa in [issue #30](https://github.com/Mottie/tablesorter/issues/29). Thanks!
* Made some `sortReset` fixes:
  * Columns widget will now clear it's styling when the sort has reset.
  * Added a [demo](http://mottie.github.com/tablesorter/).
* Changed the filter widget inputs to be of a search type:
 * Currently only supported by webkit.
 * Requested by cr125rider in [issue #29](https://github.com/Mottie/tablesorter/issues/29). Thanks!
* Updated `sortLocaleCompare` documentation since it was explained incorrectly.
* Did some general code cleanup and some optimization.

#### Version 2.0.30.1 (2012-2-20)

* Modified the "filter" widget to disable the input window instead of setting it with display none. Now the input is disabled and a "disabled" class is applied to allow for further styling.
