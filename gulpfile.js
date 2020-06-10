var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssminify = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');

/*
************** nodejs 설치가 되어 있다는 전제 하에 진행 ****************
*************************   gulp 첫 setting 시 *************************
*   [1] nodejs (https://nodejs.org/ko/) 설치 후 -> cmd에서 npm install -g gulp 명령어로 gulp 설치
*   [2] 프로젝트 폴더를 새로 만들고, 해당 폴더에서 npm init 하여 설치후, npm install --save-dev gulp 입력
*       - [ex] 명령어 중에서 --save-dev은 package.json에 직접 설치한 모듈과 버전이 기록 됨
*   [4] 정상 설치되면 node_modules 폴더가 만들어지는데, 상위 폴더(package.json과 동일 위치)에 gulpfile.js 생성 후, 아래 내용 입력
*       *********************************************
*       *   var gulp = require('gulp');             *
*       *   gulp.task('default', function(){        *
*       *   console.log('test');                    *
*       *   });                                     *
*       *********************************************
*   [5] webstorm에서는 gulpfile.js 마우스 우측 클릭 후, 'Show Gulp Task' 클릭
*   [6] gulpfile.js 에서 사용된 npm install
*   1. npm install --save-dev run-sequence
*   2. npm install --save-dev gulp-clean
*   3. npm install --save-dev node-sass gulp-sass
*   4. npm install --save-dev gulp-autoprefixer
*   5. npm install --save-dev gulp-minify-css
*   6. npm install --save-dev gulp-livereload
*   7. npm install --save-dev gulp-watch
*   8. npm install --save-dev gulp.spritesmith
*   8. npm install --save-dev gulp-imagemin
*
******* gulp 첫 setting 아니라면 : 해당 폴더에서 gulp dev 로 실행 *******
*/

/*
* gulp 명령어를 통해 실행
* [1]assets/css 디렉토리 하위 내용 삭제
* [2]sass컴파일
* */
gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'sass',
        callback);
});

/*
 * gulp dev 명령어를 통해 실행
 * [1]assets/css 디렉토리 하위 내용 삭제
 * [2]sass컴파일
 * [3]watch (scss파일을 수정할때마다 sass를 컴파일함)
 * */
gulp.task('dev', function(callback) {
    runSequence(
        'sass',
        'watch',
        callback);
});

/*
* assets/css 디렉토리 하위 내용 삭제
* */
gulp.task('clean', function() {
    return gulp.src('./assets/css/*')
        .pipe(clean({ force: true }));
});

/*
 * sass 컴파일. assets/css디렉토리로 css파일을 생성해줌
 * */

var scssOptions = {
    outputStyle : "expanded",
    indentType : "tab",
    indentWidth : 1,
    precision: 6,
    sourceComments: true
};

gulp.task('sass', function() {
    return gulp
        .src(['./src/scss/*.scss', '!./src/scss/variables.scss', '!./src/scss/mixin.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass(scssOptions).on('error', sass.logError))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(cssminify())  //minify-css 옵션 사용 시, css파일 용량 최적화
        // .pipe(livereload({start : true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('sass_support', function() {
    return gulp
        .src(['./support/src/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass(scssOptions).on('error', sass.logError))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(cssminify())  //minify-css 옵션 사용 시, css파일 용량 최적화
        // .pipe(livereload({start : true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./support/assets/css'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/images/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            padding: 4,
            cssName: 'sprite.css'
        }));
    return spriteData.pipe(gulp.dest('./assets/images/sprite'));
});

gulp.task('imagemin', function(){
    var imageminData = gulp.src('./assets/images/sprite/*.png')
        .pipe(imagemin());
    return imageminData.pipe(gulp.dest('./assets/images/sprite/opti'))
});

/*
 * scss파일을 수정할때마다 컴파일함.
 * */
gulp.task('watch', function() {
    gulp.watch(['./src/scss/*.scss', './support/src/scss/*.scss'], ['sass', 'sass_support']);
});