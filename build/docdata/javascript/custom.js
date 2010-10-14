/**
 * @author daff
 */
$(document).ready(function() {
	$.beautyOfCode.init({
		brushes: ['JScript', 'Plain'],
		ready: function() {
				$("pre").beautifyCode('javascript');
			}
	});
	
	$("pre").each(function() { $(this).wrapInner("<code>"); });
	
	$(".CSubscriber pre, .CType pre").each(function(count) { 	
		var elem = $(this).parent();
		var codeid = "code-" + count;
		var formid = "form-" + count;
		$(elem).wrap($("<div>").attr("id", codeid));
		$(elem).parent().wrap($("<div>"));
		var tabs = $(elem).parent().parent();
		$(tabs).prepend($("<div>").attr("id", formid));
		var ul = $("<ul>")
			.append($("<li>").append($("<a>").attr("href", "#" + formid).html("Form")))
			.append($("<li>").append($("<a>").attr("href", "#" + codeid).html("JSON")));
		$(tabs).prepend(ul);
		$(tabs).tabs();
	});
});