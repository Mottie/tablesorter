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

### Change Log

View the [complete listing here](//github.com/Mottie/tablesorter/wiki/Changes).

#### <a name="v2.17.8">Version 2.17.8</a> (9/15/2014)

* Core
  * Fix `widthFixed` option to ignore info block tbodies.
  * Make `emptyTo` & `stringTo` settings case insensitive.
  * An empty string `headerTemplate` option will now prevent adding an inner div to the header.
* Docs
  * Fix setting active accordion from hash script.
  * Add `emptyTo` clarification.
  * Main readme: Add related projects section.
* Editable
  * Autoresort true no longer breaks the table.
  * Update demo to use row id instead of index.
  * Update validate function to allow setting it per column.
  * Add `editable_focus`, `editable_blur` and `editable_selectAll` options. See [issue #708](//github.com/Mottie/tablesorter/issues/708).
  * Add `editable_wrapContent` option.
  * Add `editable_trimContent` option.
  * Validate function now includes a contenteditable element parameter.
  * All text callback parameters are now trimmed.
  * Trim everything & revert widget changes.
  * Refocus edited element after resort only.
  * Switch form focus to focusout.
* Filter
  * Add `filter_defaultFilter` option.
      * fix issue with using class selectors.
      * Make happy with spaces within the query.
      * Will override exact/partial select filters. Fixes [issue #721](//github.com/Mottie/tablesorter/issues/721).
      * Fixes [issue #704](//github.com/Mottie/tablesorter/issues/704).
  * Add `filter_excludeFilter` option; add multiple exclusions separated by spaces, not commas.
  * Prevent multiple searches during initialization.
  * Ensure initial filter settings get applied.
  * Selects will exactly match the selected option unless "filter-match" class is set. Fixes [issue #721](//github.com/Mottie/tablesorter/issues/721).
* Pager
  * Update cache & rows copy. Fixes [issue #703](//github.com/Mottie/tablesorter/issues/703).
  * Use native javascript to populate & set the goto select. Fixes [issue #711](//github.com/Mottie/tablesorter/issues/711).
  * Custom pager controls. Fix control updates for multiple tables.
  * Fix pager widget to be properly applied after a page move.
* StickyHeaders: Fix issue so it works with jQuery v1.2.6 again.
* Zebra: Apply style to one row. Fixes [issue #715](//github.com/Mottie/tablesorter/issues/715).
* Parser
  * Duration parser - added with [demo](//mottie.github.io/tablesorter/docs/example-parsers-duration.html).
  * Select parser - Fix for IE10+ not allowing select options to be clicked.
  * IgnoreArticles parser - Added `ignoreArticlesExcept` option.
  * url parser - ensure it is used by the filter widget.

#### <a name="v2.17.7">Version 2.17.7</a> (8/9/2014)

* Core: Do not detach rows before appending to prevent ajax rows from disappearing. Fixes [issue #701](//github.com/Mottie/tablesorter/issues/701).
* Docs: Fix change log links.
* Filter: attached external select causing javascript errors. Fixes [issue #702](//github.com/Mottie/tablesorter/issues/702)

#### <a name="v2.17.6">Version 2.17.6</a> (8/1/2014)

* Core
  * Adding a class name of `parser-false` to a column will now automatically set `sorter-false` and `filter-false` behavior.
  * Add extractor type which allows giving a column two parsers, one to extract content from an input/select and the second to parse the extracted text. Thanks to [TheSin-](//github.com/TheSin-)!
  * Ensure custom parsed data adheres to the `ignoreCase` option.
  * Add a delay to any sort if there is an update in progress. This prevents issues with a sort being applied causing duplicate rows to be added to the table, hopefully.
  * The `widthFixed` option now finds both visible `th` and `td` cells within the first row of the tbody to set column width percentages.
  * Ensure all rows have a set role for screen readers (`role="row"`). Fixes [issue #690](//github.com/Mottie/tablesorter/issues/690).
  * Redefine `c.$headers` when building headers for new/replaced header cells (not just content). Fixes [issue #683](//github.com/Mottie/tablesorter/issues/683).
* Docs
  * Fixed lots of minor HTML issues (e.g. missing closing `</li>` &amp; `<p>` tags)
* Parsers
  * Add parser for textareas within the `parser-input-select.js` file.
  * Modify input &amp; textarea parser to only update the table cache when:
      * The user presses enter (input) or alt + enter (textarea) within the element.
      * When the element is blurred.
      * Or, when the mouse leaves the tbody.
* Editable
  * Add two new options:
      * `editable_autoAccept`: accepts any changes made to the table cell automatically (`true` by default)
      * `editable_validate`: a function used to validate the changes; return a valid string (`null` by default)
  * Modify `editable_columns` type check to prevent javascript errors. See [pull #688](//github.com/Mottie/tablesorter/issues/688). Thanks [scratcher28](//github.com/scratcher28)!
  * Limit the `editable_columns` array value to columns within the table.
* Filter
  * Make all options show within the current select when the `filter-onlyAvail` class is set on a column.
  * Updated &amp; added docs for `$.tablesorter.filter.buildSelect` function to allow external calls to modify filter select options.
  * Update `filter_selectSource` to accept arrays instead of a function. This was documented as working, but it wasn't coded until now. Sorry!
  * Add `filter_selectSourceSeparator` option:
      * Include a separator within the `filter_selectSource` array (e.g. "a-z|A through Z").
      * The text that is left of the separator is added to the option value, the the text on the right is added to the option text.
      * So `"a-z|A through Z"` becomes `<option value="a-z">A through Z</option>`.
      * Fixes [issue #692](//github.com/Mottie/tablesorter/issues/692).
  * Add `role="row"` to the filter row. Fixes [issue #697](//github.com/Mottie/tablesorter/issues/697).
  * Any match inputs now follow the `filter_startsWith` setting. See [this Stackoverflow](//stackoverflow.com/q/25070448/145346) question.
* Pager
  * The `ouput` option can now include user modifiable `startRow` (`{startRow:input}`) or `page` (`{page:input}`) inputs within the output.
  * Remove selected attribute from page selector options. Fixes [issue #700](//github.com/Mottie/tablesorter/issues/700).
* Resizable
  * Update `$.tablesorter.addHeaderResizeEvent` function's first parameter `table` to accept table DOM elements as well as jQuery objects. Fixes [issue #687](//github.com/Mottie/tablesorter/issues/687).
