# 前端缓存

缓存是优化程序性能的的常用方法，合理使用缓存可以大幅提升程序性能。前端缓存大致分为以下几大类：

1. 浏览器缓存，主要用来加速静态资源的加载
2. 前端存储，主要包括localStorage、sessionStorage和cookie
3. 离线存储 AppCache： 已废弃
4. Service Workers：AppCache 替代方案
5. Web SQL：已废弃
6. IndexedDB：Web SQL的替代品
7. CacheStorage：实验中功能，

## cookie、

`cookie`：是网站为了标识用户身份在浏览器端存储的数据

+ 在每次HTTP请求的过程中均会携带到服务器中
+ 大小有限制4k左右
+ 存储时间取决于失效时间的设置

## [Storage](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/Storage)

`sessionStorage`和`localStorage`是为了缓存设计的

+ 不会再每次请求的过程中传递
+ 大小相对比较大5M左右
+ `sessionStorage`在页面关闭的时候销毁，**页面刷新不会销毁**
+ `localStorage`一直存在，**在Chrome隐身模式下会创建创建一下新的空的临死存储，页面关闭后销毁**

## IndexedDB

用于在客户端进行大量结构化数据存储，相对于Storage IndexedDB更适合大量数据的存储。

## CacheStorage

可以使用`window.caches`访问CacheStorage

+ `cache.open()`：获取Cache实例
+ `cache.match(reqest)`：监测是否有request对应的缓存
+ `cache.match()`：
+ `cache.has()`：
+ `cache.delete()`：
