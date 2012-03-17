The jQuery.dForm plugin generates HTML markup from JavaScript objects and [JSON](http://json.org)
with a focus on HTML forms.

__Some things you can do:__

* use JavaScript and JSON instead of HTML markup since your page doesn't run without JS anyway
* naturally generate JavaScript enhanced markup with your own extensions and custom types
* have an easy way to include jQuery UI elements and JavaScript validation (both supported out of the box)
* scaffold forms from business objects of your server side framework

## Get started:

[Download](http://github.com/downloads/daffl/jquery.dform/jquery.dform-0.1.4.tar.gz)
the latest version 0.2.0 (6 Kb minified)

Then try this JavaScript snipped:

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

__Learn more:__

* Check out the JSFiddle examples or the get started page for more examples
* Visit the [jQuery.dForm Google Group](http://groups.google.com/group/jquery-dform)
* Fork the project on [GitHub](http://github.com/daffl/jquery.dform/)
* Follow [@daffl](http://twitter.com/daffl) on Twitter
* Read on in this documentation

## Types

Type Generators are functions that return a new jQuery DOM object for a specific type. If there is no Type Generator
with a given name, a basic HTML element with that tag name will be created. Every other key in the JavaScript or JSON object
you pass will be used as an HTML attribute. An exception is, if there is a Subscriber registered for that ke (more about
this in the next section). A plugin call like this:

	$('#my-div').dform({
		type : "span",
		id : "the-span"
	});

Will append an empty \<span id="the-span"\> tag to the element with the id my-div.
Besides standard HTML tags the following core types are supported:

**container** `{ type : 'container' }`
Creates a \<div\> container (you can also use { type : 'div' })

**text** Creates a text input field

**password**: Creates a password input field

**submit**: Creates a submit button input element

**reset**: Creates a reset button input element

**hidden**: Creates a hidden input element\

**file**: Create a file upload field

**radio**: Creates a radio button

**checkbox**: Creates a checkbox

**radiobuttons**: Creates a group of radiobuttons (uses options subscriber explained below)

**checkboxes**: Creates a group of checkboxes

**number**: Creates an HTML 5 number input field

**url**: Creates an HTML 5 url input field

**tel**: Creates an HTML 5 phone number input field

**email**: Creates an HTML 5 email input field

## Subscribers

Not everything can be solved using a custom type. Adding a class for example doesn't need to be implemented
every time and this is where Subscribers come in. Subscribers are functions that will be called for the key they
have been registered for when traversing the object that has been passed to the plugin.

### Core subscribers

* class:
* html:
* elements:
* value:
* css:
* options:
* caption:
* url:
* type:

### Special subscribers

Currently there are two types of special subscribers

* __\[pre\]__ Functions registered with this name will be called before any processing occurs.
* __\[post\]__ Functions registered with this name will be called after all processing is finished.


### Processing example:

Here is a quick example walkthrough:

	$("#myform").dform({
		"name" : "textfield",
	    "type" : "text",
		"id" : "testid",
		"value" : "Testvalue",
		"caption" : "Label for textfield"
	});

Which will do the following:

* Look for a Type Generator with the name __text__, which creates an input field with the type text
* Add the HTML attributes to the input element that don't have a subscriber registered (which are __name__ and __id__)
* Add the new element to the DOM (append to #myform)
* Run the __type__ subscriber which adds the auto generated class name _ui-dform-text_ to the input field
* Run the __value__ subscriber which sets the value of this form element
* Run the __caption__ subscriber which adds a label before the textfield

## Extend the plugin

## Plugin methods

Default

run
append
attr
ajax

## jQuery UI

## Form plugin

## Validation plugin

## jQuery Globalize

# Changelog

### 0.2.0

* Changed API
* Added deferred loading of subscribers

### 0.1.4

* Merged pull request [#30](https://github.com/daffl/jquery.dform/pull/30): Wrap 'type' as an array so it doesn't break jQuery 1.7.1's $.inArray() when running in IE8
* Added first QUnit tests
* Fixed issue #22 with jQuery UI accordion causing problems with captions
* Removed placeholder plugin. Use HTML 5 placeholders or the jQuery [placeholder plugin](https://github.com/danielstocks/jQuery-Placeholder)
* Updated documentation engine to DocumentJS and build system to StealJS
* Merged pull request [#19](https://github.com/daffl/jquery.dform/pull/19) and [#20](https://github.com/daffl/jquery.dform/pull/20), support to set up a validate options for validate() in "form" type
* Merged pull request [#26](https://github.com/daffl/jquery.dform/pull/26) to support HTML 5 input types
* Added simple getting started example

### 0.1.3

* Created some public [JSFiddles for trying the plugin](http://jsfiddle.net/user/Daff/fiddles)
* Created [jQuery.dForm Google Group](http://groups.google.com/group/jquery-dform)
* Added <form> type, unified <buildForm> usage
* Fixed [issue #14](https://github.com/daffl/jquery.dform/issues/closed#issue/14), setting type attribute properly in IE
* Added <getValueAt>
* Added <i18n> support using the [jQuery globalize](https://github.com/jquery/jquery-global) plugin
* Fixed minor bugs in dform plugins

### 0.1.2

* Added <dformAttr> to add HTML attributes to elements
* Moved <placeholder> into a separate plugin
* Added <reset> button type
* Added dynamic form definition loading by passing a URL to the <buildForm> plugin function
* Added <ajax> subscriber using the <jQuery form plugin at http://jquery.malsup.com/form>
* Added the <defaultType> method to create any HTML element without having to register a type
* Improved build process

### 0.1.1

* Separated type and subscriber functions
* Added types <file>, <container>, <hidden>, <accordion>, <checkboxes> and <radiobuttons>
* Added auto class generation based on element type
* Finished jQuery UI <accordion> and unified with <tabs> usage
* Switched documentation to <Natualdocs at http://naturaldocs.org>
* Added build.xml for generating documentation and minifying JavaScript

### 0.1

* Initial release

# License

Copyright (C) 2012 [David Luecke](daff@neyeon.com), [http://daffl.github.com/jquery.dform]

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