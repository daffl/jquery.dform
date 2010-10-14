Title: Home

The jQuery.dForm plugin allows you to create your HTML forms programmatically from JavaScript objects 
(and therefore JSON, too).

Usage:

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

There are many server side web frameworks that support HTML form generation,
but you often end up mixing client (e.g. JavaScript validation) and server side processing concerns together.

This plugin moves the generation of forms entirely on the client side so that the server just has to provide a 
JavaScript object (usually as JSON) that contains all the information needed to create this form.
It is easily extensible for custom form elements and properties.

You should try this plugin if you want to

* manage all your form related jQuery plugins in a unified way (jQuery UI and the Validation plugin
supported out of the box)
* scaffold forms from business objects of your server side framework
* have an easy way to include jQuery UI elements and JavaScript validation
* write JavaScript instead of HTML markup since your page doesn't run without JS anyway

How to get it:
<Download jQuery.dForm 0.1.1 at http://bla>

Contribute:

* Visit the project on <GitHub at http://github.com/daffl/jquery.dform/>
* Follow <@daffl at http://twitter.com/daffl> on Twitter

Examples:

Some examples on how to use the plugin. Learn more about
building forms in the <Usage> and <Extension> chapters or read
the core <Plugin> documentation. 

example: Simple login form
Demonstration of a simple login form

(start code)
{
	"action" : "index.html",
	"method" : "get",
	"elements" :
	[
		{
			"type" : "span",
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
}
(end)

example: Complex registration form
A more complex registration form using the validation plugin

(start code)
 {
	"action" : "index.html",
	"method" : "post",
	"elements" :
	[
		{
			"type" : "fieldset",
			"caption" : "User information",
			"elements" : 
			[
				{
					"name" : "email",
					"caption" : "Email address",
					"type" : "text",
					"placeholder" : "E.g. user@example.com",
					"validate" :
					{
					"email" : true
					}
				},
				{
					"name" : "password",
					"caption" : "Password",
					"type" : "password",
					"id" : "registration-password",
					"validate" :
					{
						"required" : true,
						"minlength" : 5,
						"messages" :
						{
							"required" : "Please enter a password",
							"minlength" : "At least {0} characters long"
						}
					}
				},
				{
					"name" : "password-repeat",
					"caption" : "Repeat password",
					"type" : "password",
					"validate" :
					{
						"equalTo" : "#registration-password",
						"messages" :
						{
							"equalTo" : "Please repeat your password"
						}
					}
				},
				{
					"type" : "radiobuttons",
					"caption" : "Sex",
					"name" : "sex",
					"class" : "labellist",
					"options" :
					{
						"f" : "Female",
						"m" : "Male"
					}
				},
				{
					"type" : "checkboxes",
					"name" : "test",
					"caption" : "Receive newsletter about",
					"class" : "labellist",
					"options" :
					{
						"updates" : "Product updates",
						"errors" :
						{
						"value" : "security",
						"caption" : "Security warnings",
						"checked" : "checked"
						}
					}
				}
			]
		},
		{
			"type" : "fieldset",
			"caption" : "Address information",
			"elements" : 
			[
				{
					"name" : "name",
					"caption" : "Your name",
					"type" : "text",
					"placeholder" : "E.g. John Doe"
				},
				{
					"name" : "address",
					"caption" : "Address",
					"type" : "text",
					"validate" : { "required" : true }
				},
				{
					"name" : "zip",
					"caption" : "ZIP code",
					"type" : "text",
					"size" : 5,
					"validate" : { "required" : true }
				},
				{
					"name" : "city",
					"caption" : "City",
					"type" : "text",
					"validate" : { "required" : true }
				},
				{
					"type" : "select",
					"name" : "continent",
					"caption" : "Choose a continent",
					"options" :
					{
						"america" : "America",
						"europe" :
						{
						"selected" : "true",
						"id" : "europe-option",
						"value" : "Europe"
						},
						"asia" : "Asia",
						"africa" : "Africa",
						"australia" : "Australia"
					}
				}
			]
		},
		{
			"type" : "submit",
			"value" : "Signup"
		}
	]
}
(end)

example: jQuery UI controls
Examples for the support of jQuery UI controls

(start code)
{
	"action" : "index.html",
	"method" : "get",
	"elements" : 
	[
		{
			"type" : "slider",
			"values" : [ 10, 80 ],
			"range" : true,
			"caption" : "Slider",
			"id" : "myslider"
		},
		{
			"name" : "textfield",
			"caption" : "Autocomplete",
			"type" : "text",
			"placeholder" : "Type 'A' or 'S'",
			"autocomplete" :
			{
				"source" :  [ "Apple", "Acer", "Sony", "Summer" ]
			}
		},
		{
			"name" : "date",
			"caption" : "Datepicker",
			"type" : "text",
			"datepicker" : {  "showOn" : "button" }
		},
		{
			"caption" : "A progressbar",
			"type" : "progressbar",
			"value" : 40
		},
		{
			"type" : "tabs",
			"resizable" :
			{
				"minHeight" : 180,
				"minWidth" : 300 
			},
			"entries" :
			{
				"tab1":
				{
					"caption" : "Step 1",
					"elements" :
					[
						{
							"name" : "textfield",
							"caption" : "Just a textfield",
							"type" : "text"
						},
						{
							"type" : "span",
							"html" : "Some HTML in tab 1"
						}
					]
				},
				"tab2" :
				{
					"caption" : "Step 2",
					"elements" : 
					[
						{
							"type" : "span",
							"html" : "Some HTML in tab 2"
						}
					]
				}
			}
		},
		{
			"type" : "accordion",
			"caption" : "Accordion",
			"entries" :
			[
				{
					"caption" : "Entry 1",
					"elements" :
					[
						{
							"type" : "span",
							"html" : "Some HTML in accordion entry 1"
						}
					]
				},
				{
					"caption" : "Entry 2",
					"elements" : 
					[
						{
							"type" : "span",
							"html" : "Some HTML in accordion entry 2"
						}
					]
				}
			]
		}
	]
}
(end)