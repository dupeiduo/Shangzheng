'use strict';
var gulp = require('gulp'),
    $ = require("gulp-load-plugins")(),
    sass = require("gulp-sass"),
    rev = require("gulp-rev"),
    del = require('del');

gulp.task('default', function() {
  gulp.run('styles', 'jshint');
  gulp.watch('src/styles/*.scss', ['styles']);
});

gulp.task('build', $.sequence('cpfiles', 'useref', 'cphtml', 'revfile',
          'revhtml', 'delfiles', 'img','htmlmin'));


gulp.task('htmlmin', function() {
  return gulp.src(['dist/*/*.html', 'dist/*.html'])
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({ message: 'htmlmin task done' }));
});

gulp.task('delfiles', function(){
  del([
    'dist/js',
    'dist/css',
    'dist/styles',
    'dist/lib/index.html',
    'dist/lib/rev-manifest.json'
  ]);
})

gulp.task('revhtml', function () {
  return gulp.src(['dist/lib/rev-manifest.json', 'dist/lib/index.html'])
    .pipe($.revCollector())
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({ message: 'revhtml task done' }));
});

gulp.task('revfile', function(){
  return gulp.src(['dist/lib/*.css', 'dist/lib/*.js'])
    .pipe($.rev())
    .pipe(gulp.dest('dist/lib/'))
    .pipe(rev.manifest({
      path: 'rev-manifest.json',
      merge: true
    }))
    .pipe(gulp.dest("dist/lib/"))
    .pipe($.notify({ message: 'revfile task done' }));
});

gulp.task('cphtml', function(){
  return gulp.src('dist/*.html')
    .pipe(gulp.dest('dist/lib/'))
    .pipe($.notify({ message: 'copyhtml task done' }));
})

gulp.task('useref', function() {
  return gulp.src('dist/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: 'ie8'})))
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({ message: 'useref task done' }));
});

gulp.task('cpfiles', ['styles'], function(){
  return gulp.src(['src/*/*','src/*'])
    .pipe(gulp.dest('dist/'))
    .pipe($.notify({ message: 'copyfiles task done' }));
})

gulp.task('img', function() {
  return gulp.src('dist/images/*.*')
    .pipe($.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [$.imagemin()]
    }))
    .pipe(gulp.dest('dist/images/'))
    .pipe($.notify({ message: 'img task done' }));
});

gulp.task('styles', function(){
  return gulp.src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe($.notify({ message: 'sass task done' }));
})

gulp.task('jshint', function() {
  return gulp.src(['src/js/main.js','src/js/route.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.notify({ message: 'jshint task done' }));
});

gulp.task('clean', function(){
  del([
    'dist/'
    ]);
})
