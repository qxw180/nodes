#CSS3

##选择器
+ 属性选择器
	* `[attribute]`：有某属性
	* `[attribute=xxx]`：属性值为..
	* `[attribute~=xxx]`：属性值包含..
	* `[attribute|=xxx]`：属性值以..开头
	* `[attribute^=xxx]`：属性值以..开头
	* `[attribute$=xxx]`：属性值以..结尾
	* `[attribute*=xxx]`：某属中包含..
+ 结构性伪类选择器
	* `:root`：根选择器，等于`html{}`
	* `:not`：否定选择器
	* `:empty`：空元素选择器
	* `:target`：目标选择器
	* `:first-child`：第一子元素选择器
	* `:last-child`：最后子元素选择器
	* `:nth-child(n)`
		- n从1开始，不是0
		- odd
		- even
		- 表达式：`3n-1`
	* `:nth-last-child(n)`
	* `:first-of-type`
	* `:last-of-type`
	* `:nth-of-type(n)`
	* `:nth-last-of-type(n)`
	* `:only-child`：唯一子元素
	* `:only-of-type`：唯一类型元素
+ 表单元素选择器
	* `:enabled`
	* `:disabled`
	* `:checked`：选中checkbox
	* `::selection`：鼠标拖动选中文本样式

##样式相关

+ 圆角：`border-radius:[px、em、%]`
+ 块阴影：`box-shadow:x轴偏移 y轴偏移 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式]`
	* 可以设置多个投影，各组投影使用逗号隔开
	* 偏移量：允许负值
	* 阴影颜色：默认黑色
	* 投影方式：默认外投影，内投影`inset`
+ 边框图片：`border-image`，没想到应用场景啊
+ 文字阴影:`text-shadow:x轴偏移 y轴偏移 模糊半径 颜色`
+ 文本轮廓：`text-outline:轮廓粗细 模糊半径 颜色`目前所有浏览器均不支持该属性
+ 文本溢出：`text-overflow:ellipsis|clip`
	* 文本单行显示，溢出省略号：`text-overflow:ellipsis;overflow:hidden;white-space:nowrap; `
	* 多行文本，溢出省略号：`overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical; `
+ 折行处理：`word-break: normal|break-all|keep-all;`
+ 半透明颜色：`rgba(r,g,b,a)`实现半透明背景非常好用
+ 渐变色
	* 线性渐变：`background-image:linear-gradient(渐变方向，渐变颜色)`
	* 径向渐变：`background-image:radial-gradient(渐变颜色)`
	* 渐变方向：支持角度(180 deg)或固定英文，默认180deg
		- to top(0deg)
		- to right(90deg)
		- to botton(180deg)
		- to left(360deg)
		- to top left(45deg)
		- ...
	* 渐变颜色：支持多个值，用逗号`,`分隔，最少两个值
+ 自定义字体
<pre>@font-face {
    	font-family : 字体名称;
    	src : 字体文件在服务器上的相对或绝对路径;
	}</pre>
+ 背景
	* 背景图片起始位置：`background-origin ： border-box | padding-box | content-box;`
	* 背景裁切：`background-clip ： border-box | padding-box | content-box | no-clip`
	* 背景尺寸：`background-size: auto | <长度值> | <百分比> | cover | contain`
		- cover：等比缩放，使图片覆盖整个背景
		- contain：等比缩放，宽度或高度达到覆盖整体




##布局相关



##动画相关

