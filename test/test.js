$(document).ready(function ()
{
	module('Globals');

	test("$.keyset", function ()
	{
		var keys = $.keyset({ x : 1, y : true, test : 'testing' });
		deepEqual(keys, ['x', 'y', 'test' ]);
	});

	test("$.withKeys", function ()
	{
		var obj = {
			x : 1,
			y : true,
			test : 'testing'
		},
			result = $.withKeys(obj, [ 'y', 'test' ]);
		deepEqual(result, { y : true, test : 'testing' });
	});

	test("$.withoutKeys", function ()
	{
		var obj = {
			x : 1,
			y : true,
			test : 'testing'
		},
			result = $.withoutKeys(obj, ['y']);
		deepEqual(result, { x : 1, test : 'testing' });
	});

	module('Plugin')

	test("Call method", function ()
	{
		expect(3);
		$.dform.methods.test = function (name, age)
		{
			equal(name, 'Tester');
			equal(age, 42);
			ok(this.is('div'), 'This referenced properly');
		};
		$('<div>').dform('test', 'Tester', 42);
	});

	test("Run type subscriber", function ()
	{
		var def = {
			type : 'div'
		},
			created = $('<form>').dform(def).find('div');
		equal(created.attr('class'), $.dform.options.prefix + 'div', 'Class added');
	});

	test("Add attributes", function ()
	{
		var def = {
			'type' : 'div',
			'id' : 'test-id',
			'data-test' : 'Test data attribute'
		},
			created = $('<form>').dform(def).find('div');
		equal(created.attr('id'), 'test-id', 'ID added');
		equal(created.data('test'), 'Test data attribute', 'Added test data attribute');
	});

	module("Types");

	test("Default type", function ()
	{
		var def = {
			type : 'div',
			id : 'my-id'
		},
			el = $.dform.defaultType(def);
		ok(el.is('div'), 'Element type is a div');
		equal(el.attr('id'), 'my-id', 'Id properly set');
	});

	test("Add type and create element", function ()
	{
		$.dform.addType('test-span', function (options)
		{
			equal(options.testAttribute, 'attribute', 'Test attribute passed');
			return $('<span>').addClass('testspan');
		});

		var def = {
			type : 'test-span',
			testAttribute : 'attribute'
		},
			el = $.dform.createElement(def);
		ok(el.is('span'), 'Created element is a span');
		equal(el.attr('class'), 'testspan', 'Class has been set during element creation');
	});

	test("Type chaining", function() {
		expect(3);
		$.dform.addType('text', function(options) {
			ok($(this).is('input'), 'Type chain ran and got correct element');
			return $(this).addClass('test-type');
		});
		var text = $('<form>').dform({
			type : 'text'
		}).find('[type="text"]');
		equal(text.length, 1, 'Created text element');
		ok(text.hasClass('test-type'), 'Type chained and returned properly');
	});

	test("Core types", function ()
	{
		var form = $('<form>');

		ok(form.dform('append', { type : 'form' }).find('form').length);
		ok(form.dform({ type : 'container' }).find('div').length);
		ok(form.dform({ type : 'text' }).find('[type="text"]').length);
		ok(form.dform({ type : 'password' }).find('[type="password"]').length);
		ok(form.dform({ type : 'submit' }).find('[type="submit"]').length);
		ok(form.dform({ type : 'reset' }).find('[type="reset"]').length);
		ok(form.dform({ type : 'hidden' }).find('[type="hidden"]').length);
		ok(form.dform({ type : 'radio' }).find('[type="radio"]').length);
		ok(form.dform({ type : 'checkbox' }).find('[type="checkbox"]').length);
		ok(form.dform({ type : 'file' }).find('[type="file"]').length);
		ok(form.dform({ type : 'number' }).find('[type="number"]').length);
		ok(form.dform({ type : 'url' }).find('[type="url"]').length);
		ok(form.dform({ type : 'tel' }).find('[type="tel"]').length);
		ok(form.dform({ type : 'email' }).find('[type="email"]').length);
	});

	module("Subscribers");

	test("Add subscriber", function() {
		expect(3);
		$.dform.subscribe('testit', function(options, type) {
			equal(type, 'div', 'Proper type got passed');
			equal(options.name, 'Tester', 'Passed correct name option');
			equal(options.answer, 42, 'Passed correct answer');
		});
		$('<form>').dform({
			type : 'div',
			testit : {
				name : 'Tester',
				answer : 42
			}
		});
	});

	test("Core subscribers", function ()
	{
		var form = $('<form>'),
			div = form.dform({
				type : 'container',
				class : 'test',
				html : 'Test html'
			}).find('div'),
			text = form.dform({
				type : 'text',
				value : 'Test value',
				css : {
					'background-color' : 'red'
				}
			}).find('[type="text"]');

		equal(div.html(), 'Test html', 'Html set');
		ok(div.hasClass('test'), 'Class set');
		ok(div.hasClass($.dform.options.prefix + 'container'), 'Class set');
		equal(text.val(), 'Test value', 'Value set');
		equal(text.css('background-color'), 'red', 'Css set');
	});

	test("elements and html", function() {
		var form = $('<form>').dform({
			type : 'form',
			html : [
				{
					type : 'div',
					class : 'div-1'
				},
				{
					type : 'div',
					class : 'div-2'
				}
			]
		}), form2 = $('<form>').dform({
			type : 'form',
			html : {
				type : 'div',
				class : 'div-1'
			}
		}), form3 = $('<form>').dform({
			type : 'form',
			html : 'test html'
		});
		ok(form.find('.div-1').length, 'Div 1 added');
		ok(form.find('.div-2').length, 'Div 2 added');
		ok(form2.find('.div-1').length, 'Div 1 added');
		ok(form3.html(), 'test html', 'Html content set');
	});

	test("caption", function() {
		var simple = $('<div>').dform({
				type : 'text',
				caption : 'The test'
			}).find('label'),
			asElement = $('<div>').dform({
				type : 'text',
				caption : {
					class : 'the-label',
					html : 'The complex test'
				}
			}).find('label');
		ok(simple.length, 'Generated label');
		equal(simple.html(), 'The test', 'Set caption');
		ok(asElement.length, 'Generated label from definition');
		equal(asElement.html(), 'The complex test', 'Set caption');
		ok(asElement.hasClass('the-label'), 'Added class');
	});

	test("options", function() {
		var options = {
			test1 : 'Test 1',
			test2 : 'Test 2'
		},
		select = $('<select>').dform({
			type : 'select',
			options : $.extend(true, { test3 : {
					selected : 'selected',
					html : 'Test 3'
				}}, options)
		}),
		checkboxes = $('<div>').dform({
			type : 'checkboxes',
			options : options
		});
		ok(select.find('option[value="test1"]').length, 'Test 1 value added');
		ok(select.find('option[value="test3"]').length, 'Test 3 value added');
		equal(select.val(), 'test3', 'Value set properly');
		ok(checkboxes.find('[type="checkbox"][value="test1"]').length);
		equal(checkboxes.find('label:first').html(), 'Test 1', 'Set for and found label');
	});

	test("resolve dependencies", function() {
		// expect(3);
		var test1Ran = false;
		$.dform.subscribe('test1', function(options) {
			test1Ran = true;
			ok(options, 'First subscriber ran');
		});
		$.dform.subscribe('test2', function(options) {
			ok(test1Ran, 'test1 ran before');
			ok(options, 'Second subscriber ranh');
		}, [ 'test1', 'html', 'test3' ]);
		// Circular dependency
		// $.dform.subscribe('test3', function() {}, [ 'test2' ]);

		var obj = {
			test2 : true,
			html : 'test21',
			test1 : true
		};

		deepEqual($.dform.resolve(obj), ['test1', 'html', 'test2'], 'Correct order');
		/*
		$('<div>').dform({
			test2 : true,
			test1 : true
		});
		*/
	});

});