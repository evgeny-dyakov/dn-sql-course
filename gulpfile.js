const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const fileinclude = require('gulp-file-include')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const server = require('gulp-server-livereload')

gulp.task('html', () =>
  gulp
    .src(['./app/html/index.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('./app'))
)

gulp.task('sass', () =>
  gulp
    .src('./app/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./app'))
)

gulp.task('watch', () => {
  gulp.watch('./app/html/**/*.html', gulp.parallel('html'))
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('sass'))
})

gulp.task('server', () =>
  gulp
    .src('./app/')
    .pipe(server({
      livereload: true,
      open: true,
    })
  )
)

gulp.task('htmlClean', done => {
  if (fs.existsSync('./app/index.html')) {
    return gulp
      .src('./app/index.html', {read: false})
      .pipe(clean({forse: true}))
  }
  done()
})

gulp.task('cssClean', done => {
  if (fs.existsSync('./app/style.css')) {
    return gulp
      .src('./app/style.css', {read: false})
      .pipe(clean({forse: true}))
  }
  done()
})

gulp.task('default', gulp.series(
  'htmlClean',
  'cssClean',
  'sass',
  'html',
  'server',
  'watch'
))
