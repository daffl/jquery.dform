/**
 * @author daff
 */
$(document).ready(function() {
	$("pre").each(function() { $(this).wrapInner("<code>"); });
	$.beautyOfCode.init({
		brushes: ['JScript', 'Plain'],
		ready: function() {
				$("pre").beautifyCode('javascript');
			}
	});
});