# 使用CDN的原因

1. 来自同一域名的资源(css img js...)浏览器一般同时下载6个，如果来自不同域名则没有限制；

## 浏览器缓存

1. 浏览器第一次加载资源，服务返回`200`状态码，浏览器将资源下载并根据响应头的缓存设置进行设置
2. 下一次请求资源的时候浏览器会判断资源是否过期，如果未过期则不发送请求，直接使用本地缓存内容。如果已过期则向服务器发送带有`If-None-Match`和`If-Modified-Since`的请求；
3. 服务器收到请求后会验证缓存是否命中，如果命中则返回`304`。否则直接返回资源并带上新的缓存header，返回`200`。
4. 浏览器接收到`304`则直接使用缓存资源

通过response header 设置缓存策略，分为强制缓存和协商缓存两种

+ 强制缓存
  + HTTP 1.O `Expires`：设置过期时间，例子：`Expires: Sun, 05 Apr 2020 15:29:45 GMT`
  + HTTP 1.1 `Cache-Control`：设置缓存时间，优先级高于`Expires`。例子：`cache-control: max-age=604800`
    + `no-cache`：必须先与服务器确认是否修改
    + `no-store`：完全禁止缓存
    + `public`：
    + `private`：浏览器可以进行缓存，但是不运行代理服务器进行缓存
    + `max-age`：设置资源缓存时间，单位为毫秒
+ 协商缓存
  + `ETag`和`If-None-Match`：响应头部使用`etag: "5e86f5b2-4ec"`为资源添加标识，浏览器会记录该标识，洗一次请求该资源会使用`if-none-match: "5e86f5b2-4ec"`加入到请求头部信息，服务器会对比Etag值，如果相同则命中缓存。
  + `Last-Modified`和`If-Modified-Since`：和Etag原理类似，Last-Modified是通过记录修改时间来进行缓存对比。例子：`last-modified: Fri, 03 Apr 2020 08:37:06 GMT`，`if-modified-since: Fri, 03 Apr 2020 08:37:06 GMT`
  + `Etag`相比较`Last-Modified`优先级跟高、精度更高，同时服务器资源消耗也更高
