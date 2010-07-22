(function()
{
	/**
	 * Create a new element with given tag and default attributes and settings
	 */
	var _create = function(tag, defaults, options)
	{
		return jQuery(jQuery(tag).attr(jQuery.extend(defaults, options)));
	};

	/**
	 * Build by a given builder function.
	 * 
	 * @param parent
	 *            The parent element
	 * @param def
	 *            The definition object
	 * @param defaults
	 *            The default values for the definition object
	 * @param subscriptions
	 *            Associative array of subscriptions on the definition object
	 * @param buildFunc
	 *            The builder function
	 */
	var _build = function(parent, options, defaults, buildFunc)
	{
		var settings = jQuery.extend(defaults, options);
		var scoper = this;
		var attributes = jQuery.arrayIntersect(settings, jQuery.formBuilder.subscriptions);
		// call builder function with attributes
		var element = buildFunc(attributes, parent);
		// get all subscriptions
		var subscribed = jQuery.arrayBoth(jQuery.formBuilder.subscriptions, settings);
		jQuery.each(subscribed, function(key, func)
		{
			if (jQuery.isFunction(func))
			{
				var result = func(element, settings[key]);
				if (result)
					element = result;
			}
		});
	}

	jQuery.popKey = function(array, key)
	{
		if (!array[key])
			return false;
		var result = array[key];
		delete array[key];
		return result;
	};

	/**
	 * Returns all key values of source, where the key doesn't exist in
	 * intersect
	 */
	jQuery.arrayIntersect = function(source, intersect)
	{
		var result = {};
		jQuery.each(source, function(key, value)
		{
			if (!intersect[key]) // if not in intersect take in result
					result[key] = source[key];
			});
		return result;
	};

	/**
	 * Returns the key values of source where the keys also exist in object
	 * second.
	 */
	jQuery.arrayBoth = function(source, second)
	{
		var result = {};
		jQuery.each(source, function(key, value)
		{
			if (second[key]) // if in intersect take in result
					result[key] = source[key];
			});
		return result;
	};

	jQuery.formBuilder =
	{
		element :
		{
			/**
			 * Create a new input element with given name and options as
			 * attributes
			 */
			text : function(options)
			{
				return _create("<input>",
				{
					type : "text"
				}, options);
			},

			/**
			 * Create a new form element with given options as attributes
			 */
			form : function(options)
			{
				return _create("<form>",
				{
					action : window.location,
					method : "post"
				}, options);
			},

			/**
			 * Create a new select form element with given select items as key
			 * value pairs.
			 */
			select : function(options)
			{
				return _create("<select>", {}, options);
			},

			radio : function(options)
			{
			},

			checkbox : function(options)
			{
				return _create("<input>",
				{
					type : "checkbox"
				}, options);
			},

			submit : function(options)
			{
			},

			fieldset : function(options)
			{
			},

			label : function(text, element, options)
			{
				if (!options)
					options = {};
				if (element && jQuery(element).attr("id") && !options["for"])
					options["for"] = jQuery(element).attr("id");
				return _create("<label>", {}, options).text(text);
			}
		},

		subscriptions :
		{
			decorators : function(form, settings)
			{
				$(form).data("decorators", settings);
				// Return the appended element because it alters the form
				return $(form).append(settings.main).children(":first");
			},

			elements : function(form, settings)
			{
				jQuery.each(settings, function(name, options)
				{
					_build(form, options,
					{
						"name" : name,
						"type" : "text"
					}, function(attributes, parent)
					{
						var type = jQuery.popKey(attributes, "type");
						var element = jQuery.formBuilder.element[type](attributes);
						jQuery(parent).append(element);
						return element;
					});
				});
			},

			/**
			 * Create a label for element
			 */
			label : function(element, text)
			{
				var label = jQuery.formBuilder.element.label(text, element, {});
				// Get decorators
				var decorators = $(element).parents("form").data("decorators");
				if(decorators.label)
					label = $(label).wrap(decorators.label).parent();
				jQuery(element).before(label);
				if(decorators.element)
					$(element).wrap(decorators.element);
			},

			/**
			 * Creates select element options from settings and appends to
			 * element.
			 */
			select_values : function(element, settings)
			{
				jQuery.each(settings, function(key, val)
				{
					var option = _create("<option>",
					{
						"value" : key
					}).text(val);
					jQuery(element).append(option);
				});
			}
		}
	};

	jQuery.fn.extend(
	{
		buildForm : function(options)
		{
			_build($(this), options, {}, function(attributes, parent)
			{
				var form = jQuery.formBuilder.element.form(attributes);
				jQuery(parent).append(form);
				return form;
			});
			return $(this);
		}
	});
})(jQuery);