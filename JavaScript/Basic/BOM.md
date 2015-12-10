#JavaScript BOM
BOM(Browser Object Model)提供了js和浏览器的交互功能

+ window：window对象不但充当全局作用域，而且表示浏览器窗口。
	* `innerWidth innerHeight`：浏览器显示网页净宽高，除去浏览器工具栏、状态栏等部分；
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
		- `back()`
		- `forward()`


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

解决方案

```
setTimeout(function() {
  user.sayHi();
}, 1000);
或
setTimeout(user.sayHi.bind(user), 1000);
```

#####间隔执行`setInterval()`
`setInterval()`和`setTimeout()`的用法完全一致，`setInterval()`会没间隔一段时间执行一次；

#####定时器取消
`setTimeout`和`setInterval`函数，都返回一个表示计数器编号的整数值，将该整数传入`clearTimeout`和`clearInterval`函数，就可以取消对应的定时器。