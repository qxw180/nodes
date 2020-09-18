# SEO(Search Engine Optimization)搜索引擎优化

## SEO 要素

- 网站标题、关键字、描述
- 网站内容优化，网站内容与关键字对应，增加关键字密度，增加常委关键字等
- 设置`Robot.txt`文件，robots.txt
- 对搜索引擎用好的网站地图
- 增加外部链接

[sitemap](https://www.sitemaps.org/protocol.html)
[百度搜索资源平台](https://ziyuan.baidu.com/)

Canonical URL：`<link rel="canonical" href="">`

布局

- 减少目录结构层次
  - 控制首页链接数量
  - 扁平化目录层次，控制在三层
  - 导航优化，尽量使用文字，要加面包屑导航

网页代码优化

- `title`: 每个页面不同，只强调重点
- `keyword`：内容不要过多
- `discription`：内容同样不要过多
- 语义化代码，在适当的位置用适当的标签
  - H1-H6 标题
  - `ul` 无序列表
  - `ol` 有序标签
  - `dl` 定义数据列表
  - `em` 强调
- 少使用无意义标签，使用样式解决样式相关
- 重要内容放在 HTML 最前端，不要使用 js 输出
- 少使用 iframe
- 少使用 display:none;
- 精简代码
- a 标签`rel="nofollow"`，表示外部链接不需爬去了

### HTML - 语义化（semantization）

1. 去掉或者丢失样式的时候能够让页面呈现出清晰的结构
2. 有利于 SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
3. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
4. 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循 W3C 标准的团队都遵循这个标准，可以减少差异化。

`br` 只用于文本换行
`table` 使用 `caption`
`img` 使用 `alt` `title`
强调内容使用 `strong` 和 `em`
地址使用 `address`

HTML5 新增语义化结构标签

- `<header></header>`：页面或`section`中的的页眉，一般包含`h1-h6`和`hgroup`无数量限制
- `<hgroup></hgroup>`：对整个页面或页面中的一个内容区块的标题组合，如果只有一个`h1-h6`则不需要`hgroup`；
- `<footer></footer>`：页面或`section`中的的注脚，一般包括作者的姓名、 创作日期、联系方式等，无数量限制
- `<nav></nav>`： 表示页面中导航的链接部分
- `<article></article>`：表示页面中一块与上下文不相关的独立内容；
- `<aside></aside>`：包含在`article`中，表示`article`之外，与`article`标签内容相关的辅助信息；
- `<section></section>`：表示页面中独立区域，比如章节、页眉、页脚等，`nav`、`article`、`aside`属于特殊的`section`
- `<figure></figure>`：表示一段独立的流内容，

## 国际化

## 无障碍

图片 `alt`属性：这个属性定义了描述图像的替换文本，省略这个属性表明该图像是内容的关键部分，但没有等效的文本可用。把这个属性设置为空字符串，表明该图像不是内容的关键部分，非可视化浏览器在渲染的时候可能会忽略它。
