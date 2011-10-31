@page changelog Changelog
@parent index

## 0.1.4

* Removed placeholder plugin. Use HTML 5 placeholders or the jQuery [placeholder plugin](https://github.com/danielstocks/jQuery-Placeholder)
* Updated documentation engine to DocumentJS and build system to StealJS
* Merged pull request #19 and #20, support to set up a validate options for validate() in "form" type
* Added simple getting started example

## 0.1.3

* Created some public [JSFiddles for trying the plugin](http://jsfiddle.net/user/Daff/fiddles)
* Created [jQuery.dForm Google Group](http://groups.google.com/group/jquery-dform)
* Added <form> type, unified <buildForm> usage
* Fixed [issue #14](https://github.com/daffl/jquery.dform/issues/closed#issue/14), setting type attribute properly in IE
* Added <getValueAt>
* Added <i18n> support using the [jQuery globalize](https://github.com/jquery/jquery-global) plugin
* Fixed minor bugs in dform plugins

## 0.1.2

* Added <dformAttr> to add HTML attributes to elements
* Moved <placeholder> into a separate plugin
* Added <reset> button type
* Added dynamic form definition loading by passing a URL to the <buildForm> plugin function
* Added <ajax> subscriber using the <jQuery form plugin at http://jquery.malsup.com/form>
* Added the <defaultType> method to create any HTML element without having to register a type
* Improved build process

## 0.1.1

* Separated type and subscriber functions
* Added types <file>, <container>, <hidden>, <accordion>, <checkboxes> and <radiobuttons>
* Added auto class generation based on element type
* Finished jQuery UI <accordion> and unified with <tabs> usage
* Switched documentation to <Natualdocs at http://naturaldocs.org>
* Added build.xml for generating documentation and minifying JavaScript

## 0.1

* Initial release