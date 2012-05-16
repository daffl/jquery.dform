$(document).ready(function () {
	module("Types");

	test("Default type", function () {
		var def = {
			type : 'div',
			id : 'my-id'
		},
			el = $.dform.defaultType(def);
		ok(el.is('div'), 'Element type is a div');
		equal(el.attr('id'), 'my-id', 'Id properly set');
	});

	test("Add type and create element", function () {
		$.dform.addType('test-span', function (options) {
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

	test("Type chaining", function () {
		expect(3);
		$.dform.addType('text', function (options) {
			ok($(this).is('input'), 'Type chain ran and got correct element');
			return $(this).addClass('test-type');
		});
		var text = $('<form>').dform({
			type : 'text'
		}).find('[type="text"]');
		equal(text.length, 1, 'Created text element');
		ok(text.hasClass('test-type'), 'Type chained and returned properly');
	});

	test("Core types", function () {
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
});
