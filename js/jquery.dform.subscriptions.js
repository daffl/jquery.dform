/*
 * jQuery dynamic form plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
(function($)
{
	/**
	 * Create a new element with given tag and default attributes and settings.
	 * Use only options that have no subscriptions. Append to parent if given.
	 */
	function _create(tag, defaults, options)
	{
		var ops = $.dform.getOptions(options);
		return $($(tag).attr($.extend(defaults, ops)));
	}

	// Builder functions

	$.dform.subscribe(
	{
		"[type=text]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "text"
			}, options);
		},

		"[type=password]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "password"
			}, options);
		},

		"[type=form]" : function(options)
		{
			return _create("<form>",
			{
				action : window.location,
				method : "post"
			}, options);
		},

		"[type=select]" : function(options)
		{
			return _create("<select>",
			{}, options);
		},

		"[type=fieldset]" : function(options)
		{
			return _create("<fieldset>",
			{}, options);
		},

		"[type=textarea]" : function(options)
		{
			return _create("<textarea>",
			{}, options);
		},

		"[type=submit]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "submit"
			}, options);
		},

		"[type=radio]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "radio"
			}, options);
		},

		"[type=checkbox]" : function(options)
		{
			return _create("<input>",
			{
				"type" : "checkbox"
			}, options);
		},

		"[type=label]" : function(options)
		{
			return _create("<label>",
			{}, options);
		},

		"[type=html]" : function(options)
		{
			return _create("<span>",
			{}, options);
		}
	});

	// Subscriber functions

	$.dform.subscribe(
	{
		"class" : function(options, type)
		{
			// Add class instead of overwriting class attribute
			$(this).addClass(options);
		},

		"html" : function(options, type)
		{
			$(this).html(options);
		},

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

		"value" : function(options, type)
		{
			$(this).val(options);
		},

		"options" : function(options, type)
		{
			if (type == "select")
			{
				// TODO optimize this
				var scoper = $(this);
				$.each(options, function(value, content)
				{
					var option;
					if (typeof (content) == "string")
					{
						option = $("<option>").attr("value", value).html(
								content);
					}
					if (typeof (content) == "object")
					{
						option = $("<option>").attr("selected",
								content["selected"]).html(content["value"]);
					}
					$(scoper).append(option);
				});
			}
		},

		"hint" : function(options, type)
		{
			if (type == "text")
			{
				var key = "hint";
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
			}
		},

		"label" : function(options, type)
		{
			// TODO maybe derive ID from name
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
		},

		"legend" : function(options, type)
		{
			if (type == "fieldset")
			{
				var legend = $("<legend>").html(options);
				$(this).prepend(legend);
			}
		}
	});

	/*
	 * $.dform.subscribe("[type=radiolist]", function(options) { // TODO list of
	 * radiobuttons });
	 * 
	 * $.dform.subscribe("[type=checkboxlist]", function(options) { // TODO wrap
	 * in fieldset var scoper = $(this); $.each(options["entries"],
	 * function(index, entry) { var cbops = { "type" : "checkbox" };
	 * $.extend(cbops, entry, options); delete cbops["entries"];
	 * $(scoper).formElement(cbops); }); return $(this); });
	 */

	$.dform.subscribe("type", function(options, type)
	{
		if (type == "submit")
			$(this).wrap("<p>");
	});
})(jQuery);