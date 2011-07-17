/*
===============================================================================
Chili is the jQuery code highlighter plugin
...............................................................................
LICENSE: http://www.opensource.org/licenses/mit-license.php
WEBSITE: http://noteslog.com/chili/

											   Copyright 2008 / Andrea Ercolino
===============================================================================
*/

{
	  _name: "pas"
	, _case: true
	, _main: {
		  mlcom: {
			  _match: /(?:\(\*[\w\W]*?\*\))|(?:{(?!\$)[\w\W]*?})/ 
			, _style: "color: #4040c2;"
		}
		, com: {
			  _match: /\/\/.*/ 
			, _style: "color: green;"
		}
		, string: {
			  _match: /(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')/ 
			, _style: "color: teal;"
		}
		, number: {
			  _match: /(?:\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b)|(?:\$[a-zA-Z0-9]+\b)/ 
			, _style: "color: red;"
		}
		, direct: {
			  _match: /\{\$[a-zA-Z]+ .+\}/ 
			, _style: "color: red;"
		}
		, keyword: {
			  _match: /\b(?:abs|addr|and|ansichar|ansistring|array|as|asm|begin|boolean|byte|cardinal|case|char|class|comp|const|constructor|currency|destructor|div|do|double|downto|else|end|except|exports|extended|false|file|finalization|finally|for|function|goto|if|implementation|in|inherited|initialization|int64|integer|interface|is|label|library|longint|longword|mod|nil|not|object|of|on|or|packed|pansichar|pansistring|pchar|pcurrency|pdatetime|pextended|pint64|pointer|private|procedure|program|property|protected|pshortstring|pstring|public|published|pvariant|pwidechar|pwidestring|raise|real|real48|record|repeat|set|shl|shortint|shortstring|shr|single|smallint|string|then|threadvar|to|true|try|type|unit|until|uses|val|var|varirnt|while|widechar|widestring|with|word|write|writeln|xor)\b/ 
			, _style: "color: navy; font-weight: bold;"
		}
	}
}
