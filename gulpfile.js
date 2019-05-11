//Need to require a package
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat=require('gulp-concat');
const uglify=require('gulp-uglify');


//Create a task for it

gulp.task('default', function(done) {
    console.log('HI');
    done();
 });


 gulp.task('copyHTML', function() {
    return gulp.src('*html')
    .pipe(gulp.dest('dest'))
 });


 gulp.task('copyCSS', function() {
    return gulp.src('css/*.css')
    .pipe(gulp.dest('dest/css'))
 });


gulp.task('imgFun', () =>
    gulp.src('img/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('dest/img'))
);

gulp.task('concatJs', function() {
    return gulp.src('js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dest/js/'));
  });
 // if ES6 used, install gulp-bable
 //npm install --save-dev gulp-babel @babel/core @babel/preset-env

  gulp.task('scripts', function() {
    return gulp.src('js/*.js')
     .pipe(babel({presets: ['@babel/preset-env']}))
     // .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dest/js/'));
  });

  gulp.task('watch', function() {
        return gulp.watch('img/*',gulp.parallel('imgFun'));
        return gulp.watch('*.html',gulp.parallel('copyHTML'));
        return gulp.watch('css/*',gulp.parallel('copyCSS'));
      
  });

       gulp.task('copyFiles',gulp.parallel('imgFun','copyHTML','copyCSS'));
       gulp.task('default',gulp.parallel('copyFiles', 'scripts'));
 