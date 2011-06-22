Originally posted by Jeremy Satterfield in his [blog][1], [jQuery plugins][2] and on [Snipplr][3]. This fork by [Mottie][4].

tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

###Features ([Demo][http://mottie.github.com/tablesorter/])

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats), time. [Add your own easily](docs/example-parsers.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+.
* Small code size.
* Works with jQuery 1.2.3+

###Documentation

Included all original [document pages](http://mottie.github.com/tablesorter/docs/index.html).
Also check out my blog post on [undocumented options](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) which I will add to the document pages when I get around to it.

###Licensing

* Copyright (c) 2007 Christian Bach
* Main Examples and docs at: http://tablesorter.com
* Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL](http://www.gnu.org/licenses/gpl.html) licenses:

###Change Log

#### Version 2.0.6 (2011-06-22)

* Forked original files and docs from [tablesorter.com](http://tablesorter.com) to GitHub.
* Replaced alphabetical sort with an alphanumeric sort
 * This "slower" sort can be disabled by setting the `sortLocaleCompare` option to `true`
 * The `sortLocaleCompare` option's default was changed to `false`.
 * Added a very basic demo.
* Added `tableClass` option
 * The value is "tablesorter" by default and should no longer be required in the default markup.
 * This class is applied to the table in the script and should match the css styling.
* Each header cell now has its content wrapped with a span.
 * This allows applying the direction icon to the span instead of the entire cell.
 * Although, this might just be extra markup with the advent of multiple background images and gradient backgrounds available in CSS3.
* Reformatted the code to make jSLint "happier".

### Version 2.0.5b (?)

* General
 * Added "cssChildRow" option - attach a child row to its parent.
 * Added "sortLocaleCompare" to use the native `String.localeCampare` method during text sort.
 * Added "onRenderHeader" function that is called when classes are added to the header cells.
 * Added "selectorHeaders" option to target the the header cells.
 * Changed multisort function

#### Version 2.0.3 (2008-03-17)

* Bug fixes - Missing semicolon, broke the minified version.

#### Version 2.0.2 (2008-03-14)

* General
 * Added support for the new metadata plugin.
 * Added support for jQuery 1.2.3.
 * Added support for decimal numbers and negative and positive digits.
 * Updated documenation and website with new examples.
 * Removed packed version.

* Bug fixes
 * Sort force (Thanks to David Lynch).

#### Version 2.0.1 (2007-09-17)

* General
 * Removed the need for Dimensions plugin when using the pagnation plugin thanks to offset being included in the jQuery 1.2 core.
 * Added support for jQuery 1.2.
 * Added new Minified version of tablesorter.
 * Updated documenation and website with new examples.

* Bug fixes
 * If row values are identical the original order is kept (Thanks to David hull).
 * If thead includes a table $('tbody:first', table) breaks (Thanks to David Hull).

* Speed improvements:
 * appendToTable, setting innerHTML to "" before appending new content to table body.
 * zebra widget. (Thanks to James Dempster).
