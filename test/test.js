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

	test("Call method", 3, function () {
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

	test("Ajax", 3, function() {
		stop();
		$('<div>').dform('test.json', function(data) {
			equal(data.html, 'The test', 'Data passed to success callback');
			equal(this.html(), 'The test', 'Form got created');
			$('<div>').dform('missing.json', function() {}, function() {
				ok(true, 'Error handler called');
				start();
			});
		});
	})
});
