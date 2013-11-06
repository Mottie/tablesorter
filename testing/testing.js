/*!
* TableSorter QUnit Testing
*/
/*jshint unused: false */
/*global QUnit: false, JSHINT: false, ok: false, start: false, deepEqual: false, asyncTest: false */

/************************************************
	QUnit skip testing
	http://stackoverflow.com/q/13748129/145346
************************************************/
QUnit.testSkip = function( testName, callback ) {
	QUnit.test(testName + ' (SKIPPED)', function() {
		if (typeof callback === "function") {
			callback();
		}
		var $li = $('#' + QUnit.config.current.id);
		QUnit.done(function() {
			$li.addClass('skipped');
		});
	});
};

var tester = {

	/************************************************
		JSHint testing
	************************************************/
	jsHintTest : function(name, sourceFile, options) {
		// Chrome & Opera don't allow ajax loading of script files
		if (QUnit.isLocal && /Chrome|Opera/.test(navigator.userAgent)) {
			return QUnit.testSkip(name, function(){
				ok( true, 'test cannot be done locally' );
			});
		}
		function validateFile(source) {
			var i, len, err,
			result = JSHINT(source, options),
			errors = JSHINT.errors;
			ok(result);
			if (result) {
				return;
			}
			for (i = 0, len = errors.length; i < len; i++) {
				err = errors[i];
				if (!err) {
					continue;
				}
				ok(false, err.reason + " on line " + err.line +
					", character " + err.character);
			}
		}
		return asyncTest(name, function() {
			$.ajax({
				url: sourceFile,
				dataType: 'script',
				success: function(source) {
					start();
					validateFile(source);
				}
			});
		});
	},

	/************************************************
		test table data cache
	************************************************/
	cacheCompare : function(table, col, expected, txt){
		var i, j = 0, k, l,
			result = [],
			b = table.tBodies,
			l2 = table.config.$headers.length;
		for (k = 0; k < b.length; k++){
			var normalizedRows = getCacheValues(table.config.cache[k]);			
			if (col === 'all') {
				// return all columns
				$.each(normalizedRows, function(_,row) {
					for (i = 0; i < l2; i++) {
						result.push( row[i] );
				    }
				});
			} else {
                result = normalizedRows.map(function(row) { return row[col]; });
			}
		}
		deepEqual( result, expected, 'testing parser cache: ' + txt);
	},

  domCompare : function(table, col, expected, txt)
  {
      var jTable = $(table);
      var rows = jTable.children('tbody').children('tr');
      var cells = col === 'all' ? rows.children('td') : rows.children('td:nth-child(' + (col + 1) + ')');
      var result = $.map($.makeArray(cells.filter(':visible')), function(cell, _) { return cell.innerHTML; });
      deepEqual( result, expected, 'testing dom cache: ' + txt);
  }
};

function flatten(arrayOfArrays)
{
    return arrayOfArrays.reduce(function(a,b) { return a.concat(b); },[]);
}

function getCacheValues(nodes)
{
    return flatten(nodes.map(getNodeValues));
}

function getNodeValues(node)
{
    return [node.normalized].concat(getCacheValues(node.cache));
}