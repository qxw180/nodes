#CORS HTTP访问控制
当一个资源从与该资源本身所在的服务器不同的域或者端口请求一个资源时，资源就会发起一个跨域HTTP请求。

##浏览器同源策略
出于安全原因，浏览器限制<em>从脚本发出的</em>HTTP请求。
浏览器并不一定会对起跨域请求进行拦截，浏览器仍会发请求，但是会对响应进行拦截。
部分浏览器不允许HTTS页面跨域请求HTTP资源，会直对截请求进行拦截。

浏览器除了对通过JavaScript脚本发出的请求执行同源策略还会对其他请求执行同源厕策略限制

##跨域资源共享(CORS)机制 
跨域资源共享(Cross-Origin Resource Sharing)，H5规范定义的跨域资源访问控制机制，允许页面向跨域服务器发出跨域资源请求。
COSR需要浏览器和服务器同时支持，低版本IE(IE10开始支持)不支持。
CORS是HTTP协议的扩展，新增了一组HTTP头部字段，允许付服务器声明允许哪些站点跨域访问。

####预检请求和简单请求
部分请求在跨域访问之前需要先使用OPTION方法发送一个预检请求到服务器，以获知服务器是否允许实际请求。这种请求称为预检请求。
某些请求不会触发CORS预检请求，这样的请求称为简单请求

原理是，当发生跨域资源访问的时候，浏览器首先会使用`OPTIONS`方法发起一个预检请求，从而获知服务器是否允许该跨域请求，服务器允许之后才会发起HTTP请求。
服务器的`response`头会有一个`Access-Control-Allow-Origin`头信息，浏览器会检测属性值中是否包含本域，如果包含则请求成功，如果失败将无法获取任何数据。

优点：简单方便
缺点：兼容性问题，IE8和IE9的该方法不是部署在XMLHttpRequest对象，而是部署在XDomainRequest对象

##跨域问题解决
###1.服务器转发
把问题扔给后台，在同域后台架设一个代理服务来转发请求；

###2.JSONP
原理：在浏览器中，`<script>`、`<img>`、`<iframe>`、`<link>`等标签都可以加载跨域资源；
首先在页面定义一个回调函数`callback`，然后文档中动态引入一个js文件，并将`callback`以url参数的形式传递给后台。
后台生成js为一个直接运行的函数，函数名为`callback`，参数为要请求的数据。
``` JavaScript	
function coGet(){
	var tag = document.createElement('script');
	tag.type = "text/javascript";
	tag.src = "http://www.test.com?callback=callBack"
	document.getElementsByTagName('head')[0].appendChild(tag);
}

function callBack(msg){
	console.log(msg);
}

coGet();

// 加载的js文件内容为；
callBack("HELLO JSONP");
```
优点：兼容性好，简单易用
缺点：只支持get请求，污染全局变量，不支持同步





##H5跨域标签
// TODO