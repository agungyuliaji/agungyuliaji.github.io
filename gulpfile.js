var gulp = require('gulp'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber');


gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = '';

  swPrecache.write('service-worker.js', {
    staticFileGlobs: [
      'index.html',
      'app.css',
      'app.js',
      'fonts/*',
      'images/*'
    ],
    stripPrefix: ''
  });
});

gulp.task('min-js', function (cb) {
  return gulp.src([
    'dev/js/jquery.min.js',
    'dev/js/sweetalert.min.js',
    'dev/js/main.js',
    'dev/js/**/*.js'
  ])
  .pipe(plumber())
  .pipe(concat('app.js', {newLine: ';'}))
  .pipe(uglify())
  .pipe(gulp.dest(''));
});

gulp.task('min-css', function() {
  return gulp.src('dev/css/**/*.css')
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(''));
});

gulp.task('min-html', function() {
  return gulp.src('dev/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
  gulp.watch('dev/**/*', function(file) {
    gulp.start(['min-html', 'min-css', 'min-js']);
  });
});

gulp.task('default', function() {
  gulp.start('watch');
  connect.server();
});
