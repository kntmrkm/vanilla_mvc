#$          = do require "gulp-load-plugins"
#webpack    = $.webpack
webpack    = require 'webpack-stream'
source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
browserSync = require 'browser-sync'
runSequence = require 'run-sequence'
path       = require 'path'
browserify = require 'browserify'

gulp       = require 'gulp'
notify     = require 'gulp-notify'
glob       = require 'glob'
del        = require 'del'
rename     = require 'gulp-rename'
plumber    = require 'gulp-plumber' # エラーによるwatch実行中断防止
concat     = require 'gulp-concat'
bower      = require 'gulp-bower'
bowerFiles = require 'main-bower-files'
bowerWebpackPlugin = require "bower-webpack-plugin"
uglify     = require 'gulp-uglify'
minifyCSS  = require 'gulp-minify-css'
compass    = require 'gulp-compass'
sass       = require 'gulp-sass' #sass       = require 'gulp-ruby-sass'
jade       = require 'gulp-jade'
slim       = require 'gulp-slim'

paths =
  srcFiles: glob.sync('./app/*.js')
  build: './public/'
  jsBuildFile: 'app.js'
  nodeModules: './node_modules'
  bowerComponents: './bower_components'

gulp.task 'server', ->
  browserSync.init ['./public/**/*'],
    browser: 'Google Chrome'
    server:
      baseDir: "./public"  

gulp.task 'reload', ->
  browserSync.reload

gulp.task 'js', ->
  gulp.src(paths.bowerComponents + '/semantic-ui/dist/semantic.js')
    .pipe gulp.dest './public/'
  gulp.src(paths.bowerComponents + '/ratchet/dist/js/ratchet.js')
    .pipe gulp.dest './public/'  

  gulp.src './app/scripts/'
  #.pipe webpack require './webpack.config.coffee'
  .pipe webpack {
    progress: true
    entry: 
      #app: './app/initialize.coffee'
      app: './app/initialize.js'
    output: # 出力先の設定
      filename: paths.jsBuildFile
    resolve: # ファイル名の解決を設定
      root: [path.join(__dirname, './')]
      moduleDirectories: ['node_modules', 'bower_components']
      extensions: ['', '.js', '.coffee', '.webpack.js', '.web.js']
    module: # 他にもhtmlやcssを読み込む必要がある場合はここへ追記
      loaders: [
        { test: /\.coffee$/, loader: 'coffee-loader' },
        { test: /\.jade$/, loader: 'jade-loader' }
      ]
    plugins: [ # webpack用の各プラグイン
      # bower.jsonにあるパッケージをrequire出来るように
      new bowerWebpackPlugin()
      #new webpack.ProvidePlugin
      #  $: 'jquery'
      #  _: 'underscore'
    ]
  }
  .pipe plumber()
  .pipe gulp.dest paths.build
  
  ###  
  browserify
    entries: ['./app/scripts/mobile.js']
    extensions: ['.coffee','.jade', '.js']
  .transform 'coffeeify'
  .transform 'jadeify'
  .bundle().on('error', notify.onError(
      title: 'JS Compile Error.'
      message: '<%= error.message %>'
    ))
  .pipe plumber()
  .pipe source 'mobile.js'
  .pipe gulp.dest paths.build
  ###

gulp.task 'css', ->
  gulp.src paths.bowerComponents + '/ratchet/sass/**/*.scss'
    .pipe gulp.dest './app/styles/ratchet'
  gulp.src './app/styles/mobile.scss'
    .pipe sass()
    .pipe gulp.dest './public'

  #gulp.src './app/styles/**/*.scss'
  gulp.src './app/styles/app.scss'
    .pipe plumber()
    .pipe(compass(
      config_file: './compass/config.rb'
      bundle_exec: true
      comments: false
      cache: false
      http: './public'
      css: './tmp/css'
      sass: './app/styles/'
    ))
    .pipe gulp.dest './public'



gulp.task 'asset', ->
  gulp.src(paths.nodeModules + '/font-awesome/fonts/**.*')
    .pipe gulp.dest './public/fonts/font-awesome'
  gulp.src(paths.nodeModules + '/bootstrap/fonts/**.*')
    .pipe gulp.dest './public/fonts/bootstrap'  
  gulp.src(paths.bowerComponents + '/semantic-ui/dist/themes/default/assets/fonts/**.*')
    .pipe gulp.dest './public/themes/default/assets/fonts'
    .pipe gulp.dest './public/fonts/semantic-ui'    
  gulp.src(paths.bowerComponents + '/ratchet/fonts/**.*')
    .pipe gulp.dest './public/fonts/ratchet'

gulp.task 'clean-bower', ->
  del.sync('./bower_components/*')

gulp.task 'lib', ->
  return bower()
    .pipe gulp.src(bowerFiles('**/*.js'))
    .pipe plumber()
    .pipe concat('lib.js')
    .pipe gulp.dest paths.build

gulp.task 'jade', ->
  gulp
    .src './app/views/**/*.jade'
    .pipe plumber()
    .pipe jade(pretty: true)
    .pipe gulp.dest paths.build

gulp.task 'slm', ->
  gulp
    .src ['./app/views/**/*.slm', '!./app/views/**/_*.slm']
    .pipe plumber()
    .pipe slim()
    .pipe gulp.dest paths.build  

gulp.task 'slim', ->
  # renderを使うためにrails: trueにするとhtml生成されない
  # partialを使うためにはslmを利用する
  gulp
    .src ['./app/views/**/*.slim', '!./app/views/**/_*.slim']
    .pipe plumber()
    .pipe slim(
      pretty: true
      bundler: true
      )
    .pipe gulp.dest paths.build  

gulp.task 'watch', ['build', 'server'], ->
  gulp.watch 'app/**/*.coffee', ['webpack']
  gulp.watch 'app/**/*.coffee', ['js']
  gulp.watch 'app/**/*.js', ['js']
  gulp.watch 'app/scripts/**/*.jade', ['js']
  gulp.watch 'app/styles/**/*.scss', ['css', 'asset']
  gulp.watch 'app/views/**/*.jade', ['jade']
  #gulp.watch 'app/views/**/*.slm', ['slm']
  #gulp.watch 'app/views/**/*.slim', ['slim']
  gulp.watch 'bower_components/**/*.js', ['lib']

gulp.task 'clean', ->
  del.sync('./public/*')

gulp.task 'build', ->
  return runSequence(
    'clean'
    'asset'
    'lib'
    'js'
    'css'
    'jade'
    #'slm'
    #'slim'
  )  
  #['bower', 'js', 'css', 'jade']
gulp.task 'default', ['build']



