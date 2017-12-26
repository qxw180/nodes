#[RequireJS](http://requirejs.org/)
> `require.js`是AMD规范的实现，`require.js`解决了一下两个问题
1. 实现js异步加载，避免网页失去响应；[参考](http://blog.163.com/ued_er/blog/static/199703159201111715036248/)
2. 模块之间的依赖性维护，便于代码编写和维护；

##模块定义
> RequireJS要求每个模块放在一个单独的文件里；
> 按照是否依赖其它模块分为独立模块和非独立模块；

	// 独立模块
	define(function(){
		...
		return {
			a:functionA(){},
			b:functionB(){}
		};
	})

	// 非独立模块
	define([jquery,tools],function($,tools){
		$.function_get();
		tools.function_fix();
		...
		return {...};
	})

	// 定义模块同时定义别名
	define(mName,[depts],function(attr){

	});
	
第一个参数是数组，数组成员是当前模块所依赖的模块
第二个参数是一个回调函数，依赖模块加载完成后会执行该方法；函数的参数与之前的依赖模块一一对应；

如果依赖模块非常多那么伊朗模块和回调函数参数的对应就会非常麻烦，像下面一样；

	define([m1,m2,m3,m4....],function(a1,a2,a3,a4...){

	})

我们可以使用下面这种简写的方式

	define(function(require){
		var a1 = require("m1"),
			a2 = require("m2"),
			a3 = require("m3"),
			a4 = require("m4"),
			...
	});


##程序入口&模块调用
	
	// data-main为程序入口脚本文件
	<script data-main="scripts/main" src="scripts/require.js"></script>
	// require方法用于调用模块，参数与模块定义相同
	require([m1,m2],function("a1","a2"){

	});



##错误处理
> require方法支持三个参数， 第三个参数为错误处理回调函数，接受一个error对象参数

	require(
		[m1],
		function(a1){	},
		function(error){	}
	)

> 全局Error事件监听

	requirejs.onError = function(e){

	}

##配置
> require方法本身也是一个对象，require的`config`方法可以用来配置require.js的运行参数；

	require.config = {
		paths:{
			jquery:[
				'//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js',
	            'lib/jquery'
			],
			...
		},
		shim:{
			"zepot":{
				exports:"$"
			},
			"tools":{
				deps:["zepto"],
				exports:"tools"
			}
		}
	}

 参数介绍
 1. `paths`：指定各模块位置，该位置可以为同服务器相对位置，也可以是互联网位置；可以使用数组声明多个位置，如果第一个失败就加载第二个位置；
 2. `baseUrl`：本地模块根路径以`.js`和含有版本协议的模块不受此属性映像；
 	1. 如果为指定则默认为加载`require.js`所在的模版目录；
 	2. 如果指定`data-main`入口文件，则为入口文件所在路径；
 	3. 以下情况不会使用`baseUrl`
 		1. 模块路径以`\`开头；
 		2. 模块路径以`.js`结尾；
 		3. 模块路径包含协议；
 3. `shim`：处理未实现AMD规范的库，
 		1. `deps`：依赖关系，该模块的依赖模块
		2. `exports`：输出符号，模版被调用时的名称
 4. `urlArgs`：加载模块时，在模块路径后加的额外参数，可以用来进行模块版本控制，处理浏览器缓存；
 5. 

> 如果`require.config`在require.js加载之前，直接调用`require.config`会报错，
> 这时可以通过声明一个全局变量来注入配置参数来实现

	var require = {
		baseUrl:'/lib',
		...
	}
	<script src="scripts/require.js"></script>

##小技巧

> 判断浏览器选择加载zepto或jquery

	define(("__proto__" in {} ? ["zepto"] : ["jquery"]),function("$"){
		...
	})


##打包优化 r.js
> r.js是一个基于node命令行工具，用来压缩多个js文件，可以将多个模块合并成一个脚步文件，以减少http请求数；

1. 安装：`npm install -g reqirejs`
2. 打包：`node r.js -o bulid.js`

`build.js`是`r.js`打包过程的一些配置项，主要配置内容如下
1. `appDir`：项目目录，相对应参数文件位置
2. `baseUrl`：js文件位置
3. `dir`：输出目录
4. `modules`：优化模块列表对象，每一个项都是需要优化的模块
5. `paths`：各模块的相对路径，可以省略`.js`后缀；当值为`"empty:"`时表示优化的时候不进行代码合并；
6. `fileExclusionRegExp`：排除文件正则表达式，匹配的文件都不会被处理；






##参考资源
[RequireJS进阶:配置文件的学习](https://segmentfault.com/a/1190000002401665#articleHeader0)
[RequireJS进阶:模块的优化及配置的详解](https://segmentfault.com/a/1190000002403806)








