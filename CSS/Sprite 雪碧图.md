# 雪碧图自动化工具


##Type1 From CSS to Sprite
> 优点：
> 	只合成css中出现的图片，不会有多余图片
> 缺点：
> 	需要设置size
> 	构建后结果和开发结果不一致

##[gulp-sprite-generator](https://www.npmjs.com/package/gulp-sprite-generator/)
> 1.只提取`background-image`属性
> 2.抓取所有的`background-image`图片生成sprite
> 3.必须在`background-image`之前设置`width`,`height`
> 4.不能设置`background-positon`熟悉
> 5.生成的雪碧图不稳定，顺序随时会变

##Type2 From Sprite to CSS
> 优点：
> 	使用方便，只需引入类名
> 	所见即所得，开发结果与构建结果一致 
> 	
> 缺点：
> 	生成多余的css，将无用图片合入雪碧图
> 

基本使用
	
	var gulp = require('gulp');
	var sprite = require('gulp-sprite-generator');
	 
	gulp.task('sprites', function() {
	    var spriteOutput;
	 
		spriteOutput = gulp.src("./src/css/*.css")
			.pipe(sprite({
	            baseUrl:         "./src/image",
	            spriteSheetName: "sprite.png",
	            spriteSheetPath: "/dist/image"
			});
	 
	    spriteOutput.css.pipe(gulp.dest("./dist/css"));
	    spriteOutput.img.pipe(gulp.dest("./dist/image"));
	});

API

+ `opts.spritesSheetName`：必须，输出雪碧图名称
+ `opts.spritesSheetPath`：可选，输出雪碧图输出路径
+ `opts.styleSheetName`：可选，输出样式脚本名称
+ `opts.baseUrl`：可选，默认`\`，雪碧图寻路路径
+ `opts.filter`：可选，Function，过滤样式脚本中涉及的图片，参数为匹配的图片，返回false则不合并该图片


可选熟悉


###Compass

	@import "compass/utilities/sprites";

	$sprites-spacing: 10px;
	@import "mobile/sprites/*.png";

###[gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith)
> 下载量巨大，日均2K左右

基本使用

	var gulp = require('gulp');
	var spritesmith = require('gulp.spritesmith');
	 
	gulp.task('sprite', function () {
	  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
	    imgName: 'sprite.png',
	    cssName: 'sprite.css'
	  }));
	  return spriteData.pipe(gulp.dest('path/to/output/'));
	});

最后输出结果为`path/to/output/sprite.png`和`path/to/output/sprite.css`；
`spritesmith`方法返回的数据流中提供了两个单独的流，一个图片流、一个css流，我们可以直接对这两个流进行处理；
	
	var gulp = require('gulp');
	var buffer = require('vinyl-buffer');
	var csso = require('gulp-csso');
	var imagemin = require('gulp-imagemin');
	var merge = require('merge-stream');
	var spritesmith = require('gulp.spritesmith');

	gulp.task('sprite', function () {
	  	var spriteData = gulp.src('images/*.png').pipe(spritesmith({
	    	imgName: 'sprite.png',
	    	cssName: 'sprite.css'
	  	}));
	 
	  	// 将图片流进行压缩然后输出
	  	var imgStream = spriteData.img
	    	.pipe(buffer())// DEV: We must buffer our stream into a Buffer for `imagemin` 
	    	.pipe(imagemin())
	    	.pipe(gulp.dest('path/to/image/folder/'));
	 
	  	// 将CSS流进行优化然后输出
	  	var cssStream = spriteData.css
	    	.pipe(csso())
	    	.pipe(gulp.dest('path/to/css/folder/'));
	 
	  	return merge(imgStream, cssStream);
	});

API：`spritesmith(opts)`

+ `opts.imgName`：String，雪碧图名称
	* 支持的后缀名包括：`.png`，`.jpg/.jpeg`
	* 
+ `opts.cssName`：String，css文件名称
	* 支持输出格式包括`CSS`，`SASS/SCSS`，`LESS`，`Styles`，`JSON`，
	* 
+ `opts.imgPath`：String可选，
	* 
+ `opts.padding`：Number可选，图片直接的间距，默认为0；
+ `opts.algorithm`：String可选，图片拼接方法，默认为`binary-tree`
+ `opts.algorithmOpts`：Object可选
+ `opts.engine`：String可选，图片渲染引擎，默认`pixelsmith`
+ `opts.engineOpts`：Object可选
+ `opts.imgOpts`：Object可选，
+ `opts.cssFormat`：String可选，默认根据cssName的后缀名匹配
+ `opts.cssTemplate`：String|Function可选，渲染输出的CSS
+ `opts.cssHandlebarsHelpers`：
+ `opts.cssVarMap`：Function可选，遍历每一个图片文件获取文件名，返回为CSS中的变量名
+ `opts.cssSpritesheetName`：
+ `opts.cssOpts`：





