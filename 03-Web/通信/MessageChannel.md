# MessageChannel

Channel Messaging API 的 MessageChannel 接口允许我们创建一个新的**消息通道**，通过这个通道可以实现不同浏览上下文的通信，例如：

- 同使用`window.open()`打开的窗口通信
- 同`iframe`通信
- Worker 之间通信

`MessageChannel`构造函数实例对象包含两个`MessagePort`属性，数据的发送和接收通过对象的两个`MessagePort`属性

```JS
const { port1, port2 } = new MessageChannel();
port1.onmessage = function (event) {
  console.log('收到来自port2的消息：', event.data); // 收到来自port2的消息： pong
};
port2.onmessage = function (event) {
  console.log('收到来自port1的消息：', event.data); // 收到来自port1的消息： ping
  port2.postMessage('pong');
};
port1.postMessage('ping');
```

[MessagePort](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort)

`MessageChannel`以`DOM Event`的形式发送消息，所以它属于异步的宏任务。

## TODO:应用案例
