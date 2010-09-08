/*
 * jQuery dynamic form plugin
 * Copyright (C) 2010 David Luecke <daff@neyeon.de>
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
(function($)
{
	$.dform.subscribe("type", function(options, type) {
		// TODO add jQuery UI classes
	});
	
	$.dform.subscribe("[type=datepicker]", function(options) {
		// TODO datepicker
	});
	
	$.dform.subscribe("[type=button]", function(options) {
		// TODO jquery ui button
	});
	
	$.dform.subscribe("[type=tabs]", function(options) {
		// TODO jquery ui button
	});
	
	$.dform.subscribe("[type=accordion]", function(options) {
		// TODO forms in accordion
	});
	
	$.dform.subscribe("[type=progressbar]", function(options) {
		// TODO
	});
	
	$.dform.subscribe("[type=autocomplete]", function(options) {
		// TODO
	});
	
	$.dform.subscribe("[type=slider]", function(options) {
		// TODO 
	});
});