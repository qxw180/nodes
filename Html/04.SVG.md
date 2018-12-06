#SVG 
可伸缩矢量图，使用XML格式定义图形，图像在改变尺寸的时候图像质量不会有损失。IE9及以上浏览器均支持。容易使用CSS和JS进行控制。

SVG`viewBox`属性：用来设置SVG的viewport，4个数字，前两个用来描述左上角的起始坐标，后两个数字用来描述viewport的宽度和高度。
``` XML
<svg width="100" height="100" viewBox="50 50 50 50">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```


##SVG in HTML
SVG可以作为标签直接插入到HTML中，也可以作为独立文件通过`<img />`标签和CSS样式文件等方式引入。
如果不想通过JS操作SVG建议使用`<img />`引入，如果需要通过JS操作建议使用`<object>`引入。

``` HTML
<!DOCTYPE html>
<html>
<head></head>
<body>
    <img src="icon.svg">
    <object id="object" data="icon.svg" type="image/svg+xml"></object>
    <embed id="embed" src="icon.svg" type="image/svg+xml">
    <iframe id="iframe" src="icon.svg"></iframe>

    <!-- 之间嵌入 -->
    <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
        <circle id="mycircle" cx="400" cy="300" r="50" />
    <svg>
</body>
</html>
```

``` CSS
.icon {
  background: url(icon.svg);
}
```

##SVG雪碧图


##SVG压缩工具
[SVGO](https://github.com/svg/svgo)

[snap.svg](http://snapsvg.io/) JavaScript SVG lib
[SVG 应用指南](https://svgontheweb.com/zh/#svg)