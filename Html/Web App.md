#Web Application
什么是WebApplication？什么是WebSite？他们有什么区别？
本质上二者都是通过Web技术实现，没有本质的区别，website用来提供信息，webApp在信息提供的基础上可以和用户进行交互，这些我认为都不重要了。
我们可以关注App和Webpage的区别，App相对于webpage有更好的用户体验，现在的web开发者在努力使webpage更加接近App。

##[Web App Mainfest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
Web App Manifest是一个用来提供网站信息(名字、作者、描述、图表等)的JSON文件，用来配置添加到用户屏幕的信息。
Web App Manifest是PWA技术的一部分，用来提供像APP一样，将入口添加到用户屏幕的能力。

Web App Mainfest在HTML头部使用`link`标签引入：
```html
<link rel="manifest" href="/manifest.webmanifest">
```
> 注意：`.webmanifest`是[Media type registration](https://w3c.github.io/manifest/#media-type-registration)规范的一部分，但是浏览器通常支持`.json`格式。


示例：
```json
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```

##Custom For Windows IE11
https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/samples/dn455106(v=vs.85)