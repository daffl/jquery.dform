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
 * Initializes basic element type subscribers and core subscriber functions.
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	/**
	 * Create a new element with given tag and default attributes and settings.
	 * Use only options that have no subscriptions. Append to parent if given.
	 */
	function _create(tag, defaults, options)
	{
		var ops = $.dform.htmlAttributes(options);
		return $($(tag).attr($.extend(defaults, ops)));
	}

	// Type subscriber functions
	$.dform.subscribe(
	{
		/**
		 * Type function that creates a text input field
		 * @param options object All parameters for this type
		 */
		"[type=text]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "text"
			}, options);
		},
		/**
		 * Type function that creates a password input field
		 * @param options object All parameters for this type
		 */
		"[type=password]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "password"
			}, options);
		},
		/**
		 * Type function that creates a select input (without options)
		 * @param options object All parameters for this type
		 */
		"[type=select]" : function(options)
		{
			return _create("<select>",
			{}, options);
		},
		/**
		 * Type function that creates a fieldset
		 * @param options object All parameters for this type
		 */
		"[type=fieldset]" : function(options)
		{
			return _create("<fieldset>",
			{}, options);
		},
		/**
		 * Type function that creates a textarea
		 * @param options object All parameters for this type
		 */
		"[type=textarea]" : function(options)
		{
			return _create("<textarea>",
			{}, options);
		},
		/**
		 * Type function that creates a submit button
		 * @param options object All parameters for this type
		 */
		"[type=submit]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "submit"
			}, options);
		},
		/**
		 * Type function that creates a single radio button
		 * @param options object All parameters for this type
		 */
		"[type=radio]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "radio"
			}, options);
		},
		/**
		 * Type function that creates a single radio checkbox
		 * @param options object All parameters for this type
		 */
		"[type=checkbox]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "checkbox"
			}, options);
		},
		/**
		 * Type function that creates a label (without text)
		 * @param options object All parameters for this type
		 */
		"[type=label]" : function(options)
		{
			return _create("<label>",
			{}, options);
		},
		/**
		 * Type function that returns a span element
		 * @param options object All parameters for this type
		 */
		"[type=html]" : function(options)
		{
			return _create("<span>",
			{}, options);
		},
		/**
		 * Returns a button element.
		 * @param options object All parameters for this type
		 */
		"[type=button]" : function(options)
		{
			return _create("<button>", {}, options);
		}
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
		 * Sets html content on the current element
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
		 * option value and the value the options text
		 * @param type string The type of the <strong>this</strong> element
		 */
		"options" : function(options, type)
		{
			if (type == "select")
			{
				var scoper = $(this);
				$.each(options, function(value, content)
				{
					var option;
					if (typeof (content) == "string")
						option = $("<option>").attr("value", value).html(
								content);
					if (typeof (content) == "object")
						option = _create("<option>", {}, content).html(content["value"]);
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
		"hint" : function(options, type)
		{
			if (type == "text")
			{
				var key = "hint";
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
		 * if the current element is a fieldset.
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
				var labelops =
				{
					"type" : "label"
				};
				if (typeof (options) == "string")
					labelops["html"] = options;
				else
					$.extend(labelops, options);
	
				if ($(this).attr("name") != "" && $(this).attr("id") == ""
						&& ($(this).is("input") || $(this).is("textarea")))
				{
					var id = "dform-" + type + "-" + $(this).attr("name");
					$(this).attr("id", id);
				}
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
		 * An empty subscriber for type so that it doesn't show up as
		 * an attribute in HTML elements. Since every element needs a type
		 * parameter feel free to add other type subscribers to do
		 * processing between [pre] and [post]
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
		}
	});

	// TODO implement radiolist and checkboxlist
})(jQuery);