# 前端网络基础知识

## B/S(Browser/Server)架构

就是浏览器发送请，通过网络将请求发送到服务器，然后服务器响应请求，再通过网络将响应返回给浏览器的架构；
B/S 架构是基于网络的架构，IP 协议解决了网络层问题、TCP 协议解决了传输层问题、HTML 协议解决了应用层的问题；
主要解决了以下几个问题:

1. 浏览器怎么找到服务器：这个个问题用的就是所谓的 DNS 解析，获取服务器的 IP 地址，定位到服务器；
2. 找到服务器之后如何能和服务能够搭上话：建立 TCP 连接；
3. 搭上话之后如何能互相听明白都说的是什么：HTTP 协议；

与 B/S 架构相对应的还有 C/S 架构(Client/Server)，它们之间最大的区别就是关于连接状态的区别，B/S 架构在完成一次请求和响应之后会断开连接，C/S 架构的连接状态是一直存在的，即是双向通信，客户端可以向服务器发送请求，服务端也可以主动向客户端推送信息

## TCP 协议

TCP 协议是一个端到端的连接协议。拿到域名对应的 IP 地址之后，浏览器会以一个随机端口(1024 < 端口 < 65535)向服务器的 WEB 程序(httpd,nginx 等)80 端口发起 TCP 的连接请求。这个连接的建立过程分三步，俗称 3 次握手；

1. 浏览器首先向服务器发送一个带`SYN`标志的数据包，并进入 SYN_SEND 状态，等待服务器确认；
2. 服务器接收到数据包后返回一个带有`SYN/ACK`的数据包，此时服务器进入 SYN_RECV 状态；
3. 最后浏览器在发送一个带有`ACK`的数据包给服务器，客户端和服务器进入 ESTABLISHED 状态，代表握手结束，连接成功；
   完成三次握手，客户端与服务器开始传送数据。

三次握手的意义在于验证发送端和接收端是都准守`TCP/IP`协议

## HTTP 协议

超文本传输协议，计算机通过网络从服务器获取超文本标记文档时，服务器和客户端共同遵守的规则；

HTTP 请求包括请求行、请求头和内容三部分

```text
 <!-- 请求行：包括方法、地址和协议三部分 -->
 GET http://192.168.1.10:7222/api/admin/urls HTTP/1.1
 <!-- 以下为请求头内容 -->
 Host: 192.168.1.10:7222
 Connection: keep-alive
 Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8<!-- 就是告诉服务器端，我接受那些MIME类型 -->
 Upgrade-Insecure-Requests: 1
 User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36
 Accept-Encoding: gzip, deflate, sdch
 Accept-Language: zh-CN,zh;q=0.8,en;q=0.6,it;q=0.4,ja;q=0.2
 Cookie: token=eyJpdiI6IlNadkl5RDVQWVFDSkZpYmxzcDArXC9RPT0iLC
 <!-- 内容 -->
 admin_pass=super%40123
```

请求类型

- GET: 完整请求一个资源 （常用）
- HEAD: 仅请求响应首部
- POST：提交表单 （常用）
- PUT: (webdav) 上传
- DELETE：(webdav) 删除
- OPTIONS：返回请求的资源所支持的方法的方法
- TRACE: 追求一个资源请求中间所经过的代理

常用请求头字段含义

- `Accept` 就是告诉服务器端，我接受那些 MIME 类型
- `Accept-Encoding` 这个看起来是接受那些压缩方式的文件
- `Accept-Lanague` 告诉服务器能够发送哪些语言
- `Connection` 告诉服务器支持 keep-alive 特性
- `Cookie` 每次请求时都会携带上 Cookie 以方便服务器端识别是否是同一个客户端
- `Host` 用来标识请求服务器上的那个虚拟主机，比如 Nginx 里面可以定义很多个虚拟主机那这里就是用来标识要访问那个虚拟主机。
- `User-Agent` 用户代理，一般情况是浏览器，也有其他类型，如：wget curl 搜索引擎的蜘蛛等条件请求首部：
- `If-Modified-Since` 是浏览器向服务器端询问某个资源文件如果自从什么时间修改过，那么重新发给我，这样就保证服务器端资源文件更新时，浏览器再次去请求，而不是使用缓存中的文件
  安全请求首部：
- `Authorization`: 客户端提供给服务器的认证信息；

HTTP 响应包括状态行、HTTP 头和内容三部分

```text
<!-- 状态行 -->
HTTP/1.1 200 OK
<!-- HTTP头 -->
Server: nginx
Content-Type: application/json
Connection: keep-alive
X-Powered-By: PHP/5.6.17-0+deb8u1
Cache-Control: no-cache
Date: Wed, 09 Mar 2016 11:21:02 GMT
Set-Cookie: laravel_session=eyJpdiI6Ing0RzluYVN0TlpBQUlXV1Q1WXFHVnc9PSIsInZhbHVlIjoiTnNCODNDM1YwMU14RXRtRGJuYWE4cWxRQzFzSG84bUpIUkRVYUVsRUNcL2RKZ3lERWQ1aXZoamZGWnNXY2dHU3RqTlFpc0N6N29BNCt2TGc2eGRSYUlRPT0iLCJtYWMiOiJhNThkYmNlNDNlNWMzZmY3OTllNTJlYjNmZjMyM2FlYzZhOWY0NjMwYzE3YTJjYjg0MWY2MDc5NmY5YjI2OTA4In0%3D; expires=Wed, 09-Mar-2016 13:21:02 GMT; Max-Age=7200; path=/; httponly
Content-Length: 458

<!-- 内容 -->
{"id":"12","user_name":"18801339033"}
```

状态行-状态吗

- 信息类 (100-199)
  - `100` Continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端将返回此信息，表示确认，之后发送具体参数信息
- 响应成功 (200-299)
  - `200` OK 正常返回信息
  - `201` Created 请求成功并且服务器创建了新的资源
  - `202` Accepted 服务器已接受请求，但尚未处理
- 重定向类 (300-399)
  - `301` 永久重定向, Location 响应首部的值仍为当前 URL，因此为隐藏重定向;
  - `302` 临时重定向，显式重定向, Location 响应首部的值为新的 URL
  - `303` See Other 临时性重定向，且总是使用 GET 请求新的 URI。
  - `304` Not Modified，未修改，比如本地缓存的资源文件和服务器上比较时，发现并没有修改，服务器返回一个 304 状态码，告诉浏览器，你不用请求该资源，直接使用本地的资源即可。
- 客户端错误类 (400-499)
  - `400` Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  - `401` Unauthorized 请求未授权。
  - `403` Forbidden 禁止访问。
  - `404` Not Found 找不到如何与 URI 相匹配的资源。
- 服务端错误类 (500-599)
  - `500` Internal Server Error 最常见的服务器端错误。
  - `502`
  - `503` Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

## HTML 解析

浏览器拿到 HTML 后就开始解析 HTML 代码，遇到 js、css、image 等静态资源时，就向服务器发送请求下载；
这个过程中不需要重新建立 TCP 连接，因为这时 TCP 连接并没有断开，这与`Connection: keep-alive`属性有关；

## TCP 连接断开

在请求和响应结束后，需要断开 TCP 连接，因为连接是双向的，所以浏览器和客户端需要分别断开，

1. 客户端发送一个 FIN，用来关闭客户 A 到服务器 B 的数据传送
2. 服务器收到这个 FIN，它发回一个 ACK，确认序号为收到的序号加 1。和 SYN 一样，一个 FIN 将占用一个序号。
3. 服务器 B 关闭与客户端 A 的连接，发送一个 FIN 给客户端 A。
4. 客户端 A 发回 ACK 报文确认，并将确认序号设置为收到序号加 1。

## HTTP 请求过程

1. DNS 解析
2. 获取 IP 地址，向服务器发送连接请求
3. 浏览器向服务器发起 HTTP 请求
4. 服务器接受请求，处理数据并返回响应
5. 浏览器获取响应数据，渲染页面
6. 断开连接

## 参考文献

- [一次完整的 HTTP 事务是怎样一个过程？](http://www.linux178.com/web/httprequest.html)
- [TCP3 次握手连接协议和 4 次握手断开连接协议](http://blog.csdn.net/lostyears/article/details/7104349)
