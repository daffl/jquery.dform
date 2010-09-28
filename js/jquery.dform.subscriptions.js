/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * file: Core Subscribers
 * 
 * About:
 * Initializes basic element types and core subscriber functions.
 * 
 * Author:
 * David Luecke (daff@neyeon.de)
 */
(function($)
{
	$.dform.subscribe(
	{
		/**
		 * type: text
		 * 
		 * Type function that creates a text input field
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An input element with type text
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"name" : "textfield",
		 * 		"type" : "text",
		 * 		"id" : "my-textfield"
		 * }
		 * (end)
		 */
		"[type=text]" : $.dform.elementBuilder("<input>", { "type" : "text" }),
		/**
		 * type: password
		 * 
		 * Type function that creates a password input field
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An input element with type password
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"name" : "password",
		 * 		"type" : "password"
		 * }
		 * (end)
		 */
		"[type=password]" : $.dform.elementBuilder("<input>", { "type" : "password" }),
		/**
		 * type: select
		 * 
		 * Creates a select input element
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty select input
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "select",
		 * 		"name" : "testselect"
		 * }
		 * (end)
		 */
		"[type=select]" : $.dform.elementBuilder("<select>", {}),
		/**
		 * type: fieldset
		 * 
		 * Creates an empty fieldset to contain other elements
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty fieldset
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "fieldset",
		 * 		"id" : "my-fieldset"
		 * }
		 * (end)
		 */
		"[type=fieldset]" : $.dform.elementBuilder("<fieldset>", {}),
		/**
		 * type: textarea
		 * 
		 * Creates a textarea
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A textarea input element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "textarea",
		 * 		"cols" : 30,
		 * 		"rows" : 10
		 * }
		 * (end)
		 */
		"[type=textarea]" : $.dform.elementBuilder("<textarea>", {}),
		/**
		 * type: submit
		 * 
		 * Creates a form submit button
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A form submit button
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "submit",
		 * 		"value" : "Send..."
		 * }
		 * (end)
		 */
		"[type=submit]" : $.dform.elementBuilder("<input>", { "type" : "submit" }),
		/**
		 * type: label
		 * 
		 * Creates an empty label element
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty label element
		 * 
		 * Example:
		 * In this example the label will be filled with text by using the
		 * <html> element subscriber
		 * 
		 * (start code)
		 * {
		 * 		"type" : "label",
		 * 		"html" : "Label content"
		 * }
		 * (end)
		 */
		"[type=label]" : $.dform.elementBuilder("<label>", {}),
		/**
		 * type: span
		 * 
		 * Returns an empty span element
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty span HTML element
		 * 
		 * Example:
		 * In this example the span element will be filled with text by using the
		 * <html> element subscriber
		 * 
		 * (start code)
		 * {
		 * 		"type" : "span",
		 * 		"html" : "Some simple HTML text"
		 * }
		 * (end)
		 */
		"[type=span]" : $.dform.elementBuilder("<span>", {}),
		/**
		 * type: button
		 * 
		 * Creates a button element
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A button element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "button",
		 * 		"html" : "Send..."
		 * }
		 * (end)
		 */
		"[type=button]" : $.dform.elementBuilder("<button>", {}),
		/**
		 * type: hidden
		 * 
		 * Creates a hidden input field
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A hidden input field element
		 * 
		 * Example:
		 * This example uses the <value> subscriber to set a value to the
		 * field.
		 * 
		 * (start code)
		 * {
		 * 		"type" : "hidden",
		 * 		"value" : "hiddenvalue"
		 * }
		 * (end)
		 */
		"[type=hidden]" : $.dform.elementBuilder("<input>", { "type" : "hidden" }),
		/**
		 * type: radio
		 * 
		 * Creates a single radio button
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A single radio input element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "radio",
		 * 		"name" : "radioselection"
		 * }
		 * (end)
		 */
		"[type=radio]" : $.dform.elementBuilder("<input>", { "type" : "radio" }),
		/**
		 * type: checkbox
		 * 
		 * Creates a single checkbox
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A single checkbox input element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "checkbox",
		 * 		"name" : "checkboxselection"
		 * }
		 * (end)
		 */
		"[type=checkbox]" : $.dform.elementBuilder("<input>", { "type" : "checkbox" }),
		/**
		 * type: checkboxes
		 * 
		 * Returns an empty container for a checkbox list
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty div to contain checkbox lists
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "checkboxes",
		 * 		"name" : "checkboxselection"
		 * }
		 * (end)
		 */
		"[type=checkboxes]" : $.dform.elementBuilder("<div>", {}),
		/**
		 * type: radiobuttons
		 * 
		 * Returns an empty container for a radiobutton list
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty div to contain radiobutton lists
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "radiobuttons",
		 * 		"name" : "radioselection"
		 * }
		 * (end)
		 */
		"[type=radiobuttons]" : $.dform.elementBuilder("<div>", {}),
		/**
		 * type: file
		 * 
		 * Returns a file upload input element
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A file upload element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "file",
		 * 		"name" : "upload"
		 * }
		 * (end)
		 */
		"[type=file]" : $.dform.elementBuilder("<input>", { "type" : "file" })
	});

	$.dform.subscribe(
	{
		/**
		 * subscriber: class
		 * 
		 * Adds a class to the current element.
		 * 
		 * Ovverrides the default behaviour which would be replacing the class attribute.
		 * 
		 * Parameters:
		 * 	options - A list of whitespace separated classnames
		 * 	type - The type of the *this* element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "text",
		 * 		"class" : "ui-corner-all"
		 * }
		 * (end)
		 */
		"class" : function(options, type)
		{
			$(this).addClass(options);
		},
		/**
		 * subscriber: html
		 * 
		 * Sets html content of the current element
		 * 
		 * Parameters:
		 * 	options - The html content to set as a string
		 * 	type - The type of the *this* element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "span",
		 * 		"html" : "Some html content"
		 * }
		 * (end)
		 */
		html : function(options, type)
		{
			$(this).html(options);
		},
		/**
		 * subscriber: elements
		 * 
		 * Recursively appends subelements to the current form element.
		 * 
		 * Parameters:
		 * 	options - Either an object with key value pairs
		 * 	where the key is the element name and the value the
		 * 	subelement options or an array of objects where each object
		 * 	is the options for a subelement
		 * 	type - The type of the *this* element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "fieldset",
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"name" : "textfield",
		 * 				"type" : "text",
		 * 				"id" : "my-textfield"
		 * 			}	
		 * 		]
		 * }
		 * (end)
		 */
		elements : function(options, type)
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
		 * subscriber: value
		 * 
		 * Sets the value of the current element.
		 * 
		 * Parameters:
		 * 	options - string The value to set
		 * 	type - string The type of the *this* element
		 * 
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"name" : "textfield",
		 * 		"type" : "text",
		 *		"value" : "Value in Textfield"
		 * }	
		 * (end)
		 */
		value : function(options, type)
		{
			$(this).val(options);
		},
		/**
		 * subscriber: options
		 * 
		 * Adds options to select type elements.
		 * 
		 * Parameters:
		 * 	options - A key value pair where the key is the
		 * 	option value and the value the options text or the settings for the element.
		 * 	type - The type of the *this* element
		 * 
		 * For types:
		 * 	<select>
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "select",
		 * 		"name" : "testselect",
		 *		"options" :
		 *		{
		 *			"option1" : "Option no. 1",
		 *			"option2" : "Option no. 2"
		 *		}
		 * }	
		 * (end)
		 * 
		 * Todo:
		 * 	Option groups
		 */
		options : function(options, type)
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
						var fn = $.dform.elementBuilder("<option>", {});
						option = fn($.withoutKeys(content, ["value"])).html(content["value"]);
					}
					$(scoper).append(option);
				});
			}
		},
		/**
		 * subscriber: placeholder
		 * 
		 * Adds a default default value to text elements.
		 * 
		 * The default value will dissappear
		 * when the element gets focussed and reappears if the element looses
		 * focus and nothing has been entered.
		 * 
		 * Parameters:
		 * 	options - The default value to set. Usually a helper text
		 * 	with instructions for the user (e.g. enter mail here...)
		 * 	type - The type of the *this* element
		 * 
		 * For types:
		 * 	<text>, <textarea>
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"name" : "email",
		 * 		"type" : "text",
		 *		"placeholder" : "e.g. mail@example.org"
		 * }	
		 * (end)
		 */
		placeholder : function(options, type)
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
		 * subscriber: caption
		 * 
		 * Adds caption to elements.
		 * 
		 * Depending on the element type the following elements will
		 * be used: 
		 * - A legend for <fieldset> elements
		 * - A <label> next to <radio> or <checkbox> elements
		 * - A <label> before any other element
		 * 
		 * Parameters:
		 * 	options - A string for the caption or the options for the
		 * 	element to create
		 * 	type - The type of the *this* element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"name" : "email",
		 * 		"type" : "text",
		 *		"caption" : "Enter your email address"
		 * }	
		 * (end)
		 */
		caption : function(options, type)
		{
			// TODO make sure that options other than string
			// will be handled properly
			if (type == "fieldset")
			{
				// Labels for fieldsets are legend
				var legend = $("<legend>").html(options);
				$(this).prepend(legend);
			}
			else if(type == "checkboxes" || type == "radiobuttons")
			{
				// Options for checkbox and radiobutton lists
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
		 * subscriber: type
		 * 
		 * An empty subscriber for types so that it doesn't show up as
		 * an attribute in HTML elements. Since every element needs a type
		 * parameter feel free to add other type subscribers to do
		 * any processing between [pre] and [post]
		 * 
		 * Parameters:
		 * 	options - the name of the type.
		 * 	type - The type of the *this* element
		 */
		type : function(options, type) {},
		/**
		 * subscriber: [post]
		 * 
		 * Post processing function, that will run whenever all other subscribers are finished.
		 * 
		 * Parameters:
		 * 	options - mixed All options that have been used for 
		 * 	creating the current element.
		 * 	type - The type of the *this* element
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
})(jQuery);