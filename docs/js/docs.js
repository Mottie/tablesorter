$(function(){

	$("a.external").each(function(){this.target = '_new';});

	// get javascript source
	if ($("#js").length) {
		$("#javascript pre").text( $("#js").html().replace(/\t/g, "  ") );
	}
	if ($("#css").length) {
		$("pre.lang-css").text( $("#css").html().replace(/\t/g, "  ") );
	}
	if ($("#demo").length) {
		$("#html pre").text( $("#demo").html().replace(/\t/g, "  ") );
	}

	if (typeof prettyPrint !== 'undefined') { prettyPrint(); }

	// hide child rows
	$('#root .tablesorter-childRow').hide();
	// toggle child row content, not hiding the row since we are using rowspan
	$('#root .toggle').click(function(){
		$(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow)').toggle();
		return false;
	});

	var animating = false;

	$('.collapsible').hide();
	$('.toggle2')
		.click(function(e){
			if (!animating) {
				animating = true;
				$(this).closest('tr').find('.collapsible').slideToggle();
				setTimeout(function(){ animating = false; }, 200);
			}
			return false;
		});
	$('.toggle2, span.permalink')
		.dblclick(function(){
			window.location.hash = '#' + $(this).closest('tr')[0].id;
			return false;
		});

	$('.toggleAll, .showAll, .hideAll').click(function(){
		var t = $.trim($(this).text());
		$(this).parent().next('table').find('.collapsible')[t]();
		return false;
	});

	// update version number
	var t = $('.current-version');
	if (t.length) {
		t.html($.tablesorter.version);
	}

});

function showProperty(){
	var prop, h = window.location.hash;
	if (h) {
		prop = $(h);
		if (prop.length) {
			prop.find('.collapsible').show();
			if (h === '#csschildrow') {
				$('#root .tablesorter-childRow').show();
			}
			// move below sticky header
			if (/options/.test(prop.closest('table').attr('id') || '')) {
				$(window).scrollTop( prop.position().top - 30 );
			}
		}
	}
}

$(window).load(function(){

	$(window).bind('hashchange', function(){
		showProperty();
	});
	showProperty();

});