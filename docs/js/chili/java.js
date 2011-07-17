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
	  _name: "java"
	, _case: true
	, _main: {
		  mlcom  : { 
			  _match: /\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\// 
			, _style: "color: #4040c2;"
		}
		, com    : { 
			  _match: /\/\/.*/ 
			, _style: "color: green;"
		}
		, string : { 
			  _match: /(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/ 
			, _style: "color: teal;"
		}
		, number : { 
			  _match: /(?:\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b)|(?:0x[a-f0-9]+)\b/ 
			, _style: "color: red;"
		}
		, meta   : { 
			  _match: /(?!\@interface\b)\@[\$\w]+\b/ 
			, _style: "color: red;"
		}
		, keyword: { 
			  _match: /\b(?:while|volatile|void|try|true|transient|throws|throw|this|synchronized|switch|super|strictfp|static|short|return|public|protected|private|package|null|new|native|long|interface|int|instanceof|import|implements|if|goto|for|float|finally|final|false|extends|enum|else|double|do|default|continue|const|class|char|catch|case|byte|break|boolean|assert|abstract)\b/ 
			, _style: "color: navy; font-weight: bold;"
		}
	}
}
