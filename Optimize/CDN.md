#CDN的使用

##CDN挂掉后如何保证网站可以正常运行
``` HTML
<script 
    src="https://code.jquery.com/jquery-3.3.1.min.js" 
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" 
    crossorigin="anonymous">
</script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.3.1.min.js"><\/script>')</script>
```

[Subresource Integrity 介绍](https://imququ.com/post/subresource-integrity.html)
[大公司里怎样开发和部署前端代码？](https://github.com/fouber/blog/issues/6)