var gulp = require('gulp');

// var server      = require('gulp-express');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var nodemon     = require('nodemon');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;



gulp.task('nodemon', function () {
	nodemon({
	  script: './bin/www'
  })
});


gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init( {
        proxy: "localhost:10190",
        port: "10191", // Hey that's the year Dune is set!
        open: false
    });
});


// CSS
gulp.task('css', function() {
  return gulp.src('src/stylesheets/style.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('build/stylesheets'))
    .pipe(reload({stream: true}));
});

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

// Templates
gulp.task('templates', function() {
  return gulp.src('views/**/*.hbs')
    .pipe(reload({stream:true}));
});



// Initial build
gulp.task('build', ['css', 'scripts', 'templates']);

// Watch
gulp.task('watch', function() {
	gulp.watch('src/stylesheets/**/*.styl', ['css']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('./views/**/*.hbs', ['templates']);
});


gulp.task('default', ['build', 'browser-sync', 'watch']);
