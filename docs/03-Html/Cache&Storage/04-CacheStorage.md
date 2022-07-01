# [CacheStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage)

CacheStorage 是从 ServiceWorker 中独立出来用来实现网络缓存的 API。

Cache 接口提供了`Request / Response`的存储机制，CacheStorage 接口用来管理 Cache。CacheStorage 虽然是 ServiceWorker 定义的，但并不是只能在 ServiceWorker 作用域内使用，也可以在`window`作用域使用，所以我们可以使用全局属性`caches`访问 CacheStorage。单个作用域内可以创建多个 Cache 实例。

Cache 缓存的内容不会自动更新也不会失效，缓存的更新和删除都需要代码实现，另外要注意清理没用的缓存，浏览器对存储空间有限制，浏览器自动清理会清理掉单个 origin 下的全部缓存。

## 基本用法

```JavaScript
async function getData() {
   const cacheVersion = 1;
   const cacheName    = `myapp-${ cacheVersion }`;
   const url          = 'https://jsonplaceholder.typicode.com/todos/1';
   let cachedData     = await getCachedData( cacheName, url );

   if ( cachedData ) {
      console.log( 'Retrieved cached data' );
      return cachedData;
   }

   console.log( 'Fetching fresh data' );

   const cacheStorage = await caches.open( cacheName );
   await cacheStorage.add( url );
   cachedData = await getCachedData( cacheName, url );
   await deleteOldCaches( cacheName );

   return cachedData;
}

// Get data from the cache.
async function getCachedData( cacheName, url ) {
   const cacheStorage   = await caches.open( cacheName );
   const cachedResponse = await cacheStorage.match( url );

   if ( ! cachedResponse || ! cachedResponse.ok ) {
      return false;
   }

   return await cachedResponse.json();
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches( currentCache ) {
   const keys = await caches.keys();

   for ( const key of keys ) {
      const isOurCache = 'myapp-' === key.substr( 0, 6 );

      if ( currentCache === key || ! isOurCache ) {
         continue;
      }

      caches.delete( key );
   }
}

try {
   const data = await getData();
   console.log( { data } );
} catch ( error ) {
   console.error( { error } );
}
```

## Cache

- `Cache.put(request, response)`： 添加缓存，返回一个 Promise，`resolve`为`undefined`
  - `request`：可以为 request 对象或 URL 字符串
  - `response`：可以为单个 response 或 response 数组
- `Cache.add(request)`： 请求 request 并添加到缓存，返回一个 Promise，`resolve`为`undefined`。
  - `request`：可以为 request 对象或 URL 字符串
- `Cache.addAll(requests)`： 请求一组 request，并添加到缓存，返回一个 Promise，`resolve`为`undefined`。
  - `request`：可以为 request 对象或 URL 字符串数组
- `Cache.delete(request, options)`： 查找 request 对应的 Cache 条目并删除。返回一个 promise，如果有匹配`resolve` 为 `true`否则为 `false`。
  - `request`：要匹配的请求，可以为 request 对象或 URL 字符串
  - `options`：
    - `ignoreSearch`：布尔值，是否忽略 query string，默认值为`false`
    - `ignoreMethod`：布尔值，是否忽略请求方法，默认值为`false`
    - `ignoreVary`：布尔值，是否忽略 Vary 请求头，默认值为`false`
- `Cache.keys(request, options)`： 返回一个 Promise 对象，resolve 为一个数组，值为 Cache 对象的全部 key。参数同`Cache.delete`。
- `Cache.match(request, options)`： 返回一个 Promise 对象，resolve 的结果是跟 Cache 对象匹配的第一个已经缓存的请求。参数同`Cache.delete`。
- `Cache.matchAll(request, options)`： 返回一个 Promise 对象，resolve 的结果是跟 Cache 对象匹配的所有请求组成的数组。参数同`Cache.delete`。

## CacheStorage

- `CacheStorage.open(cacheName)`： 返回一个 Promise ，`resolve` 为匹配 `cacheName` （如果不存在则创建一个新的 cache）的 Cache 对象
- `CacheStorage.has(cacheName)`： 返回一个 Promise 对象，缓存存在时 `resolve` 的布尔值为 `true` 否则为 `false` 。
- `CacheStorage.delete(cacheName)`： 查找匹配 `cacheName` 的 Cache 对象并删除，然后返回一个 Promise，如果匹配`resolve`为`true`，否则为`false`.
- `CacheStorage.keys()`： 返回一个 Promise，`resolve` 为包含全部 Cache 对象的 KEY 的字符串数组，数组顺序为 Cache 对象的创建顺序。
- `CacheStorage.match(request, options)`： 检查 CacheStorage 对象跟踪的全部 Cache 对象是否有匹配 Request 的存储并，返回一个 Promise，如果匹配 `resolve` 为匹配项，否则为`undefined`.
  - `request`：要匹配的请求，可以为 request 对象或 URL 字符串
  - `options`：
    - `ignoreSearch`：布尔值，是否忽略 query string，默认值为`false`
    - `ignoreMethod`：布尔值，是否忽略请求方法，默认值为`false`
    - `ignoreVary`：布尔值，是否忽略 Vary 请求头，默认值为`false`
    - `cacheName`：缓存名
