tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### Documentation

* See the [full documentation](http://mottie.github.com/tablesorter/docs/).
* All of the [original document pages](http://tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](https://github.com/Mottie/tablesorter/wiki/Change).

### Demos

* [Basic alpha-numeric sort Demo](http://mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](http://mottie.github.com/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](https://github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html).
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](http://mottie.github.com/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.6+

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](http://tablesorter.com).
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses.

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### Version 2.1.17 (4/21/2012)

* Fixed an error reported in [issue #52](https://github.com/Mottie/tablesorter/issues/52) which occurrs when using the metadata plugin after the last update.
* The sticky headers widget will now work properly if TD's are included in the header, but the following should be noted:
  * The `selectorHeaders` option needs to be changed to `thead th, thead td` to properly include the TD's.
  * CSS changes to the blue theme were needed and most likely any custom themes to add a background color to these cells.
  * To prevent the TD's from being sortable, add a `sorter-false` class name to it.
* Updated the blue theme:
  * TD's in the sticky header should now have a background color applied.
  * Replaced the black arrow background image gifs with data uri. Included comments with white arrow data uri.
* Updated filter widget to more accurately count the number of columns. There was an issue with multiple header rows.

#### Version 2.1.16 (4/20/2012)

* Removed `emptyToBottom` option. It has been replaced with the `emptyTo` option.
* Added `emptyTo` option:
  * Setting it to `top` will always sort all empty table cells to the top of the table.
  * `bottom` will always sort all empty cells to the bottom of the table.
  * `none` or `zero` will treat empty cells as if their value was zero.
  * Individual columns can be modified by adding the following, set in order of priority:
      * metadata `class="{ empty: 'top' }"`. This requires the metadata plugin.
      * headers option `headers : { 0 : { empty : 'top' } }`.
      * header class name `class="empty-top"`.
      * Overall `emptyTo` option.
  * Updated the [sorting empty cells](http://mottie.github.com/tablesorter/docs/example-option-sort-empty.html) demo.
  * Fix for [issue #48](https://github.com/Mottie/tablesorter/issues/48).

* Add `stringTo` option in version 2.1.16. This options sets the string value for all of the numerical columns.
* Modified the `string` option which is only applied to text within a numerical column; setting the value to:
  * `max` will treat any text in that column as a value greater than the max (more positive) value. Same as the `max+` value, which was retained for backwards compatibility.
  * `min` will treat any text in that column as a value greater than the min (more negative) value. Same as the `max-` value.
  * `top` will always sort the text to the top of the column.
  * `bottom` will always sort the text to the bottom of the column.
  * `none` or `zero` will treat the text as if it has a value of zero.
  * Individual columns can be modified by adding the following, set in order of priority:
      * metadata `class="{ string: 'top' }"`. This requires the metadata plugin.
      * headers option `headers : { 0 : { string : 'top' } }`.
      * header class name `class="string-top"`.
      * Overall `stringTo` option.
  * Updated the [text strings in numerical sort](http://mottie.github.com/tablesorter/docs/example-options-headers-digits-strings.html).
  * Fix for [issue #50](https://github.com/Mottie/tablesorter/issues/50).

* Fixed sticky header widget to now include multiple rows. Fix for [issue #52](https://github.com/Mottie/tablesorter/issues/52).

#### Version 2.1.15 (4/18/2012)

* Modified the `emptyToBottom` option:
  * Clarified that setting this option to `null` will treat empty cells as if they had a value of zero. Fix for [issue #48](https://github.com/Mottie/tablesorter/issues/48).
  * Modified the script so that empty cells do not call their respective parser to keep the `emptyAtBottom` functionality working properly. Fix for [issue #49](https://github.com/Mottie/tablesorter/issues/49).

#### Version 2.1.14 (4/17/2012)

* Updated "shortDate" parser to include the time, if provided. I've also updated the [Changing the date format](http://mottie.github.com/tablesorter/docs/example-option-date-format.html) demo with a few times.

#### Version 2.1.13 (4/17/2012)

* Modified "digit" parser to not remove alphabetical characters as it was breaking the [text strings in numerical sort](http://mottie.github.com/tablesorter/docs/example-options-headers-digits-strings.html) functionality.
