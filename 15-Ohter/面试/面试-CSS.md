# 前端面试-CSS

## 选择器相关

- 选择器优先级，如何避免样式覆盖
  - 内联样式 > 内部样式 > 外部样式
  - !important > id > class > tag
- 微元素和伪类的理解
  - :before 和 ::before 的区别

## 简述盒模型

- 各盒模型特点，img 是什么模型
  - 行内元素：和有他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；其中 img 是 inline-block 元素；
  - 块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；
- 如何修改盒模型:display
- box-sizing:content-box/border-box
- 设置元素浮动后，该元素的 display 值是多少？（自动变成 display:block）

## 文档流

- 简述文档流
- 浮动原理、影响及清除、手写`.clearfix`
- 绝对定位原理
  - 不设置 top left 等属性会是什么效果及应用场景
- display visisbility 的区别
- 外边距合并及 BFC 的理解
  - 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
  - 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
  - 两个外边距一正一负时，折叠结果是两者的相加的和。
- display:inline-block 什么时候会显示间隙？如何消除
  - letter-spacing
  - fontsize：0

## CSS3

- CSS 弹性布局及应用场景
- 阴影：如何只显示两边和下边
- transform？Transition？animation？区别
- animation 执行完最后一个状态保持不变：animation-fill-mode
- transition 和 animation 的区别，是否可暂停
- CSS3 动画性能优化
  - 核心：减少浏览器计算量，避免重绘、重流
  - 独立图层：3D 转换元素会生成图层，图层内的单个元素重绘会引起整个图层的重绘，可以使用 translateZ(0)或者 translate3d(0,0,0)属性使需要重绘的元素独立图层
  - 硬件加速：尽量使用 translate，现代浏览器会开启硬件加速
  - 避免重流：避免使用会触发盒子大小变化(width margin)、修改盒子位置(top left float)、元素属性(overflow font-size)的属性；
  - 不要使用 CSS 类名做状态标记，会触发重绘重流。

## 切图技巧

- 左侧固定宽度，右侧自适应布局实现
- 垂直居中和水平居中
  - 文本的垂直水平居中
  - block 水平居中
    - 1.absolute + transform:
    - 2.inline-block + text-align + table-cell + vertical-align
    - 3.flex + justify-content + align-items
- rgba()和 opacity 的透明效果有什么不同？
  - 背景半透明如何实现
- css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？
  - 垂直方向：line-height
  - 水平方向：letter-spacing，妙用是什么
- CSS3 新特性：动画，渐变，透明度，圆角，阴影，字体，多重背景
- 不用 JS 如何实现一个宽度 100%的方形 div？
  - padding
  - vmin
- png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？
  - webp 图片的浏览器兼容检测:

## Canvas

- canvas 中定义 width、height 跟在 style 中定义 width 和 height 是不同的，canvas 标签的 width 和 height 是画布实际宽度和高度

## 自适应布局

- 简述媒体查询
- 响应式布局的方法，如何实现一个资讯流布局
- Flex 弹性布局

## 其它

- reset.css 和 normalize.css
- 为什么使用 CSS 预处理器、如何组织样式模块
- 对优雅降级和渐进增强的看法
- 快速切页面的技巧

## 实现思路

- 简述轮播图的实现
- 如何实现一个时钟：transform-origin
- 全屏滚动的原理是什么？用到了 CSS 的那些属性？
- 视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？）
