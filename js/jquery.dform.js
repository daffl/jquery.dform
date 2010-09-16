/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
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
	 * Returns the keyset from a given object.
	 * @param object The object to use
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
	 * object that have a key which is also in the array keys.
	 * @param object The object to traverse
	 * @param keys The keys the new object should contain
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
	 * object that do not have a key which is also in the array keys.
	 * @param object The object to traverse
	 * @param keys A list of keys that should not be contained in the
	 * new object
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
		/**
		 * Returns the HTML attributes based on a given object.
		 * The returned object will contain any key value pair
		 * where the key is not the name of a subscriber function
		 * and the key is not in the string array excludes.
		 * @param object The attribute object
		 * @param excludes A list of keys that should also be excluded
		 */
		htmlAttributes : function(object, excludes)
		{
			// Ignore any subscriber name and the objects given in excludes
			var ignores = $.keyset(_subscriptions);
			if($.isArray(excludes))
				$.merge(ignores, excludes);
			// TODO return $.withoutKeys(object, ignores);
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
		 * Register a subscriber function.
		 * @param data Can either be the name of the subscriber
		 * function or an object that contains name : subscriber function
		 * pairs
		 * @param fn The function to subscribe
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
		/**
		 * Register a subscriber if a given condition is true.
		 * Use it if you want to subscribe only, if e.g. a required plugin
		 * is installed (pass $.isFunction($.fn.pluginName)).
		 * @param condition The condition
		 * @param data Can either be the name of the subscriber
		 * function or an object that contains name : subscriber function
		 * pairs
		 * @param fn The function to subscribe
		 */
		subscribeIf : function(condition, data, fn)
		{
			if(condition)
				$.dform.subscribe(data, fn);
		},
		/**
		 * Delete all subscriptions for a given name.
		 * @param name The name of the subscriber to delete 
		 */
		clearSubscription : function(name)
		{
			delete _subscriptions[name];
		},
		/**
		 * Returns if a subscriber function with the given name
		 * has been registered.
		 * @param name The subscriber name
		 */
		hasSubscription : function(name)
		{
			return _subscriptions[name] ? true : false;
		},
		/**
		 * Create a new element with a given type from
		 * the registered [type=typename] function.
		 * @param The options to use
		 */
		createElement : function(options)
		{
			var type = options["type"];
			if (!type) throw "No element type given! Must always exist.";
			var name = "[type=" + options["type"] + "]";
			var element = null;
			// We don't need the type key in the options
			var ops = $.withoutKeys(options, ["type"]);
			if (_subscriptions[name])
			{
				// Run all builder functions called [type=<typename>]
				$.each(_subscriptions[name], function(i, sfn) {
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
		/**
		 * Run all subscriptions with the given name and options
		 * on an element
		 * @param name The name of the subscriber functions
		 * @param options Options for the function
		 * @param The type of the current element (as in
		 * the registered types)
		 */
		runSubscription : function(name, options, type)
		{
			var element = $(this);
			if ($.dform.hasSubscription(name))
			{
				$.each(_subscriptions[name], function(i, sfn) {
					// run subscriber function with options
					sfn.call(element, options, type);
				});
			}
			return $(this);
		},
		/**
		 * Run all subscription functions with given options
		 * @param options The options to use
		 */
		runAll : function(options)
		{
			var type = options["type"];
			var scoper = $(this);
			// Run preprocessing subscribers
			$(this).runSubscription("[pre]", options, type);
			$.each(options, function(name, sopts) {
				// TODO each loop for list of dom elements
				$(scoper).runSubscription(name, sopts, type);
			});
			// Run post processing subscribers
			$(this).runSubscription("[post]", options, type);
			return $(this);
		},
		/**
		 * Creates a form element on a element with given options
		 * @param options The options to use
		 */
		formElement : function(options)
		{
			// Create element (run builder function for type)
			var element = $.dform.createElement(options);
			$(this).append($(element));
			// Run all subscriptions
			$(element).runAll(options);
			return $(this);
		},
		/**
		 * Build an entire form, if the current element is a form.
		 * Otherwise the formElement function will be called on the
		 * current element.
		 * @param The options to use
		 */
		buildForm : function(options)
		{
			if ($(this).is("form"))
			{
				var ops = $.extend({ "type" : "form" }, options);
				$(this).attr($.dform.htmlAttributes(ops));
				$(this).runAll(ops);
			} else
				$(this).formElement(options);
		}
	});
})(jQuery);