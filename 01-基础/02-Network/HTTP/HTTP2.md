# TODO:HTTP2

- 二进制传输
- 多路复用：允许共享连接，在单个连接中发起多起 request-response，每个 request 都有一个 ID，服务器返回的 response 也包含对应的 ID，客户端接收到响应按照 ID 重新组装；
- header 压缩
- 服务端推送：服务端提前解析需要的资源进行推送
