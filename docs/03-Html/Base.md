# HTML 基础

最流行的前端模版[HTML5 ★ BOILERPLATE](https://html5boilerplate.com/)

## 必要设置

- Doctype，严格模式和混杂模式
  - <!DOCTYPE> 声明位于文档中的最前面，处于 `<html>` 标签之前。告知浏览器以何种模式来渲染文档。
  - 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。
  - 在混杂模式中，兼容模式，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
  - DOCTYPE 不存在或格式不正确会导致文档以混杂模式呈现。
- `<html class="no-js" lang="zh-CN">` [Language Code Table](http://www.lingoes.cn/zh/translator/langcode.htm)
- `<meta charset="utf-8">`，尽早引入
- `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />` IE8+的专有属性，告诉 IE8+采用何种 IE 版本渲染网页，edge 是采用最新版本渲染，应该尽早引入，在`meta`和`title`标签之前
- `<title>网站标题</title>`
- `<meta name="description" content="网站描述">`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<link rel="manifest" href="site.webmanifest">`

## IE 条件注释

IE5 到 IE9 支持条件注释。从 IE10 开始，在标准模式页面中不再支持条件注释
[How To Create an IE-Only Stylesheet](https://css-tricks.com/how-to-create-an-ie-only-stylesheet/)

隐藏的条件注释

```HTML
<!--[if IE 8]>
<link href="ie8only.css" rel="stylesheet">
<![endif]-->
```

显示的条件注释

```HTML
<![if !IE]>
<link href="non-ie.css" rel="stylesheet">
<![endif]>
```

低版本浏览器跳转

```HTML
<!--[if lte IE 8]><meta http-equiv="refresh" content="0; url=/upgrade.htm"><![endif]-->
```

## [HTMLElement.dataset](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset)

HTML 元素出标准属性外在某些场景我们需要自定义属性：`data-属性名`
通过元素的`dataset`属性可以访问和设置元素的自定义属性集，属性名为自定义属性的驼峰式命名

```HTML
<ul>
    <li id="no1" data-id="1" data-Birth="2020-01-11">kevin</li>
    <li data-id="2">lee</li>
    <li data-id="3">james</li>
</ul>
<script>
var el = document.querySelector('#no1');
console.log(el.dataset) // DOMStringMap {id: "1", birth: "2020-01-11"}
el.dataset.dataSex = 'man'
console.log(el.dataset) // DOMStringMap {id: "1", birth: "2020-01-11", dataSex: "man"}
console.log(el.dataset.dataSex) // man
</script>
```

[HTML5](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)
