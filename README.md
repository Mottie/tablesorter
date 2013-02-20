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

### Special Thanks

* Big shout-out to [Nick Craver](https://github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Also big thanks to [thezoggy](https://github.com/thezoggy) for helping with code, themes and valuable feedback.
* And, thanks to everyone that has contributed, and continue to contribute to this forked project!

### Change Log

View the [complete listing here](https://github.com/Mottie/tablesorter/wiki/Change).

#### Version 2.7.9 (2/20/2013)

* Fixed an issue with the pager targetting an incorrect page when the table starts out empty.
* Get the correct number of columns when `widthFixed` is `true` and the first row contains a table. See [issue #238](https://github.com/Mottie/tablesorter/issues/238).

#### Version 2.7.8 (2/17/2013)

* Fixed script errors:
  * Comment start was stripped when converting files from UTF-8 w/BOM to UTF-8 w/o BOM.
  * Fixed Firefox error in the filter-formatter files, when HTML5 elements don't exist, oops!

#### Version 2.7.7 (2/17/2013)

* Updated the currency parser to ignore formatting (commas, decimals and spaces) when detecting the column parser.
* Updated the natural sort regex to better work with scientific notation and alphanumerics with the number first - see [this issue](https://github.com/overset/javascript-natural-sort/issues/8).
* Reverted code to only add a colgroup if the [`widthFixed`](http://mottie.github.com/tablesorter/docs/#widthfixed) option is `true` and no colgroup exists. Fixes issues [#238](https://github.com/Mottie/tablesorter/issues/238) and [#239](https://github.com/Mottie/tablesorter/issues/239).
* Added a tablesorter namespace to all bound events. Fixes [issue #233](https://github.com/Mottie/tablesorter/issues/233).
* Added a [`filterReset`](http://mottie.github.com/tablesorter/docs/#filterreset) method which is the same code executed when the [`filter_reset`](http://mottie.github.com/tablesorter/docs/#widget-filter-reset) element is clicked.
* Added a `pageSet` method to the pager which allows you to easily change the pager page (see [issue #231](https://github.com/Mottie/tablesorter/issues/231)):

    ```javascript
    // go to page 3
    $('table').trigger('pageSet', 3);
    ```

* Added a range filter to the filter widget.
  * You can now search for a range of values using either of these formats: `10 - 20` or `10 to 20`. Note the space before and after the dash so as to differentiate it from a negative sign.
  * You can also use symbols within the range `10% - 20%` or `$10 - $20`.
  * Thanks to [matzhu](https://github.com/matzhu) and [satacoy](https://github.com/satacoy) for code ideas in [issue #166](https://github.com/Mottie/tablesorter/issues/166#issuecomment-10167129).
* Added logical AND and OR operators to the filters to the filter widget.
  * Entering `box && bat` (or `box AND bat`) will only show rows that contain `box` and `bat` within the same column below the filter. It does not search other columns. The spaces between the operators and the queries are important.
  * Entering `box|bat` (or `box OR bat`) will only show rows that contain either `box` or `bat` within the same column below the filter. It does not search other columns. The spaces between the operators and the queries are important.
  * At this time you cannot combine different operators. So, `>= 100 AND <= 200` will not work, use the range filter operator (`100 - 200`) instead.
  * Using the `|` (or operator) was previously undocumented, but useable.
  * This was also requested in [issue #166](https://github.com/Mottie/tablesorter/issues/166).
* Added a new filter widget option named [`filter_formatter`](http://mottie.github.com/tablesorter/docs/#widget-filter-formatter):
  * This option allows you to add custom selectors into the filter row.
  * Because of the amount of coding, new files named "jquery.tablesorter.widgets-filter-formatter.js" and "filter.formatter.css" were added. They include code to add jQuery UI and HTML5 controls via the filter_formatter option.
  * Filter formatter functions include: "uiSpinner", "uiSlider", "uiRange" (uiSlider ranged), "uiDatepicker" (range only), "html5Number", "html5Range" and "html5Color".
  * As an example, this code will add the jQuery UI spinner to the first column:

      ```javascript
      filter_formatter : {
        0 : function($cell, indx){
          return $.tablesorter.filterFormatter.uiSpinner( $cell, indx, {
            value : 0,  // starting value
            min   : 0,  // minimum value
            max   : 50, // maximum value
            step  : 1,  // increment value by
            addToggle: true, // enable or disable the control
            exactMatch: true,
            numberFormat: "n"
          });
        }
      }
      ```

  * You can also choose to add the current selector value into a css3 tooltip or into the header by setting the `valueToHeader` option, if available.
  * Fulfills [ErinsMatthew](https://github.com/ErinsMatthew)'s feature request - [issue #232](https://github.com/Mottie/tablesorter/issues/232). Thanks for the great idea!
* NOTE: I know the js folder is getting messy. In version 3, I plan on having a separate folder for widgets and parsers. And with the build system, you'll be able to pick and choose which components you need.


#### Version 2.7.6 (2/6/2013)

* Merged in an update from [Somebi](https://github.com/Somebi) to fix a javascript error which occurs when the table doesn't have a thead or tbody, or it is already initialized.

#### Version 2.7.5 (1/31/2013)

* Added pager `pageSize` method to the docs.
* Added chili syntax highlighting script files back to the repo as some other external demos were still linking to it.

#### Version 2.7.4 (1/29/2013)

* Fixed an problem with the pager not pointing to a tbody, and breaking on an empty tbody. See [issue #223](https://github.com/Mottie/tablesorter/issues/223).
* Modified core to always add a `<colgroup>` to the table. Only when the `widthFixed` option is `true` will it add percentage based widths.
* Modified the parsers code to no longer require an `is` function; or if the function is missing, no error will be thrown.
* Modified the isoDate and usLongDate parsers:
  * isoDate parser will now auto-detect dates with times
  * usLongDate parser will now auto-detect dates in this format: "DD MMMMMMMMM YYYY" (25 Jan 2013)
* Added manifest files:
  * `component.json` for bower package manager. Thanks to [appleboy](https://github.com/appleboy); also see [issue #190](https://github.com/Mottie/tablesorter/issues/190).
  * `tablesorter.jquery.json` for the jquery plugin registry.
* Added `"updateRows"` method which is the exact same as `"update"`, but needed due to issues with Prototype. See [issue #217](https://github.com/Mottie/tablesorter/issues/217).
* Added `pageSize` method to change the pager page size more easily. See [issue #218](https://github.com/Mottie/tablesorter/issues/218).
* Added [filter widget change log](https://github.com/Mottie/tablesorter/wiki/Change3) to the wiki pages.
* Added a config variable `config.columns`:
  * This variable indicates the number of columns in the table.
  * Previously, `config.parsers.length` or `config.$headers.length` were used. Neither of which were accurate if the table was empty or multiple rows in the header existed.
  * This value may still be inaccurate if a rowspan is used in the header.
* Updated index page to use jQuery 1.9.
  * jQuery 2.0 is has a [bug adding rows to the table](http://jsfiddle.net/Mottie/abkNM/324/), so I didn't upgrade the demos to use it.
  * Changed syntax highlighting script from chilli to google's prettify.

#### Version 2.7.3 (1/10/2013)

* Fixed a serious bug in the filter widget that was breaking the widget completely if `filter_functions` was not defined (introduced in v2.7.2). Fixes [issue #213](https://github.com/Mottie/tablesorter/issues/213).
