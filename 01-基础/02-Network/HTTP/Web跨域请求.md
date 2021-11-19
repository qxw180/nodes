# Web 跨域

## 浏览器同源策略和跨域请求

只有相同协议、相同域名、相同端口的情况下才是同源，凡是不符合同源的请求都属于跨域请求。出于安全原因，浏览器限制跨域请求，即同源策略。
 浏览器并不一定会  对起跨域请求进行拦截，浏览器仍会发请求，但是  会  对响应进行拦截。部分浏览器不允许 HTTPS 页面跨域请求 HTTP 资源，会直对请求进行拦截。

## Ajax 跨域请求

### 跨域资源共享(CORS)机制

跨域资源共享(Cross-Origin Resource Sharing)，H5 规范定义的跨域资源访问控制机制，允许页面向跨域服务器发出跨域资源请求。
CORS 需要浏览器和服务器同时支持，低版本 IE(IE10 开始支持)不支持。CORS 是 HTTP 协议的扩展，新增了一组 HTTP 头部字段， 允许付服务器声明允许哪些站点跨域访问 。

1. 优点：简单方便
   缺点：兼容性问题，IE8 和 IE9 的该方法不是部署在 XMLHttpRequest 对象，而是部署在 XDomainRequest 对象

2. 原理：
   服务器的`response`头会有一个`Access-Control-Allow-Origin`头信息，`Access-Control-Allow-Origin`的值可以为具体域名也可以为`*`代表所有域名，浏览器会检测属性值中是否包含本域，如果包含则请求成功，如果失败将无法获取任何数据。

3. CORS 发送 cookie:
   只设置`Access-Control-Allow-Origin`并不能把 cookie 带过去，服务端可以在设置`Access-Control-Allow-Credentials:true`响应头既可.但是在设置`Access-Control-Allow-Credentials:true`时，`Access-Control-Allow-Origin`的值不能为通配符，必须设置具体域名。

4. 预检请求和简单请求：
    部分请求  在跨域访问之前需要先使用 OPTION 方法发送一个预检请求到服务器，以获知服务器是否允许实际请求。这种请求称为预检请求。
   原理是，当发生跨域资源访问的时候，浏览器首先会使用`OPTIONS`方法发起一个预检请求，从而获知服务器是否允许该跨域请求，服务器允许之后才会发起 HTTP 请求。
   某些请求不会触发 CORS 预检请求，这样的请求称为简单请求，同时满足以下条件的即为简单请
   1. 请求方法为以下：`get` `post` `head`
   2. HTTP 的头信息不超出以下几种字段：
      1. `Accept`
      2. `Accept-Language`
      3. `Content-Language`
      4. `Last-Event-ID`
      5. `Content-Type`，并且值仅限`application/x-www-form-urlencoded、multipart/form-data、text/plain`

### JSONP

原理：在浏览器中，`<script>`、`<img>`、`<iframe>`、`<link>`等标签都可以加载跨域资源；
首先在页面定义  一个回调函数`callback`，然后文档中动态引入一个 js 文件， 并将`callback`以 url 参数的形式传递给后台。
后台生成 js 为一个直接运行的函数，函数名为`callback`，参数为要请求的数据。

```JavaScript
function coGet(){
  var tag = document.createElement('script');
  tag.type = "text/javascript";
  tag.src = "http://www.test.com?callback=callBack"
  document.getElementsByTagName('head')[0].appendChild(tag);
}

function callBack(msg){ console.log(msg) }

coGet();

// 加载的js文件内容为；
callBack("HELLO JSONP");
```

优点：兼容性好，简单易用
缺点：只支持 get 请求，污染全局变量，不支持同步

### 服务器转发

把问题扔给后台，在同域后台架设一个代理服务来转发请求；

## 参考

[axios 跨域请求详解](https://juejin.cn/post/6844903850684465159)
