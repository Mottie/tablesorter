/* jQuery Highlight plugin
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 * Copyright (c) 2009 Bartek Szopka
 * Licensed under MIT license.
 */
;jQuery.extend({highlight:function(a,c,b,e){if(3===a.nodeType){if(c=a.data.match(c))return b=document.createElement(b||"span"),b.className=e||"highlight",a=a.splitText(c.index),a.splitText(c[0].length),e=a.cloneNode(!0),b.appendChild(e),a.parentNode.replaceChild(b,a),1}else if(1===a.nodeType&&a.childNodes&&!/(script|style)/i.test(a.tagName)&&(a.tagName!==b.toUpperCase()||a.className!==e))for(var d=0;d<a.childNodes.length;d++)d+=jQuery.highlight(a.childNodes[d],c,b,e);return 0}}); jQuery.fn.unhighlight=function(a){var c={className:"highlight",element:"span"};jQuery.extend(c,a);return this.find(c.element+"."+c.className).each(function(){var a=this.parentNode;a.replaceChild(this.firstChild,this);a.normalize()}).end()}; jQuery.fn.highlight=function(a,c){var b={className:"highlight",element:"span",caseSensitive:!1,wordsOnly:!1};jQuery.extend(b,c);a.constructor===String&&(a=[a]);a=jQuery.grep(a,function(a,b){return""!=a});a=jQuery.map(a,function(a,b){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")});if(0==a.length)return this;var e=b.caseSensitive?"":"i",d="("+a.join("|")+")";b.wordsOnly&&(d="\\b"+d+"\\b");var f=RegExp(d,e);return this.each(function(){jQuery.highlight(this,f,b.element,b.className)})};

/*!
query-string
Parse and stringify URL query strings
https://github.com/sindresorhus/query-string
by Sindre Sorhus
MIT License
*/
(function(){var b={parse:function(a){return"string"!==typeof a?{}:(a=a.trim().replace(/^\?/,""))?a.trim().split("&").reduce(function(a,b){var c=b.replace(/\+/g," ").split("=");a[c[0]]=void 0===c[1]?null:decodeURIComponent(c[1]);return a},{}):{}},stringify:function(a){return a?Object.keys(a).map(function(b){return encodeURIComponent(b)+"="+encodeURIComponent(a[b])}).join("&"):""}};"undefined"!==typeof module&&module.exports?module.exports=b:window.queryString=b})();

/* page search */
jQuery(function($){
	// $("body p").highlight(["jQuery", "highlight", "plugin"]);
	var resultsLength, searching,
		search = window.location.search,
		$results = [],
		index = 0,
		$window = $(window),
		$main = $('#main'),
		$body = $('body'),
		$search = $('.search'),
		$status = $('.status'),
		updateStatus = function(){
			$status.empty();
			if (resultsLength) {
				$results.removeClass('selected').eq(index).addClass('selected');
			}
			if ($search.val() !== '') {
				$status.html( (resultsLength === 0 ? 0 : index + 1) + ' of ' + resultsLength );
			}
		},
		jumpTo = function(){
			if (resultsLength) {
				var resultPosition, parentPosition,
					windowHeight = $window.height(),
					$current = $results.eq(index),
					$collapsible = $current.closest('.collapsible, tr[id]');
				if ($collapsible.length && $collapsible.is(':hidden')) {
					$collapsible.slideToggle();
				}
				resultPosition = $current.position().top;
				parentPosition = $collapsible.length ? $current.closest('tr[id]').position().top : resultPosition;
				if (parentPosition + $(window).height() < resultPosition) {
					parentPosition = resultPosition;
				}
				$body.scrollTop( parentPosition - 28 );
			}
			updateStatus();
		},
		applySearch = function(){
			searching = queryString.parse(search);
			if (searching.q) {
				$('#main-nav-check').prop('checked', true);
				$search
					.val( searching.q )
					// make searching.index a zero-based index
					.trigger('change', [ isNaN(searching.index) ? 0 : parseInt(searching.index, 10) - 1 ]);
			}
		};

	$search.change(function(event, newIndex){
		index = newIndex || 0;
		$main.unhighlight().highlight( $(this).val() );
		$results = $('.highlight');
		resultsLength = $results.length;
		if (index > resultsLength) {
			index = resultsLength;
		}
		jumpTo();
	});
	$('.search-prev, .search-next').click(function(){
		if (resultsLength) {
			index = index + ($(this).hasClass('search-prev') ? -1 : 1);
			if (index < 0) { index = resultsLength - 1; }
			if (index > resultsLength - 1) { index = 0; }
			jumpTo();
		}
	});
	$('.search-clear').click(function(){
		$search.val('').change();
	});
	$main.on('click', '.highlight', function(){
		index = $results.index(this);
		updateStatus();
	});

	// search on load
	// ?q=array&index=10
	if (search) {
		applySearch();
	}

});