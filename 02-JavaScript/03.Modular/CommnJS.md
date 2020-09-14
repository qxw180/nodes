# CommonJS

Node.js采用的是CommonJS规范，每一个js文件就是一个模块，文件的路径就是模块，每个模块都是一个独立的作用域；
每个文件的对外接口是`module.exports`，这个对象的所有属性和方法都可以被其它文件导入；
`require`方法用于加载其它模块，模块可以被加载多次，但是只会在第一次加载时运行，然后就被缓存起来，以后再加载就直接运行缓存结果。想要模块再次运行必须重新加载；

## 模块预定变量

在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

`module`对象：可以访问到当前模块的一些相关信息；

+ `module.id`：模块标识符，通常是带有绝对路径的模块文件名
+ `module.filename`：模块文件名，带有绝对路径
+ `module.loaded`：模块是否已加载
+ `module.parent`：调用该模块的模块
+ `module.children`：该模块要用到的其它模块
+ `module.exports`：模块对外输出值

`exports`对象：当前模块导出对象，用于导出模块共有属性和方法。`exports`其实指向`module.exports`对象：`exports === module.exports`。其他模块使用require加载模块时加载的是`module.exports`对象，而不是`exports`对象，这点需要特别注意

``` js
exports = {
    name:"Kevin",
    hello:function(){
        console.log("Hello Node");
    }
}
```

`require`函数：用于加载和使用别的模块

require载入并执行一个javascript文件，然后返回该模块的`module.exports`对象

+ 使用相对路径加载：`var m1 = require('module/m1')`
+ 使用绝对路径加载：`var m1 = require('/workspace/module/m1')`
+ 使用json文件加载：`var m1 = require('data.json')`

## 模块初始化

模块在第一次加载的时候执行，并在执行过程中初始化对象；
初始化后的对象会被缓存起来重复利用，之后每次加载模块都不会执行初始化过程，模块中的变量状态会被保存；
