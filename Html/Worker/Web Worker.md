# Web Workers

JavaScript采用的是单线程模型，一次只能做一件事件，在遇到耗时任务时，其它任务只能等待。Web Worker为前端程序提供了多线程的能力，使用Web Worker可以创建一个独立的线程在后台运行，适合处理计算密集型任务。
worker线程和主线程有隔离独立的上下文环境(内存空间、Event Loop等)，线程间通过`postMessage()`进行通讯。Web Worker分为专享Worker和共享Worker两种.

## Dedicated Worker

专享Worker的上下文是DedicatedWorkerGlobalScope只能被生成它的脚本使用

主线程

``` JavaScript
if(window.Worker) {
    // 创建worker
    var worker = new Worker('task.js')
    // 向worker发送信息
    worker.postMessage('Hello')
    // 监听worker消息
    worker.onmessage = (e) => {
        doSomthing(e.data)
    }
    // 关闭worker
    worker.terminate()
    // 监听worker进程错误
    worker.addEventListener('error', (e) => {

    })
}
```

Worker 线程

``` JavaScript
// 监听主线程消息
self.addEventListener('message', (e) => {
    doSomething(e.data)
})
// 向主线程发送消息
self.postMessage('hello')
// 关闭Worker
self.close()
// 加载JS脚本
self.importScripts('lib.js')
```

## Shared Worker

共享Worker的上下文是SharedWorkerGlobalScope可以同时被多个脚本使用，即使这些脚本在不同的window、iframe中，可以实现多个不同的tab直接的通信。
和专享Worker的区别在于通信必须通过端口对象进行，在进行通信之前必须先打开端口，方法是调用`start()`或`onmessage()`方法

``` JavaScript
// 主线程
var worker = new SharedWorker('worker.js')
worker.port.start() // 打开端口
worker.port.postMessage(...) //

worker.port.onmessage = (e) => {
    doSomething(e.data)
}

// worker线程
self.onconnect = (e) => {
    var port = e.ports[0]
    port.onmessage = (e) => {
        doSomething(e.data)
    }
    port.postMessage(...)
}
```

## Web Work限制

1. 同源限制：Worker线程运行脚本必须与主线程脚本文件同源
2. DOM限制：Worker的运行环境与主线程不一致，无法操作主线程DOM，也无法使用`document` `window` `parent`。
3. 功能限制：不能执行`alert()` `confirm()`方法
4. 文件限制：无法读取本地文件

## 参考

[使用 Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
