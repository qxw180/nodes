#CSS3

##选择器
+ 属性选择器
	* `[attribute]`：有某属性
	* `[attribute=value]`：属性值为`value`
	* `[attribute~=value]`：属性有多个属性值，且`value`为其中之一
	* `[attribute*=value]`：属性值中包含`value`
	* `[attribute^=value]`：属性值以`value`开头
	* `[attribute$=value]`：属性值以`value`结尾
	* `[attribute|=value]`：属性值是`value`或以`value-`开头
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
	* `:read-only`
	* `:read-write`
	* `:::before` and `::after`
	> 双冒号和单冒号是为了进行规范，区分伪元素(单引号)和伪类(双引号)，在css2中这部分伪元素和伪类均使用单引号，两者实现的功能是一致的；
+ 嵌套选择器
	* `s1 s2`:s1下所有的s2子元素
	* `s1>s2`:s1下直接s2子元素
	* `s1+s2`:s1之后的紧接的兄弟元素
	* `s1~s2`:s1之前的紧接的兄弟元素

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




##动画相关

###转换&过渡 Transfrom Transition
	
+ 转换：`transform: transform-functions` 对元素进行2D或3D转换，包括位移、旋转、倾斜和缩放等
+ 转换中心：`transform-origin: x-axis y-axis z-axis;`
	* <small>默认为`50% 50% 0`;
	* 参数可以为`length`、`%`、`top left right bottom center`</small>
+ 3D转换嵌套：`transform-style:flat|preserve-3d` 3D空间内如何呈现被嵌套元素
	* `flat`：子元素将不保留其 3D 位置。
	* `preserve-3d`：子元素将保留其 3D 位置。
+ 3D转换视距：`perspective: number|none` 透视效果
+ 3D转换基点：`perspective-origin: x-axis y-axis;`
+ 转换元素背面显示：`backface-visibility: visible|hidden;`
+ 2D转换
	* 旋转`rotate(deg)`
	* 倾斜 Skew 单位 `deg`
		- `skew(x,y)`
		- `skewX(x)`
		- `skewY(y)`
	* 缩放 Scale 单位：数值 
		- `scale(x,y)`
		- `scaleX(x)`
		- `scaleY(y)`
	* 位移 Translate 单位：像素、百分比(相对于自身大小)
		- `translate(x,y)`
		- `translateX(x)`
		- `translateY(y)`
	* 矩阵 Matrix 数学没学好，待定。。。。。
+ 3D转换
	* 旋转
		- `rotateX(deg)`
		- `rotateY(deg)`
		- `rotateZ(deg)`
		- `rotate3d(x,y,z,deg)`
	* 位移
		- `translateX(x)`
		- `translateY(y)`
		- `translateZ(z)`
		- `translate3d(x,y,z)`
	* 缩放
		- `scaleX(x)`
		- `scaleY(y)`
		- `scaleZ(z)`
		- `scale3d(x,y,z)`
+ 转换过渡：Transition `transition: property duration timing-function delay;`
	* 过渡属性：`transition-property: none|all|property;`
	* 过渡时间：`transition-duration: time;`以秒(s)或毫秒(ms)计时,*默认0*
	* 过渡曲线：`transition-timing-function: function`
		- `linear`：相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
		- `ease`：慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
		- `ease-in`：以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
		- `ease-out`：以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
		- `ease-in-out`：以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
		- `cubic-bezier(n,n,n,n)`：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
	* 过渡延迟：`transition-delay: time;`以秒(s)或毫秒(ms)计时,*默认0*

###动画 Animation

定义动画：
	
	@keyframes name{   	|	@keyframes name{
		from{			|		0%{}
						|		50%{}
		}to{			|		100%{}
						|	}
		}				|
	}					|

调用动画：`animation: name duration timing-function delay iteration-count direction;`
+ 动画名称：`animation-name: keyframename|none;`
+ 动画时间：`animation-duration: time;`
+ 动画曲线：`animation-timing-function: value;`
+ 动画延迟：`animation-delay: time;`允许负数
+ 播放次数：`animation-iteration-count: n|infinite;`infinite：无限次
+ 反向播放：`animation-direction: normal|alternate;`
+ 动画状态：`animation-play-state: paused|running;`

##布局相关

+ 多列布局：`columns: column-width column-count;`
	* 列数：`column-count: number|auto;` 
	* 列宽：`column-width: auto|length;`
	* 间隔：`column-gap: length|normal;`如果列之间设置了 `column-rule`，它会在间隔中间显示。
	* 分割线：`column-rule: column-rule-width column-rule-style column-rule-color;`
		- 宽度：`column-rule-width`
		- 样式：`column-rule-style`
		- 颜色：`column-rule-color`
	* 跨越列数：`column-span: 1|all;`
+ 盒模型 `box-sizing: content-box|border-box|inherit;`
	* `content-box`：宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。
	* `border-box`：为元素设定的宽度和高度决定了元素的边框盒。
	* `inherit`
+ 弹性布局
	* 父容器
		- `.container{display:flex}`
		- 子元素对齐：`box-align: start|end|center|baseline|stretch;`
		- 排列方向：`box-orient: horizontal|vertical|inline-axis|block-axis|inherit;`
		- 显示顺序：`box-direction: normal|reverse|inherit;`
		- 
	2. 可伸缩子元素：`box-flex: value;` 


#媒体查询

使用方式：
1. link方式：`<link rel="stylesheet" type="text/css" href="style.css" media="screen" />`
2. import方式：`@importurl(reset.css) screen; `
3. meida方式：`@media 媒体类型and （媒体特性）{你的样式}`
参数说明
1. 媒体类型：`All`、`Braille`、`Embossed`、`Handheld`、`Print`、`Projection`、`Screen`、`Speech`、`Tv`、`Tty`
2. 最大宽度：`max-width` 小于该宽度时样式
3. 最小宽度：`min-width` 大于该宽度时样式

##其它

+ 轮廓偏移：`outline-offset: length|inherit;`
+ 尺寸变化：`resize: none|both|horizontal|vertical;`
+ 元素展示形式改变：`appearance: normal|icon|window|button|menu|field;`



##其它实践属性
+ -webkit-tap-highlight-color: rgba(0, 0, 0, 0);链接、表单获取焦点时高亮颜色