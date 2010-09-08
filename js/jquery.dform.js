(function($)
{
	var _subscriptions =
	{};

	$.dform =
	{
		// Get all only options that have no subscription
		getOptions : function(options)
		{
			var ops =
			{};
			$.each(options, function(name, value)
			{
				// Add options only if no subscription exists
					if (!$.dform.hasSubscription(name))
						ops[name] = value;
				});
			return ops;
		},
		// Subscribe builder functions
		subscribe : function(data, fn)
		{
			if (typeof (data) == "string")
			{
				if (!_subscriptions[data])
					_subscriptions[data] = new Array();
				_subscriptions[data].push(fn);
			} else if (typeof (data) == "object")
			{
				$.each(data, function(name, fn)
				{
					$.dform.subscribe(name, fn);
				});
			}
		},
		// Clear all subscriptions for name
		clearSubscription : function(name)
		{
			delete _subscriptions[name];
		},
		hasSubscription : function(name)
		{
			return _subscriptions[name] ? true : false;
		},
		runSubscription : function(name, element, options, type)
		{
			if ($.dform.hasSubscription(name))
			{
				$.each(_subscriptions[name], function(i, sfn)
				{
					// run subscriber function with options
						sfn.call(element, options, type);
					});
			}
		},
		// Run element created by type builder function
		createElement : function(options)
		{
			var type = options["type"];
			var name = "[type=" + options["type"] + "]";
			var element = null;
			var ops =
			{};
			$.extend(ops, options);
			delete ops["type"];
			if (!type)
				throw "No element type given! Must always exist.";
			if (_subscriptions[name])
			{
				// Run all builder functions called [type=<typename>]
		$.each(_subscriptions[name], function(i, sfn)
		{
			element = sfn.call(element, ops);
		});
	} else
		throw "Element type '" + type + "' does not exist";
	return $(element);
}
	};

	$.fn.extend(
	{
		// Run a subscribed function on an element
		runSubscription : function(name, options, type)
		{
			$.dform.runSubscription(name, $(this), options, type);
			return $(this);
		},
		// Run all subscription functions with given options
		runAll : function(options)
		{
			var type = options["type"];
			var scoper = $(this);
			$.each(options, function(name, sopts)
			{
				// TODO each loop for list of dom elements
					if (name != "type")
						$(scoper).runSubscription(name, sopts, type);
				});
			// Run post processing functions
			$(this).runSubscription("type", options, type);
			return $(this);
		},
		// Form element builder function
		formElement : function(options)
		{
			// Create element (run builder function for type)
			var element = $.dform.createElement(options);
			$(this).append($(element));
			// Run all subscriptions
			$(element).runAll(options);
			return $(this);
		},
		// Build an entire form
		buildForm : function(options)
		{
			if ($(this).is("form"))
			{
				var ops = $.extend(
				{}, options);
				ops.type = "form";
				$(this).attr($.dform.getOptions(options));
				$(this).runAll(ops);
			} else
				$(this).formElement(options);
		}
	});
})(jQuery);