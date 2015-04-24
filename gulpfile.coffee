source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
browserify = require 'browserify'
browserSync = require 'browser-sync'
runSequence = require 'run-sequence'

gulp       = require 'gulp'
notify     = require 'gulp-notify'
glob       = require 'glob'
rename     = require 'gulp-rename'
plumber    = require 'gulp-plumber' # エラーによるwatch実行中断防止
concat     = require 'gulp-concat'
uglify     = require 'gulp-uglify'
minifyCSS  = require 'gulp-minify-css'
compass    = require 'gulp-compass'
#sass       = require 'gulp-sass'
#sass       = require 'gulp-ruby-sass'
jade       = require 'gulp-jade'
bowerFiles = require 'main-bower-files'

paths =
  srcFiles: glob.sync('./app/*.js')
  build: './public/'
  jsBuildFile: 'app.js'

gulp.task 'server', ->
  browserSync.init ['./public/**/*'],
    server:
      baseDir: "./public"  

gulp.task 'reload', ->
  browserSync.reload

gulp.task 'js', ->
  # jadeはtemplates
  browserify
    entries: paths.srcFiles #['./app/initialize.coffee']
    # 拡張子を指定しておくことで、require時に省略可能
    extensions: ['.coffee','.jade', '.js']
  .transform 'coffeeify'
  .transform 'jadeify'
  .bundle().on('error', notify.onError(
      title: 'JS Compile Error.'
      message: '<%= error.message %>'
    ))
  .pipe plumber()
  .pipe source paths.jsBuildFile
  .pipe gulp.dest paths.build

gulp.task 'bower', ->
  return gulp.src(bowerFiles())
    .pipe plumber()
    .pipe concat('bower.js')
    .pipe gulp.dest('./public')

gulp.task 'css', ->
  gulp
    .src './app/styles/**/*.scss'
    .pipe plumber()
    .pipe(compass(
      config_file: './app/styles/config.rb'
      comments: false
      cache: false
      css: './public/css/'
      sass: './app/styles/'
    ))
    .pipe gulp.dest './public'

gulp.task 'jade', ->
  gulp
    .src './app/views/*.jade'
    .pipe plumber()
    .pipe jade(pretty: true)
    .pipe gulp.dest './public'    

gulp.task 'watch', ['build', 'server'], ->
  gulp.watch 'app/**/*.coffee', ['js', 'reload']
  gulp.watch 'app/**/*.js', ['js', 'reload']
  gulp.watch 'app/scripts/**/*.jade', ['js', 'reload']
  gulp.watch 'app/styles/**/*.scss', ['css', 'reload']
  gulp.watch 'app/views/**/*.jade', ['jade']
  gulp.watch 'bower_components/**/*.js', ['bower', 'reload']

gulp.task 'build', ->
  return runSequence(
    'bower'
    'js'
    'css'
    'jade'
  )  
  #['bower', 'js', 'css', 'jade']
gulp.task 'default', ['build']



