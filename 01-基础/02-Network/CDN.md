# CDN

Content Delivery Network 内容分发网络，提供内容分发服务，通常都是分布式的，解决因分布、带宽、服务器性能带来的访问延迟问题，提供稳定快速的内容传输。

## 使用 CDN 优化网站性能

1. 来自同一域名的资源(css img js...)浏览器一般同时下载 6 个，如果来自不同域名则没有限制；

## CDN 挂掉后如何保证网站可以正常运行

```HTML
<script
    src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
    crossorigin="anonymous">
</script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
```

[Subresource Integrity 介绍](https://imququ.com/post/subresource-integrity.html)
[大公司里怎样开发和部署前端代码？](https://github.com/fouber/blog/issues/6)
[高并发架构的 CDN 知识介绍](https://segmentfault.com/a/1190000019036398)

## TODO:DNS & CDN
