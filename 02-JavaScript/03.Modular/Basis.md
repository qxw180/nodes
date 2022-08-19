# JavaScript 模块化

模块化是一种编程方式，每个文件都是一个模块。
ES6 之前 JavaScript 不支持模块化，对于大型项目开发模块化的需求是迫切的，为此 JavaScript 社区做出了很多努力也提供了很多解决方案。

## JavaScript 开发方式演变

1. 刀耕火种，最原始的方式，一个人实现所有代码功能，通常在直接写到 HTML 中或者提取到一个 js 文件中；
2. 重复利用，代码写的多了发现很多代码都是重复的，于是把这些代码提取出来，每次使用的时候只需要引用一下就可以。很多人也把自己的代码共享给其它人使用；
3. 模块化组织，渐渐的前端页面的功能越来越丰富，新的问题也暴漏了出来。
   1. 引入的 js 文件也越来越多，代码臃肿，页面加载时产生大量的 HTTP 请求；
   2. 因 JavasScript 本身没有提供模块机制，所有变量默认都挂载到全局变量`windows`对象下，多个模块之间变量命名冲突。
   3. 而且模块之间是存在依赖关系的，必须按照顺序进行加载；
4. 为了解决以上问题，前端模块化规范和模块化管理器应运而生，管理*变量冲突*和*依赖关系*；
   1. AMD 规范：[requirejs](http://requirejs.org/)
   2. CMD 规范：seajs
   3. CommonJS：Node、Browerify

## 模块化简单实现

对象写法 定义一个对象，所有模块均挂载到该对象上

```js
var module = {
  _priv: 0,
  v1: 100,
  f1: function () {},
  f2: function () {},
};

module.f1();
```

解决了全局变量污染问题；缺点会暴露模块成员，模块内部成员可以被修改；

立即执行函数 IIFE，利用 javascrip 作用域和闭包，使用立即执行函数将对外开放的模块作为返回值挂载到外部变量

```js
var module = (function () {
  var _count: 0;
  var f1 = function () {};
  var f2 = function () {};

  return {
    f1: f1,
    f2: f2,
  };
})();
```

缺点模块无法拆分，功能多时模块过大；无法实现模块依赖；

放大模式，将依赖的模块作为参数传人模块，这样可以进一步实现模块的拆分

```js
var module = (function (mod) {
  mod.f3 = function () {};
  return mod;
})(module);
```

在浏览器中各模块的加载顺序不确定，如果执行的时候`module`对象还没有生成就会报错

宽放大模式，判断是否创建`module`对象，未创建就传入一个空对象；

```js
var module = (function (mod) {
  return mod;
})(window.module || {});
```

最佳实践，一个独立的模块应该有以下几个特性：

1. 内部变量不能被直接修改，避免全局变量污染，通过 IIFE 实现
2. 模块直接不直接交互，通过显示的变量传人

```js
var module = (function($){
  return {
    hide:function(element){
      $(element).hide();
    },
    ...
  }
})(jquery);
(function(global,$){
  global.myTools = {
    f1:function(){},
    f2:function(){
      $("*").show();
    }
  }
})(window,jquery);
```

## JavaScript 模块化规范

规范既是标准，是为了兼容，大家约定俗称的一个准则，例如现在的计算机和各种外界设备直接的接口都是使用 USB 这就是规范
JavaScript 模块化规范主要有两种 AMD 和 CommonJS

## [CommonJS](http://www.commonjs.org/)

模块同步加载规范，只有模块加载完成后才能执行后面的操作；

- 一个 js 文件就是一个模块，每个模块都是一个单独的作用域；
- 模块最后返回一个`exports`对象，作为对外接口对象；
- 使用`require`方法加载模块，获取被加载模块的`exports`对象;模块可以被加载多次，但只有加载第一次时执行，执行完之后会被缓存起来；

因为 NodeJs 主要用于服务器编程，模块位于本地硬盘，加载速度很快，不需要考虑异步情况，所以适合采用 CommonJS 规范；

```js
// 模块定义 example.js
exports = {
  message: "CommonJs Module Demo",
  sayHello: function () {
    console.log("Hello CommonJS");
  },
};
// 模块加载
var example = require("example.js");
example.sayHello(); // Hello CommonJS
```

## AMD Asynchronous Module Definition

模块异步加载规范，定义依赖和回调函数，在依赖加载完成后执行回调函数

- 通过`define`函数定义模块
  - 第一个参数为依赖的模块
  - 第二个参数为回调函数，依赖模块加载完成后执行
- 通过`return`反悔对外接口

浏览器环境下需要通过网络从服务器加载模块，要考虑异步情况，所以采用 AMD 规范比较合适

```js
// 定义模块 example.js
define([package / lib], function (lib) {
  function foo() {
    lib.sayHello();
  }
  return {
    foo: foo,
  };
});
// 加载模块
require(["example"], function (example) {
  example.foo();
});
```

## CommonJS 和 AMD 兼容写法

```js
(function () {
  function MyModule() {
    // ...
  }
  var moduleName = MyModule;
  if (typeof module !== "undefined" && typeof exports === "object") {
    module.exports = moduleName;
  } else if (typeof define === "function" && (define.amd || define.cmd)) {
    define(function () {
      return moduleName;
    });
  } else {
    this.moduleName = moduleName;
  }
}.call(function () {
  return this || (typeof window !== "undefined" ? window : global);
}));
```

## TODO:[UMD](https://github.com/umdjs/umd)

## 参考文献

[Javascript 模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
[CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html)
