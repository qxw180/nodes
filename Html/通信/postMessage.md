# postMessage

postMessage是HTML5新引入的API，postMessage提供了非同源脚本互相通信的能力。可以实现夸文档、多窗口消息传递，是Web Workers的通信基础。

## window.postMessage

使用`otherWindow.postMessage(message, targetOrigin, [, transfer])`可以实现跨源通信。

+ message: 发送的数据
+ targetOrigin：制定可以接受消息的窗口
+ transfer：

``` JavaScript
// 发送消息

// 监听消息事件，接受消息
window.addEventListener('message', (e) => {
    doSomething(e.data)
}, false)
```

接收到的事件主要有以下属性：

+ data：发送方传递过来的数据
+ origin：发送方的origin，包括协议、域名、端口，可以通过该属性验证发送方的身份
+ source：发送消息窗口对象的引用

`postMessage()`和`onmessage(e)`的数据传递并不是数据的共享而是数据的复制
