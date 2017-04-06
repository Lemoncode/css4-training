const os = require('os'),
      gulp = require('gulp'),
      connect = require('gulp-connect'),
      open = require('gulp-open'),
      sass = require('gulp-sass');

const serverOptions = {
  root: 'src',
  port: 9011,
  livereload: true
};

const resolveBrowser = () => {
  let browser;

  switch (os.platform()) {
    case 'darwin':
      browser = 'google chrome';
      break;
    case 'win32':
      browser = 'chrome';
      break;
    case 'linux':
      browser = 'google-chrome';
      break;
  }

  return browser;
};

const openOptions = {
  uri: `http://localhost:${serverOptions.port}`,
  app: resolveBrowser()
};

gulp.task('sass',
  () => gulp.src('./src/sass/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./src/content'))
);

gulp.task('sass:watch', () => gulp.watch('./src/sass/**/*.scss', ['sass']));


gulp.task('reload', () => gulp.src('./src/**/*').pipe(connect.reload()));

gulp.task('watch', () => gulp.watch(['./src/**/*'], ['reload'])); // Add compile SASS

gulp.task('open', () => gulp.src(__filename).pipe(open(openOptions)));

gulp.task('connect', () => connect.server(serverOptions));

gulp.task('default', ['connect', 'open', 'sass', 'sass:watch', 'watch']);
