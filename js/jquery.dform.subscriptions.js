(function($)
{
	/**
	 * Create a new element with given tag and default attributes and settings.
	 * Use only options that have no subscriptions.
	 * Append to parent if given.
	 */
	function _create(tag, defaults, options)
	{
		var ops = $.dform.getOptions(options);
		return $($(tag).attr($.extend(defaults, ops)));
	}
	
	// Builder functions
	
	$.dform.subscribe("[type=text]", function(options) {
		return _create("<input>", { "type" : "text" }, options);
	});

	$.dform.subscribe("[type=password]", function(options) {
		return _create("<input>", { "type" : "password" }, options);
	});
	
	$.dform.subscribe("[type=form]", function(options) {
		return _create("<form>", { action : window.location, method : "post" }, options);
	});

	$.dform.subscribe("[type=select]", function(options) {
		return _create("<select>", {}, options);
	});
	
	$.dform.subscribe("[type=fieldset]", function(options) {
		return _create("<fieldset>", {}, options);
	});

	$.dform.subscribe("[type=textarea]", function(options) {
		return _create("<textarea>", {}, options);
	});
	
	$.dform.subscribe("[type=submit]", function(options) {
		return _create("<input>", { "type" : "submit" }, options);
	});

	$.dform.subscribe("[type=radio]", function(options) {
		return _create("<input>", { "type" : "radio" }, options);
	});
	
	$.dform.subscribe("[type=checkbox]", function(options) {
		return _create("<input>", { "type" : "checkbox" }, options);
	});

	$.dform.subscribe("[type=label]", function(options) {
		return _create("<label>", {}, options);
	});

	$.dform.subscribe("[type=html]", function(options) {
		return _create("<span>", {}, options);
	});
	
	// Subscriber functions
	
	$.dform.subscribe("html", function(options, type) {
		$(this).html(options);
	});
	
	$.dform.subscribe("elements", function(options, type) {
		var scoper = $(this);
		$.each(options, function(index, nested) {
			var values = nested;
			if(typeof(index) == "string")
				values["name"] = name;
			$(scoper).formElement(values);
		});
	});
	
	$.dform.subscribe("value", function(options, type) {
		$(this).val(options);
	});
	
	$.dform.subscribe("options", function(options, type) {
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
	
	$.dform.subscribe("hint", function(options, type) {
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
	
	$.dform.subscribe("label", function(options, type) {
		// TODO maybe derive ID from name
		var labelops = { "type" : "label" };
		if(typeof(options) == "string")
			labelops["html"] = options;
		else
			$.extend(labelops, options);
		
		if($(this).attr("name") != "" && $(this).attr("id") == "")
		{
			var id = "dform-" + type + "-" + $(this).attr("name");
			$(this).attr("id", id);
		}
		if($(this).attr("id"))
			labelops["for"] = $(this).attr("id");
		var label = $.dform.createElement(labelops);
		if(type == "checkbox" || type == "radio")
			$(this).parent().append($(label));
		else
			$(label).insertBefore($(this));
		$(label).runAll(labelops);
	});
	
	$.dform.subscribe("legend", function(options, type) {
		if(type == "fieldset")
		{
			var legend = $("<legend>").html(options);
			$(this).prepend(legend);
		}
	});
	
	/*
	$.dform.subscribe("[type=radiolist]", function(options) {
		// TODO list of radiobuttons
	});

	$.dform.subscribe("[type=checkboxlist]", function(options) {
		// TODO wrap in fieldset
		var scoper = $(this);
		$.each(options["entries"], function(index, entry) {
			var cbops = { "type" : "checkbox" };
			$.extend(cbops, entry, options);
			delete cbops["entries"];
			$(scoper).formElement(cbops);
		});
		return $(this);
	});
	*/
	
	$.dform.subscribe("type", function(options, type) {
		if(type == "submit")
			$(this).wrap("<p>");
	});
})(jQuery);