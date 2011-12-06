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

####Version 2.0.23.4 (2011-12-6)

* Updated the sticky header widget to reposition the sticky header when scrolling left. Fix for [issue #9](https://github.com/Mottie/tablesorter/issues/9).

#### Version 2.0.23.3 (2011-11-7)

* Updated the filter widget:
  * Changed filter input from visibility hidden to display none. Fix/enhancement from [issue #7](https://github.com/Mottie/tablesorter/issues/7).
  * Modified the widget to better work with child rows. Added the `widgetFilterChildRows` option. Fix for [issue #8](https://github.com/Mottie/tablesorter/issues/8).
  * When `widgetFilterChildRows` is true, all child row content is included in the row filtering; if false, the child row content is ignored.
* Added `tableClass` to the documents. Apparently I forgot to add it before.
* Added a note to the filter demo bringing up [issue #6](https://github.com/Mottie/tablesorter/issues/6).
* Miscellaneous updates to the documents.

#### Version 2.0.23.2 (2011-10-28)

* Fixed pager size & total pages not being retained after destroying, then restoring the pager. Thanks to crush123 for reporting the problem!

#### Version 2.0.23.1 (2011-10-26)

* Fixed the pager plugin to prevent errors when initialized on an empty table. Fix for [issue #5](https://github.com/Mottie/tablesorter/issues/5).
* Added a Resizable Column widget
  * At this time, this widget allows resizing the column widths from the header.
  * The column widths are not saved, but if I did consider saving the widths to local storage. I just didn't get around to doing it.
  * [Demo page](http://mottie.github.com/tablesorter/docs/example-widget-resizable.html) added.
* Reorganized the next demo links, located at the bottom of every demo page, to match the order on the main document page.

#### Version 2.0.23 (2011-10-18)

* Changed the `dateFormat` option:
 * The settings are now "mmddyyyy", "ddmmyyyy", and "yyyymmdd".
 * Changed the date separator to include any of the following: slash, dash, period, comma, space(s) or tab.
 * The date format parser will only work with a four digit year.
 * Added a [demo page](http://mottie.github.com/tablesorter/docs/example-option-date-format.html).

#### Version 2.0.22.1 (2011-10-15)

* Updated the stickyHeaders widget
  * Sticky headers will now resize with the browser window
  * Updated blue and green themes to work better with sticky headers.
  * If using the uitheme widget, make sure the 'uitheme' widget is applied before (left of) the 'stickyHeaders' widget, as follows:

        widgets: ['zebra', 'uitheme', 'stickyHeaders']

#### Version 2.0.22 (2011-10-13)

* Updated the pager plugin:
  * Fixed a problem that occurred when `removeRows` is set to false - fix for [issue #4](https://github.com/Mottie/tablesorter/issues/4).
  * Added "disable.pager" and "enable.pager" methods to the pager. These are useful if you want to delete a table row with the pager applied.
  
    ```javascript
    // Delete a row
    // this function targets a button with a "remove" class name inside a table row
    // *************
    // Use delegate or live because `removeRows` is set to `true` in the demo - hidden rows don't exist
    $('table').delegate('button.remove', 'click' ,function(){
      var t = $('table');
      // disabling the pager will restore all table rows
      t.trigger('disable.pager');
      // remove the chosen row
      $(this).closest('tr').remove();
      // restore pager
      t.trigger('enable.pager');
    });
    ```

  * Fixed the `positionFixed` option (which positions the pager below the table) to now include the `offset` option value.
  * Fixed the pager arrow buttons so that destroying and enabling the pager multiple times doesn't multiply the number of pages changed.
  * Updated the pager demo page to allow deleting rows.
  * General cleanup and added lots of comments in the plugin and demo page on what each pager option does.
* Made one minor change to the tablesorter plugin to accomidate the pager plugin using the `removeRows` option.

#### Version 2.0.21.1 (2011-10-11)

* Added "stickyHeader" widget to the "jquery.tablesorter.widgets.js" file.
  * This widget makes the header stick to the top of the page while scrolling down.
  * The sticky header is fully functional and will allow you to sort the table.
  * And best of all, it can be applied to the original tablesorter plugin.
  * Thanks to Chris Coyier and his post on [persistent headers](http://css-tricks.com/13465-persistent-headers/).
* Added a compressed widget file named "jquery.tablesorter.widgets.min.js".

#### Version 2.0.21 (2011-09-22)

* Added `sortBegin` event
  * This event is triggered immediately before the actual sort. So this event occurs after the `sortStart` and after the `sortList` option has been updated.
  * It was added to allow for changing the sort dynamically. See [issue #3](https://github.com/Mottie/tablesorter/issues/3).
* Added `removeRows` option to the pager plugin
  * When `true`, the default value, the pager plugin removes all non-active rows from the table. This greatly increases the sort speed of large tables.
  * When `false`, the pager plugin merely hides the non-active rows so they all continue to exist in the table. This should allow for better access to data within the table (i.e. submitting form elements)

#### Version 2.0.20.1 (2011-09-16)

* Oops fixed currency sorting

#### Version 2.0.20 (2011-09-16)

* Filter Widget
  * Added "filter" to the "headers" option to allow disabling the filter option for a specific column - thanks jizo!
  * Added "filter-false" class, that when applied will disable the filter widget for that column.
  * Updated the headers docs and the filter widget demo.
* Updated the currency parser to use unicode characters to better work in different document formats.

#### Version 2.0.19 (2011-09-16)

* Added code in attempt to clear the table headers between multiple tables - fix for [issue #2](https://github.com/Mottie/tablesorter/issues/2).
* Cleaned up some code and wrapped the widget code to prevent conflicts with other javascript libraries.
* Updated the columns widget:
  * Added css examples to the [demo](http://mottie.github.com/tablesorter/docs/example-widget-columns.html).
  * Removed the `widgetColumns` option from the core, but it is still used by the widget - the way it is used hasn't changed.
* Updated the uitheme widget:
  * Added `widgetUitheme` option - used by the widget, but not included in the core. See the demo for a better example.
  * Example added to the [uitheme widget demo](http://mottie.github.com/tablesorter/docs/example-widget-columns.html).

#### Version 2.0.18.1 (2011-09-14)

* Updated the "uitheme" widget with method to add zebra striping and hovered header classes.

#### Version 2.0.18 (2011-09-13)

* Fixed a bug in the column widget, it would cause an error if no initial sort was set.
* Fixed a bug where an error would occur if a widget doesn't exist.
* Updated pager widget to allow restoring the pager plugin & updated demo.
* Added column filter widget. It is designed so that each column has an filter.

#### Version 2.0.17 (2011-09-11)

* Added a jquery.tablesorter.widget.js file:
  * It contains the "uitheme" widget, to add any jQuery UI theme, and the new "columns" widget, to style columns.
  * The blue and green themes have been updated with the added styles from the columns widget.
  * Added a Columns Widget demo and instructions.
* Added a `widgetColumns` option which defines the css classes added by the columns widget.
* Added notes to the pager plugin demo page to better specify when a change was added.
* The green theme header images have been modified to better work with variable width tables.

#### Version 2.0.16 (2011-09-08)

* Added notes to demo pages to indicate if the original (version 2.0.5, at [tablesorter.com](http://tablesorter.com/docs/)) does have that option or method.
* Added "addRows" method that allows adding table rows.
  * This method differs from the "update" method in that it only adds rows to the cache.
  * Use this new method to add rows to a table with the pager plugin applied. Using the "update" method on a table with the pager plugin will remove all hidden rows from the cache.
* Added a "destroy.pager" method to remove the pager from the table - pager demo updated.

#### Version 2.0.15 (2011-08-23)

* Fixed a problem that caused a javascript error when a table header cell doesn't have a class name.

#### Version 2.0.14 (2011-08-22)

* Reverted the changes made in 2.0.13 and added checks to prevent errors.
* Allowed sorting an empty table which would then automatically sort its contents when the table is updated.
* Modified "Update" and "UpdateCell" methods to automatically resort the table using the existing sort.
* Updated the [Initializing tablesorter on an empty table](http://mottie.github.com/tablesorter/docs/example-empty-table.html) demo and [Updating a table cell](http://mottie.github.com/tablesorter/docs/example-update-cell.html).

#### Version 2.0.13 (2011-08-19)

* Fixed a problem where a javascript error would occur when initializing a multi sort on an empty table. Thanks again to Eugene Ivakhiv!

#### Version 2.0.12 (2011-08-19)

* Updated the `textExtraction` functionality
   * The original textExtraction function was only able to be applied to all cells.
   * Apparently the ability to define textExtraction on a per column basis was misinterpreted by me, so now I've added it.
   * Use the option as follows:

   ```javascript
   $("table").tablesorter({
     textExtraction: {
       0: function(node) { return $(node).find(selector1).text(); },
       1: function(node) { return $(node).find(selector2).text(); },
       // etc
     }
   });
   ```

   * Updated the [Dealing with markup inside cells](http://mottie.github.com/tablesorter/docs/example-option-text-extraction.html) demo.
   * Thanks to Eugene Ivakhiv for bringing this issue to my attention in my blog.
