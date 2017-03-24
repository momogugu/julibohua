var gulp = require('gulp');

// Load plugins
var htmlmin = require('gulp-htmlmin'); // html压缩
var sass = require('gulp-sass'); // sass编译
var cleanCss = require('gulp-clean-css'); // css压缩
var imagemin = require('gulp-imagemin'); // 图片压缩
var jshint = require('gulp-jshint'); // js语法校验
var uglify = require('gulp-uglify'); // js压缩混淆
var cached = require('gulp-cached'); // 缓存当前任务中的插件，只让已修改的文件通过管道
var rev = require('gulp-rev-append'); // 插入文件指纹（MD5）
var del = require('del'); // 文件删除
var browserSync = require('browser-sync'); // 保存自动刷新
var runSequence = require('run-sequence'); // 规定运行顺序

// Copy
gulp.task('copy', function() {
	return gulp.src('./src/**/*')
		.pipe(gulp.dest('./dist'));
});

// Html压缩
gulp.task('miniHtml', function() {
	var options = {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
    };
    return gulp.src('./src/**/*.html')
    	.pipe(htmlmin(options))
    	.pipe(gulp.dest('./dist'));
});

// Html更新引入新版本
gulp.task('revHtml', function() {
	return gulp.src('./src/**/*.html')
		.pipe(rev())
		.pipe(gulp.dest('./src'))
    	.pipe(browserSync.reload({stream: true}));
});

// Sass编译
gulp.task('sass', function() {
	return gulp.src('./src/styles/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/styles'))
		.pipe(browserSync.reload({stream: true}));
});

// Css压缩
gulp.task('miniCss', function() {
	return gulp.src('./src/styles/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('./dist/styles'))
});

// Images
gulp.task('images', function() {
	return gulp.src('./src/images/**/*')
		.pipe(cached('images'))
		.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
		.pipe(gulp.dest('./dist/images'));
});

// JS语法检查
gulp.task('lintJs', function() {
	return gulp.src('./src/scripts/**/*.js')
		.pipe(jshint({
			'undef': false,
			'unused': true
		}))
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('./src/scripts'))
		.pipe(browserSync.stream());
});

// JS压缩
gulp.task('miniJs', function() {
	var config = {
        mangle: {except: ['define', 'require', 'module', 'exports']},
        compress: false
    };
	return gulp.src('./src/scripts/**/*.js')
		.pipe(uglify(config))
		.pipe(gulp.dest('./dist/scripts'));
});

// Clean
gulp.task('clean', function() {
	return del('./dist/**/*');
});

// Watch
gulp.task('watch', function() {
	gulp.watch('src/styles/*.scss', ['sass']);
	gulp.watch('src/scripts/*.js', ['lintJs']);
	gulp.watch('src/*.html', ['revHtml'])
});

// Dev_server
gulp.task('dev_server', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});
});

// Dev
gulp.task('dev', ['sass', 'lintJs', 'revHtml'], function() {
	gulp.start('dev_server','watch');
})

// Dist_server
gulp.task('dist_server', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	});
});

// Build
gulp.task('build', ['clean'], function(done) {
	runSequence(
		['copy'],
		['revHtml', 'sass', 'lintJs'],
		['miniHtml', 'miniCss', 'images', 'miniJs'],
		['dist_server']
		, done);
});