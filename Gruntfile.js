module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.name[0].toUpperCase() + pkg.name.slice(1) %> v<%= pkg.version %> by Puzzalea\n    Docs: https://github.com/puzzalea/candy */\n',
		concat: {
			dist: {
				files: {
					'dist/candy.js' : ['js/*.js']
				}
			}
		},
		sass: {
			dist: {
				files: {
					'dist/candy.css' : 'scss/candy.scss'
				},
				options: {
					sourcemap: 'none',
					style: 'expanded'
				}
			}
		},
		usebanner: {
			js: {
				files: {
					src: ['dist/candy.js']
				},
				options: {
					banner: '<%= banner %>'
				}
			}
		},
		watch: {
			css: {
				files: ['scss/**/*.scss'],
				tasks: ['sass']
			},
			js: {
				files: ['js/*.js'],
				tasks: ['concat', 'usebanner:js']
			}
		}
	});
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
};
