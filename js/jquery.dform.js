(function($)
{
	var _subscriptions = {};

	$.fb =
	{
		// Subscribe builder functions
		subscribe : function(name, fn)
		{
			if(!_subscriptions[name])
				_subscriptions[name] = new Array();
			_subscriptions[name].push(fn);
		},
		// Clear all subscriptions for name
		clear : function(name)
		{
			delete _subscriptions[name];
		},
		hasSubscription : function(name)
		{
			return _subscriptions[name] ? true : false;
		}
	};
	
	$.fn.extend(
	{
		buildForm : function(options)
		{

		},
		// Main form element builder function
		formElement : function(options)
		{
			// Initial element is the jQuery function element
			var element = $(this);
			// Run type builder function first
			var type = options["type"];
			var name = "[type=" +  options["type"] + "]";
			delete options["type"];
			if(_subscriptions[name])
			{
				$.each(_subscriptions[name], function(i, sfn) {
					element = sfn.call(element, options);
				});
				
				// Run subscription functions
				$.each(options, function(name, options) {
					if($.fb.hasSubscription(name))
					{
						$.each(_subscriptions[name], function(i, sfn) {
							// run subscriber function with options
							sfn.call(element, options, type);
						});
					}
				});
			}
			else
				throw "Element type '" + type + "' does not exist";
			return $(this);
		}
	});
})(jQuery);