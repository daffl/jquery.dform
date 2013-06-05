$(document).ready(function () {
	module("Subscribers");

	test("Add subscriber", function () {
		expect(3);
		$.dform.subscribe('testit', function (options, type) {
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

	test("Core subscribers", function () {
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
		ok(text.css('background-color'), 'Css set');
	});

	test("elements and html", function () {
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

	test("caption", function () {
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

	test("options", function () {
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

	test("url", function() {
		stop();
		$('<div>').dform({
			type: 'div',
			url: {
				url: 'test.json',
				success: function() {
					equal($(this).html(), 'The test', 'Subscriber ran, got text');
					start();
				}
			}
		});
	});
});
