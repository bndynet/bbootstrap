var pkg = require('./package.json');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var include = require('gulp-include');
var banner = require('gulp-banner');
var babel = require('gulp-babel');
var del = require('del');
var replace = require('gulp-replace');

var paths = {
    scripts: 'src/js/**/*.js',
    images: 'src/img/**/*',
    styles: 'src/scss/*.scss',
    fontFiles: ['node_modules/font-awesome/fonts/*'],
};

var comment = '/*\n' +
    ' * <%= pkg.name %> v<%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright (c) 2018, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    ' * http://bndy.net\n' +
    ' */\n\n';

gulp.task('clean', ['cleanStatic', 'cleanStyles', 'cleanScripts'], function () {
    return del(['dist']);
});
gulp.task('cleanStatic', function() {
    return del(['dist/fonts', 'docs/fonts']);
});
gulp.task('cleanStyles', function() {
    return del(['dist/css', 'docs/css']);
});
gulp.task('cleanScripts', function() {
    return del(['dist/js', 'docs/js']);
});


gulp.task('static', ['cleanStatic'], function () {
    return gulp.src(paths.fontFiles)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulp.dest('docs/fonts'));
});

gulp.task('scripts', ['cleanScripts'], function () {
    return gulp.src('src/js/bbootstrap.js')
        .pipe(replace('{{bbootstrap-version}}', pkg.version))
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(include({
            extensions: "js",
            hardFail: true,
            includePaths: [
                __dirname + "/node_modules",
                __dirname + "/src/js",
            ],
        }))
        // .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(concat('bbootstrap.min.js'))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('docs/js'));
});

gulp.task('styles', ['cleanStyles'], function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bbootstrap.css'))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            debug: true
        }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(concat('bbootstrap.min.css'))
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('docs/css'));
});

gulp.task('watch', function () {
    gulp.watch(paths.fontFiles, ['static']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['clean', 'watch', 'static', 'scripts', 'styles']);
gulp.task('build', ['clean', 'static', 'scripts', 'styles']);