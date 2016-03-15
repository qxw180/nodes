##关于B/S架构
> Browser/Server结构，就是浏览器发送请，通过网络将请求发送到服务器，然后服务器响应请求，再通过网络将响应返回给浏览器的架构；

那么这其中就涉及到几个问题

1. 浏览器怎么找到服务器
2. 找到服务器之后如何能和服务能够搭上话
3. 搭上话之后如何能互相听明白都说的是什么

首先关于怎么找到服务器这个问题用的就是所谓的DNS解析，获取服务器的IP地址，
然后和服务器搭上话用的是所谓的TCP协议
最后服务器和浏览器之间通话时都准守HTML协议就OK了

B/S架构是基于网络的架构，IP协议解决了网络层问题、TCP协议解决了传输层问题、HTML协议解决了应用层的问题；

---
与B/S架构相对应的还有C/S架构(Client/Server)，它们之间最大的区别就是关于连接状态的区别

+ B/S架构在完成一次请求和响应之后会断开连接，
+ C/S架构的连接状态是一直存在的，即是双向通信，客户端可以向服务器发送请求，服务端也可以主动向客户端推送信息

---

##DNS解析
> 互联网为了定义连入的电脑，为每一台连入的电脑都分配了一个唯一的地址标识即IP地址，像这个样子`45.652.3.2`；
> 但是这个纯数字的地址没有任何意义，实在是好记；所以就发明了域名这个东西，例如`http://www.github.com`，也就是给IP地址起了一个有意义的别名；
> DNS解析就是通过域名找到IP地址的过程；
> 这个过程大致分为以下几步

1. 从浏览器自设的缓存查找，这个缓存的时间比较短(1分钟左右)，容量也比较小(1000条左右)，如果没找到继续
2. 从操作系统缓存中获取，如果没找到继续
3. 从系统`host`文件中查找(修改`host`文件实现翻墙是一个好办法)，如果没找到继续
4. 发起DNS系统调用，一般为运营商，运营商会通过以下步骤获取IP地址，以`http://www.github.com`为例
    1. 首先查看查找自身缓存，国内运营商不靠谱的DNS缓存遍地是坑啊，如果找不到继续
    2. 向根域发起访问，根域会告诉`.com`域的IP地址，
    3. 然后向`.com`域发起访问，然后`.com`DNS服务告诉`github.com`的IP地址
    4. ...依次列推
    5. 然后获取的IP地址返回给浏览器
5. 当然还有一些及特殊情况意思几步都找不到的情况，这里不做讨论；

##TCP协议
> TCP协议是一个端到端的连接协议；
> 拿到域名对应的IP地址之后，浏览器会以一个随机端口(1024 < 端口 < 65535)向服务器的WEB程序(httpd,nginx等)80端口发起TCP的连接请求。
> 这个连接的建立过程分三步，俗称3次握手；

1. 浏览器首先向服务器发送一个带`SYN`标志的数据包，并进入SYN_SEND状态，等待服务器确认；
2. 服务器接收到数据包后返回一个带有`SYN/ACK`的数据包，此时服务器进入SYN_RECV状态；
3. 最后浏览器在发送一个带有`ACK`的数据包给服务器，客户端和服务器进入ESTABLISHED状态，代表握手结束，连接成功；
完成三次握手，客户端与服务器开始传送数据。

> 三次握手的意义在于验证发送端和接收端是都准守`TCP/IP`协议

##HTTP协议

####HTTP请求包括请求行、请求头和内容三部分
    
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

#####请求类型
+ GET: 完整请求一个资源 （常用）
+ HEAD: 仅请求响应首部
+ POST：提交表单  （常用）
+ PUT: (webdav) 上传 
+ DELETE：(webdav) 删除 
+ OPTIONS：返回请求的资源所支持的方法的方法 
+ TRACE: 追求一个资源请求中间所经过的代理 

#####请求头字段含义
+ `Accept`  就是告诉服务器端，我接受那些MIME类型
+ `Accept-Encoding`  这个看起来是接受那些压缩方式的文件
+ `Accept-Lanague`   告诉服务器能够发送哪些语言 
+ `Connection`       告诉服务器支持keep-alive特性
+ `Cookie`           每次请求时都会携带上Cookie以方便服务器端识别是否是同一个客户端
+ `Host`             用来标识请求服务器上的那个虚拟主机，比如Nginx里面可以定义很多个虚拟主机那这里就是用来标识要访问那个虚拟主机。
+ `User-Agent`       用户代理，一般情况是浏览器，也有其他类型，如：wget curl 搜索引擎的蜘蛛等条件请求首部：
+ `If-Modified-Since` 是浏览器向服务器端询问某个资源文件如果自从什么时间修改过，那么重新发给我，这样就保证服务器端资源文件更新时，浏览器再次去请求，而不是使用缓存中的文件
安全请求首部：
+ `Authorization`: 客户端提供给服务器的认证信息；

---
####HTTP响应包括状态行、HTTP头和内容三部分
    
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

#####状态行-状态吗
+ 信息类 (100-199)
+ 响应成功 (200-299)
+ 重定向类 (300-399)
    * 301: 永久重定向, Location响应首部的值仍为当前URL，因此为隐藏重定向;
    * 302: 临时重定向，显式重定向, Location响应首部的值为新的URL
    * 304：Not Modified，未修改，比如本地缓存的资源文件和服务器上比较时，发现并没有修改，服务器返回一个304状态码，告诉浏览器，你不用请求该资源，直接使用本地的资源即可。
+ 客户端错误类 (400-499)
+ 服务端错误类 (500-599)



##HTML解析
> 浏览器拿到HTML后就开始解析HTML代码，遇到js、css、image等静态资源时，就向服务器发送请求下载
> 这个过程中不需要重新建立TCP连接，因为这时TCP连接并没有断开
> 这与`Connection: keep-alive`属性有关


##TCP连接断开
> 在请求和响应结束后，需要断开TCP连接
> 因为连接是双向的，所以浏览器和客户端需要分别断开，

1. 客户端发送一个FIN，用来关闭客户A到服务器B的数据传送
2. 服务器收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。
3. 服务器B关闭与客户端A的连接，发送一个FIN给客户端A。
4. 客户端A发回ACK报文确认，并将确认序号设置为收到序号加1。


##HTTP请求过程
1. DNS解析
2. 获取IP地址，向服务器发送连接请求
3. 浏览器向服务器发起HTTP请求
4. 服务器接受请求，处理数据并返回响应
5. 浏览器获取响应数据，渲染页面
6. 断开连接


##HTTP和HTTPS
> HTTP协议通常承载于TCP协议之上，有时也承载于TLS或SSL协议层之上，这个时候，就成了我们常说的HTTPS。
> 默认HTTP的端口号为80，HTTPS的端口号为443。
> 因为网络请求需要中间有很多的服务器路由器的转发。中间的节点都可能篡改信息，而如果使用HTTPS，密钥在你和终点站才有。
> https之所以比http安全，是因为他利用ssl/tls协议传输。它包含证书，卸载，流量转发，负载均衡，页面适配，浏览器适配，refer传递等。保障了传输过程的安全性

##参考文献
[一次完整的HTTP事务是怎样一个过程？](http://www.linux178.com/web/httprequest.html)
[TCP3次握手连接协议和4次握手断开连接协议](http://blog.csdn.net/lostyears/article/details/7104349)