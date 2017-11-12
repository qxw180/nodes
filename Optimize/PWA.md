#Progressive Web Apps
> 利用现代Web技术以尝试在移动设备上提供顶级体验的web app; 不一定需要使用所有的现代技术，只要恰到好处的使用技术提供优秀的体验就好。
1. Web应该渐进增强成为APP，可以添加到主屏幕、全屏运行、离线工作、推送通知。但是仍然是Web页面，而非App Store里面的应用；
2. 使用渐进增强的方式使Web再性能生能够和App匹敌，比传统网页更好的同时也降低了兼容性；

##key point
+ Add to Homescreen：添加到主屏和全屏运行，`<link rel="manifest" href="/manifest.json">`
+ App Shell：第一次渲染个壳，等异步数据来了再填充
+ Offline：离线能力
    * Application Cache：不太好用
    * Service Worker：给Web提供了一个可以后天跑的线程，可以搭配CacheStroage API做缓存、可以截断所有HTTP请求并使用FetchAIP进行响应
+ Re-engageable：唤醒保持用户的能力，只要实现即推送通知

https://www.zhihu.com/question/46690207