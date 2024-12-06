# TODO:WebSocket API

WebSocket API 是一种在单个 TCP 连接上进行全双工通信的协议，允许客户端和服务器之间实时数据交换。
与传统的 HTTP 请求-响应模型不同，WebSocket 提供了持续的双向连接，使得数据可以在客户端和服务器之间即时传输，非常适合实时应用如在线聊天、实时更新、在线游戏等。

## 心跳机制

客户端定期发送心跳包（通常是 ping 消息），并在一定时间内等待服务器响应（通常是 pong）。如果服务器没有响应或 WebSocket 断开，客户端可以尝试重连。

```js
class ReconnectingWebSocket {
  constructor(url, protocols = null, options = {}) {
    this.url = url;
    this.protocols = protocols;
    this.options = options;

    // 重连策略配置项
    this.maxRetries = options.maxRetries || 5; // 最大重试次数
    this.retryInterval = options.retryInterval || 3000; // 重连时间间隔（默认 3 秒）
    this.currentRetries = 0; // 当前重试次数

    this.ws = null; // WebSocket 实例
    this.isManualClose = false; // 标识是否为手动关闭

    // 心跳配置
    this.heartbeatInterval = options.heartbeatInterval || 10000; // 心跳检测时间间隔，默认 10 秒
    this.heartbeatTimeout = options.heartbeatTimeout || 5000; // 等待心跳响应的超时时间，默认 5 秒
    this.pingMessage = options.pingMessage || "ping"; // 心跳消息内容
    this.heartbeatTimer = null; // 心跳发送定时器
    this.heartbeatTimeoutTimer = null; // 心跳超时定时器

    // 事件监听器对象
    this.listeners = {
      onOpen: null,
      onMessage: null,
      onClose: null,
      onError: null,
      onHeartbeatTimeout: null,
    };

    this.connect(); // 初始化连接
  }

  // 连接 WebSocket
  connect() {
    this.ws = new WebSocket(this.url, this.protocols);

    // WebSocket 事件绑定
    this.ws.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
      this.currentRetries = 0; // 重置重试次数

      if (this.listeners.onOpen) {
        this.listeners.onOpen(event); // 调用用户自定义的 onOpen 回调
      }

      this.startHeartbeat(); // 开始心跳检测
    };

    this.ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);

      if (event.data === "pong") {
        console.log("Received pong from server");
        this.resetHeartbeatTimeout(); // 重置心跳超时
      }

      if (this.listeners.onMessage) {
        this.listeners.onMessage(event); // 调用用户自定义的 onMessage 回调
      }
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);

      this.stopHeartbeat(); // 停止心跳检测

      if (this.listeners.onClose) {
        this.listeners.onClose(event); // 调用用户自定义的 onClose 回调
      }

      // 如果不是手动关闭，则执行重连
      if (!this.isManualClose && this.currentRetries < this.maxRetries) {
        this.currentRetries++;
        setTimeout(() => {
          console.log(
            `Attempting to reconnect... (${this.currentRetries}/${this.maxRetries})`
          );
          this.connect(); // 尝试重连
        }, this.retryInterval);
      }
    };

    this.ws.onerror = (event) => {
      console.error("WebSocket error:", event);

      if (this.listeners.onError) {
        this.listeners.onError(event); // 调用用户自定义的 onError 回调
      }
    };
  }

  // 发送消息
  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error("Cannot send message. WebSocket is not open.");
    }
  }

  // 手动关闭 WebSocket
  close() {
    this.isManualClose = true;
    if (this.ws) {
      this.ws.close();
    }
  }

  // 注册监听器
  on(event, callback) {
    if (this.listeners.hasOwnProperty(event)) {
      this.listeners[event] = callback;
    } else {
      console.warn(`Event "${event}" is not supported.`);
    }
  }

  // 开始心跳检测
  startHeartbeat() {
    console.log("Starting heartbeat...");
    this.heartbeatTimer = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        console.log("Sending ping...");
        this.ws.send(this.pingMessage); // 发送 ping 消息
        this.startHeartbeatTimeout(); // 启动心跳超时检测
      }
    }, this.heartbeatInterval);
  }

  // 停止心跳检测
  stopHeartbeat() {
    console.log("Stopping heartbeat...");
    clearInterval(this.heartbeatTimer); // 停止心跳定时器
    clearTimeout(this.heartbeatTimeoutTimer); // 停止心跳超时定时器
  }

  // 启动心跳超时检测
  startHeartbeatTimeout() {
    clearTimeout(this.heartbeatTimeoutTimer);
    this.heartbeatTimeoutTimer = setTimeout(() => {
      console.error("Heartbeat timeout! No pong received.");
      if (this.listeners.onHeartbeatTimeout) {
        this.listeners.onHeartbeatTimeout(); // 调用心跳超时的自定义处理函数
      }
      this.ws.close(); // 关闭连接，触发重连
    }, this.heartbeatTimeout);
  }

  // 重置心跳超时定时器
  resetHeartbeatTimeout() {
    clearTimeout(this.heartbeatTimeoutTimer); // 收到 pong 后重置心跳超时检测
  }
}

// 使用示例
const reconnectingWs = new ReconnectingWebSocket(
  "wss://example.com/socket",
  null,
  {
    maxRetries: 10, // 最大重试次数
    retryInterval: 2000, // 重试间隔（毫秒）
    heartbeatInterval: 10000, // 心跳检测间隔（毫秒）
    heartbeatTimeout: 5000, // 心跳超时（毫秒）
    pingMessage: "ping", // 心跳发送内容
  }
);

// 注册事件监听器
reconnectingWs.on("onOpen", (event) => {
  console.log("WebSocket opened:", event);
});

reconnectingWs.on("onMessage", (event) => {
  console.log("Received message:", event.data);
});

reconnectingWs.on("onClose", (event) => {
  console.log("WebSocket closed:", event);
});

reconnectingWs.on("onError", (event) => {
  console.error("WebSocket error:", event);
});

reconnectingWs.on("onHeartbeatTimeout", () => {
  console.error("Heartbeat timeout! Reconnecting...");
});

// 发送消息示例
setTimeout(() => {
  reconnectingWs.send("Hello WebSocket");
}, 5000);

// 手动关闭 WebSocket
setTimeout(() => {
  reconnectingWs.close();
}, 15000);
```
