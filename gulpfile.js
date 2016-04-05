const gulp = require('gulp');

const stylus      = require('gulp-stylus');
// const nib         = require('nib');

const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');

const handlebars 	= require('gulp-compile-handlebars');

const browserSync = require('browser-sync');
const reload      = browserSync.reload;

const postcss     = require('gulp-postcss');
const quash       = require('postcss-quash');
const autoprefixer = require('autoprefixer');

gulp.task('browser-sync', function() {
  browserSync.init( {
		server: {
			baseDir: "./build"
		},
    port: "3000",
    open: false
  });
});


// CSS
gulp.task('css', function() {
  return gulp.src('src/stylesheets/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(reload({stream: true}));
});

// gulp.task('postcss', function () {
//   const processors = [
//     quash
//   ];
//   return gulp.src('./build/stylesheets/style.css')
//     .pipe(postcss(processors))
//     .pipe(gulp.dest('./dest'));
// });


// JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream:true}));
});

gulp.task('vendor', function() {
	return gulp.src('src/js/vendor/*.js')
		.pipe(gulp.dest('build/js/vendor'));
});


// Templates
gulp.task('templates', function() {
	const templateData = {
	  title: 'Fremen'
	};
	const options = {
	  ignorePartials: true,
	  batch: ['./src/views'],
	  helpers: {
	    capitals: function(str){
	      return str.toUpperCase();
	    }
	  }
	};
	return gulp.src('src/views/*.html')
		.pipe(handlebars(templateData, options))
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream:true}));
});



// Initial build
gulp.task('build', ['css', 'scripts', 'vendor', 'templates']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/**/*.styl', ['css']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/views/**/*.html', ['templates']);
});

// Development
gulp.task('default', ['build', 'browser-sync', 'watch']);
