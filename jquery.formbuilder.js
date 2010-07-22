(function($)
{
	var _subscriptions = {};

	/**
	 * Create a new element with given tag and default attributes and settings
	 */
	function _create(tag, defaults, options)
	{
		return jQuery(jQuery(tag).attr(jQuery.extend(defaults, options)));
	}

	$.fb =
	{
		subscribe : function(name, fn)
		{
			if(!_subscriptions[name])
				_subscriptions[name] = new Array();
			_subscriptions[name].push(fn);
		}
	}
	
	function _init()
	{
		// Initialize core funtions
		$.fb.subscribe("type", function() {
			
		});
	}
	
	$.fn.extend(
	{
		buildForm : function(options)
		{

		}
	});

})(jQuery);
