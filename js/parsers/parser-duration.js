/*! Duration parser
 */
/*jshint jquery:true, unused:false */
;(function($){
"use strict";

	$.tablesorter.defaults.durationLabels = 'y,d,h,m,s';

	// If any number > 9999, then set table.config.durationLength = 5
	// The below regex matches this duration example: 1y 23d 12h 44m 9s
	$.tablesorter.addParser({
		id: "duration",
		is: function() {
			return false;
		},
		format: function(s, table) {
			var i, time,
				c = table.config,
				t = '',
				duration = '',
				len = c.durationLength || 4,
				str = new Array(len + 1).join('0'),
				labels = (c.durationLabels || 'y,d,h,m,s').split(/\s*,\s*/),
				llen = labels.length;

			if (!c.durationRegex) {
				for (i = 0; i < llen; i++) {
					t += '(?:(\\d+)' + labels[i] + '\\s*)?';
				}
				c.durationRegex = new RegExp(t, 'i');
			}
			time = s.match(c.durationRegex);
			for (i = 1; i < llen + 1; i++) {
				duration += ( str + ( time[i] || 0 ) ).slice(-len);
			}
console.log(duration, s, time);
			return duration;
		},
		type: "text"
	});

})(jQuery);
