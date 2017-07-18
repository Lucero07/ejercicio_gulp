const gulp = require ('gulp');
const sass = require ('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const obfuscate = require ('gulp-obfuscate');

const config = {
	source: 'src/',
	dist: './public'
};
const paths = {

	html:'**/*.html',
	sass:'assets/scss/**/*.SCSS',
	mainSass: 'assets/scss/main.scss'
};
const sources = {
	assets:config.source + paths.assets,
	html: config.source + paths.html,
	sass: paths.assets + paths.sass,
	rootSass: config.source + paths.mainSass,

};
gulp.task('html-cambios',() => {
	gulp.src(sources.html)
	.pipe(gulp.dest(config.dist));
});

gulp.task('sass',() =>{
console.log(sources.rootSass)
	gulp.src(sources.rootSass)
	.pipe(sass({
		outputStyle:'compresed'
	}).on('error',sass.logError))
	.pipe(gulp.dest(config.dist + '/css'));
});

 gulp.task('js', () =>{
	 gulp.src('src/assets/js/*.js')
	 .pipe(browserify())
	 .pipe(obfuscate())
	 .pipe(rename('bundle.js'))
	 .pipe(gulp.dest('./public/js'))
 });

 gulp.task('sass-watch',['sass'],(done)=>{
	 browserSync.reload();
	 done();
 });

 gulp.task("js-watch",["js"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("html-watch",["html-cambios"],(done)=>{
	browserSync.reload();
	done();
});

 gulp.task("default", ()=>{
 	browserSync.init({
 		server: {
 			baseDir: "./public"
 		}
 	});
 	gulp.watch("./src/assets/scss/**/*.scss", ["sass-watch"] );
 	gulp.watch("./src/assets/js/*.js", ["js-watch"] );
 	gulp.watch("./src/*.html", ["html-watch"] );
 });
