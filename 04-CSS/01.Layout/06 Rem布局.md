# TODO:Rem 布局

```JavaScript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    reCalc = function () {
      var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
          clientWidth = Math.min(clientWidth, 1024)
          clientWidth = Math.max(clientWidth, 300)
          docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
        }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, function() {
      setTimeout(function(){
        reCalc()
      }, 50)
    });
    reCalc()
})(document, window);
```

通过媒体查询预设 html font-size 解决进入页面时闪烁问题

```CSS
@media (min-width: 360px){html{font-size: 96px;} }
@media (min-width: 375px){html{font-size: 100px;} }
@media (min-width: 414px){html{font-size: 110.6px;} }
```

## TODO:Rem 在 CSS 预处理器中使用及原理
