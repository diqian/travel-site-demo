var gulp = require('gulp');
var watch = require('gulp-watch');

var browserSync = require('browser-sync').create();

gulp.task('watch', function(){
    
    // First thing we want to do is to setup some settings
    // It will actually opens up the browser for us
    browserSync.init({
        
        // if we don't want to see the black notifying box
        notify: false,

        // First: tell browerSync where our website lives
        // We need to do this because browserSync actually spin up a little web server in our computer
        server: {
            // then give info about how the serveer should be setup
            // the base directory should simply be our app folder
            baseDir: "app"
        }
    });

    //we can pass the function to arguments
    //param1: the file on our computer you want to watch
    // ./ -> the go to the root of our project
    //param2: what we want it to dog
    watch('./app/index.html', function(){
        //notice, the html task is the task we created above
        // auto refresh
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function(){
        // gulp.start('styles');
        gulp.start('cssInject');
    });
});

// we can have a dependency variable in between name of the task
// and what we want it to do
// so before we want it to run any task, it have to complete 
// any task list in between
gulp.task('cssInject', ['styles'], function(){
    // we want to take the content of our compiled css file
    // and we want to hand that over to browserSync
    // so that it can inject those changes on the fly
    //make sure we have return becuase src is asyngchrnous function
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
