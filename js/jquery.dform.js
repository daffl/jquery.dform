(function($)
{
	var _subscriptions = {};
	
	/**
	 * Create a new element with given tag and default attributes and settings
	 */
	function _create(tag, defaults, options)
	{
		return $($(tag).attr($.extend(defaults, options)));
	}

	$.fb =
	{
		// Subscribe builder functions
		subscribe : function(name, fn)
		{
			if(!_subscriptions[name])
				_subscriptions[name] = new Array();
			_subscriptions[name].push(fn);
		},
		// Core elements
		element :
		{
			/**
			 * Create a new input element with given name and options as
			 * attributes
			 */
			text : function(options)
			{
				return _create("<input>", { type : "text" }, options);
			},
			
			/**
			 * Create a new form element with given options as attributes
			 */
			form : function(options)
			{
				return _create("<form>", { action : window.location, method : "post" }, options);
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
				return _create("<input>", { type : "checkbox" }, options);
			},

			submit : function(options)
			{
				return _create("<input>", { type : "submit" }, options);
			},

			fieldset : function(options)
			{
				// TODO
			}
		}
	};
	
	(function _init()
	{		
		// Initialize core funtions
		$.fb.subscribe("type", function(options) {
			// TODO

		});
		
		$.fb.subscribe("elements", function(options) {
			// TODO create subelements
		});
		
		$.fb.subscribe("legend", function(options) {
			var legend = $("<legend>").html(options);
			return $(this).append(legend);
		});
	})();
	
	$.fn.extend(
	{
		buildForm : function(options)
		{

		},
		// Main form element builder function
		formElement : function(options)
		{
			// Find element options and subscription options
			var ops = {};
			var subsciberOps = {};
			$.each(options, function(key, value) {
				// element not subscribed
				if(!_subscriptions[key] && key != "type")
					ops[key] = value;
				else // put in subscription options
					subsciberOps[key] = value;
			});
			// Get builder function for element and append to this
			var builder = $.fb.element[options["type"]];
			var element = builder(ops);
			$(this).append(element);
			return $(this);
		}
	});

})(jQuery);
