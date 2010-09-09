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
	$.dform.subscribe(
	{
		"[type=progressbar]" : function(options)
		{
			// TODO html attributes
			return $("<div>").progressbar(options);
		},
		"[type=slider]" : function(options)
		{
			// TODO div html attributes
			return $("<div>").slider(options);
		},
		"[type=button]" : function(options)
		{
			// TODO jquery ui button
		},
		"[type=tabs]" : function(options)
		{
			// TODO div html attributes
			return $("<div>");
		},
		"[type=accordion]" : function(options)
		{
			// TODO div html attributes
			return $("<div>");
		}
	});

	$.dform.subscribe(
	{
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
		"dialog" : function(options, type)
		{
			if (type == "form" || type == "fieldset")
				$(this).dialog(options);
		},
		"resizable" : function(options, type)
		{
			$(this).resizable(options);
			$(this).resizable("enable");
		},
		"datepicker" : function(options, type)
		{
			if (type == "text")
				$(this).datepicker(options);
		},
		"autocomplete" : function(options, type)
		{
			if (type == "text")
			{
				$(this).autocomplete(options);
			}
		},
		"tabs" : function(options, type)
		{
			if (type == "tabs")
			{
				$(this).append("<ul>");
				var scoper = $(this);
				$.each(options, function(tabname, ops)
				{
					// TODO make some tabs
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