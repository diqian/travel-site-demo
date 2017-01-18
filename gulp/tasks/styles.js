var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested  = require('postcss-nested');
var cssimport = require('postcss-import');
var mixins = require('postcss-mixins');



gulp.task('styles', function(){
    //taking the content of a css file
    //manipulate and convert that code
    //and output that code into a brand-new file
    //gulp.src()   ://tell us where to begin pouring water from  //pouring water as writing css
    //gulp.src is an asynchrnous function
    //eg: gulp.src('./main.css')
    //gulp.dest() ://tell us where to place the water once it's done running throught the pipe
    //eg: gulp.dest('./temp/styles')
    //pipe()      :// the pipe connecting src to dest, and adding stuff into the water
    //eg: applying PostCSS filter
    //within pipe, we can do whatever we want
    return gulp.src('./app/assets/styles/styles.css')
    // postcss() is expecting an array as element
    .pipe(postcss([cssimport, mixins, cssvars, nested, autoprefixer]))
    //before it pipe to our destination, we want to use on function
    // frist param: name of the event we are interested in
    // second param: what we want to do
    .on('error', function(errorInfo){
        console.log(errorInfo.toString());
        // if we don't have this, it will end all other running gulp task
        // that's the default behavior
        // but with on method, we can end things on a postive side even if error happens
        // so on error, we want to tell gulp or emit out to gulp, that it's time to
        // being things to and end
        // so watch task will just see style task has come to an end
        this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));

});