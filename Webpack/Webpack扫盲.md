#Webpack扫盲
webpack is a module bundler 这是Webpak官网对Webpak的介绍，是一个模块打包器；
+ 不只是模块化：Webpack是一款模块加载器兼打包工具
+ 一切都是模块：在Webpack中所有资源(html,css,js,image...)都可以当做模块
+ loader：对不同类型的资源webpack都有对应模块的`loader`

##Webpack HelloWorld
Webpack的思路还是很前卫的，如果不理解它的思路那么想体会以上内容还是有一点困难的。
最开始了解webpack是为了寻找一个JavaScript模块化工具，之前一直使用的是基于AMD规范的requireJS，
而webpack不只是JavaScript模块化工具，所以requireJS的思路理解webpack使我陷入了困惑，一度无法进行下去。
好了经过了这个痛苦的过程，我认为最开始学习webpack先不要尝试去理解最上面的一堆特性，直接HelloWorld，从零开始搭建一个项目；
以下内容涉及到NodeJS和NPM等相关内容不做介绍

Step1. 项目初始化
* 创建工作目录：`mkdir webpack-study`	
* 初始化项目：`cd webpack-study`,`npm init`
* 安装Webpack：`npm install --save-dev webpack`
* 创建Wepback配置文件：`touch webpack.config.js`，该文件相当于Gulp的`gulpfile.js`
Step2. 创建文件
* 创建代码目录：`mkdir src`
* 创建入口文件：`cd src`,`main.js`
* 创建测试模块：`mod1.js`
* 创建项目主页：`index.html`
Step3. 代码编写
``` JavaScript
// mod1.js
module.exports = {
	txt: "Hello Webpack"
}
// main.js
var mod1 = require('./mod1')
var title = document.createElement('h1');
title.innerHTML = mod1.txt;
document.body.appendChild(title);
```
Step4. Webpack配置
``` JavaScript
// webpack.config.js
module.exports = {
	//页面入口文件配置
	entry: {
		index : './src/main.js'
	},
	//入口文件输出配置
	output: {
		path: __dirname + "/src", 
		filename: 'bundle.js'
	}
};
```
Step5. 编译
* 进入项目根目录：`cd webpack-study`
* 编译：`webpack`
* 这时可以看到src目录下多了一个`bundle.js`
Step6. 主页面编写
``` HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Webpack Study</title>
</head>
<body>
	<script src="./bundle.js"></script>
</body>
</html>
```	
Step7. 运行查看效果
* 自行搭建本地web服务
* 访问index.html 可以发现页面展示`Hello Webpack`

通过以上步骤我们就实现了一个最简单的Webpack项目，通过以上内容我们可以我们就可以尝试着去理解webpack了
首先总结一下Webpack的代码组织逻辑和工作流程
1. 首先Webpack模块是基于CommonJS规范进行开发的；
2. 然后Webpack是通过一个入口文件对模块进行组织，在入口文件中引入模块
3. 最后Webpack编译之后会生成一个编译后的文件，页面直接引入这个编译后的文件
所有我们就可以理解
不只是模块化：Webpack是一款模块加载器兼打包工具

##Webpack加载器
上面是一个简单的不能再简单的例子，真正的项目一定不是这个样子的。下面我们来丰富一下我们的项目，给它加点样式。

Step1. 创建样式文件
``` CSS	
// 在src目录下创建mian.css文件
h1 {
	color: red;
}
```
Step2. 引入样式文件
通常的方式我们是在`index.html`文件中使用`link`标签进行引入
但这中做法不是Webpak的逻辑，上面已经说过Webpak是通过入口文件进行模块的组织的
在Webpack中不仅仅js是模块，样式文件也同样是模块，可以和js文件一样引入，像下面这个样子：
``` JavaScript
// main.js
var mod1 = require('./mod1')
// 引入样式
require('./main.css')
var title = document.createElement('h1');
title.innerHTML = mod1.txt;
document.body.appendChild(title);
```
通过`require('./main.css')`我们就完成了样式的引入，当然单单这样是不行的
我们需要对`webpack.config.js`进行修改，添加关于css的loader
在这里我们先不要纠结什么是loader，先看下面的例子
``` JavaScript
// webpack.config.js
module.exports = {
	//页面入口文件配置
	entry: {
		index : './src/main.js'
	},
	//入口文件输出配置
	output: {
		path: __dirname + "/src", 
		filename: 'bundle.js'
	},
	// 要用什么模块来处理各种类型的文件
	module: {
		//加载器配置
		loaders: [
			loaders: ['style','css']
		]
	}
};
```
Step3. 编译：
* 安装loader：`npm install css-loader style-loader --save-dev`
* 编译：`webpack`

然后刷新页面发现样式已经生效了。

现在我们来看一下什么loader(加载器)
Webpack通过`module``loaders`来配置loader
`loader`配置项包括`test`和`loader`两个字段
`test`：一个正则，用来匹配文件
`loader`：一个数组，用来处理命中文件的加载器，加载器的执行顺序是从右到左的
这里面我们用到了两个加载器
`css-loader`：会遍历css文件，找到所有的url(...)且处理。tag中。
`style-loader`：会把所有的样式插入到你页面的一个style 

到这我们应该能够理解：
一切都是模块：在Webpack中所有资源(html,css,js,image...)都可以当做模块
loader：对不同类型的资源webpack都有对应模块的`loader`

以上这些只是webpack的冰上一角。。。

