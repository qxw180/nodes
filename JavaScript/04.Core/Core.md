# JavaScript Core

## 异步非阻塞

JavaScript从设计开始就是一个单线程语言，这和它的设计初衷有关，只是为了处理一些简单的页面交互。单线程的问题就是任务是串行的，上一个任务未完成下一个任务就需要一直等待。在HTML页面中JS的执行也会阻塞页面渲染，所以在进行一些耗时操作如ajax请求等，js引擎线程就无法继续处理其它任务，页面就会假死，即线程**阻塞**。
所以JS才有异步任务（asynchronous callback）来解决这个问题。主线程在遇到异步任务时(如ajax请求)不需要等待结果返回，直接向下继续运行，当异步任务完成之后会以某种方式(例如callback)通知主线程并返回运行结果，这既是**异步非阻塞**。

现代浏览器一个tab页面一般包含以下线程：

+ GUI渲染线程
+ JS引擎线程
+ 事件触发线程
+ 定时器触发线程
+ 异步HTTP请求线程

JS 中的异步操作是通过 WebAPIs 去支持的，常见的有 XMLHttpRequest，setTimeout，事件回调（onclik, onscroll等）。而这几个 API 浏览器都提供了单独的线程去运行，所以才会有地方去做定时器的计时，request 的回调。

## 事件循环 Event Loop



## 函数执行栈

## 参考

[我理解的 JS 运行机制及 Event Loop](https://github.com/sunyongjian/blog/issues/38)
