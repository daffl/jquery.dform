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

/**
 * Initializes element type subscribers and subscriber functions
 * provided by the jQuery UI framework adding jQuery UI support.
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	$.dform.subscribe(
	{
		/**
		 * Returns a progressbar jQuery UI progressbar.
		 * @param options object All parameters for this type
		 */
		"[type=progressbar]" : function(options)
		{
			// TODO html attributes
			return $("<div>").progressbar(options);
		},
		/**
		 * Returns a slider.
		 * @param options object All parameters for this type
		 */
		"[type=slider]" : function(options)
		{
			var slideroptions = [ "disabled", "animate", "max", "min", "orientation",
				  "range", "step", "value", "values" ];
			// TODO div html attributes
			return $("<div>").slider(options);
		},
		/**
		 * Returns a styled button.
		 * @param options object All parameters for this type
		 */
		"[type=button]" : function(options)
		{
			// TODO jquery ui button
		},
		/**
		 * Creates a container for jQuery UI tabs.
		 * @param options object All parameters for this type
		 */
		"[type=tabs]" : function(options)
		{
			// TODO div html attributes
			return $("<div>");
		},
		/**
		 * Creates a container for the jQuery UI accordion.
		 * @param options object All parameters for this type
		 */
		"[type=accordion]" : function(options)
		{
			// TODO div html attributes
			return $("<div>");
		}
	});

	$.dform.subscribe(
	{
		/**
		 * Type post processing subscriber that adds jQuery UI styling classes to
		 * "text", "textarea", "password" and "fieldset" elements as well
		 * as calling .button() on submit buttons.
		 * 
		 * @param options mixed All options that have been used for 
		 * creating the current element.
		 * @param type string The type of the <strong>this</strong> element
		 */
		"type" : function(options, type)
		{
			if ($(this).parents("form").hasClass("ui-widget"))
			{
				if (type == "button" || type == "submit")
					$(this).button();
				if ($.inArray(type, [ "text", "textarea", "password",
						"fieldset" ]) != -1)
					$(this).addClass("ui-widget-content ui-corner-all");
			}
		},
		/**
		 * Creates a dialog on form elements.
		 * 
		 * @param options object Options for creating the jQuery UI dialog
		 * @param type string The type of the <strong>this</strong> element
		 */
		"dialog" : function(options, type)
		{
			if (type == "form" || type == "fieldset")
				$(this).dialog(options);
		},
		/**
		 * Makes the current element resizeable.
		 * 
		 * @param options object Options for creating a jQuery UI resizable
		 * @param type string The type of the <strong>this</strong> element
		 */
		"resizable" : function(options, type)
		{
			$(this).resizable(options);
			$(this).resizable("enable");
		},
		/**
		 * Turns a text element into a datepicker
		 * 
		 * @param options object Options for creating a jQuery UI datepicker
		 * @param type string The type of the <strong>this</strong> element
		 */
		"datepicker" : function(options, type)
		{
			if (type == "text")
				$(this).datepicker(options);
		},
		/**
		 * Adds an autocomplete feature to a text element.
		 * 
		 * @param options object Options for creating a jQuery UI autocomplete
		 * @param type string The type of the <strong>this</strong> element
		 */
		"autocomplete" : function(options, type)
		{
			if (type == "text")
			{
				$(this).autocomplete(options);
			}
		},
		/**
		 * Adds an autocomplete feature to a text element.
		 * 
		 * @param options object An object containing a tabs unique id as a key
		 * and the tab options including an "elements" containing the tabs
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
					ops.type == type;
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
})(jQuery);