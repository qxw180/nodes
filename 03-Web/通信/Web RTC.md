# WebRTC

WebRTC(Web Real-Time Communication)即网页及时通信，用户无需安装任何插件或第三方软件的情况下可以创建点对点的链接，实现视频流和（或）音频流或者其他任意数据的传输。

WebRTC 提供**端到端**的音视频通信，**不需要媒体服务器**转发媒体数据

WebRTC 采集和传输音视频数据的过程可以分为三步进行：

- **实时捕获**本地的音视频流
- **实时编码音**视频并在网络中向对等端传输多媒体数据
- 对等端接受发送者的音视频，**实时解码播放**

## 本地媒体流捕获

使用`navigator.mediaDevices.getUserMedia`可以获取本地媒体流

```js
var constraints = { video: true };
function successCallback(stream) {
  var video = document.querySelector("video");
  video.src = window.URL.createObjectURL(stream);
}

function errorCallback(error) {
  console.log("navigator.getUserMedia error:", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);
```

## TODO:媒体流数据传输

## NAT 穿透

NAT（Network Address Translation）是一种网络地址转换技术，常用于家庭路由器和企业防火墙。它允许多个设备共享一个公共 IP 地址访问互联网，从而节省 IP 地址资源。但是，NAT 也带来了问题，例如，位于不同私有网络中的两个设备之间无法直接建立连接。

在 WebRTC 中，通常会同时配置 STUN 和 TURN 服务器，以确保在各种网络环境下都能成功建立连接。

```js
const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
    {
      urls: "turn:turn.yourdomain.com:3478",
      username: "yourUsername",
      credential: "yourCredential",
    },
  ],
};

const pc = new RTCPeerConnection(configuration);
```

### STUN 服务器

STUN（Session Traversal Utilities for NAT）服务器的作用是帮助客户端发现自己的公共 IP 地址和端口。通过与 STUN 服务器的通信，客户端可以获取到外网的 IP 地址和端口，从而尝试与其他客户端建立直接连接。

1. 客户端向 STUN 服务器发送请求。
2. STUN 服务器返回客户端的公共 IP 地址和端口。
3. 客户端使用这些信息尝试与其他客户端进行直接通信。

### TURN 服务器

TURN（Traversal Using Relays around NAT）服务器的作用是在直接连接失败时充当中继服务器，转发客户端之间的流量。它确保了即使在复杂的 NAT 环境下，两个客户端也能进行通信。

1. 客户端向 TURN 服务器请求一个中继地址。
2. TURN 服务器分配一个中继地址给客户端。
3. 客户端将数据发送到 TURN 服务器，TURN 服务器再将数据转发给目标客户端。

由于 TURN 服务器需要转发所有的流量，因此它会消耗更多的带宽和资源，通常作为最后的手段使用。

## 信令

信令（Signaling）是 WebRTC 通信过程中一个重要的步骤，它涉及在两端之间交换必要的元数据，以建立和控制 WebRTC 会话。信令负责以下几项任务：

1. 会话描述协议（SDP）的交换：SDP 包含了媒体信息（如媒体类型、编解码器、比特率等）和网络信息（如 IP 地址和端口）。两个 WebRTC 对等体需要交换 SDP，以协商如何进行通信。
2. ICE 候选者的交换：ICE（Interactive Connectivity Establishment）候选者包含了连接两个对等体所需的网络信息。通过交换这些候选者信息，对等体可以发现最佳的通信路径。
3. 建立、修改和终止会话：信令过程还包括创建、更新和关闭会话的控制信息。

信令流程

1. 建立连接：
   1. 一端创建一个 RTCPeerConnection 对象。
   2. 生成一个 offer 描述（包含 SDP 信息）。
   3. 通过信令通道将 offer 发送给另一端。
2. 响应连接：
   1. 另一端接收到 offer，创建 RTCPeerConnection 对象。
   2. 设置本地描述并生成 answer 描述。
   3. 通过信令通道将 answer 发送回第一端。
3. 交换 ICE 候选者：
   1. 两端生成并交换 ICE 候选者，发现最佳路径进行通信。

信令本身不是 WebRTC API 的一部分，WebRTC 只定义了如何建立和控制媒体连接，而信令部分需要开发者自行实现。常见的信令通道实现方法包括：

- WebSocket：一种全双工的通信协议，适合实时性要求高的应用。
- HTTP/HTTPS：使用 Ajax 或 Fetch API 进行轮询，适合简单的实现。
- 其他实时通信协议：如 SIP、XMPP 等。

## 参考

[Real time communication with WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web#0)
