Title: The Plugin

The jQuery.dForm plugin allows you to create your HTML forms programmatically from
JavaScript objects (and JSON).

It is pretty straightforward to use:

(start code)
	var formdata =
	{
		"action" : "index.html",
		"method" : "get",
		"elements" : 
		[
			{
				"name" : "textfield",
				"label" : "Label for textfield",
				"type" : "text",
				"value" : "Hello world"
			},
			{
				"type" : "submit",
				"value" : "Submit"
			}
		]			
	};
	$("#myform").buildForm(formdata);
(end)
	
What it is for:

There are many server side web frameworks that support HTML forms, but
you often end up mixing client (e.g. instant validation) and server form processing
concerns together where you end up redefining your applications business objects
as HTML forms, with JavaScript enhancements though forms could be easily generated.

This plugin moves the generation of forms entirely on the client side so that the
server just has to provide a JavaScript object (usually as JSON) that contains
all the information needed to create this form. It is easily extensible for custom
form elements and properties.

You should try this plugin if you want to

* manage all your form related jQuery plugins in a unified way
* centralize form generation
* scaffold forms from business objects of your server side framework
* provide an easy way to include jQuery UI elements and JavaScript validation
* write JavaScript code instead of HTML markup
