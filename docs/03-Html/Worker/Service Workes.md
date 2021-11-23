# [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

Service Worker 是浏览器和 web 应用程序之间的代理服务器，可以拦截浏览器网络请求、向浏览器发送消息、向服务器发送请求等，设计的目的就是为了实现 website 的离线能力，是 PWA 技术的核心部分，除了处理网络请求还提供入口以推送通知和访问后台同步 API。

Service Worker 和 Web Worker 很像都是一个脚本，独立于页面在后台运行，同样不能直接操作 DOM，通过`postMessage()`接口和页面进行通信。和 Web Worker 不一样的是：

- Service Worker 出于安全考虑只能在 HTTPS 环境下使用
- Service Worker 是一个浏览器中的进程，注册后可以在多个页面中使用，不会因为页面的关闭而销毁
- Service Worker 可以拦截代理客户端请求

## 生命周期

1. Installing：安装，Service Worker 注册后，表示开始安装
2. Installed：Service Worker 安装完成
3. Activating：
4. Activated：激活后
5. Redundant

## 更新

自动更新

1. 用户浏览网站，浏览器重新下载 service worker 文件并对比，
2. 之后更新 service worker 并触发 install 事件，
3. 此时当前页面仍然运行老的 service worker，新的 service worker 出于 waiting 状态
4. 页面关闭后老的 service worker 会被干掉，新的 service worker 会接管页面触发 activate 事件，在这个阶段可以清理旧 worker 的缓存
5. 可以在 install 事件中调用`self.skipWaiting()`方法跳过 waiting 状态，直接进入 activate 状态。接着在 activate 事件发生时执行`_slef.clients.claim()`方法更新所有客户端上的 Service Worker。

手动更新

```JavaScript
var version = '1.0.1'
navigator.serviceWorker.register('/sw.js').then(reg => {
    if(localStorage.getItem('sw_version') !== version) {
        req.update.then(() => {
            localStorage.setItem('sw_version', version)
        })
    }
})
```

注册 Service Worker，如果已经注册那么浏览器会忽略

```JavaScript
if('serviceWorker' in window.navigator) {
    window.addEventListener('load', () => {
        // 注册
        navigator.serviceWorker.register('./sw.js', { scope: '/'})
            .then((reg) => {
                // 向指定Worker发送信息
                reg.active.postMessage(...)

                // 向全部注册Worker发送信息
                navigator.serviceWorker.controller.postMessage(...)
            })
            .cache((err) => {

            })
        navigator.serviceWorker.addEventListener('message', (e) => {
            doSomething(e.data)
        })
    })
}
```

第一个参数为文件路径，路径相对于 Origin，注意 Service Worker 只能
第二个参数是配置项，选填。`scope`指定 Service Worker 控制内容的子目录，Service Worker 将接收`scope`指定目录上所有事项的 fetch 事件。如果我们指定`scope`那么 Service Worker 默认只能捕捉和 Worker 文件路径下的请求，例如 Woker 文件为`/a/sw.js`，如果不指定`scope`那么只能捕捉`/a/`下的请求。注册多个 Service Worker 时 scope 不能相同。

sw.js

```JavaScript
// 监听安装成功事件
this.addEventListener('install', (event) => { })

// 监听激活事件
this.addEventListener('activate', (event) => { })

this.addEventListener('message', (event) => {
    doSomthing(event.data)
    // 向来源页面发送消息
    event.source.postMessage(...)
})

// 向所有注册页面发送信息
this.clients.matchAll().then((client) => {
    client[0].postMessage(...)
})
```

Service Worker 注册成功后浏览器会自动进行安装和激活

## 配合 CacheStorage 缓存静态资源

Service Worker 是一个可编程的网络代理，可以控制页面的网络请求，可以监听`scope`内的所有 HTML 文档和这个文档内引用其他任何资源请求。

```JavaScript
// 缓存网络请求
this.addEventListener('install', event => {
    // 确保Service Worker不会在waitUtil里面的代码执行完毕之前完成安装
    event.waitUtil(
        caches.opent('sw_demo')
            .then(cache => {
               return cache.addAll([
                   './xxx.js',
                   './xxx.css',
                   ....
            ])
        })
    )
})

// 监听客户端向服务器端发送的请求
this.addEventListener('fetch', (event) => {
    console.log(event.request.url)
    event.respondWith( // 劫持用户请求，返回给用户一个Promise对象
        caches.match(event.request)
            .then(res => { // 匹配CacheStorage
              return res || // 匹配成功直接返回匹配结果
                  fetch(event.request) // 匹配失败向服务器请求资源返回给客户端
                      .then(response => {
                          caches.open('sw_demo').then(cache => {
                              cache.put(event.request, response) // 缓存请求结果
                          })
                          return response.clone()
                      })
                      .cache(err => {
                          console.err(err)
                      })
          })
          .cache(err => {
              return fetch(event.request)
          })
    )
})
```
