# Contributing to tablesorter (FORK)

1. [Getting Involved](#getting-involved)
2. [How To Report issues](#how-to-report-issues)
3. [Contributing Code](#contributing-code)

## Getting Involved

There are a number of ways to get involved with the development of this fork of Tablesorter. Even if you've never contributed to an Open Source project before, we're always looking for help identifying issues.

## How to Report issues, or make requests.

* First off make sure it's a new issue. Search the [FAQ](https://github.com/Mottie/tablesorter/wiki/FAQ), [documents](https://mottie.github.io/tablesorter/docs/) and the [issues](https://github.com/Mottie/tablesorter/issues).
* If it's an existing issue or feature request, and you want to show that it is also a concern for you. Add a comment!
* If it turns out to not be an issue, but a question instead:
  * Please don't open a new issue.
  * Jump on out freenode.net IRC channel: `#tablesorter`.
  * Ask the question on [Stackoverflow](https://stackoverflow.com/questions/tagged/tablesorter) (tablesorter or jQuery tag).
* If you do open a new issue:
  * If the issue only occurs in a particular browser or version of jQuery, that would be awesome to know!
  * Please include any *relevant* code (posting the entire page usually isn't that helpful).
  * Add if there are any errors showing in the console (press F12 in the browser and go to the console tab).
  * Include screenshots, animated gifs, videos (check out [screenr](https://www.screenr.com/)) or funny cat pictures. You never know what might help!

## Contributing Code

* Installation:
  * Please see the [Customize](https://github.com/Mottie/tablesorter/wiki/Customize) wiki page for specifics on how to install the necessary modules & create a custom build.
  * If you aren't comfortable using grunt or making a build file, you can go ahead and just share the changes.
* Style Guide:
  * We're not too strict, just try to follow the style that is already being used in the code; [click here here for the .jscsrc file  used in this project](https://github.com/Mottie/tablesorter/blob/master/.jscsrc).
  * When naming variables:
    * Use names that describe it's contents. I'm guilty of naming things `t` and `i`, but I'm slowly trying to rename them to make reading code and finding the variable in the code easier.
    * Name jQuery objects with a leading `$`, e.g. `var $table = $('table');`
  * We like semicolons! Jshint will yell at you if you don't use them.
  * We like single quotes! It's OCD man!
  * We like tabs!
  * We like pizza!
* Pull request:
  * Before opening a pull request, please make sure that your code is on a *fork* of the master. This is really for your own convenience: it's easy for us to accept your pull request from your master branch, but it's problematic for your fork when you want to pull the changes back and your master branch has diverged from upstream's master branch.
  * Add unit tests - tablesorter is still missing a lot of unit tests, so adding tests for your contribution would be a tremendous help!
  * Also, make sure to test your changes!
    * Use `grunt test` ([ref](https://github.com/Mottie/tablesorter/wiki/Customize#testing-a-build))
    * If you aren't comfortable with using grunt, copy, then paste your code into [jsHint](http://jshint.com/) to help find any problems with the changes.
  * There is no need to open an issue, then create a pull request. Just create the pull request and add any comments about your changes there.
