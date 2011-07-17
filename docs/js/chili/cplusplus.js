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
	  _name: "cpp"
	, _case: true
	, _main: {
		  mlcom   : { 
			  _match: /\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\// 
			, _style: "color: #4040c2;"
		}
		, com     : { 
			  _match: /\/\/.*/ 
			, _style: "color: green;"
		}
		, preproc : { 
			  _match: /(?=^|\n)\s*#\w+/ 
			, _style: "color: red;"
		}
		, string  : { 
			  _match: /(?:\'[^\'\\\n]*(?:\\.[^\'\\\n]*)*\')|(?:\"[^\"\\\n]*(?:\\.[^\"\\\n]*)*\")/ 
			, _style: "color: teal;"
		}
		, number  : { 
			  _match: /\b[+-]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?\b/ 
			, _style: "color: red;"
		}
		, datatype: { 
			  _match: /\b(?:wint_t|wctype_t|wctrans_t|wchar_t|va_list|uintptr_t|tm|time_t|terminate_function|size_t|signed|sig_atomic_t|short|ptrdiff_t|mbstate_t|long|ldiv_t|lconv|jmp_buf|intptr_t|int|fpos_t|float|double|div_t|clock_t|char|bool|_wfinddatai64_t|_wfinddata_t|_utimbuf|_timeb|_stati64|_stat|_purecall_handler|_onexit_t|_off_t|_finddatai64_t|_finddata_t|_exception|_diskfree_t|_dev_t|_complex|__wfinddata64_t|__wchar_t|__timeb64|__time64_t|__stat64|__int8|__int64|__int32|__int16|__finddata64_t|_PNH|_HFILE|_HEAPINFO|_FPIEEE_RECORD|_EXCEPTION_POINTERS|WPARAM|WORD|WCHAR|VOID|USN|USHORT|ULONG_PTR|ULONGLONG|ULONG64|ULONG32|ULONG|UINT_PTR|UINT64|UINT32|UINT|UHALF_PTR|UCHAR|TCHAR|TBYTE|SSIZE_T|SIZE_T|SHORT|SERVICE_STATUS_HANDLE|SC_LOCK|SC_HANDLE|PWSTR|PWORD|PWCHAR|PVOID|PUSHORT|PULONG_PTR|PULONGLONG|PULONG64|PULONG32|PULONG|PUINT_PTR|PUINT64|PUINT32|PUINT|PUHALF_PTR|PUCHAR|PTSTR|PTCHAR|PTBYTE|PSTR|PSSIZE_T|PSIZE_T|PSHORT|POINTER_64|POINTER_32|PLONG_PTR|PLONGLONG|PLONG64|PLONG32|PLONG|PLCID|PINT_PTR|PINT64|PINT32|PINT|PHKEY|PHANDLE|PHALF_PTR|PFLOAT|PDWORD_PTR|PDWORDLONG|PDWORD64|PDWORD32|PCWSTR|PCTSTR|PCSTR|PCHAR|PBYTE|PBOOLEAN|PBOOL|LRESULT|LPWSTR|LPWORD|LPVOID|LPTSTR|LPSTR|LPLONG|LPINT|LPHANDLE|LPDWORD|LPCWSTR|LPCVOID|LPCTSTR|LPCSTR|LPCOLORREF|LPBYTE|LPBOOL|LPARAM|LONG_PTR|LONGLONG|LONG64|LONG32|LONG|LGRPID|LCTYPE|LCID|LANGID|INT_PTR|INT64|INT32|INT|HWND|HWINSTA|HSZ|HRSRC|HRGN|HRESULT|HPEN|HPALETTE|HMONITOR|HMODULE|HMETAFILE|HMENU|HLOCAL|HKL|HKEY|HINSTANCE|HICON|HHOOK|HGLOBAL|HGDIOBJ|HFONT|HFILE|HENHMETAFILE|HDWP|HDROP|HDESK|HDDEDATA|HDC|HCURSOR|HCONVLIST|HCONV|HCOLORSPACE|HBRUSH|HBITMAP|HANDLE|HALF_PTR|HACCEL|FLOAT|FILE|DWORD_PTR|DWORDLONG|DWORD64|DWORD32|DWORD|COLORREF|CHAR|BYTE|BOOLEAN|BOOL|ATOM)\b/ 
			, _style: "color: blue;"
		}
		, keyword : { 
			  _match: /\b(?:while|whcar_t|volatile|void|virtual|uuid|using|union|typename|typeid|typedef|try|true|throw|thread|this|template|switch|struct|static_cast|static|sizeof|selectany|return|reinterpret_cast|register|public|protected|private|nothrow|noreturn|noinline|new|namespace|naked|mutable|inline|if|goto|friend|for|false|extern|explicit|enum|else|dynamic_cast|do|dllimport|dllexport|deprecated|delete|default|continue|const_cast|const|class|catch|case|break|__try|__finally|__exception|__declspec)\b/ 
			, _style: "color: navy; font-weight: bold;"
		}
	}
}
