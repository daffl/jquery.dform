/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * Initializes basic element types and core subscriber functions.
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	/**
	 * Returns a function that uses the given tag and default values to create
	 * a new element from given options.
	 * @param tag The tag to use
	 * @param defaults The default options
	 */
	function _c(tag, defaults)
	{
		// Currying :)
		return function(options) {
			var ops = $.dform.htmlAttributes(options);
			return $(tag).attr($.extend(ops, defaults));		
		};
	}

	// Type subscriber functions
	$.dform.subscribe(
	{
		/**
		 * Type function that creates a text input field
		 * @param options object All parameters for this type
		 */
		"[type=text]" : _c("<input>", { "type" : "text" }),
		/**
		 * Type function that creates a password input field
		 * @param options object All parameters for this type
		 */
		"[type=password]" : _c("<input>", { "type" : "password" }),
		/**
		 * Type function that creates a select input (without options)
		 * @param options object All parameters for this type
		 */
		"[type=select]" : _c("<select>", {}),
		/**
		 * Type function that creates a fieldset
		 * @param options object All parameters for this type
		 */
		"[type=fieldset]" : _c("<fieldset>", {}),
		/**
		 * Type function that creates a textarea
		 * @param options object All parameters for this type
		 */
		"[type=textarea]" : _c("<textarea>", {}),
		/**
		 * Type function that creates a submit button
		 * @param options object All parameters for this type
		 */
		"[type=submit]" : _c("<input>", { "type" : "submit" }),
		/**
		 * Type function that creates a label (without text)
		 * @param options object All parameters for this type
		 */
		"[type=label]" : _c("<label>", {}),
		/**
		 * Type function that returns a span element
		 * @param options object All parameters for this type
		 */
		"[type=html]" : _c("<span>", {}),
		/**
		 * Returns a button element.
		 * @param options object All parameters for this type
		 */
		"[type=button]" : _c("<button>", {}),
		/**
		 * Returns a hidden input field.
		 * @param options object All parameters for this type
		 */
		"[type=hidden]" : _c("<input>", { "type" : "hidden" }),
		/**
		 * Type function that creates a single radio button
		 * @param options object All parameters for this type
		 */
		"[type=radio]" : _c("<input>", { "type" : "radio" }),
		/**
		 * Type function that creates a single radio checkbox
		 * @param options object All parameters for this type
		 */
		"[type=checkbox]" : _c("<input>", { "type" : "checkbox" }),
		/**
		 * Returns an empty container for checkbox lists
		 */
		"[type=checkboxes]" : _c("<div>", {}),
		/**
		 * Returns an empty container for radiobuttons
		 */
		"[type=radiobuttons]" : _c("<div>", {}),
		/**
		 * Create a file upload element
		 */
		"[type=file]" : _c("<input>", { "type" : "file" })
	});

	// Subscriber functions
	$.dform.subscribe(
	{
		/**
		 * Calls addClass on the current element
		 * (instead of of the standard behaviour which is replacing the class attribute)
		 * 
		 * @param options string A list of whitespace separated classnames
		 * @param type string The type of the <strong>this</strong> element
		 */
		"class" : function(options, type)
		{
			$(this).addClass(options);
		},
		/**
		 * Sets html content of the current element
		 * 
		 * @param options string The html content to set
		 * @param type string The type of the <strong>this</strong> element
		 */
		"html" : function(options, type)
		{
			$(this).html(options);
		},
		/**
		 * Recursively appends subelements to the current form element.
		 * 
		 * @param options mixed Either an object with key value pairs
		 * where the key is the element name and the value the
		 * subelement options or an array of objects where each object
		 * is the subelement options
		 * @param type string The type of the <strong>this</strong> element
		 */
		"elements" : function(options, type)
		{
			var scoper = $(this);
			$.each(options, function(index, nested)
			{
				var values = nested;
				if (typeof (index) == "string")
					values["name"] = name;
				$(scoper).formElement(values);
			});
		},
		/**
		 * Sets the value of the current element.
		 * 
		 * @param options string The value to set
		 * @param type string The type of the <strong>this</strong> element
		 */
		"value" : function(options, type)
		{
			$(this).val(options);
		},
		/**
		 * Adds options to select type elements.
		 * 
		 * @param options object A key value pair where the key is the
		 * option value and the value the options text or the settings for the element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"options" : function(options, type)
		{
			var scoper = $(this);
			if (type == "select") // Options for select elements
			{
				// TODO optgroup
				$.each(options, function(value, content)
				{
					var option;
					if (typeof (content) == "string")
						option = $("<option>").attr("value", value).html(
								content);
					if (typeof (content) == "object")
					{
						var fn = _c("<option>", {});
						option = fn($.withoutKeys(content, ["value"])).html(content["value"]);
					}
					$(scoper).append(option);
				});
			}
		},
		/**
		 * Adds a default default value to text elements, that disappears
		 * when the element gets focussed and reappears if the element looses
		 * focus and nothing has been entered.
		 * 
		 * @param options string The default value to set. Usually a helper text
		 * with instructions for the user (e.g. enter mail here...)
		 * @param type string The type of the <strong>this</strong> element
		 */
		"placeholder" : function(options, type)
		{
			if (type == "text" || type == "textarea")
			{
				var key = "placeholder";
				var scoper = this;
				$(this).data(key, options);
				$(this).val(options);
				$(this).focus(function()
				{
					if ($(this).val() == $(this).data(key))
						$(this).val("");
				});
				$(this).blur(function()
				{
					if ($(this).val() == "")
						$(this).val($(this).data(key));
				});
				// Submit handler that clears the field before submit
				$(this).parents("form").submit(function()
				{
					if($(scoper).val() == $(scoper).data(key))
						$(scoper).val("");
				});
			}
		},
		/**
		 * Adds a label element before the current element or a legend
		 * if the current element is a fieldset or a decription next to it
		 * if the current element is a radiobutton or a checkbox.
		 * 
		 * @param options string The label text or an object with label
		 * options.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"label" : function(options, type)
		{
			if (type == "fieldset")
			{
				// Labels for fieldsets are legend
				var legend = $("<legend>").html(options);
				$(this).prepend(legend);
			}
			else
			{
				var labelops = { "type" : "label" };
				if (typeof (options) == "string")
					labelops["html"] = options;
				else
					$.extend(labelops, options);
				// TODO automatic id generation?
				if ($(this).attr("id"))
					labelops["for"] = $(this).attr("id");
				var label = $.dform.createElement(labelops);
				if (type == "checkbox" || type == "radio")
					$(this).parent().append($(label));
				else
					$(label).insertBefore($(this));
				$(label).runAll(labelops);
			}
		},
		/**
		 * An empty subscriber for types so that it doesn't show up as
		 * an attribute in HTML elements. Since every element needs a type
		 * parameter feel free to add other type subscribers to do
		 * any processing between [pre] and [post]
		 * 
		 * @param options string the name of the type.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"type" : function(options, type) {},
		/**
		 * The 'type' subscriber function is a post processing function,
		 * that will run whenever all other subscribers are finished.
		 * 
		 * @param options mixed All options that have been used for 
		 * creating the current element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"[post]" : function(options, type)
		{
			if (type == "submit")
				$(this).wrap("<p>");
			if (type == "checkboxes" || type == "radiobuttons")
			{
				var boxtype = ((type == "checkboxes") ? "checkbox" : "radio");
				$(this).children("[type=" + boxtype + "]").each(function() {
					$(this).attr("name", options.name);
				});
			}
		}
	});
	
	$.dform.subscribe("options", 
		/**
		 * Adds options to checkbox- or radiobutton lists.
		 * 
		 * @param options object A key value pair where the key is the
		 * option value and the value the options text or the settings for the element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		function(options, type) {
			// Options for checkbox and radiobutton lists
			if(type == "checkboxes" || type == "radiobuttons")
			{
				var scoper = this;
				$.each(options, function(value, content) {
					var boxoptions = ((type == "radiobuttons") ? { "type" : "radio" } : { "type" : "checkbox" });
					if(typeof(content) == "string")
						boxoptions["label"] = content;
					else
						$.extend(boxoptions, content);
					$(scoper).formElement(boxoptions);
				});
			}
		});
})(jQuery);