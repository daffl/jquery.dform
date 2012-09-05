$(document).ready(function () {
	module("jQueryUI");

	test('Progressbar', 2, function() {
		var div = $('<div>').dform({
			'type' : 'progressbar',
			'class' : 'bar',
			'value' : 50
		}).find('.bar');
		ok(div.hasClass('ui-progressbar'), 'jQueryUI progressbar initialized');
		equal(div.find('.ui-progressbar-value').css('width'), '50%', 'Progressbar value set correctly');
	});

	test('Slider', 2, function() {
		var div = $('<div>').dform({
			'type' : 'slider',
			'class' : 'slide',
			'value' : 50
		}).find('.slide');
		ok(div.hasClass('ui-slider'), 'jQueryUI slider initialized');
		ok(div.slider('value'), 50, 'Can call .slider() and get value');
	});

	test('Accordion', 5, function() {
		var div = $('<div>').dform({
			'type' : 'accordion',
			'entries' : [
				{
					'caption' : 'First entry',
					'html' : 'Content 1'
				},
				{
					'caption' : 'Second entry',
					'html' : 'Content 2'
				}
			]
		});
		ok(div.find('.ui-accordion').length, 'Accordion initialized');
		ok(div.find('h3.ui-accordion-header:eq(0)').html(), 'First entry', 'First header caption set');
		ok(div.find('.ui-accordion-content:eq(0)').html(), 'Content 1', 'First content set as accordion content');
		ok(div.find('h3.ui-accordion-header:eq(1)').html(), 'Second entry', 'Second header caption set');
		ok(div.find('.ui-accordion-content:eq(1)').html(), 'Content 2', 'Second content set as accordion content');
	});

	test('Tabs', 10, function() {
		var div = $('<div>').dform({
			'type' : 'tabs',
			'entries' : [
				{
					'caption' : 'First entry',
					'id' : 'firsttab',
					'html' : 'Content 1'
				},
				{
					'caption' : 'Second entry',
					'id' : 'secondtab',
					'html' : 'Content 2'
				}
			]
		}), div2 = $('<div>').dform({
			'type' : 'tabs',
			'entries' : {
				"first" : {
					'caption' : 'First entry',
					'html' : 'Content 1'
				},
				"second" : {
					'caption' : 'Second entry',
					'html' : 'Content 2'
				}
			}
		});

		ok(div.find('.ui-tabs').length, 'Tabs initialized');
		ok(div.find('.ui-tabs-nav li:eq(0) a').html(), 'First entry', 'First tab caption set');
		ok(div.find('.ui-tabs-nav li:eq(0) a').attr('href'), '#firsttab', 'Points to #firsttab');
		ok(div.find('.ui-tabs-panel:eq(0)').html(), 'Content 1', 'First content set as accordion content');
		ok(div.find('.ui-tabs-nav li:eq(1) a').html(), 'Second entry', 'Second tab caption set');
		ok(div.find('.ui-tabs-nav li:eq(1) a').attr('href'), '#secondtab', 'Points to #secondtab');
		ok(div.find('.ui-tabs-panel:eq(1)').html(), 'Content 2', 'Second content set as accordion content');

		ok(div2.find('.ui-tabs').length, 'Second tabs initialized');
		ok(div2.find('.ui-tabs-nav li:eq(0) a').attr('href'), '#first', 'First id set from object');
		ok(div2.find('.ui-tabs-nav li:eq(1) a').attr('href'), '#second', 'Second id set from object');

		// console.log(div);
	});
});
