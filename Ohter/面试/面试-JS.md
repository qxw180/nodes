# 前端面试-JS

## document load 和document ready的区别

Document.onload 是在结构和样式加载完才执行js
Document.ready原生种没有这个方法，jquery中有 $().ready(function)

## 数据类型

+ typeof返回的类型:“number”、“string”、“boolean”、“object”、"symbol"、“function”和“undefined”。
+ null和undefined的区别
+ 基本数据类型和引用数据类型，堆栈图
+ 基础类型包括：Number、String、Boolean、Null、Undefined、Symbol（该类型位 ES2015 中新增类型）
+ js的垃圾回收机制

## 变量相关

+ 变量作用域
+ 变量提升
+ 临时死区
+ 什么是闭包，闭包的应用场景
  + 如何实现函数调用次数的统计

## 标准API使用

+ 字符串操作
+ 数组操作，遍历、排序、过滤
  + 手写数组去重 如何给所有数字添加此方法：Array.prototypte.xxx
    + 循环+indexOf
    + 循环加+object key
    + ES5 Array.from(new Set(arr)) Array.prototype.filter(x => {})
    + ES6 [...new Set([1,2,3,1,'a',1,'a'])]
  + 写出多种数组循环方法
  + forEach如何跳出循环：用some every替换
+ JSON
  + JSON和字符串转换
    + JSON.parse() 方法解析一个JSON字符串
    + JSON.stringify() 方法将一个JavaScript值转换为一个JSON字符串

## cookies，sessionStorage 和 localStorage 的区别

+ cookie在浏览器和服务器间来回传递。 sessionStorage和localStorage不会
+ sessionStorage和localStorage的存储空间更大(>4M)，cookie只有4K；
+ sessionStorage和localStorage有更多丰富易用的接口；
+ sessionStorage和localStorage各自独立的存储空间；
+ sessionStorage的数据在浏览器开着时会一直存在；
+ localStorage的数据会一直存在，即使在浏览器被关闭以后；

## 事件相关

+ 简述事件模型
+ 添加事件监听优化手段？事件代理

## 异步请求

+ 简述一下原生AJAX写法，GET请求和POST请求写法的区别，封装成类promise
+ 跨域原理及解决方案
  + 同源策略
  + JSONP实现及原理，手写jsonp实现，发送和回调接收
  + CORS原理
+ 多层依赖请求处理。promise
+ Promise
  + Promise相对于Callback的好处：处理异步流程中，把执行代码和结果处理代码清晰的分离
  + promise的三种状态，状态十分可变
  + promise错误处理？catch和第二个参数哪种方式更好：catch有冒泡性质。
  + promise对象什么时候开始执行：创建后立即执行
  + 低版本浏览器不支持promise如何处理？
  + resolve和reject会不会中止promise对象函数的执行，如何中止？
  + then方法是否可以实现链式调用？为什么？

## 谈谈this对象的理解

+ call、apply和bind的作用和区别

## JavaScript 原型，原型链 ? 有什么特点

JavaScript 原型： 每创建一个函数，函数上都有一个属性为 prototype，它的值是一个对象。 这个对象的作用在于当使用函数创建实例的时候，那么这些实例都会共享原型上的属性和方法。

原型链： 在 JavaScript 中，每个对象都有一个指向它的原型（prototype）对象的内部链接（proto）。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向）。这种一级一级的链结构就称为原型链（prototype chain）。 当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止;到查找到达原型链的顶部（Object.prototype），仍然没有找到指定的属性，就会返回 undefined。

## 异常处理

+ JS场景错误类型
+ 代码如何处理错误
  + Promise
  + 异步错误处理、async错误处理
+ 如何自定义错误，如何抛出监听错误

## OOP相关

+ 对面向对象的理解：抽象、封装、多态
  + 封装
  + 抽象
  + 继承
  + 重载
  + 重写
  + 多态：用统一的方法对不同的对象进行操作，子类可以覆盖父类方法，不同的子类的统一方法可能有不同表现形式
+ new 操作符具体干了什么呢?
  + 创建一个新对象，开辟一块新的内存空间；
  + 把函数中上下文（作用域）对象this指向该对象；
  + 执行代码，通过this给新对象添加属性或方法；
  + 返回对象；
+ 函数内没有return语句时返回值为什么：undefined
+ new 函数内部包含return语句会发送什么？返回值为Object会发送什么？
+ prototype和__proto__的关系
+ 方法的重载：方法签名包括方法名和参数列表

## Javascript如何实现继承

## 如何监听JS变量的变化

https://www.zhihu.com/question/44724640

## 模块化

## 编码相关

## Web Workers

## 对webSocket的了解，和ajax轮询的区别

## 设计模式

观察者模式：
工程模式：
单利模式：

## 柯里化

柯里化又称部分求值，不会立刻进行求值计算，而是在需要的时候在进行计算，从而减少不必要的计算，达到性能优化的目的。

## 函数式编程

## 其它

+ 如果需要手动写动画，你认为最小时间间隔是多久，为什么？
  + 多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms
+ 数据统计，比ajax更简单的方法

https://zhuanlan.zhihu.com/p/25424194
