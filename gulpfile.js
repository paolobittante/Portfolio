var gulp        = require('gulp');
var jade        = require('gulp-jade');
//writing sass
var sass        = require('gulp-sass');
//concatenate certain files
var concat      = require('gulp-concat');
//automactly refresh the broswer 
var livereload  = require('gulp-livereload');
//web server
var express     = require('express');
var app         = express();
//
var gutil       = require('gulp-util');
//
var path        = require('path');
//connect json files
var data        = require('gulp-data');

app.use(express.static(path.resolve('./build')));

app.listen('8080', function(){
    gutil.log('Listening on ', '8080');
});

gulp.task('html',function(){
    //locate our jade's files
    gulp.src('jade/index.jade')
        .pipe(data( function(file){
                return require('./data.json');
        }))
        .pipe(jade({
            pretty:true
        }))
        .pipe(gulp.dest('build'))
        .pipe(livereload())
});

gulp.task('css',function(){
     gulp.src(['css/*.css','sass/*.scss'])
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(livereload())
});

gulp.task('images',function(){
    gulp.src('images/*')
        .pipe(gulp.dest('build/images'))
        .pipe(livereload())
})

gulp.task('js',function(){
    gulp.src('js/**')
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
})

gulp.task('watch',['build'], function(){
    livereload.listen();

    gulp.watch('jade/*/**.jade', ['html']);
    gulp.watch('sass/*.scss', ['css']);
    gulp.watch('images/*', ['images']);
});

gulp.task('build', ['html','css','images','js']);