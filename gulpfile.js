const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const fileinclude = require('gulp-file-include')
const clean = require('gulp-clean')
const fs = require('fs')
const sourceMaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: './app/',
    },
  })
})

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
    .pipe(browserSync.stream())
)

gulp.task('sass', () =>
  gulp
    .src('./app/scss/style.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream())
)

gulp.task('watch', () => {
  gulp.watch('./app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('./app/html/**/*.html', gulp.parallel('html'))
  gulp.watch('./app/**/*.js').on('change', browserSync.reload)
})

const htmlClean = () => {
  if (fs.existsSync('./app/index.html')) {
    return gulp
      .src('./app/index.html', {read: false})
      .pipe(clean({forse: true}))
  }
}

const cssClean = () => {
  if (fs.existsSync('./app/style.css')) {
    return gulp
      .src('./app/style.css', {read: false})
      .pipe(clean({forse: true}))
  }
}

gulp.task('clean', done => {
  htmlClean()
  cssClean()

  done()
})

gulp.task('default',
  gulp.series('clean', 'html', 'sass',
  gulp.parallel('watch', 'server'))
)
