module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9001,
					base: '.'
				}
			}
		},
		qunit: {
			all: {
				options: {
					urls: ['http://localhost:9001/test/index.html']
				}
			}
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
	grunt.loadNpmTasks('grunt-contrib-connect');


	grunt.registerTask('test', ['connect', 'qunit']);
	grunt.registerTask('default', ['concat', 'uglify']);
};
