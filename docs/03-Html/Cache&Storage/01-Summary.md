# 前端缓存

缓存是优化程序性能的的常用方法，合理使用缓存可以大幅提升程序性能。前端缓存可分为网络缓存和客户端缓存两大类

## 浏览器缓存

网络缓存，主要用来加速静态资源的加载

## 应用缓存

1. Cookie
2. Storage：包括`sessionStorage`和`localStorage`
3. CacheStorage
4. IndexedDB
5. ~~Application Cache 已废弃，替代方案为 Service Workers + CacheStorage~~
6. ~~Web SQL：已废弃，替代方案为 IndexedDB~~

## [Cookie](./02-Cookies.md)

`cookie`：是网站为了标识用户身份在浏览器端存储的数据

- 在每次 HTTP 请求的过程中均会携带到服务器中
- 大小有限制 4k 左右
- 存储时间取决于失效时间的设置

## [Storage](./03-Storage.md)

`sessionStorage`和`localStorage`是为了缓存设计的

- 不会再每次请求的过程中传递
- 大小相对比较大 5M 左右
- `sessionStorage`在页面关闭的时候销毁，**页面刷新不会销毁**
- `localStorage`一直存在，**在 Chrome 隐身模式下会创建创建一下新的空的临死存储，页面关闭后销毁**

## [CacheStorage](../Cahce&Storage/04-CacheStorage.md)

可以使用`window.caches`访问 CacheStorage

- `cache.open()`：获取 Cache 实例
- `cache.match(reqest)`：监测是否有 request 对应的缓存
- `cache.match()`：
- `cache.has()`：
- `cache.delete()`：

## [IndexedDB](../Cahce&Storage/05-Indexed%20DB.md)

用于在客户端进行大量结构化数据存储，相对于 Storage IndexedDB 更适合大量数据的存储。
