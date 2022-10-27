'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
gulp.task('less', function() {
    return gulp.src('./css/styles/style.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'))
        .pipe(concatCss("styles/bundle.css"))
});
gulp.task('watch', function() {
    gulp.watch('./css/styles/*.less', gulp.series('less'));
});
gulp.task('default', gulp.series('watch'));