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
	$.dform.subscribe("type", function(options, type)
	{
		// TODO add jQuery UI classes
			if (type == "button" || type == "submit")
				$(this).button();
			if (type == "text" || type == "textarea" || type == "password"
					|| type == "fieldset")
				$(this).addClass("ui-widget-content ui-corner-all");
		});

	$.dform.subscribe("dialog", function(options, type)
	{
		if (type == "form" || type == "fieldset")
			$(this).dialog(options);
	});

	$.dform.subscribe("datepicker", function(options, type)
	{
		if (type == "text")
			$(this).datepicker(options);
	});

	$.dform.subscribe("[type=progressbar]", function(options)
	{
		// TODO html attributes
			return $("<div>").progressbar(options);
		});

	$.dform.subscribe("[type=autocomplete]", function(options)
	{
		// TODO
		});

	$.dform.subscribe("[type=slider]", function(options)
	{
		// TODO div html attributes
			return $("<div>").slider(options);
		});

	$.dform.subscribe("[type=button]", function(options)
	{
		// TODO jquery ui button
		});

	$.dform.subscribe("[type=tabs]", function(options)
	{
		// TODO div html attributes
			return $("<div>");
		});
	
	$.dform.subscribe("tabs", function(options, type)
	{
		if (type == "tabs")
		{
			$(this).append("<ul>");
			var scoper = $(this);
			$.each(options, function(tabname, options)
			{
				// TODO make some tabs
					var tablink = $("<a>").attr(
					{
						"href" : "#" + tabname
					}).html(options.title);
					var li = $("<li>").append(tablink);
					var tabdiv = $("<div>").attr("id", tabname).html(
							"tab " + tabname);
					$(scoper).children("ul").first().append(li);
					$(scoper).append(tabdiv);
				});
		}
		$(this).tabs();
	});
	
	$.dform.subscribe("[type=accordion]", function(options)
	{
		// TODO div html attributes
		return $("<div>");
		});
})(jQuery);