$(document).ready(function () {
	module("Extensions");

	test("Globalize", function () {
		Globalize.culture('de');
		Globalize.addCultureInfo( "de", {
			messages: {
				"stuff" : {
					"thing" : "Dingens",
					"options" : {
						"de" : "Deutschland",
						"ca" : "Kanada",
						"fr" : "Frankreich"
					}
				},
				"hello" : "Hallo Welt"
			}
		});

		var div = $('<div>').dform({
			html : [
				{
					'type' : 'div',
					'class' : 'simple',
					'html' : 'Passed, not translated'
				},
				{
					'type' : 'div',
					'class' : 'hello',
					'html' : 'hello'
				},
				{
					'type' : 'div',
					'class' : 'nested',
					'html' : 'stuff.thing'
				},
				{
					'type' : 'div',
					'class' : 'nestedsimple',
					'html' : 'stuff.thingers.moo'
				},
				{
					'type' : 'select',
					'class' : 'options',
					'options' : 'stuff.options'
				}
			]
		});

		equal(div.find('.simple').html(), 'Passed, not translated', 'Passed through when translation does not exist');
		equal(div.find('.hello').html(), 'Hallo Welt', 'Simple translated HTML set');
		equal(div.find('.nested').html(), 'Dingens', 'Nested key got translated');
		equal(div.find('.nestedsimple').html(), 'stuff.thingers.moo', 'Nested key does not exist');
		equal(div.find('.options option[value="de"]').html(), 'Deutschland', 'First option set from translation');
		equal(div.find('.options option[value="ca"]').html(), 'Kanada', 'Second option set from translation');
	});
});
