#CSS(Cascading Style Sheets)层叠样式表
用来描述HTML、XML等文档的呈现

##加载方式
`link`：html标签，可以用来加载css，也可以定义RSS、rel等属性，页面加载的时候link会同时被加载，权重高于@import
`@import`：css提供一种方式，只能加载css，页面加载完成之后加载，IE5+支持
``` HTML
<link href="blue.css" rel="stylesheet" type="text/css" />  
<style type="text/css">  
	@import url(blue.css);  
</style>  
```

##选择器的权重和优先级
+ 内联样式 > 内部样式 > 外部样式
+ !important > id > class > tag

在嵌套选择器中每个选择器都有自己的权重，权重相加大着优先级高
+ id选择器：    100
+ class选择器： 10
+ 标签选择器：    1

例`div p#large ul.list li`权重`1 + 1+100 + 1+10 + 1 = 114`

##CSS尺寸单位
+ 绝对单位：
    + px：像素
    + pt：
    + pc：
    + cm：
    + mm：
    + in：
+ 相对单位：
    + %
    + em：基于父元素的的font-size
    + rem：基于根元素root的font-size
    + vh：viewport的高度/100
    + vw：viewport的宽度/100
    + vmin：min(viewport宽度, viewport高度)/100
    + vmax：max(viewport宽度, viewport高度)/100
    + ex
    + ch


###em实战
浏览器默认font-size为16px，默认1em=16px，为了方便计算和浏览器兼容在使用em时会把body的font-size声明为：`font-size: 10px`
在多层嵌套的情况下，因为em是相对于父元素的font-size进行计算的，往往要重新计算每层的font-size值。

###rem实战
// TODO
