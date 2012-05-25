$(document).ready(function () {
	module('Globals');

	test("$.keyset", function () {
		var keys = $.keyset({ x : 1, y : true, test : 'testing' });
		deepEqual(keys, ['x', 'y', 'test' ]);
	});

	test("$.withKeys", function () {
		var obj = {
			x : 1,
			y : true,
			test : 'testing'
		},
			result = $.withKeys(obj, [ 'y', 'test' ]);
		deepEqual(result, { y : true, test : 'testing' });
	});

	test("$.withoutKeys", function () {
		var obj = {
			x : 1,
			y : true,
			test : 'testing'
		},
			result = $.withoutKeys(obj, ['y']);
		deepEqual(result, { x : 1, test : 'testing' });
	});

	module('Plugin')

	test("Call method", function () {
		expect(3);
		$.dform.methods.test = function (name, age) {
			equal(name, 'Tester');
			equal(age, 42);
			ok(this.is('div'), 'This referenced properly');
		};
		$('<div>').dform('test', 'Tester', 42);
	});

	test("Run type subscriber", function () {
		var def = {
			type : 'div'
		},
			created = $('<form>').dform(def).find('div');
		equal(created.attr('class'), $.dform.options.prefix + 'div', 'Class added');
	});

	test("Add attributes", function () {
		var def = {
			'type' : 'div',
			'id' : 'test-id',
			'data-test' : 'Test data attribute'
		},
			created = $('<form>').dform(def).find('div');
		equal(created.attr('id'), 'test-id', 'ID added');
		equal(created.data('test'), 'Test data attribute', 'Added test data attribute');
	});

	test("Ajax", function() {
		stop();
		$('<div>').dform('test.json', function(data, form) {
			equal(data.html, 'The test', 'Data passed to success callback');
			equal(form.html(), 'The test', 'Form got created');
			start();
		});
	})
});
