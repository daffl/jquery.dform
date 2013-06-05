/*
 * jQuery dform plugin
 * Copyright (C) 2012 David Luecke <daff@neyeon.com>, [http://daffl.github.com/jquery.dform]
 *
 * Licensed under the MIT license
 */
(function ($) {
	var each = $.each,
		_element = function (tag, excludes) {
			return function (ops) {
				return $(tag).dform('attr', ops, excludes);
			};
		},
		_html = function (options, type) {
			var self = this;
			if ($.isPlainObject(options)) {
				self.dform('append', options);
			} else if ($.isArray(options)) {
				each(options, function (index, nested) {
					self.dform('append', nested);
				});
			} else {
				self.html(options);
			}
		};

	$.dform.addType({
		container : _element("<div>"),
		text : _element('<input type="text" />'),
		password : _element('<input type="password" />'),
		submit : _element('<input type="submit" />'),
		reset : _element('<input type="reset" />'),
		hidden : _element('<input type="hidden" />'),
		radio : _element('<input type="radio" />'),
		checkbox : _element('<input type="checkbox" />'),
		file : _element('<input type="file" />'),
		number : _element('<input type="number" />'),
		url : _element('<input type="url" />'),
		tel : _element('<input type="tel" />'),
		email : _element('<input type="email" />'),
		checkboxes : _element("<div>", ["name"]),
		radiobuttons : _element("<div>", ["name"])
	});

	$.dform.subscribe({
		/**
		 * Adds a class to the current element.
		 * Ovverrides the default behaviour which would be replacing the class attribute.
		 *
		 * @param options A list of whitespace separated classnames
		 * @param type The type of the *this* element
		 */
		"class" : function (options, type) {
			this.addClass(options);
		},

		/**
		 * Sets html content of the current element
		 *
		 * @param options The html content to set as a string
		 * @param type The type of the *this* element
		 */
		"html" : _html,

		/**
		 * Recursively appends subelements to the current form element.
		 *
		 * @param options Either an object with key value pairs
		 *	 where the key is the element name and the value the
		 *	 subelement options or an array of objects where each object
		 *	 is the options for a subelement
		 * @param type The type of the *this* element
		 */
		"elements" : _html,

		/**
		 * Sets the value of the current element.
		 *
		 * @param options The value to set
		 * @param type The type of the *this* element
		 */
		"value" : function (options) {
			this.val(options);
		},

		/**
		 * Set CSS styles for the current element
		 *
		 * @param options The Styles to set
		 * @param type The type of the *this* element
		 */
		"css" : function (options) {
			this.css(options);
		},

		/**
		 * Adds options to select type elements or radio and checkbox list elements.
		 *
		 * @param options A key value pair where the key is the
		 *	 option value and the value the options text or the settings for the element.
		 * @param type The type of the *this* element
		 */
		"options" : function (options, type) {
			var self = this;
			// Options for select elements
			if ((type === "select" || type === "optgroup") && typeof options !== 'string')
			{
				each(options, function (value, content) {
					var option = { type : 'option', value : value };
					if (typeof (content) === "string") {
						option.html = content;
					}
					if (typeof (content) === "object") {
						option = $.extend(option, content);
					}
					self.dform('append', option);
				});
			}
			else if (type === "checkboxes" || type === "radiobuttons") {
				// Options for checkbox and radiobutton lists
				each(options, function (value, content) {
					var boxoptions = ((type === "radiobuttons") ? { "type" : "radio" } : { "type" : "checkbox" });
					if (typeof(content) === "string") {
						boxoptions["caption"] = content;
					} else {
						$.extend(boxoptions, content);
					}
					boxoptions["value"] = value;
					self.dform('append', boxoptions);
				});
			}
		},

		/**
		 * Adds caption to elements.
		 *
		 * Depending on the element type the following elements will
		 * be used:
		 * - A legend for <fieldset> elements
		 * - A <label> next to <radio> or <checkbox> elements
		 * - A <label> before any other element
		 *
		 * @param options A string for the caption or the options for the
		 * @param type The type of the *this* element
		 */
		"caption" : function (options, type) {
			var ops = {};
			if (typeof (options) === "string") {
				ops["html"] = options;
			} else {
				$.extend(ops, options);
			}

			if (type == "fieldset") {
				// Labels for fieldsets are legend
				ops.type = "legend";
				this.dform('append', ops);
			} else {
				ops.type = "label";
				if (this.attr("id")) {
					ops["for"] = this.attr("id");
				}
				var label = $($.dform.createElement(ops));
				if (type === "checkbox" || type === "radio") {
					this.parent().append($(label));
				} else {
					label.insertBefore(this);
				}
				label.dform('run', ops);
			}
		},

		/**
		 * The subscriber for the type parameter.
		 * Although the type parameter is used to get the correct element
		 * type it is just treated as a simple subscriber otherwise.
		 * Since every element needs a type
		 * parameter feel free to add other type subscribers to do
		 * any processing between [pre] and [post].
		 *
		 * This subscriber adds the auto generated classes according
		 * to the type prefix in $.dform.options.prefix.
		 *
		 * @param options The name of the type
		 * @param type The type of the *this* element
		 */
		"type" : function (options, type) {
			if ($.dform.options.prefix) {
				this.addClass($.dform.options.prefix + type);
			}
		},
		/**
		 * Retrieves JSON data from a URL and creates a sub form.
		 *
		 * @param options
		 * @param type
		 */
		"url" : function (options) {
			this.dform('ajax', options);
		},
		/**
		 * Post processing function, that will run whenever all other subscribers are finished.
		 *
		 * @param options All options that have been used for
		 * @param type The type of the *this* element
		 */
		"[post]" : function (options, type) {
			if (type === "checkboxes" || type === "radiobuttons") {
				var boxtype = ((type === "checkboxes") ? "checkbox" : "radio");
				this.children("[type=" + boxtype + "]").each(function () {
					$(this).attr("name", options.name);
				});
			}
		}
	});
})(jQuery);
