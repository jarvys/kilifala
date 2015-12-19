var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var streamify = require('gulp-streamify')
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    var bundle = browserify('./client/index.js')

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

gulp.task("watch-scripts", function() {
    gulp.watch("client/*", ["browserify"]);
});

gulp.task("watch", ["watch-scripts"]);

gulp.task('develop', ["watch"], function() {
    nodemon({
        script: 'app.js',
        ext: 'html js',
        ignore: ['public/**/*']
    }).on('restart', function() {
        console.log('restarted!')
    })
});

