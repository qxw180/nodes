#AJAX
> 使用AJAX可以在页面不刷新的情况下发起请求；
> 在现代浏览器(IE7+)中使用的是XMLHttpRequest对象实现前后台异步数据交互；

###Demo
```
var xmlhttp = new XMLHttpRequest();// 创建对象
xmlhttp.onreadystagechange=function(){
	if(xmlhttp.readyState==4&&xmlhttp.status==200){
		console.log(xml.responseText);
	}
}
xmlhttp.onerror = function (e) {
  console.error(xmlhttp.statusText);
};
xmlhttp.open(method,url,async);// 创建请求
xmlhttp.setRequestHeader(header,value)// 设置请求头
xmlhttp.send(string);// 发送请求


```
###API
属性
+ `readyState`请求状态
	* 0: 请求未初始化，未调用`open`
	* 1: 服务器连接已建立，未调用`send`
	* 2: 请求已接收
	* 3: 请求处理中
	* 4: 请求已完成，且响应已就绪
+ `status`请求状态码
+ `responseType`：指定服务器返回数据类型
	* `""`：字符串（默认值）
	* `arraybuffer`：ArrayBuffer对象
	* `blob`：Blob对象
	* `document`：Document对象
	* `json`：JSON对象
	* `text`：字符串
+ `responseText`：如果来自服务器的响应并非 XML，请使用`responseText`属性。
+ `responseXML`：如果来自服务器的响应是 XML，而且需要作为 XML 对象进行解析，请使用`responseXML`属性；
+ `timeout`：请求超时时间，单位毫秒；

方法
+ `open(method,url,async)`：创建请求
	* `method`：请求类型，`GET`或`POST`；
	* `url`：请求路径；
	* `async`：`true`(异步)、`false`(同步)，默认`true`；同步模式下浏览器会停止响应，JavaScript会等到服务器响应完成后才继续执行；
+ `send(string)`：发送请求
	* 在请求方式为`POST`时传入请求参数；`GET`类型的请求参数是直接拼接在`open`方法中的`url`参数中；
	* 类型可以为`String`或`FormData`；
+ `setRequestHeader(header,value)`：设置请求头，必须在`open`之后`send`之前调用
	* `header`：请求头名称；
	* `value`：请求头值；
+ `about()`：终止发出去的请求；
+ `onreadystatechange`：readyState改变时的回调函数；
+ `ontimeout`：请求超时回调函数；
+ `progress`：上传文件时，XMLHTTPRequest对象的upload属性有一个progress，会不断返回上传的进度。



####FormData对象
XMLHttpRequest Level 2添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件.

浏览器支持情况：IE10+

```
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

#####API
+ 构造对象：`new FormData (optional HTMLFormElement form)`
	* 参数可以为空：`new FormData()`
	* 参数可以为一个form对象：`new FormData(document.getElementById('myForm'))`
	* 参数可以为form数据：`new FormData(document.getElementById('myForm').getFormData())`
+ 添加数据：`append(name,value)`

####使用FormData上次文件
```
function sendForm() {
  var oOutput = document.getElementById("output");
  var oData = new FormData(document.forms.namedItem("fileinfo"));

  oData.append("CustomField", "This is some extra data");

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "stash.php", true);
  oReq.onload = function(oEvent) {
    if (oReq.status == 200) {
      oOutput.innerHTML = "Uploaded!";
    } else {
      oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
    }
  };

  oReq.send(oData);
}
```

###跨域


##参考文献
[Ajax](http://javascript.ruanyifeng.com/bom/ajax.html)
[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)
[使用FormData对象](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)