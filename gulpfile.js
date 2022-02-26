const { src, dest, series, watch, parallel } = require('gulp');

const scss = require('gulp-sass');
const notify = require('gulp-notify'); //better error event handler
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const del = require('del');
const babel = require('gulp-babel');
const { on } = require('gulp-notify/lib/notify');


//LIVE SERVER
const browserSyncFunc = () => {

}

//HTML
const html = () => {
    return src('./src/index.html')
        .pipe(fileInclude())
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

//SCSS
const styles = () => {
    return src('./src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(scss.sync().on('error', notify.onError()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS({ level: 2 }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/assets/css'))
        .pipe(browserSync.stream())
}

//JS 
const scripts = () => {
    return src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        // .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/assets/js'))
        .pipe(browserSync.stream())
}

//WATCHER
const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./dist",
            notify: false
        }
    });
    watch(['./src/sites/**/*.html'], html);
    watch(['./src/scss/**/*.scss'], styles);
    watch(['./src/js/**/*.js'], scripts);
    watch(["./src/index.html"]).on('change', function () {
        html();
        setTimeout(() => {
            del(['./dist/parts/'])
        }, 500)
    });

}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watcher = watcher;
// exports.browserSyncFunc = browserSyncFunc;

exports.default = parallel(watcher);