#前端面试-JS

##typeof返回的类型
“number”、“string”、“boolean”、“object”、"symbol"、“function”和“undefined”。
##null和undefined的区别

##document load 和document ready的区别
Document.onload 是在结构和样式加载完才执行js
Document.ready原生种没有这个方法，jquery中有 $().ready(function)

##说一下的数据类型
+ 基本数据类型和引用数据类型，堆栈图
+ 基础类型包括：Number、String、Boolean、Null、Undefined、Symbol（该类型位 ES2015 中新增类型）
+ 

##变量作用域及变量提升

##标准API使用
+ 字符串操作
+ 数组操作，遍历、排序、过滤
    * 手写数组去重
        - 循环+indexOf
        - 循环加+object key
        - ES5 Array.from(new Set(arr))
    * 写出多种数组循环方法
+ JSON
    * JSON和字符串转换
        - JSON.parse() 方法解析一个JSON字符串
        - JSON.stringify() 方法将一个JavaScript值转换为一个JSON字符串

##cookies，sessionStorage 和 localStorage 的区别？
+ cookie在浏览器和服务器间来回传递。 sessionStorage和localStorage不会
+ sessionStorage和localStorage的存储空间更大(>4M)，cookie只有4K；
+ sessionStorage和localStorage有更多丰富易用的接口；
+ sessionStorage和localStorage各自独立的存储空间；
+ sessionStorage的数据在浏览器开着时会一直存在；
+ localStorage的数据会一直存在，即使在浏览器被关闭以后；

##new 操作符具体干了什么呢?
1. 创建一个新对象；
2. 把函数中上下文（作用域）对象this指向该对象；
3. 执行代码，通过this给新对象添加属性或方法；
4. 返回对象；

##事件相关
+ 简述事件模型
+ 添加事件监听优化手段？事件代理


##异步请求
+ 简述一下原生AJAX写法，GET请求和POST请求写法的区别
+ 跨域原理及解决方案
    * 同源策略
    * JSONP实现及原理，手写jsonp实现，发送和回调接收
    * CORS原理
+ 多层依赖请求处理。promise

##JavaScript 原型，原型链 ? 有什么特点？
JavaScript 原型： 每创建一个函数，函数上都有一个属性为 prototype，它的值是一个对象。 这个对象的作用在于当使用函数创建实例的时候，那么这些实例都会共享原型上的属性和方法。

原型链： 在 JavaScript 中，每个对象都有一个指向它的原型（prototype）对象的内部链接（proto）。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向）。这种一级一级的链结构就称为原型链（prototype chain）。 当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止;到查找到达原型链的顶部（Object.prototype），仍然没有找到指定的属性，就会返回 undefined。

##Javascript如何实现继承？

##模块化

https://zhuanlan.zhihu.com/p/25424194








