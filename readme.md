The jQuery.dForm plugin generates HTML markup from JavaScript objects and [JSON](http://json.org)
with a focus on HTML forms.

__Some things you can do:__

* naturally generate JavaScript enhanced markup with your own extensions and custom types
* use JavaScript and JSON instead of HTML markup since your page doesn't run without JS anyway
* have an easy way to include jQuery UI elements and other jQuery plugins (some supported out of the box)
* scaffold forms from business objects of your server side framework

## Get started

[Download the latest version 1.1.0](https://raw.github.com/daffl/jquery.dform/master/dist/jquery.dform-1.1.0.js)
([min](https://raw.github.com/daffl/jquery.dform/master/dist/jquery.dform-1.1.0.min.js))
(~7 Kb minified)

Include it in your jQuery powered page and try this:

	<script type="text/javascript">
		$(function() {
		  // Generate a form
			$("#myform").dform({
			    "action" : "index.html",
			    "method" : "get",
			    "html" :
			    [
			        {
			            "type" : "p",
			            "html" : "You must login"
			        },
			        {
			            "name" : "username",
			            "id" : "txt-username",
			            "caption" : "Username",
			            "type" : "text",
			            "placeholder" : "E.g. user@example.com"
			        },
			        {
			            "name" : "password",
			            "caption" : "Password",
			            "type" : "password"
			        },
			        {
			            "type" : "submit",
			            "value" : "Login"
			        }
			    ]
			});
		});
	</script>
	<form id="myform"></form>

Or to quickly load an external form definition:

	<script type="text/javascript">
		$(function() {
		  // Load the form object from path/to/form.json
			$("#myform").dform('path/to/form.json', function(data) {
			  this //-> Generated $('#myform')
			  data //-> data from path/to/form.json
			});
		});
	</script>
	<form id="myform"></form>


__Demo:__

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/Daff/Zt4Rz/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

__Learn more:__

* Visit the above example [on jsfiddle.com](http://jsfiddle.net/Daff/Zt4Rz/)
* Watch and fork the project on [GitHub](http://github.com/daffl/jquery.dform/)
* Follow [@daffl](http://twitter.com/daffl) on Twitter
* Read on in this documentation

## Types

Type generators are functions that return a new jQuery DOM object for a specific type. If there is no type generator
for that type, a basic HTML tag with that name will be created. Every other key in the JavaScript object
you pass (the dForm object) will be used as an HTML attribute, except if there is a [subscriber](#subscribers)
registered for that key. A plugin call like this:

	$('#my-div').dform({
		type : "span",
		id : "the-span"
	});

Will append an empty `<span id="the-span"></span>` to the selected element.

### Core types

Besides standard HTML tags the following core types are supported:

**container** `{ "type" : "container" }`<br />
Creates a `<div>` container (you can also use `{ "type" : "div" }`)

**text** `{ "type" : "text" }`<br />
Creates a text input field

**password** `{ "type" : "password" }`<br />
Creates a password input field

**submit** `{ "type" : "submit" }`<br />
Creates a submit button input element

**reset** `{ "type" : "reset" }`<br />
Creates a reset button input element

**hidden** `{ "type" : "hidden" }`<br />
Creates a hidden input element

**file** `{ "type" : "file" }`<br />
Create a file upload field

**radio** `{ "type" : "radio" }`<br />
Creates a radio button

**checkbox** `{ "type" : "checkbox" }`<br />
Creates a checkbox

**radiobuttons** `{ "type" : "radiobuttons" }`<br />
Creates a group of radiobuttons (uses *options* subscriber explained below)

**checkboxes** `{ "type" : "checkboxes" }`<br />
Creates a group of checkboxes (uses *options* subscriber explained below)

**number** `{ "type" : "number" }`<br />
Creates an HTML 5 number input field

**url** `{ "type" : "url" }`<br />
Creates an HTML 5 url input field

**tel** `{ "type" : "tel" }`<br />
Creates an HTML 5 phone number input field

**email** `{ "type" : "email" }`<br />
Creates an HTML 5 email input field

### Add your own

You can add your own types by calling  `$.dform.addType` and pass the type name and a function
that takes the dForm object as a parameter and returns a new jQuery DOM element:

	$.dform.addType("hellobutton", function(options) {
		// Return a new button element that has all options that
		// don't have a registered subscriber as attributes
		return $("<button>").dform('attr', options).html("Say hello");
	});

The type generator uses the *attr* [plugin method](#plugin-methods) to add the proper HTML attributes to the button.
Now the new type can be used like this:

	$('#myform').dform({
		"type" : "hellobutton",
		"id" : "my-button"
	});

Which generates:

	<button id="my-button" class="ui-dform-hellobutton">Say hello</button>

Type generators can be chained. That means, that if you add a type that already exists `this` in the generator function
will refer to the element returned by its previous generator:

	$.dform.addType("text", function(options) {
		return $(this).addClass('my-textfield-class');
	});

	$('#myform').dform({
		type : 'text'
	});

Now generates

	<input type="text" class="ui-dform-text my-textfield-class" />

## Subscribers

While type generators are being used to generate a base element for the given type, subscribers attach to
certain attributes in the dForm object. When traversing the object, all subscribers registered for that
key will be executed on the current element.

### Core subscribers

**class** *{String}*<br />
Adds a class to the current element (instead of setting the attribute) using [.addClass()](http://api.jquery.com/addClass).

	{
		"type" : "div",
		"class" : "the-div container"
	}

Generates:

	<div class="ui-dform-div the-div container"></div>

**html/elements** *{String|Array|Object}*<br />
Based on the options it either sets the HTML string content of the current element or appends one or an array
of dForm objects. The *elements* subscriber does the same but is kept for backwards compatibility.

	{
        "type" : "div",
        "html" : "Div content"
    }

Generates:

	<div class="ui-dform-div">Div content</div>

This subscriber can also be used to create nested objects by using one or an array of dForm objects:

	{
		"type" : "div",
		"html" :
		[
			{
				"type" : "text"
			},
			{
				"type" : "div",
				"html" : {
					"type" : "p",
					"html" : "A paragraph"
				}
			}
		]
	}

Generates:

	<div class="ui-dform-div">
		<input type="text" class="ui-dform-text" />
		<div class="ui-dform-div">
			<p class="ui-dform-p">A paragraph</p>
		</div>
	</div>

**value** *{String|Function}*<br />
Sets the value of the element using [.val()](http://api.jquery.com/val/)

	{
		"type" : "text",
		"value" : "Text content"
	}

Generates:

	<input type="text" value="Text content" />

**css** {Object}<br />
Sets CSS properties on an element using [.css()](http://api.jquery.com/css/):

	{
		"type" : "div",
		"css" : {
			"background-color" : "#FF0000",
			"display" : "none"
		}
	}

Generates:

	<div class="ui-dform-div" style="background-color: #FF0000; display: none;"></div>

**options** *{Object}*<br />
Generates a list of options from a value to text (or dForm Object) mapping for elements of type *select*:

	{
		"type" : "select",
		"options" : {
			"us" : "USA",
			"ca" : "Canada",
			"de" : {
				"selected" : "selected",
				"html" : "Germany"
			}
		}
	}

Generates:

	<select>
		<option value="us">USA</option>
		<option value="ca">Canada</option>
		<option value="de" selected="selected">Germany</option>
	</select>
	
*radiobuttons* and *checkboxes* work similarly:

	{
		"type" : "select",
		"options" : {
			"us" : "USA",
			"ca" : {
				"checked" : "checked",
				"caption" : "Canada"
			},
			"de" : "Germany"
		}
	}
	
To use option groups just pass an object of type *optgroup*:

	{
		"type" : "select",
		"options" : {
		  "northamerica" : {
		    "type" : "optgroup",
		    "label" : "North America",
		    "options" : {
          "us" : "USA",
          "ca" : "Canada"
		    }
		  },
		  "europe" : {
		    "type" : "optgroup",
		    "label" : "Europe",
		    "options" : {
		      "de" : {
            "selected" : "selected",
            "html" : "Germany"
          },
          "fr" : "France"
		    }
		  }
		}
	}

You can also use options on *checkboxes* and *radiobuttons* which will create a list of *checkbox*
or *radio* elements:

	{
		"type" : "checkboxes",
		"options" : {
			"newsletter" : "Receive the newsletter",
			"terms" : "I read the terms of service",
			"update" : "Keep me up to date on new events"
		}
	}

Generates:

	<div class="ui-dform-checkboxes">
		<input type="checkbox" class="ui-dform-checkbox" value="newsletter">
		<label class="ui-dform-label">Receive the newsletter</label>
		<input type="checkbox" class="ui-dform-checkbox" value="terms">
		<label class="ui-dform-label">I read the terms of service</label>
		<input type="checkbox" class="ui-dform-checkbox" value="update">
		<label class="ui-dform-label">Keep me up to date on new events</label>
	</div>

> *Note:* The Google Chrome JavaScript engine V8 orders object keys that can be cast to numbers by their value and
> not by the order of their definition.

**caption** *{String|Object}*<br />
Adds a caption to the element. The type used depends on the element type:

* A *legend* on *fieldset* elements
* A *label* next to *radio* or *checkbox* elements
* A *label* before any other element

If the element has its id set, the *for* attribute of the label will be set as well.

	{
		"type" : "text",
		"name" : "username",
		"id" : "username",
		"caption" : "Enter your username"
	}

Generates:

	<label for="username" class="ui-dform-label">Enter your username</label>
	<input type="text" class="ui-dform-text" id="username" />

For fieldsets:

	{
		"type" : "fieldset",
		"caption" : "Address"
	}

Generates:

	<fieldset class="ui-dform-fieldset">
		<legend type="ui-dform-legend">Address</label>
	</fieldset>

**url** *{String|Object}*<br />
The `url` subscriber issues a `$(element).dform('ajax', options)` request to load content from remote files.

	{
		"type" : "div",
		"url": "form.json"
	}

**type** *{String}*<br />
Besides looking up the correct Type Generator it also adds a dform specific class to the element using
`$.dform.options.prefix` (*ui-dform-* by default) and the type name.

	{
		"type" : "text"
	}

Generates:

	<input type="text" class="ui-dform-text" />

Set `$.dform.options.prefix = null;` if you don't want any classes being added.

### Add your own

It is easy to add your own subscribers. Similar to a type generator you just pass the key name you want to subscribe
to and a function that takes the options and the type name as a parameter to `$.dform.subscribe`. `this` in the
subscriber function will refer to the current element. That way it is possible to add an alert to the
*hellobutton* example created in the [types section](#subscribers/add-your-own):

	$.dform.subscribe("alert", function(options, type) {
		// Just run if the type is a hellobutton
		if(type === "hellobutton") {
			this.click(function() {
				alert(options);
			});
		}
	});

And then you can use the plugin like this:

	$("#mydiv").dform({
		"type" : "hellobutton",
		"alert" : "Hello world!"
	});

Which generates:

	<button class="ui-dform-hellobutton">Say Hello</button>

And alerts "Hello world!" when the button is clicked. Like type generators, subscribers will also be chained.
You can therefore add multiple subscribers with the same name adding behaviour or reacting to different types.

### Special subscribers

Currently there are two types of special subscribers:

**\[pre\]** *{Object}*<br />
Functions registered with this name will be called before any processing occurs and get the original options passed.

**\[post\]** *{Object}*<br />
Functions registered with this name will be called after all processing is finished and also get the original
options passed.

## Plugin

### jQuery plugin methods

The __dform__ plugin function follows the jQuery plugin convention of taking an options object or a
method name as the first parameter to call different methods:

**$(form).dform(options \[, converter\])** *{Object}* *{String}*<br />
Append the dForm object to each selected element. If the element is of the same type (e.g. if you are appending
a `type : 'form'` on a `<form>`) or if no type has been given run the subscribers and
add the attributes on the current element. Optionally use a converter with a given name.

**$(form).dform(url \[, success\], \[, error\])** *{String}* *{Function}* *{Function}*<br />
Load a JSON form definition using GET from a given URL and execute a success handler when it returns
or an error handler if the request faiuls. The handler gets the data passed and has `this` refer to the form element.

**$(form).dform('run', options)** *{Object}*<br />
Run all subscribers from a given dForm object on the selected element(s).

**$(form).dform('run', name, options, type)** *{String}* *{Mixed}* *{String}*<br />
Run a subscriber with a given name and options on the selected element(s) using a specific type.
Usually used internally.

**$(form).dform('append', options \[, converter\])** *{Object}* *{String}*<br />
Append a dForm element to each selected element. Optionally using a converter with the
given name.

**$(form).dform('attr', options)** *{Object}*<br />
Set each attribute from the options object that doesn't have a corresponding subscriber registered.

**$(form).dform('ajax', params \[, success\] \[, error\])** *{Object|String}* *{Function}* *{Function}*<br />
Load a form definition using Ajax. The params take the same options as a
[jQuery Ajax](http://api.jquery.com/jQuery.ajax/) call.

### Static functions

**$.keySet(object)** *{Object}*<br />
Return an array of the objects keys.

**$.withKeys(object, keys)** *{Object}* *{Array}*<br />
Returns a new object that contains all values from the given
object that have a key which is also in the array keys.

**$.withoutKeys(object, keys)** *{Object}* *{Array}*<br />
Returns a new object that contains all value from the given
object that do not have a key which is also in the array keys.

**$.dform.options**<br />
Static options for generating a form. Currently only `$.dform.options.prefix`
is being used.

**$.dform.defaultType(options)** *{Object}*<br />
A type generator that will be used when no other registered type has been found.
The standard generator creates an HTML element according to the type given:

	{
		"type" : "a",
		"href" : "http://daffl.github.com/jquery.dform",
		"html" : "Visit the plugin homepage"
	}

Generates:

	<a class="ui-dform-a" href="http://daffl.github.com/jquery.dform">Visit the plugin homepage</a>

**$.dform.types(\[name\])** *{String}*<br />
Returns all type generators for a given type name. If no name is given, a map of type names
to an array of generator functions will be returned.

**$.dform.addType(name, generator \[, condition\])** *{String}* *{Function}* *{Boolean}*<br />
Add a new type with a given name and generator function which takes the options as the parameter
and returns a new element. Optionally pass a condition which will add the type only if it is true.

**$.dform.subscribe(name, subscriber \[, condition\])** *{String}* *{Function}* *{Boolean}*<br />
Add a new subscriber function for a given name that takes the value and type name as the parameter and will have
`this` set to the current element. Optionally pass as condition which will add the subscriber only if it is true.

**$.dform.subscribers(\[name\])**<br />
Returns all subscribers for a given name. If no name is given, an object containing all subscribers will
be returned.

**$.dform.hasSubscription(name)** *{String}*<br />
Returns if there is at least one subscriber registered with the given name.

**$.dform.createElement(options)** *{Object}*<br />
Returns a new element either using a registered type generator or the default type generator.

## jQuery UI

jQuery.dForm automatically adds support for whichever jQuery UI plugin is available.
If the form has the *ui-widget* class the plugin will automatically turn buttons into jQuery UI buttons and add
corners to *text*, *textarea*, *password* and *fieldset* elements.

> Note: jQuery UI has to be loaded __before__ the dForm plugin.

### Types

Most jQuery UI widgets have an appropriate type generator implemented. Besides normal HTML attributes,
each take the same options as described in [the jQuery UI documentation](http://jqueryui.com/demos/).

**progressbar** `{ "type" : "progressbar" }`<br />
Creates a progressbar. Use the options as described in the
[jQuery UI progressbar documentation](http://jqueryui.com/demos/progressbar/).

	{
		"type" : "progressbar",
		"value" : "20"
	}

**slider** `{ "type" : "slider" }`<br />
Creates a [slider element](http://jqueryui.com/demos/slider/).

	{
		"type" : "slider",
		"step" : 5,
		"value" : 25
	}

**accordion** `{ "type" : "accordion" }`<br />
Creates a container for a jQueryUI accordion. Use the *entries* subscriber to add elements.
You can use any [jQueryUI accordion option](http://jqueryui.com/demos/accordion/) in the definition.
The caption in each entries element will be used as the accordion heading:

    {
      "type" : "accordion",
      "animated" : "bounceslide",
      "entries" : [
        {
          "caption" : "First entry",
          "html" : "Content 1"
        },
        {
          "caption" : "Second entry",
          "html" : "Content 2"
        }
      ]
    }

**tabs** `{ "type" : "tabs" }`<br />
Creates a container for a set of jQuery UI tabs. Use the *entries* subscriber to add elements.
You can use any [jQueryUI tabs option](http://jqueryui.com/demos/tabs/) in the definition.
The caption in each entries element will be used as the tab heading. You can either pass an array
of entries and set the *id* attribute individually or an object which will use the key name as the id:

    {
      "type" : "tabs",
      "entries" : [
        {
          "caption" : "Tab 1",
          "id" : "first",
          "html" : "Content 1"
        },
        {
          "caption" : "Tab 2",
          "id" : "second",
          "html" : "Content 2"
        }
      ]
    }

Which is equivalent to:

    {
      "type" : "tabs",
      "entries" : {
        "first": {
          "caption" : "Tab 1",
          "html" : "Content 1"
        },
        "second" : {
          "caption" : "Tab 2",
          "html" : "Content 2"
        }
      }
    }

### Subscribers

Some other features have been implemented as subscribers:

**entries** *{Object}*<br />
Add entries to an *accordion* or *tabs* element. See the accordion and tabs type documentation for examples.

**dialog** *{Object}*<br />
Turns the current element into a jQueryUI dialog. Pass the [jQueryUI dialog options](http://jqueryui.com/demos/dialog/)
or an empty object for the defaults.

**resizable** *{Object}*<br />
Makes the current element resizable. Pass the [jQueryUI resizable options](http://jqueryui.com/demos/resizable/)
or an empty object for the defaults.

**datepicker** *{Object}*<br />
Adds a datepicker to a text element. Pass the [jQueryUI datepicker options](http://jqueryui.com/demos/datepicker/)
or an empty object for the defaults:

    {
      "type" : "text",
      "datepicker" : {
        "minDate" : "+1"
      }
    }

**autocomplete** *{Object}*<br />
Adds autocomplete functionality to a text element. Pass the [jQueryUI autocomplete options](http://jqueryui.com/demos/autocomplete/).

## Other plugins

### Form validation

jQuery.dForm adds a **validate** subscriber if the [jQuery Form Validation](http://bassistance.de/jquery-plugins/jquery-plugin-validation/)
plugin is available. The options passed are added as [validation rulesets](http://docs.jquery.com/Plugins/Validation/rules#.22add.22rules)
to the element:

	{
		"type" : "text",
		"validate" : {
			"required" : true,
			"minlength" : 2,
			"messages" : {
				"required" : "Required input",
			}
		}
	}

If the form has the *ui-widget* class the jQuery UI CSS error classes will be used to highlight fields.

### jQuery Globalize

[jQuery.Globalize](https://github.com/jquery/globalize) adds internationalization to JavaScript.
If available, the *html* and *options* subscribers will be enabled to use internationalized strings and option lists.
For example with Globalize configured like this:

    Globalize.culture('de');
		Globalize.addCultureInfo( "de", {
      messages: {
        "stuff" : {
          "hello" : "Hallo Welt",
          "options" : {
            "de" : "Deutschland",
            "ca" : "Kanada",
            "fr" : "Frankreich"
          }
        }
      }
    });

You can create an internationalized form like this:

    {
      "type" : "div",
      "html" : "stuff.hello"
    }

Which generates:

    <div class="ui-dform-div">Hallo Welt</div>

And an options list like:

    {
      "type" : "select",
      "options" : "stuff.options"
    }

Generates:

    <select class="ui-dform-select">
      <option value="de">Deutschland</option>
      <option value="ca">Kanada</option>
      <option value="fr">Frankreich</option>
    </select>

## Changelog

__1.1.0__

* Added `url` subscriber ([#22](https://github.com/daffl/jquery.dform/issues/22))
* Better Ajax support ([#35](https://github.com/daffl/jquery.dform/issues/35))
* Added dist files to GitHub pages for better CDN support
* Registered bower package: `bower install jquery.dform`

__1.0.1__

* Updated and fixed documentation
* Added [jQuery plugin](http://plugins.jquery.com) deploy information
* Moved away from GitHub downloads
* Verified jQuery 1.9.0 compatibility

__1.0.0__

* Improved documentation using DocumentUp
* QUnit test suite
* Major API improvements

__0.1.4__

* Merged pull request [#30](https://github.com/daffl/jquery.dform/pull/30):
Wrap 'type' as an array so it doesn't break jQuery 1.7.1's $.inArray() when running in IE8
* Added first QUnit tests
* Fixed issue #22 with jQuery UI accordion causing problems with captions
* Removed placeholder plugin. Use HTML 5 placeholders or the jQuery
[placeholder plugin](https://github.com/danielstocks/jQuery-Placeholder)
* Updated documentation engine to DocumentJS and build system to StealJS
* Merged pull request [#19](https://github.com/daffl/jquery.dform/pull/19) and
[#20](https://github.com/daffl/jquery.dform/pull/20),
support to set up a validate options for validate() in "form" type
* Merged pull request [#26](https://github.com/daffl/jquery.dform/pull/26) to support HTML 5 input types
* Added simple getting started example

__0.1.3__

* Created some public [JSFiddles for trying the plugin](http://jsfiddle.net/user/Daff/fiddles)
* Added *form* type, unified *buildForm* usage
* Fixed [issue #14](https://github.com/daffl/jquery.dform/issues/closed#issue/14), setting type attribute properly in IE
* Added *getValueAt*
* Added *i18n* support using the [jQuery globalize](https://github.com/jquery/jquery-global) plugin
* Fixed minor bugs in dform plugins

__0.1.2__

* Added *dformAttr* to add HTML attributes to elements
* Moved *placeholder* into a separate plugin
* Added *reset* button type
* Added dynamic form definition loading by passing a URL to the *buildForm* plugin function
* Added *ajax* subscriber using the *jQuery form plugin at http://jquery.malsup.com/form*
* Added the *defaultType* method to create any HTML element without having to register a type
* Improved build process

__0.1.1__

* Separated type and subscriber functions
* Added types *file*, *container*, *hidden*, *accordion*, *checkboxes* and *radiobuttons*
* Added auto class generation based on element type
* Finished jQuery UI *accordion* and unified with *tabs* usage
* Switched documentation to *Natualdocs at http://naturaldocs.org*
* Added build.xml for generating documentation and minifying JavaScript

__0.1__

* Initial release

## License

Copyright (C) 2013 [David Luecke](http://daffl.github.com), [http://daffl.github.com/jquery.dform]

The MIT license:

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![Build Status](https://secure.travis-ci.org/daffl/jquery.dform.png)](http://travis-ci.org/daffl/jquery.dform)
