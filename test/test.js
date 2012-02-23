$(document).ready(function()
{
	test("$.keyset", function()
	{
		var keys = $.keyset({ x : 1, y : true, test : 'testing' });
		deepEqual(keys, ['x', 'y', 'test' ]);
	});
	
	test('.formElement()', function() {
		$('#qunit-fixture').append($('<div>').attr('id', 'formElement'));
		var testEl = $('#formElement');
		testEl.formElement({
			type : 'text',
			name : 'testing'
		});
		equals(1, $('[name="testing"]', testEl).length);
		equals('text', $('[name="testing"]', testEl).attr('type'));
	});
	
	test("$.dform.addType", function()
	{
		$.dform.addType('test', function(options) {
			
		});
	});
});