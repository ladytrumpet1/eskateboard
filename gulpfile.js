const gulp = require("gulp");
const plumberNotifier = require("gulp-plumber-notifier");
const browserSync = require("browser-sync").create();
const autoPrefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");
const csscomb = require("gulp-csscomb");
const rename = require('gulp-rename');
const csso = require("gulp-csso");
const inject = require("gulp-inject");
const series = require("stream-series");
const uglify = require("gulp-uglify");
const prettify = require("gulp-html-prettify");

// Directories path
var baseDir = "./assets/sass/base/";
var layoutDir = "./assets/sass/layout/";
var pagesDir = "./assets/sass/pages/";
var themesDir = "./assets/sass/themes/";
var shrotcodesDir = "./assets/sass/shortcodes/";
var styleCss = [baseDir+"*.scss", layoutDir+"*.scss", pagesDir+"*.scss"];

// Autoprefixer config
const AUTOPREFIXER_BROWSERS = [
    "last 2 version",
    "> 1%",
    "ie >= 9",
    "ie_mob >= 10",
    "ff >= 30",
    "chrome >= 34",
    "safari >= 7",
    "opera >= 23",
    "ios >= 7",
    "android >= 4",
    "bb >= 10"
];

// Server task
gulp.task("serve", function() {
    browserSync.init({
        server: "./",
        notify: false
    });
});

// Shortcode sass to css
gulp.task("shortcode", function() {
    return gulp.src(shrotcodesDir + "shortcodes.scss")
        .pipe(plumberNotifier())
        .pipe(sass())
        .pipe(autoPrefixer(AUTOPREFIXER_BROWSERS))
        .pipe(csscomb())
        .pipe(gulp.dest("./assets/css"))
        .pipe(browserSync.stream())
        .pipe(csso())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./assets/css"));
});

// Theme sass to css
gulp.task("theme", function() {
    return gulp.src(themesDir + "*.scss")
        .pipe(plumberNotifier())
        .pipe(sass())
        .pipe(autoPrefixer(AUTOPREFIXER_BROWSERS))
        .pipe(csscomb())
        .pipe(gulp.dest("./assets/css"))
        .pipe(browserSync.stream())
        .pipe(csso())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./assets/css"));
});

// Style sass to css
gulp.task("style", function() {
    return gulp.src("./assets/sass/style.scss")
        .pipe(plumberNotifier())
        .pipe(sass())
        .pipe(autoPrefixer(AUTOPREFIXER_BROWSERS))
        .pipe(csscomb())
        .pipe(gulp.dest("./assets/css"))
        .pipe(browserSync.stream())
        .pipe(csso())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./assets/css"));
});

gulp.task("watch", ["serve"], function() {
    gulp.watch(shrotcodesDir + "*.scss", ["shortcode"]);
    gulp.watch(themesDir + "*.scss", ["theme"]);
    gulp.watch(styleCss, ["style"]);

    gulp.watch("./*.html", browserSync.reload);
    gulp.watch("./assets/js/*.js", browserSync.reload);
});

gulp.task("inject", function() {
    var vendorPaths = [
        "!./assets/vendor/jquery",
        "!./assets/vendor/slider-revolution/**",
        "!./assets/vendor/modernizr",
        "!./assets/vendor/backward",
        "!./assets/vendor/bootstrap/**",
        "!./assets/vendor/masonry",
        "./assets/vendor/**",
        "./assets/vendor/**/**",
        "./assets/vendor/**/**/**"
    ];

    var main = gulp.src([
        "./assets/vendor/modernizr/*.js",
        "./assets/vendor/jquery/**.js",
        "./assets/vendor/bootstrap/**/bootstrap.min.js",
        "./assets/vendor/bootstrap/**/bootstrap.min.css"
    ], {
        read: false
    });

    var project = gulp.src([
        "./assets/js/scripts.js",
        "./assets/css/shortcodes.css",
        "./assets/css/style.css",
        "./assets/css/default-theme.css"
    ], {
        read: false
    });

    var vendorJS = vendorPaths.map(function(item) { return item + "/*.js"; });
    var vendorCSS = vendorPaths.map(function(item) { return item + "/*.css"; });
    var libs = gulp.src(vendorJS.concat(vendorCSS), {read:false});

    return gulp.src("./*.html")
        .pipe(inject(series(main, libs, project), {relative: true}))
        .pipe(gulp.dest("./"));

    // return gulp.src("./200-resource-paths.html")
    //     .pipe(inject(series(main, libs, project), {relative: true}))
    //     .pipe(gulp.dest("./"));
});

gulp.task("script", function() {
    return gulp.src("./assets/js/scripts.js")
        .pipe(plumberNotifier())
        .pipe(uglify())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest("./assets/js/"));

});

gulp.task("html-prettify", function() {
    gulp.src('./*.html')
        .pipe(prettify({indent_char: " ", indent_size: 4}))
        .pipe(gulp.dest("./"));
});

gulp.task("default", ["serve", "shortcode", "style", "theme", "watch"]);