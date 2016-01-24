# 事件

`window.onload`：
+ `onload` 事件会在页面或图像加载完成后立即发生。
+ `window.onload` 等到页面内包括图片的所有元素加载完毕后才能执行。 

[`DOMContentLoaded`：](https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded)
+ DOMContentLoaded页面文档完全加载并解析完毕之后,会触发DOMContentLoaded事件;
+ HTML文档不会等待样式文件,图片文件,子框架页面的加载(load事件可以用来检测HTML页面是否完全加载完毕(fully-loaded))。

```
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
  });
</script>
```