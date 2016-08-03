#JavaScript基础

#####ECMAScript和JavaScript
> ECMAScript是（European Computer Manufacturers Association）组织指定的JavaScript语言标准；JavaScript是对ECMAScript标准的实现



#####网页加载流程
浏览器的核心分为两部分，渲染引擎和JavaScript引擎，两个引擎交替渲染；
1. 浏览器一边下载HTML网页，一边解析
2. 解析过程中发现`script`标签
3. 暂停解析，网页渲染的控制权转交给JavaScript引擎
4. 如果script标签引用了外部脚本，就下载该脚本，否则就直接执行
5. 执行完毕，控制权交还渲染引擎，恢复往下解析HTML网页


#####defer属性

	<script src="1.js" defer></script>

defer属性是让浏览器在DOM加载完成后再执行脚本；defer属性对内置脚本和动态生成的脚本不起作用；

1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有defer属性的script标签
3. 浏览器继续往下解析HTML网页，同时并行下载script标签中的外部脚本
4. 浏览器完成解析HTML网页，此时再执行下载的脚本

#####async属性

	<script src="1.js" async></script>

async属性可以保证脚本下载时不阻塞浏览器渲染；但是该属性无法保证脚本的正确执行属性，加班下载完成后直接执行；
async和defer属性同时使用的情况下defer不起作用；

1. 浏览器开始解析HTML网页
2. 解析过程中，发现带有async属性的script标签
3. 浏览器继续往下解析HTML网页，同时并行下载script标签中的外部脚本
4. 脚本下载完成，浏览器暂停解析HTML网页，开始执行下载的脚本
5. 脚本执行完毕，浏览器恢复解析HTML网页

#####[脚本动态加载]( http://javascript.ruanyifeng.com/bom/engine.html#toc8)


#####页面的重绘(repaint)和重流(reflow)
+ 重绘：修改页面颜色等会导致页面重绘
+ 重流：改变元素布局会导致页面reflow和repaint

重绘和重流会消耗很多时间和资源，应该尽量减少重绘和重流

+ 读取DOM或者写入DOM，尽量写在一起，不要混杂
+ 缓存DOM信息
+ 不要一项一项地改变样式，而是使用CSS class一次性改变样式
+ 使用document fragment操作DOM
+ 动画时使用absolute定位或fixed定位，这样可以减少对其他元素的影响
+ 只在必要时才显示元素
+ 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流
+ 使用虚拟DOM（virtual DOM）库

