var gulp			= require('gulp');
var gulpSass 		= require('gulp-sass');
var gulpConcat 		= require('gulp-concat');
var gulpImagemin	= require('gulp-imagemin');
var browserSync		= require('browser-sync');



var config = {
	bowerDir: './bower_components' 
}

//convert sass to css
gulp.task('css', function(){
	return gulp.src(
		[
		config.bowerDir + '/font-awesome/scss/font-awesome.scss',
		config.bowerDir + '/bootstrap/scss/bootstrap-grid.scss',
		'src/sass/*.scss'
		])
	.pipe( gulpSass({outputStyle: 'compressed'}).on('error', gulpSass.logError) )
	.pipe( gulpConcat('main.css') )
	.pipe( gulp.dest('build/assets/css') );
});

//font awesome
gulp.task('font-icon', function(){
	return gulp.src( config.bowerDir + '/font-awesome/fonts/**.*' )
	.pipe( gulp.dest('build/assets/fonts') );
});

//image (optimize and transfer)
gulp.task('image', function(){
	return gulp.src( 'src/image/*' )
	.pipe( gulpImagemin() )
	.pipe ( gulp.dest('build/assets/image') );
})

//convert js many to 1 file
gulp.task('script', function(){
	return gulp.src( [ config.bowerDir + '/vue/dist/vue.js', 'src/js/*.js' ] )
	.pipe( gulpConcat('main.js') )
	.pipe( gulp.dest('build/assets/js') );
});

//compile all
gulp.task('build', ['style', 'font-icon', 'script', 'image'] );

//watch browserync (live reload)
gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './build/'
		}
	});
});

//default
gulp.task('default', ['serve', 'css', 'script'], function(){
	gulp.watch('./src/sass/*.scss', ['css']);
	gulp.watch('./build/assets/css/*.css').on('change', browserSync.reload);
	gulp.watch('./src/js/*,js', ['script']);
	gulp.watch('./build/*.html').on( 'change', browserSync.reload);
});
