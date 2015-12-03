#Gulp
	`npm install gulp`
	gulp借鉴了Unix的管道(pipe)思想，前一级输出，直接变成后一级的输入；

##Gulp API
+ <b>src方法：</b>`gulp.src(globs[,options])`指定需要处理的原文件，pipe到可用的插件；
	* <small>globs：必填，`String or StringArray`类型，文件路径；采用`node-glob`模块实现文件匹配；
		+ `src/a.js`：指定具体文件；
		+ `*`：匹配所有文件    例：src/*.js(包含src下的所有js文件)；
		+ `**`：匹配0个或多个子文件夹    例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
		+ `{}`：匹配多个属性    例：src/{a,b}.js(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
		+ `!`：排除文件    例：!src/a.js(不包含src下的a.js文件)；
	* options:选填
		+ `options.buffer`：类型：Boolean  默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
		+ `options.read`：类型：Boolean  默认：true 设置false，将不执行读取文件操作，`file.contents`返回null；
		+ `options.base`：类型：String  设置输出路径以某个路径的某个组成部分为基础向后拼接，具体看下面示例：</small>
		<small><code><pre>
			gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
			gulp.src('client/js/**/*.js', { base: 'client' })
			  .pipe(minify())
			  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'
		</pre></code></small>

+ <b>dest方法：</b>`gulp.dest(path[,options])`指定处理完成文件输出路径；只能指定生成文件的目录，不能指定生成文件的文件名；
	* <small>path：必填，`String or Function`，指定文件的输出路径，或者通过函数返回文件输出路径；
		- String路径中不包含通配符的情况下，输入路径为`path`+匹配文件；
		- String路径中包含通配符的情况下，输入路径为`path`+通配符起始位置后路径；
		- 可以通过`gulp.src()`中的`base`属性灵活指定生成文件路径；`base`属性可以指定输入路径的匹配位置；
	* option：选填
		- `options.cwd`：类型：String  默认：process.cwd()：前脚本的工作目录的路径 当文件输出路径为相对路径将会用到；
		- `options.mode`：类型：String  默认：0777 指定被创建文件夹的权限；</small>
+ <b>task方法：</b>`gulp.task(name[,deps],function)`，定义gulp任务；
	* <small>name：必填，`String`，指定任务名称，不应该有空格
	* deps：选填，`StringArray`指定该任务的依赖任务，被依赖任务需要返回当前任务的事件流
	* function：必填，`Function`，该任务调用的插件操作；</small>
+ <b>watch方法：</b>`gulp.watch(glob,[,opts],task)`or`gulp.watch(glob[,opts,cb])`，监听文件变化，执行特定任务；
	* <small>glob：需要处理的源文件匹配符路径。类型(必填)：String or StringArray；
	* opts：(可选)：Object 具体参看https://github.com/shama/gaze；
	* tasks：(必填)：StringArray 需要执行的任务的名称数组；
	* cb(event)：类型(可选)：Function 每个文件变化执行的回调函数；</small>

##插件加载：[`gulp-load-plugins`](https://www.npmjs.com/package/gulp-load-plugins "官方网站")

> 插件安装：`npm install --save-dev gulp-load-plugins`
> 自动加载package.json中的插件

	var gulp = require('gulp');
	var var plugins = require('gulp-load-plugins')();

插件读取package.json文件并自动加载了插件，加载后插件的名字是去掉`gulp-`然后将改为驼峰命名

	plugins.jshint = require('gulp-jshint');	

我们可以通过以下这种方式调用插件

	plugins.jshint();


##文件清理：[`gulp-clean`](https://www.npmjs.com/package/gulp-clean "官方网站")

> 插件安装：`npm install --save-dev gulp-clean`

	var gulp = require('gulp');
	var clean = require('gulp-clean');
	 
	gulp.task('default', function () {
	    return gulp.src('app/tmp', {read: false})
	        .pipe(clean());
	});

`read:false`属性阻止从文件读取内容，是任务运行更加快捷，如果在删除之后任然需要操作这些文件，那么需要将这些文件读取到`stream`中，这时不要设置`read:false`

	gulp.task('default', function () {
	    return gulp.src('app/tmp/index.js')
	        .pipe(clean({force: true}))
	        .pipe(gulp.dest('dist'));
	});

因为安全限制原因，在工作目录外的文件和目录是不允许删除的，除非设置`force:true`

##重命名文件：[`gulp-rename`](https://www.npmjs.com/package/gulp-rename "官方网站")

> 插件安装：`npm install --save-dev gulp-rename`
	
	var rename = require("gulp-rename");
	 
	// rename via string 
	gulp.src("./src/main/text/hello.txt")
	  .pipe(rename("main/text/ciao/goodbye.md"))
	  .pipe(gulp.dest("./dist")// ./dist/main/text/ciao/goodbye.md 
	); 
	 
	// rename via function 
	gulp.src("./src/**/hello.txt")
	  .pipe(rename(function (path) {
	    path.dirname += "/ciao";
	    path.basename += "-goodbye";
	    path.extname = ".md"
	  }))
	  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/hello-goodbye.md 
	 
	// rename via hash 
	gulp.src("./src/main/text/hello.txt", { base: process.cwd() })
	  .pipe(rename({
	    dirname: "main/text/ciao",
	    basename: "aloha",
	    prefix: "bonjour-",
	    suffix: "-hola",
	    extname: ".md"
	  }))
	  .pipe(gulp.dest("./dist")); // ./dist/main/text/ciao/bonjour-aloha-hola.md

##文件合并：[`gulp-concat`](https://www.npmjs.com/package/gulp-concat "官方网站")

> 插件安装：`npm install --save-dev gulp-concat`

	var concat = require('gulp-concat');
	 
	gulp.task('scripts', function() {
	  return gulp.src('./lib/*.js')
	    .pipe(concat('all.js'))
	    .pipe(gulp.dest('./dist/'));
	});

插件默认以换行分割合并的各个文件；可以通过`concat`方法的第二个参数设置`newLine`属性来定义连接分割；

	.pipe(concat('main.js', {newLine: ';'}))

插件接受通过第一个参数传入object对象来设置`cwd,path`等[`vinyl`](https://github.com/gulpjs/vinyl)属性

	gulp.task('scripts', function() {
	  return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
	    .pipe(concat({ path: 'new.js', stat: { mode: 0666 }}))
	    .pipe(gulp.dest('./dist'));
	});

##资源合并：[`gulp-useref`](https://www.npmjs.com/package/gulp-useref  "官方网站")

> 合并HTML中的`build block`中的资源文件，但不会进行压缩；
> 插件安装：`npm install --save-dev gulp-useref`

`build block`声明

	<html>
	<head>
	    <!-- build:css css/combined.css -->
	    <link href="css/one.css" rel="stylesheet">
	    <link href="css/two.css" rel="stylesheet">
	    <!-- endbuild -->
	</head>
	<body>
	    <!-- build:js scripts/combined.js -->
	    <script type="text/javascript" src="scripts/one.js"></script> 
	    <script type="text/javascript" src="scripts/two.js"></script> 
	    <!-- endbuild -->
	</body>
	</html>

资源合并

	gulp.task('html', function () {
	    return gulp.src('app/*.html')
	        .pipe(useref())
	        .pipe(gulpif('*.js', uglify()))
	        .pipe(gulpif('*.css', minifyCss()))
	        .pipe(gulp.dest('dist'));
	});

合并结果

	<html>
	<head>
	    <link rel="stylesheet" href="css/combined.css"/>
	</head>
	<body>
	    <script src="scripts/combined.js"></script> 
	</body>
	</html>

> API

##文本替换：[`gulp-replace`](https://www.npmjs.com/package/gulp-replace "官方网站")

> 插件安装：`npm install --save-dev gulp-replace`
> API:`replace(string|reg, replacement[, options])`
> <small>string|reg：String|RegExp类型，匹配字符串；
> replacement：String或Function类型，替换字符串或这替换方法，function会传入匹配字符串做为参数；
> options：选填，Object类型，options.skipBinary：跳过二进制文件，默认false；</small>

正则匹配替换

	var replace = require('gulp-replace');

	gulp.task('templates', function(){
	  gulp.src(['file.txt'])
	    .pipe(replace(/foo(.{3})/g, '$1foo'))
	    .pipe(gulp.dest('build/file.txt'));
	});

字符串匹配替换
	
	gulp.task('templates', function(){
	  gulp.src(['file.txt'])
	    .pipe(replace('bar', 'foo'))
	    .pipe(gulp.dest('build/file.txt'));
	});

##静态资源版本生成：[`gulp-rev`](https://www.npmjs.com/package/gulp-rev "官方网站")

> 根据静态资源的修改时间，生成带版本前最的文件，并生成配置文件；
> 插件安装：`npm install --save-dev gulp-rev`
> API：
> `rev()`：生成带版本前缀的文件
> `rev.manifest([path], [options])`：生成配置文件
> <small>path:：String类型，配置文件路径，默认`rev-manifest.json`
> options：
> > base：String类型，默认`process.cwd()`,覆盖配置文件的base
> > cwd：String类型，默认`process.cwd()`,覆盖配置文件的当前工作目录(Current Working Directory)
> > merge：Boolean类型，默认`false`，是否合并已存在的配置文件；</small>

	var rev = require('gulp-rev');
	 
	gulp.task('default', function () {
	    return gulp.src('src/*.css')
	        .pipe(rev())
	        .pipe(gulp.dest('dist'))
	        .pipe(rev.manifest())
            .pipe(gulp.dest('build/assets'));
	});


##页面引用版本控制：[`gulp-rev-easy`](https://www.npmjs.com/package/gulp-rev-easy "官方网站")

> 方便的为引用静态资源添加版本号
> > 插件安装：`npm install --save-dev gulp-rev-easy`
> API:`reveasy([options])`
> <small>`options.base`：type:String;默认：file.cwd；设置静态资源的base directory
> `options.revType`：type:['hash'|date']；default:'hash'；设置版本号类型；
> `options.dateFormat`：type:string；default:'yyyymmddHHMM'；定义date版本号类型
> `options.hashLength`：type:integer；default:8；定义hash版本号长度
> `options.suffix`；type:string；default:v；定义版本号名称；
> `options.fileTypes`：type:array；default:['js','css','img']；定义处理静态资源类型；
> `options.elementAttributes`：type:Object；自定义版本号管理标签；
> </small>

	gulp.task("revJs",function () {
		gulp.src("resources/views/**/*.php")
			.pipe(rev({
						base:"public",
						fileTypes:["jsr"],//自定义匹配规则
						elementAttributes:{
				            jsr:{
				                name:'script',//被匹配的html标签名
				                src:'data-main'//被匹配的标签属性
				            }
				        }
					}))
			.pipe(gulp.dest("resources/views/"))
	})

##文件cache-busting：[`gulp-rev-append`](https://www.npmjs.com/package/gulp-rev-append/ "官方网站")

> 插件通过正则`(?:href|src)="(.*)[\?]rev=(.*)[\"]`来匹配HTML文件中的声明的style和scripts脚步；为其添加hash字符串后缀；
> 需要在html文件为assets资源路径添加`?rev=@@hash`后缀，`@@hash`不是必须的；
> hash后缀只有在文件内容变化后才会变化，因为插件是根据文件的内容生成的hash值
> 插件安装：`npm install --save-dev gulp-rev-append`

	var rev = require('gulp-rev-append');
	 
	gulp.task('rev', function() {
	  gulp.src('./index.html')
	    .pipe(rev())
	    .pipe(gulp.dest('.'));
	});

例如

	<head>
		<link rel="stylesheet" type="text/css" href="style/style-one.css?rev=@@hash">
		<script src="script/script-one.js?rev=@@hash"></script> 
		<script src="script/script-two.js"></script> 
	</head>

转换为

	<head>
		<link rel="stylesheet" type="text/css" href="style/style-one.css?rev=d65aaba987e9c1eefeb4be9cfd34e0de">
		<script src="script/script-one.js?rev=17a5da6c8a2d875cf48aefb722eefa07"></script> 
		<script src="script/script-two.js"></script> 
	</head>


##根据`mainfests`文件，替换HTML模版静态资源链接：

###[`gulp-rev-collector`](https://www.npmjs.com/package/gulp-rev-collector/ "官方网站")

> 插件安装：`npm install --save-dev gulp-rev-collector`
> 插件可以从多个`mainfests`文件中获取rev信息，然后根据收集的信息替换模版中的静态资源；

	gulp.task('rev', function () {
	    return gulp.src(['rev/**/*.json', 'templates/**/*.html'])
	        .pipe( revCollector({
	            replaceReved: true,
	            dirReplacements: {
	                'css': '/dist/css',
	                '/js/': '/dist/js/',
	                'cdn/': function(manifest_value) {
	                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
	                }
	            }
	        }) )
	        .pipe( gulp.dest('dist') );
	});


> API：`revCollector(options)`//options：Object类型；
>> replaceReved：默认：false，标记是否替换模版中已经替换的链接；
>> dirReplacements：设置替换链接的目录地址；

###[`gulp-rev-replace`](https://www.npmjs.com/package/gulp-rev-replace/ "官方网站")

> 插件安装：`npm install --save-dev gulp-rev-replace`

	gulp.task("revreplace", ["revision"], function(){
	  var manifest = gulp.src("./" + opt.distFolder + "/rev-manifest.json");
	 
	  return gulp.src(opt.srcFolder + "/index.html")
	    .pipe(revReplace({manifest: manifest}))
	    .pipe(gulp.dest(opt.distFolder));
	});

> API：`revReplace(options)`//options：Object类型；
>> 


##JS压缩：`gulp-uglify`

> 插件安装：`npm install --save-dev gulp-uglify`

	var uglify = require('gulp-uglify');
	 
	gulp.task('compress', function() {
	  return gulp.src('lib/*.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('dist'));
	});

> API：`uglify([opts])`
>> `mangle`：类型：Boolean，默认：true；是否处理变量名

##JS检测：`gulp-jshint`、`gulp-jslint`
> jshint是一个侦测javascript代码中错误和潜在问题的工具。
> jslint是一个javascript代码质量检测工具。

##图片压缩：[`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin "官方网站")

> 插件安装：`npm install --save-dev gulp-imagemin`
	
	const gulp = require('gulp');
	const imagemin = require('gulp-imagemin');
	const pngquant = require('imagemin-pngquant');

	gulp.task('default', () => {
	    return gulp.src('src/images/*')
	        .pipe(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        }))
	        .pipe(gulp.dest('dist/images'));
	});

> API：`imagemin([options])`
>> `optimizationLevel`：类型：Number  默认：3  取值范围：0-7（优化等级）；等级越高压缩越高；
>> `progressive`：类型：Boolean 默认：false 无损压缩jpg图片
>> `interlaced`：类型：Boolean 默认：false 交叉扫描gif进行渲染
>> `multipass`：类型：Boolean 默认：false 对svg进行多次优化知道最佳
>> `svgoPlugins`：类型：Array 默认：[] 自定义[SVGO插件](https://github.com/sindresorhus/grunt-svgmin#available-optionsplugins "More")
>>  `use`：类型：Array 默认：null 附加图片压缩插件



##CSS压缩：`gulp-minify-css`
##SASS编译：`gulp-sass`
##HTML压缩：`gulp-minifu-html`
##HTML处理：`gulp-processhtml`

##WEB服务：`gulp-connect`

> 插件安装：`npm install --save-dev gulp-connect`

基本使用

	var gulp = require('gulp'),
	  connect = require('gulp-connect');
	 
	gulp.task('connect', function() {
	  connect.server();
	});
	 
	gulp.task('default', ['connect']);

LiveReload

	var gulp = require('gulp'),
	  connect = require('gulp-connect');
	 
	gulp.task('connect', function() {
	  connect.server({
	    root: 'app',
	    livereload: true
	  });
	});
	 
	gulp.task('html', function () {
	  gulp.src('./app/*.html')
	    .pipe(connect.reload());
	});
	 
	gulp.task('watch', function () {
	  gulp.watch(['./app/*.html'], ['html']);
	});
	 
	gulp.task('default', ['connect', 'watch']);

> API：
> `connect.server({opts})`：启动服务器
>> `options.root`：根目录，类型：Array或String，默认 gulpfile所在目录；
>> `options.port`：服务器启动端口，类型：Number，默认 8080；
>> `options.host`：服务器地址，类型：String，默认 localhost；
>> `options.https`：服务器是否使用https协议，类型：Boolean，默认 false；
>> `options.livereload`：服务器是否支持livereload，类型：Boolean，默认 false；
>> `options.livereload.port`：服务器livereload端口，类型：Number，默认 35729；
> `connect.reload()`：触发livereload
> `connect.serverClose()`：关闭服务器