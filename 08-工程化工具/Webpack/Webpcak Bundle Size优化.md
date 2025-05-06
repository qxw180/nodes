# Bundle 优化

1. 非 JS 模块优化
2. CDN 加速：`publicPath`
3. Code Splitting
4. Split Chunk：公共库提取

## TODO:Bundle 分析

Webpack Bundle 分析工具可以帮助我们发现问题、验证优化效果，详细参考[Bundle Analysis](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

## TODO:静态文件加载和优化

代码压缩：TerserPlugin
使用[url-loader](https://webpack.js.org/loaders/url-loader/)进行静态文件加载，体积较小的文件会以 DataURL 的形式嵌入到页面文件中，减少 HTTP 请求。
图片压缩：[ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)

## 样式文件优化

提取 CSS 到单独的文件：[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
CSS 压缩插件：[CssMinimizerWebpackPlugin](https://webpack.js.org/plugins/css-minimizer-webpack-plugin/)

## Tree Shaking 降低 Bundle 体积

Tree Shaking：移除 JS 中没有使用的代码，依赖 ES Module，Webpack 默认开启，需要注意模块引入的方式。TODO:引入方式

`@babel/plugin-transform-runtime`插件，babel 默认会为每一个文件插入辅助代码，`@babel/plugin-transform-runtime`插件禁用单个模块的 runtime 注入，而是将辅助代码提前到单独的文件，其它文件使用是引用这个文件。

## Code Splitting

合理的代码拆分，优化资源加载是我们当前重要的优化手段，Webpack 代表拆分主要有以下三种方式：

1. Multiple Entry：使用`entry`配置多个入口
2. 单独打包公用模块，避免公用模块重复打包
3. Dynamic Imports

### Multiple Entry

Multiple Entry 可以手动配置多个入口文件，Webpack 会为每个入口构建单独的 bundle。

```JavaScript
const path = require('path');

module.exports = {
  entry: {
    index: 'src/pages/index.js',
    home: 'src/pages/home.js'
  },
  out: {
    filename: '[name].bundle.js'
    path: path.resolve(__dirname, 'dist'),
  }
}
```

通常情况下我们都是按照页面路径进行代码拆分，假如你需要进一步拆分单个页面的 bundle，webpack 推荐使用`multiple imports`的配置方式：

```js
module.exports = {
  entry: {
    index: ["./app", "./components"];
  }
}
```

这种方式 webpack 可以进行更好的优化，保证在使用`async script`时保证加载顺序。

**注意**：Multiple Entry 有一些弊端

- 如果某个模块被多个入口文件使用，那么每个 entry 的 bundle 都会包含这个模块
- 灵活性不够，不能在程序中动态的的进行代码拆分

### TODO:公共模块提取

- 公用代码和组件
- 依赖包
  - 依赖包更新频率低，单独打包有利于网络缓存
  - 可以对依赖包提取精细化配置，例如按 react、antd、echarts、其他打多个包，利用网络并发

手动方案：使用`dependOn`可以配置 entry 的共享模块，webpack 会单独打包这些模块。打包后会额外产生`shared.bundle.js`包含了公用模块。

```JavaScript
const path = require('path');

module.exports = {
  entry: {
    index: {
      import: '/src/pages/index.js',
      dependOn: ['shared'],
    },
    pages: {
      import: '/src/pages/page1.js',
      dependOn: ['shared'],
    },
    shared: 'lodash',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
};
```

自动方案：使用`SplitChunksPlugin`可以提前公用的依赖模块

```JavaScript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    another: './src/another-module.js',
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
```

### Dynamic Imports

Webpack 支持 ECMAScript 的[`import()`](../../02-JavaScript/03.Modular/ESM.md#dynamic-import)语法。

## TODO:PreFetching/Preloading

## Network Cache

避免无修改文件缓存失效、避免单个文件修改导致其他依赖这个文件的缓存失效

```JavaScript
module.exports = {
  optimization: {
    runtimeChunk: (entrypoint) => {
      return `runtime-${entrypoint.name}.js`
    },
  }
};
```
