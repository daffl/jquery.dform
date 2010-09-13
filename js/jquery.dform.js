/*
 * jQuery dynamic form plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * The MIT license
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * The dForm core jQuery plugin, providing helper and the jQuery plugin
 * functions.
 * 
 * @author David Luecke <daff@neyeon.de>
 */
(function($)
{
	var _subscriptions = {};

	/**
	 * Returns the keyset from a given object
	 */
	$.keyset = function(object)
	{
		var keys = [];
		$.each(object, function(key, value) {
			keys.push(key);
		});
		return keys;
	};

	/**
	 * Returns an object that contains all values from the given
	 * object that have a key which is also in the array keys
	 */
	$.withKeys = function(object, keys)
	{
		var result = {};
		$.each(keys, function(index, value) {
			if(object[value])
				result[value] = object[value];
		});
		return result;
	};
	
	/**
	 * Returns an object that contains all value from the given
	 * object that do not have a key which is also in the array keys
	 */
	$.withoutKeys = function(object, keys)
	{
		var result = {};
		$.each(object, function(index, value) {
			if($.inArray(index, keys) == -1)
				result[index] = value;
		});
		return result;
	};
	
	$.dform =
	{
		htmlAttributes : function(object, excludes)
		{
			// Ignore any subscriber name and the objects given in excludes
			var ignores = $.keyset(_subscriptions);
			if($.isArray(excludes))
				$.merge(ignores, excludes);
			var ops = {};
			$.each(object, function(name, value)
			{
				if ($.inArray(name, ignores) == -1)
					ops[name] = value;
			});
			return ops;
		},
		/**
		 * Returns the names of all subscriber functions registered
		 */
		subscriberNames : function()
		{
			return $.keyset(_subscriptions);
		},
		/**
		 * Register a subscriber
		 */
		subscribe : function(data, fn)
		{
			if (typeof (data) == "string")
			{
				if (!$.isArray(_subscriptions[data]))
					_subscriptions[data] = [];
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
			if (!type) throw "No element type given! Must always exist.";
			var name = "[type=" + options["type"] + "]";
			var element = null;
			var ops = $.withoutKeys(options, ["type"]);
			if (_subscriptions[name])
			{
				// Run all builder functions called [type=<typename>]
				$.each(_subscriptions[name], function(i, sfn)
				{
					element = sfn.call(element, ops);
				});
			}
			else
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
			// Run preprocessing subscribers
			$(this).runSubscription("[pre]", options, type);
			$.each(options, function(name, sopts)
			{
				// TODO each loop for list of dom elements
				if (name != "[pre]" && name != "[post]")
					$(scoper).runSubscription(name, sopts, type);
			});
			// Run post processing subscribers
			$(this).runSubscription("[post]", options, type);
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
				$(this).attr($.dform.htmlAttributes(options));
				$(this).runAll(ops);
			} else
				$(this).formElement(options);
		}
	});
})(jQuery);