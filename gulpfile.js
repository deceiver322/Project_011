const gulp        = require('gulp');
const browserSync = require('browser-sync');
const autoPrefixer = require('gulp-autoprefixer');
const CleanCSS = require('clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function() {
	return gulp.src("src/sass/*.+(scss|sass)")
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({
				prefix: "",
				suffix: ".min"
			}))
			.pipe(autoPrefixer({
				browsers: ['last 2 versions'],
				cascade: false
			}))
			.pipe(CleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest("src/css"))
			.pipe(browserSync.stream());
});