# Web Application

什么是 WebApplication？什么是 WebSite？他们有什么区别？
开发者普遍认为，website 是用来提供信息的 webpage，可以基于静态化页面来实现，例如新闻网站。webApp 在 website 的基础上可以和用户进行交互。
个人认为我们不必过多关注二者之间的区别，我们可以关注 App 和 WebApp 的区别，App 相对于 webpage 有更好的用户体验，现在的 web 开发者在努力使 webpage 更加接近 App， 做体验更加友好的 webpage。

## Progressive Web App(PWA)

PWA 的中文名是渐进式网页应用，PWA 是一系列技术的合计，将 Web 和 App 的优势结合在一起，提供体验更好功能更强大的 WebAPP，相对传统 web 有以下提升：

1. 可安装：可以添加到主屏幕，通过网站配置文件`manifest.json`设置，通过主屏幕进入可以全屏运行、隐藏地址栏获得类似 APP 的体验
2. 可离线：基于 Service worker 可以实现离线访问和消息推送功能
3. 可推送：

## 网络应用清单[Web App Mainfest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

Web App Manifest 是 PWA 技术的一部分，提供了将网站书签保存到设备主屏幕的能力 。
Web App Manifest 是一个用来提供网站信息(名字、作者、描述、图表等)的 JSON 文件，主要功能：

1. 设置图标和名称
2. 设置网站加载时像用户展示的信息
3. 设置浏览器默认显示特性

### Web App Mainfest 的使用

Web App Mainfest 的使用非常简单，只需求创建  清单并在 HTML 头部使用`link`标签引入：

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

> 注意：`.webmanifest`是[Media type registration](https://w3c.github.io/manifest/#media-type-registration)规范的一部分，但是浏览器通常支持`.json`格式。

Manifest 配置示例：

```json
{
  "short_name": "HackerWeb", // 在用户主屏幕上用作文本的
  "name": "HackerWeb", // 在网络应用安装横幅中使用的 name。
  "description": "A simply readable Hacker News app.",
  "icons": [
    {
      "src": "images/touch/homescreen48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen168.png",
      "sizes": "168x168",
      "type": "image/png"
    },
    {
      "src": "images/touch/homescreen192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "index.html?launcher=true", // 网站启动地址，默认为当前页面
  "background_color": "#000", // 设置加载时的背景颜色
  "theme_color": "#000", // 主题颜色
  "display": "standalone", // 展示模式
  "orientation": "landscape", // 页面初始方向
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
    }
  ]
}
```

更多详细信息请[参考](https://developers.google.com/web/fundamentals/web-app-manifest/)。

## 设置添加到 IOS 屏幕应用信息 head meta

1. 隐藏 Safari 工具栏和菜单栏：`<meta name="apple-mobile-web-app-capable" content="yes">`，Chrome 设置方法，Google 视图用这个标签替换 IOS 的专用标签，称为通用规范`<meta name="mobile-web-app-capable" content="yes">`
2. 状态栏背景颜色：`<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
   1. default ：状态栏背景是白色。
   2. black ：状态栏背景是黑色。
   3. black-translucent ：状态栏背景是半透明。 如果设置为 default 或 black ,网页内容从状态栏底部开始。
3. 设置全屏：`<meta name="apple-touch-fullscreen" content="yes">`
4. 设置默认 color scheme：`<meta name="apple-mobile-web-app-status-bar-style" content="black">`
5. 设置 title：`<meta name="apple-mobile-web-app-title" content="">`
6. 设置 ICON：`<link rel="apple-touch-icon" href="icon.png">`
   1. [ICON 尺寸说明]](https://en.wikipedia.org/wiki/List_of_iOS_devices#Display)
   2. 一般情况下使用 180\*180，命名为 icon.png：`<link rel="apple-touch-icon" href="icon.png">`,Chrome 设置 ICON：`<link rel="icon" sizes="192x192" href="highres-icon.png">`
7. 设置启动画面：`<link rel="apple-touch-startup-image" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" href="img/startup-retina.png">`
   1. 因为 IOS 设备有不同的尺寸，所以需要跟进不同的尺寸设置不同的开屏画面()
   2. https://github.com/h5bp/mobile-boilerplate/blob/v4.1.0/js/helper.js#L336-L383

[官方文档](https://developer.apple.com/safari/resources/#documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

## Custom For Windows IE11

在 Windows 中也提供了将 webpage 添加到桌面图标的功能，可以对标题、颜色  和图标进行定制。详细[参考](<https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85)>)

https://www.zhihu.com/question/46690207

[MDN Web App Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)
