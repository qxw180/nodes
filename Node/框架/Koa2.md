#Koa2
Koa是Express原班人马设计开发的，相对于Express更加轻量、优雅。
Koa借力async函数，比callback更加优异的代码，更加容易的错误处理。
Koa本身不绑定任何中间件，提供了一套优雅的方法用来快速的搭建服务。

##Application

``` JavaScript
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
+ `app.context`：ctx的原型，可以通过app.context为整个程序的ctx添加属性和方法

##内容协商

##缓存

##代理

##重定向

##错误处理
``` JavaScript
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});
```