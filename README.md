tablesorter is a jQuery plugin for turning a standard HTML table with THEAD and TBODY tags into a sortable table without page refreshes.
tablesorter can successfully parse and sort many types of data including linked data in a cell.

### Notice!

* Because of the change to the internal cache, the tablesorter v2.16+ core, filter widget and pager (both plugin &amp; widget) will only work with the same version or newer files.

### [Documentation](//mottie.github.io/tablesorter/docs/)

* See the [full documentation](//mottie.github.io/tablesorter/docs/).
* All of the [original document pages](//tablesorter.com/docs/) have been included.
* Information from my blog post on [undocumented options](//wowmotty.blogspot.com/2011/06/jquery-tablesorter-missing-docs.html) and lots of new demos have also been included.
* Change log moved from included text file into the [wiki documentation](//github.com/Mottie/tablesorter/wiki/Changes).

### Demos

* [Basic alpha-numeric sort Demo](//mottie.github.com/tablesorter/).
* Links to demo pages can be found within the main [documentation](//mottie.github.io/tablesorter/docs/).
* More demos & playgrounds - updated in the [wiki pages](//github.com/Mottie/tablesorter/wiki).

### Features

* Multi-column alphanumeric sorting and filtering.
* Multi-tbody sorting - see the [options](//mottie.github.io/tablesorter/docs/index.html#options) table on the main document page.
* Supports [Bootstrap v2 and 3](//mottie.github.io/tablesorter/docs/example-widget-bootstrap-theme.html)
* Parsers for sorting text, alphanumeric text, URIs, integers, currency, floats, IP addresses, dates (ISO, long and short formats) &amp; time. [Add your own easily](//mottie.github.io/tablesorter/docs/example-parsers.html).
* Inline editing - see [demo](//mottie.github.io/tablesorter/docs/example-widget-editable.html)
* Support for ROWSPAN and COLSPAN on TH elements.
* Support secondary "hidden" sorting (e.g., maintain alphabetical sort when sorting on other criteria).
* Extensibility via [widget system](//mottie.github.io/tablesorter/docs/example-widgets.html).
* Cross-browser: IE 6.0+, FF 2+, Safari 2.0+, Opera 9.0+, Chrome 5.0+.
* Small code size, starting at 25K minified
* Works with jQuery 1.2.6+ (jQuery 1.4.1+ needed with some widgets).
* Works with jQuery 1.9+ ($.browser.msie was removed; needed in the original version).

### Licensing

* Copyright (c) 2007 Christian Bach.
* Original examples and docs at: [http://tablesorter.com](//tablesorter.com).
* Dual licensed under the [MIT](//www.opensource.org/licenses/mit-license.php) and [GPL](//www.gnu.org/licenses/gpl.html) licenses.

### Related Projects

* [Plugin for Rails](//github.com/themilkman/jquery-tablesorter-rails). Maintained by [themilkman](//github.com/themilkman).
* [PHP templating engine for tablesorter](//github.com/alexweissman/bootsole) by [alexweissman](//github.com/alexweissman).

### Special Thanks

* Big shout-out to [Nick Craver](//github.com/NickCraver) for getting rid of the `eval()` function that was previously needed for multi-column sorting.
* Big thanks to [thezoggy](//github.com/thezoggy) for helping with code, themes and providing valuable feedback.
* Big thanks to [ThsSin-](//github.com/TheSin-) for taking over for a while and also providing valuable feedback.
* Also extra thanks to [christhomas](//github.com/christhomas) and [Lynesth](//github.com/Lynesth) for help with code.
* And, of course thanks to everyone else that has contributed, and continues to contribute to this forked project!

### Questions?

* Check the [FAQ](//github.com/Mottie/tablesorter/wiki/FAQ) page.
* Search the [main documentation](//mottie.github.io/tablesorter/docs/) (click the menu button in the upper left corner).
* Search the [issues](//github.com/Mottie/tablesorter/issues) to see if the question or problem has been brought up before, and hopefully resolved.
* If someone is available, ask your question in the `#tablesorter` IRC channel at freenode.net.
* Ask your question at [Stackoverflow](//stackoverflow.com/questions/tagged/tablesorter) using a tablesorter tag.
* Please don't open a [new issue](//github.com/Mottie/tablesorter/issues) unless it really is an issue with the plugin, or a feature request. Thanks!

### Recent Changes

View the [complete change log here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.18.4">Version 2.18.4</a> (12/22/2014)

* Docs
  * Add link to demo showing how to apply jQuery selectmenu widget to a filter
  * Update theme switcher linked styles
  * Add clarification on using jQuery selectors that target the header cell. Fixes [issue #766](https://github.com/Mottie/tablesorter/issues/766).
  * Fix various typos. Thanks [seanhussey](https://github.com/seanhussey)!
  * Add `cssIgnoreRow` docs.
* Core
  * Add `cssIgnoreRow` option. Added to a header row that is to be ignored & not added to the `config.$headers` variable.
  * Allow passing alternate headers to `getColumnData` function.
* ColumnSelector widget
  * Add `columnUpdate` event when columnSelector is updated.
  * Add `columnSelector_cssChecked` option - css class name added to checkboxes.
* Pager (addon & widget)
  * Ensure `filteredRows` variable gets updated before the move to page function is called. Fixes [issue #778](https://github.com/Mottie/tablesorter/issues/778).
* StickyHeaders widget
  * Make `includeCaption` option dynamic; add note of new jQuery requirement.
  * Add popup window demo to sticky headers example.
* Themes
  * Style filter input & selects only.
  * Only style `<i>` tags from tablesorter on theme Bootstrap v2 & less file. Thanks [frodrigo](https://github.com/frodrigo)!
  * Modify theme Dropbox & grey to also only target icon class name for css styling.

#### <a name="v2.18.3">Version 2.18.3</a> (11/7/2014)

* Core
  * Add class names to the header icons: `cssIconNone`, `cssIconAsc` & `cssIconDesc` to indicate the sort status.
  * The `widthFixed` option will no longer target nested table `colgroup` elements to determine if it needs to add a new `colgroup`.
* Docs
  * Updated Bootstrap theme example.
  * Pager widget option comment corrections.
* Themes: update all themes to hide all elements in the filter row when the `filter_hideFilters` option is `true`
* CssStickyHeaders widget: tables with a caption now work properly in Firefox.

#### <a name="v2.18.2">Version 2.18.2</a> (11/3/2014)

* Filter widget
  * Fixed initialization intermittently stalling.

* Pager addon & widget
  * Fixed pager addon javascript error.
  * Fixed pager widget not firing off "pagerComplete" in non-ajax tables.
  * Fixed `savePages` being overwritten on initialization.
  * Fixed pager widget updating the table content in non-ajax tables.
