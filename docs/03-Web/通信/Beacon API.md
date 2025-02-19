# Beacon API

navigator.sendBeacon() 方法允许异步地发送少量数据到服务器，通常用于在页面卸载时发送分析或诊断信息。这个方法确保数据发送成功，即使页面已经关闭或用户已经导航到其他页面。

- 只适用于小量数据：不适合传输大文件或大量数据。
- 不支持自定义请求头：无法自定义请求头，限制了某些高级用法。
- 有限的错误处理：无法直接获取发送失败的反馈。

```js
const url = "https://www.example.com/log";
const data = JSON.stringify({ event: "pageUnload", timestamp: Date.now() });
navigator.sendBeacon(url, data);
```

Beacon API 通过使用 HTTP POST 方法，将数据以非阻塞的方式传输到服务器。**它使用浏览器的传输队列来确保数据在页面卸载前发送成功。即使页面已经关闭，浏览器仍会尝试发送数据**。
