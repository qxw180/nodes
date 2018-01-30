#SVG 
可伸缩矢量图，使用XML格式定义图形，图像在改变尺寸的时候图像质量不会有损失

例：

    <?xml version="1.0" standalone="no"?>

    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>
    </svg>

##SVG in HTML
使用`<embed>`标签

    <embed src="rect.svg" width="300" height="100" 
    type="image/svg+xml"
    pluginspage="http://www.adobe.com/svg/viewer/install/" />

使用`<object>`标签

    <object data="rect.svg" width="300" height="100" 
    type="image/svg+xml"
    codebase="http://www.adobe.com/svg/viewer/install/" />

使用`<iframe>`标签
    
    <iframe src="rect.svg" width="300" height="100">
    </iframe>


##[SVG 作为图片](https://developer.mozilla.org/zh-CN/docs/Web/SVG/SVG_as_an_Image)
SVG图像可以作为一种图片格式用在很多环境中。很多浏览器支持在下列环境中应用SVG图像：

+ HTML的<img> 元素或 <svg> 元素
+ CSS的background-image属性

##将SVG作为Data URI导入

    <img src="data:image/svg+xml;base64,[data]> background: url(data:image/svg+xml;base64,[data]); 

    <object type="image/svg+xml" data="data:image/svg+xml;base64,[data]> fallback content here </object>


##使用内联SVG

    <body>
        <svg version="1.1" baseProfile="full" width="300" height="200" xmlns="http://www.w3.org/2000/svg" class="example">
            <rect width="100%" height="100%" fill="green" />
        </svg>
    </body>
    
    简化
    <body>
        <svg width="300" height="200" class="example">
            <rect width="100%" height="100%" fill="green" /> 
        </svg>
    </body>


##[在 HTML 内容中应用 SVG 效果](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Applying_SVG_effects_to_HTML_content)



[SVG 应用指南](https://svgontheweb.com/zh/#svg)