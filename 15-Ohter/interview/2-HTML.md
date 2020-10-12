# HTML

## web标准的理解（结构、表现、行为）

+ doctype（文档类型）的作用是什么，如何声明H5文档doctype
  + doctype 声明不属于 HTML 标签；tag; 它是一条指令，告诉浏览器编写页面所用的标记的版本。
  + `<!DOCTYPE HTML>`

## 简述一下对HTML语义化的理解，写让机械读懂的代码，主要是对SEO的优化和无障碍功能的支持

+ 用正确的标签做正确的事情
+ html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析
+ 语义化的HTML在没有CSS的情况下也能呈现较好的内容结构与代码结构
+ 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO
+ 使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解
+ HTML5增加了许多语义化标签如:header footer nav article ……

## 如何实现点击radio的文字描述控制radio的状态（通过label实现）

## img title alt属性的区别

## HTML5新特性

+ HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
+ canvas, video, audio, localStorage, sessionStorage, Geolocation,APP Cache,web worker, 语义化标签, 表单控件
+ 移除了纯表现的元素：basefont，big，center，font, s，strike，tt，u；对可用性能产生负面影响的元素：frame，frameset，noframes；

## 浏览器是怎么对HTML5的离线储存资源进行管理和加载的呢

## 如何实现浏览器内多个标签页之间的通信

1. 使用cookie+setInterval
2. 使用`localStorage.setItem(key,value)`添加内容, 使用storage事件监听添加、修改、删除的动作
3. WebSocket
4. BroadcastChannel
5. ShareWorker

## IconFont

## 是否了解SVG

SVG是使用XML来进行图像描述进行绘图，是一套完整独立的矢量图形语言。是矢量图，可以无损缩放。
如何进行SVG合图？

## Canvas

+ 使用JavaScript进行绘图，H5提供了Canvas标签用来声明画布，提供了绘图相关API进行图像绘制，Canvas是基于位图实现的，不能改变大小，只能缩放；
+ 如何使用canvas绘制图片，如何解决retina屏幕下图片模糊问题；
+ canvas的with和height属性和CSS样式的区别；

## WebSocket
