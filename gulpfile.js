var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var minifyJs = require('gulp-minify');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');

gulp.task('html', function() {
  return gulp.src(['./src/*.html'])
    // .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/assets/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  return gulp.src('./src/assets/js/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(minifyJs())
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('files', function() {
  return gulp.src(['./src/*.!html', './src/assets/()/*'])
  .pipe(gulp.dest('./dist').on('error', function(e){console.log(e)}))
})


gulp.task('default', [ 'html', 'sass', 'js', 'files' ]);

gulp.task('watch', function () {
  gulp.watch(['./src/assets/sass/*.scss', './src/assets/js/*.js', './src/*.html'], ['default']);
});