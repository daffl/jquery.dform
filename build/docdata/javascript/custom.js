/**
 * @author daff
 */
$(document).ready(function() {
	$("pre").each(function() { $(this).wrapInner("<code>"); });
	
	$(".CSubscriber pre, .CType pre").each(function(count) {
		var code = $.parseJSON($(this).children("code").html());
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
		$("#" + formid).buildForm(code);
		$(tabs).tabs();
	});
	
	$(".CExample pre").each(function(count) {
		var code = $.parseJSON($(this).children("code").html());
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
		$("#" + formid).append("<form>");
		$("#" + formid).children("form").buildForm(code);
		$(tabs).tabs();
	});
	
	$.beautyOfCode.init({
		brushes: ['JScript', 'Plain'],
		ready: function() {
				$("pre").beautifyCode('javascript');
			}
	});
});