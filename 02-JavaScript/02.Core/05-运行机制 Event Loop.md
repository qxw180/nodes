# JavaScript 运行机制

JavaScript 是**解释型语言**，不需要编译，在执行的过程中实时编译，边编译边运行。
**JavaScript 引擎**负责在运行的过程中将 JS 代码转换成可执行的机器码，常用的 JavaScript 引擎有：

1. Chrome V8 引擎 (chrome、Node、Opera）
2. SpiderMonkey （Firefox）
3. Nitro (Safari）
4. Chakra （Edge)

JavaScript 引擎只能完成语言的解析和运行，我们的程序通常需要调用一些 API(如 DOM 操作、文件操作、网络操作)来实现业务需求。这些 API 是由 **JavaScript Runtime** 提供的。常见的运行环境：浏览器、NodeJS

JavaScript 引擎和 JavaScript Runtime 构成了 JavaScript 程序的运行环境。

- JavaScript 引擎负责解析 JS 代码，转为可执行的机器语言
- JavaScript runtime 暴露一些 API，供 JavaScript 调用

## 主线程

JavaScript 最开始被设计为浏览器脚本语言，主要用来处理用户交互和操作 DOM，场景相对简单，为了避免多线程的复杂同步问题(例：两个函数同时操作同一对象)，所以从诞生就是单线程的，这个线程即是**主线程**，负责执行代码。

## 同步任务和异步任务

- 同步任务：调用后可立刻获得结果
- 异步任务：调用后无法立刻获得结果，需要等待额外处理，如网络请求、定时器延时等

### 同步任务运行机制及问题

在[变量作用域&执行栈](./02-变量作用域&执行栈.md)中介绍过，JS 引擎遇到可执行函数后会生成执行上下文并压入到执行栈，执行栈是 LIFO 机制，JS 引擎是从栈顶执行，执行完成后将上下文出栈。

这个模型通常没什么问题，但是如果遇到耗时很长任务，后面的任务就只能排队等待。
如果这个耗时任务不是 CPU 耗时而是 IO 耗时(如 AJAX 网络请求)，那么 CPU 在空闲等待，其它任务也无法利用空闲的 CPU，这显然是不合理的，这种情况称为**异步阻塞**。

针对 CPU 耗时任务：

- HTML5 提出 [Web Worker](../../html/../03-Html/Worker/Web%20Worker.md) 标准用来利用多 CPU 能力处理 CPU 密集型任务。
- TODO: NodeJS 多线程机制

### 浏览器中的异步任务调度机制

JavaScript 调用浏览器提供了`setTimeout`、`xmlHttpRequest`等 Web API 会触发异步任务，浏览器会开启单独的进程执行这些任务。现代浏览器一个 Tab 页面一般包含以下线程：

- JS 引擎线程，即主线程
- GUI 渲染线程
- 事件触发线程
- 定时器触发线程
- 异步 HTTP 请求线程

等待任务执行完成后会将注册的回调函数和执行结果放到**任务队列(Task Queue)**中，任务队列是先进先出的结构。
等到主线程空闲(执行栈清空)时，会将任务队列中最早入列的回调函数读取到执行栈执行。
等执行栈再次清空的的时候会再次检查任务队列，如此往复称为**Event Loop**。
这个模型中的异步任务是**非阻塞调用**不会阻塞主线程，称为**异步非阻塞**。
![event loop](../../assets/images/js/event-loop.png)

### 宏任务(MacroTask)和微任务(MicroTask)

在 ES6 标准中又添加了**工作队列**的概念，用来存放`Promise`等异步任务，工作队列和任务队列的区别是，工作队列的优先级更高，Event Loop 会优先处理工作队列中的任务（JS 引擎每次 Event Loop 都会先检查工作队列）。

```JS
setTimeout(() => {
  console.log(1);
  Promise.resolve(1).then(() => {
    console.log(4);
  })
}, 0)
Promise.resolve(1).then(() => {
  console.log(3);
})
setTimeout(() => {
  console.log(2);
}, 0)

// 3 1 4 2
```

异步任务分为宏任务、微任务，不同类型的任务会将`callback`添加到不同的队列。

- 宏任务：主要通过 Web API 触发，回调函数会压入**任务队列**，常见的宏任务包括：
  - script 脚本：指的是执行脚步代码，很多文章介绍的 Event Loop 会首先执行一个宏任务，这个首先执行的宏任务就是通过`<script />`加载的脚步代码
  - XHR
  - 用户交互事件：鼠标和键盘事件
  - 定时器：`setTimeout/setInterval`
  - UI 渲染
  - 通信：MessageChannel、`postMessage`等
- 微任务：回调函数会压入**工作队列**，常见的微任务包括：
  - `Promise.then()`
  - `MutationObserver`：DOM 数据变更观测器
  - `process.nextTick`

![Task Queue](../../assets/images/js/task-queue.gif)

`window.requestAnimationFrame`：在浏览器下一次重绘之前调用，rAF 虽然也是异步任务，但既不是宏任务也不是微任务。

### FIXME:NodeJS 中的异步任务运行机制

和浏览器一样 NodeJS 的异步任务运行机制也是 Event Loop，不同的是会将异步任务分为六种类型，Loop 会依次执行，每次执行都清空队列中的任务。六个阶段为：

- **timers**：执行`setTimeout`和`setInterval`中到期的`callback`
- **I/O callbacks**：执行一些系统调用错误，比如网络通信的错误回调
- **idle, prepare**：仅 node 内部使用
- **poll**：获取新的 I/O 事件, 适当的条件下 node 将阻塞在这里
- **check**：执行`setImmediate()`的回调
- **pending callbacks**：执行`close`事件的`callback`，例如`socket.on('close'[,fn])`或者`http.server.on('close, fn)`。

NodeJS Event Loop 的每个阶段都有一个任务队列，当 Event Loop 到达某个阶段时，将执行该阶段的任务队列，直到队列清空或执行的回调达到系统上限后，才会转入下一个阶段。
这六个阶段里面的任务都相当于是浏览器里面的 MacroTask，和浏览器不同的是**NodeJS 中 MicroTask 是在各个阶段之间执行**。

## TODO:EventLoop 和浏览器渲染、帧动画、空闲回调

## 参考

[JavaScript 运行机制详解：再谈 Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
[我理解的 JS 运行机制及 Event Loop](https://github.com/sunyongjian/blog/issues/38)
[深入解析 EventLoop 和浏览器渲染、帧动画、空闲回调的关系](https://zhuanlan.zhihu.com/p/142742003)
