#ES6
> ES6 也叫 ES 2015，被命名为Harmony

##Babel
> JavaScript编译器：可以把用最新标准编写的JavaScript代码转化为当下可用的版本；
> 语法扩展：它的的插件机制使得Babel几乎可以做任何事情；

Babel中有两个概念需要理解，preset和polyfill：

+ `preset`：Babel转码规则，Babel本身并不包含任何转码规则，必须通过preset来指定转码规则；
+ `polyfill`：Babel默认只进行JavaScript语法转换，并不进行新API处理。polyfill可以添加一个垫片来进行兼容；

####配置文件
> Babel 配置文件是使用Babel的必须步骤，Babel在当前目录寻找`.babelrc`配置文件，如果没有就向上查找，直到找到`.babelrc`或`package.json`
> 通过任何形式使用Babel都无法指定preset，
> Babel会使用配置文件中的信息进行相应转换；

Type1. 创建配置文件为`.babelrc`，基本格式如下：

	{
		"presets": [
			"es2015",
			"react",
			"stage-2"
	  	],
	  	"plugins": []
	}

Type2. 通过Package.json文件配置
	
	{
	  "name": "",
	  "version": "1.0.0",
	  "babel": {
	    // Babel配置项
	  }
	}



[详细配置项](http://babeljs.io/docs/usage/options/)

####Babel使用：
+ *babel-cli*：一个命令行工具，可以在命令行下使用babel进行编译
	* 安装：`npm install -g babel-cli`，但是不推荐全局安装，最好在每个项目中单独安装，`npm install --save-dev babel-cli`
	* 使用：
		- `babel index.js`：编译index.js后输出到标准输出
		- `babel index.js --out-file compiled.js`：编译后生成编译后新文件，`--out-file`也可以写成`-o`
		- `babel src --output-dir dist`：编译src目录，输出到dist目录，`--out-file`也可以写成`-d`
+ *配合webpak、gulp等构件工具使用*：
+ babel-node：babel-cli自带的一个命令行工具，在执行执行线进行babel转码，`babel-node app.js`，实时转码，不推荐在正式环境使用；
+ babel-register：通过改下`require`命令，使得`require`命令在加载模块之前先进行Babel转码；但是不会对当前文件转码；实时转码，不推荐在正式环境使用；
	* `npm install --save-dev babel-register`
	* `require("babel-register")`
	* `require("./index.js")`
+ babel-core：使用babel-core可以以编程的方式对代码字符串进行转码

```
	$ npm install babel-core

	var babel = require("babel-core");
	// 代码转化
	babel.transform("code();", options);
	// 异步文件转化
	babel.transformFile("filename.js", options, function(err, result) {
	  result; // => { code, map, ast }
	});
	// 同步方式转化
	babel.transformFileSync("filename.js", options);
	// => { code, map, ast }
```



####Babel Preset
+ 官方presets：年化的preset只转换当年批准的标准，`preset-last`转换全部；
	* `babel-preset-es2015`：
	* `babel-preset-es2016`：
	* `babel-preset-es2017`：
	* `babel-preset-last`：
	* `babel-preset-react`：编译react的jsx语法
+ `babel-preset-stage-x`：对于未来的ES7虽然为被最后确定，但是也已经有了一些提案，这些提案包括4个阶段，对应一下的预设
	* `babel-preset-stage-0`
	* `babel-preset-stage-1`
	* `babel-preset-stage-2`
	* `babel-preset-stage-3`

使用的时候只需要在配置文件中声明就可以了：

	$ npm install --save-dev babel-preset-stage-2

	{
		"presets": [
	    	"es2015",
	      	"react",
			"stage-2"
	    ],
	    "plugins": []
	}

####Babel Polyfill
> 新语法支持垫片，例如Promise Map Set Array.from等；
> babel-polyfill使用[core.js](https://github.com/zloirock/core-js)和[regenerator](https://facebook.github.io/regenerator)

+ 安装：`$ npm install --save babel-polyfill`
+ 使用：`import 'babel-polyfill';`或者`require('babel-polyfill');`

####Babel Plugins

####Babel With Gulp
+ 安装：`npm install --save-dev babel-loader babel-core`
+ 使用：需要使用配置文件配置转换规则

```
	var gulp = require("gulp");
	var sourcemaps = require("gulp-sourcemaps");
	var babel = require("gulp-babel");
	var concat = require("gulp-concat");

	gulp.task("default", function () {
	  return gulp.src("src/**/*.js")
	    .pipe(sourcemaps.init())
	    .pipe(babel())
	    .pipe(concat("all.js"))
	    .pipe(sourcemaps.write("."))
	    .pipe(gulp.dest("dist"));
	});
```

####Babel With Webpack
+ 安装：`npm install --save-dev gulp-babel`
+ 使用：需要使用配置文件配置转换规则

```
	module: {
	  loaders: [
	    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
	  ]
	}
```

























