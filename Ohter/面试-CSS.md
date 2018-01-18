#前端面试-CSS

##选择器相关
+ 选择器优先级，如何避免样式覆盖
+ 微元素和伪类的理解
    * :before 和 ::before的区别

##简述盒模型
+ 各盒模型特点，img是什么模型
    * 行内元素：和有他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；其中img是inline-block元素；
    * 块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；
+ 如何修改盒模型
+ box-sizing:content-box/border-box

##文档流
+ 简述文档流
+ 浮动原理、影响及清除
+ 绝对定位原理
    * 不设置top left 等属性会是什么效果及应用场景
+ display visisbility的区别
+ 外边距合并及BFC的理解
    * 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
    * 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
    * 两个外边距一正一负时，折叠结果是两者的相加的和。
+ display:inline-block 什么时候会显示间隙？

##CSS3
+ 阴影：如何只显示两边和下边
+ transform？Transition？animation？区别
+ animation执行完最后一个状态保持不变：animation-fill-mode

##切图技巧
+ 垂直居中和水平居中
    * 文本的垂直水平居中
    * block
        - 1.absolute + transform:
        - 2.inline-block + text-align + table-cell + vertical-align
        - 3.flex + justify-content + align-items
+ rgba()和opacity的透明效果有什么不同？
    * 背景半透明如何实现
+ css中可以让文字在垂直和水平方向上重叠的两个属性是什么？
    * 垂直方向：line-height
    * 水平方向：letter-spacing
+ CSS3新特性：动画，渐变，透明度，圆角，阴影，字体，多重背景
+ 不用JS如何实现一个宽度100%的方形div？

##自适应布局
+ 简述媒体查询
+ Flex弹性布局


##其它
+ reset.css和normalize.css
+ 为什么使用CSS预处理器、如何组织样式模块
+ 对优雅降级和渐进增强的看法
+ 快速切页面的技巧
+ 简述轮播图的实现









