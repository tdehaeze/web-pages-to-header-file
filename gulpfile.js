var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    insert = require('gulp-insert'),
    concat = require('gulp-concat'),
    path = require('path'),
    foreach = require('gulp-foreach'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglifyjs');

gulp.task('minifycss', function() {
  return gulp.src('./src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(foreach(function(stream, file){
      return stream.pipe(insert.prepend('const char PAGE_' + path.parse(file.path).name.toUpperCase() + '[] = R"=====(\n'));
    }))
    .pipe(insert.append('\n)=====";\n'))
    .pipe(concat('style.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({collapseWhitespace: true, minifyJS: true, removeComments: true}))
    .pipe(foreach(function(stream, file){
      return stream.pipe(insert.prepend('const char PAGE_' + path.parse(file.path).name.toUpperCase() + '[] = R"=====(\n'));
    }))
    .pipe(insert.append('\n)=====";\n'))
    .pipe(concat('html.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyjs', function(){
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(foreach(function(stream, file){
      return stream.pipe(insert.prepend('const char PAGE_' + path.parse(file.path).name.toUpperCase() + '[] = R"=====(\n'));
    }))
    .pipe(insert.append('\n)=====";\n'))
    .pipe(concat('script.tmp'))
    .pipe(gulp.dest('dist'));
});

gulp.task('concat', ['minifycss', 'minifyhtml', 'minifyjs'], function(){
  return gulp.src('./dist/*.tmp')
    .pipe(concat('htmlpages.h'))
    .pipe(insert.prepend('#ifndef HTMLPAGES_H_INCLUDED\n#define HTMLPAGES_H_INCLUDED\n\n'))
    .pipe(insert.append('\n#endif /* HTMLPAGES_H_INCLUDED */\n'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', ['concat'], function(){
  return gulp.src('./dist/*.tmp', {read: false})
    .pipe(clean());
});

gulp.task('default', ['minifyhtml', 'minifycss', 'minifyjs', 'concat', 'clean']);
