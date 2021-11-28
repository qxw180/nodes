# Web Application & PWA

什么是 WebApplication？什么是 WebSite？他们有什么区别？
开发者普遍认为，website 是用来提供信息的 webpage，可以基于静态化页面来实现，例如新闻网站。webApp 在 website 的基础上可以和用户进行交互。
个人认为我们不必过多关注二者之间的区别，我们可以关注 App 和 WebApp 的区别，App 相对于 webpage 有更好的用户体验，现在的 web 开发者在努力使 webpage 更加接近 App， 做体验更加友好的 webpage。

## [PWA(Progressive Web App)](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

PWA 的中文名是渐进式网页应用，PWA 是一系列技术的合计，将 Web 和 App 的优势结合在一起，提供体验更好功能更强大的 WebAPP，相对传统 web 有以下提升：

1. 可安装：Web App Manifest 可以配置网站[添加到主屏幕](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen#Manifest)，通过主屏幕进入可以全屏运行、隐藏地址栏获得类似 APP 的体验
2. 可离线：基于 Service worker 可以实现离线访问和消息推送功能
3. 可推送：
4. 渐进式加载：App Shell 先渲染一个极简的壳，然后使用异步数据渲染内容，这个其实在

### [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

Web App Manifest 是 AMP 技术集合的一部分，是一个用来提供网站元数据(名字、作者、描述、图表等信息)的 JSON 文件。
Web App Manifest 提供了将网站书签保存到设备主屏幕的能力 。

1. 设置图标和名称
2. 设置网站加载时像用户展示的信息
3. 设置浏览器默认显示特性

Web App Manifest 的使用非常简单，只需求创建  清单并在 HTML 头部使用`link`标签引入：

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

> 注意：`.webmanifest`是[Media type registration](https://w3c.github.io/manifest/#media-type-registration)规范的一部分，需要设置响应头`Content-Type: application/manifest+json`。但是浏览器通常支持`.json`扩展名。

Manifest 配置示例：

```json
{
  "name": "HackerWeb", // 在网络应用安装横幅中使用的 name。
  "short_name": "HackerWeb", // 在用户主屏幕上用作文本的
  "description": "A simply readable Hacker News app.",
  "start_url": "/index.html?launcher=true", // 网站启动地址，默认为当前页面
  "display": "fullscreen", // 应用的显示模式，四个值可以选择：fullscreen、standalone、minimal-ui和browser
  "orientation": "landscape", // 屏幕旋转方向，可以禁止屏幕旋转
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
    }
  ],
  "background_color": "#000", // 设置加载时的背景颜色，PWA的启动画面及时使用background_color和icons组合生成的
  "theme_color": "#000", // 主题颜色
  "scope": "/myapp/", // 作用域，作用域外的网站会在浏览器中打开，不会继续在PWA里浏览
  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
    }
  ]
}
```

### [Service Worker](./Worker/Service%20Workes.md)

Service Worker 是一个可编程的 Web Worker，它就像一个位于浏览器与网络之间的客户端代理，可以拦截、处理、响应流经的 HTTP 请求，配合[Cache Storage API](./Cahce&Storage/04-CacheStorage.md)可以实现 Websites 的离线能力。

### [Notification API](./设备访问/通知Notification%20API.md)

### [Push API](./设备访问/推送Push%20API.md)

### Service Worker + Cache Storage API 实现离线功能

```JavaScript
// 判断客户端是否支持service worker，注册service worker脚本为`sw.js`
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function () {
        console.log('Service Worker 注册成功');
    });
}
```

sw.js

```JavaScript
// sw.js
var cacheName = 'bs-0-2-0';
self.addEventListener('install', function(event) {
    event.waitUntil(
        //  service worker 安装完成之后，获取一个cache实例并添加缓存
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/sw-test/',
                '/sw-test/index.html',
                '/sw-test/style.css',
                '/sw-test/app.js',
            ]);
        })
    );
});

// 监听网络请求
self.addEventListener('fetch', function(event) {
    // 检查CacheStorage中是否有匹配的缓存项
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response; // 有缓存直接使用缓存响应
        } else {
            // 如何没有，使用fetch请求响应并缓存
            return fetch(event.request).then(function (response) {
                let responseClone = response.clone();
                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
        }
    }));
});
```

## 相关阅读

- [下一代 Web 应用模型 — Progressive Web App](https://zhuanlan.zhihu.com/p/25167289)
- [PWA 学习手册](https://pwa.alienzhou.com/)
