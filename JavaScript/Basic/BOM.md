#JavaScript BOM
BOM(Browser Object Model)提供了js和浏览器的交互功能

+ window：window对象不但充当全局作用域，而且表示浏览器窗口。
	* `innerWidth innerHeight`：浏览器显示网页净宽高，除去浏览器工具栏、状态栏等部分；
	* `screen`：
		- `screen.width`：屏幕宽度，以像素为单位；
		- `screen.height`：屏幕高度，以像素为单位；
		- `screen.colorDepth`：返回颜色位数，如8、16、24。
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


