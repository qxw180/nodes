#Node.js 模块
每一个js文件就是一个模块，文件的路径就是模块

##模块预定变量
在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

###require函数：
用于加载和使用别的模块

+ 使用相对路径加载：`var m1 = require('module/m1')`
+ 使用绝对路径加载：`var m1 = require('/workspace/module/m1')`
+ 使用json文件加载：`var m1 = require('data.json')`

###exports对象：
当前模块导出对象，用于导出模块共有属性和方法；
其他模块使用require加载模块时得到的就是模块的exports对象；

	exports = {
		name:"Kevin",
		hello:function(){
			console.log("Hello Node");
		}
	}

###module对象：
可以访问到当前模块的一些相关信息；

<hr>

##模块初始化
模块在第一次加载的时候执行，并在执行过程中初始化对象；
初始化后的对象会被缓存起来重复利用，之后每次加载模块都不会执行初始化过程，模块中的变量状态会被保存；

##模块路径解析
+ 绝对路径：支持`/`和`C:`开头路径
+ 相对路径：`./..`
+ 模块查找
	* 内置模块：`fs`、`http`等内置模块不需要路径解析，直接引用`var http = requier('http')`
	* 非内置模块：nodejs定义了一个特殊的目录`node_modules`用来存放模块，在查找模块的时候nodejs会根据当前引用模块位置逐级向上查找`node_modules`文件夹中的模块；
	  例：`/home/user/hello.js`引用`require('foo/bar')`查找次序如下
	  ```
	  /home/user/node_modules/foo/bar
	  /home/node_modules/foo/bar
	  /node_modules/foo/bar
	  ```
	* `NODE_PATH`环境变量：nodejs可以通过配置`NODE_PATH`变量来指定额外搜索路径；`NODE_PAHT`可以配置多个搜索路径，Linux使用`:`分隔，Windows下使用`;`分隔；
	  例： `NODE_PATH=/home/user/lib:/home/lib`则加载次序为
	  ```
	  /home/user/lib/foo/bar
	  /home/lib/foo/bar
	  ```
