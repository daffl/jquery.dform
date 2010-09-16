/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * Subscribers for supporting external jQuery Plugins
 * (like jQuery UI and the validation plugin).
 * Only subscribes if the elements (like validate, tabs, slider, progressbar etc.)
 * are actually available (in case you are using customs builds).
 * Make sure, that these plugins have been loaded before.
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	$.dform.subscribeIf($.isFunction($.fn.validate), // Subscribe if validation plugin is available
	{
		/**
		 * Add a preprocessing subscriber that calls .validate() on the form,
		 * so that we can add rules to the input elements.
		 * 
		 * @param options mixed All options that have been used for 
		 * creating the current element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"[pre]" : function(options, type)
		{
			if(type == "form")
			{
				var defaults = {};
				if($(this).hasClass("ui-widget"))
				{
					defaults = {
						highlight: function(input)
						{
							$(input).addClass("ui-state-highlight");
						},
						unhighlight: function(input)
						{
							$(input).removeClass("ui-state-highlight");
						}
					};
				}
				$(this).validate(defaults);
			}
		},
		/**
		 * Adds support for the jQuery validation rulesets.
		 * 
		 * @param options object Options as specified in the rules parameter
		 * @param type string The type of the <strong>this</strong> element
		 */
		"validate" : function(options, type)
		{
			$(this).rules("add", options);
		}
	});
	
	function _getOptions(type, options)
	{
		var keys = $.keyset($.ui[type]["prototype"]["options"]);
		var result = {
			"options" : $.withKeys(options, keys),
			"attributes" : $.dform.htmlAttributes(options, keys)
		};
		return result;
	}
	
	$.dform.subscribeIf($.isFunction($.fn.progressbar), "[type=progressbar]", 
		/**
		 * Returns a progressbar jQuery UI progressbar.
		 * @param options object All parameters for this type
		 */
		function(options)
		{
			var ops = _getOptions("progressbar", options);
			return $("<div>").attr(ops.attributes).progressbar(ops.options);
		});
	
	$.dform.subscribeIf($.isFunction($.fn.slider), "[type=slider]", 
		/**
		 * Returns a slider.
		 * @param options object All parameters for this type
		 */
		function(options)
		{
			var ops = _getOptions("slider", options);
			return $("<div>").attr(ops.attributes).slider(ops.options);
		});
	
	$.dform.subscribeIf($.isFunction($.fn.tabs),
	{
		/**
		 * Creates a container for jQuery UI tabs.
		 * @param options object All parameters for this type
		 */
		"[type=tabs]" : function(options)
		{
			var ops = _getOptions("tabs", options);
			return $("<div>").attr(ops.attributes);
		},
		/**
		 * Adds tabs to a tab element.
		 * 
		 * @param options object An object containing a tab with its unique id as a key
		 * and the tab options including an "elements" with all
		 * subelements as a value.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"tabs" : function(options, type)
		{
			if (type == "tabs")
			{
				$(this).append("<ul>");
				var scoper = $(this);
				$.each(options, function(tabname, ops)
				{
					var tablink = $("<a>").attr(
					{
						"href" : "#" + tabname
					}).html(ops.title);
					var li = $("<li>").append(tablink);
					var tabdiv = $("<div>").attr("id", tabname);
					$(scoper).children("ul").first().append(li);
					$(scoper).append(tabdiv);
					
					$(tabdiv).runAll(ops);
				});
			}
			$(this).tabs();
		}
	});
	
	$.dform.subscribeIf($.isFunction($.fn.accordion), "[type=accordion]",
		/**
		 * Creates a container for the jQuery UI accordion.
		 * @param options object All parameters for this type
		 */
		function(options)
		{
			// TODO finish accordion type
			var ops = _getOptions("accordion", options);
			return $("<div>").attr(ops.attributes);
		});

	$.dform.subscribeIf($.isFunction($.fn.dialog), "dialog",
		/**
		 * Creates a dialog on form or fieldset elements.
		 * 
		 * @param options object Options for creating the jQuery UI dialog
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type)
		{
			if (type == "form" || type == "fieldset")
				$(this).dialog(options);
		});
	
	$.dform.subscribeIf($.isFunction($.fn.resizable), "resizable",
		/**
		 * Makes the current element resizeable.
		 * 
		 * @param options object Options for creating a jQuery UI resizable
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type)
		{
			$(this).resizable(options);
		});
	
	$.dform.subscribeIf($.isFunction($.fn.datepicker), "datepicker", 
		/**
		 * Turns a text element into a datepicker
		 * 
		 * @param options object Options for creating a jQuery UI datepicker
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type)
		{
			if (type == "text")
				$(this).datepicker(options);
		});
		
	$.dform.subscribeIf($.isFunction($.fn.autocomplete), "autocomplete", 
		/**
		 * Adds an autocomplete feature to a text element.
		 * 
		 * @param options object Options for creating a jQuery UI autocomplete
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type)
		{
			if (type == "text")
				$(this).autocomplete(options);
		});
	
	$.dform.subscribe("[post]",
		/**
		 * Post processing subscriber that adds jQuery UI styling classes to
		 * "text", "textarea", "password" and "fieldset" elements as well
		 * as calling .button() on submit buttons.
		 * 
		 * @param options mixed All options that have been used for 
		 * creating the current element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type)
		{
			if ($(this).parents("form").hasClass("ui-widget"))
			{
				if ((type == "button" || type == "submit") && $.isFunction($.fn.button))
					$(this).button();
				if ($.inArray(type, [ "text", "textarea", "password",
						"fieldset" ]) != -1)
					$(this).addClass("ui-widget-content ui-corner-all");
			}
		});
})(jQuery);