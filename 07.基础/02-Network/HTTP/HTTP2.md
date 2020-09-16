# HTTP2

+ 二进制传输
+ 多路复用：允许共享连接，在单个连接中发起多起request-response，每个request都有一个ID，服务器返回的response也包含对应的ID，客户端接收到响应按照ID重新组装；
+ header压缩
+ 服务端推送：服务端提前解析需要的资源进行推送
