# TODO:Webpack 编译优化

## 编译速度统计

[Speed Measure Plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

![Speed Measure](https://raw.githubusercontent.com/stephencookdev/speed-measure-webpack-plugin/HEAD/preview.png)

## Webpack 编译流程

分析入口文件，找到依赖 module，根据 module 类型调用 loader 进行解析，module 加工，然后合并打包输出

### 依赖分析优化

- 优化`resolve.module`配置
- 优化`resolve.alias`配置
- 优化`resolve.extensions`配置

### 依赖解析优化

- 使用`include`或`exclude`缩小打包文件范围
- 使用`oneOf`方式配置，提升 loader 匹配速度，Webpack 在使用 Loader 加载文件是会从上到下遍历`rules`中配置的规整，使用`oneOf`配置可以优化匹配执行效率
- 模块拆分：如果有单个模块过大可以根据实际场景进行拆分，这不仅有利于编译性能，线上运行效果也有意义
- noParse 配置，如果一些第三方模块没有 AMD/CommonJS 规范版本，可以使用`noParse`来标识这个模块
- Cache
  - babel-loader 缓存
  - eslint-loader 缓存
  - terser-webpack-plugin 缓存
  - SourceMap 缓存

### 打包时间优化

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
