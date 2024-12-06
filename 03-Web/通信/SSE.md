# Server-Sent Events (SSE)服务器发送事件

允许服务器向客户端推送实时事件，通过**一个持续打开的 HTTP 连接**，服务器可以在其上不断发送数据更新到客户端。
与 WebSockets 不同，SSE 是单向的，只允许服务器向客户端发送数据。
SSE 基于 HTTP，因此它们比 WebSockets 更简单，并且能够在现有的 HTTP 基础设施上工作。

服务端：设置 Content-Type 为 text/event-stream，并定期发送数据。

```js
const express = require("express");
const app = express();

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = () => {
    res.write(`data: ${new Date().toISOString()}\n\n`);
  };

  sendEvent();
  const interval = setInterval(sendEvent, 3000);

  req.on("close", () => clearInterval(interval)); // 清理连接
});

app.listen(3000, () => console.log("SSE server running on port 3000"));
```

客户端：使用 EventSource 连接到服务器，处理接收到的消息。

```js
const eventSource = new EventSource("/events");

eventSource.onmessage = function (event) {
  console.log(event.data);
};

eventSource.onerror = function () {
  console.log("Error connecting to SSE");
};
```
