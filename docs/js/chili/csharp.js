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
	  _name: "cs"
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
		, preproc: { 
			  _match: /^\s*#.*/ 
			, _style: "color: red;"
		}
		, number : { 
			  _match: /\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/ 
			, _style: "color: red;"
		}
		, keyword: { 
			  _match: /\b(?:while|volatile|void|virtual|using|ushort|unsafe|unchecked|ulong|uint|typeof|try|true|throw|this|switch|struct|string|static|stackalloc|sizeof|short|sealed|sbyte|return|ref|readonly|public|protected|private|params|override|out|operator|object|null|new|namespace|long|lock|is|internal|interface|int|in|implicit|if|goto|foreach|for|float|fixed|finally|false|extern|explicit|event|enum|else|double|do|delegate|default|decimal|continue|const|class|checked|char|catch|case|byte|break|bool|base|as|abstract)\b/ 
			, _style: "color: navy; font-weight: bold;"
		}
	}
}
