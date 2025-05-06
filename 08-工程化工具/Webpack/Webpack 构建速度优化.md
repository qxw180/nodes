# TODO:Webpack 编译优化

Webpack 编译流程

- 分析入口文件，找到依赖 module
- 根据 module 类型调用 loader 进行解析
- module 加工，然后合并打包输

## 编译速度统计

[Speed Measure Plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

![Speed Measure](https://raw.githubusercontent.com/stephencookdev/speed-measure-webpack-plugin/HEAD/preview.png)

## 缩小构建范围

- 合理设置`include`和`exclude`：在`loader`中，通过设置`include`和`exclude`，仅处理必要的文件，减少不必要的处理。
- 使用`resolve.alias`：为常用模块设置别名，减少路径解析时间。

## TODO:使用 DLLPlugin 将不常变化的库提前打包，减少每次构建的时间

## TODO:使用缓存

## TODO:多线程

使用`thread-loader`，`thread-loader`会创建一个`worker-pool`每个 worker 都是一个线程。进程启动时间 600 毫秒左右，多进程打包需要结合实际场景取舍

## HMR（Hot Module Reload）

模块热更新，在开发模式下代码变更后，只更新有修改的模块而不需要刷新整个页面

TODO: JS 模块热更新配置，
TODO: react-loader 实现

```JS
module.export = {
  devServer: {
    host: '',
    port: '',
    hot:  true // 开启HMR
  }
}
```
