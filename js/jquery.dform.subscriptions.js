(function($)
{
	/**
	 * Create a new element with given tag and default attributes and settings.
	 * Use only options that have no subscriptions.
	 * Append to parent if given.
	 */
	function _create(tag, defaults, options, parent)
	{
		var ops = {};
		$.each(options, function(name, value) { 
			if(!$.fb.hasSubscription(name))
				ops[name] = value;
		});
		var element = $($(tag).attr($.extend(defaults, ops)));
		if(parent)
			$(parent).append(element);
		return $(element);
	}
	
	$.fb.subscribe("[type=text]", function(options) {
		return _create("<input>", { "type" : "text" }, options, $(this));
	});

	$.fb.subscribe("[type=password]", function(options) {
		return _create("<input>", { "type" : "password" }, options, $(this));
	});
	
	$.fb.subscribe("[type=form]", function(options) {
		return _create("<form>", { action : window.location, method : "post" }, options, $(this));
	});

	$.fb.subscribe("[type=select]", function(options) {
		return _create("<select>", {}, options, $(this));
	});
	
	$.fb.subscribe("[type=fieldset]", function(options) {
		return _create("<fieldset>", {}, options, $(this));
	});

	$.fb.subscribe("[type=textarea]", function(options) {
		return _create("<textarea>", {}, options, $(this));
	});
		
	$.fb.subscribe("elements", function(options) {
		var scoper = $(this);
		$.each(options, function(name, nested) {
			var options = nested;
			options["name"] = name;
			$(scoper).formElement(options);
		});
	});
	
	$.fb.subscribe("value", function(options, type) {
		$(this).val(options);
	});
	
	$.fb.subscribe("options", function(options, type) {
		if(type == "select")
		{
			// TODO optimize this
			var scoper = $(this);
			$.each(options, function(value, content) {
				var option;
				if(typeof(content) == "string")
				{
					option = $("<option>").attr("value", value).html(content);
				}
				if(typeof(content) == "object")
				{
					option = $("<option>").attr("selected", content["selected"]).html(content["value"]);
				}
				$(scoper).append(option);
			});
		}
	});
	
	$.fb.subscribe("hint", function(options, type) {
		if(type == "text")
		{
			var key = "hint";
			$(this).data(key, options);
			$(this).val(options);
			$(this).focus(function() { 
				if($(this).val() == $(this).data(key))
					$(this).val("");
			});
			$(this).blur(function() {
				if($(this).val() == "")
					$(this).val($(this).data(key));
			});
		}
	});
	
	$.fb.subscribe("label", function(options, type) {
		var label = $("<label>").html(options);
		// TODO maybe derive ID from name
		if($(this).attr("id"))
			$(label).attr("for", $(this).attr("id"));
		$(label).insertBefore($(this));
	});
	
	$.fb.subscribe("legend", function(options, type) {
		if(type == "fieldset")
		{
			var legend = $("<legend>").html(options);
			return $(this).prepend(legend);
		}
	});
})(jQuery);