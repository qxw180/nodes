# CSS(Cascading Style Sheets)层叠样式表

用来描述 HTML、XML 等文档的呈现

## 加载方式

`link`：html 标签，可以用来加载 css，也可以定义 RSS、rel 等属性，页面加载的时候 link 会同时被加载，权重高于@import
`@import`：css 提供一种方式，只能加载 css，页面加载完成之后加载，IE5+支持

```HTML
<link href="blue.css" rel="stylesheet" type="text/css" />
<style type="text/css">
  @import url(blue.css);
</style>
```

## 选择器的权重和优先级

- 内联样式 > 内部样式 > 外部样式
- !important > id > class > tag

在嵌套选择器中每个选择器都有自己的权重，权重相加大着优先级高

- id 选择器： 100
- class 选择器： 10
- 标签选择器： 1

例`div p#large ul.list li`权重`1 + 1+100 + 1+10 + 1 = 114`

## CSS 尺寸单位

- 绝对单位：
  - px：像素
  - pt：
  - pc：
  - cm：
  - mm：
  - in：
- 相对单位：
  - %
  - em：基于父元素的的 font-size
  - rem：基于根元素 root 的 font-size
  - vh：viewport 的高度/100
  - vw：viewport 的宽度/100
  - vmin：min(viewport 宽度, viewport 高度)/100
  - vmax：max(viewport 宽度, viewport 高度)/100
  - ex
  - ch

### rem 实战

```JavaScript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
          clientWidth = Math.min(clientWidth, 1024)
          clientWidth = Math.max(clientWidth, 300)
          docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, function() {
      setTimeout(function(){
        recalc()
      }, 50)
    });
    recalc()
})(document, window);
```

通过媒体查询预设 html font-size 解决进入页面时闪烁问题

```CSS
@media (min-width: 360px){html{font-size: 96px;} }
@media (min-width: 375px){html{font-size: 100px;} }
@media (min-width: 414px){html{font-size: 110.6px;} }
```
