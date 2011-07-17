/* Stop IE flicker */
if ($.browser.msie == true) document.execCommand('BackgroundImageCache', false, true);

jQuery.fn.antispam = function() {
	return this.each(function(){
		var email = $(this).text().toLowerCase().replace(/\sdot/g,'.').replace(/\sat/g,'@').replace(/\s+/g,'');
		var URI = "mailto:" + email;
		$(this).hide().before(
			$("<a></a>").attr("href",URI).addClass("external").text(email)
		);
	});
};

$(function(){

	$("a.external").each(function() {this.target = '_new'});	
	$("span.email").antispam();

	// get javascript source
	if ($("#js").length) {
		$("#javascript pre").text( $("#js").html().replace(/\t/g, "  ") );
	}
	if ($("#css").length) {
		$("pre.css").text( $("#css").html().replace(/\t/g, "  ") );
	}
	if ($("#demo").length) {
		$("#html pre").text(
			$("#demo").html()
				.replace(/\t/g, "  ")
//				.replace(/[<>]/g, function(m){ return {'<':'&lt;','>':'&gt;'}[m]; })
		);
	}

	// hide child rows
	$('#root .expand-child').hide();
	// toggle child row content, not hiding the row since we are using rowspan
	$('#root .toggle').click(function(){
		$(this).closest('tr').nextUntil('tr:not(.expand-child)').toggle();
		return false;
	});

	$('.collapsible').hide();
	$('.toggle2').click(function(){
		$(this).closest('tr').find('.collapsible').slideToggle();
		return false;
	});

	$('.toggleAll, .showAll, .hideAll').click(function(){
		var t = $.trim($(this).text());
		$(this).parent().next('table').find('.collapsible')[t]();
		return false;
	});

});

$(window).load(function(){
	$(".js").chili();
	$(".html").chili();
	$(".css").chili();
});