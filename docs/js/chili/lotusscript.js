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
	  _name: "ls"
	, _case: false
	, _main: {
		  mlcom: {
			  _match: /((?:^|\n)%REM\b.*)([\w\W]*?)(\n%END\s*REM\b.*)/
			, _replace: '<span class="directive">$1</span><span class="mlcom">$2</span><span class="directive">$3</span>'
			, _style: "color: #4040c2;"
		}
		, com: {
			  _match: /(?:\'.*)|(?:\bREM\b.*)/ 
			, _style: "color: green;"
		}
		, mlstr: {
			  _match: /(?:\{[^}]*\})|(?:\|[^|]*\|)/ 
			, _style: "color: red;"
		}
		, str: {
			  _match: /(?:\"[^\"].*?\")|\"\"/ 
			, _style: "color: teal;"
		}
		, keyd: {
			  _match: /\b(?:Ustring|Uchr|Ucase|Trim|Time|Strtoken|Strrightback|Strright|Strleftback|Strleft|String|Str|Space|Rtrim|Rightc|Rightbp|Rightb|Right|Oct|Midc|Midbp|Midb|Mid|Ltrim|Leftc|Leftbp|Leftb|Left|Lcase|Inputbp|Inputbox|Inputb|Input|Implode|Hex|Format|Error|Environ|Dir|Date|Curdrive|Curdir|Command|Chr|Bin)[$](?:\s)/ 
			, _style: "color: fuchsia;"
		}
		, keyw: {
			  _match: /\b(?:Yield|Year|Xor|Write|With|Width|While|Wend|Weekday|Vartype|Variant|Val|Ustring|Uselsx|Use|Until|Unlock|Unicode|Uni|Uchr|Ucase|Ubound|Typename|Type|True|Trim|Today|To|Timevalue|Timeserial|Timer|Timenumber|Time|Then|Text|Tan|Tab|Sub|Strtoken|Strrightback|Strright|Strleftback|Strleft|String|Strconv|Strcompare|Strcomp|Str|Stop|Step|Static|Sqr|Split|Spc|Space|Sleep|Single|Sin|Shell|Shared|Sgn|Setfileattr|Setattr|Set|Sendkeys|Select|Seek|Second|Rtrim|Rset|Round|Rnd|Rmdir|Rightc|Rightbp|Rightb|Right|Return|Resume|Reset|Replace|Remove|Redim|Read|Randomize|Random|Put|Published|Public|Property|Private|Print|Preserve|Pitch|Pi|Output|Or|Option|Open|On|Oct|Null|Now|Nothing|Not|Nopitch|Nocase|Next|New|Name|Msgbox|Month|Mod|Mkdir|Minute|Midc|Midbp|Midb|Mid|Messagebox|Me|Ltrim|Lsserver|Lsi_info|Lset|Loop|Long|Log|Lof|Lock|Loc|Lmbcs|Listtag|List|Line|Like|Lib|Let|Lenc|Lenbp|Lenb|Len|Leftc|Leftbp|Leftb|Left|Lcase|Lbound|Kill|Join|Isunknown|Isscalar|Isobject|Isnumeric|Isnull|Islist|Isempty|Iselement|Isdate|Isarray|Isa|Is|Integer|Int|Instrc|Instrbp|Instrb|Instr|Inputbp|Inputbox|Inputb|Input|In|Implode|Imp|Imestatus|Imesetmode|If|Hour|Hex|Goto|Gosub|Getthreadinfo|Getfileattr|Getattr|Get|Function|Fulltrim|From|Freefile|Fraction|Format|Forall|For|Fix|Filelen|Filedatetime|Filecopy|Fileattr|False|Explicit|Exp|Exit|Execute|Event|Evaluate|Error|Err|Erl|Erase|Eqv|Eof|Environ|End|Elseif|Else|Double|Doevents|Do|Dir|Dim|Destroylock|Delete|Defvar|Defstr|Defsng|Deflng|Defint|Defdbl|Defcur|Defbyte|Defbool|Declare|Day|Datevalue|Dateserial|Datenumber|Date|Datatype|Cvdate|Cvar|Currency|Curdrive|Curdir|Cstr|Csng|Createlock|Cos|Const|Compare|Command|Codeunlock|Codelockcheck|Codelock|Close|Clng|Class|Cint|Chr|Chdrive|Chdir|Cdbl|Cdat|Ccur|Cbyte|Cbool|Case|Call|Byval|Byte|Boolean|Bind|Binary|Bin|Beep|Base|Atn2|Atn|Asin|Asc|As|Arrayunique|Arrayreplace|Arraygetindex|Arrayappend|Append|Appactivate|Any|And|Alias|Activateapp|Acos|Access|Abs)\b/ 
			, _style: "color: maroon; font-weight: bold;"
		}
		, directive: {
			  _match: /((?:^|\n)(?:%if|%end|%elseif|%else)\b)|(?:(?:^|\n)%include\b.*)/ 
			, _style: "color: #5f5f5f;"
		}
		, notes: {
			  _match: /\b(?:NotesXSLTransformer|NotesXMLProcessor|NotesViewNavigator|NotesViewEntryCollection|NotesViewEntry|NotesViewColumn|NotesView|NotesTimer|NotesStream|NotesSession|NotesSAXParser|NotesSAXException|NotesSAXAttributeList|NotesRichTextTable|NotesRichTextTab|NotesRichTextStyle|NotesRichTextSection|NotesRichTextRange|NotesRichTextParagraphStyle|NotesRichTextNavigator|NotesRichTextItem|NotesRichTextDocLink|NotesReplicationEntry|NotesReplication|NotesRegistration|NotesOutlineEntry|NotesOutline|NotesNoteCollection|NotesNewsLetter|NotesName|NotesMIMEHeader|NotesMIMEEntity|NotesLog|NotesItem|NotesInternational|NotesForm|NotesEmbeddedObject|NotesDocumentCollection|NotesDocument|NotesDbDirectory|NotesDateTime|NotesDateRange|NotesDatabase|NotesDXLImporter|NotesDXLExporter|NotesDOMXMLDeclNode|NotesDOMTextNode|NotesDOMProcessingInstructionNode|NotesDOMParser|NotesDOMNotationNode|NotesDOMNodeList|NotesDOMNode|NotesDOMNamedNodeMap|NotesDOMEntityReferenceNode|NotesDOMEntityNode|NotesDOMElementNode|NotesDOMDocumentTypeNode|NotesDOMDocumentNode|NotesDOMDocumentFragmentNode|NotesDOMCommentNode|NotesDOMCharacterDataNode|NotesDOMCDATASectionNode|NotesDOMAttributeNode|NotesColorObject|NotesAgent|NotesAdministrationProcess|NotesACLEntry|NotesACL)\b/ 
			, _style: "color: navy;"
		}
		, notesui: {
			  _match: /\b(?:NotesUIWorkspace|NotesUIView|NotesUIScheduler|NotesUIDocument|NotesUIDatabase|Navigator|Field|Button)\b/ 
			, _style: "color: purple;"
		}
	}
}
