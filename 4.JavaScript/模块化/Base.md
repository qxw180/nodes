#JavaScript 模块化

JavaScript没有类的概念
污染全局变量

模块话的意义
+ 方便开发维护
+ 重用

##[实现方式](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)

####对象写法
	var module = {
		v1: 100,
		f1: function(){},
		f2: function(){}
	}

	module.f1();
缺点会暴露模块程序，模块内部成员可以被修改

####立即执行函数 IIFE
	var module1 = (function(){
		var _count: 0;
		var f1 = function(){}	
		var f2 = function(){}	

		return {
			f1: f1,
			f2: f2
		}
	})()
缺点模块过大，或者依赖其它模块就无法满足需求

####放大模式
	var module1 = (function(module){
		module.f3 = function(){};
		return module;
	})(module1)
放大模块可以实现模块继承，为`model1`模块添加了方法`f3`

####宽放大模式
	var module1 = (function(module){
		return module
	})(window.module1 || {})
在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。

##JavaScript模块化规范

####CommngJS
模块同步加载规范，模块加载完成后执行
因为NodeJs主要用于服务器编程，模块位于本地硬盘，加载笔记不需要考虑异步情况，所以适合采用CommonJS规范
+ 一个js文件就是一个模块
+ 模块最后返回一个exports对象
+ 使用require方法加载模块
+ 加载模块后执行，最后获取模块的exports对象

	// 模块定义 example.js
	exports = {
		message:'CommonJs Module Demo',
		sayHello: function(){
			console.log("Hello CommonJS");
		}
	}
	// 模块加载
	var example = require('example.js');
	example.sayHello(); // Hello CommonJS


####AMD
模块异步加载规范，允许指定回调函数
浏览器环境下需要通过网络从服务器加载模块，要考虑异步情况，所以采用AMD规范比较合适
+ 通过`define`函数定义模块
	* 第一个参数为依赖的模块
	* 第二个参数为回调函数，依赖模块加载完成后执行
+ 通过`require`函数加载模块，参数同`define`函数

	// 定义模块 example.js
	define([package/lib],function(lib){
		function foo(){
			lib.sayHello();
		}

		return {
			foo: foo
		}
	});
	// 加载模块
	require(['example'],function(example){
		example.foo();
	})

