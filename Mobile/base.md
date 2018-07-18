#移动端开发综合笔记
H5页面模版[HTML5 ★ BOILERPLATE](https://html5boilerplate.com/)

##设置相关
+ 忽略页面的数字为电话，忽略email识别：`<meta name="format-detection" content="telephone=no, email=no"/>`
+ 移动端禁止选中内容：`-webkit-user-select: none;`
+ 禁止保存或拷贝图像：`-webkit-touch-callout: none;`


##键盘设置相关
+ 关闭iOS键盘首字母自动大写：`<input type="text" autocapitalize="off" />`
```
	<input type="number" />
	<!-- 在IOS设备中调出九宫格数字键盘，以下两种方式均可 -->
	<input type="number" pattern="[0-9]*" />
	<input type="tel" />
```

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

