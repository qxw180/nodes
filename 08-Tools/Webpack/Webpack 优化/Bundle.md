# Bundle 优化

1. 压缩代码
2. CDN 加速：`publicPath`
3. Tree Shaking
4. Code Splitting
5. 提取公共第三⽅库

## Code Splitting

合理的代码拆分，优化资源加载是我们当前重要的优化手段，Webpack 代表拆分主要有以下三种方式：

1. 使用`entry`配置多个入口
2. 单独打包公用模块，避免公用模块重复打包
3. Dynamic Imports

Webpack Bundle 分析工具可以帮助我们发现问题、验证优化效果，详细参考[Bundle Analysis](https://webpack.js.org/guides/code-splitting/#bundle-analysis)

## Multiple Entry

Multiple Entry 可以手动配置多个入口文件，Webpack 会为每个入口生成单独的 bundle。

```JavaScript
const path = require('path');

module.exports = {
  entry: {
    index: 'src/pages/index.js',
    page1: 'src/pages/page1.js'
  },
  out: {
    filename: '[name].bundle.js'
    path: path.resolve(__dirname, 'dist'),
  }
}
```

通常情况下我们都是按照页面路径进行代码拆分，假如你需要进一步拆分单个页面的 bundle，webpack 推荐使用`multiple imports`的配置方式：`entry: { index: ['./app', './components'] }`。
这种方式 webpack 可以进行更好的优化，保证在使用`async script`时保证加载顺序。

**注意**：Multiple Entry 有一些弊端

- 如果某个模块被多个入口文件使用，那么每个 entry 的 bundle 都会包含这个模块
- 灵活性不够，不能在程序中动态的的进行代码拆分

## 避免公用模块重复打包

使用`dependOn`可以配置 entry 的共享模块，webpack 会单独打包这些模块。打包后会额外产生`shared.bundle.js`包含了公用模块。

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

使用`SplitChunksPlugin`可以提前公用的依赖模块

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

[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)：提取`dependices`
[MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)：提前 CSS 到单独的文件

## Dynamic Imports

Webpack 支持 ECMAScript 的`import()`语法。

## TODO:Prefetching/Preloading
