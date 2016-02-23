#JavaScript BOM
BOM(Browser Object Model)提供了js和浏览器的交互功能

+ window：window对象不但充当全局作用域，而且表示浏览器窗口。
	* `name`：当前浏览器窗口名字，*浏览器刷新后属性值保持不变，关闭后会消失*，只能保存字符串，可以用于IFrame通讯；
	* `innerWidth innerHeight`：浏览器显示网页净宽高，除去浏览器工具栏、状态栏等部分，包括滚动条宽高；
	* `pageXOffset pageYOffset`：返回页面滚动距离；
	* `screen`：
		- `screen.width`：屏幕宽度，以像素为单位；
		- `screen.height`：屏幕高度，以像素为单位；
		- `screen.colorDepth`：返回颜色位数，如8、16、24。
	* `scrollX scrollY`：
	* `navigator`：浏览器信息
		- `navigator.appName`：浏览器名称；
		- `navigator.appVersion`：浏览器版本；
		- `navigator.language`：浏览器设置的语言；
		- `navigator.platform`：操作系统类型；
		- `navigator.userAgent`：浏览器设定的User-Agent字符串。
	* `location`：当前页面的URL信息,`http://www.example.com:8080/path/index.html?a=1&b=2#TOP`
		- `location.protocol`; // 'http'
		- `location.host`; // 'www.example.com'
		- `location.port`; // '8080'
		- `location.pathname`; // '/path/index.html'
		- `location.search`; // '?a=1&b=2'
		- `location.hash`; // 'TOP'
		- `location.assign(url)`：加载新页面
		- `location.reload()`：刷新页面
	* `document`：当前页面的DOM
		- `title`：从HTML文档中的`<title>xxx</title>`读取的，可以动态改变
		- 元素获取：
			+ `getElementById`
			+ `getElementsByTagName`
		- `cookie`
	* `history`：浏览器的历史记录
		- `length`：历史记录长度
		- `back()`
		- `forward()`
		- `go(num)`：支持整数和负数，`history.go(0)`相当于刷新当前页面
	* `frames`：返回页面内所有框架的数组集合
	* 


####定时器
#####延迟执行`setTimeout(func|code,delay[,attr...])`
```
setTimeout(function(a,b){
  console.log(a+b);
},1000,1,1);
```
######参数
+ <small>`func|code`：要执行的函数或代码。推迟执行的代码必须以字符串的形式传入，JavaScript引擎使用`eval`函数执行；
+ `delay`：延迟毫秒数；
+ `attr`：函数参数，`setTimeout`方法允许传入多个参数，除前两个参数外，后面的参数为延迟执行代码的参数传入；</small>

######`this`
`setTimeout`回调函数是对象方法的话，方法中的`this`指向的不是调用对象，而是全局变量

```
function User(login) {
  this.login = login;
  this.sayHi = function() {
    console.log(this.login);
  }
}
var user = new User('John');
setTimeout(user.sayHi, 1000);//undefined;
```

解决方案：使用`bind`方法绑定上下文

```
setTimeout(function() {
  user.sayHi();
}, 1000);
或
setTimeout(user.sayHi.bind(user), 1000);
```

#####间隔执行`setInterval(function|code,delay[,attr...])`
`setInterval()`和`setTimeout()`的用法完全一致，`setInterval()`会没间隔一段时间执行一次；
`delay`参数指的是每次开始执行任务直接的间隔时间，并不考虑任务的执行时间；
HTML 5标准规定，setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒。

#####定时器取消
`setTimeout`和`setInterval`函数，都返回一个表示计数器编号的整数值，将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。

参考链接
[定时器](http://javascript.ruanyifeng.com/bom/timer.html)



####[Nitifications](http://javascript.ruanyifeng.com/bom/notification.html)
> 浏览器通知接口

代码示例
```
if(window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function(status) {
        var n = new Notification('通知标题', { body: '这里是通知内容！' }); 
    });
}
```

AIP
+ `Notification(title, options);`：构造函数
	* `options`
		- dir：文字方向，可能的值为auto、ltr（从左到右）和rtl（从右到左），一般是继承浏览器的设置。
		- lang：使用的语种，比如en-US、zh-CN。
		- body：通知内容，格式为字符串，用来进一步说明通知的目的。
		- tag：通知的ID，格式为字符串。一组相同tag的通知，不会同时显示，只会在用户关闭前一个通知后，在原位置显示。
		- icon：图表的URL，用来显示在通知上。
+ `Notification.permission`：用户权限设置
	* `default`：用户还没有做出任何许可，因此不会弹出通知。
	* `granted`：用户明确同意接收通知。
	* `denied`：用户明确拒绝接收通知。
+ `Notification.requestPermission()`：发出请求，询问用户是否同意弹出通知
+ 实例事件
	* `show`：通知显示给用户时触发。
	* `click`：用户点击通知时触发。
	* `close`：用户关闭通知时触发。
	* `error`：通知出错时触发（大多数发生在通知无法正确显示时）
+ 实例方法
	* `close()`：关闭通知



