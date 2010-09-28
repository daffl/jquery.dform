/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * file: Extensions
 * 
 * About:
 * Subscribers for supporting external jQuery Plugins
 * (like <jQuery UI at http://jquerui.com> and the <validation plugin
 * at http://bassistance.de/jquery-plugins/jquery-plugin-validation/>).
 * 
 * Only subscribes if the elements (like validate, tabs, slider, progressbar etc.)
 * are actually available (in case you are using customs builds).
 * Make sure, that these plugins have been loaded before.
 * 
 * Author:
 * David Luecke (daff@neyeon.de)
 */
(function($)
{	
	/**
	 * section: jQuery UI
	 *
	 * Subscribers using the <jQuery UI Framework 
	 * at http://jqueryui.com>.
	 * 
	 * type: progressbar
	 * 
	 * Returns a jQuery UI progressbar.
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI progressbar documentation at
	 * 	http://jqueryui.com/demos/progressbar/>
	 */
	$.dform.subscribeIf($.isFunction($.fn.progressbar), "[type=progressbar]", 
		function(options)
		{
			var ops = _getOptions("progressbar", options);
			return $("<div>").attr(ops.attributes).progressbar(ops.options);
		});
	
	/**
	 * type: slider
	 * 
	 * Returns a slider element.
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI slider documentation at
	 * 	http://jqueryui.com/demos/slider/>
	 */
	$.dform.subscribeIf($.isFunction($.fn.slider), "[type=slider]", 
		function(options)
		{
			var ops = _getOptions("slider", options);
			return $("<div>").attr(ops.attributes).slider(ops.options);
		});

	/**
	 * type: accordion
	 * 
	 * Returns an element container 
	 * <jQuery UI accordion documentation at http://jqueryui.com/demos/accordion/> 
	 * 
	 * Parameters:
	 * 	options - As specified in the 
	 * 
	 * Todo:
	 * 	Not finished yet
	 */
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
	
	/**
	 * type: tabs
	 * 
	 * Returns a slider element.
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI tabs documentation at
	 * 	http://jqueryui.com/demos/tabs/>
	 */
	$.dform.subscribeIf($.isFunction($.fn.tabs),
		"[type=tabs]", function(options)
		{
			var ops = _getOptions("tabs", options);
			return $("<div>").attr(ops.attributes);
		});

	/**
	 * subscriber: tabs
	 * 
	 * Adds tabs to a tab element.
	 * 
	 * Parameters:
	 * 	options - An object containing a tab with its unique id as a key
	 * 	and the tab options including an "elements" with all
	 * 	subelements as a value.
	 * 	type - The type of the *this* element
	 * 
	 * For types:
	 * 	<tabs>
	 */
	$.dform.subscribeIf($.isFunction($.fn.tabs), "tabs",
		function(options, type)
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
		});
	
	/**
	 * subscriber: dialog
	 * 
	 * Creates a dialog on <form> or <fieldset> elements.
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI dialog documentation at
	 *	http://jqueryui.com/demos/dialog/>
	 * 	type - The type of the *this* element
	 */
	$.dform.subscribeIf($.isFunction($.fn.dialog), "dialog",
		function(options, type)
		{
			if (type == "form" || type == "fieldset")
				$(this).dialog(options);
		});

	/**
	 * subscriber: resizable
	 * 
	 * Makes the current element resizeable.
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI resizable documentation at
	 *	http://jqueryui.com/demos/resizable/>
	 * 	type - The type of the *this* element
	 */
	$.dform.subscribeIf($.isFunction($.fn.resizable), "resizable",
		function(options, type)
		{
			$(this).resizable(options);
		});

	/**
	 * subscriber: datepicker
	 * 
	 * Turns a text element into a datepicker.
	 * 
	 * For types:
	 * 	<text>
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI datepicker documentation at
	 *	http://jqueryui.com/demos/datepicker/>
	 * 	type - The type of the *this* element
	 */
	$.dform.subscribeIf($.isFunction($.fn.datepicker), "datepicker", 
		function(options, type)
		{
			if (type == "text")
				$(this).datepicker(options);
		});

	/**
	 * subscriber: autocomplete
	 * 
	 * Adds the autocomplete feature to a text element.
	 * 
	 * For types:
	 * 	<text>
	 * 
	 * Parameters:
	 * 	options - As specified in the <jQuery UI autotomplete documentation at
	 *	http://jqueryui.com/demos/autotomplete/>
	 * 	type - The type of the *this* element
	 */
	$.dform.subscribeIf($.isFunction($.fn.autocomplete), "autocomplete", 
		function(options, type)
		{
			if (type == "text")
				$(this).autocomplete(options);
		});
	
	$.dform.subscribeIf($.isFunction($.fn.wysiwyg), "wysiwyg",
		function(options, type)
		{
			// TODO WYSIWYG
		});

	/**
	 * subscriber: [post]
	 * 
	 * Post processing subscriber that adds jQuery UI styling classes to
	 * "text", "textarea", "password" and "fieldset" elements as well
	 * as calling .button() on submit buttons.
	 * 
	 * Parameters:
	 * options - All options that have been used for 
	 * creating the current element.
	 * type - The type of the *this* element
	 */
	$.dform.subscribe("[post]",
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
	
	/**
	 * function: _getOptions
	 * 
	 * Returns a object containing the options and HTML 
	 * attributes for an element. Options will be taken
	 * from the jQuery UI default values for the given
	 * type located in jQuery.ui.[typename].prototype.options
	 * 
	 * Parameters:
	 * 	type - The jQuery UI type
	 * 	options - The options to evaluate
	 */
	function _getOptions(type, options)
	{
		var keys = $.keyset($.ui[type]["prototype"]["options"]);
		var result = {
			options : $.withKeys(options, keys),
			attributes : $.dform.htmlAttributes(options, keys)
		};
		return result;
	}
	
	/**
	 * section: Validation Plugin
	 *
	 * Subscribers using the <jQuery validation 
	 * plugin at http://bassistance.de/jquery-plugins/jquery-plugin-validation/>
	 */
	$.dform.subscribeIf($.isFunction($.fn.validate), // Subscribe if validation plugin is available
	{
		/**
		 * subscriber: [pre]
		 * 
		 * Add a preprocessing subscriber that calls .validate() on the form,
		 * so that we can add rules to the input elements. Additionally
		 * the jQuery UI highlight classes will be added to the validation
		 * plugin default settings if the form has the ui-widget class.
		 * 
		 * Parameters:
		 * options - All options that have been used for 
		 * creating the current element.
		 * type - The type of the *this* element
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
		 * subscriber: validate
		 * 
		 * Adds support for the jQuery validation rulesets.
		 * 
		 * Parameters:
		 * options - Options as specified in the rules parameter
		 * type - The type of the *this* element
		 */
		"validate" : function(options, type)
		{
			$(this).rules("add", options);
		}
	});
})(jQuery);