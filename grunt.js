module.exports = function (grunt) {
	grunt.initConfig({
		pkg : '<json:package.json>',
		qunit : {
			all : ['test/index.html']
		},
		concat : {
			dist : {
				src : ['src/dform.js', 'src/dform.core.js', 'src/dform.extensions.js'],
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		min : {
			dist : {
				src : ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		}

	});

	grunt.registerTask('test', 'qunit');
	grunt.registerTask('default', 'concat min');
};
