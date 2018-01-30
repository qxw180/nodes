#Koa2
Koa是Express原班人马设计开发的，相对于Express更加轻量、优雅，消除了回调的方式；
Koa本身不绑定任何中间件，提供了一套优雅的方法用来快速的搭建服务。

##Application

```
    const Koa = require('koa');
    const app = new Koa();

    app.use(async ctx => {
      ctx.body = 'Hello World';
    });

    app.listen(3000);
```

+ `app.listne()`：
+ `app.callback()`：
+ `app.use(function())`：
+ `app.keys`：
+ `app.context`：


##错误处理