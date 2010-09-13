/*
 * jQuery dynamic form plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * The MIT license
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Plugin extension subscribers, adding support for jQuery UI
 * and the Validation Plugin.
 * Initializes element type subscribers and subscriber functions
 * provided by the jQuery UI framework.
 * Only subscribes if the elements (like tabs, slider, progressbar etc.)
 * are actually available (in case you are using a custom jQuery UI build).
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	if($.isFunction($.fn.validate)) // Check if the validation plugin is available
	{
		$.dform.subscribe(
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
	}
	
	function _getOptions(type, options)
	{
		var keys = $.keyset($.ui[type]["prototype"]["options"]);
		var result = {
			"options" : $.withKeys(options, keys),
			"attributes" : $.dform.htmlAttributes(options, keys)
		};
		return result;
	}
	
	if($.isFunction($.fn.progressbar))
	{
		$.dform.subscribe("[type=progressbar]", 
		/**
		 * Returns a progressbar jQuery UI progressbar.
		 * @param options object All parameters for this type
		 */
		function(options)
		{
			var ops = _getOptions("progressbar", options);
			return $("<div>").attr(ops.attributes).progressbar(ops.options);
		});
	}
	
	if($.isFunction($.fn.slider))
	{
		$.dform.subscribe("[type=slider]", 
		/**
		 * Returns a slider.
		 * @param options object All parameters for this type
		 */
		function(options)
		{
			var ops = _getOptions("slider", options);
			return $("<div>").attr(ops.attributes).slider(ops.options);
		});
	}
	
	if($.isFunction($.fn.tabs))
	{
		$.dform.subscribe(
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
	}
	
	if($.isFunction($.fn.accordion))
	{
		$.dform.subscribe("[type=accordion]",
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
	}

	if($.isFunction($.fn.dialog))
	{
		$.dform.subscribe("dialog",
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
	}
	
	if($.isFunction($.fn.resizable))
	{
		$.dform.subscribe("resizable",
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
	}
	
	if($.isFunction($.fn.datepicker))
	{
		$.dform.subscribe("datepicker", 
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
	}
	
	if($.isFunction($.fn.autocomplete))
	{
		$.dform.subscribe("autocomplete", 
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
	}
	
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
			if ( (type == "button" || type == "submit") && $.isFunction($.fn.button))
				$(this).button();
			if ($.inArray(type, [ "text", "textarea", "password",
					"fieldset" ]) != -1)
				$(this).addClass("ui-widget-content ui-corner-all");
		}
	});
})(jQuery);