var gulp = require('gulp');
//var changed = require('gulp-changed');
//var imagemin = require('gulp-imagemin');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
//var tinypng = require('gulp-tinypng');
//var sass = require('gulp-sass');
//var base64 = require('gulp-base64');

gulp.task('browserify', function() {
    var bundle = browserify('./client/index.js')
    //.transform(stringify(['.html']))
    //.transform('browserify-shim');

    var stream = bundle.bundle();
    return stream
        .on('error', function(err) {
            console.error(err);
            stream.close();
        })
        .pipe(source('index.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('public/js'));
});

/*
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(base64({
            baseDir: 'public/css',
            maxImageSize: 48 * 1024 // 48k
        }))
        .pipe(gulp.dest("public/css"));
});
*/

/*
gulp.task('image-png', function() {
    return gulp.src("images/*.png")
        .pipe(changed('public/img'))
        .pipe(tinypng('9kl3nT2f8qC-AaApBVXDeQt-37ArLMNs'))
        .on('error', console.error)
        .pipe(gulp.dest("public/img"));
});

gulp.task('image-other', function() {
    return gulp.src("images/*.{jpg,jpeg,gif}")
        .pipe(changed('public/img'))
        .pipe(imagemin({
            progressive: true,
            use: [pngcrush()]
        }))
        .pipe(gulp.dest("public/img"));
});
*/

gulp.task("watch-scripts", function() {
    gulp.watch("client/*", ["browserify"]);
});

/*
gulp.task("watch-images", function() {
    gulp.watch("images/*", ["image-png", "image-other"]);
});

gulp.task("watch-sass", function() {
    gulp.watch(["scss/*", "img/*"], ["sass"]);
});
*/

gulp.task("watch", [ /*"watch-sass", "watch-images",*/ "watch-scripts"]);

gulp.task('develop', ["watch"], function() {
    nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['public/**/*']
    }).on('restart', function() {
        console.log('restarted!')
    })
});
