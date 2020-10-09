# AJAX

使用 AJAX 可以在页面不刷新的情况下发起请求；
在现代浏览器(IE7+)中使用的是 XMLHttpRequest 对象实现前后台异步数据交互；

```javascript
var xmlhttp = new XMLHttpRequest(); // 创建对象
xmlhttp.onreadystagechange = function () {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    console.log(xml.responseText);
  }
};
xmlhttp.onerror = function (e) {
  console.error(xmlhttp.statusText);
};
xmlhttp.open(method, url, async); // 创建请求
xmlhttp.setRequestHeader(header, value, true); // 设置请求头
xmlhttp.send(string); // 发送请求
```

## XHR 属性

- `readyState`请求状态，每次状态变化都会触发`onStateChange()`方法
  - 0: 对应常量`UNSENT`，请求未初始化，XMLHttpRequest 实例已经生成，未调用`open()`
  - 1: 对应常量`OPEND`，服务器连接已建立，未调用`send()`，仍然可以使用`setRequestHeader()`设定请求头信息
  - 2: 对应常量`HEADERS_RECEIVED`，请求已发出，`send()`方法已执行，头信息和状态码已收到
  - 3: 对应常量`LOADING`，正在接收服务器传来的 body 部分数据， \* 4: 对应常量`DONE`，请求已完成，接受数据成功或失败
- `onreadystatechange`：readyState 改变时的回调函数；
- `status`：请求 response 状态码
- `response`：只读属性，返回收到的数据(body 部分)。可以是 ArrayBuffer、Bolb、Document、JSON 对象，取决于`XMLHttpRequest.responseType`属性
- `responseText`：如果来自服务器的响应并非 XML，请使用`responseText`属性。
- `responseXML`：如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用`responseXML`属性；
- `responseType`：指定服务器返回数据类型
  - `""`：字符串（默认值）
  - `arraybuffer`：ArrayBuffer 对象
  - `blob`：Blob 对象
  - `document`：Document 对象
  - `json`：JSON 对象
  - `text`：字符串
- `timeout`：请求超时时间，单位毫秒，默认 0，表示没有限制；
- `ontimeout`：请求超时回调函数；
- `withCredentials`：布尔值，表示跨域请求时，用户信息(cookie 和认证的 HTTP 头信息)是否包含在请求中，默认 false；

## XHR 方法

- `open(method,url,async,user,pwd)`：创建请求
  - `method`：请求类型，`GET`或`POST`；
  - `url`：请求路径；
  - `async`：`true`(异步)、`false`(同步)，默认`true`；同步模式下浏览器会停止响应，JavaScript 会等到服务器响应完成后才继续执行；
  - `user`：认证用户名 \* `pwd`：认证用户密码
- `send(string)`：发送请求
  - 在请求方式为`POST`时传入请求参数；`GET`类型的请求参数是直接拼接在`open`方法中的`url`参数中；
  - 类型可以为`String`或`FormData`；
- `setRequestHeader(header,value)`：
  - 设置请求头，必须在`open`之后`send`之前调用；
  - 可以通过多次调用设置多个头信息；
  - `header`：请求头名称；
  - `value`：请求头值；
- `about()`：终止发出去的请求，会触发 onreadystatechange 事件；
- `getAllResponseHeaders()`：获取返回的所有 http 响应头信息；
- `getResponseHeader(head-name)`：获取返回 http 响应头信息；

## XHR 事件

- `readyStateChange`：通过`onReadyStateChange`属性指定回调函数
- `progress`：
  - 上传文件时，XMLHTTPRequest 对象的 upload 属性有一个 progress，会不断返回上传的进度。
  - 对`upload`属性指定`progress`事件回调函数，即可获得上传的进度。
- `load`事件：表示服务器传来的数据接收完毕
- `error`事件：表示请求出错
- `abort`事件：表示请求被中断
- `loadend`：abort、load 和 error 这三个事件，会伴随一个 loadend 事件，表示请求结束，但不知道其是否成功。

## FormData 对象

XMLHttpRequest Level 2 添加了一个新的接口 FormData.利用 FormData 对象,我们可以通过 JavaScript 用一些键值对来模拟一系列表单控件,我们还可以使用 XMLHttpRequest 的 send()方法来异步的提交这个"表单".比起普通的 ajax,使用 FormData 的最大优点就是我们可以异步上传一个二进制文件.

```javascript
var oMyForm = new FormData();

oMyForm.append("username", "Groucho");
oMyForm.append("accountnum", 123456); // 数字123456被立即转换成字符串"123456"

// fileInputElement中已经包含了用户所选择的文件
oMyForm.append("userfile", fileInputElement.files[0]);

var oFileBody = "<a id="a"><b id="b">hey!</b></a>"; // Blob对象包含的文件内容
var oBlob = new Blob([oFileBody], { type: "text/xml"});

oMyForm.append("webmasterfile", oBlob);

var oReq = new XMLHttpRequest();
oReq.open("POST", "http://foo.com/submitform.php");
oReq.send(oMyForm);
```

- 构造对象：`new FormData (optional HTMLFormElement form)`
  - 参数可以为空：`new FormData()`
  - 参数可以为一个 form 对象：`new FormData(document.getElementById('myForm'))` \* 参数可以为 form 数据：`new FormData(document.getElementById('myForm').getFormData())`
- 添加数据：`append(name,value)`

使用 FormData 上次文件

```javascript
function sendForm() {
  var oOutput = document.getElementById("output");
  var oData = new FormData(document.forms.namedItem("fileinfo"));

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "stash.php", true);
  oReq.onload = function (oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML =
        "Error " + oReq.status + " occurred uploading your file.<br />";
    }
  };

  oReq.send(oData);
}
```

## 参考

[Ajax](http://javascript.ruanyifeng.com/bom/ajax.html)
[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)
[使用 FormData 对象](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)
[js 中几种实用的跨域方法原理详解](http://www.cnblogs.com/2050/p/3191744.html)
[同域限制和 window.postMessage 方法](http://javascript.ruanyifeng.com/bom/windowpostmessage.html)
