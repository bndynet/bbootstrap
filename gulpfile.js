var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('gulp-browserify');
var del = require('del');

var paths = {
    scripts: ['src/js/**/*.js', '!src/js/**/*.min.js'],
    images: 'src/img/**/*',
    styles: 'src/scss/*.scss',
    fontFiles: ['node_modules/font-awesome/fonts/*'],
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist']);
});

gulp.task('static', ['clean'], function() {
    return gulp.src(paths.fontFiles)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulp.dest('docs/fonts'));
});

gulp.task('scripts', ['clean'], function () {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(browserify())
        // .pipe(sourcemaps.init())
        .pipe(concat('bbootstrap.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(concat('bbootstrap.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('docs/js'));
});

gulp.task('styles', ['clean'], function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bbootstrap.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS({ compatibility: 'ie8', debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(concat('bbootstrap.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('docs/css'));
});

gulp.task('demo', function() {
    return gulp.src('dist/*/**')
        .pipe(gulp.dest('docs'));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.fontFiles, ['static']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'watch', 'static', 'scripts', 'styles']);