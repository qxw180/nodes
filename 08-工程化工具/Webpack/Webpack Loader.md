# Webpack Loader

## TODO:loader 优先级

- 类型优先级从高到低，使用`enforce`配置
  - pre：前置 loader
  - normal：普通 loader，默认类型
  - inline：内敛 loader
  - post：后置 loader
- 同类型 loader 按照配置顺序逆向执行

```JS
{
  module: {
    rules: [
      {
        enforce: "pre",
        test: "/\.js$/",
        loader: "xxx-loader",
      }
    ]
  }
}
```

## 自定义 Loader

当 webpack 解析资源的时候会调用相应的 loader 对文件内容进行处理。
loader 是一个函数，接受的参数为文件的内容，可以在函数内对内容进行加工，然后返回处理后的内容。

```JS 同步Loader
/**
 * content 文件内容
 * map SourceMap
 * meta 其他loader传递的数据
**/
module.export = function(content, map, meta) {
  return content;
}

module.export = function(content, map, meta) {
  this.callback(null, content, map, meta);
}
```

```JS 异步Loader
module.export = function(content, map, meta) {
  const callback = this.async();
  setTimeout((
    callback(null, content, map, meta);
  ), 1000);
}
```

```JS Raw Loader
// Raw Loader 接收的content是Buffer数据，Raw Loader可以是同步的也可以是异步的
module.export = function(content, map, meta) {
  this.callback(null, content, map, meta);
}
module.export.raw = true;
```

```JS Pitch Loader
// Pitch Loader 会按照loader的配置顺序正向执行pitch方法，执行完成之后在逆向执行loader本身

// Pitch Loader 如果有返回值，会熔断后续其他Pitch Loader以及起Loader主体的执行，会从前一个Pitch Loader的主Loader开始逆向执行。
module.export = function(content, map, meta) {
  this.callback(null, content, map, meta);
}
module.export.pitch = function() {
};
```
