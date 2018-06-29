#Web Application
什么是WebApplication？什么是WebSite？他们有什么区别？
开发者普遍认为，website是用来提供信息的webpage，可以基于静态化页面来实现，例如新闻网站。webApp在website的基础上可以和用户进行交互。
个人认为我们不必过多关注二者之间的区别，我们可以关注App和WebApp的区别，App相对于webpage有更好的用户体验，现在的web开发者在努力使webpage更加接近App，做体验更加友好的webpage。

##网络应用清单[Web App Mainfest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
Web App Manifest是PWA技术的一部分，提供了将网站书签保存到设备主屏幕的能力。
Web App Manifest是一个用来提供网站信息(名字、作者、描述、图表等)的JSON文件，主要功能：
1. 设置图标和名称
2. 设置网站加载时像用户展示的信息
3. 设置浏览器默认显示特性

###Web App Mainfest的使用
Web App Mainfest的使用非常简单，只需求创建清单并在HTML头部使用`link`标签引入：
```html
<link rel="manifest" href="/manifest.webmanifest">
```
> 注意：`.webmanifest`是[Media type registration](https://w3c.github.io/manifest/#media-type-registration)规范的一部分，但是浏览器通常支持`.json`格式。


清单配置示例：
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
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```
更多详细信息请[参考](https://developers.google.com/web/fundamentals/web-app-manifest/)。

##Custom For Windows IE11
在Windows中也提供了将webpage添加到桌面图标的功能，可以对标题、颜色和图标进行定制。详细[参考](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85))

// TODO PWA