const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('config');	
const port = config.get('port');
const rev = require('gulp-rev');
const rm = require('rimraf');
const fs = require('fs');
const path = require('path');
const revCollector = require('gulp-rev-collector');
const merge = require('merge-stream');
const htmlmin = require('gulp-htmlmin');

const taskList = ['del', 'md5'];

gulp.task('gulpServer',function(){
	connect.server({
		port:port,
		livereload: true,
		root: '',
		debug:true,
		host:'0.0.0.0'
	});
});

gulp.task('md5', function(){
    var md5style = gulp.src('css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
    var md5script = gulp.src('js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
    
    var revs = gulp.src(['rev/**/*.json', './*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': '/dist/css',
                'js/': '/dist/js/',
                'images':'/dist/images'
            }
        }))
        .pipe(gulp.dest('dist'));    
    var md5Img = gulp.src('images/**/*.{png,jpg,jpeg,gif}')
        .pipe(rev())
        .pipe(gulp.dest('dist/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/images'));
    
    return merge(md5style, md5script, md5Img, revs);
});


gulp.task('del', function (){
    if(!fs.existsSync(path.join(__dirname, 'dist'))){
		fs.mkdirSync('dist');
	}
    rm(path.join(__dirname, 'dist', '/*'), err => {
        if (err) throw err;
    });
});

gulp.task('html-minifier', function(){
    gulp.src('dist/*.html')
        .pipe(htmlmin({ 
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS:true,
            removeComments:true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['gulpServer']);
gulp.task('build', taskList);
// gulp.watch(['js/**/*.js', 'images/**/*.{png,jpg,jpeg,gif}', 'css/**/*.css', './*.html'], taskList);