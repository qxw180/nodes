#WebApp开发问题及解决笔记

##Viewprot
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>

+ `width`: viewport宽度
	* Number
	* device-width
+ `height`: viewport高度
	* Number
	* device-height
+ `initial-scale`: 初始缩放比例
+ `maximum-scale`: 最大缩放比例
+ `minimum-scale`: 最小缩放比例
+ `user-scalable`: 是否允许用户缩放
	* yes
	* no

Viewport的由来
> 因为移动设备的屏幕较小，传统web页面在移动设备会出现横向滚动条，在使用流动布局的页面上布局会被压乱；
> 苹果为解决这个问题设计了viewport，viewport就是一个虚拟窗口，宽度大概为980px(不同的厂商的设备略有区别)；
> 页面在这个虚拟窗口(layout viewport)上进行CSS渲染，然后再视觉窗口(visual viewport)通过拖拽和缩放就可以满足大部分网页的显示需求；

现在的viewport
> 现在绝大部分公司都针对移动设备进行单独设计；
> 那么在默认的viewport宽度上显示这些网页就会出现新的问题，开发出来的页面只占了viewport的一小部分；
> 所以我们需要对viewport进行设置



##设置相关
+ 关闭iOS键盘首字母自动大写：`<input type="text" autocapitalize="off" />`
+ 忽略页面的数字为电话，忽略email识别：`<meta name="format-detection" content="telephone=no, email=no"/>`
+ 移动端禁止选中内容：`-webkit-user-select: none;`
+ 禁止保存或拷贝图像：`-webkit-touch-callout: none;`
+ IOS滚动条：`-webkit-overflow-scrolling: touch;`
+ 删除灰色背景链接点击:`-webkit-tap-highlight-color:rgba(0,0,0,0);`
+ 解决字体在移动端比例缩小后出现锯齿的问题：`-webkit-font-smoothing: antialiased`
+ 消除transition闪屏：`-webkit-transform-style: preserve-3d;-webkit-backface-visibility: hidden;`
+ Safari绝对定位font-size失效：`-webkit-text-size-adjust:100%;`
+ 链接、表单获取焦点时高亮颜色：`-webkit-tap-highlight-color: rgba(0, 0, 0, 0);`

##键盘设置相关

	<input type="number" />
	<!-- 在IOS设备中调出九宫格数字键盘，以下两种方式均可 -->
	<input type="number" pattern="[0-9]*" />
	<input type="tel" />

##多行文本省略号
	//单行
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	//多行
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;

##Android上原型图片使用border边框显示变形
在img外嵌套元素，为嵌套元素使用圆角

	<div>
	    <img src="">
	</div>

	div{
	    display: inline-block;
	    border-radius: 50%;
	    border: 4px solid #FF7000;
	}
	img{
	    vertical-align: top;
	}

##Android圆角元素背景颜色溢出
	
	{
	    background-clip: padding-box;
	}

##Android圆角使用Animataion做loading动画，圆角背景色溢出
使用圆角蒙版遮住多余部分

	{
	    background-color: #F9CEAC;
	    border-radius: 32px 0 0 32px;
	    -webkit-mask-image: url(http://i.gtimg.cn/qqlive/images/20150527/btn_mask.png);
	}

##CSS三角在Android上显示为方块
可能是对这个三角使用了圆角，去掉 border-radius

	{
	    border: 10px solid transparent;
	    border-left-color: #000;
	    /*border-radius: 2px;*/
	}

##`:active` 样式不生效
Safari 默认禁用了元素的 active 样式，我们通过声明 touchstart 来覆盖默认事件，就可以让 active 样式重新激活。

	document.addEventListener("touchstart", function() {},false);


##IOS设备的iframe问题
> 在ios中本身是不提供iframe控件的scroll滚动效果
> 要实现滚动操作的话需要通过附加div层来实现

	<div>
	    <iframe src=""></iframe>
	</div>

	div{
	    height: 100px;
	    overflow: auto;
	    -webkit-overflow-scrolling: touch;
	}

##事件相关


##表单元素样式重置
	div	{
		appearance:button;
		-moz-appearance:button; /* Firefox */
		-webkit-appearance:button; /* Safari 和 Chrome */
	}
	normal	将元素呈现为常规元素。
	icon	将元素呈现为图标（小图片）。
	window	将元素呈现为视口。
	button	将元素呈现为按钮。
	menu	将元素呈现为一套供用户选择的选项。
	field	将元素呈现为输入字段。

##Retina

##Geolocation 定位
> geolocation接口用于获取用户的地理位置，浏览器基于GPS、IP等机制获取地理位置信息并通过geolocation接口和js交换
> IE9+浏览器均指出该接口

例子

```
// 获取用户位置信息
navigator.geolocation.getCurrentPosition(
	function(event){
		console.log(event.coords.latitude,',',event.coords.longitude);
	}
	,function(event){
		console.log("Error code " + event.code + ". " + event.message);
	}
);
// 监听用户位置信息
var watchID = navigator.geolocation.watchPosition(geoSuccess,geoError, option);
navigator.geolocation.clearWatch(watchID);
```

API
+ `getCurrentPosition(geoSuccess,geoError)`：获取用户地理位置
	* `geoSuccess`：获取信息成功回调函数
		- `coords.latitude`：纬度
		- `coords.longitude`：经度
		- `coords.accuracy`：精度
		- `coords.altitude`：海拔
		- `coords.altitudeAccuracy`：海拔精度（单位：米）
		- `coords.heading`：以360度表示的方向
		- `coords.speed`：每秒的速度（单位：米）
	* `geoError`：获取信息失败回调函数(例如用户不允许)
		- 0：未知错误，浏览器没有提示出错的原因，相当于常量event.UNKNOWN_ERROR。
		- 1：用户拒绝授权，相当于常量event.PERMISSION_DENIED。
		- 2：没有得到位置，GPS或其他定位机制无法定位，相当于常量event.POSITION_UNAVAILABLE。
		- 3：超时，GPS没有在指定时间内返回结果，相当于常量event.TIMEOUT。
+ `watchPosition()`：监听用户位置改变
+ `clearWatch()`：取消监听