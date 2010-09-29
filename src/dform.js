/*
 * jQuery dform plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * Licensed under the MIT license
 */

/**
 * file: Plugin Documentation
 * 
 * About:
 * The dForm core jQuery plugin, providing helper and the jQuery plugin
 * functions.
 * 
 * Author:
 * David Luecke (daff@neyeon.de)
 */
(function($)
{
	var _subscriptions = {};
	
	/**
	 * section: Global helper functions
	 *
	 * Helper functions that can be used globally and are added to the jQuery object.
	 */
	$.extend($, {
		/**
		 * function: keyset
		 * 
		 * Returns an array of keys (properties) contained in the given object.
		 * 
		 * Parameters:
		 * 	object - The object to use
		 * 
		 * Returns:
		 * 	An array containing all properties in the object
		 */
		keyset : function(object)
		{
			var keys = [];
			$.each(object, function(key, value) {
				keys.push(key);
			});
			return keys;
		},
		/**
		 * function: withKeys
		 * 
		 * Returns an object that contains all values from the given
		 * object that have a key which is also in the array keys.
		 * 
		 * Parameters:
		 * 	object - The object to traverse
		 * 	keys - The keys the new object should contain
		 * 
		 * Returns:
		 * 	A new object containing only the properties
		 * 	with names given in keys
		 */
		withKeys : function(object, keys)
		{
			var result = {};
			$.each(keys, function(index, value) {
				if(object[value]) {
					result[value] = object[value];
				}
			});
			return result;
		},
		/**
		 * function: withoutKeys
		 * 
		 * Returns an object that contains all value from the given
		 * object that do not have a key which is also in the array keys.
		 * 
		 * Parameters:
		 * 	object - The object to traverse
		 * 	keys - A list of keys that should not be contained in the new object
		 * 
		 * Returns:
		 * 	A new object with all properties of the given object, except
		 * 	for the ones given in the list of keys
		 */
		withoutKeys : function(object, keys)
		{
			var result = {};
			$.each(object, function(index, value) {
				if($.inArray(index, keys) == -1) {
					result[index] = value;
				}
			});
			return result;
		}
	});
	
	/**
	 * section: Static helper functions
	 *
	 * Static helpers for the plugin, that can be found in the *$.dform* namespace.
	 */
	$.dform =
	{
		/**
		 * function: htmlAttributes
		 * 
		 * Returns the HTML attributes based on a given object.
		 * The returned object will contain any key value pair
		 * where the key is not the name of a subscriber function
		 * and the key is not in the string array excludes.
		 * 
		 * Parameters:
		 * 	object - The attribute object
		 * 	excludes - A list of keys that should also be excluded
		 * 
		 * Returns:
		 * 	All HTML attributes for the given object
		 */
		htmlAttributes : function(object, excludes)
		{
			// Ignore any subscriber name and the objects given in excludes
			var ignores = $.keyset(_subscriptions);
			if($.isArray(excludes)) {
				$.merge(ignores, excludes);
			}
			return $.withoutKeys(object, ignores);
		},
		/**
		 * function: subscriberNames
		 * 
		 * Returns the names of all subscriber functions registered
		 */
		subscriberNames : function()
		{
			return $.keyset(_subscriptions);
		},
		/**
		 * function: subscribe
		 * 
		 * Register a subscriber function.
		 * 
		 * Parameters:
		 * 	data - Can either be the name of the subscriber
		 * 	function or an object that contains name : subscriber function
		 * 	pairs
		 * 	fn - The function to subscribe or nothing if an object is passed for data
		 */
		subscribe : function(data, fn)
		{
			if (typeof (data) == "string")
			{
				if (!$.isArray(_subscriptions[data])) {
					_subscriptions[data] = [];
				}
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
		 * function: subscribeIf
		 * 
		 * Register a subscriber if a given condition is true.
		 * Use it if you want to subscribe only, if e.g. a required plugin
		 * is installed (pass $.isFunction($.fn.pluginName)).
		 * 
		 * Parameters:
		 * 	condition - The condition under which to subscribe
		 * 	data - Can either be the name of the subscriber
		 * 	function or an object that contains name : subscriber function
		 * 	pairs
		 * 	fn - The function to subscribe or nothing if an object is passed for data
		 * 
		 * See also:
		 * 	<subscribe>
		 */
		subscribeIf : function(condition, data, fn)
		{
			if(condition) {
				$.dform.subscribe(data, fn);
			}
		},
		/**
		 * function: clearSubscription
		 * 
		 * Delete all subscriptions for a given name.
		 * 
		 * Parameters:
		 * 	name - The name of the subscriber to delete 
		 */
		clearSubscription : function(name)
		{
			delete _subscriptions[name];
		},
		/**
		 * function: hasSubscription
		 * 
		 * Returns if a subscriber function with the given name
		 * has been registered.
		 * 
		 * Parameters:
		 * 	name - The subscriber name
		 * 
		 * Returns:
		 * 	True if the given name has at least one subscriber registered,
		 * 	false otherwise
		 */
		hasSubscription : function(name)
		{
			return _subscriptions[name] ? true : false;
		},
		/**
		 * function: createElement
		 * 
		 * Create a new element with a given type from
		 * the registered *[type=typename]* function.
		 * 
		 * Parameters:
		 * 	options - The options to use
		 * 
		 * Returns:
		 * 	The element as created by the builder function specified
		 */
		createElement : function(options)
		{
			var type = options.type;
			if (!type) {
				throw "No element type given! Must always exist.";
			}
			var name = "[type=" + options.type + "]";
			var element = null;
			// We don't need the type key in the options
			var ops = $.withoutKeys(options, "type");
			if (_subscriptions[name])
			{
				// Run all builder functions called [type=<typename>]
				$.each(_subscriptions[name], function(i, sfn) {
					element = sfn.call(element, ops);
				});
			}
			else {
				throw "Element type '" + type + "' does not exist";
			}
			return $(element);
		},
		/**
		 * function: elementBuilder
		 * 
		 * Returns a function that uses the given tag and default values to create
		 * a new element from given options.
		 * 
		 * Parameters:
		 * 	tag - The tag to use
		 * 	defaults - The default options
		 * 
		 * Returns:
		 * 	A new function that takes an options object as a parameter and creates
		 * 	a new element from the given tag, extending the defaults settings for
		 * 	that element with the options given to the returned function.
		 */
		elementBuilder : function(tag, defaults)
		{
			// Currying :)
			return function(options) {
				var ops = $.dform.htmlAttributes(options);
				return $(tag).attr($.extend(ops, defaults));		
			};
		}
	};

	/**
	 * section: JQuery Plugin functions
	 *
	 * Functions that will be used as jQuery plugins.
	 */
	$.fn.extend(
	{
		/**
		 * function: runSubscription
		 * 
		 * Run all subscriptions with the given name and options
		 * on an element.
		 * 
		 * Parameters:
		 * 	name - The name of the subscriber functions
		 * 	options - Options for the function
		 * 	type - The type of the current element (as in
		 * 	the registered types)
		 * 
		 * Returns:
		 * 	The jQuery element this function has been called on
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
		 * function: runAll
		 * 
		 * Run all subscription functions with given options.
		 * 
		 * Parameters:
		 * 	options - The options to use
		 * 
		 * Returns:
		 * 	The jQuery element this function has been called on
		 */
		runAll : function(options)
		{
			var type = options.type;
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
		 * function: formElement
		 * 
		 * Creates a form element on a element with given options
		 * 
		 * Parameters:
		 * 	options - The options to use
		 * 
		 * Returns:
		 * 	The jQuery element this function has been called on
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
		 * function: buildForm
		 * 
		 * Build an entire form, if the current element is a form.
		 * Otherwise the formElement function will be called on the
		 * current element.
		 * 
		 * Parameters:
		 * 	options - The options to use
		 * 
		 * Returns:
		 * 	The jQuery element this function has been called on
		 */
		buildForm : function(options)
		{
			if ($(this).is("form"))
			{
				var ops = $.extend({ "type" : "form" }, options);
				$(this).attr($.dform.htmlAttributes(ops));
				$(this).runAll(ops);
			} else {
				$(this).formElement(options);
			}
		}
	});
})(jQuery);
