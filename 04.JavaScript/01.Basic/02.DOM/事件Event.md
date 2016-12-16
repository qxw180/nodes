# DOM事件
事件是一直异步编程的实现方式，本质上是在各个组成部分之间传递消息。

##一、DOM事件和EventTarget接口
DOM事件的操作都继承自[EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)接口

1. 绑定监听：`target.addEventListener(type,listener[,useCapture])`
	+ `target`：事件名称，大小写不敏感；
	+ `listener`：事件回调函数；
	+ `useCapture`：回调函数是否在捕获阶段(Capture)触发；默认`false`，为了兼容性建议总是填写该函数；
2. 移除监听：`target.remveEventListener(type,listener[,useCapture])`
	+ 移除事件监听时，必须与对应添加事件的方法参数和元素完全一致；
3. 触发事件：`target.dispatchEvent(event)`
	+ 事件返回值为一个布尔值，只要一个监听函数调用`Event.preventDefault()`就返回`false`，否则返回`true`；

##二、监听函数
1. HTML标签on-属性：`<body onload="doSomething()">`
	+ 监听只会在冒泡节点触发；
	+ `on-`属性的值只是监听代码，不是监听函数，如果要执行函数必须在加上括号；
	+ 回调函数内部的`this`指向全局对象，因为只是调用函数执行；
2. Element节点的时间属性：`window.onload = doSomething;`
	+ 监听只会在冒泡节点触发；
	+ 重复定义，之前定义的回被覆盖
	+ 回调函数内部的`this`指`element`节点；
3. addEventListener方法
	+ 可以针对同一个时间添加多个监听
	+ 能够制定在事件的哪个阶段触发回调函数
	+ 可以添加在`window`、`XMLHttpRequest`等对象上面
	+ 回调函数内部的`this`指`element`节点；

##三、事件的传播(propagation)
一个事件发生后会在不同的DOM节点之间传播

1. 事件传播的三个阶段
	1. 捕获阶段(capture)：从`window`对象传导到目标节点；
	2. 目标阶段(target)：在目标节点上触发；
	3. 冒泡阶段(bubbling)：从目标节点传回`window`对象；
2. 事件代理：由于事件会在冒泡阶段向上传导到父节点，因此可以把子节点的监听函数定义到父节点上，由父节点监听函数统一处理多个子节点的事件；事件代理有以下优点：
	1.只需要添加一个监听函数
	2.后添加进来的子节点也可以响应事件


##四、Event对象
事件发生后会产生一个事件对象，作为参数传递给监听函数。浏览器提供了一个[Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)对象，所有事件都是这个对象的实例。

+ Event对象属性
	* `bubbles`：只读、布尔类型，表示当前事件是否会冒泡；
	* `eventPhase`：返回一个状态码，表示事件当前所处阶段
		- 0：没有发生
		- 1：处于捕获阶段
		- 2：处于目标阶段
		- 3：处于冒泡阶段
	* `cancelable`：只读、布尔，表示事件是否可以取消；
	* `defaultPrevented`：布尔，表示事件是否掉用过`preventDefault`方法；
	* `currentTarget`：返回当前事件所在节点
	* `target`：返回触发事件节点
	* `type`：返回事件类型
	* `detail`：返回一个数值，表示事件的某种信息。具体含义与事件类型有关，对于鼠标事件，表示鼠标按键在某个位置按下的次数，比如对于dblclick事件，detail属性的值总是2。
	* `timeStamp`：返回事件发生事件
+ Event对象方法
	* `preventDefault()`：取消浏览器对当前事件的默认行为，例如链接跳转、checkbox选中、空格滚动页面等
		- 该方法对`cancelable`为`false`的事件无效
		- 该方法不会阻止事件的传播
		- 监听函数返回`false`也可以达到同样的效果
	* `stopPropagation()`：阻止事件继续传播，但是不会阻止当前节点的其他监听函数
	* `stopImmediatePropagation`：阻止同一个事件的其他监听函数执行
+ 对象创建：`new Event(type,initArgs)`
	* `type`：字符串，事件名称
	* `intiArgs`：对象，事件对象的配置，可以配置以下两个属性
		- `bubbles`：布尔值，默认false，是否冒泡
		- `bubbles`：布尔值，默认false，是否可以被取消


##五、自定义事件和事件模拟
用户可以手动定义事件，然后手动触发。

	// 新建事件实例
	var event = new Event('build');

	// 添加监听函数
	elem.addEventListener('build', function (e) { ... }, false);

	// 触发事件
	elem.dispatchEvent(event);

Event构造函数只能指定事件名，无法绑定数据。[CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)支持绑定数据。

	var myEvent = new CustomEvent("myevent", {
		detail: {
	  		foo: "bar"
	  	},
	  	bubbles: true,
	  	cancelable: false
	});

	el.addEventListener('myevent', function(event) {
	  	console.log('Hello ' + event.detail.foo);
	});

	el.dispatchEvent(myEvent);


## 六、参考文献
[Event对象-阮一峰](http://javascript.ruanyifeng.com/dom/event.html)