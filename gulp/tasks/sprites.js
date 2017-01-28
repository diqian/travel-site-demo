// our job to tell gulp to take all the individual icon file
// and smoosh and stich them together into one file

var gulp = require('gulp');
// npm install gulp-svg-sprite@1.3.1 --save-dev
var svgSprite = require('gulp-svg-sprite');
// npm install gulp-rename --save-dev
// this package is responsible for renaming files
var rename = require('gulp-rename');
// npm install del --save-dev
// this package is responsible for deleting files
var del = require('del');

// create a object literal to tell svgSprite which mode to use
var config = {
    mode: {
        css: {
            // adding this line would remove the .css extension in the filename
            // will make it look nicer
            sprite: 'sprite.svg',
            render: {
                css: {
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
}

// it's in charge of deleting the sprite folder under image
// otherwise, everytime we add a new icon or delete a new icon
// the task will generate a new svg file, which will coexist with our old one
// we want the old one to disappear
gulp.task('beginClean', function(){
    // we can provide an array of folder that we want to delete
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite',['beginClean'], function(){
    // whenever we use gulp src, we need to begin with return
    return gulp.src('./app/assets/images/icons/**/*.svg')
            // by doing this, all of our icon could be compiled into one
            // what's more is that it will generate code for us
            // to tell us where is the image and give the code for css
            .pipe(svgSprite(config))
            // copy the svg to a sprite folder under temp folder
            .pipe(gulp.dest('./app/temp/sprite/'));
});

// put the generated svg file into the images/sprites folder
gulp.task('copySpriteGraphic', ['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/**/*.svg')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS',['createSprite'], function(){
    return gulp.src('./app/temp/sprite/css/*.css')
        // gulp rename a file
          .pipe(rename('_sprite.css'))
          .pipe(gulp.dest('./app/assets/styles/modules'));
});

// once all the things have ran, we simply want to delete app/temp/sprite folder
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
    return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);








