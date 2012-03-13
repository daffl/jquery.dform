The jQuery.dForm plugin allows you to create your HTML forms programmatically as JavaScript objects or
as [JSON](http://json.org). Let the browser do the work and generate JavaScript enhanced forms without hassle. 

### You should try this plugin if you want to

* write JavaScript instead of HTML markup since your page doesn't run without JS anyway
* manage all your form related jQuery plugins in a unified way
* have an easy way to include jQuery UI elements and JavaScript validation
* scaffold forms from business objects of your server side framework

## Get started:

All examples are hosted on [JSFiddle](http://jsfiddle.net). Feel free to play around, fork and comment:

<iframe style="width: 90%; height: 450px" src="http://jsfiddle.net/Daff/yREkc/embedded/js,html,result" 
	allowfullscreen="allowfullscreen" frameborder="0">
</iframe>

## How to get it:

[Download](http://github.com/downloads/daffl/jquery.dform/jquery.dform-0.1.4.tar.gz) the latest package (0.1.4(

Clone the current master on [GitHub](http://github.com/daffl/jquery.dform/)


## How to get involved:

* Visit the [jQuery.dForm Google Group](http://groups.google.com/group/jquery-dform)
* Fork the project on [GitHub](http://github.com/daffl/jZquery.dform/)
* Follow [@daffl](http://twitter.com/daffl) on Twitter




# Types

# Subscribers

 * Subscribers are the core concept of the jQuery.dForm.
 *
 * They are functions, that will be called when traversing the options
 * passed to the plugin.
 * You can use the already existing subscribers as well as register your own.
 *
 * The plugin has three different types of subscribers
 *
 * Types - For creating a new element of the given type.
 * Subscribers - Which will be called when the name they are registered with
 * appears in the options given to the plugin and after the type element has been added to the DOM.
 * Special subscribers - Will be called on special events.
 *
 * Currently there are two types of special subscribers
 * * [pre] - Functions registered with this name will be called before any processing occurs.
 * * [post] - Functions registered with this name will be called after all processing is finished.
 *
 * Example:
 * (start code)
 * $("#myform").buildForm({
 *		 "name" : "textfield",
 *		 "type" : "text",
 *	  "id" : "testid",
 *	  "value" : "Testvalue",
 *	  "caption" : "Label for textfield"
 * });
 * (end)
 *
 * The above JavaScript snippet will do the following
 *
 * - Look for a type subscriber called <text>, which creates an input field with the type text or, if
 * there is no matching type call the <defaultType> function which creates a HTML tag of the given type.
 * - Add all attributes as HTML attributes to the input element that don't have a
 * subscriber registered (which are name and id)
 * - Add the new element to the DOM (append to #myform).
 * - Run the <type> subscriber which adds the auto generated class name ui-dform-text to the input field
 * - Run the <value> subscriber which sets the value of this form element
 * - Run the <caption> subscriber which adds a label before the textfield
 *
 * Read in the <Extensions> chapter, how you can extend the dForm Plugin with your own
 * types and subscribers.
 *
 * This page will list the basic <Types> and <Subscribers> that are
 * supported by the plugin as well as examples for using them.

# Plugin support

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