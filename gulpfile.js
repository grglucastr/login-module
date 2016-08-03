var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('inject', function () {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/libs',
		ignorePath: '../../public'
	}

	var injectSrc = gulp.src(['./public/stylesheets/*.css',
							  './public/javascripts/*.js'], {read: false});

	var injectOptions = {
		ignorePath: '/public/'
	}

	return gulp.src('./views/templates/*.ejs')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./views/templates/'));
});

gulp.task('serve', ['inject'], function () {
	var options = {
		script: './bin/www',
		delayTime: 1,
		watch: ['*.js', './routes/**/*.js']
	};
	return nodemon(options).on('restart', function () {
		console.log('Server restarting...');
	});
});
