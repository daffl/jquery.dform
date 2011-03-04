/*
 * jQuery dform plugin
 * Copyright (C) 2011 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * 
 */
(function($)
{
	$.dform.options.converters =
	{
		"json" :
		{
			"types" :
			{
				"boolean" :
				{
					"type" : "checkbox"
				},
				"integer" :
				{
					"type" : "text",
					"validate" : "int"
				}
			}
		}
	};

	$.dform.converters =
	{
		"dform" : function(data)
		{
			return data;
		},

		"json" : function(data)
		{
			var converters = $.dform.options.converters.json.types;
			var getElements = function(obj)
			{
				var result = [];
				$.each(data, function(key, value)
				{
					var instance = typeof (value);
					var element;
					if (instance == 'object')
					{
						element =
						{
							'type' : 'fieldset',
							'caption' : key
						};
						// element.elements = getElements(value);
					} else
					{
						var baseElement = converters[instance] || { 'type' : 'text' };
						element = $.extend(baseElement, { 'caption' : key, 'name' : key, 'value' : value });
					}
					result.push(element);
				});
				return result;
			};
			return {
				"type" : "form",
				"elements" : getElements(data)
			};
		},

		"json-schema" : function(data)
		{
			var dform =
			{
				elements : []
			};

			for ( var propName in schema.properties)
			{
				var property = schema.properties[propName];
				var type = property.type;
				if (type == "string")
				{
					var value = obj[propName];
					if (!value)
						value = "";
					var element =
					{
						"name" : "ui-form-" + propName,
						"id" : "ui-form-" + propName,
						"caption" : property.title,
						"type" : "text",
						"value" : value
					};
					dform.elements.push(element);
					dform.elements.push(
					{
						"type" : "br"
					});
				} else if (type == "object")
				{
					var element = jsonSchemaToDForm(property, obj);
					element.type = "fieldset";
					element.caption = property.title;
					dform.elements.push(element);
				}
			}
			return dform;
		}
	};
})(jQuery);
