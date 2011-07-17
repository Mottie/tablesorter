tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

See [Alpha-numeric sort Demo](http://mottie.github.com/tablesorter/) &amp; [Full Documentation](http://mottie.github.com/tablesorter/docs/)

###Features

* Multi-column sorting.
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats), time. [Add your own easily](http://mottie.github.com/tablesorter/docs/example-parsers.html)
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

View the [complete listing here](changelog.markdown).

#### Version 2.0.7 (2011-07-17)

* Added "pagerChange" and "pagerComplete" events to the pager plugin which trigger on the table. See the [pager demo](http://mottie.github.com/tablesorter/docs/example-pager.html) for an example on how to bind to them.
* Added the "sortAppend" since the option was there, but apparently the code wasn't.
* Added missing documentation from [my blog post](http://wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html)
 * This included a few new example pages: apply widgets, child rows, render header, sort append and zebra widget.
 * Added a methods and events table.
* Fixed the minified version. Apparently sorting functions called by the eval were removed by the Google Closure Compiler. Resolved by using "Whitespace only" optimization.
* Fixed syntax highlighting; updated Chili.
