/*
 * jQuery dform plugin
 * Copyright (C) 2011 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * file: Usage
 * 
 * Subscribers are the core concept of the jQuery.dForm.
 * 
 * They are functions, that will be called when traversing the options 
 * passed to the plugin.
 * You can use the already existing subscribers as well as register your own.
 * 
 * The plugin has three different types of subscribers
 * 
 * Types - For creating a new element of the given type.
 * Subscribers - Which will be called when the name they are registered with
 * appears in the options given to the plugin and after the type element has been added to the DOM.
 * Special subscribers - Will be called on special events. 
 * 
 * Currently there are two types of special subscribers
 * * [pre] - Functions registered with this name will be called before any processing occurs.
 * * [post] - Functions registered with this name will be called after all processing is finished.
 * 
 * Example:
 * (start code)
 * $("#myform").buildForm({
 * 		"name" : "textfield",
 * 		"type" : "text",
 *  	"id" : "testid",
 *  	"value" : "Testvalue",
 *  	"caption" : "Label for textfield"
 * });
 * (end)
 *  
 * The above JavaScript snippet will do the following
 * 
 * - Look for a type subscriber called <text>, which creates an input field with the type text or, if
 * there is no matching type call the <defaultType> function which creates a HTML tag of the given type.
 * - Add all attributes as HTML attributes to the input element that don't have a 
 * subscriber registered (which are name and id)
 * - Add the new element to the DOM (append to #myform).
 * - Run the <type> subscriber which adds the auto generated class name ui-dform-text to the input field
 * - Run the <value> subscriber which sets the value of this form element
 * - Run the <caption> subscriber which adds a label before the textfield
 * 
 * Read in the <Extensions> chapter, how you can extend the dForm Plugin with your own
 * types and subscribers.
 * 
 * This page will list the basic <Types> and <Subscribers> that are
 * supported by the plugin as well as examples for using them.
 * 
 * Author:
 * David Luecke (daff@neyeon.de)
 */
(function($)
{
	function _element(tag, excludes)
	{
		// Currying :)
		return function(ops) {
			return $(tag).dformAttr(ops, excludes);
		};
	}
	
	$.dform.addType(
	{
		/**
		 * type: Default types and attributes
		 * 
		 * Default types are handled by the <defaultType> function.
		 * Its standard behaviour allows you to create any
		 * HTML tag with standard attributes (attributes are
		 * any key value pair in the given options, where the
		 * key is not any of the <Subscribers>).
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An input element with type text
		 * 
		 * Example:
		 * Uses the <elements> and <html> subscribers to create
		 * a div with an h2 heading inside.
		 * 
		 * (start code)
		 * {
		 * 		"type" : "div",
		 * 		"id" : "my-div",
		 * 		"class" : "ui-widget-content ui-corner-all",
		 * 		"style" : "padding: 10px",
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"type" : "h2",
		 * 				"html" : "A H2 heading in a div with corners"
		 * 			}
		 * 		]
		 * }
		 * (end)
		 */
		/**
		 * type: container
		 * 
		 * Returns an empty container (div) for general use
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	An empty div
		 * 
		 * Example:
		 * Uses the style property although you should separate your CSS
		 * 
		 * (start code)
		 * {
		 * 		"type" : "container",
		 * 		"html" : "Text in div"
		 * }
		 * (end)
		 */
		container : _element("<div>"),
		/**
		 * type: form
		 * 
		 * Type function that creates a form. If no type is given
		 * for the root element, a form will be created automatically.
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A form element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "form",
		 * 		"action" : "index.php"
		 * }
		 * (end)
		 */
		form : _element('<form>'),
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
		 * Uses the <value> subscriber to set the textfield value
		 * 
		 * (start code)
		 * {
		 * 		"name" : "textfield",
		 * 		"type" : "text",
		 * 		"id" : "my-textfield",
		 * 		"value" : "Hello world"
		 * }
		 * (end)
		 */
		text : _element('<input type="text" />'),
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
		password : _element('<input type="password" />'),
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
		 * Note:
		 * 	This type will be handled by the <defaultType> function.
		 * 
		 * Example:
		 * Uses the <options> subscriber to add options to the select field
		 * 
		 * (start code)
		 * {
		 * 		"type" : "select",
		 * 		"name" : "testselect",
		 *		"options" :
		 *		{
		 *			"red" : "Color red",
		 *			"blue" : "Color blue"
		 *		}
		 * }
		 * (end)
		 */
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
		 * Note:
		 * 	This type will be handled by the <defaultType> function.
		 * 
		 * Example:
		 * Uses the <caption> subscriber to add a legend and the
		 * <elements> subscriber to add a <span> element in the fieldset.
		 * 
		 * 
		 * (start code)
		 * {
		 * 		"type" : "fieldset",
		 * 		"id" : "my-fieldset",
		 * 		"caption" :
		 * 		{
		 * 			"id" : "fieldset-caption",
		 * 			"html" : "Fieldset with elements"
		 * 		},
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"type" : "span",
		 * 				"html" : "Some text in here"
		 * 			}	
		 * 		]
		 * }
		 * (end)
		 */

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
		 * Note:
		 * 	This type will be handled by the <defaultType> function.
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
		submit : _element('<input type="submit" />'),
		/**
		 * type: reset
		 * 
		 * Creates a form reset button
		 * 
		 * Parameters:
		 * 	options - The options this element should be created with
		 * 
		 * Returns:
		 * 	A form reset button
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"action" : "#",
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"type" : "text",
		 * 				"name" : "textfield"
		 * 			},
		 *			{ 		
		 * 				"type" : "reset",
		 * 				"value" : "Reset"
		 * 			}
		 * 		]
		 * }
		 * (end)
		 */
		reset : _element('<input type="reset" />'),
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
		 * Uses the <html> element subscriber to add text to the label
		 *
		 * Note:
		 * 	This type will be handled by the <defaultType> function.
		 * 
		 * (start code)
		 * {
		 * 		"type" : "label",
		 * 		"html" : "Label content"
		 * }
		 * (end)
		 */

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
		 * Uses the <html> subscriber
		 *
		 * Note:
		 * 	This type will be handled by the <defaultType> function.
		 * 
		 * (start code)
		 * {
		 * 		"type" : "button",
		 * 		"html" : "Send..."
		 * }
		 * (end)
		 */
		
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
		hidden : _element('<input type="hidden" />'),
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
		 * Uses the <caption> subscriber to add text to the radiobutton
		 * 
		 * (start code)
		 * {
		 * 		"type" : "radio",
		 * 		"name" : "radioselection",
		 * 		"caption" : "Radiobutton"
		 * }
		 * (end)
		 */
		radio : _element('<input type="radio" />'),
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
		 * Uses the <caption> subscriber to add text to the checkbox
		 * 
		 * (start code)
		 * {
		 * 		"type" : "checkbox",
		 * 		"name" : "checkboxselection",
		 * 		"caption" : "Checkbox"
		 * }
		 * (end)
		 */
		checkbox : _element('<input type="checkbox" />'),
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
		 * Uses the <options> subscriber to add a list of checkboxes
		 * 
		 * (start code)
		 * {
		 * 		"type" : "checkboxes",
		 * 		"name" : "radioselection",
		 * 		"options" :
		 * 		{
		 * 			"red" : "Color red",
		 * 			"blue" : "Color blue"
		 * 		}
		 * }
		 * (end)
		 */
		checkboxes : _element("<div>", ["name"]),
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
		 * Uses the <options> subscriber to add a list of radiobuttons
		 * 
		 * (start code)
		 * {
		 * 		"type" : "radiobuttons",
		 * 		"name" : "radioselection",
		 * 		"options" :
		 * 		{
		 * 			"red" : "Color red",
		 * 			"blue" : "Color blue"
		 * 		}
		 * }
		 * (end)
		 */
		radiobuttons : _element("<div>", ["name"]),
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
		file : _element('<input type="file" />')
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
		 * 		"class" : "ui-corner-all ui-widget"
		 * }
		 * (end)
		 */
		"class" : function(options, type)
		{
			this.addClass(options);
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
			this.html(options);
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
		 * 		"caption" : "Fieldset with elements",
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"name" : "textfield",
		 * 				"type" : "text",
		 * 				"id" : "my-textfield",
		 * 				"caption" : "My textfield"
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
			this.val(options);
		},
		/**
		 * subscriber: options
		 * 
		 * Adds options to select type elements or radio and checkbox list elements.
		 * 
		 * Parameters:
		 * 	options - A key value pair where the key is the
		 * 	option value and the value the options text or the settings for the element.
		 * 	type - The type of the *this* element
		 * 
		 * For types:
		 * 	<select>, <checkboxes>, <radiobuttons>
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
			if (type == "select" || type == "optgroup") // Options for select elements
			{
				// TODO optgroup
				$.each(options, function(value, content)
				{
					var option = { type : 'option' };
					if (typeof (content) == "string") {
						option.value = value;
						option.html = content;
					}
					if (typeof (content) == "object") {
						option = $.extend(option, content);
					}
					$(scoper).formElement(option);
				});
			}
			else if(type == "checkboxes" || type == "radiobuttons")
			{
				// Options for checkbox and radiobutton lists
				var scoper = this;
				$.each(options, function(value, content) {
					var boxoptions = ((type == "radiobuttons") ? { "type" : "radio" } : { "type" : "checkbox" });
					if(typeof(content) == "string")
						boxoptions["caption"] = content;
					else
						$.extend(boxoptions, content);
					boxoptions["value"] = value;
					$(scoper).formElement(boxoptions);
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
		 * 	element created
		 * 	type - The type of the *this* element
		 * 
		 * Example:
		 * (start code)
		 * {
		 * 		"type" : "fieldset",
		 * 		"caption" : "Use of caption",
		 * 		"elements" :
		 * 		[
		 * 			{
		 * 				"name" : "email",
		 * 				"type" : "text",
		 *				"caption" : "Enter your email address"
		 * 			},
		 * 			{
		 * 				"type" : "checkbox",
		 * 				"name" : "mycheckbox",
		 * 				"caption" : "Checkbox caption"
		 * 			}
		 * 		]
		 * }	
		 * (end)
		 */
		caption : function(options, type)
		{
			var ops = {};
			if (typeof (options) == "string")
				ops["html"] = options;
			else
				$.extend(ops, options);
			
			if (type == "fieldset")
			{
				// Labels for fieldsets are legend
				ops.type = "legend";
				var legend = $.dform.createElement(ops);
				this.prepend(legend);
				$(legend).runAll(ops);
			}
			else
			{
				ops.type = "label";
				if (this.attr("id"))
					ops["for"] = this.attr("id");
				var label = $.dform.createElement(ops);
				if (type == "checkbox" || type == "radio") {
					this.parent().append($(label));
				} else {
					$(label).insertBefore($(this));
				}
				$(label).runAll(ops);
			}
		},
		/**
		 * subscriber: type
		 * 
		 * The subscriber for the type parameter.
		 * Although the type parameter is used to get the correct element
		 * type it is just treated as a simple subscriber otherwise.
		 * Since every element needs a type
		 * parameter feel free to add other type subscribers to do
		 * any processing between [pre] and [post].
		 * 
		 * This subscriber adds the auto generated classes according
		 * to the type given.
		 * 
		 * Parameters:
		 * 	options - the name of the type.
		 * 	type - The type of the *this* element
		 */
		type : function(options, type) {
			$.dform.options.prefix && this.addClass($.dform.options.prefix + type);
		},
		/**
		 * Retrieves JSON data from a URL and creates a sub form.
		 * 
		 * @param options
		 * @param type
		 */
		url : function(options, type)
		{
			this.buildForm(options);
		},
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
			if (type == "checkboxes" || type == "radiobuttons")
			{
				var boxtype = ((type == "checkboxes") ? "checkbox" : "radio");
				this.children("[type=" + boxtype + "]").each(function() {
					$(this).attr("name", options.name);
				});
			}
		}
	});
})(jQuery);
