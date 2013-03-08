module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: ['test/index.html']
		},
		concat: {
			dist: {
				src: ['src/dform.js', 'src/dform.core.js', 'src/dform.extensions.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: ['dist/<%= pkg.name %>-<%= pkg.version %>.js'],
				dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-qunit');


	grunt.registerTask('test', 'qunit');
	grunt.registerTask('default', ['concat', 'uglify']);
};
