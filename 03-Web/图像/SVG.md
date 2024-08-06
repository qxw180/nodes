# 可伸缩矢量图 SVG(Scalable Vector Graphics)

使用 XML 描述图形形状，可以用来绘制 2D 图形。图像在改变尺寸的时候图像质量不会有损失。容易使用 CSS 和 JS 进行控制。

SVG`viewBox`属性：用来设置 SVG 的 viewport，4 个数字，前两个用来描述左上角的起始坐标，后两个数字用来描述 viewport 的宽度和高度。

```XML
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="my-circle" cx="50" cy="50" r="50" />
</svg>
```

## SVG in HTML

SVG 可以作为标签直接插入到 HTML 中，也可以作为独立文件通过`<img />`标签和 CSS 样式文件等方式引入。
如果不想通过 JS 操作 SVG 建议使用`<img />`引入，如果需要通过 JS 操作建议使用`<object>`引入。

```HTML
<!DOCTYPE html>
<html>
<head></head>
<body>
    <img src="icon.svg">
    <object id="object" data="icon.svg" type="image/svg+xml"></object>
    <embed id="embed" src="icon.svg" type="image/svg+xml">
    <iframe id="iframe" src="icon.svg"></iframe>

    <!-- 直接嵌入 -->
    <svg id="my-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <circle id="my-circle" cx="400" cy="300" r="50" />
    <svg>
</body>
</html>
```

```CSS
.icon {
  background: url(icon.svg);
}
```

## SVG 压缩工具

[SVGO](https://github.com/svg/svgo)

[snap.svg](http://snapsvg.io/) JavaScript SVG lib
[SVG 应用指南](https://svgontheweb.com/zh/#svg)
